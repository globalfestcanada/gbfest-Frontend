import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";

const PhotographyContestForm = () => {

  const GET_UPLOAD_API =
    "https://6x8wt0jxo3.execute-api.ca-central-1.amazonaws.com/photocontest/get-upload-url";

  const VIEW_IMAGE_API =
    "https://atq9rf7h4e.execute-api.ca-central-1.amazonaws.com/photocontest/view";

  const SHEETS_WRITER_API =
    "https://9zmqqiw8v1.execute-api.ca-central-1.amazonaws.com/sheets";


  const [photoFile, setPhotoFile] = useState(null);
  const [photoError, setPhotoError] = useState("");

  const [checkboxError, setCheckboxError] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    instagramHandle: "",
    followsGlobalFest: "",
    photoCategory: "",
    photoTitle: "",
    photoCaption: "",
    cultureRepresented: "",
    extraNotes: "",
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);


  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 25 * 1024 * 1024;
    const allowed = ["image/jpeg", "image/png"];

    if (!allowed.includes(file.type)) {
      setPhotoError("Only JPG or PNG images are allowed.");
      setPhotoFile(null);
      return;
    }

    if (file.size > maxSize) {
      setPhotoError("File must be 25 MB or less.");
      setPhotoFile(null);
      return;
    }

    setPhotoError("");
    setPhotoFile(file);
  };

