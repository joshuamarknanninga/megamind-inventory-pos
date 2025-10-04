import { Router } from 'express';
import Sale from '../models/Sale.js';
import { createPaymentLink } from '../services/square.service.js';
const r = Router();

r.post('/link', async (req, res) => {
  const { saleId } = req.body;
  const sale = await Sale.findById(saleId);
  if (!sale) return res.status(404).json({ error: 'Sale not found' });
  const url = await createPaymentLink(Math.round(sale.total * 100), `Sale ${saleId}`);
  res.json({ url });
});

// webhook (set URL in Square dashboard)
r.post('/webhook', async (req, res) => {
  // TODO: verify signature with SQUARE_WEBHOOK_SIGNATURE_KEY
  const event = req.body;
  if (event.type === 'payment.updated' && event.data?.object?.payment?.status === 'COMPLETED') {
    const saleId = event.data.object.payment.note?.replace('Sale ', '');
    if (saleId) await Sale.findByIdAndUpdate(saleId, { status: 'paid', squarePaymentId: event.data.object.payment.id });
  }
  res.json({ ok: true });
});

export default r;
