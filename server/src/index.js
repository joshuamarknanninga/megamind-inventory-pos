// server/src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';              // <-- must exist: server/src/db.js
import authRoutes from './auth/auth.routes.js';  // <-- must exist and export default router

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(cors({
  origin: (process.env.CORS_ORIGIN || '*').split(',').map(s => s.trim()),
  credentials: true,
}));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'Megamind POS API',
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

app.use('*', (_req, res) => res.status(404).json({ error: 'Route not found' }));

const port = Number(process.env.PORT || 8080);
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
