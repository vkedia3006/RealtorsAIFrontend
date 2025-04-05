import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: { accessToken: string; name: string } | null;
  login: (userData: { accessToken: string; name: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    accessToken: string;
    name: string;
  } | null>(null);

  const login = (userData: { accessToken: string; name: string }) =>
    setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
