import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/employees").then((r) => setEmployees(r.data));
  }, []);

  const addEmployee = async () => {
    if (!name.trim()) return;
    const { data } = await api.post("/employees", { name });
    setEmployees([...employees, data]);
    setName("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={addEmployee}>
          Add
        </button>
      </div>
      <ul className="border rounded divide-y">
        {employees.map((e) => (
          <li key={e._id} className="p-2">{e.name}</li>
        ))}
      </ul>
    </div>
  );
}

