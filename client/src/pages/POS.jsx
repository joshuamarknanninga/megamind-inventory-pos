import React, { useState } from "react";
import { useApp } from "../lib/store";
import { api } from "../lib/api";
import Barcode from "../components/Barcode";

export default function Pos() {
  const { selectedStore } = useApp();
  const [cart, setCart] = useState([]);
  const [sku, setSku] = useState("");

  const addItem = async () => {
    if (!sku) return;
    try {
      const { data } = await api.get(`/items/sku/${sku}`);
      const existing = cart.find((i) => i._id === data._id);
      if (existing) {
        existing.qty += 1;
        setCart([...cart]);
      } else {
        setCart([...cart, { ...data, qty: 1 }]);
      }
      setSku("");
    } catch {
      alert("Item not found!");
    }
  };

  const removeItem = (id) => setCart(cart.filter((i) => i._id !== id));
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);

  const checkout = async () => {
    if (!selectedStore) return alert("Select a store first!");
    await api.post("/sales", { storeId: selectedStore, items: cart });
    alert("Sale completed!");
    setCart([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Enter SKU or scan barcode"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={addItem}>
          Add
        </button>
      </div>

      <div className="overflow-auto border rounded mb-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.qty}</td>
                <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                <td className="p-2 text-right">${(item.price * item.qty).toFixed(2)}</td>
                <td className="p-2 text-right">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => removeItem(item._id)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Total: ${total}</div>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={checkout}
          disabled={!cart.length}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

