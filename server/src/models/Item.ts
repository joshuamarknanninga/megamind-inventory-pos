import { Schema, model, Types } from 'mongoose';
const ItemSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  barcode: { type: String, unique: true },
  price: { type: Number, required: true },
  cost: { type: Number, default: 0 },
  category: { type: String },
  description: { type: String }
}, { timestamps: true });

export type ItemDoc = {
  _id: Types.ObjectId; name: string; sku: string; barcode?: string;
  price: number; cost: number; category?: string; description?: string;
}
export default model('Item', ItemSchema);
