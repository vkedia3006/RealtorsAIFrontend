import React from 'react';

const FacebookLoginButton: React.FC = () => {
  // Frontend: React component for triggering the Facebook login
  const handleLogin = async () => {
    // Call your backend to initiate the OAuth flow
    const response = await fetch('/start-facebook-login', { method: 'POST' });
    if (response.ok) {
      const { fbLoginUrl } = await response.json();
      window.location.href = fbLoginUrl; // Redirect to Facebook login
    }
  };

  return (
    <button onClick={handleLogin} className='fb-button'>
      Login with Facebook
    </button>
  );
};

export default FacebookLoginButton;
