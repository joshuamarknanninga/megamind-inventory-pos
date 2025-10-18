import React from "react";
import StorePicker from '../components/StorePicker';

export default function Dashboard(){
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Megamind Dashboard</h1>
        <StorePicker />
      </div>
      <p className="text-gray-700">Choose a store and jump into POS, Inventory, Sales, or Employees. Your brainy empire awaits. 🧠</p>
    </div>
  );
}
