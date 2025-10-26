// server/src/auth/auth.routes.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Employee from '../models/Employee.js'; // ensure this exists

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(401).json({ error: 'Invalid credentials.' });

    const ok = await bcrypt.compare(password, employee.passwordHash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid credentials.' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: 'Server misconfiguration (JWT secret)' });

    const token = jwt.sign(
      { id: employee._id.toString(), email: employee.email, role: employee.role },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      message: '✅ Login successful',
      token,
      user: { id: employee._id, name: employee.name, email: employee.email, role: employee.role },
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
