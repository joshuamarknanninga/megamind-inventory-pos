import { Schema, model } from 'mongoose';
const SaleSchema = new Schema({
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
  items: [{
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
    name: String,
    price: Number,
    qty: Number
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: { type: String, enum: ['pending','paid','void'], default: 'pending' },
  squarePaymentId: String
}, { timestamps: true });

export default model('Sale', SaleSchema);
