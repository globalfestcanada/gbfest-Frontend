// import React, { useState, useEffect } from "react";
// import MenuTab from "../../components/menuTab";
// import "./index.css";

// const VolunteerPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     age: "",
//     city: "",
//     position: "",
//     rolePreference: "",
//     motivation: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const GOOGLE_SHEETS_URL = "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";
//   const AWS_SES_URL = "https://vtll52mmka.execute-api.ca-central-1.amazonaws.com/prod/volunteer";

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const validateField = (name, value) => {
//     let error = "";

//     if (name === "name") {
//       if (!value.trim()) error = "Full name is required";
//       else if (/[0-9]/.test(value)) error = "Name cannot contain numbers";
//     }

//     if (name === "email") {
//       if (!value.trim()) error = "Email is required";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//         error = "Invalid email format";
//     }

//     if (name === "phone") {
//       if (!/^[0-9]{10}$/.test(value))
//         error = "Phone number must be exactly 10 digits";
//     }

//     if (name === "age") {
//       if (!/^[0-9]{2}$/.test(value)) error = "Enter a valid age (2 digits)";
//     }

//     if (name === "city" && !value.trim()) {
//       error = "City / Location is required";
//     }

//     if (name === "position" && !value.trim()) {
//       error = "Please select a position";
//     }

//     if (name === "rolePreference" && !value.trim()) {
//       error = "Please select a role preference";
//     }

//     setErrors((prev) => ({ ...prev, [name]: error }));
//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone" || name === "age") {
//       if (/[^0-9]/.test(value)) return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBlur = (e) => {
//     validateField(e.target.name, e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       const err = validateField(key, value);
//       if (err) newErrors[key] = err;
//     });

//     setErrors((prev) => ({ ...prev, ...newErrors }));

//     const hasErrors = Object.values({ ...errors, ...newErrors }).some(
//       (err) => err
//     );

//     if (hasErrors) return;

//     try {

//       formData.formType = "volunteer";
//       // await fetch(GOOGLE_SHEETS_URL, {
//       //   method: "POST",
//       //   body: JSON.stringify(formData),
//       // });
//        await fetch(GOOGLE_SHEETS_URL, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(formData),
// });


//       await fetch(AWS_SES_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       setSuccess(true);

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         age: "",
//         city: "",
//         position: "",
//         rolePreference: "",
//         motivation: "",
//       });

//       setErrors({});
//     } catch (err) {
//       console.error("Submission error:", err);
//     }
//   };

//   return (
//     <div>
//       <MenuTab />

//       <section className="volunteer-page">
//         {!success && (
//           <>
//             <h1>Volunteer Application</h1>
//             <p className="intro-text">
//               Join Global Fest 2026 and be part of an incredible experience.
//             </p>

//             <ul className="benefits-list">
//               <li><strong>Build Your Network:</strong> Connect with creatives and pros.</li>
//               <li><strong>Real-World Experience:</strong> Learn large-scale event execution.</li>
//               <li><strong>Skill Development:</strong> Strengthen leadership and technical abilities.</li>
//               <li><strong>Reference Letter:</strong> Earn a personalized letter upon completion.</li>
//             </ul>
//           </>
//         )}

//         {success && (
//           <div className="success-box">
//             <h2>Thank you for signing up!</h2>
//             <p>We appreciate your interest in Global Fest 2026.</p>
//           </div>
//         )}

//         {!success && (
//          <div className="form-shadow-box">
//   <form className="volunteer-form" onSubmit={handleSubmit}>

//             <label>
//               Full Name *
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.name && <span className="error">{errors.name}</span>}
//             </label>

//             <label>
//               Email Address *
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.email && <span className="error">{errors.email}</span>}
//             </label>

//             <label>
//               Phone Number *
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.phone && <span className="error">{errors.phone}</span>}
//             </label>

//             <label>
//               Age *
//               <input
//                 type="text"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.age && <span className="error">{errors.age}</span>}
//             </label>

//             <label>
//               City / Location *
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.city && <span className="error">{errors.city}</span>}
//             </label>

//             <label>
//               Which position interests you most? *
//               <select
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               >
//                 <option value="">— Select a Position —</option>
//                 <option value="logistics">Logistics</option>
//                 <option value="stage-setup">Stage Setup</option>
//                 <option value="guest-experience">Guest Experience</option>
//                 <option value="social-media-and-content-creation">Social Media and Content Creation </option>
//               </select>
//               {errors.position && <span className="error">{errors.position}</span>}
//             </label>

