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
    <main className="page">
      <div className="container page-narrow">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="page-title">Edit Pet</h1>
          <p className="page-subtitle">Update the details below and save changes.</p>
        </div>

        <div
          className="form-card"
          style={{
            maxWidth: '550px',
            margin: '0 auto',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <input
              className="form-input"
              name="name"
              value={pet.name}
              onChange={handleChange}
              placeholder="Name"
              required
              style={inputStyle}
            />
            <input
              className="form-input"
              name="species"
              value={pet.species}
              onChange={handleChange}
              placeholder="Species"
              required
              style={inputStyle}
            />
            <input
              className="form-input"
              name="breed"
              value={pet.breed}
              onChange={handleChange}
              placeholder="Breed (optional)"
              style={inputStyle}
            />
            <input
              className="form-input"
              name="age"
              type="number"
              min="0"
              value={pet.age}
              onChange={handleChange}
              placeholder="Age (optional)"
              style={inputStyle}
            />
            <select
              className="form-input"
              name="sex"
              value={pet.sex}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
            <select
              className="form-input"
              name="status"
              value={pet.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="adopted">Adopted</option>
            </select>
            <textarea
              className="form-input"
              name="description"
              value={pet.description}
              onChange={handleChange}
              placeholder="Description"
              rows="4"
              style={inputStyle}
            />
            <input
              className="form-input"
              name="photos"
              value={pet.photos.join(', ')}
              onChange={handlePhotosChange}
              placeholder="Photo URLs comma separated"
              style={inputStyle}
            />

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                marginTop: '1rem',
                padding: '0.85rem',
                fontSize: '1.1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Update Pet
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

// Shared input styling
const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

// Focus effect for inputs
document.addEventListener('focusin', (e) => {
  if (e.target.classList.contains('form-input')) {
    e.target.style.borderColor = '#3b82f6';
    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
  }
});
document.addEventListener('focusout', (e) => {
  if (e.target.classList.contains('form-input')) {
    e.target.style.borderColor = '#ccc';
    e.target.style.boxShadow = 'none';
  }
});
