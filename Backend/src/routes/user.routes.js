import { Router } from "express";
import userController from "../controllers/user.controller.js";
const router = Router();

//regiter user
router.post("/register", (req, res) => userController.createUser(req, res));

//login user
router.post("/login", (req, res) => userController.loginUser(req, res));

export default router;
