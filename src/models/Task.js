const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
