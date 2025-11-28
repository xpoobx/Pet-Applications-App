import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createApplication } from '../api/applications';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ApplicationFormPage() {
  const { authAxios } = useAuth();
  const [applicantName, setApplicantName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const petId = searchParams.get('petId'); // Get petId from query string

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createApplication({ petId, applicantName, message }, authAxios);
    navigate('/applications'); // go to applications list after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Pet</h2>
      <input
        placeholder="Your Name"
        value={applicantName}
        onChange={e => setApplicantName(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Submit Application</button>
    </form>
  );
}
