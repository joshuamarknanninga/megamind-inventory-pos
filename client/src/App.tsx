import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import Nav from './components/Nav';
import './styles/tailwind.css';

export default function App(){
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <RouterProvider router={router} />
    </div>
  );
}
