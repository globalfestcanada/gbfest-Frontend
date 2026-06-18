// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./index.css";

// const LOGO_DATASTORE = {
//   vendors: {
//     title: "Our Vendor Partners",
//     description: "Trusted production teams, decorators, and culinary providers.",
//     logos: [
//       { name: "Coconut Vendor", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor1.jpeg" },
//       { name: "Sunny Icecream Truck", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor2.jpeg" },
//       { name: "Sharma Foods - Postato twister", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor3.jpeg" },
//       { name: "Punjabi Lassi", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor4.jpeg" },
//       { name: "Koi Japan", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor5.jpeg" },
//       { name: "Dosa Kitchen", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor6.jpeg" },
//       { name: "JZ Cuisine", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor7.jpeg" },
//       { name: "West Cuisine-Tongs n Grill", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor8.jpeg" },
//       { name: "Picante Mexican Food", url: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Vendors/Vendor9.jpeg" },
//     ]
//   },
//   sponsors: {
//     title: "Event Sponsors & Partners",
//     description: "Corporate sponsors helping power our venue experiences and festival activations.",
//     logos: [
//       { name: "Sponsor Corporate", url: "https://placehold.co/200x100?text=Sponsor+1" },
//       { name: "Sponsor Global", url: "https://placehold.co/200x100?text=Sponsor+2" }
//     ]
//   },
//   community: {
//     title: "Community Partners",
//     description: "Local civic alliances, cultural institutions, and global organizations.",
//     logos: [
//       { name: "Community Alliance", url: "https://placehold.co/200x100?text=Community+Logo" }
//     ]
//   }
// };

// const PartnerLogosPage = () => {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();

//   const currentCategory = LOGO_DATASTORE[categoryId];

//   if (!currentCategory) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-red-500 font-semibold">Category not recognized.</p>
//         <button onClick={() => navigate("/")} className="mt-4 text-blue-500 underline">Return Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 py-16 px-4 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
//         >
//           ← Back
//         </button>

//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">{currentCategory.title}</h1>
//           <p className="text-slate-600 max-w-xl mx-auto text-sm">{currentCategory.description}</p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {currentCategory.logos.map((logo, index) => (
//             <div 
//               key={index} 
//               className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center h-32 hover:shadow-md transition-shadow"
//             >
//               <img 
//                 src={logo.url} 
//                 alt={logo.name} 
//                 className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartnerLogosPage;


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
//   community: {
//     title: "COMMUNITY PARTNERS",
//     description: "Local civic alliances, cultural institutions, and grassroots organizations making it all possible.",
//     logos: [
//       { name: "Community Alliance", url: "https://placehold.co/200x100?text=Community+Logo" }
//     ]
//   }
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