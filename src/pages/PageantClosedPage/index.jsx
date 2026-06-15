import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const PageantClosedPage = () => {
  const navigate = useNavigate();

  // 🚀 Automatically snap to the top of the screen when this page renders
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateToContestants = () => {
    window.scrollTo(0, 0); // Force a top snap right before moving pages as well
    
    // Note: If your App router uses lowercase/hyphens, change this to "/pageant-contestants"
    navigate("/Pageant Contestants"); 
  };

  return (
    <div className="closed-page-wrapper">
      <div className="closed-page-card">
        {/* Status Badge */}
        <div className="status-badge">Status: Concluded</div>
        
        {/* Main Content */}
        <h1 className="closed-page-title">Pageant Applications are Closed</h1>
        <p className="closed-page-subtitle">Mr. & Miss Global Fest 2026</p>
        
        <div className="divider" />
        
        <p className="closed-page-text">
          The official submission window for the 2026 pageant has completed. We are no longer accepting new submissions or registry updates at this time.
        </p>
        
        <p className="closed-page-thankyou">
          A heartfelt thank you to all of our incredible applicants who stepped forward to represent their beautiful heritage!
        </p>

        {/* Action Button to View Active Profiles */}
        <button 
          className="view-contestants-btn"
          onClick={handleNavigateToContestants}
        >
          Meet the Final Contestants
        </button>

        {/* Footer info */}
        <footer className="closed-page-footer">
          <p>© 2026 Global Fest Canada. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PageantClosedPage;