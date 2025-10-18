import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hiredAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);

// Add new employee
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required." });

    const employee = await Employee.create({ name });
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ message: "Error adding employee." });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find().sort({ hiredAt: -1 });
  res.json(employees);
});

export default router;

