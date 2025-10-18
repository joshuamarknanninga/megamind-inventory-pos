import { Router, Request, Response } from "express";
import { createPaymentLink } from "../services/square.service.js";

const router = Router();

/**
 * 💳 Create a payment link for a sale
 */
router.post("/payment-link", async (req: Request, res: Response) => {
  try {
    const { sale, saleId } = req.body as { sale: any; saleId: string };

    const total = sale?.total ?? 0; // ✅ fix: ensure it's a number
    const url = await createPaymentLink(Math.round(total * 100), `Sale ${saleId}`);

    return res.json({ url });
  } catch (err) {
    console.error("❌ Payment link error:", err);
    return res.status(500).json({ error: "Failed to create payment link." });
  }
});

export default router;
