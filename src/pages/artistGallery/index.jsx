import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const ArtistGallery = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetches live database document strings and public S3 URLs
    axios.get("https://globalfest-backend.onrender.com/api/public-gallery/all")
      .then((res) => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gallery grid records:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="gallery-loading">Loading Lineup...</div>;

  return (
    <div className="gallery-page-container">
      <header className="gallery-header">
        <h1 className="gallery-main-title">Global Fest 2026</h1>
        <h2 className="gallery-sub-title">Official Artist Lineup</h2>
        <p className="gallery-description">
          Discover the incredible talents and cultural pioneers bringing their stories and heritage to the main stage. Click on any artist to read their full profile.
        </p>
      </header>

      <div className="gallery-grid-container">
        {artists.map((artist) => (
          <div
            key={artist._id || artist.id}
            className="artist-gallery-card-static"
            onClick={() => navigate(`/artist/${artist.slug}`)} // Triggers custom text URLs like /artist/tamrika
          >
            <div className="gallery-card-front-static">
              <img
                src={artist.image} // Secure S3 link pulled directly from DB
                alt={artist.name}
                className="gallery-artist-photo-static"
                onError={(e) => {
                  e.target.style.display = "none"; // Safe fallback layout if S3 link fails
                }}
              />
              <div className="gallery-front-overlay-static">
                <span className="gallery-type-tag-static">{artist.type}</span>
                <div className="gallery-artist-name-static">{artist.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;