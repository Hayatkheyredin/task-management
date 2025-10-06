import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createTask, deleteTask, getTask, listTasks, reorderTasks, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", listTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/reorder", reorderTasks);

export default router;


