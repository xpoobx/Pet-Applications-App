import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{ marginBottom: "20px" }}>
      <nav>
        <Link to="/">Pets</Link> |{" "}
        {user ? (
          <>
            <Link to="/pets/new">Add Pet</Link> |{" "}
            <Link to="/applications">Applications</Link> |{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
