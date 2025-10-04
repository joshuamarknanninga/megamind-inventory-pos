import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Employees(){
  const [rows,setRows] = useState<any[]>([]);
  const [name,setName] = useState(''); const [email,setEmail] = useState('');
  const load = async ()=> setRows((await api.get('/employees')).data);
  useEffect(()=>{ load(); },[]);
  const add = async ()=>{
    await api.post('/employees',{ name, email, role:'cashier' });
    setName(''); setEmail(''); load();
  };
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Employees</h1>
      <div className="flex gap-2">
        <input className="border p-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={add}>Add</button>
      </div>
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr><th className="p-2 text-left">Name</th><th className="p-2 text-left">Email</th><th className="p-2">Role</th></tr></thead>
          <tbody>{rows.map(r=><tr key={r._id} className="border-t"><td className="p-2">{r.name}</td><td className="p-2">{r.email}</td><td className="p-2 text-center">{r.role}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
