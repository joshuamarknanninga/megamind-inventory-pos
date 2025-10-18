import { useState, useEffect } from "react";
import { api } from "../lib/api";
import SalesFilter from "../components/SalesFilter";

export default function Sales() {
  const [sales, setSales] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});

  // 🔄 Fetch sales from API
  const fetchSales = async (newFilters = {}) => {
    const { data } = await api.get("/sales", { params: newFilters });
    setSales(data);
    setFilters(newFilters); // store filters so CSV export uses the same data set
  };

  useEffect(() => {
    fetchSales(); // load all sales initially
  }, []);

  // 📤 Export sales to CSV
  const exportCSV = () => {
    if (sales.length === 0) {
      alert("No sales data to export.");
      return;
    }

    // Define CSV headers
    const headers = [
      "Date",
      "Store",
      "Employee",
      "Items Sold",
      "Subtotal",
      "Tax",
      "Total",
      "Status",
    ];

    // Format each sale row
    const rows = sales.map((s) => [
      new Date(s.createdAt).toLocaleDateString(),
      s.storeId?.name || "N/A",
      s.employeeId?.name || "N/A",
      s.items.reduce((acc: number, it: any) => acc + it.qty, 0),
      s.subtotal?.toFixed(2) || "0.00",
      s.tax?.toFixed(2) || "0.00",
      s.total?.toFixed(2) || "0.00",
      s.status || "pending",
    ]);

    // Build CSV string
    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((val) => `"${val}"`).join(","))
        .join("\n");

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            📤 Export CSV
          </button>
          <button
            onClick={() => fetchSales(filters)}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* 🔍 Filters */}
      <SalesFilter onFilter={fetchSales} />

      {/* 📊 Sales Table */}
      <div className="border rounded-md overflow-auto bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Store</th>
              <th className="p-2 text-left">Employee</th>
              <th className="p-2 text-center">Items Sold</th>
              <th className="p-2 text-right">Subtotal</th>
              <th className="p-2 text-right">Tax</th>
              <th className="p-2 text-right">Total</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No sales found for the selected filters.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-2">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{s.storeId?.name || "N/A"}</td>
                  <td className="p-2">{s.employeeId?.name || "N/A"}</td>
                  <td className="p-2 text-center">
                    {s.items.reduce((acc: number, it: any) => acc + it.qty, 0)}
                  </td>
                  <td className="p-2 text-right">${s.subtotal?.toFixed(2) || "0.00"}</td>
                  <td className="p-2 text-right">${s.tax?.toFixed(2) || "0.00"}</td>
                  <td className="p-2 text-right font-semibold">${s.total?.toFixed(2) || "0.00"}</td>
                  <td
                    className={`p-2 text-center font-medium ${
                      s.status === "paid"
                        ? "text-green-600"
                        : s.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {s.status || "pending"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
