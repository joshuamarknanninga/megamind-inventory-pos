import { Router } from 'express';
import Employee from '../models/Employee.js';
const r = Router();
r.get('/', async (_req,res)=> res.json(await Employee.find().lean()));
r.post('/', async (req,res)=> res.json(await Employee.create(req.body)));
export default r;
