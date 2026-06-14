import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

export default function VolunteerConfirm() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const qrId = queryParams.get("qrId");

  const [volunteer, setVolunteer] = useState(null);
  const [checkedInBy, setCheckedInBy] = useState("");
  const [notes, setNotes] = useState("");
  const [hours, setHours] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchVolunteer();
  }, []);

  const fetchVolunteer = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/volunteer/get?qrId=${qrId}`);
      const data = await res.json();

      if (data.success) {
        setVolunteer(data.volunteer);
      } else {
        setMessage("Volunteer not found.");
      }
    } catch (err) {
      setMessage("Error loading volunteer.");
    }
  };

  const handleSubmit = async () => {
    if (!checkedInBy) {
      setMessage("Please enter who is checking in this volunteer.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/volunteer/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrId,
          checkedInBy,
          notes,
          hours
        })
      });

      const data = await res.json();
      setMessage(data.message);
      

// Redirect after 1 second
        setTimeout(() => {
        navigate("/volunteer-scanner");
        }, 1000);


    } catch (err) {
      setMessage("Unable to complete check-in.");
    }
  };

  if (!volunteer) {
    return (
      <div className="volunteer-confirm-page">
        <h1>Volunteer Check-In</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="volunteer-confirm-page">
      <h1>Volunteer Check-In</h1>

      <div className="volunteer-info-box">
        <p><strong>Name:</strong> {volunteer.fullName}</p>
        <p><strong>Role:</strong> {volunteer.role}</p>
        <p><strong>Phone:</strong> {volunteer.phone}</p>
        <p><strong>Email:</strong> {volunteer.email}</p>
        {volunteer.notes && <p><strong>Notes:</strong> {volunteer.notes}</p>}
      </div>

      <div className="confirm-form">
        <input
          type="text"
          placeholder="Checked in by*"
          value={checkedInBy}
          onChange={(e) => setCheckedInBy(e.target.value)}
        />

        <input
          type="number"
          placeholder="Hours worked (optional)"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <textarea
          placeholder="Additional notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button onClick={handleSubmit}>Confirm Check-In</button>
      </div>

      {message && <p className="confirm-message">{message}</p>}
    </div>
  );
}
