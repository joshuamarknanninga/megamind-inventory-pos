import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";

const router = Router();

/**
 * 🧑‍💻 REGISTER — Admin or seed script
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Employee with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const employee = await Employee.create({
      name,
      email,
      passwordHash,
      role: role || "cashier",
    });

    return res.status(201).json({
      message: "✅ Employee registered successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 🔐 LOGIN
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ✅ Ensure passwordHash is defined before comparing
    const passwordHash: string = employee.passwordHash ?? "";
    const validPassword = await bcrypt.compare(password, passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // ✅ Ensure JWT secret is defined
    const jwtSecret = process.env.JWT_SECRET ?? "";
    if (!jwtSecret) {
      console.error("❌ JWT_SECRET is missing from environment variables.");
      return res.status(500).json({ error: "Server misconfiguration." });
    }

    const token = jwt.sign(
      {
        id: employee._id.toString(),
        email: employee.email,
        role: employee.role,
      },
      jwtSecret,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "✅ Login successful",
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
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 🔄 VERIFY TOKEN
 */
router.get("/verify", async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ valid: false, error: "No token provided" });
  }

  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (!jwtSecret) {
    console.error("❌ JWT_SECRET is missing from environment variables.");
    return res.status(500).json({ error: "Server misconfiguration." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    console.warn("⚠️ Invalid token:", err);
    return res.status(401).json({ valid: false });
  }
});

export default router;
