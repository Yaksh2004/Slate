import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { loginSchema, registerSchema } from "../validators/user.validator.js";
import { validate } from "../middleware/validate.middleware.js";
const router = Router();

//regiter user
router.post("/register", validate(registerSchema), (req, res) =>
  userController.createUser(req, res),
);

//login user
router.post("/login", validate(loginSchema), (req, res) =>
  userController.loginUser(req, res),
);

//me
router.get("/me", authMiddleware, (req, res) => userController.getMe(req, res));

export default router;
