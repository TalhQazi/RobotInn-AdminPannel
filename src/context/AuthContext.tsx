import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  adminName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('robotinn_auth') === 'true';
  });

  const login = (email: string, password: string) => {
    if (email === 'admin@robotinn.com' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('robotinn_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('robotinn_auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, adminName: 'Admin User' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
