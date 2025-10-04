import { Schema, model } from 'mongoose';
const EmployeeSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['admin','manager','cashier'], default: 'cashier' },
  passwordHash: String
}, { timestamps: true });

export default model('Employee', EmployeeSchema);
