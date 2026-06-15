import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


const PageantFinalCard = ({ name, culture, image, bio, isFlipped, onFlip }) => {
  const isMobile = window.innerWidth < 600;
  const navigate = useNavigate();


  return (
    <div className="card-wrapper">

      {/* FLIP CARD */}
      <div
        className="flip-card"
        onClick={() => {
          if (isMobile) onFlip();
        }}
      >
        <div
          className="flip-card-inner"
          style={{
            transform: isMobile
              ? (isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")
              : undefined
          }}
        >

          {/* FRONT */}
          <div className="flip-card-front">
            <img src={image} alt={name} className="contestant-photo" />
            <div className="front-name">{name}</div>
          </div>

          {/* BACK */}
          <div className="flip-card-back">
            <h3>{name}</h3>
            <h4>{culture}</h4>
            <p>{bio}</p>
          </div>

        </div>
      </div>

      {/* ⭐ VOTE BUTTON OUTSIDE THE FLIP CARD
      <button
  className="vote-btn"
  onClick={(e) => {
    e.stopPropagation(); // prevent flipping on mobile
    navigate(`/vote?contestant=${encodeURIComponent(name)}`);
  }}
>
  Vote
</button> */}


    </div>
  );
};

export default PageantFinalCard;
