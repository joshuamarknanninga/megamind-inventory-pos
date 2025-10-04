import { useEffect, useState } from 'react';
import { useApp } from '../lib/store';
import { api } from '../lib/api';
import StorePicker from '../components/StorePicker';

export default function Sales(){
  const { selectedStore } = useApp();
  const [from,setFrom] = useState(''); const [to,setTo] = useState('');
  const [rows,setRows] = useState<any[]>([]);
  const load = async ()=> {
    const { data } = await api.get('/sales', { params:{ storeId:selectedStore, from, to }});
    setRows(data);
  };
  useEffect(()=>{ if(selectedStore) load(); },[selectedStore]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales</h1>
        <StorePicker />
      </div>
      <div className="flex gap-2">
        <input type="date" className="border p-2" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="border p-2" value={to} onChange={e=>setTo(e.target.value)} />
        <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={load}>Filter</button>
      </div>
      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Date</th><th className="p-2">Items</th><th className="p-2">Total</th><th className="p-2">Status</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r._id} className="border-t">
                <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="p-2 text-center">{r.items.reduce((s:any,x:any)=>s+x.qty,0)}</td>
                <td className="p-2 text-right">${r.total.toFixed(2)}</td>
                <td className="p-2 text-center">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