const [showPhotoGuidelines, setShowPhotoGuidelines] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      setPhotoError("Please upload a valid image file.");
      return;
    }

    
    if (
      !form.originalityConfirmed ||
      !form.permissionToPost ||
      !form.collabAcceptance ||
      !form.peoplePermission ||
      !form.contestRulesAccepted
    ) {
      setCheckboxError("You must agree to all confirmations before submitting.");
      return;
    }

    setCheckboxError("");

    setLoading(true);

    try {
      // 1. Get upload URL
      const uploadRes = await fetch(GET_UPLOAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: photoFile.name,
          fileType: photoFile.type,
          fileSize: photoFile.size,
        }),
      });

      const { uploadUrl, fileKey } = await uploadRes.json();

      if (!uploadUrl) {
        alert("Error generating upload URL.");
        setLoading(false);
        return;
      }

      // 2. Upload to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": photoFile.type },
        body: photoFile,
      });

      // 3. Build secure view link
      const viewPhoto = `${VIEW_IMAGE_API}?key=${encodeURIComponent(fileKey)}`;

      // 4. Submit to Sheets
      const submitRes = await fetch(SHEETS_WRITER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formType: "photocontest",
          viewPhoto,
        }),
      });

      const submitData = await submitRes.json();

      if (submitData.status !== "success") {
        alert("There was an error submitting your entry.");
        setLoading(false);
        return;
      }

      // 5. Success UI
      setSuccess(true);

      // 6. Reset form
      setForm({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        instagramHandle: "",
        followsGlobalFest: "",
        photoCategory: "",
        photoTitle: "",
        photoCaption: "",
        cultureRepresented: "",
        originalityConfirmed: false,
        permissionToPost: false,
        collabAcceptance: false,
        peoplePermission: false,
        contestRulesAccepted: false,
        extraNotes: "",
      });

      setPhotoFile(null);
      setPhotoError("");

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };


  return (
    <div className="photo-page">
      <h1>One World One Frame </h1>
      <h1>Photography Contest Submission</h1>
      <p
        className="photo-guideline-link"
        onClick={() => setShowPhotoGuidelines(true)}
        >
        View Photography Contest Guidelines
    </p>


      <p className="photo-intro">
        Capture the beauty of your culture fashion, dance, art, traditions
        and stand a chance to win a Gold Coin and be featured across our platforms.
      </p>

      {success && (
        <div className="photo-success-box">
          Your photo has been submitted successfully!   
          We will contact you if your entry is selected.
        </div>
      )}

      {!success && (
        <div className="photo-shadow-box">
          <form className="photo-form" onSubmit={handleSubmit}>

            {/* SECTION 1 — ABOUT YOU */}
            <h2>About You</h2>

            <label>
              Full Name *
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Email Address *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone Number (Optional)
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Current City of Residence *
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </label>

            {/* SECTION 2 — SUBMISSION */}
            <h2>Your Submission</h2>

            <label>
              Instagram Handle *
              <input
                type="text"
                name="instagramHandle"
                value={form.instagramHandle}
                onChange={handleChange}
              />
            </label>

            <label>
              Do you follow @globalfestcanada on Instagram? *
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="followsGlobalFest"
                    value="yes"
                    checked={form.followsGlobalFest === "yes"}
                    onChange={handleChange}
                  />
                  Yes, I follow the page
                </label>

                <label>
                  <input
                    type="radio"
                    name="followsGlobalFest"
                    value="no"
                    checked={form.followsGlobalFest === "no"}
                    onChange={handleChange}
                  />
                  Not yet — I'll follow now
                </label>
              </div>
            </label>

            <label>
              Upload Your Photo *
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {photoError && <span className="error">{photoError}</span>}
            </label>

            <label>
              Photo Category *
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="photoCategory"
                    value="Fashion"
                    checked={form.photoCategory === "Fashion"}
                    onChange={handleChange}
                  />
                  Fashion
                </label>

                <label>
                  <input
                    type="radio"
                    name="photoCategory"
                    value="Dance"
                    checked={form.photoCategory === "Dance"}
                    onChange={handleChange}
                  />
                  Dance
                </label>

                <label>
                  <input
                    type="radio"
                    name="photoCategory"
                    value="Art & Traditions"
                    checked={form.photoCategory === "Art & Traditions"}
                    onChange={handleChange}
                  />
                  Art & Traditions
                </label>

                <label>
                  <input
                    type="radio"
                    name="photoCategory"
                    value="Others"
                    checked={form.photoCategory === "Others"}
                    onChange={handleChange}
                  />
                  Others
                </label>
              </div>
            </label>

            <label>
              Photo Title (Optional)
              <input
                type="text"
                name="photoTitle"
                value={form.photoTitle}
                onChange={handleChange}
              />
            </label>

            <label>
              Photo Caption / Story *
              <textarea
                name="photoCaption"
                value={form.photoCaption}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </label>

            <label>
              Which culture or community does this photo represent? *
              <input
                type="text"
                name="cultureRepresented"
                value={form.cultureRepresented}
                onChange={handleChange}
              />
            </label>

            {/* SECTION 3 — CONFIRMATIONS */}
            <h2>Confirmations</h2>

            {checkboxError && <p className="error">{checkboxError}</p>}

            <label className="checkbox-group">
              <input
                type="checkbox"
                name="originalityConfirmed"
                checked={form.originalityConfirmed}
                onChange={handleChange}
              />
              I confirm this photo was taken by me and is not AI-generated.
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                name="permissionToPost"
                checked={form.permissionToPost}
                onChange={handleChange}
              />
              I grant GlobalFest permission to post this photo.
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                name="collabAcceptance"
                checked={form.collabAcceptance}
                onChange={handleChange}
              />
              I understand I must accept the Instagram Collab invite if selected.
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                name="peoplePermission"
                checked={form.peoplePermission}
                onChange={handleChange}
              />
              If my photo includes other people, I have their permission to share it publicly.
            </label>

            <label className="checkbox-group">
              <input
                type="checkbox"
                name="contestRulesAccepted"
                checked={form.contestRulesAccepted}
                onChange={handleChange}
              />
              I have read and agree to the contest rules, including that the photo with the most likes during June 1–19 wins the Gold Coin
            </label>

            <label>
              Anything else you'd like us to know?
              <textarea
                name="extraNotes"
                value={form.extraNotes}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </label>

            <button type="submit" className="photo-submit-btn" disabled={loading}>
              {loading && <div className="spinner"></div>}
              {loading ? "Submitting..." : "Submit Your Entry"}
            </button>
          </form>
        </div>
      )}


      {showPhotoGuidelines && (
  <div
    className="photo-guideline-overlay"
    onClick={() => setShowPhotoGuidelines(false)}
  >
    <div
      className="photo-guideline-box"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="photo-guideline-title">Photography Contest Guidelines</h2>

      <div className="photo-guideline-content">

        <h3>Eligibility</h3>
        <ul>
          <li>All age groups are welcome.</li>
          <li>Individual participation only.</li>
          <li>Participants must follow @globalfestcanada on Instagram.</li>
        </ul>

        <h3>Submission Requirements</h3>
        <ul>
          <li>All photographs must be original work captured by the participant. Basic editing and color correction are allowed.</li>
          <li>AI-generated images are strictly prohibited.</li>
          <li>Photos containing offensive, violent, discriminatory, or inappropriate content will be disqualified.</li>
          <li>Watermarks, logos, or signatures should not appear on submitted images.</li>
        </ul>

        <h3>File Specifications</h3>
        <ul>
          <li>Accepted formats: JPG or PNG with maximum file size of 25 MB.</li>
          <li>High-resolution images are recommended.</li>
          <li>Both color and black & white photography are accepted.</li>
        </ul>

        <h3>Important Dates</h3>
        <ul>
          <li>Submission Deadline: May 25.</li>
          <li>Instagram Posting Period: June 1 – June 15.</li>
        </ul>

        <h3>Judging Criteria</h3>
        <p>Entries will be evaluated based on:</p>
        <ul>
          <li>Creativity & Originality</li>
          <li>Storytelling Ability</li>
          <li>Emotional Impact</li>
          <li>Composition & Lighting</li>
          <li>Relevance to the Theme</li>
        </ul>

        <h3>Featured Entries</h3>
        <p>
          Selected entries will be featured on Instagram as collaboration posts with @globalfestcanada, giving participants an opportunity to showcase their work to a wider audience and gain recognition through the festival’s official social media platforms. Featured photographers may also receive additional promotional exposure during the event campaign.
        </p>

        <h3>Rights & Usage</h3>
        <p>
          By submitting photographs, participants grant Global Fest Canada permission to use submitted images for promotional, exhibition, and social media purposes with proper credit to the creator. Participants will retain ownership of their work.
        </p>

      </div>

      <button
        className="photo-bottom-close-btn"
        onClick={() => setShowPhotoGuidelines(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default PhotographyContestForm;
