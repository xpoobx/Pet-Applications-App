import React, { useEffect, useState } from 'react';
import { getApplications, deleteApplication } from '../api/applications';
import { useAuth } from '../contexts/AuthContext';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const { authAxios } = useAuth();

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const handleDelete = async (id) => {
    await deleteApplication(id, authAxios);
    setApplications(prev => prev.filter(app => app._id !== id));
  };

  if (applications.length === 0) return <p>No applications found.</p>;

  return (
    <div>
      <h1>All Applications</h1>
      <ul>
        {applications.map(app => (
          <li key={app._id}>
            <strong>Pet:</strong> {app.petName} | <strong>Applicant:</strong> {app.applicantName} | 
            <strong>Message:</strong> {app.message}
            <button onClick={() => handleDelete(app._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
