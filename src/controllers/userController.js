import prisma from "../config/prismaClient.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        username: true,
        role: true,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    res.status(500).json({
      message: "Failed fetching user profile",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, username } = req.body;

    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (username) {
      updateData.username = username;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No data provided for update",
      });
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
    res.status(200).json({
      message: "User profile updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.error("Error update user profile: ", error);
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already in use" });
    }
    res.status(500).json({
      message: "Failed updating user profile",
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: role },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
    res.status(200).json({
      message: "User role updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error changing user role: ", error);
    res.status(500).json({
      message: "failed changing user role",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No Users" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching items: ", error);
    res.status(500).json({ message: "Failed fetching users" });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Currrent password is incorrect",
      });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
