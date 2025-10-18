import { useState } from 'react';
import { useApp } from '../lib/store';
import StorePicker from '../components/StorePicker';
import InventoryTable from '../components/InventoryTable';
import Barcode from '../components/Barcode';

export default function Inventory() {
  const { selectedStore } = useApp();
  const [barcodeValue, setBarcodeValue] = useState('');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sky-700">Inventory Management</h1>
        <StorePicker />
      </div>

      {!selectedStore ? (
        <div className="text-gray-500 text-center p-6 border rounded bg-gray-50">
          Please select a store to view inventory.
        </div>
      ) : (
        <>
          <InventoryTable />

          <div className="mt-6 border rounded p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Barcode Preview
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                placeholder="Enter SKU or Product ID"
                className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Barcode value={barcodeValue} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

