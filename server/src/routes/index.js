// client/src/routes/index.js
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import POS from '../pages/POS';
import Inventory from '../pages/Inventory';
import Sales from '../pages/Sales';
import Employees from '../pages/Employees';
import NotFound from '../pages/NotFound';

function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'pos', element: <POS /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'sales', element: <Sales /> },
      { path: 'employees', element: <Employees /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
