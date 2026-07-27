import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

const LOGO_DATASTORE = {
  vendors: {
    title: "OUR VENDOR PARTNERS",
    description: "Trusted production teams, decorators, and exceptional culinary providers bringing flavor to the festival.",
    logos: [
      { name: "Coconut Vendor", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor1.jpeg" },
      { name: "Han Bingo", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor10.png" },
      { name: "Little South Bistro & Grill", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor11.png" },
      { name: "Sunny Icecream Truck", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor2.jpeg" },
      { name: "Sharma Foods - Postato twister", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor3.jpeg" },
      { name: "Punjabi Lassi", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor4.jpeg" },
      { name: "Koi Japan", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor5.jpeg" },
      { name: "Dosa Kitchen", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor6.jpeg" },
      { name: "JZ Cuisine", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor7.jpeg" },
      { name: "West Cuisine-Tongs n Grill", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor8.jpeg" },
      { name: "Picante Mexican Food", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor9.jpeg" },
      { name: "The Dopamine Lounge", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendor12.jpg" },
      { name: "Shen Yun", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendor13.png" },
      { name: "Albanian - Barista and chef cafe", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor14.png" },
      { name: "Alforat Iraqi Street Food", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor15.jpeg" }
      
    ]
  },
  sponsors: {
    title: "EVENT SPONSORS & PARTNERS",
    description: "Corporate leaders helping power our venue experiences, activations, and digital infrastructure.",
    logos: [
      { name: "LEMFI", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partners/Partner1.png" },
      { name: "COSTCO Wholesale", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partners/Partner2.png" },
      { name: "Sankofa Square", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partners/Partner4.jpg" },
      { name: "St. Joseph Dental Clinic", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partners/Partner3.png" },
      { name: "Affinity Mortgage Solutions", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partners/Partner5.jpeg" }
    ]
  },
  community: {
    title: "COMMUNITY PARTNERS",
    description: "Local civic alliances, cultural institutions, and grassroots organizations making it all possible.",
    logos: [
      { name: "Philippine Canadian Charitable Foundation", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/community/Community1.jpeg" },
      { name: "Ontario chinese cultural network", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/community/Community2.jpeg" },
      { name: "Mexican Day Toronto", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/community/Community4.png" },
      { name: "Neema Child Project", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/community/Community5.jpeg" }

    ]
  }
};

const PartnerLogosPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const currentCategory = LOGO_DATASTORE[categoryId];

  if (!currentCategory) {
    return (
      <div className="logos-error-wrapper">
        <p>Category not recognized.</p>
        <button onClick={() => navigate("/")} className="back-navigation-btn">
          ← Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="logos-page-wrapper">
      <div className="logos-page-container">
        
        {/* Sleek Minimalist Back Button */}
        <button onClick={() => navigate(-1)} className="back-navigation-btn">
          <span className="back-arrow">←</span> BACK TO PARTNERS
        </button>

        {/* Clean Header with Accent Divider */}
        <div className="logos-page-header">
          <h1>{currentCategory.title}</h1>
          <div className="header-accent-bar"></div>
          <p>{currentCategory.description}</p>
        </div>

        {/* High-End Card Grid */}
        <div className="logo-display-grid">
          {currentCategory.logos.map((logo, index) => (
            <div key={index} className="logo-card-slot">
              <div className="logo-img-container">
                <img src={logo.url} alt={logo.name} />
              </div>
              {/* Overlay Label that glides up cleanly on hover */}
              <div className="logo-card-overlay">
                <span>{logo.name}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PartnerLogosPage;