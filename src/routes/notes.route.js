import { Router } from "express";
import {
  getAllNotes,
  updateNote,
  createNote,
  deleteNote,
  getNoteById,
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;

// app.get("/api/v1/notes", (req, res) => {
//   res.status(200).send("you got 5 notes");
// });

// app.post("/api/v1/notes", (req, res) => {
//   res.status(201).json({ message: "you created a note" });
// });

// app.put("/api/v1/notes/:id", (req, res) => {
//   res.status(200).json({ message: "you updated a note" });
// });
// app.delete("/api/v1/notes/:id", (req, res) => {
//   res.status(200).json({ message: "you deleted a note" });
// });
