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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const VotePage = () => {
  const params = new URLSearchParams(window.location.search);
  const selectedContestant = params.get("contestant") || "";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitVote = async () => {
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
          email,
          contestant: selectedContestant
        })
      });

      const data = await res.json();
      setMessage(data.message);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("//Pageant Contestants"); 
      }, 2000);

    } catch (err) {
      setMessage("Unable to submit vote right now.");
    }
  };

  return (
    <div className="vote-page">
      <h1>Cast Your Vote</h1>

      <p className="contestant-label">
        Voting for: <strong>{selectedContestant}</strong>
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={submitVote}>Submit Vote</button>

      {message && <p className="vote-message">{message}</p>}
    </div>
  );
};

export default VotePage;
