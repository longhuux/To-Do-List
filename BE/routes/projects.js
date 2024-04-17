const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add a new project
router.post("/", async (req, res) => {
  const newProject = new Project({
    name: req.body.name,
  });
  const savedProject = await newProject.save();
  res.json(savedProject);
});
//Get a project
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id).populate("tasks");
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});
// Update a project
router.patch("/:id", async (req, res) => {
  const updatedProject = await Project.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name } }
  );
  res.json(updatedProject);
});

// Delete a project
router.delete("/:id", async (req, res) => {
  const removedProject = await Project.deleteOne({ _id: req.params.id });
  res.json(removedProject);
});

// Add a task to a project
router.post("/:id/tasks", async (req, res) => {
  const updatedProject = await Project.updateOne(
    { _id: req.params.id },
    { $push: { tasks: req.body } }
  );
  res.json(updatedProject);
});

// Update a task in a project
router.patch("/:id/tasks/:taskId", async (req, res) => {
  const updatedProject = await Project.updateOne(
    { _id: req.params.id, "tasks._id": req.params.taskId },
    { $set: { "tasks.$": req.body } }
  );
  res.json(updatedProject);
});

//Update status
router.patch("/:id/tasks/:taskId/status", async (req, res) => {
    const updatedProject = await Project.updateOne(
      { _id: req.params.id, "tasks._id": req.params.taskId },
      { $set: { "tasks.$.status": req.body.status } }
    );
    res.json(updatedProject);
  });
// Delete a task in a project
router.delete("/:id/tasks/:taskId", async (req, res) => {
  const updatedProject = await Project.updateOne(
    { _id: req.params.id },
    { $pull: { tasks: { _id: req.params.taskId } } }
  );
  res.json(updatedProject);
});

// Get tasks by status
router.get("/:id/new", async (req, res) => {
  const project = await Project.findById(req.params.id).populate("tasks");
  const tasks = project.tasks.filter((task) => task.status === "new");
  res.json(tasks);
});
router.get("/:id/inProgress", async (req, res) => {
  const project = await Project.findById(req.params.id).populate("tasks");
  const tasks = project.tasks.filter((task) => task.status === "inProgress");
  res.json(tasks);
});
router.get("/:id/done", async (req, res) => {
  const project = await Project.findById(req.params.id).populate("tasks");
  const tasks = project.tasks.filter((task) => task.status === "done");
  res.json(tasks);
});

module.exports = router;
