// Home Page
import React, { useEffect, useState } from 'react';
import { getPets, deletePet } from '../api/pets';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const { authAxios, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets(authAxios);
        setPets(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, [authAxios]);

  const handleDelete = async (id) => {
    try {
      await deletePet(id, authAxios);
      setPets(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Pets</h1>
      {user && <Link to="/pets/new">Add New Pet</Link>}
      <ul>
        {pets.map(pet => (
          <li key={pet._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{pet.name} ({pet.species})</h2>
            {pet.breed && <p><strong>Breed:</strong> {pet.breed}</p>}
            {pet.age != null && <p><strong>Age:</strong> {pet.age}</p>}
            <p><strong>Sex:</strong> {pet.sex}</p>
            {pet.description && <p><strong>Description:</strong> {pet.description}</p>}
            <p><strong>Status:</strong> {pet.status}</p>
            {pet.photos && pet.photos.length > 0 && (
              <div>
                {pet.photos.map((url, i) => (
                  <img key={i} src={url} alt={pet.name} style={{ maxWidth: '150px', marginRight: '5px' }} />
                ))}
              </div>
            )}
            {user?.role === 'admin' && (
              <>
                <button onClick={() => navigate(`/pets/edit/${pet._id}`)}>Edit</button>
                <button onClick={() => handleDelete(pet._id)}>Delete</button>
              </>
            )}
            {user && (
              <button onClick={() => navigate(`/applications/new?petId=${pet._id}`)}>Apply</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
