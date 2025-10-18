import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useApp } from '../lib/store';

export default function InventoryTable() {
  const { selectedStore } = useApp();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!selectedStore) {
      setRows([]);
      return;
    }

    async function fetchInventory() {
      try {
        const response = await api.get(`/inventory/${selectedStore}`);
        setRows(response.data || []);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    }

    fetchInventory();
  }, [selectedStore]);

  const adjust = async (itemId, delta) => {
    if (!selectedStore) return;

    try {
      await api.post('/inventory/adjust', {
        storeId: selectedStore,
        itemId,
        delta,
      });
      const response = await api.get(`/inventory/${selectedStore}`);
      setRows(response.data || []);
    } catch (error) {
      console.error('Error adjusting inventory:', error);
    }
  };

  return (
    <div className="overflow-auto border rounded-md shadow-sm bg-white">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left font-semibold">SKU</th>
            <th className="p-2 text-left font-semibold">Name</th>
            <th className="p-2 text-center font-semibold">Qty</th>
            <th className="p-2 text-right font-semibold">Price</th>
            <th className="p-2 text-center font-semibold">Adjust</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                {selectedStore
                  ? 'No inventory found for this store.'
                  : 'Please select a store first.'}
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.itemId} className="border-t hover:bg-gray-50">
                <td className="p-2">{r.sku}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2 text-center">{r.qty}</td>
                <td className="p-2 text-right">${Number(r.price).toFixed(2)}</td>
                <td className="p-2 text-center">
                  <button
                    className="px-2 py-1 border rounded mr-1 text-green-700 hover:bg-green-50"
                    onClick={() => adjust(r.itemId, 1)}
                  >
                    +1
                  </button>
                  <button
                    className="px-2 py-1 border rounded text-red-700 hover:bg-red-50"
                    onClick={() => adjust(r.itemId, -1)}
                  >
                    -1
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}