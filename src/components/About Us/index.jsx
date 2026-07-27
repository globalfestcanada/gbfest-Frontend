import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AboutUsPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="about-preview" id="about">
      <h2>ABOUT GLOBAL FEST CANADA</h2>
      <p>
        Global Fest Toronto is a multicultural festival that celebrates the people, stories, and traditions that make our city so unique. From traditional performances to modern fusion acts, from street food to global fashion, we bring communities together in one inclusive, family-friendly event.
      </p>
     
      <button
  className="read-more-btn"
  onClick={() => navigate("/about")}
>
  Read More
</button>


    </section>
  );
};

export default AboutUsPreview;
