import express from "express";
import itemRoutes from "./routes/itemRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});
app.use("/api/items", itemRoutes);
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

export default app;
