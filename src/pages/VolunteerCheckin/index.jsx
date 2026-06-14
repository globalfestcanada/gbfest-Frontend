import React, { useState } from "react";
import "./index.css";

export default function VolunteerCheckin() {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !role || !phone || !email) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/volunteer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          role,
          phone,
          email,
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
    link.href = qrCode;
    link.download = `${fullName}-volunteer-qr.png`;
    link.click();
  };

  return (
    <div className="volunteer-checkin-page">
      <h1>Volunteer Check-In</h1>

      <form className="volunteer-checkin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name*"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Volunteer Role*"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      {message && <p className="volunteer-message">{message}</p>}

      {qrCode && (
        <div className="qr-section">
          <p>Please save this QR code and bring it to the event.</p>
          <img src={qrCode} alt="Volunteer QR Code" />

          <button className="save-qr-btn" onClick={handleSaveQr}>
            Save QR Code
          </button>
        </div>
      )}
    </div>
  );
}
