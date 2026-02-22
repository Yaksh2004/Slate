import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

class TaskService {
  async createTask(userId, projectId, task) {
    //validation
    const validProjectId = mongoose.Types.ObjectId.isValid(projectId);
    if (!validProjectId) {
      console.log("ProjectId:", projectId, projectId.length);
      throw new AppError("Invalid project ID", 400);
    }
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      throw new AppError("Project Not Found", 404);
    }
    //creating
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

  async updateTask(userId, projectId, taskId, updatedData) {
    //validation
    const validProjectId = mongoose.Types.ObjectId.isValid(projectId);
    if (!validProjectId) {
      throw new AppError("Invalid project ID", 400);
    }

    const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validTaskId) {
      throw new AppError("Invalid task ID", 400);
    }

    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      throw new AppError("Project Not Found", 404);
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });
    if (!task) {
      throw new AppError("Task Not Found", 404);
    }

    //updating
    if (updatedData.title !== undefined) {
      task.title = updatedData.title;
    }

    if (updatedData.description !== undefined) {
      task.description = updatedData.description;
    }

    if (updatedData.status !== undefined) {
      task.status = updatedData.status;
    }

    await task.save();

    return {
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async deleteTask(userId, projectId, taskId) {
    //validation
    const validProjectId = mongoose.Types.ObjectId.isValid(projectId);
    if (!validProjectId) {
      throw new AppError("Invalid project ID", 400);
    }

    const validTaskId = mongoose.Types.ObjectId.isValid(taskId);
    if (!validTaskId) {
      throw new AppError("Invalid task ID", 400);
    }

    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) {
      throw new AppError("Project Not Found", 404);
    }

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      project: projectId,
    });

    if (!deletedTask) {
      throw new AppError("Task Not Found", 404);
    }
  }
}

export default new TaskService();
