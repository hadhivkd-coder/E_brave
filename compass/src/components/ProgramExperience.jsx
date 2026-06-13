import React, { useEffect, useRef } from 'react';
import './ProgramExperience.css';

const ProgramExperience = () => {
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

    const cards = sectionRef.current.querySelectorAll('.pe-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const experiences = [
    {
      step: "STEP 01",
      title: "Career Assessment",
      description: "Understand strengths, interests, aptitude, personality, and potential through structured assessment.",
      bgImage: `${import.meta.env.BASE_URL}pe_assessment_wide.png`
    },
    {
      step: "STEP 02",
      title: "One-to-One Counseling",
      description: "Personalized guidance sessions focused on clarity, confidence, and informed decision-making.",
      bgImage: `${import.meta.env.BASE_URL}pe_counseling_wide.png`
    },
    {
      step: "STEP 03",
      title: "Parent Guidance Session",
      description: "Helping parents better understand and support their child's academic and career journey.",
      bgImage: `${import.meta.env.BASE_URL}pe_parent_session_wide.png`
    },
    {
      step: "STEP 04",
      title: "Career Planning Workshop",
      description: "Transform insights into action through planning, goal setting, and future-readiness development.",
      bgImage: `${import.meta.env.BASE_URL}pe_workshop_wide.png`
    }
  ];

  return (
    <section className="program-experience section" id="experience" ref={sectionRef}>
      {/* Subtle Background Elements */}
      <div className="pe-bg-elements">
        <svg className="pe-compass-bg" viewBox="0 0 200 200" preserveAspectRatio="none">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="container">
        <div className="pe-header">
          <h2>Program Experience</h2>
          <p className="pe-subtitle">A structured experience designed to help students gain clarity, confidence, and direction.</p>
        </div>

        <div className="pe-grid">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="pe-card" 
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="pe-card-bg">
                <img src={exp.bgImage} alt={exp.title} />
                <div className="pe-card-overlay"></div>
              </div>
              
              <div className="pe-card-content">
                <div className="pe-card-top">
                  <span className="pe-step-label">{exp.step}</span>
                </div>
                
                <div className="pe-card-bottom">
                  <h3 className="pe-title">{exp.title}</h3>
                  <p className="pe-description">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramExperience;
