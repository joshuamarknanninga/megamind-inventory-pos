import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['cashier', 'manager', 'admin'], default: 'cashier' },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev watch
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;
