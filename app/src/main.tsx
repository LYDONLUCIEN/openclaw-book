import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// No StrictMode — prevents canvas effects from running twice
// Use HashRouter for static file compatibility
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
