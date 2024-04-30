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

// router.get("/tasks/:view", async (req, res) => {
//   const { view } = req.params;
//   let startDate, endDate;

//   // Set start and end dates based on view option
//   switch (view) {
//     case "day":
//       startDate = new Date();
//       endDate = new Date();
//       break;
//     case "week":
//       startDate = new Date();
//       startDate.setDate(startDate.getDate() - startDate.getDay());
//       endDate = new Date(startDate);
//       endDate.setDate(endDate.getDate() + 6);
//       break;
//     case "month":
//       startDate = new Date();
//       startDate.setDate(1);
//       endDate = new Date(startDate);
//       endDate.setMonth(endDate.getMonth() + 1);
//       endDate.setDate(endDate.getDate() - 1);
//       break;
//     default:
//       return res.status(400).json({ error: "Invalid view option" });
//   }

//   try {
//     // Query tasks based on start and end dates
//     const tasks = await Task.find({
//       deadline: { $gte: startDate, $lte: endDate },
//     });

//     res.json({ tasks });
//   } catch (error) {
//     console.error("Error when searching for tasks:", error);
//     res.status(500).json({ error: "Error when searching for tasks" });
//   }
// });

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

// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;

//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { description },
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).send("Task not found");
//     }

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     console.error("Error updating description:", error);
//     res.status(500).send("Internal server error");
//   }
// });

module.exports = router;
