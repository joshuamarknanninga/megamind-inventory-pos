import React from "react";
import { Link } from 'react-router-dom';
import { useApp } from '../lib/store';
import StorePicker from '../components/StorePicker';

export default function Home() {
  const { selectedStore } = useApp();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-sky-700">Welcome to Megamind POS</h1>
      <p className="text-gray-600 text-lg">
        Manage your inventory, sales, and employees all in one place.
      </p>

      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Select a Store</h2>
        <StorePicker />
      </div>

      {selectedStore ? (
        <div className="text-green-700 font-medium">
          ✅ Active store: <span className="font-semibold">{selectedStore}</span>
        </div>
      ) : (
        <div className="text-gray-500">Please select a store to begin.</div>
      )}

      <div className="flex flex-wrap gap-3 pt-6">
        <Link
          to="/inventory"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors"
        >
          Manage Inventory
        </Link>
        <Link
          to="/pos"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Open POS
        </Link>
      </div>
    </div>
  );
}
