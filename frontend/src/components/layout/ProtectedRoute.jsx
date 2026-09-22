import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userInfo, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-secondary tracking-widest text-sm uppercase">Loading...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/admin/login" replace />;
  }

  if (adminOnly && userInfo.role !== 'Admin') {
    return <Navigate to="/" replace />; // Redirect non-admins away
  }

  return <Outlet />;
};

export default ProtectedRoute;
