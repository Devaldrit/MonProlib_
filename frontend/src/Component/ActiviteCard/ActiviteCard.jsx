import "./activiteCard.css";

const ActiviteCard = ({ name }) => {
  return (
    <div className="activityCard">
      <p>{name}</p>
    </div>
  );
};

export default ActiviteCard;
