import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VolunteerScanner = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [message, setMessage] = useState("");
  const [isAlreadyScanned, setIsAlreadyScanned] = useState(false);
  const navigate = useNavigate();
  
  // Stable scanner reference tracking across component render cycles
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "volunteer-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          console.log("SCANNED:", decodedText);

          const res = await fetch(
            `https://globalfest-backend.onrender.com/api/volunteer/get?qrId=${decodedText}`
          );
          const data = await res.json();

          if (data.success) {
            // Check if the volunteer is already flag-marked as checked in
            if (data.volunteer.status === "Checked In" || data.volunteer.isCheckedIn) {
              setIsAlreadyScanned(true);
              setVolunteer(data.volunteer);
              setMessage("This volunteer has already been checked in.");
            } else {
              setIsAlreadyScanned(false);
              setVolunteer(data.volunteer);
              setMessage("");
            }

            // 1. Shut down the hardware camera and clear the scanner element UI
            if (scannerRef.current) {
              await scannerRef.current.clear();
            }

            // 2. Smoothly snap the viewport back to top so results are in focus
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });

          } else {
            setVolunteer(null);
            setMessage("Volunteer not found.");
          }
        } catch (err) {
          setMessage("Error fetching volunteer.");
        }
      },
      (error) => {
        // ignore scan jitter errors
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.log("Cleanup skipped:", err));
      }
    };
  }, []);

  return (
    <div className="volunteer-scanner-page">
      <h1>Volunteer QR Scanner</h1>

      <div id="volunteer-reader" className="scanner-box"></div>

      {message && (
        <p className="scanner-error" style={{ color: isAlreadyScanned ? "#d11a1a" : "#0b132b" }}>
          {message}
        </p>
      )}

      {volunteer && (
        <div className="volunteer-info">
          <h2>{isAlreadyScanned ? "Check-in Status" : "Volunteer Found"}</h2>
          <p><strong>Name:</strong> {volunteer.fullName}</p>
          <p><strong>Role:</strong> {volunteer.role}</p>
          <p><strong>Phone:</strong> {volunteer.phone}</p>
          <p><strong>Email:</strong> {volunteer.email}</p>

          {isAlreadyScanned ? (
            <button className="proceed-btn" onClick={() => window.location.reload()}>
              Scan Another
            </button>
          ) : (
            <button
              className="proceed-btn"
              onClick={() =>
                navigate(`/volunteer-confirm?qrId=${volunteer.qrId}`)
              }
            >
              Proceed to Check-In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VolunteerScanner;