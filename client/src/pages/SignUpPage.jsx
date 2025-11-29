// Sign up Page - Contains Sign Up Stuff
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button type="submit">Signup</button>
    </form>
  );
}
