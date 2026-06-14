import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ArtistScanner = () => {
  const [artist, setArtist] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );
    

    scanner.render(
      async (decodedText) => {
        try {
            console.log("SCANNED:", decodedText);

          const res = await fetch(
            `http://localhost:4000/api/artist/get?qrId=${decodedText}`
          );
          const data = await res.json();

          if (data.success) {
            setArtist(data.artist);
            setMessage("");
          } else {
            setArtist(null);
            setMessage(data.message);
          }
        } catch (err) {
          setMessage("Error fetching artist.");
        }
      },
      (error) => {
        // ignore scan errors
      }
    );
    

    return () => scanner.clear();
  }, []);

  return (
    <div className="scanner-page">
      <h1>Artist QR Scanner</h1>

      <div id="reader" className="scanner-box"></div>

      {message && <p className="scan-message">{message}</p>}

      {artist && (
        <div className="artist-info">
          <h2>Artist Found</h2>
          <p><strong>Name:</strong> {artist.fullName}</p>
          <p><strong>Team:</strong> {artist.teamName}</p>
          <p><strong>Team Size:</strong> {artist.teamSize}</p>

          {/* <a
            className="proceed-btn"
            href={`/artist-checkin-confirm?qrId=${artist.qrId}`}
          >
            Proceed to Check-In
          </a> */}
          <button
  className="proceed-btn"
  onClick={() => navigate(`/artist-checkin-confirm?qrId=${artist.qrId}`)}>
  Proceed to Check-In
</button>

        </div>
      )}
    </div>
  );
};

export default ArtistScanner;
