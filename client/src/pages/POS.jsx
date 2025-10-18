import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Scanner from '../components/Scanner';
import Cart from '../components/Cart';
import { useApp } from '../lib/store';
import StorePicker from '../components/StorePicker';

export default function POS(){
  const { selectedStore, addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(()=>{ (window as any).CURRENT_STORE = selectedStore; },[selectedStore]);

  const onScan = async (value:string)=>{
    const { data } = await api.get('/items', { params:{ barcode:value } }); // basic demo: filter client side or add endpoint
    const match = data.find((x:any)=>x.barcode===value || x.sku===value);
    if(match) addToCart({ itemId: match._id, name: match.name, price: match.price, qty: 1 });
  };

  const doSearch = async ()=>{
    const { data } = await api.get('/items');
    const q = search.toLowerCase();
    setResults(data.filter((x:any)=>x.name.toLowerCase().includes(q) || x.sku.toLowerCase().includes(q)));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">POS</h1>
        <StorePicker />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <Scanner onScan={onScan} />
          <div className="flex gap-2">
            <input className="border p-2 flex-1" placeholder="Search name or SKU..." value={search} onChange={e=>setSearch(e.target.value)} />
            <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={doSearch}>Search</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {results.map(r=>(
              <button key={r._id} className="border rounded p-2 text-left hover:bg-gray-50"
                onClick={()=>addToCart({ itemId:r._id, name:r.name, price:r.price, qty:1 })}>
                <div className="font-semibold">{r.name}</div>
                <div className="text-sm text-gray-600">{r.sku}</div>
                <div className="text-sm">${r.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>
        <Cart />
      </div>
    </div>
  );
}
