import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const CallbackPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      // Save tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Corrected: pass BOTH tokens to login()
      login({
        accessToken,
        refreshToken,
        name: 'Facebook User', // (Optional: later fetch real name)
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError('No token found. Login failed.');
      setLoading(false);
    }
  }, [navigate, login]);

  if (loading) {
    return <div className="loading">Please wait, verifying login...</div>;
  }

  return (
    <div className="container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <p>Login successful! Redirecting...</p>
      )}
    </div>
  );
};

export default CallbackPage;
