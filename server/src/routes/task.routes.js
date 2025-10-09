import express from "express";
import { body } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  startTask,
  getTaskStats
} from "../controllers/task.controller.js";

const router = express.Router();

// Validation rules
const createTaskValidation = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("dueDate")
    .isISO8601()
    .withMessage("Due date must be a valid date"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  body("tags.*")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Each tag cannot exceed 20 characters")
];

const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage("Priority must be low, medium, high, or urgent"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed", "cancelled"])
    .withMessage("Status must be pending, in-progress, completed, or cancelled"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  body("tags.*")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Each tag cannot exceed 20 characters")
];

// All routes require authentication
router.use(requireAuth);

// GET /api/tasks - Get all tasks for the authenticated user
router.get("/", getTasks);

// GET /api/tasks/stats - Get task statistics
router.get("/stats", getTaskStats);

// GET /api/tasks/:id - Get a specific task
router.get("/:id", getTask);

// POST /api/tasks - Create a new task
router.post("/", createTaskValidation, createTask);

// PUT /api/tasks/:id - Update a task
router.put("/:id", updateTaskValidation, updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", deleteTask);

// PATCH /api/tasks/:id/complete - Mark task as completed
router.patch("/:id/complete", completeTask);

// PATCH /api/tasks/:id/start - Mark task as in progress
router.patch("/:id/start", startTask);

export default router;