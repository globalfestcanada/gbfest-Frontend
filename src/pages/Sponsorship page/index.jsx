import React, { useState, useEffect } from "react";
import "./index.css";

const SponsorForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const GOOGLE_SHEETS_URL =
    "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";
  const AWS_SES_URL =
    "https://x7j84n0x5m.execute-api.ca-central-1.amazonaws.com/prod/sponsor";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if ((name === "company" || name === "contact") && /[0-9]/.test(value)) {
      error = "Numbers are not allowed in this field";
    }

    if (name === "company" && !value.trim()) {
      error = "Company name is required";
    }

    if (name === "contact" && !value.trim()) {
      error = "Contact person name is required";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }

    if (name === "phone") {
      if (!/^[0-9]{10}$/.test(value)) {
        error = "Phone number must be exactly 10 digits";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && /[^0-9]/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "message") {
        const err = validateField(key, value);
        if (err) newErrors[key] = err;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));

    const hasErrors = Object.values({ ...errors, ...newErrors }).some(
      (err) => err
    );

    if (hasErrors) return;

    setLoading(true); // START LOADING

    try {
      formData.formType = "sponsor";

      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await fetch(AWS_SES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSuccess(true);

      setFormData({
        company: "",
        contact: "",
        email: "",
        phone: "",
        message: "",
      });

      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
    }

    setLoading(false); // STOP LOADING
  };

  return (
    <div className="sponsor-page">
      <h1>Sponsorship Application</h1>
      <p className="sponsor-intro">
        Submit your interest in becoming a sponsor for Global Fest Canada.
      </p>

      {success && (
        <div className="success-box">
          Your application has been submitted successfully!
        </div>
      )}

      {!success && (
        <div className="form-shadow-box">
          <form className="sponsor-form" onSubmit={handleSubmit}>
            <label>
              Company / Brand Name *
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.company && <span className="error">{errors.company}</span>}
            </label>

            <label>
              Contact Person Name *
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </label>

            <label>
              Official Email *
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>

            <label>
              Phone Number *
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </label>

            <label>
              Message / Sponsorship Goals
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </label>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading && <div className="spinner"></div>}
              {loading ? "Submitting..." : "SUBMIT APPLICATION"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SponsorForm;
