// Applications Form
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createApplication } from '../api/applications';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ApplicationFormPage() {
  const { authAxios } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const petId = searchParams.get('petId'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication({ pet: petId, message }, authAxios);
      navigate('/applications');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Apply</button>
    </form>
  );
}
