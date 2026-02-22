import mongoose, { Schema } from "mongoose";

const dailyLogSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String, // Not Date here as we want to simplify with yyyy-mm-dd
      required: true,
    },

    // Tasks user is planning for the day
    plannedTasks: {
      type: [String],
      default: [],
    },

    // How focused does the user expect to be today
    expectedFocus: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    // How many hours the user expects to do
    expectedHours: {
      type: Number,
      min: 0,
      default: 0,
    },

    actualHours: {
      type: Number,
      min: 0,
      default: 0,
    },

    // the tasks the user actually plans to do.
    actualTasks: {
      type: [String],
      default: [],
    },

    // How focused the user actually was
    actualFocus: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    // Logs the amount of distractions to see how long the user spent doing what
    distractions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

export const DailyLog = mongoose.model("DailyLog", dailyLogSchema);
