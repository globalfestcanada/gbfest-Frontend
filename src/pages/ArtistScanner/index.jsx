import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ArtistScanner = () => {
  const [artist, setArtist] = useState(null);
  const [message, setMessage] = useState("");
  const [isAlreadyScanned, setIsAlreadyScanned] = useState(false);
  const navigate = useNavigate();
  
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );
    
    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          const res = await fetch(
            `https://globalfest-backend.onrender.com/api/artist/get?qrId=${decodedText}`
          );
          const data = await res.json();

          if (data.success) {
            // Check if backend says they are already checked in
            if (data.artist.status === "Checked In" || data.artist.isCheckedIn) {
              setIsAlreadyScanned(true);
              setArtist(data.artist);
              setMessage("This artist has already been checked in.");
            } else {
              setIsAlreadyScanned(false);
              setArtist(data.artist);
              setMessage("");
            }

            // Shut down camera
            if (scannerRef.current) {
              await scannerRef.current.clear();
            }

            // Scroll to TOP so the user sees the result immediately
            window.scrollTo({ top: 0, behavior: "smooth" });

          } else {
            setArtist(null);
            setMessage(data.message);
          }
        } catch (err) {
          setMessage("Error fetching artist details.");
        }
      },
      (error) => { /* ignore jitter */ }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(e => console.log(e));
      }
    };
  }, []);

  return (
    <div className="scanner-page">
      <h1>Artist QR Scanner</h1>

      <div id="reader" className="scanner-box"></div>

      {message && (
        <p className="scan-message" style={{ color: isAlreadyScanned ? "#d11a1a" : "#0b132b" }}>
          {message}
        </p>
      )}

      {artist && (
        <div className="artist-info">
          <h2>{isAlreadyScanned ? "Check-in Status" : "Artist Found"}</h2>
          <p><strong>Name:</strong> {artist.fullName}</p>
          <p><strong>Team:</strong> {artist.teamName}</p>
          
          {isAlreadyScanned ? (
            <button className="proceed-btn" onClick={() => window.location.reload()}>
              Scan Another
            </button>
          ) : (
            <button
              className="proceed-btn"
              onClick={() => navigate(`/artist-checkin-confirm?qrId=${artist.qrId}`)}
            >
              Proceed to Check-In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistScanner;