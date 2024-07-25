import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const { id } = req.user;
    const tasks = await Task.find({ user: id }).populate("user");
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("user");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
      date: task.date,
      user: task.user,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const { id } = req.user;
    const newTask = new Task({ title, description, date, user: id });
    const savedTask = await newTask.save();
    return res.status(201).json({
      id: savedTask._id,
      title: savedTask.title,
      description: savedTask.description,
      date: savedTask.date,
      user: savedTask.user,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: task._id,
      title: task.title,
      description: task.description,
      date: task.date,
      user: task.user,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
