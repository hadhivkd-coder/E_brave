import React from 'react';
import './CompassJourney.css';

const CompassJourney = () => {
  const phases = [
    {
      title: "DISCOVER",
      description: "Understand strengths, interests, aptitude, personality, and potential.",
      number: "01"
    },
    {
      title: "EXPLORE",
      description: "Explore career opportunities, educational pathways, and future possibilities.",
      number: "02"
    },
    {
      title: "PLAN",
      description: "Create a personalized roadmap through expert guidance and counseling.",
      number: "03"
    },
    {
      title: "GROW",
      description: "Build confidence, communication skills, leadership, and future readiness.",
      number: "04"
    }
  ];

  return (
    <section className="journey section">
      <div className="container">
        <div className="journey-header fade-in">
          <h2>The Compass Journey</h2>
          <p className="journey-subtext">A structured approach to finding your direction.</p>
        </div>

        <div className="journey-grid">
          {phases.map((phase, index) => (
            <div key={index} className="journey-card-tall hover-card fade-in" style={{animationDelay: `${0.1 * index}s`}}>
              <div className="card-overlay"></div>
              <div className="card-number-large">{phase.number}</div>
              <div className="journey-card-content">
                <h3 className="card-title">{phase.title}</h3>
                <p className="card-description">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompassJourney;
