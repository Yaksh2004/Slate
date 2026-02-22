import Project from "../models/Project.js";
import mongoose from "mongoose";

class ProjectService {
  async createProject(userId, projectName) {
    if (!projectName || !projectName.trim()) {
      throw new Error("Provide Valid project name");
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
      throw new Error("Project Id not valid");
    }

    const deleted = await Project.findOneAndDelete({
      _id: projectId,
      user: userId,
    });

    if (!deleted) {
      throw new Error("Project Not Found!");
    }
  }
}

export default new ProjectService();
