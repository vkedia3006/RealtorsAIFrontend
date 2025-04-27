import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: { accessToken: string; refreshToken: string; name: string } | null;
  login: (userData: { accessToken: string; refreshToken: string; name: string }) => void;
  logout: (redirectToSessionExpired?: boolean) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ accessToken: string; refreshToken: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setUser({ accessToken, refreshToken, name: 'Facebook User' });
    }
    setIsLoading(false);
  }, []);

  const login = (userData: { accessToken: string; refreshToken: string; name: string }) => {
    setUser(userData);
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
  };

  const logout = (redirectToSessionExpired: boolean = false) => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    if (redirectToSessionExpired) {
      navigate('/session-expired');
    } else {
      navigate('/');
    }
  };

  // AUTO-REFRESH token every minute
  useEffect(() => {
    const interval = setInterval(async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) return;

      try {
        const decoded: any = JSON.parse(atob(accessToken.split('.')[1]));
        const exp = decoded.exp * 1000; // JWT exp is in seconds, convert to ms

        if (Date.now() > exp - 60 * 1000) { // If token is about to expire within 1 min
          console.log('Refreshing token...');

          const response = await fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          const data = await response.json();

          if (response.ok && data.access_token) {
            // <-- This is exactly where your code block goes
            localStorage.setItem('accessToken', data.access_token);
            setUser({ accessToken: data.access_token, refreshToken, name: 'Facebook User' });
          } else {
            logout(true); // Refresh failed, redirect to Session Expired
          }
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        logout(true); // Error during refresh, redirect to Session Expired
      }
    }, 60 * 1000); // Check every 1 min

    return () => clearInterval(interval);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
