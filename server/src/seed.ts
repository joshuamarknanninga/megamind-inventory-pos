import { connectDB } from './db.js';
import Store from './models/Store.js';

await connectDB();
await Store.deleteMany({});
await Store.create([
  { name:'Downtown', code:'ST01' },
  { name:'Uptown',   code:'ST02' },
  { name:'Mall',     code:'ST03' },
  { name:'Outlet',   code:'ST04' }
]);
console.log('Seeded stores'); process.exit(0);
