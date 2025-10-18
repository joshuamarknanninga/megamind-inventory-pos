import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Sale = mongoose.model("Sale", saleSchema);

