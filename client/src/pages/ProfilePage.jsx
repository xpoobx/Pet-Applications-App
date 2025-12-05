import React, { useEffect, useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../api/users';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { authAxios, user, setUser } = useAuth(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [success, setSuccess] = useState(''); // <-- success message state

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
      setSuccess('Profile updated successfully'); // <-- set success message
      setTimeout(() => setSuccess(''), 3000); // <-- hide after 3 seconds
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  return (
    <main className="page">
      <div className="container page-narrow">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Update your account details below.</p>
        </div>

        <div
          className="form-card"
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          {success && (
            <div
              style={{
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                backgroundColor: '#d1fae5',
                color: '#065f46',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              {success}
            </div>
          )}

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
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              style={inputStyle}
            />
            <input
              className="form-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
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
              Update Profile
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
