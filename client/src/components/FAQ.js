import React, { useState } from "react";
import "../styles/FAQ.css"; // Assuming you will create a CSS file for styling

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    "Why EJY Health?",
    "Benefits of joining the waitlist?",
    "How do I connect?",
    "Is it a paid platform?",
    "How to download the app?",
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="loadbtn">
        <button className="xxx"> Load More Gyan</button>
      </div>
      <div className="faq-container">
        <h1>FAQs</h1>
        <h2>Got queries? We're armed with answers!</h2>
        <div className="faq-list">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleToggle(index)}
            >
              <div className="faq-question">{question}</div>
              {activeIndex === index && (
                <div className="faq-answer">
                  This is the answer to the question.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
