// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// const VotePage = () => {
//   const params = new URLSearchParams(window.location.search);
//   const selectedContestant = params.get("contestant") || "";

//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const submitVote = async () => {
//     if (!email) {
//       setMessage("Please enter a valid email.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/api/vote", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           contestant: selectedContestant
//         })
//       });

//       const data = await res.json();
//       setMessage(data.message);
     

// // Redirect after 2 seconds
// setTimeout(() => {
//   navigate("/Pageant Contestants");
// }, 2000);


//     } catch (err) {
//       setMessage("Unable to submit vote right now.");
//     }
//   };

//   return (
//     <div className="vote-page">
//       <h1>Cast Your Vote</h1>

//       <p className="contestant-label">
//         Voting for: <strong>{selectedContestant}</strong>
//       </p>

//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <button onClick={submitVote}>Submit Vote</button>

//       {message && <p className="vote-message">{message}</p>}
//     </div>
//   );
// };

// export default VotePage;

import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import "./index.css";

const VotePage = () => {
  const params = new URLSearchParams(window.location.search);
  const selectedContestant = params.get("contestant") || "";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Automatically scrolls to the top of the window when the voting component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitVote = async () => {
    setMessage("");
    setIsSuccess(false);

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("https://globalfest-backend.onrender.com/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          contestant: selectedContestant
        })
      });

      const data = await res.json();

      if (data.message === "Your vote has been recorded!") {
        setIsSuccess(true);
        setMessage(data.message);

        setTimeout(() => {
          navigate("/Pageant Contestants"); 
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }

    } catch (err) {
      setIsSuccess(false);
      setMessage("Unable to submit vote right now.");
    }
  };

  return (
    <div className="vote-page">
      <h1>Cast Your Vote</h1>

      <p className="contestant-label">
        Voting for: <strong>{selectedContestant}</strong>
      </p>

      <div className="vote-form-group">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSuccess}
        />
        
        <p className="vote-fine-print">
          * Strictly limit of one vote per email across the entire pageant selection. Duplicate entries or disposable email addresses will be automatically disqualified by our system.
        </p>
      </div>

      <button onClick={submitVote} disabled={isSuccess} className="vote-submit-btn">
        {isSuccess ? "Submitting..." : "Submit Vote"}
      </button>

      {message && (
        <p className={`vote-message ${isSuccess ? "success-msg" : "error-msg"}`}>
          {message}
        </p>
      )}

      <div className="change-mind-container">
        <span onClick={() => navigate("/Pageant Contestants")} className="secondary-back-link">
          Want to vote for a different person? Go back to Lineup
        </span>
      </div>
    </div>
  );
};

export default VotePage;