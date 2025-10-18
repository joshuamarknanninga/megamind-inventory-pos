import React from "react";
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useApp } from '../lib/store';

export default function StorePicker() {
  const { selectedStore, setStore } = useApp();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await api.get('/stores');
        setStores(response.data || []);
      } catch (error) {
        console.error('Failed to fetch stores:', error);
      }
    }
    fetchStores();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Store:</span>
      <select
        value={selectedStore}
        onChange={(e) => setStore(e.target.value)}
        className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="">Select store…</option>
        {stores.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}

