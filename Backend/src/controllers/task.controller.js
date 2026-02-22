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
      res.status(400).json({
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

      res.status(201).json({
        success: true,
        message: "Task fetched successfully",
        tasks,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TaskController();
