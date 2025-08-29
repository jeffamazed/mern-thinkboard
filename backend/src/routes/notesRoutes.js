import express from "express";
import {
  getAllNotesController,
  createNoteController,
  getSingleNoteController,
  updateNoteController,
  deleteNoteController,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.route("/").get(getAllNotesController).post(createNoteController);
router
  .route("/:id")
  .get(getSingleNoteController)
  .patch(updateNoteController)
  .delete(deleteNoteController);

export default router;
