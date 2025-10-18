import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hiredAt: { type: Date, default: Date.now },
});

export const Employee = mongoose.model("Employee", employeeSchema);
