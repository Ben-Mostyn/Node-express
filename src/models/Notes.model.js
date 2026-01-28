import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this gives created at and updated at fields
  }
);

export const Note = mongoose.model("Note", noteSchema);
