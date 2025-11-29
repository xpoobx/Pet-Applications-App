// Applications Page
import React, { useEffect, useState } from 'react';
import { getApplications, deleteApplication } from '../api/applications';
import { useAuth } from '../contexts/AuthContext';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const { authAxios, user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications(authAxios); 
        setApplications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchApplications();
  }, [authAxios]);

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id, authAxios);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (applications.length === 0) return <p>No applications found.</p>;

  return (
    <div>
      <h1>All Applications</h1>
      <ul>
        {applications.map(app => (
          <li key={app._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Pet:</strong> {app.pet?.name || 'Unknown'}</p>
            <p><strong>Applicant:</strong> {app.applicant?.name || 'Unknown'}</p>
            <p><strong>Email:</strong> {app.applicant?.email || 'Unknown'}</p>
            <p><strong>Message:</strong> {app.message}</p>
            {user?.role === 'admin' && (
              <button onClick={() => handleDelete(app._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
