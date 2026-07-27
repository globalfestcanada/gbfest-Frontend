import React, { useState, useEffect } from "react";
import MenuTab from "../../components/menuTab";
import "./index.css";

const ArtistForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    groupSize: "",
    duration: "",
    demoLink: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const GOOGLE_SHEETS_URL =
    "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";
  const AWS_SES_URL =
    "https://dosyckykz8.execute-api.ca-central-1.amazonaws.com/prod/artist";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (/[0-9]/.test(value)) error = "Name cannot contain numbers";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email format";
    }

    if (name === "phone") {
      if (!/^[0-9]{10}$/.test(value))
        error = "Phone number must be exactly 10 digits";
    }

    if (name === "city" && !value.trim()) {
      error = "City is required";
    }

    if (name === "category" && !value.trim()) {
      error = "Please select a category";
    }

    if (name === "groupSize") {
      if (!value.trim()) error = "Group size is required";
      else if (!/^[0-9]{1,2}$/.test(value)) error = "Enter a valid number";
    }

    if (name === "duration" && !value.trim()) {
      error = "Duration is required";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "phone" || name === "groupSize") && /[^0-9]/.test(value))
      return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));

    const hasErrors = Object.values({ ...errors, ...newErrors }).some(
      (err) => err
    );

    if (hasErrors) return;

    setLoading(true); // START LOADING

    try {
      formData.formType = "artist";

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
        name: "",
        email: "",
        phone: "",
        city: "",
        category: "",
        groupSize: "",
        duration: "",
        demoLink: "",
        bio: "",
      });

      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
    }

    setLoading(false); // STOP LOADING
  };

  return (
    <div>
      <MenuTab />
      <section className="artist-page">
        <h1>Perform at Global Fest Canada 2026</h1>
        <p className="intro-text">
          Apply to perform at Global Fest Canada 2026. Share your details and performance info below.
        </p>

        {success && (
          <div className="success-box">
            <h2>Thank you for applying!</h2>
            <p>We’ll review your submission and get back to you soon.</p>
          </div>
        )}

        {!success && (
          <div className="form-shadow-box">
            <form className="artist-form" onSubmit={handleSubmit}>
              <label>
                Full Name / Team Name *
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>

              <label>
                Email Address *
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
                City / Location *
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </label>

              <label>
                Art Form *
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Category</option>
                  <option value="dance">Dance</option>
                  <option value="music">Music</option>
                  <option value="skit/drama">Skit / Drama</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <span className="error">{errors.category}</span>}
              </label>

              <label>
                Group Size *
                <input
                  type="text"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.groupSize && <span className="error">{errors.groupSize}</span>}
              </label>

              <label>
                Duration (Mins) *
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.duration && <span className="error">{errors.duration}</span>}
              </label>

              <label>
                Demo Link (YouTube/Drive)
                <input
                  type="text"
                  name="demoLink"
                  value={formData.demoLink}
                  onChange={handleChange}
                />
              </label>

              <label>
                Short Bio / Description
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading && <div className="spinner"></div>}
                {loading ? "Submitting..." : "SUBMIT APPLICATION"}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtistForm;
