import { Router, Request, Response } from "express";
import Inventory from "../models/Inventory.js";
import Sale from "../models/Sale.js";

const router = Router();

/**
 * 💸 Handle sale and update inventory quantities
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const sale = await Sale.create(req.body);

    // Example logic: decrement inventory for each sold item
    for (const it of sale.items) {
      await Inventory.findOneAndUpdate(
        { storeId: sale.storeId, itemId: it.itemId },
        { $inc: { qty: -Math.abs(it.qty ?? 0) } } // ✅ fix: qty fallback
      );
    }

    return res.json({ message: "✅ Sale recorded successfully", sale });
  } catch (err) {
    console.error("❌ Sale creation error:", err);
    return res.status(500).json({ error: "Failed to process sale." });
  }
});

export default router;
