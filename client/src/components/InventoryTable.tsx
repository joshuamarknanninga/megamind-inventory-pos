import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useApp } from '../lib/store';

export default function InventoryTable(){
  const { selectedStore } = useApp();
  const [rows,setRows] = useState<any[]>([]);
  useEffect(()=>{ if(selectedStore) api.get('/inventory/'+selectedStore).then(r=>setRows(r.data)); },[selectedStore]);
  const adjust = async (itemId:string, delta:number)=>{
    if(!selectedStore) return;
    await api.post('/inventory/adjust',{ storeId:selectedStore, itemId, delta });
    const r = await api.get('/inventory/'+selectedStore);
    setRows(r.data);
  };
  return (
    <div className="overflow-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr><th className="p-2 text-left">SKU</th><th className="p-2 text-left">Name</th><th className="p-2">Qty</th><th className="p-2">Price</th><th className="p-2">Adjust</th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.itemId} className="border-t">
              <td className="p-2">{r.sku}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2 text-center">{r.qty}</td>
              <td className="p-2 text-right">${r.price.toFixed(2)}</td>
              <td className="p-2 text-center">
                <button className="px-2 py-1 border rounded mr-1" onClick={()=>adjust(r.itemId, +1)}>+1</button>
                <button className="px-2 py-1 border rounded" onClick={()=>adjust(r.itemId, -1)}>-1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
