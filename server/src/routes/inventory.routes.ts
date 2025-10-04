import { Router } from 'express';
import Inventory from '../models/Inventory.js';
import Item from '../models/Item.js';
const r = Router();

// list by store
r.get('/:storeId', async (req, res) => {
  const inv = await Inventory.find({ storeId: req.params.storeId }).populate('itemId').lean();
  res.json(inv.map(v => ({
    itemId: v.itemId._id,
    sku: v.itemId.sku,
    name: v.itemId.name,
    qty: v.qty,
    price: v.itemId.price,
    barcode: v.itemId.barcode
  })));
});

// adjust quantity (+/-)
r.post('/adjust', async (req, res) => {
  const { storeId, itemId, delta } = req.body;
  const doc = await Inventory.findOneAndUpdate(
    { storeId, itemId },
    { $inc: { qty: delta } },
    { new: true, upsert: true }
  );
  res.json(doc);
});

export default r;
