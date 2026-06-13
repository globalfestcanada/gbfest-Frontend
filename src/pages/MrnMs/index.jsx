import React, { useState, useEffect } from "react";
import "./index.css";

const PageantApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    preferredName: "",
    gender: "",
    dob: "",
    age: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    instagram: "",
    connectedToCulture: "",
    cultureExplanation: "",
    cultureMeaning: "",
    hasModellingExperience: "",
    modellingDetails: "",
    stageExperience: "",
    languages: "",
    whyGlobalCanada: "",
    globalUnityMeaning: "",
    uniqueRepresentative: "",
    availableMay30: "",
    availableJune13: "",
  });

  const [headshot, setHeadshot] = useState(null);
  const [fullLength, setFullLength] = useState(null);
  const [culturalPhoto, setCulturalPhoto] = useState(null);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const GET_UPLOAD_URL = "https://wk666vi1of.execute-api.ca-central-1.amazonaws.com/get-upload-url";
  const VIEW_URL = "https://6jv105842b.execute-api.ca-central-1.amazonaws.com/view";
  const SHEETS_URL = "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Optional: simple word limit for whyGlobalCanada (150 words)
    if (name === "whyGlobalCanada") {
      const words = value.trim().split(/\s+/);
      if (words.length > 150) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0] || null;

    if (name === "headshot") setHeadshot(file);
    if (name === "fullLength") setFullLength(file);
    if (name === "culturalPhoto") setCulturalPhoto(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.age.trim()) newErrors.age = "Age is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim())
      newErrors.country = "Country you will represent is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (!formData.cultureMeaning.trim())
      newErrors.cultureMeaning = "This field is required";
    if (!formData.whyGlobalCanada.trim())
      newErrors.whyGlobalCanada = "This field is required";
    if (!formData.globalUnityMeaning.trim())
      newErrors.globalUnityMeaning = "This field is required";
    if (!formData.uniqueRepresentative.trim())
      newErrors.uniqueRepresentative = "This field is required";

    if (!formData.availableMay30)
      newErrors.availableMay30 = "Please select an option";
    if (!formData.availableJune13)
      newErrors.availableJune13 = "Please select an option";

    if (!headshot) newErrors.headshot = "Headshot is required";
    if (!fullLength) newErrors.fullLength = "Full-length photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const getPresignedUrl = async (fileName, fileType) => {
  const res = await fetch(GET_UPLOAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileType }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  return res.json(); // { uploadUrl, objectKey }
};

const uploadToS3 = async (file, uploadUrl) => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!res.ok) throw new Error("Failed to upload to S3");
};

