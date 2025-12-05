import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPet } from "../api/pets";
import { useAuth } from "../contexts/AuthContext";

export default function PetDetailsPage() {
  const { id } = useParams();
  const { authAxios, user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPet(id, authAxios);
        setPet(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, authAxios]);

  if (loading) return <div className="page section">Loading...</div>;
  if (!pet) return <div className="page section">Pet not found.</div>;

  return (
    <main className="page section">
      <div className="container pet-details">

        <img className="pet-details-img"
             src={pet.photos?.[0] || ""}
             alt={pet.name} />

        <div className="pet-details-info">
          <h1>{pet.name}</h1>
          <p className="pet-meta">
            {pet.age} years • {pet.sex} • {pet.breed}
          </p>

          <p className="pet-description">{pet.description}</p>

          <span className={`pet-status-tag ${pet.status}`}>
            {pet.status}
          </span>

          <div className="pet-details-actions">
            {user && (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/applications/new?petId=${pet._id}`)}
              >
                Apply to Adopt
              </button>
            )}
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
