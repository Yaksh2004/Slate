import projectService from "../services/project.service.js";

class ProjectController {
  async createProject(req, res) {
    try {
      const projectName = req.body.name;
      const userId = req.user.id;
      const project = await projectService.createProject(userId, projectName);
      res.status(201).json({
        success: true,
        message: "Project created successfully",
        project,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllProjects(req, res) {
    try {
      const userId = req.user.id;
      const projects = await projectService.getAllProjects(userId);
      res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        projects,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteProject(req, res) {
    try {
      const userId = req.user.id;
      const projectId = req.params.id;
      await projectService.deleteProject(userId, projectId);
      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new ProjectController();
