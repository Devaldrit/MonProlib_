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

  // Fonction qui calcule la durée à partir de start et end
  const computeDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = endDate - startDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      return `${hours} h ${minutes} min`;
    }
  };

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
        // Calcul de la durée pour chaque activité et ajout de la propriété 'duree'
        const activitesAvecDuree = data.map((item) => ({
          ...item,
          duree: computeDuration(item.start, item.end),
        }));
        setActivites(activitesAvecDuree);
        setFilteredActivites(activitesAvecDuree);
        console.log(activitesAvecDuree);
      })
      .catch((error) => {
        console.error("Erreur fetch :", error);
      });
  }, []);

  // Filtrage des activités selon les saisies de l'utilisateur
  useEffect(() => {
    const results = activites.filter((activite) => {
      const matchTitle = inputTitleActivity
        ? activite.titre
            .toLowerCase()
            .includes(inputTitleActivity.toLowerCase())
        : true;
      const matchDescription = inputDescriptionActivity
        ? activite.description
            .toLowerCase()
            .includes(inputDescriptionActivity.toLowerCase())
        : true;
      const matchDuration = inputDurationActivity
        ? activite.duree
            .toLowerCase()
            .includes(inputDurationActivity.toLowerCase())
        : true;
      return matchTitle && matchDescription && matchDuration;
    });
    setFilteredActivites(results);
  }, [
    inputTitleActivity,
    inputDescriptionActivity,
    inputDurationActivity,
    activites,
  ]);

  // Fonction pour supprimer une activité via un appel DELETE à l'API
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/slotsCalendar/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'activité");
        }
        // Mise à jour du tableau en retirant l'activité supprimée
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

  // Affichage conditionnel selon la présence d'un input de recherche
  const activiteElements = (
    inputTitleActivity || inputDescriptionActivity || inputDurationActivity
      ? filteredActivites
      : activites
  ).map((activiteInfo) => (
    <div key={activiteInfo._id} className="activityCard">
      <ActiviteCard
        titre={activiteInfo.titre}
        description={activiteInfo.description}
        duree={activiteInfo.duree}
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
        <input
          placeholder="Durée (ex: 30 min)"
          value={inputDurationActivity}
          onChange={(e) => setInputDurationActivity(e.target.value)}
        />
      </div>
      <div>{activiteElements}</div>
    </section>
  );
};

export default MesRdv;
