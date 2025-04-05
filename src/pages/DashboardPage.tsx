import React from 'react';
import { useAuth } from '../auth/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className='container'>
      <h2>Welcome to the dashboard!</h2>
      <p>You are logged in as: {user?.name || 'unknown user'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
