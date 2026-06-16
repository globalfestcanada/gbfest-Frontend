import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

export default function PageantConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const qrId = queryParams.get("qrId");

  const [contestant, setContestant] = useState(null);
  const [checkedInBy, setCheckedInBy] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchContestant = async () => {
      try {
        const res = await fetch(`https://globalfest-backend.onrender.com/api/pageant/get?qrId=${qrId}`);
        const data = await res.json();
        if (data.success) setContestant(data.contestant);
        else setMessage("Contestant lookup failed.");
      } catch (err) {
        setMessage("Database communication error.");
      }
    };
    fetchContestant();
  }, [qrId]);

  const handleConfirmSubmit = async () => {
    if (!checkedInBy) {
      setMessage("Please sign your organizer name to complete registration.");
      return;
    }

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/pageant/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrId, checkedInBy, numberOfPeople, notes })
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setTimeout(() => {
          navigate("/pageant-scanner");
        }, 1200);
      }
    } catch (err) {
      setMessage("Unable to submit check-in entry log updates.");
    }
  };

  if (!contestant) {
    return <div className="loading-view"><h1>Pageant Gate Entry</h1><p>{message || "Loading profile data..."}</p></div>;
  }

  return (
    <div className="confirmation-workspace-box">
      <h1>Review & Confirm Entrance</h1>
      
      <div className="badge-profile-summary">
        <p><strong>Contestant:</strong> {contestant.fullName}</p>
        <p><strong>Culture:</strong> {contestant.culture}</p>
        <p><strong>Gender Bracket:</strong> {contestant.gender}</p>
        <p><strong>Contact:</strong> {contestant.phone} | {contestant.email}</p>
      </div>

      <div className="organizer-input-panel">
        <label>Checked In By (Organizer Name)*</label>
        <input type="text" placeholder="Your Name" value={checkedInBy} onChange={e => setCheckedInBy(e.target.value)} />

        <label>Total Number of People in Group</label>
        <input type="number" min="1" value={numberOfPeople} onChange={e => setNumberOfPeople(e.target.value)} />

        <label>Gate Entry Log Notes</label>
        <textarea placeholder="e.g. Backstage styling assistant accompanied" value={notes} onChange={e => setNotes(e.target.value)} />

        <button onClick={handleConfirmSubmit} className="commit-entry-btn">Approve Entrance Access</button>
      </div>

      {message && <p className="server-response-toast">{message}</p>}
    </div>
  );
}