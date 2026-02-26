import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Check if we're on admin page
const isAdminPage = window.location.pathname.startsWith('/admin');

if (isAdminPage) {
  // Load Admin App
  import('./admin/AdminApp').then(({ default: AdminApp }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AdminApp />
      </StrictMode>
    );
  });
} else {
  // Load Main Site App
  import('./App').then(({ default: App }) => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}
