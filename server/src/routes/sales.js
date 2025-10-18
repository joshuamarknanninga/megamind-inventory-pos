import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const saleSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model("Sale", saleSchema);

// Create sale
router.post("/", async (req, res) => {
  try {
    const { storeId, items } = req.body;

    if (!storeId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid sale data." });
    }

    const sale = await Sale.create({ storeId, items });
    res.status(201).json(sale);
  } catch (err) {
    console.error("Error creating sale:", err);
    res.status(500).json({ message: "Error creating sale." });
  }
});

// Get all sales for store
router.get("/:storeId", async (req, res) => {
  try {
    const sales = await Sale.find({ storeId: req.params.storeId }).sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ message: "Error fetching sales." });
  }
});

export default router;