//             <label>
//               Role Preference *
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="rolePreference"
//                     value="unpaid"
//                     checked={formData.rolePreference === "unpaid"}
//                     onChange={handleChange}
//                   />
//                   I am open to an unpaid role.
//                 </label>

//                 <label>
//                   <input
//                     type="radio"
//                     name="rolePreference"
//                     value="paid"
//                     checked={formData.rolePreference === "paid"}
//                     onChange={handleChange}
//                   />
//                   I am only looking for a paid role.
//                 </label>

//                 <label>
//                   <input
//                     type="radio"
//                     name="rolePreference"
//                     value="both"
//                     checked={formData.rolePreference === "both"}
//                     onChange={handleChange}
//                   />
//                   I am open to both.
//                 </label>
//               </div>
//               {errors.rolePreference && (
//                 <span className="error">{errors.rolePreference}</span>
//               )}
//             </label>

//             <label>
//               Why are you a great fit? 
//               <textarea
//                 name="motivation"
//                 value={formData.motivation}
//                 onChange={handleChange}
//               />
//             </label>

//             <button type="submit" className="submit-btn">
//               Submit Application
//             </button>
//           </form>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default VolunteerPage;


import React, { useState, useEffect } from "react";
import MenuTab from "../../components/menuTab";
import "./index.css";

const VolunteerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    position: "",
    rolePreference: "",
    motivation: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // NEW

  const GOOGLE_SHEETS_URL =
    "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";
  const AWS_SES_URL =
    "https://vtll52mmka.execute-api.ca-central-1.amazonaws.com/prod/volunteer";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Full name is required";
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

    if (name === "age") {
      if (!/^[0-9]{2}$/.test(value)) error = "Enter a valid age (2 digits)";
    }

    if (name === "city" && !value.trim()) {
      error = "City / Location is required";
    }

    if (name === "position" && !value.trim()) {
      error = "Please select a position";
    }

    if (name === "rolePreference" && !value.trim()) {
      error = "Please select a role preference";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "age") {
      if (/[^0-9]/.test(value)) return;
    }

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
      formData.formType = "volunteer";

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
        age: "",
        city: "",
        position: "",
        rolePreference: "",
        motivation: "",
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

      <section className="volunteer-page">
        {!success && (
          <>
            <h1>Volunteer Application</h1>
            <p className="intro-text">
              Join Global Fest 2026 and be part of an incredible experience.
            </p>

            <ul className="benefits-list">
              <li><strong>Build Your Network:</strong> Connect with creatives and pros.</li>
              <li><strong>Real-World Experience:</strong> Learn large-scale event execution.</li>
              <li><strong>Skill Development:</strong> Strengthen leadership and technical abilities.</li>
              <li><strong>Reference Letter:</strong> Earn a personalized letter upon completion.</li>
            </ul>
          </>
        )}

        {success && (
          <div className="success-box">
            <h2>Thank you for signing up!</h2>
            <p>We appreciate your interest in Global Fest 2026.</p>
          </div>
        )}

        {!success && (
          <div className="form-shadow-box">
            <form className="volunteer-form" onSubmit={handleSubmit}>
              <label>
                Full Name *
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
                Age *
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.age && <span className="error">{errors.age}</span>}
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
                Which position interests you most? *
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">— Select a Position —</option>
                  <option value="logistics">Logistics</option>
                  <option value="stage-setup">Stage Setup</option>
                  <option value="guest-experience">Guest Experience</option>
                  <option value="social-media-and-content-creation">
                    Social Media and Content Creation
                  </option>
                </select>
                {errors.position && (
                  <span className="error">{errors.position}</span>
                )}
              </label>

              <label>
                Role Preference *
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="rolePreference"
                      value="unpaid"
                      checked={formData.rolePreference === "unpaid"}
                      onChange={handleChange}
                    />
                    I am open to an unpaid role.
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="rolePreference"
                      value="paid"
                      checked={formData.rolePreference === "paid"}
                      onChange={handleChange}
                    />
                    I am only looking for a paid role.
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="rolePreference"
                      value="both"
                      checked={formData.rolePreference === "both"}
                      onChange={handleChange}
                    />
                    I am open to both.
                  </label>
                </div>
                {errors.rolePreference && (
                  <span className="error">{errors.rolePreference}</span>
                )}
              </label>

              <label>
                Why are you a great fit?
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading && <div className="spinner"></div>}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default VolunteerPage;
