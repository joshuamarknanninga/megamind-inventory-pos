import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function EmployeeForm() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("cashier");
  const [loading, setLoading] = useState(false);

  // 🔄 Load employees on mount
  const loadEmployees = async () => {
    const { data } = await api.get("/employees");
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ➕ Add new employee
  const addEmployee = async () => {
    if (!name || !email) {
      alert("Name and email are required!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/employees", { name, email, role });
      setName("");
      setEmail("");
      setRole("cashier");
      await loadEmployees();
    } catch (err) {
      console.error(err);
      alert("Error adding employee.");
    }
    setLoading(false);
  };

  // ❌ Delete employee
  const deleteEmployee = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this employee?")) return;
    await api.delete(`/employees/${id}`);
    await loadEmployees();
  };

  return (
    <div className="space-y-6">
      {/* Employee Form */}
      <div className="border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Add New Employee</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          onClick={addEmployee}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          {loading ? "Saving..." : "Add Employee"}
        </button>
      </div>

      {/* Employee List */}
      <div className="border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Current Employees</h2>
        {employees.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-center">Role</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id} className="border-t">
                    <td className="p-2">{emp.name}</td>
                    <td className="p-2">{emp.email}</td>
                    <td className="p-2 text-center capitalize">{emp.role}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => deleteEmployee(emp._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
