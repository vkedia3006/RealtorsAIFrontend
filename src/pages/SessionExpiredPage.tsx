import React from 'react';
import { Link } from 'react-router-dom';

const SessionExpiredPage: React.FC = () => {
  return (
    <div className="container">
      <h2>Session Expired</h2>
      <p>Your session has expired. Please login again to continue.</p>
      <Link to="/" className="button">
        Return to Login
      </Link>
    </div>
  );
};

export default SessionExpiredPage;
