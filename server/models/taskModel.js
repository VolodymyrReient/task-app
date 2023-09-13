const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task name is required"],
  },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  complexity: {
    type: String,
    enum: {
      values: ["easy", "medium", "difficult"],
      message: "Wrong complexity value",
    },
    required: [true, "Task complexity is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["new", "in progress", "done"],
      message: "Wrong status value",
    },
    required: [true, "Task status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
