import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const GROUPED_SCHEDULE = [
  {
    groupId: "A",
    groupTitle: "MORNING SHOWCASE",
    groupTime: "11:00 AM – 01:00 PM",
    alignment: "left",
    programs: [
      { segment: "Music", performance: "DJ Anomaly", slug: "dj-anomaly", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art4.jpeg" },
      { segment: "Dance", performance: "Raices de Chile / Monica", slug: "raices-de-chile", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art12.jpeg" },
      { segment: "Magic Show", performance: "Awesome Mike Magic", slug: "awesome-mike-magic", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art15.jpeg" },
      { segment: "Dance", performance: "Amethyst Dance Troupe", slug: "amethyst-dance-troupe", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art20.jpeg" },
      { segment: "Dance", performance: "Nupuradhwani", slug: "nupuradhwani", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art8.jpeg" }
    ]
  },
  {
    groupId: "B",
    groupTitle: "EARLY AFTERNOON RHYTHMS",
    groupTime: "01:00 PM – 04:30 PM",
    alignment: "right",
    programs: [
      { segment: "Dance", performance: "Nyai Randha (Indonesia)", slug: "nyai-randha", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art19.jpeg" },
      { segment: "Dance", performance: "Trivine Dance Group", slug: "trivine-dance-group", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art21.png" },
      { segment: "Band", performance: "Riverbend", slug: "riverbend", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art30.jpeg" },
      { segment: "Pageant", performance: "Mister & Miss Global Fest 2026 – First Round", slug: "", isPageant: true, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Pageant12.jpg" },
      { segment: "Dance", performance: "Tamrika", slug: "tamrika", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art1.jpeg" },
      { segment: "Band", performance: "The Jacks Of All Trades", slug: "the-jacks-of-all-trades", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art2.jpeg" }
    ]
  },
  {
    groupId: "C",
    groupTitle: "LATE AFTERNOON CELEBRATIONS",
    groupTime: "04:20 PM – 07:30 PM",
    alignment: "left",
    programs: [
      
      { segment: "Dance", performance: "Legacy Dance Co.", slug: "legacy-dance-co", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art13.jpeg" },
      { segment: "Music", performance: "Zlata Barchuk", slug: "zlata-barchuk", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art5.jpeg" },
      { segment: "Pageant", performance: "Mister & Miss Global Fest 2026 – Final Round", slug: "", isPageant: true, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Pageant12.jpg" },
      { segment: "Music", performance: "Gary L-Padrino", slug: "gary-l-padrino", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art11.jpeg" },
      { segment: "Music", performance: "RAXX / Erin Mcroll", slug: "raxx", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art16.jpeg" },
      { segment: "Dance", performance: "Sara Dance Academy", slug: "sara-dance-academy", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art9.jpeg" }
    ]
  },
  {
    groupId: "D",
    groupTitle: "GRAND FINALE EVENING SETS",
    groupTime: "07:20 PM – 10:00 PM",
    alignment: "right",
    programs: [
      { segment: "Music", performance: "Neema Choir", slug: "neema-choir", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art17.jpeg" },
      { segment: "Pageant", performance: "Crowning the Winner", slug: "", isPageant: true, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Pageant13.jpg" },
      { segment: "Music", performance: "Kozak Sisters", slug: "kozak-sisters", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art14.jpeg" },
      { segment: "Dance", performance: "Hashtaka Bellydance Studio", slug: "hashtaka-belly-dance-studio", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art10.jpeg" },
      { segment: "Music", performance: "Natasha Marie", slug: "natasha-marie", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art3.jpeg" },
      { segment: "Music", performance: "DJ Bayaan", slug: "bayaan", isPageant: false, image: "https://canada-globalfest-assets.s3.ca-central-1.amazonaws.com/Art7.jpeg" }
    ]
  }
];

const SchedulePage = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filters = ["ALL", "MUSIC", "DANCE", "BAND", "PAGEANT"];

  return (
    <div className="schedule-page-wrapper">
      <div className="schedule-container">
        
        <div className="schedule-header">
          <h1>FESTIVAL SCHEDULE</h1>
          <div className="schedule-accent-bar"></div>
          <p>Experience world-class performances, pageants, and live music across our main stages.</p>
        </div>

        {/* Filter Tabs */}
        <div className="schedule-filter-bar">
          {filters.map((category) => (
            <button
              key={category}
              className={`filter-tab-btn ${activeFilter === category ? "active-tab" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Schedule Grid Layout Stack */}
        <div className="schedule-blocks-container">
          {GROUPED_SCHEDULE.map((block) => {
            const filteredPrograms = activeFilter === "ALL" 
              ? block.programs 
              : block.programs.filter(p => p.segment.toUpperCase() === activeFilter);

            if (filteredPrograms.length === 0) return null;

            return (
              <div key={block.groupId} className="schedule-time-group-block">
                
                <div className="group-block-header">
                  <div className="group-title-side">
                    <span className="group-letter-badge">{block.groupId}</span>
                    <h2>{block.groupTitle}</h2>
                  </div>
                  <span className="group-time-span">{block.groupTime}</span>
                </div>

                <div className="schedule-cards-stack">
                  {filteredPrograms.map((item, index) => {
                    const cardContent = (
                      <>
                        <div className="showcase-img-frame">
                          <img src={item.image} alt={item.performance} />
                        </div>
                        <div className="showcase-info-panel">
                          <div className="info-top-row">
                            <span className={`segment-badge badge-${item.segment.toLowerCase().replace(/\s+/g, '')}`}>
                              {item.segment}
                            </span>
                          </div>
                          <h3 className="showcase-perf-title">{item.performance}</h3>
                        </div>
                      </>
                    );

                    // Determine URL Route based on logic flags
                    let targetUrl = "";
                    if (item.isPageant) {
                      targetUrl = "/Pageant Contestants";
                    } else if (item.slug) {
                      targetUrl = `/artist/${item.slug}`;
                    }

                    // Render as a link if it routes to a destination, otherwise static block
                    return targetUrl ? (
                      <Link 
                        to={targetUrl} 
                        key={index} 
                        className={`showcase-card clickable-showcase-card align-image-${block.alignment}`}
                      >
                        {cardContent}
                      </Link>
                    ) : (
                      <div 
                        key={index} 
                        className={`showcase-card align-image-${block.alignment}`}
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

        {/* Disclaimer Notice */}
        <div className="schedule-disclaimer-card">
          <p>💡 <strong>Please Note:</strong> Schedule and performances are tentative and subject to change without prior notice.</p>
        </div>

      </div>
    </div>
  );
};

export default SchedulePage;