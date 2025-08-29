import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Provide title."],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Provide content."],
      trim: true,
    },
  },
  { timestamps: true }
);

const Note = model("Note", NoteSchema);
export default Note;
