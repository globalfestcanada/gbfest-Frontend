import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VendorFeedbackForm = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false); // 🛠️ Track custom success screen state
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    products: "",
    overallExperience: "",
    overallReason: "",
    ratings: {
      registration: "",
      communication: "",
      booth: "",
      logistics: "",
      crowd: "",
      entertainment: "",
      management: ""
    },
    ratingReasons: {
      registration: "",
      communication: "",
      booth: "",
      logistics: "",
      crowd: "",
      entertainment: "",
      management: ""
    },
    entertainmentExperience: "",
    entertainmentComments: "",
    salesRep: "",
    salesRepHelpfulness: "",
    salesRepComments: "",
    businessSatisfaction: "",
    expectations: "",
    expectationsComments: "",
    workedWell: "",
    challenges: "",
    improvements: "",
    participateAgain: "",
    participateReason: "",
    additionalComments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("rating-")) {
      const key = name.replace("rating-", "");
      setFormData({
        ...formData,
        ratings: { ...formData.ratings, [key]: value }
      });
      return;
    }

    if (name.includes("reason-")) {
      const key = name.replace("reason-", "");
      setFormData({
        ...formData,
        ratingReasons: { ...formData.ratingReasons, [key]: value }
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/vendor-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        // 🛠️ Show our gorgeous custom component state, then transition home after 3 seconds
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3200);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Vendor Feedback Error:", error);
      alert("Server error. Please try again later.");
    }
  };

  // 🛠️ Custom Theme Success Screen Render
  if (showSuccess) {
    return (
      <div className="vendor-page success-container">
        <div className="success-icon-circle">✓</div>
        <h1>Thank You!</h1>
        <p className="vendor-subtext">
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
    <div className="vendor-page">
      <h1>Global Fest 2026 – Vendor Feedback Form</h1>
      <p className="vendor-subtext">
        Thank you for participating in Global Fest 2026. Your feedback helps us improve future events.
      </p>

      <form className="vendor-form" onSubmit={handleSubmit}>
        
        {/* BUSINESS INFO */}
        <div className="vendor-section">
          <h2>Business Information</h2>
          <div className="input-grid">
            <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} />
            <input type="text" name="contactPerson" placeholder="Contact Person" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
            <input type="text" name="products" placeholder="Products / Services Offered" onChange={handleChange} />
          </div>
        </div>

        {/* OVERALL EXPERIENCE */}
        <div className="vendor-section">
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
        <div className="vendor-section">
          <h2>2. Event Organization & Support</h2>
          {[
            { key: "registration", label: "Vendor Registration Process" },
            { key: "communication", label: "Communication Before the Event" },
            { key: "booth", label: "Booth Location & Setup" },
            { key: "logistics", label: "Event Logistics & On-Site Support" },
            { key: "crowd", label: "Crowd Attendance & Engagement" },
            { key: "entertainment", label: "Entertainment & Stage Performances" },
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
                name={`reason-${item.key}`}
                placeholder="Please tell us why..."
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* ENTERTAINMENT */}
        <div className="vendor-section">
          <h2>3. Event Entertainment</h2>
          <div className="radio-group">
            {["Loved It", "Enjoyed It", "It Was Okay", "Did Not Enjoy It", "Did Not Watch"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="entertainmentExperience" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="entertainmentComments"
            placeholder="What did you enjoy most? What could be improved?"
            onChange={handleChange}
          />
        </div>

        {/* SALES REP */}
        <div className="vendor-section">
          <h2>4. Sales Representative Experience</h2>
          <input type="text" name="salesRep" placeholder="Sales Representative Name" onChange={handleChange} />
          <div className="radio-group">
            {["Very Helpful", "Helpful", "Neutral", "Not Very Helpful", "Not Helpful"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="salesRepHelpfulness" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="salesRepComments"
            placeholder="Please share your experience..."
            onChange={handleChange}
          />
        </div>

        {/* BUSINESS OUTCOMES */}
        <div className="vendor-section">
          <h2>5. Sales & Business Outcomes</h2>
          <div className="radio-group">
            {["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="businessSatisfaction" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <div className="radio-group">
            {["Exceeded Expectations", "Met Expectations", "Partially Met Expectations", "Did Not Meet Expectations"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="expectations" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="expectationsComments"
            placeholder="Please explain..."
            onChange={handleChange}
          />
        </div>

        {/* OPEN QUESTIONS */}
        <div className="vendor-section">
          <h2>6. What worked well for you?</h2>
          <textarea name="workedWell" onChange={handleChange} />

          <h2>7. What challenges did you face?</h2>
          <textarea name="challenges" onChange={handleChange} />

          <h2>8. How can we better support you?</h2>
          <textarea name="improvements" onChange={handleChange} />
        </div>

        {/* PARTICIPATION */}
        <div className="vendor-section">
          <h2>9. Would you participate again?</h2>
          <div className="radio-group">
            {["Yes", "Maybe", "No"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="participateAgain" value={opt} onChange={handleChange} />
                {opt}
              </label>
            ))}
          </div>
          <textarea
            name="participateReason"
            placeholder="If Maybe or No, please tell us why..."
            onChange={handleChange}
          />
        </div>

        {/* ADDITIONAL COMMENTS */}
        <div className="vendor-section">
          <h2>Additional Comments</h2>
          <textarea name="additionalComments" onChange={handleChange} />
        </div>

        <button className="vendor-submit-btn" type="submit">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default VendorFeedbackForm;