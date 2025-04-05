import React from 'react';
import FacebookLoginButton from '../components/FacebookLoginButton';

const LoginPage: React.FC = () => {
  return (
    <div className='container'>
      <h1>Login with Facebook</h1>
      <FacebookLoginButton />
    </div>
  );
};

export default LoginPage;
