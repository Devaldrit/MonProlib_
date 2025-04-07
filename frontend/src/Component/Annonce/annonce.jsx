import { useState } from "react";

const Annonce = () => {
  const [nameCompany, setNameCompany] = useState("");
  const [adresCompany, setAdresCompany] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/annonces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameCompany, adresCompany }),
      });

      if (response.ok) {
        console.log("envoie reussi");
      } else {
        console.log("envoie echouee");
      }
    } catch (error) {
      console.log("envoie echouee");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Calendrier de Rendez-vous</h1>
      </div>
      <div>
        <div>
          <h2>Poster mon annonce</h2>
          <label htmlFor="nameCompany">Nom de l'entreprise</label>
          <input
            type="text"
            name="nameCompany"
            value={nameCompany}
            onChange={(e) => setNameCompany(e.target.value)}
          />
          <label htmlFor="adresCompany">Adresse de l'entreprise</label>
          <input
            type="text"
            name="adresCompany"
            value={adresCompany}
            onChange={(e) => setAdresCompany(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default Annonce;
