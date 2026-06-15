import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css"; 

const ArtistProfile = () => {
  const { slug } = useParams(); // Grabs the clean name text directly out of the URL string
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Queries our standalone profile slug checker route 
    axios.get(`https://globalfest-backend.onrender.com/api/public-gallery/profile/${slug}`)
      .then((res) => {
        setArtist(res.data);
      })
      .catch((err) => {
        console.error("Error retrieving custom profile layout:", err);
        setError(true);
      });
  }, [slug]);

  if (error) {
    return (
      <div className="profile-error-container">
        <h2>Artist Profile Not Found</h2>
        <button onClick={() => navigate("/artist")} className="profile-back-btn">
          Return to Lineup
        </button>
      </div>
    );
  }

  if (!artist) {
    return <div className="profile-loading-text">Loading Profile Details...</div>;
  }

  return (
    <div className="profile-page-container">
      <button onClick={() => navigate("/Performers")} className="profile-back-btn">
        ← Back to Lineup
      </button>
      
      <div className="profile-main-card">
        {/* Dynamic S3 Image Column */}
        <div className="profile-image-column">
          <img src={artist.image} alt={artist.name} className="profile-hero-img" />
        </div>
        
        {/* Database Text Data Fields Column */}
        <div className="profile-info-column">
          <span className="profile-type-tag">{artist.type}</span>
          <h1 className="profile-artist-name">{artist.name}</h1>
          <div className="profile-accent-divider"></div>
          <h3 className="profile-section-header">Biography</h3>
          <p className="profile-bio-body">{artist.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;