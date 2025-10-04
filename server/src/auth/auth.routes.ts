import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";

const router = Router();

/**
 * 🧑‍💻 REGISTER (optional)
 * Only admins should call this — or use a seeding script to create initial admin.
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Employee with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, passwordHash, role: role || "cashier" });

    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 🔐 LOGIN
 * Validates credentials and returns a signed JWT.
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(password, employee.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        id: employee._id.toString(),
        email: employee.email,
        role: employee.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 🔄 VERIFY TOKEN (Optional — for frontend auth persistence)
 */
router.get("/verify", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.json({ valid: true, user: decoded });
  } catch {
    res.status(401).json({ valid: false });
  }
});

export default router;
