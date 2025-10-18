import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

/**
 * ✅ Zod validation middleware
 */
export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors ?? err.message,
      });
    }
  };
