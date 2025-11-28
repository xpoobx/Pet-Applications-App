import axios from 'axios';

export const signup = async (userData) => {
  const res = await axios.post('http://localhost:4000/api/auth/signup', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post('http://localhost:4000/api/auth/login', userData);
  return res.data;
};