const [showGuidelines, setShowGuidelines] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    // 1. Request pre-signed URLs
    const headshotReq = await getPresignedUrl(headshot.name, headshot.type);
    const fullLengthReq = await getPresignedUrl(fullLength.name, fullLength.type);

    let culturalReq = null;
    if (culturalPhoto) {
      culturalReq = await getPresignedUrl(culturalPhoto.name, culturalPhoto.type);
    }

    // 2. Upload files to S3
    await uploadToS3(headshot, headshotReq.uploadUrl);
    await uploadToS3(fullLength, fullLengthReq.uploadUrl);

    if (culturalReq) {
      await uploadToS3(culturalPhoto, culturalReq.uploadUrl);
    }

    // 3. Build final payload for Sheets
    const payload = {
        formType: "pageant",
      ...formData,
      headshotKey: headshotReq.objectKey,
      fullLengthKey: fullLengthReq.objectKey,
      culturalKey: culturalReq ? culturalReq.objectKey : null,

      // VIEW LINKS (Step 4)
      viewHeadshot: `${VIEW_URL}?key=${headshotReq.objectKey}`,
      viewFullLength: `${VIEW_URL}?key=${fullLengthReq.objectKey}`,
      viewCultural: culturalReq ? `${VIEW_URL}?key=${culturalReq.objectKey}` : null,
    };

    // 4. Send to Google Sheets Lambda
    await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 5. Success UI
    setSuccess(true);

    // Reset form
    setFormData({
      fullName: "",
      preferredName: "",
      gender: "",
      dob: "",
      age: "",
      city: "",
      country: "",
      phone: "",
      email: "",
      instagram: "",
      connectedToCulture: "",
      cultureExplanation: "",
      cultureMeaning: "",
      hasModellingExperience: "",
      modellingDetails: "",
      stageExperience: "",
      languages: "",
      whyGlobalCanada: "",
      globalUnityMeaning: "",
      uniqueRepresentative: "",
      availableMay30: "",
      availableJune13: "",
    });

    setHeadshot(null);
    setFullLength(null);
    setCulturalPhoto(null);
    setErrors({});
  } catch (err) {
    console.error("Submission error:", err);
  }

  setLoading(false);
};

  return (
    <div className="pageant-page">
      <h1>Mr.& Miss Global Fest Canada Application</h1>
      <p className="sponsor-intro">
        Complete the form below to apply for Mr. & Miss GlobalFest Canada.
      </p>
      <p className="guideline-link" onClick={() => setShowGuidelines(true)}>
  View Pageant Guidelines
</p>


      {success && (
        <div className="success-box">
          Your application has been submitted successfully!
        </div>
      )}

      {!success && (
        <div className="form-shadow-box">
          <form className="pageant-form" onSubmit={handleSubmit}>
            {/* PERSONAL INFORMATION */}
            <h2>Personal Information</h2>

            <label>
              Full Name *
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <span className="error">{errors.fullName}</span>
              )}
            </label>

            <label>
              Preferred Name
              <input
                type="text"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleChange}
              />
            </label>

            <label>
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Date of Birth *
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </label>

            <label>
              Age *
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <span className="error">{errors.age}</span>}
            </label>

            <label>
              City of Residence *
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </label>

            <label>
              Country You Will Represent *
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </label>

            <label>
              Phone Number *
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Instagram Handle
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </label>

            {/* CULTURAL REPRESENTATION */}
            <h2>Cultural Representation</h2>

            <label>
              Are you personally connected to this culture?
              <select
                name="connectedToCulture"
                value={formData.connectedToCulture}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            {formData.connectedToCulture === "Yes" && (
              <label>
                If yes, explain
                <input
                  type="text"
                  name="cultureExplanation"
                  value={formData.cultureExplanation}
                  onChange={handleChange}
                />
              </label>
            )}

            <label>
              What does your culture mean to you? *
              <textarea
                name="cultureMeaning"
                value={formData.cultureMeaning}
                onChange={handleChange}
                rows="4"
              />
              {errors.cultureMeaning && (
                <span className="error">{errors.cultureMeaning}</span>
              )}
            </label>

            {/* EXPERIENCE & SKILLS */}
            <h2>Experience & Skills</h2>

            <label>
              Do you have modelling/pageant experience?
              <select
                name="hasModellingExperience"
                value={formData.hasModellingExperience}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            {formData.hasModellingExperience === "Yes" && (
              <label>
                If yes, details
                <textarea
                  name="modellingDetails"
                  value={formData.modellingDetails}
                  onChange={handleChange}
                  rows="3"
                />
              </label>
            )}

            <label>
              Do you have stage experience?
              <textarea
                name="stageExperience"
                value={formData.stageExperience}
                onChange={handleChange}
                rows="3"
              />
            </label>

            <label>
              Languages spoken
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
              />
            </label>

            {/* PHOTOS */}
            <h2>Photos</h2>

            <label>
              Upload Headshot *
              <input
                type="file"
                name="headshot"
                accept="image/*"
                onChange={handleFileChange}
              />
              {errors.headshot && (
                <span className="error">{errors.headshot}</span>
              )}
            </label>

            <label>
              Upload Full-Length Photo *
              <input
                type="file"
                name="fullLength"
                accept="image/*"
                onChange={handleFileChange}
              />
              {errors.fullLength && (
                <span className="error">{errors.fullLength}</span>
              )}
            </label>

            <label>
              Upload Cultural Attire Photo (Optional)
              <input
                type="file"
                name="culturalPhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            {/* PERSONALITY & VISION */}
            <h2>Personality & Vision</h2>

            <label>
              Why do you want to be Mr./Miss Global Canada? * (Max 150 words)
              <textarea
                name="whyGlobalCanada"
                value={formData.whyGlobalCanada}
                onChange={handleChange}
                rows="4"
              />
              {errors.whyGlobalCanada && (
                <span className="error">{errors.whyGlobalCanada}</span>
              )}
            </label>

            <label>
              What does “global unity” mean to you? *
              <textarea
                name="globalUnityMeaning"
                value={formData.globalUnityMeaning}
                onChange={handleChange}
                rows="4"
              />
              {errors.globalUnityMeaning && (
                <span className="error">{errors.globalUnityMeaning}</span>
              )}
            </label>

            <label>
              What makes you unique as a representative of your country? *
              <textarea
                name="uniqueRepresentative"
                value={formData.uniqueRepresentative}
                onChange={handleChange}
                rows="4"
              />
              {errors.uniqueRepresentative && (
                <span className="error">{errors.uniqueRepresentative}</span>
              )}
            </label>

            {/* AVAILABILITY & COMMITMENT */}
            <h2>Availability & Commitment</h2>

            <label>
              Are you available for online meeting on May 30, 2026? *
              <select
                name="availableMay30"
                value={formData.availableMay30}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.availableMay30 && (
                <span className="error">{errors.availableMay30}</span>
              )}
            </label>

            <label>
              Are you available for in-person grooming on June 13, 2026? *
              <select
                name="availableJune13"
                value={formData.availableJune13}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.availableJune13 && (
                <span className="error">{errors.availableJune13}</span>
              )}
            </label>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "SUBMIT APPLICATION"}
            </button>
          </form>
        </div>
      )}
      {showGuidelines && (
  <div
    className="guideline-overlay"
    onClick={() => setShowGuidelines(false)}
  >
    <div
      className="guideline-box"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ⭐ Heading moved down */}
      <h2 className="guideline-title">Pageant Guidelines</h2>

     <div className="guideline-content">

  <h3>ABOUT THE EVENT</h3>
  <p>
    MR. & MISS Global Fest 2026 is a luxury multicultural celebration presented during Global Fest Canada 2026. 
    This event is designed to bring together individuals from different backgrounds and cultures to showcase unity, 
    leadership, creativity, and global representation. This is more than a pageant. It is a platform that celebrates 
    identity, purpose, talent, and cultural pride. Participants will compete in various rounds designed to showcase 
    personality, confidence, creativity, communication skills, stage presence, and individuality.
  </p>

  <h3>ELIGIBILITY</h3>
  <p>Participants Must:</p>
  <ul>
    <li>Open to all participants from all communities and cultural backgrounds residing in Canada.</li>
    <li>Be 18 years of age or older as of June 21, 2026.</li>
    <li>Be comfortable performing on stage and represent themselves respectfully and professionally.</li>
    <li>Be available on June 21st, 2026 for the event and follow all competition rules and conduct guidelines.</li>
  </ul>

  <h3>SELECTION PROCESS</h3>
  <p>1. Candidate Shortlisting will be based on:</p>
  <ul>
    <li>Registration Form Responses</li>
    <li>Cultural Representation</li>
    <li>Stage Presence and communication</li>
  </ul>

  <p>2. In case of multiple registration representing the same culture/country, applicants may be requested to submit:</p>
  <ul>
    <li>A self introduction Video</li>
    <li>Additional profile information</li>
    <li>or attend a virtual audition for final shortlisting</li>
  </ul>

  <h3>COMPETITION ROUNDS OVERVIEW</h3>
  <p>
    Selected finalists will participate in multiple competition segments designed to celebrate culture, confidence, 
    individuality, communication, and stage presence.
  </p>

  <ul>
    <li><strong>Round 1 — Cultural Couture</strong><br/>
      Participants wear traditional or culture-inspired outfits that highlight the beauty, history, and uniqueness of their heritage.
    </li>

    <li><strong>Round 2 — Legacy & Identity</strong><br/>
      Continuing in the same outfit from Round 1, participants introduce themselves, talk about their cultural background, 
      and share what multiculturalism and representing the world means to them within 60 sec.
    </li>

    <li><strong>Round 3 — Global Citizen Runway</strong><br/>
      Participants present themselves in stylish cocktail attire, showing elegance, confidence, and personality.
    </li>

    <li><strong>Round 4 — Global Voice Q&A</strong><br/>
      Continuing in the same outfit from Round 3, participants answer questions about leadership, diversity, culture, 
      community involvement, and global unity.
    </li>
  </ul>

  <h3>COMMITMENT AND CONDUCT GUIDELINES</h3>
  <ul>
    <li>Shortlisted participants must be available for rehearsals, promotional appearances, photoshoots, media activities, 
        and all official event-related sessions leading up to the finale.</li>
    <li>Participants are expected to uphold professionalism, discipline, integrity, and respectful conduct toward fellow 
        contestants, organizers, sponsors, partners, and communities at all times.</li>
    <li>Any form of discriminatory, offensive, inappropriate, harmful, or disrespectful behaviour may result in immediate 
        disqualification from the competition.</li>
    <li>By participating, contestants grant Global Fest Canada and its affiliated partners permission to use submitted and 
        event-related photos, videos, and media content for promotional, marketing, social media, press, and event coverage 
        purposes.</li>
    <li>The organizing committee reserves the right to make final decisions regarding participant selection, scheduling, 
        event structure, eligibility, and overall event conduct.</li>
    <li>A detailed Participant Agreement, Competition Rules, Media Release, and Official Event Guidelines will be provided 
        to all selected finalists prior to the competition.</li>
  </ul>

</div>


      {/* ⭐ Bottom close button */}
      <button
        className="bottom-close-btn"
        onClick={() => setShowGuidelines(false)}
      >
        Close
      </button>
    </div>
  </div>
)}



    </div>
  );
};

export default PageantApplicationForm;
