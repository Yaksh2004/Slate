import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

class TaskService {
  async createTask(userId, projectId, task) {
    const validProjectId = mongoose.Types.ObjectId.isValid(projectId);
    if (!validProjectId) {
      console.log("ProjectId:", projectId, projectId.length);
      throw new AppError("Invalid project ID", 400);
    }
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      throw new AppError("Project Not Found", 404);
    }
    if (!task.title || !task.title.trim()) {
      throw new AppError("Task Title cannot be Empty", 400);
    }
    const createdTask = await Task.create({
      title: task.title,
      project: projectId,
      description: task.description,
    });
    return {
      id: createdTask._id,
      title: createdTask.title,
      description: createdTask.description,
      status: createdTask.status,
      createdAt: createdTask.createdAt,
    };
  }

  async getTasksByProject(userId, projectId) {
    const validProjectId = mongoose.Types.ObjectId.isValid(projectId);
    if (!validProjectId) {
      throw new AppError("Invalid project ID", 400);
    }
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      throw new AppError("Project Not Found", 404);
    }
    const tasks = await Task.find({ project: projectId });
    return tasks.map(t => ({
      id: t._id,
      title: t.title,
      description: t.description,
      status: t.status,
      createdAt: t.createdAt,
    }));
  }
}

export default new TaskService();
