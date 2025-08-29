import { useCallback, useEffect, useRef, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import useNotes from "../hooks/useNotes";
import Pagination from "../components/Pagination";
import { useMediaQuery } from "react-responsive";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import Dialog from "../components/Dialog";

const HomePage = () => {
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const [isRateLimited, setIsRateLimited] = useState(false);
  const { data, setData } = useNotes();
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(isTablet ? 10 : 12);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    // use timeout to debounce
    const timeout = setTimeout(() => setLimit(isTablet ? 10 : 12), 250);
    return () => clearTimeout(timeout);
  }, [isTablet]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes?limit=${limit}&page=${currentPage}`);
        setData(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes.", error.message);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [setData, currentPage, limit]);

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      setDeleting(true);
      await api.delete(`/notes/${noteToDelete}`);

      // refetch to sync pagination
      const res = await api.get(`/notes?limit=${limit}&page=${currentPage}`);
      setData(res.data);

      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error.message);

      if (error.response?.status === 429) {
        toast.error("Take it slow! You're deleting notes too quickly.", {
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to delete note.");
      }
    } finally {
      setNoteToDelete(null);
      setDeleting(false);
      dialogRef.current.close();
    }
  };

  const handleDeleteRequest = useCallback((id) => {
    setNoteToDelete(id);
    dialogRef.current.showModal();
  }, []);

  return (
    <section className="section" aria-busy={loading}>
      {isRateLimited && <RateLimitedUI />}

      {/* No notes */}
      {!data.notes?.length && !isRateLimited && !loading && <NotesNotFound />}

      <div className="container mx-auto px-4 py-6">
        {loading && (
          <p className="text-center text-primary">Loading notes...</p>
        )}

        {data.notes?.length > 0 && !isRateLimited && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2 className="sr-only">Notes</h2>
            {data.notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDeleteRequest={handleDeleteRequest}
              />
            ))}
          </div>
        )}

        {data.notes?.length > 0 && !isRateLimited && !loading && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            data={data}
          />
        )}
      </div>
      <Dialog
        dialogRef={dialogRef}
        handleConfirmDelete={handleConfirmDelete}
        deleting={deleting}
        setNoteToDelete={setNoteToDelete}
      />
    </section>
  );
};

export default HomePage;
