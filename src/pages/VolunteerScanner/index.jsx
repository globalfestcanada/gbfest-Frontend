import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VolunteerScanner = () => {
  const [volunteer, setVolunteer] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "volunteer-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          console.log("SCANNED:", decodedText);

          const res = await fetch(
            `http://localhost:4000/api/volunteer/get?qrId=${decodedText}`
          );
          const data = await res.json();

          if (data.success) {
            setVolunteer(data.volunteer);
            setMessage("");
          } else {
            setVolunteer(null);
            setMessage("Volunteer not found.");
          }
        } catch (err) {
          setMessage("Error fetching volunteer.");
        }
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="volunteer-scanner-page">
      <h1>Volunteer QR Scanner</h1>

      <div id="volunteer-reader" className="scanner-box"></div>

      {message && <p className="scanner-error">{message}</p>}

      {volunteer && (
        <div className="volunteer-info">
          <h2>Volunteer Found</h2>
          <p><strong>Name:</strong> {volunteer.fullName}</p>
          <p><strong>Role:</strong> {volunteer.role}</p>
          <p><strong>Phone:</strong> {volunteer.phone}</p>
          <p><strong>Email:</strong> {volunteer.email}</p>

          <button
            className="proceed-btn"
            onClick={() =>
              navigate(`/volunteer-confirm?qrId=${volunteer.qrId}`)
            }
          >
            Proceed to Check-In
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteerScanner;
