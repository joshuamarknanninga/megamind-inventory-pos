import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  qty: { type: Number, default: 0 },
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
