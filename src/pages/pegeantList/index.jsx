import React, { useState, useEffect } from "react";
import PageantFinalCard from "../../components/PageantFinal";
import "./index.css";

const PageantListPage = () => {
  const [contestants, setContestants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCardId, setFlippedCardId] = useState(null);

  // Fetch live contestants lineup from your custom backend connection
  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const response = await fetch("https://globalfest-backend.onrender.com/api/contestants/getAllContestants");
        if (!response.ok) {
          throw new Error("Failed to pull live lineup dataset from database");
        }
        const data = await response.json();
        setContestants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContestants();
  }, []);

  // Split live lineup list criteria into groups
  const femaleContestants = contestants.filter((c) => c.gender === "female");
  const maleContestants = contestants.filter((c) => c.gender === "male");

  const handleFlip = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading contestants roster...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <p style={{ color: "#d32f2f" }}>Error loading profiles: {error}</p>
      </div>
    );
  }

  return (
    <div className="page-container contestants-page">
      <header className="main-header">
        <h1>Mr. & Miss Global Fest 2026</h1>
        <h2>Meet the Contestants</h2>
        <p className="page-subtitle">
          Each contestant represents their heritage with elegance, pride, and cultural identity. 
          Hover over each profile to discover their story.
        </p>
      </header>

      {/* FEMALE SECTION */}
      {femaleContestants.length > 0 && (
        <>
          <section className="section-header">
            <h2>Miss Global Fest Contestants</h2>
          </section>

          <section className="contestants-grid">
            {femaleContestants.map((person) => (
              <PageantFinalCard
                key={person._id}
                name={person.name}
                culture={person.culture}
                image={person.image}
                bio={person.bio}
                isFlipped={flippedCardId === person._id}
                onFlip={() => handleFlip(person._id)}
              />
            ))}
          </section>
        </>
      )}

      {/* MALE SECTION */}
      {maleContestants.length > 0 && (
        <>
          <section className="section-header">
            <h2>Mr. Global Fest Contestants</h2>
          </section>

          <section className="contestants-grid">
            {maleContestants.map((person) => (
              <PageantFinalCard
                key={person._id}
                name={person.name}
                culture={person.culture}
                image={person.image}
                bio={person.bio}
                isFlipped={flippedCardId === person._id}
                onFlip={() => handleFlip(person._id)}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default PageantListPage;
