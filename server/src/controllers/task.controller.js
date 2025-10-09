import { Task } from "../models/Task.model.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, priority, dueDate, search } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (dueDate) filters.dueDate = dueDate;
    if (search) filters.search = search;
    
    const tasks = await Task.getUserTasks(userId, filters);
    
    res.json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};

// Get a single task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findOne({ _id: id, user: userId });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    
    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch task"
    });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }
    
    const userId = req.user.id;
    const { title, description, dueDate, priority, tags } = req.body;
    
    const task = new Task({
      title,
      description: description || "",
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      tags: tags || [],
      user: userId
    });
    
    await task.save();
    
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;
    
    // Remove fields that shouldn't be updated directly
    delete updates.user;
    delete updates._id;
    delete updates.__v;
    delete updates.createdAt;
    
    // Handle date conversion
    if (updates.dueDate) {
      updates.dueDate = new Date(updates.dueDate);
    }
    
    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    
    res.json({
      success: true,
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    
    res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task"
    });
  }
};

// Mark task as completed
export const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findOne({ _id: id, user: userId });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    
    await task.markCompleted();
    
    res.json({
      success: true,
      message: "Task marked as completed",
      task
    });
  } catch (error) {
    console.error("Complete task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete task"
    });
  }
};

// Mark task as in progress
export const startTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const task = await Task.findOne({ _id: id, user: userId });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
    
    await task.markInProgress();
    
    res.json({
      success: true,
      message: "Task marked as in progress",
      task
    });
  } catch (error) {
    console.error("Start task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start task"
    });
  }
};

// Get task statistics
export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const stats = await Task.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    const totalTasks = await Task.countDocuments({ user: userId });
    const overdueTasks = await Task.countDocuments({
      user: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" }
    });
    
    res.json({
      success: true,
      stats: {
        total: totalTasks,
        overdue: overdueTasks,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error("Get task stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch task statistics"
    });
  }
};