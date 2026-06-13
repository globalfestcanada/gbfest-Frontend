// import React from "react";
// import "./index.css";

// const PageantFinalCard = ({ name, culture, image, bio }) => {
//   return (
//     <div className="flip-card">
//       <div className="flip-card-inner">

//         {/* FRONT */}
//         <div className="flip-card-front">
//           <img src={image} alt={name} className="contestant-photo" />
//           <div className="front-name">{name}</div>
//         </div>

//         {/* BACK */}
//         <div className="flip-card-back">
//           <h3>{name}</h3>
//           <h4>{culture}</h4>
//           <p>{bio}</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PageantFinalCard;

import React from "react";
import "./index.css";

const PageantFinalCard = ({ name, culture, image, bio, isFlipped, onFlip }) => {
  const isMobile = window.innerWidth < 600;

  return (
    <div className="flip-card">
      <div
        className="flip-card-inner"
        onClick={() => {
          if (isMobile) onFlip();
        }}
        style={{
          transform: isMobile
            ? (isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")
            : undefined  // allow CSS hover to take over
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
  );
};

export default PageantFinalCard;

