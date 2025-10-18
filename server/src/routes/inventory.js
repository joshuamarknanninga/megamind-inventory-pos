import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const inventorySchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  qty: { type: Number, default: 0 },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

// Get inventory for a store
router.get("/:storeId", async (req, res) => {
  try {
    const inventory = await Inventory.find({ storeId: req.params.storeId }).populate("itemId");
    const result = inventory.map((i) => ({
      itemId: i.itemId._id,
      sku: i.itemId.sku,
      name: i.itemId.name,
      price: i.itemId.price,
      qty: i.qty,
    }));
    res.json(result);
  } catch (err) {
    console.error("Error fetching inventory:", err);
    res.status(500).json({ message: "Error fetching inventory." });
  }
});

// Adjust item quantity
router.post("/adjust", async (req, res) => {
  try {
    const { storeId, itemId, delta } = req.body;
    if (!storeId || !itemId || typeof delta !== "number") {
      return res.status(400).json({ message: "Invalid adjustment request." });
    }

    const inv = await Inventory.findOneAndUpdate(
      { storeId, itemId },
      { $inc: { qty: delta } },
      { new: true, upsert: true }
    );

    res.json(inv);
  } catch (err) {
    console.error("Error adjusting inventory:", err);
    res.status(500).json({ message: "Error adjusting inventory." });
  }
});

export default router;

