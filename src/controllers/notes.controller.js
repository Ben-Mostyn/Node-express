import { Note } from "../models/Notes.model.js";

//! Get All notes
export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // sort by newest first
    res.status(200).json(notes);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error retrieving notes" });
  }
};

//! Get note by Id

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ message: Could`not find note with this id ${req.params.id}` });
    }
    return res
      .status(200)
      .json({ note, message: "successfully retrieved note" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error retrieving note by id" });
  }
};

//! Update single note

export const updateNote = async (req, res) => {
  // res.status(200).json({ message: "you updated a note" });
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ Note: updatedNote, message: "note updated successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error updating note" });
  }
};

//! Create new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error creating note" });
  }
};

//! delete note
export const deleteNote = async (req, res) => {
  // res.status(200).json({ message: "you deleted a note" });
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNote) {
      return res.status(404).json({
        message: "The note you are trying to delete could not be found",
      });
    }

    return res
      .status(200)
      .json({ note: deleteNote, message: "you succesfully deleted a note" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error deleting note" });
  }
};
