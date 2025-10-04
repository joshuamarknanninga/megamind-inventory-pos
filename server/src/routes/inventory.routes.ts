import { Router, Request, Response } from "express";
import Inventory from "../models/Inventory.js";

const router = Router();

/**
 * 📦 GET Inventory for a Store (Populated with item details)
 */
router.get("/:storeId", async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.find({ storeId: req.params.storeId }).populate("itemId");

    const formatted = inventory.map(v => {
      // TypeScript thinks itemId is an ObjectId, but it's populated here
      const item = v.itemId as any;
      return {
        sku: item?.sku ?? "N/A",
        name: item?.name ?? "Unnamed",
        price: item?.price ?? 0,
        barcode: item?.barcode ?? "N/A",
        qty: v.qty ?? 0,
      };
    });

    return res.json(formatted);
  } catch (err) {
    console.error("❌ Inventory fetch error:", err);
    return res.status(500).json({ error: "Failed to load inventory." });
  }
});

export default router;
