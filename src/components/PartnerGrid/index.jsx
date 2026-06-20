import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; 

const PartnerGrid = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "vendors", 
      title: "VENDORS",
      image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendor.jpeg",
      desc: "Take a culinary journey around the globe. From savory authentic dishes to sweet street-food delicacies, explore our diverse lineup of international food stalls bringing flavors from every corner of the world straight to Global Fest."
    },
    {
      id: "sponsors", 
      title: "PARTNERS",
      image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Partne.png",
      desc: "Empowering our vision. We are immensely grateful to our corporate sponsors and industry leaders whose generous support and shared vision power our venue activations, digital infrastructure, and festival experiences."
    },
    {
      id: "community", 
      title: "COMMUNITY PARTNERS",
      image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Community.png",
      desc: "Stronger together. Celebrate the incredible local alliances, cultural institutions, and grassroots non-profits dedicating their passion and resources to build a connected, diverse, and vibrant festival community."
    }
  ];

  return (
    <div className="partners-section-wrapper">
      {/* Centered Section Title matching get-involved-teaser h2 style */}
      <h2 className="partners-main-title">Our Partners</h2>
      
      <div className="partners-row-container">
        {sections.map((item) => (
          <div 
            key={item.id} 
            className="partner-column-item"
            onClick={() => navigate(`/partners/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Heading stays on top, styled like promo-column h3 */}
            <h3 className="partner-heading-text">{item.title}</h3>
            
            {/* Circle Frame styled with promo-column img rules */}
            <div className="partner-circle-frame">
              <img src={item.image} alt={item.title} />
            </div>
            
            {/* Paragraph styled like promo-column p */}
            <p className="partner-body-paragraph">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerGrid;