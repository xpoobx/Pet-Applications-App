// Pet Forms Page - Used to Create Pets
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createPet } from '../api/pets';
import { useNavigate } from 'react-router-dom';

export default function PetFormPage() {
  const { authAxios } = useAuth();
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: 'unknown',
    description: '',
    status: 'available',
    photos: [],
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotosChange = e => {
    setPet(prev => ({ ...prev, photos: e.target.value.split(',') }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPet(pet, authAxios);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={pet.name} onChange={handleChange} placeholder="Name" required />
      <input name="species" value={pet.species} onChange={handleChange} placeholder="Species" required />
      <input name="breed" value={pet.breed} onChange={handleChange} placeholder="Breed" />
      <input name="age" value={pet.age} onChange={handleChange} type="number" placeholder="Age" />
      <select name="sex" value={pet.sex} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="unknown">Unknown</option>
      </select>
      <input name="status" value={pet.status} onChange={handleChange} />
      <textarea name="description" value={pet.description} onChange={handleChange} placeholder="Description" />
      <input name="photos" value={pet.photos.join(',')} onChange={handlePhotosChange} placeholder="Photo URLs comma separated" />
      <button type="submit">Create Pet</button>
    </form>
  );
}
