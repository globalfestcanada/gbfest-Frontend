import React, { useState } from "react";
import "./index.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who is Global Fest Canada for?",
      answer:
        "Global Fest Canada is for everyone — community members, families, artists, youth, and visitors who want to experience and celebrate diverse cultures."
    },
    {
      question: "What types of performances can audiences expect?",
      answer:
        "Audiences can expect a variety of live performances including music, dance, and cultural showcases representing traditions from around the world."
    },
    {
      question: "Can emerging or youth artists participate?",
      answer:
        "Yes.Global Fest Canada encourages participation from emerging and youth artists, providing a platform for new voices and creative expression."
    },
    {
      question: "What types of vendors are welcome?",
      answer:
        "We welcome food vendors, artisans, cultural exhibitors, and community organizations that align with the festival’s values of diversity and inclusion."
    },
    {
  question: "Is entry to Global Fest 2026 free?",
  answer:
    "Yes! Global Fest 2026 is completely free for all attendees. Our goal is to create an inclusive celebration where everyone can enjoy the performances, food, and cultural experiences without any barriers."
},
{
  question: "What happens if it rains during the event?",
  answer:
    "The festival continues rain or shine. We have weather‑ready plans in place, including covered areas, tents, and adjusted schedules if needed. Performances and activities may shift slightly, but the celebration will still go on."
},
{
  question: "How can I stay informed about announcements and deadlines?",
  answer:
    "Follow Global Fest Canada on social media to stay up to date with the latest news and announcements."
}
  ];

  return (
    <section className="faq-section">
      <h2>FREQUENTLY ASKED QUESTIONS</h2>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {item.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
