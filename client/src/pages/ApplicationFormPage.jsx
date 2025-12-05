import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createApplication } from "../api/applications";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ApplicationFormPage() {
  const { authAxios } = useAuth();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      await createApplication({ pet: petId, message }, authAxios);
      setSuccess("Application submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Unable to submit application.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="page">
      <div className="container page-narrow">
        <div className="page-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="page-title">Submit an Application</h1>
          <p className="page-subtitle">Tell us why you'd be a great match for this pet.</p>
        </div>

        <div
          className="form-card"
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          {error && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                backgroundColor: "#fdecea",
                color: "#b42318",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                backgroundColor: "#d1fae5",
                color: "#065f46",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <textarea
              className="form-input"
              placeholder="Write a short message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={inputStyle}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={busy}
              style={{
                padding: "0.85rem",
                fontSize: "1.1rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s, transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {busy ? "Submitting…" : "Apply"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  minHeight: "120px",
  padding: "0.75rem 1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

document.addEventListener("focusin", (e) => {
  if (e.target.classList.contains("form-input")) {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.2)";
  }
});
document.addEventListener("focusout", (e) => {
  if (e.target.classList.contains("form-input")) {
    e.target.style.borderColor = "#ccc";
    e.target.style.boxShadow = "none";
  }
});
