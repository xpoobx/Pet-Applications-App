// Header
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* Brand Section */}
        <div className="brand">
          <div className="brand-icon">🐾</div>
          <div className="brand-text">
            <div className="brand-name">PAWS &amp; HOMES</div>
            <div className="brand-tagline">Adopt · Foster · Love</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Pets
          </NavLink>

          {user && (
            <>
              {/* Admin-only links */}
              {user.role === "admin" && (
                <>
                  <NavLink
                    to="/pets/new"
                    className={({ isActive }) =>
                      isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                  >
                    Add Pet
                  </NavLink>

                  <NavLink
                    to="/applications"
                    className={({ isActive }) =>
                      isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                  >
                    Applications
                  </NavLink>
                </>
              )}

              {/* Profile is visible for all logged-in users */}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="header-actions">
          {user ? (
            <>
              <span className="header-user">
                Hi, {user.firstName || user.name || "friend"}
              </span>
              <button
                className="btn btn-outline-small"
                onClick={handleLogout}
                type="button"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-link"
                onClick={() => navigate("/login")}
                type="button"
              >
                Login
              </button>
              <button
                className="btn btn-pill"
                onClick={() => navigate("/signup")}
                type="button"
              >
                Sign up
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
