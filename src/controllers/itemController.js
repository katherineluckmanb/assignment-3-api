import prisma from "../config/prismaClient.js";

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items: ", error);
    res.status(500).json({ message: "Failed fetching itemss" });
  }
};

export const getItemsbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching items: ", error);
    res.status(500).json({ message: "failed fetching item by id" });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const item = await prisma.item.create({
      data: { name },
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.error("Error creating item: ", error);
    res.status(500).json({ message: "Failed creating item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const item = await prisma.item.update({
      where: { id: id },
      data: { name },
    });

    res.status(200).json({
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.error("Error updating item: ", error);
    if (error.code === "P2025")
      return res.status(404).json({ error: "Item not found" });

    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await prisma.item.delete({
      where: { id: id },
    });
    res.status(200).json({
      message: "Item deleted successfully",
      item,
    });
  } catch (error) {
    console.error("Error deleting item: ", error);
    if (error.code === "P2025")
      return res.status(404).json({ error: "Item not found" });
    res.status(500).json({ error: "Internal server error" });
  }
};
