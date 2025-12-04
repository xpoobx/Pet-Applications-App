import React, { createContext, useContext, useState } from 'react';
import { login as loginApi } from '../api/auth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Login function
  const login = async (credentials) => {
    const data = await loginApi(credentials);
    const storedUser = { ...data.user, token: data.token }; 
    setUser(storedUser);
    localStorage.setItem('user', JSON.stringify(storedUser));
    return storedUser;
  };

  // Signup function
  const signup = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    const storedUser = { ...res.data.user, token: res.data.token };
    setUser(storedUser);
    localStorage.setItem('user', JSON.stringify(storedUser));
    return storedUser;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Axios instance for authenticated requests (relative URL!)
  const authAxios = axios.create({
    baseURL: 'https://pet-applications-app.onrender.com',
    headers: { 'Content-Type': 'application/json' },
  });

  // Add token dynamically
  authAxios.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authAxios }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

