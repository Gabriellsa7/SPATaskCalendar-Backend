const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
mongoose.connect(
  "mongodb+srv://GabrielSan:jesuscre_123@spataskcalendar.c2htgug.mongodb.net/?retryWrites=true&w=majority&appName=SPATaskCalendar"
);

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
  });

  await task.save();
  res.send(task);
});

app.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  return res.send(task);
});

app.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
    },
    {
      new: true,
    }
  );

  return res.send(task);
});

app.listen(PORT, () => {
  console.log("App running");
});
