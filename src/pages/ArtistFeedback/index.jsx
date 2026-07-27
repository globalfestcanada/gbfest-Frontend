import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ArtistFeedbackForm = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    artistName: "",
    contactPerson: "",
    email: "",
    phone: "",
    performanceDateTime: "",
    genre: "",
    overallExperience: "",
    overallReason: "",
    ratings: {
      communication: "",
      coordination: "",
      stageSupport: "",
      soundLighting: "",
      backstage: "",
      staffSupport: "",
      audienceEnergy: "",
      management: ""
    },
    ratingComments: {
      communication: "",
      coordination: "",
      stageSupport: "",
      soundLighting: "",
      backstage: "",
      staffSupport: "",
      audienceEnergy: "",
      management: ""
    },
    liaisonName: "",
    liaisonRating: "",
    liaisonSupport: [],
    liaisonComments: "",
    performanceEnjoyment: "",
    favoritePart: "",
    stageAudienceRating: "",
    stageAudienceComments: "",
    improvements: "",
    performAgain: "",
    performAgainReason: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Checkbox group for liaison support
    if (type === "checkbox") {
      const updated = checked
        ? [...formData.liaisonSupport, value]
        : formData.liaisonSupport.filter((v) => v !== value);

      setFormData({ ...formData, liaisonSupport: updated });
      return;
    }

    // Nested rating fields
    if (name.includes("rating-")) {
      const key = name.replace("rating-", "");
      setFormData({
        ...formData,
        ratings: { ...formData.ratings, [key]: value }
      });
      return;
    }

    if (name.includes("comment-")) {
      const key = name.replace("comment-", "");
      setFormData({
        ...formData,
        ratingComments: { ...formData.ratingComments, [key]: value }
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/artist-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3200);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Artist Feedback Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  // Premium Custom Theme Success Screen Render
  if (showSuccess) {
    return (
      <div className="artist-page success-container">
        <div className="success-icon-circle">✓</div>
        <h1>Thank You!</h1>
        <p className="artist-subtext">
          Your feedback has been successfully submitted. We appreciate your time and insights helping us shape Global Fest!
        </p>
        <div className="redirect-loader-bar">
          <div className="redirect-loader-progress"></div>
        </div>
        <p className="redirect-text">Returning to Home Page...</p>
      </div>
    );
  }

  return (
    <div className="artist-page">
      <h1>Global Fest 2026 – Artist Feedback Form</h1>
      <p className="artist-subtext">
        Thank you for performing at Global Fest 2026. Your feedback helps us improve future events.
      </p>

      <form className="artist-form" onSubmit={handleSubmit}>
        
        {/* ARTIST INFO */}
        <div className="artist-section">
          <h2>Artist Information</h2>
          <div className="input-grid">
            <input type="text" name="artistName" placeholder="Artist / Band Name" onChange={handleChange} />
            <input type="text" name="contactPerson" placeholder="Contact Person" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
            <input type="text" name="performanceDateTime" placeholder="Performance Date & Time" onChange={handleChange} />
            <input type="text" name="genre" placeholder="Genre / Type of Performance" onChange={handleChange} />
          </div>
        </div>

        {/* OVERALL EXPERIENCE */}
        <div className="artist-section">
          <h2>1. Overall Experience</h2>
          <div className="radio-group">
            {["Excellent", "Good", "Fair", "Poor"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="overallExperience" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="overallReason"
            placeholder="Please tell us why you selected this rating..."
            onChange={handleChange}
          />
        </div>

        {/* EVENT ORGANIZATION */}
        <div className="artist-section">
          <h2>2. Event Organization & Artist Support</h2>
          {[
            { key: "communication", label: "Communication Before the Event" },
            { key: "coordination", label: "Artist Coordination & Scheduling" },
            { key: "stageSupport", label: "Stage Setup & Technical Support" },
            { key: "soundLighting", label: "Sound & Lighting Quality" },
            { key: "backstage", label: "Backstage Facilities" },
            { key: "staffSupport", label: "Volunteer & Staff Support" },
            { key: "audienceEnergy", label: "Audience Engagement & Energy" },
            { key: "management", label: "Overall Event Management" }
          ].map((item) => (
            <div className="rating-row" key={item.key}>
              <label>{item.label}</label>
              <div className="radio-group small">
                {["Excellent", "Good", "Fair", "Poor"].map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`rating-${item.key}`}
                      value={opt}
                      onChange={handleChange}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              <input
                type="text"
                name={`comment-${item.key}`}
                placeholder="Comments..."
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* LIAISON EXPERIENCE */}
        <div className="artist-section">
          <h2>3. Artist Liaison / Point of Contact Experience</h2>
          <input type="text" name="liaisonName" placeholder="Point of Contact Name" onChange={handleChange} />
          
          <div className="radio-group">
            {["Excellent", "Good", "Fair", "Poor"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="liaisonRating" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>

          <p className="checkbox-title">How did your liaison support you?</p>
          <div className="checkbox-group">
            {[
              "Answered questions promptly",
              "Assisted with scheduling and coordination",
              "Provided clear event information and updates",
              "Helped with stage, technical, or logistical needs",
              "Checked in regularly and provided support",
              "Helped resolve issues or concerns"
            ].map((opt) => (
              <label key={opt} className="checkbox-item">
                <input type="checkbox" value={opt} onChange={handleChange} />
                <span>{opt}</span>
              </label>
            ))}
            <label className="checkbox-item">
              <input type="checkbox" value="Other" onChange={handleChange} />
              <span>Other</span>
            </label>
          </div>

          <textarea
            name="liaisonComments"
            placeholder="Please share your experience..."
            onChange={handleChange}
          />
        </div>

        {/* PERFORMANCE EXPERIENCE */}
        <div className="artist-section">
          <h2>4. Performance Experience</h2>
          <div className="radio-group">
            {["Loved It", "Enjoyed It", "It Was Okay", "Did Not Enjoy It"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="performanceEnjoyment" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="favoritePart"
            placeholder="What was your favorite part of the experience?"
            onChange={handleChange}
          />
        </div>

        {/* STAGE & AUDIENCE */}
        <div className="artist-section">
          <h2>5. Stage & Audience Experience</h2>
          <div className="radio-group">
            {["Excellent", "Good", "Fair", "Poor"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="stageAudienceRating" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="stageAudienceComments"
            placeholder="Please share your feedback..."
            onChange={handleChange}
          />
        </div>

        {/* IMPROVEMENTS */}
        <div className="artist-section">
          <h2>6. How can we better support you?</h2>
          <textarea name="improvements" placeholder="Your suggestions..." onChange={handleChange} />
        </div>

        {/* PERFORM AGAIN */}
        <div className="artist-section">
          <h2>7. Would you perform at Global Fest again?</h2>
          <div className="radio-group">
            {["Yes", "Maybe", "No"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="performAgain" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="performAgainReason"
            placeholder="If Maybe or No, please tell us why..."
            onChange={handleChange}
          />
        </div>

        <button className="artist-submit-btn" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default ArtistFeedbackForm;