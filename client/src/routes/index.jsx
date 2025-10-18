import { createBrowserRouter, Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

function RootLayout() {
  return (
    <div>
      <Nav /> {/* ✅ Nav is now INSIDE router context */}
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
