import React, { useEffect, useState } from "react";
import { useApp } from "../lib/store";
import { api } from "../lib/api";

export default function Sales() {
  const { selectedStore } = useApp();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!selectedStore) return;
    api.get(`/sales/${selectedStore}`).then((r) => setSales(r.data));
  }, [selectedStore]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      {!selectedStore && <p className="text-gray-600">Select a store to view sales.</p>}
      {selectedStore && (
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
                    ${s.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

