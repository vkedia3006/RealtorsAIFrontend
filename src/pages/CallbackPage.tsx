import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const CallbackPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      // Step 1: Send the `code` to your backend to get the access token
      fetch('https://yourbackend.com/facebook/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            // Step 2: Store the token (we'll handle token storage later)
            login({ accessToken: data.access_token, name: 'User Name' }); // Use real data from Facebook
            navigate('/dashboard');
          } else {
            setError('Login failed. Please try again.');
            setLoading(false);
          }
        })
        .catch(() => {
          setError('Error occurred. Please try again.');
          setLoading(false);
        });
    } else {
      setError('No authorization code found.');
      setLoading(false);
    }
  }, [navigate, login]);

  if (loading) {
    return <div className='loading'>Please wait, verifying...</div>;
  }

  return (
    <div className='container'>
      {error ? (
        <p className='error'>{error}</p>
      ) : (
        <p>Verification successful! Redirecting...</p>
      )}
    </div>
  );
};

export default CallbackPage;
