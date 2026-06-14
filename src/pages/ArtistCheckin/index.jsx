import React, { useState } from "react";
import "./index.css";

const ArtistCheckin = () => {
  const [fullName, setFullName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !teamName || !phone || !email || !teamSize) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/artist/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          teamName,
          phone,
          email,
          teamSize,
          notes
        })
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.qrCode) {
        setQrCode(data.qrCode);
      }

    } catch (err) {
      setMessage("Unable to submit form right now.");
    }
  };
  const handleSaveQr = () => {
  const link = document.createElement("a");
  link.href = qrCode;          // data:image/png;base64,...
  link.download = `${fullName}-qr.png`;
  link.click();
};


  return (
    <div className="artist-checkin-page">
      <h1>Artist Check-In</h1>

      <form onSubmit={handleSubmit} className="artist-checkin-form">
        <input
          type="text"
          placeholder="Full Name*"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Team Name*"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="No. of Team Members*"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          min="1"
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {message && <p className="artist-message">{message}</p>}

      {/* {qrCode && (
        <div className="qr-section">
          <p>Please save this QR code and bring it to the event.</p>
          <img src={qrCode} alt="Artist QR Code" />
        </div>
      )} */}
        {qrCode && (
  <div className="qr-section">
    <p>Please save this QR code and bring it to the event.</p>

    <img src={qrCode} alt="Artist QR Code" />

    <button className="save-qr-btn" onClick={handleSaveQr}>
      Save QR Code
    </button>
  </div>
)}


    </div>
  );
};

export default ArtistCheckin;
