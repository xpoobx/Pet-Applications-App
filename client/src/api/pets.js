import axios from 'axios';

export const getPets = async () => {
  const res = await axios.get('/api/pets');
  return res.data;
};

export const getPet = async (id) => {
  const res = await axios.get(`/api/pets/${id}`);
  return res.data;
};

export const createPet = async (petData, authAxios) => {
  const res = await authAxios.post('/api/pets', petData);
  return res.data;
};

export const updatePet = async (id, petData, authAxios) => {
  const res = await authAxios.put(`/api/pets/${id}`, petData);
  return res.data;
};

export const deletePet = async (id, authAxios) => {
  const res = await authAxios.delete(`/api/pets/${id}`);
  return res.data;
};
