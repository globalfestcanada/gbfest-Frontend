import React, { useState, useEffect } from "react";
import "./index.css";

export default function PageantRegistration() {
  const [fullName, setFullName] = useState("");
  const [culture, setCulture] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !culture || !gender || !phone || !email) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/pageant/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, culture, gender, phone, email, notes })
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.qrCode) {
        setQrCode(data.qrCode);
      }
    } catch (err) {
      setMessage("Unable to submit registration right now.");
    }
  };

  return (
    <div className="checkin-page-container">
      <h1>Pageant Application Registry</h1>
      <form className="entry-form-element" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name*" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input type="text" placeholder="Representing Culture (Country)*" value={culture} onChange={e => setCulture(e.target.value)} />
        
        <select value={gender} onChange={e => setGender(e.target.value)} className="gender-dropdown">
          <option value="">Select Gender*</option>
          <option value="female">Female (Miss)</option>
          <option value="male">Male (Mr)</option>
        </select>

        <input type="tel" placeholder="Phone*" value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="email" placeholder="Email*" value={email} onChange={e => setEmail(e.target.value)} />
        <textarea placeholder="Bio notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
        
        <button type="submit">Register & Generate Badge</button>
      </form>

      {message && <p className="status-log-message">{message}</p>}

      {qrCode && (
        <div className="qr-display-box">
          <p>Please save this QR Badge pass for event access verification.</p>
          <img src={qrCode} alt="Contestant Entry QR" />
          <button className="download-action-btn" onClick={() => {
            const a = document.createElement("a");
            a.href = qrCode;
            a.download = `${fullName}-pageant-qr.png`;
            a.click();
          }}>Save Entry QR</button>
        </div>
      )}
    </div>
  );
}