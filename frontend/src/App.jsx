import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProjectsAdmin = lazy(() => import('./pages/admin/ProjectsAdmin'));
const ClientsAdmin = lazy(() => import('./pages/admin/ClientsAdmin'));
const ContactsAdmin = lazy(() => import('./pages/admin/ContactsAdmin'));
const SubscribersAdmin = lazy(() => import('./pages/admin/SubscribersAdmin'));

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ADMIN_TOKEN');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Loading Spinner
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsAdmin /></ProtectedRoute>} />
          <Route path="/admin/clients" element={<ProtectedRoute><ClientsAdmin /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><ContactsAdmin /></ProtectedRoute>} />
          <Route path="/admin/subscribers" element={<ProtectedRoute><SubscribersAdmin /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
