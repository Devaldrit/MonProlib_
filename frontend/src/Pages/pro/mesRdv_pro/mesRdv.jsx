import ActiviteCard from "../../../Component/ActiviteCard/ActiviteCard";
import HeaderConnexion from "../../../Component/header_connexion/headerConnexion";
import "./mesRdv.css";
import { useState, useEffect } from "react";

const MesRdv = () => {
  const [inputTitleActivity, setInputTitleActivity] = useState("");
  const [inputDescriptionActivity, setInputDescriptionActivity] = useState("");
  const [inputDurationActivity, setInputDurationActivity] = useState("");

  const [activites, setActivites] = useState([]);
  const [filteredActivites, setFilteredActivites] = useState([]);

  // Récupération des activités depuis l'API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/slotsCalendar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des activités");
        }
        return response.json();
      })
      .then((data) => {
        setActivites(data);
        setFilteredActivites(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur fetch :", error);
      });
  }, []);

  // Filtrage des activités en fonction des inputs de l'utilisateur
  useEffect(() => {
    const results = activites.filter((activite) => {
      const matchTitle = inputTitleActivity
        ? activite.title
            .toLowerCase()
            .includes(inputTitleActivity.toLowerCase())
        : true;
      const matchDescription = inputDescriptionActivity
        ? activite.description
            .toLowerCase()
            .includes(inputDescriptionActivity.toLowerCase())
        : true;
      const matchDuration = inputDurationActivity;
      return matchTitle && matchDescription;
    });
    setFilteredActivites(results);
  }, [inputTitleActivity, inputDescriptionActivity, activites]);

  // Fonction pour supprimer une activité via un appel DELETE vers l'API
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/slotsCalendar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'activité");
        }
        // Mise à jour de l'état local en retirant l’élément supprimé
        const updatedActivites = activites.filter(
          (activite) => activite._id !== id
        );
        setActivites(updatedActivites);
        setFilteredActivites(updatedActivites);
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
  };

  const activiteElements = (
    inputTitleActivity || inputDescriptionActivity
      ? filteredActivites
      : activites
  ).map((activiteInfo) => (
    <div key={activiteInfo._id} className="activityCard">
      <ActiviteCard
        titre={activiteInfo.title}
        description={activiteInfo.description}
      />
      <div>
        <button
          className="delete"
          onClick={() => handleDelete(activiteInfo._id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  ));

  return (
    <section>
      <HeaderConnexion />
      <h1 className="mainTitle">Gestion des activités</h1>
      <div>
        <input
          placeholder="Titre de l'activité"
          value={inputTitleActivity}
          onChange={(e) => setInputTitleActivity(e.target.value)}
        />
        <input
          placeholder="Description (optionnel)"
          value={inputDescriptionActivity}
          onChange={(e) => setInputDescriptionActivity(e.target.value)}
        />
      </div>
      <div>{activiteElements}</div>
    </section>
  );
};

export default MesRdv;
