import axios from 'axios';

// Get all applications
export const getApplications = async () => {
  const res = await axios.get('/api/applications');
  return res.data;
};

// Get applications for a specific pet
export const getApplicationsByPet = async (petId) => {
  const res = await axios.get(`/api/applications/pet/${petId}`);
  return res.data;
};

// Create a new application
export const createApplication = async (applicationData, authAxios) => {
  const res = await authAxios.post('/api/applications', applicationData);
  return res.data;
};

// Delete an application
export const deleteApplication = async (id, authAxios) => {
  const res = await authAxios.delete(`/api/applications/${id}`);
  return res.data;
};
