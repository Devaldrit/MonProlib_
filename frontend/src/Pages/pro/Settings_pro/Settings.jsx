import React, { useState } from "react";
import "./Settings.css";
import HeaderConnexion from "../../../Component/header_connexion/headerConnexion";

const Settings = () => {
  const [email, setEmail] = useState("user@email.com");
  const [password, setPassword] = useState("********");
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  return (
    <div>
      <HeaderConnexion />
      <section className="settings-container">
        <h2 className="settings-title">Account Settings</h2>

        {/* Email Section */}
        <div className="settings-section">
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
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setEditEmail(!editEmail)}
          >
            {editEmail ? "Save Email" : "Edit Email"}
          </button>
        </div>

        {/* Password Section */}
        <div className="settings-section">
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
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setEditPassword(!editPassword)}
          >
            {editPassword ? "Save Password" : "Edit Password"}
          </button>
        </div>

        {/* Danger Zone Section */}
        <div className="settings-section danger-zone">
          <h3 className="section-title danger-title">Danger Zone</h3>
          <button
            className="btn btn-danger"
            onClick={() => alert("Account deleted (not really).")}
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
