export const getCurrentUser = async (authAxios) => {
  const res = await authAxios.get('/api/users/me');
  return res.data;
};

export const updateCurrentUser = async (updates, authAxios) => {
  const res = await authAxios.put('/api/users/me', updates);
  return res.data;
};
