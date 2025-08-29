import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { memo } from "react";

const NoteCard = memo(({ note, onDeleteRequest }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    onDeleteRequest(note._id);
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="note-card-article"
      aria-label={`View ${note.title}`}
    >
      <article className="card-body justify-between h-full gap-6">
        <div>
          <h3 className="card-title text-base-content line-clamp-1">
            {note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-3 mt-4">
            {note.content}
          </p>
        </div>
        <div className="card-actions justify-between items-center">
          <time
            className="text-sm text-base-content/60"
            dateTime={note.createdAt}
          >
            {formatDate(note.createdAt)}
          </time>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 text-base-content" />
            <button
              type="button"
              aria-label={`Delete ${note.title}`}
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 text-red-500" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
});

export default NoteCard;
