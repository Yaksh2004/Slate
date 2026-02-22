import { Router } from "express";
import userController from "../controllers/user.controller.js";
const router = Router();

//create user
router.post("/", (req, res) => userController.createUser(req, res));

//get all users
router.get("/", (req, res) => userController.getAllUsers(req, res));

//get user by id
router.get("/:id", (req, res) => userController.findByUserId(req, res));

//update user by id
router.put("/", (req, res) => userController.updateUser(req, res));

//delete user by id
router.delete("/", (req, res) => userController.deleteUser(req, res));

export default router;
