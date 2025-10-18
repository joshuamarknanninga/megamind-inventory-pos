import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    api.get("/employees").then((r) => setEmployees(r.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const { data } = await api.post("/employees", form);
    setEmployees([...employees, data]);
    setForm({ name: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 border rounded mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Add New Employee</h2>
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Employee Name"
            className="border p-2 flex-1 rounded"
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Add
          </button>
        </div>
      </form>

      <ul className="border rounded divide-y">
        {employees.map((e) => (
          <li key={e._id} className="p-2">{e.name}</li>
        ))}
      </ul>
    </div>
  );
}
