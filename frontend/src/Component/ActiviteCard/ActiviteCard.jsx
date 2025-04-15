import React from "react";
import "./ActiviteCard.css";

const ActiviteCard = ({ titre, description }) => {
  return (
    <div>
      <div className="top">
        <h2 className="titleActivity">{titre}</h2>
        <span>-</span>
        <p className="descriptionAcitvity">{description}</p>
      </div>
    </div>
  );
};

export default ActiviteCard;
