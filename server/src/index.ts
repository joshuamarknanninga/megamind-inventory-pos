import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import authRoutes from './auth/auth.routes';
import storeRoutes from './routes/store.routes.js';
import itemRoutes from './routes/item.routes';
import inventoryRoutes from './routes/inventory.routes';
import salesRoutes from './routes/sales.routes';
import employeeRoutes from './routes/employee.routes';
import squareRoutes from './routes/square.routes';

const app = express();

// 🧰 Core Middleware
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// ✅ Safer CORS config
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['*'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// 🩺 Health Check Route
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'Megamind POS API',
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

// 📦 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/square', squareRoutes);

// ⚠️ Catch-all for unknown routes
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 🚀 Start Server (with DB connection)
const port = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`✅ Megamind API running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1);
  }
})();
