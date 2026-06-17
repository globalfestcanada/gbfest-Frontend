import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "./index.css";

const UnifiedScanner = () => {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState("");
  const [isAlreadyScanned, setIsAlreadyScanned] = useState(false);
  
  const scannerRef = useRef(null);
  const API_BASE = "https://globalfest-backend.onrender.com";

  const resetScannerState = () => {
    setScannedData(null);
    setMessage("");
    setIsAlreadyScanned(false);
  };

  useEffect(() => {
    // 1. Initialize the scanner on mount
    const scanner = new Html5QrcodeScanner(
      "unified-reader-box",
      { fps: 10, qrbox: 250 },
      false
    );
    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          console.log("AUTOMATED SCAN IN PROGRESS FOR ID:", decodedText);
          setMessage("Identifying pass type...");

          // 2. WATERFALL SEARCH: Query endpoints sequentially until we find a match
          
          // Try Pageants first
          let res = await fetch(`${API_BASE}/api/pageant/get?qrId=${decodedText}`);
          let data = await res.json();

          if (data.success) {
            handleMatchedRecord(data.contestant, "pageant");
            return;
          }

          // Try Artists next
          res = await fetch(`${API_BASE}/api/artist/get?qrId=${decodedText}`);
          data = await res.json();

          if (data.success) {
            handleMatchedRecord(data.artist, "artist");
            return;
          }

          // Try Volunteers last
          res = await fetch(`${API_BASE}/api/volunteer/get?qrId=${decodedText}`);
          data = await res.json();

          if (data.success) {
            handleMatchedRecord(data.volunteer, "volunteer");
            return;
          }

          // If none of the endpoints returned success:
          setScannedData(null);
          setIsAlreadyScanned(false);
          setMessage("Invalid QR Code. Not found in Artists, Volunteers, or Pageants.");

        } catch (err) {
          console.error("Auto Scan Routing Error:", err);
          setMessage("Network error identifying QR code.");
        }
      },
      (error) => { /* jitter prevention */ }
    );

    // Helper to process the successful match
    async function handleMatchedRecord(record, type) {
      // Shutdown camera stream right away to prevent double scans
      if (scannerRef.current) {
        await scannerRef.current.clear().catch(e => console.log(e));
      }

      // Check dynamic check-in fields across types
      const isCheckedIn = record.checkedIn === true || record.isCheckedIn === true || record.status === "Checked In";
      
      // Determine secondary labels dynamically
      let subtitle = "";
      let confirmPath = "";
      if (type === "pageant") {
        subtitle = `Pageant Contestant (Representing: ${record.culture || "N/A"})`;
        confirmPath = `/pageant-confirm?qrId=${record.qrId}`;
      } else if (type === "artist") {
        subtitle = `Artist (Team: ${record.teamName || "N/A"})`;
        confirmPath = `/artist-checkin-confirm?qrId=${record.qrId}`;
      } else if (type === "volunteer") {
        subtitle = `Volunteer (Role: ${record.role || "N/A"})`;
        confirmPath = `/volunteer-confirm?qrId=${record.qrId}`;
      }

      setIsAlreadyScanned(isCheckedIn);
      setMessage(isCheckedIn ? `This ${type} has already been checked in.` : "");
      setScannedData({ ...record, type, subtitle, confirmPath });
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.log("Unmount cleanup:", err));
      }
    };
  }, []);

  return (
    <div className="scanner-root-view">
      <h1>Check-In QR Code Scanner</h1>
      

      {/* Shared Camera View (No buttons above it anymore!) */}
      <div id="unified-reader-box" className="embedded-camera-box"></div>

      {message && (
        <p className="alert-text" style={{ color: isAlreadyScanned ? "#d11a1a" : "#0f172a" }}>
          {message}
        </p>
      )}

      {scannedData && (
        <div className="profile-data-card" style={{ borderLeft: "6px solid #2563eb" }}>
          <h2>{isAlreadyScanned ? "Admission Approved Already" : "Record Identified"}</h2>
          <p style={{ fontStyle: "italic", color: "#2563eb", fontWeight: "600", marginTop: "-5px" }}>
            {scannedData.subtitle}
          </p>
          <hr style={{ border: "0", borderTop: "1px solid #e2e8f0", margin: "12px 0" }} />
          
          <p><strong>Name:</strong> {scannedData.fullName}</p>
          {scannedData.email && <p><strong>Email:</strong> {scannedData.email}</p>}
          {scannedData.phone && <p><strong>Phone:</strong> {scannedData.phone}</p>}

          {isAlreadyScanned ? (
            <button 
              className="scan-refresh-btn" 
              onClick={() => window.location.reload()}
            >
              Scan Another Pass
            </button>
          ) : (
            <button 
              className="scan-refresh-btn" 
              onClick={() => navigate(scannedData.confirmPath)}
            >
              Proceed to Admission Setup
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UnifiedScanner;