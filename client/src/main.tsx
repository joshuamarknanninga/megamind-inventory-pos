import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './lib/pwa-sw-reg';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
