import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useApp } from "../lib/store";

export default function Sales() {
  const { selectedStore } = useApp();
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ items: "", total: "" });

  useEffect(() => {
    if (selectedStore) {
      api.get(`/sales/${selectedStore}`).then((r) => setSales(r.data));
    }
  }, [selectedStore]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore) return alert("Please select a store first!");
    const saleData = {
      storeId: selectedStore,
      items: form.items.split(",").map((name) => ({
        name: name.trim(),
        price: 10,
        qty: 1,
      })),
    };
    await api.post("/sales", saleData);
    setForm({ items: "", total: "" });
    const { data } = await api.get(`/sales/${selectedStore}`);
    setSales(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 border rounded mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Add Sale</h2>
        <input
          type="text"
          name="items"
          value={form.items}
          onChange={handleChange}
          placeholder="Item names (comma separated)"
          className="border p-2 rounded w-full mb-3"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Record Sale
        </button>
      </form>

      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Items</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
                <td className="p-2">{s.items.map((i) => i.name).join(", ")}</td>
                <td className="p-2 text-right">
                  $
                  {s.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}