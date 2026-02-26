import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Haberler from './pages/Haberler';
import Programcilar from './pages/Programcilar';
import Sarkilar from './pages/Sarkilar';
import Sponsorlar from './pages/Sponsorlar';

function AdminContent() {
  const [currentPage, setCurrentPage] = useState('/admin');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case '/admin':
        return <Dashboard />;
      case '/admin/haberler':
        return <Haberler />;
      case '/admin/programcilar':
        return <Programcilar />;
      case '/admin/sarkilar':
        return <Sarkilar />;
      case '/admin/sponsorlar':
        return <Sponsorlar />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
