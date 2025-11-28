import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
  };

  const signup = async (name, email, password) => {
    const res = await axios.post('/api/auth/signup', { name, email, password });
    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const authAxios = axios.create();
  authAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
