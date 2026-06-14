import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./index.css";

const ArtistCheckinConfirm = () => {
  const [params] = useSearchParams();
  const qrId = params.get("qrId");
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [arrivedCount, setArrivedCount] = useState("");
  const [volunteerName, setVolunteerName] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchArtist = async () => {
      const res = await fetch(
        `http://localhost:4000/api/artist/get?qrId=${qrId}`
      );
      const data = await res.json();
      if (data.success) setArtist(data.artist);
    };
    fetchArtist();
  }, [qrId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!arrivedCount || !volunteerName) {
      setMessage("Please fill required fields.");
      return;
    }

    const res = await fetch("http://localhost:4000/api/artist/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qrId,
        arrivedCount,
        volunteerName,
        notes
      })
    });

    const data = await res.json();
    setMessage(data.message);

    if (data.success) {
      setArrivedCount("");
      setVolunteerName("");
      setNotes("");
      setTimeout(() => {
    navigate("/artist-scan");
  }, 1000);
    }
  };

  if (!artist) return <p>Loading artist...</p>;

  return (
    <div className="confirm-page">
      <h1>Confirm Check-In</h1>

      <div className="artist-box">
        <p><strong>Name:</strong> {artist.fullName}</p>
        <p><strong>Team:</strong> {artist.teamName}</p>
        <p><strong>Registered Team Size:</strong> {artist.teamSize}</p>
      </div>

      <form onSubmit={handleSubmit} className="confirm-form">
        <input
          type="number"
          placeholder="How many arrived?*"
          value={arrivedCount}
          onChange={(e) => setArrivedCount(e.target.value)}
          min="1"
        />

        <input
          type="text"
          placeholder="Volunteer Name*"
          value={volunteerName}
          onChange={(e) => setVolunteerName(e.target.value)}
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Confirm Check-In</button>
      </form>

      {message && <p className="confirm-message">{message}</p>}
    </div>
  );
};

export default ArtistCheckinConfirm;
