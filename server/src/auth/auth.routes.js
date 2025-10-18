import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Employee } from "../models/Employee.js";
import { config } from "../config.js";

const router = express.Router();

/**
 * Signup route — create a new employee
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, password: hashed });

    const token = jwt.sign({ id: employee._id, email }, config.jwtSecret, {
      expiresIn: "7d",
    });

    res.json({ token, employee });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/**
 * Login route — validate credentials and return JWT
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, employee.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: employee._id, email }, config.jwtSecret, {
      expiresIn: "7d",
    });

    res.json({ token, employee });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;

