const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  const formattedTasks = tasks.map((task) => ({
    ...task.toJSON(),
    date: task.date?.toISOString(),
  }));
  res.send(formattedTasks);
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Erro ao contar as tarefas:", error);
    res.status(500).json({ error: "Erro ao contar as tarefas" });
  }
});

router.post("/", async (req, res) => {
  const currentDate = new Date();
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    created_at: currentDate,
  });

  await task.save();
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  return res.send(task);
});

router.put("/:id", async (req, res) => {
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

module.exports = router;
