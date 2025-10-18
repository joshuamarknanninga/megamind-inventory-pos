import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
