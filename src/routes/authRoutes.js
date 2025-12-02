// src/routes/userRoutes.js
import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);

export default router;
