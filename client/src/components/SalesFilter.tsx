import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface SalesFilterProps {
  onFilter: (filters: { storeId?: string; from?: string; to?: string; keyword?: string }) => void;
}

interface Store {
  _id: string;
  name: string;
}

export default function SalesFilter({ onFilter }: SalesFilterProps) {
  const [stores, setStores] = useState<Store[]>([]);
  const [storeId, setStoreId] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  // 🔄 Load stores on mount (for dropdown)
  useEffect(() => {
    const loadStores = async () => {
      const { data } = await api.get("/stores");
      setStores(data);
    };
    loadStores();
  }, []);

  // 📊 Submit filter data back to parent component
  const applyFilters = () => {
    onFilter({ storeId, from, to, keyword });
  };

  // 🧹 Reset filters
  const clearFilters = () => {
    setStoreId("");
    setFrom("");
    setTo("");
    setKeyword("");
    onFilter({});
  };

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filter Sales</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* 🏬 Store Selector */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Store</label>
          <select
            className="border p-2 rounded"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          >
            <option value="">All Stores</option>
            {stores.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* 📅 From Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">From</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        {/* 📅 To Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">To</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* 🔍 Keyword Search */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Search (Item / Employee)</label>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="e.g., T-shirt or John"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
