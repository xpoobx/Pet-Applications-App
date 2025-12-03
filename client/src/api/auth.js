import axios from 'axios';

export const signup = async (userData) => {
  const res = await axios.post('/api/auth/signup', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post('/api/auth/login', userData);
  return res.data;
};
