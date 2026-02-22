import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router({ mergeParams: true });

// create a task
router.post("/", authMiddleware, (req, res) => {
  taskController.createTask(req, res);
});

// get tasks
router.get("/", authMiddleware, (req, res) => {
  taskController.getTasksByProject(req, res);
});

export default router;
