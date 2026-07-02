import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, token } = useContext(AppContext);

  // If not logged in, redirect to login page
  if (!token || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If account is suspended
  if (currentUser.status === 'suspended') {
    return <Navigate to="/login" state={{ error: "Your account is suspended. Please contact support." }} replace />;
  }

  // If role is not allowed
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to landing or their respective dashboard
    const defaultRedirects = {
      referee: '/dashboard/referee',
      instructor: '/dashboard/instructor',
      admin: '/dashboard/admin'
    };
    return <Navigate to={defaultRedirects[currentUser.role] || '/'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
