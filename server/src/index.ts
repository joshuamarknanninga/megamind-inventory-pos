import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import authRoutes from './auth/auth.routes.js';
import storeRoutes from './routes/store.routes.js';
import itemRoutes from './routes/item.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import salesRoutes from './routes/sales.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import squareRoutes from './routes/square.routes.js';

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'Megamind' }));
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/square', squareRoutes);

const port = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(port, () => console.log(`API on :${port}`));
});
