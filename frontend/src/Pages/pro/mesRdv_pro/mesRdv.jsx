import ActiviteCard from "../../../Component/ActiviteCard/ActiviteCard";
import HeaderConnexion from "../../../Component/header_connexion/headerConnexion";
import "./mesRdv.css";
const MesRdv = () => {
  const activites = [
    {
      id: 1,
      titre: "Yoga Matinal",
      description: "Session de yoga pour bien commencer la journée.",
      duree: "45 minutes",
    },
    {
      id: 2,
      titre: "Randonnée en Montagne",
      description:
        "Balade pour admirer la nature et faire de l'exercice en plein air.",
      duree: "3 heures",
    },
    {
      id: 3,
      titre: "Atelier Cuisine",
      description:
        "Cours de cuisine pour apprendre de nouvelles recettes et techniques culinaires.",
      duree: "2 heures",
    },
    {
      id: 4,
      titre: "Séance de Lecture",
      description: "Moment de détente dédié à la lecture d'un bon livre.",
      duree: "1 heure 30 minutes",
    },
    {
      id: 5,
      titre: "Cours de Danse",
      description:
        "Initiation à la danse salsa pour se défouler et apprendre des pas.",
      duree: "1 heure",
    },
    {
      id: 6,
      titre: "Atelier Dessin",
      description: "Découverte des techniques de dessin et d'esquisse.",
      duree: "2 heures",
    },
    {
      id: 7,
      titre: "Séance de Méditation",
      description:
        "Pratique de la méditation guidée pour se relaxer et recentrer l'esprit.",
      duree: "30 minutes",
    },
    {
      id: 8,
      titre: "Cours de Musique",
      description:
        "Initiation à un instrument de musique pour développer sa créativité.",
      duree: "1 heure",
    },
    {
      id: 9,
      titre: "Jeux de Société",
      description:
        "Après-midi ludique avec des amis autour de jeux de société.",
      duree: "2 heures",
    },
    {
      id: 10,
      titre: "Escape Game",
      description:
        "Jeu d'évasion en équipe pour résoudre des énigmes dans un temps imparti.",
      duree: "1 heure 45 minutes",
    },
  ];

  console.log(activites);

  const activiteElements = activites.map((activiteInfo) => (
    <div class="activityCard">
      <ActiviteCard
        key={activiteInfo.id}
        titre={activiteInfo.titre}
        description={activiteInfo.description}
        duree={activiteInfo.duree}
      />
      <div>
        <button className="delete">Supprimer</button>
      </div>
    </div>
  ));

  return (
    <section>
      <HeaderConnexion />
      <h1 className="mainTitle">Gestion des activites</h1>
      <div>
        <input placeholder="Titre de l'activité"></input>
        <input placeholder="Description (optionnel)"></input>
        <input placeholder="Durée (ex: 30 min}"></input>
      </div>
      <div>{activiteElements}</div>
    </section>
  );
};

export default MesRdv;
