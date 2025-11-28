import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createPet } from '../api/pets';
import { useNavigate } from 'react-router-dom';

export default function PetFormPage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { authAxios } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPet({ name, type }, authAxios);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} required />
      <button type="submit">Create Pet</button>
    </form>
  );
}
