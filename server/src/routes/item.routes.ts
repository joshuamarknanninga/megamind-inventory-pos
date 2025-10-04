import { Router } from 'express';
import Item from '../models/Item.js';
import Inventory from '../models/Inventory.js';
import Store from '../models/Store.js';
const r = Router();

r.get('/', async (_req, res) => {
  const items = await Item.find().limit(500).lean();
  res.json(items);
});

r.post('/', async (req, res) => {
  const i = await Item.create(req.body);
  // initialize zero inventory per store
  const stores = await Store.find();
  await Promise.all(stores.map(s => Inventory.create({ storeId: s._id, itemId: i._id, qty: 0 })));
  res.json(i);
});

r.put('/:id', async (req, res) => {
  const i = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(i);
});

r.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  await Inventory.deleteMany({ itemId: req.params.id });
  res.json({ ok: true });
});

export default r;
