import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Store = mongoose.model("Store", storeSchema);

// Get all stores
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    console.error("Error fetching stores:", err);
    res.status(500).json({ message: "Error fetching stores." });
  }
});

// Create a new store
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required." });
    const store = await Store.create({ name });
    res.status(201).json(store);
  } catch (err) {
    console.error("Error creating store:", err);
    res.status(500).json({ message: "Error creating store." });
  }
});

export default router;
