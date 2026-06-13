import React, { useState } from "react";
import PageantFinalCard from "../../components/PageantFinal";
import { contestants } from "../../data/peageantData/contestantData";
import "./index.css";

const PageantListPage = () => {

  const [flippedCard, setFlippedCard] = useState(null);
  const femaleContestants = contestants.filter(c => c.gender === "female");
  const maleContestants = contestants.filter(c => c.gender === "male");

  return (
    <div className="contestants-page">

      <header className="main-header">
        <h1>Mr. & Miss Global Fest 2026</h1>
        <h2>Meet the Contestants</h2>
        <p>
          Each contestant represents their heritage with elegance, pride, and cultural identity. 
          Hover over each profile to discover their story.
        </p>
      </header>

      {/* FEMALE SECTION */}
      <section className="section-header">
        <h2>Miss Global Fest Contestants</h2>
      </section>

      <section className="contestants-grid">
        {femaleContestants.map((person, index) => (
          <PageantFinalCard
            key={index}
            name={person.name}
            culture={person.culture}
            image={person.image}
            bio={person.bio}
            isFlipped={flippedCard === index}
            onFlip={() => setFlippedCard(flippedCard === index ? null : index)}
          />

        ))}
      </section>

      {/* MALE SECTION */}
      <section className="section-header">
        <h2>Mr. Global Fest Contestants</h2>
      </section>

      <section className="contestants-grid">
        {maleContestants.map((person, index) => (
          <PageantFinalCard
            key={index}
            name={person.name}
            culture={person.culture}
            image={person.image}
            bio={person.bio}
          />
        ))}
      </section>

    </div>
  );
};

export default PageantListPage;
