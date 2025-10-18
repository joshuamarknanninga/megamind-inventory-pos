import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Employees from './pages/Employees';

export const router = createBrowserRouter([
  { path: '/', element: <Dashboard/> },
  { path: '/pos', element: <POS/> },
  { path: '/inventory', element: <Inventory/> },
  { path: '/sales', element: <Sales/> },
  { path: '/employees', element: <Employees/> }
]);
