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

      
      <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
  <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
  <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
  <li><Link to="/getinvolved" onClick={() => setMenuOpen(false)}>Get Involved</Link></li>
  <li><Link to="/contactUs" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
  <li><Link to="/Pageant Contestants" onClick={() => setMenuOpen(false)}>Pageant Contestants</Link></li>
</ul>

    </nav>
  );
}

export default MenuTab;
