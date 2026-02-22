import taskService from "../services/task.service.js";

class TaskController {
  async createTask(req, res) {
    try {
      const userId = req.user.id;
      const projectId = req.params.projectId;
      const { title, description } = req.body;

      const task = await taskService.createTask(userId, projectId, {
        title,
        description,
      });

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        task,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getTasksByProject(req, res) {
    try {
      const userId = req.user.id;
      const projectId = req.params.projectId;

      const tasks = await taskService.getTasksByProject(userId, projectId);

      res.status(200).json({
        success: true,
        message: "Task fetched successfully",
        tasks,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const userId = req.user.id;
      const { projectId, taskId } = req.params;
      const updatedData = req.body;

      const updatedTask = await taskService.updateTask(
        userId,
        projectId,
        taskId,
        updatedData,
      );

      res.status(200).json({
        success: true,
        message: "Task Edited successfully",
        updatedTask,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const userId = req.user.id;
      const { projectId, taskId } = req.params;

      await taskService.deleteTask(userId, projectId, taskId);

      res.status(200).json({
        success: true,
        message: "Task Deleted successfully",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TaskController();
