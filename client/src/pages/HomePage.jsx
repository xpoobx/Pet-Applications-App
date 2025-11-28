import React, { useEffect, useState } from 'react';
import { getPets, deletePet } from '../api/pets';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const { authAxios, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPets().then(setPets);
  }, []);

  const handleDelete = async (id) => {
    await deletePet(id, authAxios);
    setPets(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div>
      <h1>Pets</h1>
      {user && <Link to="/pets/new">Add New Pet</Link>}
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            {pet.name} - {pet.type}
            {user && (
              <>
                <button onClick={() => navigate(`/pets/edit/${pet._id}`)}>Edit</button>
                <button onClick={() => handleDelete(pet._id)}>Delete</button>
                <button onClick={() => navigate(`/applications/new?petId=${pet._id}`)}>Apply</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
