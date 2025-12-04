export const getApplications = async (authAxios) => {
  const res = await authAxios.get('/api/applications');
  return res.data;
};

export const createApplication = async (data, authAxios) => {
  const res = await authAxios.post('/api/applications', data);
  return res.data;
};

export const deleteApplication = async (id, authAxios) => {
  const res = await authAxios.delete(`/api/applications/${id}`);
  return res.data;
};
