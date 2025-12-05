import React, { useEffect, useState } from "react";
import { getPets, deletePet } from "../api/pets";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authAxios, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets(authAxios);
        setPets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [authAxios]);

  const handleDelete = async (id) => {
    try {
      await deletePet(id, authAxios);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToPets = () => {
    const el = document.getElementById("pet-list");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const surpriseMe = () => {
    if (pets.length === 0) return;
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    navigate(`/pets/${randomPet._id}`);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1 className="hero-title">
              Find your <span className="hero-highlight">new best friend</span>
            </h1>
            <p className="hero-text">
              Browse adoptable pets looking for a safe and loving home. Our
              foster and adoption program helps cats, dogs, and small animals
              get a second chance.
            </p>
            <div className="hero-actions">
              <button onClick={scrollToPets} className="btn btn-primary">
                View all pets
              </button>
              {user && (
                <button onClick={surpriseMe} className="btn btn-outline">
                  Surprise me
                </button>
              )}
            </div>
            <div className="hero-badges">
              <span className="hero-badge">Safe, screened adoptions</span>
              <span className="hero-badge">Support for foster families</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-title">Today at the shelter</div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-label">Pets available</div>
                <div className="hero-stat-value">
                  {loading ? "Loading…" : pets.length || "0"}
                </div>
              </div>
              <div>
                <div className="hero-stat-label">Featured species</div>
                <div className="hero-stat-value">
                  {pets.some((p) => p.species === "Dog")
                    ? "Dogs"
                    : "Cats & small animals"}
                </div>
              </div>
              <div>
                <div className="hero-stat-label">Ready to go home</div>
                <div className="hero-stat-value">This week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pet-list">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Pets waiting for a home</h2>
              <p className="section-subtitle">
                Filter by species, read about their personalities, and start an
                adoption or foster application.
              </p>
            </div>
            {user?.role === "admin" && (
              <Link to="/pets/new" className="btn btn-outline">
                Add new pet
              </Link>
            )}
          </div>

          {loading ? (
            <p>Loading pets…</p>
          ) : pets.length === 0 ? (
            <p>No pets are currently listed. Please check back soon.</p>
          ) : (
            <div className="pet-grid">
              {pets.map((pet) => {
                const normalizedStatus = (pet.status || "").toLowerCase();
                const statusClass =
                  normalizedStatus === "available"
                    ? "pet-status available"
                    : normalizedStatus === "pending"
                    ? "pet-status pending"
                    : "pet-status";
                const coverPhoto =
                  pet.photos && pet.photos.length > 0 ? pet.photos[0] : null;

                return (
                  <Link
                    key={pet._id}
                    to={`/pets/${pet._id}`}
                    className="pet-card-link"
                  >
                    <article className="pet-card">
                      <div className="pet-media">
                        {coverPhoto && <img src={coverPhoto} alt={pet.name} />}
                        <span className="pet-tag">
                          {pet.species}
                          {pet.breed ? ` · ${pet.breed}` : ""}
                        </span>
                      </div>

                      <div className="pet-body">
                        <h3>{pet.name}</h3>
                        <div className="pet-meta">
                          {pet.age != null ? `${pet.age} years · ` : ""}
                          {pet.sex}
                        </div>
                        {pet.description && (
                          <p className="pet-description">
                            {pet.description.length > 120
                              ? pet.description.slice(0, 117) + "…"
                              : pet.description}
                          </p>
                        )}
                      </div>

                      <div className="pet-footer">
                        <span className={statusClass}>
                          {pet.status
                            ? pet.status.charAt(0).toUpperCase() +
                              pet.status.slice(1)
                            : "Status unknown"}
                        </span>

                        <div className="pet-admin-actions">
                          {user && (
                            <button
                              className="btn btn-primary btn-small"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  `/applications/new?petId=${pet._id}`
                                );
                              }}
                            >
                              Apply
                            </button>
                          )}

                          {user?.role === "admin" && (
                            <>
                              <button
                                className="btn btn-outline btn-small"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/pets/edit/${pet._id}`);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-ghost btn-small"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(pet._id);
                                }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
