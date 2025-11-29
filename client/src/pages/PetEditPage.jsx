// PetEditPage - Edit Pets
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getPet, updatePet } from '../api/pets';
import { useParams, useNavigate } from 'react-router-dom';

export default function PetEditPage() {
  const { authAxios } = useAuth();
  const { id } = useParams();
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

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPet(id, authAxios); 
        setPet({
          name: data.name || '',
          species: data.species || '',
          breed: data.breed || '',
          age: data.age || '',
          sex: data.sex || 'unknown',
          description: data.description || '',
          status: data.status || 'available',
          photos: data.photos || [],
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchPet();
  }, [id, authAxios]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotosChange = e => {
    setPet(prev => ({ ...prev, photos: e.target.value.split(',').map(p => p.trim()) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePet(id, pet, authAxios);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
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
      <select name="status" value={pet.status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="reserved">Reserved</option>
        <option value="adopted">Adopted</option>
      </select>
      <textarea name="description" value={pet.description} onChange={handleChange} placeholder="Description" />
      <input
        name="photos"
        value={pet.photos.join(', ')}
        onChange={handlePhotosChange}
        placeholder="Photo URLs comma separated"
      />
      <button type="submit">Update Pet</button>
    </form>
  );
}
