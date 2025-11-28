import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updatePet, getPet } from '../api/pets';
import { useParams, useNavigate } from 'react-router-dom';

export default function PetEditPage() {
  const { authAxios } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    getPet(id).then(pet => {
      setName(pet.name);
      setType(pet.type);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePet(id, { name, type }, authAxios);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} required />
      <input value={type} onChange={e => setType(e.target.value)} required />
      <button type="submit">Update Pet</button>
    </form>
  );
}
