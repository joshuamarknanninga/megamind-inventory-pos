import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  const link = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded ${
          isActive ? "bg-sky-600 text-white" : "text-sky-700 hover:bg-sky-100"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between p-3 border-b">
      <Link to="/" className="text-xl font-bold text-sky-700">
        Megamind
      </Link>
      <div className="flex gap-2">
        {link("/pos", "POS")}
        {link("/inventory", "Inventory")}
        {link("/sales", "Sales")}
        {link("/employees", "Employees")}
      </div>
    </nav>
  );
}

