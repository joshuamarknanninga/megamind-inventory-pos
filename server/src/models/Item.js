import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Item = mongoose.model("Item", itemSchema);
