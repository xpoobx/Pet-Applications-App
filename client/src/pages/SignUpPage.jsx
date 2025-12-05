import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "visitor", // default role
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unable to create account. Please check your details and try again.";
      setError(msg);
      console.error("Signup error:", err?.response || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">
          Sign up to apply for pets, manage foster cases, or manage your
          organization&apos;s listings.
        </p>

        {error && (
          <div
            style={{
              marginBottom: "0.9rem",
              fontSize: "0.85rem",
              color: "#b42318",
              background: "#fdecea",
              padding: "0.5rem 0.75rem",
              borderRadius: "999px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="auth-label">Full name</div>
            <input
              type="text"
              name="name"
              className="auth-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="auth-label">Email</div>
            <input
              type="email"
              name="email"
              className="auth-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="auth-label">Password</div>
            <input
              type="password"
              name="password"
              className="auth-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <div className="auth-label">Account type</div>
            <select
              name="role"
              className="auth-input"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="visitor">
                I want to adopt or foster (visitor)
              </option>
              <option value="foster_worker">Foster worker</option>
              <option value="org_worker">Organization staff</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.4rem" }}
            disabled={submitting}
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: "1.2rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#008a6a", fontWeight: 600 }}>
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
