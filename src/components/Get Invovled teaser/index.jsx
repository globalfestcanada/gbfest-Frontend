import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

const GetInvolvedTeaser = () => {
  const navigate = useNavigate();

  return (
    <section className="get-involved-teaser">
      <h2>BE PART OF THE FESTIVAL</h2>
      <p>
        Global Fest 2026 thrives because of the people who support it. 
        Whether you partner with us, participate as a vendor, or volunteer your time, every contribution helps celebrate diversity and strengthen our community.
        Your involvement ensures that voices from all cultures are heard, traditions are honored, and meaningful connections are made.
        By joining us, you’re not just supporting a festival — you’re helping create a vibrant space where stories, music, food, and art come together to inspire unity and joy.
        Together, we can make Global Fest 2026 a landmark celebration that leaves a lasting impact on Toronto and beyond.

      </p>

      <div className="promo-columns">
        <div className="promo-column">
          <img src="/gbfest/food vendor.jpg" alt="Food Vendors" />
          <h3>Food Vendors</h3>
          <p>
            Become a food vendor and showcase global fusion dishes — from Asian street eats
            to Caribbean and Mediterranean favorites. Share your culinary story with thousands.
          </p>
          <button className="teaser-btn" onClick={() => navigate("vendor")}
            >
              Become a Food Vendor</button>
        </div>

        <div className="promo-column">
          <img src="/gbfest/sponsor.png" alt="Sponsorship Opportunities" />
          <h3>Partnership Opportunities</h3>
          <p>
            Gain visibility through stage presence, digital campaigns, and on-site activations.Celebrate diversity and community at a vibrant multicultural festival in Canada
          </p>
          
          <button
            className="teaser-btn"
            onClick={() => navigate("partner")}
          >
            Become as a Partner
          </button>
        </div>

        <div className="promo-column">
          <img src="/gbfest/cultural.jpg" alt="Cultural Performances" />
          <h3>Perform With Us</h3>
          <p>
            We invite artists and performers to showcase their culture through live music, dance, and performance. 
            Join us in celebrating heritage, creativity, and community on a shared stage that brings cultures together.
          </p>
          <button className="teaser-btn"
          onClick={() => navigate("artist")} 
          >
            Become a Performer</button>
        </div>
      </div>

      <button
        className="teaser-btn explore-btn"
        onClick={() => navigate("/getinvolved")}
      >
        Explore Opportunities
      </button>
    </section>
  );
};

export default GetInvolvedTeaser;
