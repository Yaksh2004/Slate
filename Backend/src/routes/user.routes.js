import { Router } from "express";
import userController from "../controllers/user.controller.js";
const router = Router();

//create user
router.post("/register", (req, res) => userController.createUser(req, res));

export default router;
