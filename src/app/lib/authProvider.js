'use client';
import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    userName: null,
    apiKey: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const apiKey = localStorage.getItem('apiKey');

    if (token && userName && apiKey) {
      setAuth({ token, userName, apiKey });
    }
  }, []);

  const login = (token, userName, apiKey) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('apiKey', apiKey);
    setAuth({ token, userName, apiKey });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('apiKey');
    setAuth({ token: null, userName: null, apiKey: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
