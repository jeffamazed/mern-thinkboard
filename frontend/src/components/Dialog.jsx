import { Check, LucideLoaderCircle, X } from "lucide-react";

const Dialog = ({
  dialogRef,
  handleConfirmDelete,
  deleting,
  setNoteToDelete,
}) => {
  return (
    <dialog
      ref={dialogRef}
      className="fixed p-5 rounded-lg bg-primary-300 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/50"
    >
      <p className="text-center">Are you sure you want to delete this note?</p>
      <div className="flex items-center justify-center mt-8 gap-8">
        <button
          type="button"
          className="btn btn-primary p-3.5"
          aria-label="Yes"
          onClick={handleConfirmDelete}
          disabled={deleting}
        >
          {deleting ? (
            <LucideLoaderCircle className="size-4 animate-spin" />
          ) : (
            <Check className="size-4" />
          )}
        </button>
        <button
          type="button"
          className="btn btn-error p-3.5"
          aria-label="No"
          onClick={() => {
            setNoteToDelete(null);
            dialogRef.current.close();
          }}
        >
          <X className="size-4" />
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
