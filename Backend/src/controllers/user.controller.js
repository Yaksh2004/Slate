import userService from "../services/user.service.js";

class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);

      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findByUserId(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.findByUserId(id);

      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      const statusCode = error.message == "User not found" ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new UserController();
