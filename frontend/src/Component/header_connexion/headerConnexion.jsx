import "./headerConnexion.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../image/logoP.png";

function HeaderConnexion() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const storedPrenom = localStorage.getItem("prenom");
    const storedRole = localStorage.getItem("role");

    if (storedPrenom) setPrenom(storedPrenom);
    if (storedRole) setRole(storedRole);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🟢 Amélioration de la déconnexion
  const handleLogout = () => {
    // Supprimer uniquement les éléments liés à l'authentification
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("prenom");

    setMenuOpen(false); // Fermer le menu
    navigate("/"); // Redirection propre vers la page de connexion
  };

  // 🟢 Fonction pour capitaliser le prénom
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div>
      <div className="header">
        <div className="header_container">
          <div className="header_container_connexion">
            <div>
              <img
                src={Logo}
                alt=""
                onClick={() => navigate("/")}
                className="logo_header"
              />
            </div>
            <button
              className="header_container_button_connexion"
              onClick={toggleMenu}
              ref={buttonRef}
            >
              Bonjour, {prenom ? capitalize(prenom) : "Utilisateur"}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="dropdown_menu" ref={menuRef}>
          {role === "pro" ? (
            <>
              <div
                className="dropdown_item"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/annonce_pro");
                }}
              >
                Mes Annonces
              </div>
              <div
                className="dropdown_item"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/calendar_pro");
                }}
              >
                Définir Mes Heures
              </div>
              <div className="dropdown_item">Mes Rendez-Vous</div>
            </>
          ) : null}
          <div
            className="dropdown_item"
            onClick={() => {
              setMenuOpen(false);
              navigate(`/settings_pro/${id}`);
            }}
          >
            Paramètre
          </div>
          <div className="dropdown_item_deconnexion" onClick={handleLogout}>
            Déconnexion
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderConnexion;
