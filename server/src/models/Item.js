import express from "express";
import { Item } from "../models/Item.js";

const router = express.Router();

// Create a new item
router.post("/", async (req, res) => {
  try {
    const { sku, name, price } = req.body;
    if (!sku || !name || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await Item.findOne({ sku });
    if (existing) {
      return res.status(409).json({ message: "Item with this SKU already exists." });
    }

    const item = await Item.create({ sku, name, price });
    res.status(201).json(item);
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({ message: "Server error creating item." });
  }
});

// Get all items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

export default router;
