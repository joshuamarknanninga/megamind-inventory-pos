import { Router } from 'express';
import Store from '../models/Store.js';
const r = Router();
r.get('/', async (_req,res)=> res.json(await Store.find().lean()));
r.post('/', async (req,res)=> res.json(await Store.create(req.body)));
export default r;
