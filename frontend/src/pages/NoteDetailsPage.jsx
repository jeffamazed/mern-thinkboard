import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { toast } from "react-toastify";
import useNotes from "../hooks/useNotes";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import Dialog from "../components/Dialog";
import handleCaretToBack from "../lib/handleCaretToBack";

const NoteDetailsPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const { singleNote, setSingleNote } = useNotes();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  const canUpdateNote =
    [note?.title?.trim(), note?.content?.trim()].every(Boolean) && !loading;
  const navigate = useNavigate();
  const { id } = useParams();

  useLayoutEffect(() => {
    if (!loading && inputRef.current?.value && note) {
      inputRef.current.focus();
    }
  }, [loading, note]);

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`/notes/${id}`);

        setSingleNote(res.data.note);
        setNote(res.data.note);
      } catch (error) {
        console.error("Error in fetching note:", error.message);
        if (error.response?.status === 429) {
          toast.error("Take it slow! You're updating notes too quickly.", {
            icon: "⚠️",
          });
        } else {
          toast.error("Failed to fetch the note.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id, setSingleNote]);

  const handleDeleteRequest = () => {
    setNoteToDelete(singleNote._id);
    dialogRef.current.showModal();
  };

  const handleDelete = async () => {
    if (!noteToDelete) return;

    try {
      setDeleting(true);
      await api.delete(`/notes/${noteToDelete}`);

      toast.success("Note deleted successfylly!");
      navigate("/");
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

  const updateNote = async () => {
    if (!canUpdateNote) {
      toast.error("Please do not leave title or content empty.");
      return;
    }

    try {
      setSaving(true);
      await api.patch(`/notes/${note._id}`, {
        title: note.title,
        content: note.content,
      });

      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error.message);

      if (error.response?.status === 429) {
        toast.error("Take it slow! You're updating notes too quickly.", {
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to update note.");
      }
    } finally {
      setSaving(false);
    }
  };

  const onContentKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      updateNote();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin text-base-content size-10" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <section className="section bg-base-200">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-accent">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              type="button"
              onClick={handleDeleteRequest}
              className="btn btn-error"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <Dialog
            dialogRef={dialogRef}
            handleConfirmDelete={handleDelete}
            deleting={deleting}
            setNoteToDelete={setNoteToDelete}
          />

          <div className="card bg-base-100">
            <div className="card-body text-base-content">
              <h2 className="card-title text-2xl mb-4">Update Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label
                    htmlFor="title"
                    className="text-base-content text-base"
                  >
                    Title:
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    className="input input-bordered w-full"
                    id="title"
                    value={note.title}
                    onChange={(e) =>
                      setNote((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    onFocus={(e) => handleCaretToBack(e)}
                    placeholder="Note title"
                    aria-labelledby="title-info"
                  />
                  <p id="title-info" className="sr-only">
                    Update title to anything you want. Make sure that it is not
                    empty.
                  </p>
                </div>

                <div className="form-control mb-4">
                  <label
                    htmlFor="content"
                    className="text-base-content text-base"
                  >
                    Content:
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    id="content"
                    value={note.content}
                    onChange={(e) =>
                      setNote((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    onFocus={(e) => handleCaretToBack(e)}
                    placeholder="Write your note here..."
                    aria-labelledby="content-info"
                    onKeyDown={onContentKeydown}
                  ></textarea>
                  <p id="content-info" className="sr-only">
                    Update content to anything you want. Make sure that it is
                    not empty.
                  </p>
                </div>

                <div className="card-actions justify-end mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoteDetailsPage;
