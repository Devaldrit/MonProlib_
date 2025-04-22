import React, { useState } from "react";
import "./Settings.css";
import HeaderConnexion from "../../../Component/header_connexion/headerConnexion";

const Settings = () => {
  const [email, setEmail] = useState("user@email.com");
  const [password, setPassword] = useState("********");
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const url = `http://localhost:3000/api/users/${id}/email`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("Requesting:", url);
      const data = await res.json();
      console.log("Email updated:", data);
      setEditEmail(false);
    } catch (err) {
      console.error("Error updating email:", err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const url = `http://localhost:3000/api/users/${id}/password`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      console.log("Password updated:", data);
      setEditPassword(false);
    } catch (err) {
      console.error("Error updating password:", err);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const url = `http://localhost:3000/api/users/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Account deleted:", data);
    } catch (err) {
      console.error("Error deleting account:", err);
    }
  };

  return (
    <div>
      <HeaderConnexion />
      <section className="settings-container">
        <h2 className="settings-title">Account Settings</h2>

        {/* Email Section */}
        <form className="settings-section" onSubmit={handleEmailSubmit}>
          <label className="input-label">Email</label>
          <div className="input-wrapper">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editEmail}
              className="input"
              placeholder="Enter your email"
            />
            <div className="icon-container">
              <iconify-icon icon="ic:outline-mail" width="16" height="16" />
            </div>
            {!editEmail && (
              <button
                className="btn btn-edit-toggle"
                type="button"
                onClick={() => setEditEmail(true)}
              >
                ✎
              </button>
            )}
          </div>
          {editEmail && (
            <button className="btn btn-primary" type="submit">
              Save Email
            </button>
          )}
        </form>

        {/* Password Section */}
        <form className="settings-section" onSubmit={handlePasswordSubmit}>
          <label className="input-label">Password</label>
          <div className="input-wrapper">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              readOnly={!editPassword}
              className="input"
              placeholder="Enter new password"
            />
            <div className="icon-container">
              <iconify-icon icon="ic:outline-lock" width="16" height="16" />
            </div>
            {!editPassword && (
              <button
                className="btn btn-edit-toggle"
                type="button"
                onClick={() => setEditPassword(true)}
              >
                ✎
              </button>
            )}
          </div>
          {editPassword && (
            <button className="btn btn-primary" type="submit">
              Save Password
            </button>
          )}
        </form>

        {/* Danger Zone Section */}
        <form
          className="settings-section danger-zone"
          onSubmit={handleDeleteAccount}
        >
          <h3 className="section-title danger-title">Danger Zone</h3>
          <button className="btn btn-danger" type="submit">
            Delete Account
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settings;
