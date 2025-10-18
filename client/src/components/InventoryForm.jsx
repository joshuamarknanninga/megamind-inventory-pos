import { useState } from 'react';
import { api } from '../lib/api';
import Barcode from './Barcode';

export default function InventoryForm(){
  const [form,setForm] = useState({ name:'', sku:'', barcode:'', price:0, cost:0, category:'', description:'' });
  const save = async () => {
    const r = await api.post('/items', form);
    alert('Saved '+r.data.name);
  };
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="border p-2" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})}/>
        <input className="border p-2" placeholder="Barcode" value={form.barcode} onChange={e=>setForm({...form,barcode:e.target.value})}/>
        <input className="border p-2" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:+e.target.value})}/>
        <input className="border p-2" type="number" placeholder="Cost" value={form.cost} onChange={e=>setForm({...form,cost:+e.target.value})}/>
        <input className="border p-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
      </div>
      <textarea className="border p-2 w-full" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      {form.barcode && <div className="border p-2"><Barcode value={form.barcode} /></div>}
      <button onClick={save} className="px-4 py-2 bg-sky-600 text-white rounded">Save Item</button>
    </div>
  );
}
