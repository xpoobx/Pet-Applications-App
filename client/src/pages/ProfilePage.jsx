// Profile Page - Contains Profile stuff
import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../api/users';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { authAxios, user, setUser } = useAuth(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser(authAxios);
        setFormData({
          name: data.name || '',
          email: data.email || '',
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [authAxios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updated = await updateCurrentUser(formData, authAxios);
    console.log('Updated user:', updated);
  } catch (err) {
    console.error('Profile update error:', err);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
