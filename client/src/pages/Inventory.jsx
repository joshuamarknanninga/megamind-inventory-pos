import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import StorePicker from "../components/StorePicker";

export default function Inventory() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ sku: "", name: "", price: "" });

  useEffect(() => {
    api.get("/stores").then((res) => setStores(res.data));
  }, []);

  useEffect(() => {
    if (selectedStore) {
      api.get(`/inventory/${selectedStore}`).then((res) => setItems(res.data));
    }
  }, [selectedStore]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore) return alert("Please select a store first!");
    try {
      const { data } = await api.post("/items", form);
      setItems([...items, { ...data, qty: 0 }]);
      setForm({ sku: "", name: "", price: "" });
    } catch {
      alert("Error adding item.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <StorePicker />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 border rounded mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Add New Item</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Add Item
        </button>
      </form>

      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-center">Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.itemId} className="border-t">
                <td className="p-2">{i.sku}</td>
                <td className="p-2">{i.name}</td>
                <td className="p-2 text-right">${i.price.toFixed(2)}</td>
                <td className="p-2 text-center">{i.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
