// import React, { useState } from "react";
// import "./index.css";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "email":
//         if (!value) {
//           error = "Email is required";
//         } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(value)) {
//           error = "Email must contain '@' and end with '.com'";
//         }
//         break;

//       case "phone":
//         if (value && !/^[0-9]+$/.test(value)) {
//           error = "Phone number must contain only digits";
//         } else if (value.length > 10) {
//           error = "Phone number cannot exceed 10 digits";
//         } else if (value.length > 0 && value.length < 10) {
//           error = "Phone number must be 10 digits";
//         }
//         break;

//       case "message":
//         if (!/^[a-zA-Z0-9+\-=\.,@#$%\s]*$/.test(value)) {
//           error =
//             "Message can only contain letters, numbers, spaces, and + - = , . @ # $ %";
//         }
//         break;

//       default:
//         break;
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Prevent letters and enforce max length for phone
//     if (name === "phone") {
//       if (!/^[0-9]*$/.test(value)) return;
//       if (value.length > 10) return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     validateField(name, value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate all fields before submit
//     Object.keys(formData).forEach((key) => validateField(key, formData[key]));

//     if (Object.values(errors).every((err) => !err)) {
//       console.log("Form submitted:", formData);
//       alert("Message sent successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//       setErrors({});
//     }
//   };

//   return (
//     <section className="contact-box">
//       <div className="contact-container">
//         {/* Left Column: Info */}
//         <div className="contact-info">
//           <h2>Contact Us</h2>
//           <p>
//             We’d love to get more input from you! Whether you have questions,
//             feedback, or ideas to make Global Fest Canada even better, we’re here to listen.
//           </p>
//           <p><strong>Phone:</strong> +1 (705) 930-6692</p>
//           <p><strong>Email:</strong> contact@canadaglobalfest.ca</p>
//           <p>
//             Your voice helps us shape Global Fest Canada into something truly special —
//             don’t hesitate to reach out.
//           </p>
//         </div>

//         {/* Right Column: Form */}
//         <div className="contact-form">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//               />
//               {errors.name && <span className="error">{errors.name}</span>}
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//               />
//               {errors.email && <span className="error">{errors.email}</span>}
//             </div>

//             <div className="form-group">
//               <label>Phone (optional)</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 maxLength="10"   // ✅ enforce at HTML level too
//               />
//               {errors.phone && <span className="error">{errors.phone}</span>}
//             </div>

//             <div className="form-group">
//               <label>Subject</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//               />
//               {errors.subject && <span className="error">{errors.subject}</span>}
//             </div>

//             <div className="form-group">
//               <label>Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 rows="5"
//                 required
//               ></textarea>
//               {errors.message && <span className="error">{errors.message}</span>}
//             </div>

//             <button type="submit" className="submit-btn">Send Message</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import "./index.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // NEW

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(value)) {
          error = "Email must contain '@' and end with '.com'";
        }
        break;

      case "phone":
        if (value && !/^[0-9]+$/.test(value)) {
          error = "Phone number must contain only digits";
        } else if (value.length > 10) {
          error = "Phone number cannot exceed 10 digits";
        } else if (value.length > 0 && value.length < 10) {
          error = "Phone number must be 10 digits";
        }
        break;

      case "message":
        if (value.length > 250) {
          error = "Message cannot exceed 250 characters";
        } else if (!/^[a-zA-Z0-9+\-=\.,@#$%\s]*$/.test(value)) {
          error =
            "Message can only contain letters, numbers, spaces, and + - = , . @ # $ %";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^[0-9]*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((key) => validateField(key, formData[key]));

    if (!Object.values(errors).every((err) => !err)) {
      return;
    }

    setLoading(true); // START LOADING

    try {
      const response = await fetch(
        "https://udz8sgbsxe.execute-api.ca-central-1.amazonaws.com/prod/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.status === "sent") {
        // alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setErrors({});
      } else {
        // alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      // alert("Something went wrong. Please try again later.");
    }

    setLoading(false); // STOP LOADING
  };

  return (
    <section className="contact-box">
      <div className="contact-container">
        <div className="contact-info">
          <h2>CONTACT US</h2>
          <p>
            We’d love to get more input from you! Whether you have questions,
            feedback, or ideas to make Global Fest Canada even better, we’re here to listen.
          </p>
          <p><strong>Phone:</strong> +1 (705) 930-6692</p>
          <p><strong>Email:</strong> contact@canadaglobalfest.ca</p>
          <p>
            Your voice helps us shape Global Fest Canada into something truly special —
            don’t hesitate to reach out.
          </p>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="10"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.subject && <span className="error">{errors.subject}</span>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                required
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>

            {/* Submit Button with Spinner */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading && <div className="spinner"></div>}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;