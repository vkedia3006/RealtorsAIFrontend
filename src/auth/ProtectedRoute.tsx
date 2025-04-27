import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../components/LoadSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Still checking if user is logged in? Show loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // After loading finished:
  if (!user) {
    // User not logged in — redirect to login page
    return <Navigate to="/" replace />;
  }

  // User logged in — render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
