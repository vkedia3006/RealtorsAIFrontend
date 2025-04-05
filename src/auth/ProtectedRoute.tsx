import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Getting user from AuthContext

  // If the user is not logged in, redirect to the login page
  return user ? <>{children}</> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
