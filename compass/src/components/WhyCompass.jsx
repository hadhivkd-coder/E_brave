import React, { useEffect, useRef } from 'react';
import './WhyCompass.css';

const WhyCompass = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current.querySelectorAll('.why-journey-step');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const journeySteps = [
    {
      id: "01",
      title: "Discover Yourself",
      description: "Understand strengths, interests, aptitude, personality, and potential.",
      styleClass: "step-primary-green",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      )
    },
    {
      id: "02",
      title: "Explore Opportunities",
      description: "Explore career pathways, educational options, and future possibilities.",
      styleClass: "step-white",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: "03",
      title: "Plan Your Future",
      description: "Create a personalized roadmap through expert guidance and informed decision-making.",
      styleClass: "step-light-green",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      id: "04",
      title: "Build Future Readiness",
      description: "Develop confidence, communication skills, adaptability, and future-ready capabilities.",
      styleClass: "step-primary-green",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 22l10-5 10 5L12 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="why-compass section" id="why-compass" ref={sectionRef}>
      {/* Premium Watermark Background Elements */}
      <div className="why-bg-elements">
        <svg className="bg-compass-circles" viewBox="0 0 200 200" preserveAspectRatio="none">
          <circle cx="200" cy="100" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="200" cy="100" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
        <svg className="bg-direction-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 0 0 L 100 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="container">
        <div className="why-header">
          <h2>Why E-Brave Compass?</h2>
          <div className="why-intro">
            <p>Students today are expected to make important academic and career decisions before they fully understand themselves or the opportunities available to them.</p>
            <p>E-Brave Compass helps students gain clarity, confidence, and direction through a structured journey of self-discovery, exploration, planning, and future readiness.</p>
          </div>
        </div>

        <div className="why-journey-flow">
          {/* Connecting Path Line */}
          <div className="journey-connector-line"></div>

          <div className="why-journey-grid">
            {journeySteps.map((step, index) => (
              <div 
                key={index} 
                className={`why-journey-step ${step.styleClass}`} 
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="step-connector-dot"></div>
                <div className="step-header">
                  <span className="step-number">{step.id}</span>
                  <div className="step-icon-wrapper">
                    {step.icon}
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCompass;
