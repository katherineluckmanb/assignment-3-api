// src/routes/userRoutes.js
import express from "express";
import {
  getItems,
  getItemsbyId,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.get("/:id", getItemsbyId);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
