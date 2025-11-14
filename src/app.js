import express from "express";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});
app.use("/api/items", itemRoutes);

export default app;
