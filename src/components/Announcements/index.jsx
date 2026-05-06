import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const FestivalAnnouncements = () => {
  const navigate = useNavigate();

  return (
    <section className="festival-announcements">
      <h2>WHAT’S HAPPENING THIS YEAR</h2>
      {/* <p className="tap-instruction">Click the image for more info</p> */}

      <div className="announcement-row">

        {/* PAGEANT */}
        <div
          className="announcement-card fade-in"
          onClick={() => navigate("/PageantApplicationForm")}
        >
          <div className="image-frame">
            <img src="/Pageant.jpg" alt="Pageant" />
            <span className="hover-text">Click for more</span>
          </div>
        </div>

        {/* PHOTOGRAPHY */}
        <div
          className="announcement-card fade-in delay"
          onClick={() => navigate("/PhotographyContest")}
        >
          <div className="image-frame">
            <img src="/Photography.jpeg" alt="Photography Contest" />
            <span className="hover-text">Click for more</span>
          </div>
        </div>
        {/* PROCESSION */}
        {/* <div
          className="announcement-card fade-in delay"
          onClick={() => navigate("/procession")}
        >
          <div className="image-frame">
            <img src="/placeholder.png" alt="Photography Contest" />
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default FestivalAnnouncements;
