import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Volunteer = () => {
  return (
    <section className="volunteer">
      <h2>VOLUNTEER WITH GLOBAL FEST CANADA</h2>
      <div className="volunteer-content">
        {/* Left: Text */}
        <div className="volunteer-text">
          <p>
            Global Fest comes to life through the passion and commitment of our volunteers.
            From supporting performances to helping behind the scenes, volunteers play a vital role in shaping the festival experience. 
            By joining our team, you’ll help create meaningful moments for thousands of attendees while gaining hands-on experience and making lasting connections.
          </p>
          <p>
            Whether your interests lie in culture, music, event coordination, or community engagement, there’s an opportunity for you to get involved. 
            Together, we can create a Global Fest 2026 that celebrates diversity, strengthens community, and brings Toronto together.

          </p>
          <Link to="/volunteer" className="volunteer-link">
            Become a Volunteer
          </Link>
        </div>

        {/* Right: Image */}
        <div className="volunteer-image">
          <img src="/volunteers.jpg" alt="Global Fest Volunteers" />
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
