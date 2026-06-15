import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const PageantFinalCard = ({ name, culture, image, bio, isFlipped, onFlip }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              ? isFlipped
                ? "rotateY(180deg)"
                : "rotateY(0deg)"
              : undefined
          }}
        >
          {/* FRONT - Clean poster display with no overlapping code text */}
          <div className="flip-card-front">
            <img src={image} alt={name} className="contestant-photo" />
          </div>

          {/* BACK - Text details display cleanly on flip */}
          <div className="flip-card-back">
            <h3>{name}</h3>
            <h4>{culture}</h4>
            <p>{bio}</p>
          </div>
        </div>
      </div>

      {/* VOTE BUTTON OUTSIDE THE FLIP CARD */}
      {/* <button
        className="vote-btn"
        onClick={(e) => {
          e.stopPropagation(); 
          navigate(`/vote?contestant=${encodeURIComponent(name)}`);
        }}
      >
        Vote
      </button> */}
    </div>
  );
};

export default PageantFinalCard;
