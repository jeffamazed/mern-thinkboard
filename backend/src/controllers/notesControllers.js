import Note from "../models/Note.js";
import CustomAPIError from "../classes/CustomApiError.js";
import { validateCreateNote, validateUpdateNote } from "../utils/validation.js";

export const getAllNotesController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const notes = await Note.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalNotes = await Note.countDocuments();
  res.status(200).json({
    success: true,
    notes,
    page,
    totalPages: Math.ceil(totalNotes / limit),
    totalNotes,
  });
};

export const createNoteController = async (req, res) => {
  const {
    error,
    value: { title, content },
  } = validateCreateNote(req.body);
  if (error) throw error;

  const newNote = await Note.create({
    title,
    content,
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully!",
    note: newNote,
  });
};

export const getSingleNoteController = async (req, res) => {
  const noteId = req.params.id;

  const note = await Note.findById(noteId);
  if (!note) {
    throw new CustomAPIError(
      "Note not found.",
      404,
      `Note with id ${noteId} is not found. Failed to get.`
    );
  }

  res.status(200).json({ success: true, note });
};

export const updateNoteController = async (req, res) => {
  const {
    error,
    value: { title, content },
  } = validateUpdateNote(req.body);
  if (error) throw error;
  const noteId = req.params.id;

  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    { title, content },
    { new: true }
  );
  if (!updatedNote) {
    throw new CustomAPIError(
      "Note not found.",
      404,
      `Note with id ${noteId} is not found. Failed to update.`
    );
  }

  res.status(200).json({
    success: true,
    message: "Note updated successfully!",
    note: updatedNote,
  });
};

export const deleteNoteController = async (req, res) => {
  const noteId = req.params.id;

  const deletedNote = await Note.findByIdAndDelete(noteId);
  if (!deletedNote) {
    throw new CustomAPIError(
      "Note not found.",
      404,
      `Note with id ${noteId} is not found. Failed to delete.`
    );
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully!",
    note: deletedNote,
  });
};
