import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import Sales from "./pages/Sales";

import Pos from "./pages/Pos";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </main>
    </div>
  );
}