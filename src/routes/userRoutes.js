// src/routes/userRoutes.js
import express from "express";
import * as userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

const router = express.Router();

router.get("/me", auth, userController.getUserProfile);
router.put("/me", auth, userController.updateUserProfile);
router.put("/role/:id", auth, role("admin"), userController.changeUserRole);
router.get("/all", auth, role("admin"), userController.getAllUsers);
router.put("/change-password", auth, userController.updateUserPassword);

export default router;
