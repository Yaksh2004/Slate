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

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser({ email, password });

      res.status(200).json({
        success: true,
        message: "User Login Successful",
        ...result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMe(req, res) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
}

export default new UserController();
