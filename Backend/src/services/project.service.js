import Project from "../models/Project.js";
import mongoose from "mongoose";
import AppError from "../utils/AppError.js";

class ProjectService {
  async createProject(userId, projectName) {
    if (!projectName || !projectName.trim()) {
      throw new AppError("Provide Valid project name", 400);
    }

    const project = await Project.create({
      name: projectName,
      user: userId,
    });

    return {
      id: project._id,
      name: project.name,
    };
  }

  async getAllProjects(userId) {
    const projects = await Project.find({ user: userId });
    return projects.map(p => ({
      id: p._id,
      name: p.name,
      createdAt: p.createdAt,
    }));
  }

  async deleteProject(userId, projectId) {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new AppError("Project Id not valid", 400);
    }

    const deleted = await Project.findOneAndDelete({
      _id: projectId,
      user: userId,
    });

    if (!deleted) {
      throw new AppError("Project Not Found!", 404);
    }
  }
}

export default new ProjectService();
