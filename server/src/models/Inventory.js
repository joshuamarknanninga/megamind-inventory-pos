import { Schema, model, Types } from 'mongoose';
const InventorySchema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  itemId:  { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  qty:     { type: Number, default: 0 }
}, { timestamps: true });
InventorySchema.index({ storeId: 1, itemId: 1 }, { unique: true });

export default model('Inventory', InventorySchema);
