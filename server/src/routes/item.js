import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const itemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// Create item
router.post("/", async (req, res) => {
  try {
    const { sku, name, price } = req.body;
    if (!sku || !name || !price) {
      return res.status(400).json({ message: "All fields required." });
    }

    const existing = await Item.findOne({ sku });
    if (existing) return res.status(409).json({ message: "Item with SKU exists." });

    const item = await Item.create({ sku, name, price });
    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: "Error creating item." });
  }
});

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

export default router;
