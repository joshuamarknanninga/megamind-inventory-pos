import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Store = mongoose.model("Store", storeSchema);
