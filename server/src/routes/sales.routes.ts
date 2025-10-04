import { Router } from 'express';
import Sale from '../models/Sale.js';
import Inventory from '../models/Inventory.js';
const r = Router();

r.get('/', async (req, res) => {
  const { storeId, from, to } = req.query;
  const q:any = {};
  if (storeId) q.storeId = storeId;
  if (from || to) q.createdAt = { ...(from ? { $gte: new Date(from as string) } : {}), ...(to ? { $lte: new Date(to as string) } : {}) };
  const sales = await Sale.find(q).sort({ createdAt: -1 }).lean();
  res.json(sales);
});

// finalize (used by Square webhook) or cash sale
r.post('/finalize', async (req, res) => {
  const { saleId } = req.body;
  const sale = await Sale.findByIdAndUpdate(saleId, { status: 'paid' }, { new: true });
  // decrement inventory
  if (sale) {
    await Promise.all(sale.items.map(it =>
      Inventory.findOneAndUpdate({ storeId: sale.storeId, itemId: it.itemId }, { $inc: { qty: -Math.abs(it.qty) } })
    ));
  }
  res.json(sale);
});

// create pending sale (cart pre-payment)
r.post('/', async (req, res) => {
  const sale = await Sale.create(req.body); // status=pending
  res.json(sale);
});

export default r;
