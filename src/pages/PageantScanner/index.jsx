import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const PageantScanner = () => {
  const [contestant, setContestant] = useState(null);
  const [message, setMessage] = useState("");
  const [isAlreadyScanned, setIsAlreadyScanned] = useState(false);
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("pageant-reader", { fps: 10, qrbox: 250 }, false);
    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          const res = await fetch(`https://globalfest-backend.onrender.com/api/pageant/get?qrId=${decodedText}`);
          const data = await res.json();

          if (data.success) {
            if (data.contestant.checkedIn) {
              setIsAlreadyScanned(true);
              setContestant(data.contestant);
              setMessage("This contestant has already checked in.");
            } else {
              setIsAlreadyScanned(false);
              setContestant(data.contestant);
              setMessage("");
            }

            if (scannerRef.current) {
              await scannerRef.current.clear();
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setContestant(null);
            setMessage("Contestant data record missing.");
          }
        } catch (err) {
          setMessage("Network request parsing failure.");
        }
      },
      (error) => { /* jitter prevention */ }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.log("Cleaned:", err));
      }
    };
  }, []);

  return (
    <div className="scanner-root-view">
      <h1>Pageant QR Entry Scanner</h1>
      <div id="pageant-reader" className="embedded-camera-box"></div>

      {message && <p className="alert-text" style={{ color: isAlreadyScanned ? "#d11a1a" : "#0f172a" }}>{message}</p>}

      {contestant && (
        <div className="profile-data-card">
          <h2>{isAlreadyScanned ? "Admission Approved Already" : "Record Identified"}</h2>
          <p><strong>Name:</strong> {contestant.fullName}</p>
          <p><strong>Representing:</strong> {contestant.culture}</p>
          <p><strong>Contact email:</strong> {contestant.email}</p>

          {isAlreadyScanned ? (
            <button className="scan-refresh-btn" onClick={() => window.location.reload()}>Scan Next Pass</button>
          ) : (
            <button className="scan-refresh-btn" onClick={() => navigate(`/pageant-confirm?qrId=${contestant.qrId}`)}>
              Proceed to Admission Setup
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PageantScanner;