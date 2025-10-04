import { ZodSchema } from 'zod';
export const validate = <T>(schema: ZodSchema<T>) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (e:any) {
    res.status(400).json({ error: e.errors ?? e.message });
  }
};
