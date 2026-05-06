// import React, { useState } from "react";
// import "./MenuTab.css";

// function MenuTab() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="menu-tab">
//       <div className="menu-logo">
//         <img src="/logo.png" alt="Logo" />
//         <span>GlobalFest</span>
//       </div>

//       {/* Hamburger toggle */}
//       <div
//         className={`hamburger ${menuOpen ? "open" : ""}`}
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       {/* Navigation links */}
//       <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About Us</a></li>
//         <li><a href="#program">Program</a></li>
//         <li><a href="#getinvolved">Get Involved</a></li>
//         <li><a href="#contact">Contact Us</a></li>
//       </ul>
//     </nav>
//   );
// }

// export default MenuTab;



import React, { useState } from "react";
import { Link } from "react-router-dom";   // ✅ import Link
import "./MenuTab.css";

function MenuTab() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="menu-tab">
      <div className="menu-logo">
        <img src="/logo.png" alt="Logo" />
        <span>GLOBAL FEST CANADA 2026</span>
      </div>

      {/* Hamburger toggle */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation links */}
      {/* <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li> */}
        {/* <li><Link to="/program">Program</Link></li> */}
        {/* <li><Link to="/getinvolved">Get Involved</Link></li>
        <li><Link to="/contactUs">Contact Us</Link></li>
      </ul> */}
      <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
  <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
  <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
  <li><Link to="/getinvolved" onClick={() => setMenuOpen(false)}>Get Involved</Link></li>
  <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
  <li><Link to="/PageantApplicationForm" onClick={() => setMenuOpen(false)}>PageantApplicationForm</Link></li>
</ul>

    </nav>
  );
}

export default MenuTab;
