import React from 'react';

const FacebookLoginButton: React.FC = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/start-facebook-login`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to start Facebook login');
      }

      const { fbLoginUrl } = await response.json();
      window.location.href = fbLoginUrl;
    } catch (error) {
      console.error('Error during Facebook login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button onClick={handleLogin} className="fb-button">
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;
