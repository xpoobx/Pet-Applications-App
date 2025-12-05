import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { deleteApplication } from "../api/applications";

export default function ApplicationsPage() {
  const { authAxios, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authAxios.get("/api/applications");
        setApplications(res.data || []);
      } catch {
        setError("Unable to load applications.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authAxios]);

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id, authAxios);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch {
      setError("Unable to delete application.");
    }
  };

  return (
    <main className="page">
      <div className="container page-narrow">
        <div className="page-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="page-title">
            {user?.role === "admin" ? "All Applications" : "My Applications"}
          </h1>
          <p className="page-subtitle">
            Track or manage adoption and foster applications.
          </p>
        </div>

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

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading applications…</p>
        ) : applications.length === 0 ? (
          <p style={{ textAlign: "center" }}>No applications found.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {applications.map((app) => (
              <div
                key={app._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  backgroundColor: "#fff",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: "1 1 60%" }}>
                  <h2 style={{ margin: "0 0 0.5rem 0" }}>{app.pet?.name || "Pet"}</h2>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
                    Type: {app.type || "Adoption"}
                    {app.pet?.species ? ` · ${app.pet.species}` : ""}
                  </p>
                  {app.message && (
                    <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                      {app.message}
                    </p>
                  )}
                </div>

                <div style={{ flex: "0 0 150px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.25rem" }}>
                    Status
                  </div>
                  <div
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: app.status === "approved" ? "#065f46" : "#374151",
                    }}
                  >
                    {app.status
                      ? app.status.charAt(0).toUpperCase() + app.status.slice(1)
                      : "Submitted"}
                  </div>
                  {app.createdAt && (
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      Submitted {new Date(app.createdAt).toLocaleDateString("en-CA")}
                    </div>
                  )}
                </div>

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(app._id)}
                    style={{
                      backgroundColor: "#f87171",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      height: "fit-content",
                      alignSelf: "center",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
