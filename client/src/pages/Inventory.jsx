import React from "react";
import StorePicker from "../components/StorePicker";
import InventoryTable from "../components/InventoryTable";

export default function Inventory() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <StorePicker />
      </div>
      <InventoryTable />
    </div>
  );
}
