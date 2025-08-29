import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const canCreateNote =
    [title.trim(), content.trim()].every(Boolean) && !loading;

  useEffect(() => {
    if (inputRef.current && !loading) inputRef.current.focus();
  }, [loading]);

  const saveNote = async () => {
    if (!canCreateNote) {
      toast.error("Please add title and content.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error created note:", error.message);

      if (error.response?.status === 429) {
        toast.error("Take it slow! You're creating notes too quickly.", {
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onContentKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveNote();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNote();
  };

  return (
    <section className="min-h-screen section bg-base-200">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-accent mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body text-base-content">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label
                    htmlFor="title"
                    className="text-base-content text-base"
                  >
                    Title
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    className="input input-bordered w-full"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                    aria-labelledby="title-info"
                  />
                  <p id="title-info" className="sr-only">
                    Title can be anything you want. Make sure that title is not
                    empty.
                  </p>
                </div>

                <div className="form-control mb-4">
                  <label
                    htmlFor="content"
                    className="text-base-content text-base"
                  >
                    Content
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-32"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your note here..."
                    aria-labelledby="content-info"
                    onKeyDown={onContentKeydown}
                  ></textarea>
                  <p id="content-info" className="sr-only">
                    Content can be anything you want. Make sure that content is
                    not empty.
                  </p>
                </div>

                <div className="card-actions justify-end mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
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

export default CreatePage;
