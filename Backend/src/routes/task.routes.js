import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator.js";
const router = Router({ mergeParams: true });

// create a task
router.post("/", authMiddleware, validate(createTaskSchema), (req, res) => {
  taskController.createTask(req, res);
});

// get tasks
router.get("/", authMiddleware, (req, res) => {
  taskController.getTasksByProject(req, res);
});

//edit tasks
router.patch(
  "/:taskId",
  authMiddleware,
  validate(updateTaskSchema),
  (req, res) => {
    taskController.updateTask(req, res);
  },
);

//delete tasks
router.delete("/:taskId", authMiddleware, (req, res) => {
  taskController.deleteTask(req, res);
});

export default router;
