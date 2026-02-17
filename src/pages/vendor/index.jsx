import React, { useState, useEffect } from "react";
import MenuTab from "../../components/menuTab";
import "./index.css";

const VendorForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    boothSize: "",
    powerRequired: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const GOOGLE_SHEETS_URL =
    "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";
  const AWS_SES_URL =
    "https://z1csooewof.execute-api.ca-central-1.amazonaws.com/prod/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if (name === "businessName" && !value.trim()) {
      error = "Business name is required";
    }

    if (name === "contactName") {
      if (!value.trim()) error = "Contact name is required";
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
      error = "Please select a vendor category";
    }

    if (name === "boothSize" && !value.trim()) {
      error = "Booth size is required";
    }

    if (name === "powerRequired" && !value.trim()) {
      error = "Please select an option";
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
      formData.formType = "vendor";

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
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        category: "",
        boothSize: "",
        powerRequired: "",
        description: "",
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

      <section className="vendor-page">
        <h1>Become a Vendor at Global Fest Canada 2026</h1>
        <p className="intro-text">
          Apply to become a vendor at Global Fest 2026. Share your business details below.
        </p>

        {success && (
          <div className="success-box">
            <h2>Thank you for applying!</h2>
            <p>We’ll review your vendor application and contact you soon.</p>
          </div>
        )}

        {!success && (
          <div className="form-shadow-box">
            <form className="vendor-form" onSubmit={handleSubmit}>
              <label>
                Business Name *
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName && (
                  <span className="error">{errors.businessName}</span>
                )}
              </label>

              <label>
                Contact Person Name *
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.contactName && (
                  <span className="error">{errors.contactName}</span>
                )}
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
                Vendor Category *
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food Vendor</option>
                  <option value="crafts">Crafts / Handmade Goods</option>
                  <option value="clothing">Clothing / Apparel</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && (
                  <span className="error">{errors.category}</span>
                )}
              </label>

              <label>
                Booth Size (e.g., 10x10) *
                <input
                  type="text"
                  name="boothSize"
                  value={formData.boothSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.boothSize && (
                  <span className="error">{errors.boothSize}</span>
                )}
              </label>

              <label>
                Power Required? *
                <select
                  name="powerRequired"
                  value={formData.powerRequired}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.powerRequired && (
                  <span className="error">{errors.powerRequired}</span>
                )}
              </label>

              <label>
                Description of Products / Services
                <textarea
                  name="description"
                  value={formData.description}
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

export default VendorForm;
