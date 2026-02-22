import { DailyLog } from "../models/DailyLog.model.js";

export const createDailyLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      date,
      plannedTasks,
      expectedFocus,
      expectedHours,
      actualHours,
      actualTasks,
      actualFocus,
      distractions,
    } = req.body;

    // user should need to plan at once but not necessarily fill out the completed tasks so these can be default values
    const newLog = new DailyLog({
      userId,
      date,
      plannedTasks,
      expectedFocus,
      expectedHours,
      actualHours,
      actualTasks,
      actualFocus,
      distractions,
    });

    console.log({ newLog });

    await newLog.save();
    res
      .status(201)
      .json({ message: "New daily log has been successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "there was an error creating a new daily log", error });
  }
};

export const getDailyLog = async (req, res) => {
  try {
    const { date } = req.params;
    const dailyLog = await DailyLog.findOne({
      userId: req.user.id,
      date,
    });

    if (!dailyLog) {
      return res.status(200).json({ message: "No daily log for this date" });
    }

    res.status(200).json({
      dailyLog,
      message: "Successfully retrieved the requested daily log",
    });
  } catch (error) {
    res.status(500).json({ message: "error getting daily log", error });
  }
};

export const getAllDailyLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const dailyLogs = await DailyLog.find({ userId }).sort({ date: -1 });
    res
      .status(200)
      .json({ dailyLogs, message: "successfully retrieved all dailylogs" });
  } catch (error) {
    res.status(500).json({ message: "error getting all daily logs", error });
  }
};

export const deleteDailyLog = async (req, res) => {
  try {
    const id = req.params.id;
    const dailyLog = await DailyLog.findByIdAndDelete(id);
    if (!dailyLog) {
      res.status(404).json({ message: "daily log not found" });
    }
    res.status(200).json({ dailyLog, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "error deleting daily log", error });
  }
};

export const updateDailyLog = async (req, res) => {
  try {
    const id = req.params.id;

    // Whitelist allowed fields
    const allowedFields = [
      "plannedTasks",
      "expectedFocus",
      "expectedHours",
      "actualHours",
      "actualTasks",
      "actualFocus",
      "distractions",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const updatedDailyLog = await DailyLog.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedDailyLog) {
      return res.status(404).json({ message: "Daily log not found" });
    }

    res.status(200).json({
      updatedDailyLog,
      message: "Successfully updated log",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating daily log",
      error: error.message,
    });
  }
};
