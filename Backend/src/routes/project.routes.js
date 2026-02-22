import { Router } from "express";
import projectController from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

// create new project
router.post("/", authMiddleware, (req, res) =>
  projectController.createProject(req, res),
);

// get all projects
router.get("/", authMiddleware, (req, res) =>
  projectController.getAllProjects(req, res),
);

// delete a project by id
router.delete("/:id", authMiddleware, (req, res) =>
  projectController.deleteProject(req, res),
);

export default router;
