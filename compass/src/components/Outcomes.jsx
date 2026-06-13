import React, { useState, useEffect, useRef } from 'react';
import './Outcomes.css';

const Outcomes = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

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

    const cards = sectionRef.current.querySelectorAll('.outcome-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const outcomesData = [
    {
      category: "FOR STUDENTS",
      tabName: "Students",
      image: `${import.meta.env.BASE_URL}outcome_student.png`,
      isPrimary: true,
      points: [
        "Career Clarity",
        "Increased Confidence",
        "Personalized Direction",
        "Future Readiness",
        "Better Decision-Making"
      ]
    },
    {
      category: "FOR PARENTS",
      tabName: "Parents",
      image: `${import.meta.env.BASE_URL}outcome_parent.png`,
      isPrimary: false,
      points: [
        "Better Understanding of Their Child",
        "Expert Guidance",
        "Informed Academic Decisions",
        "Greater Confidence in Career Planning"
      ]
    },
    {
      category: "FOR SCHOOLS",
      tabName: "Schools",
      image: `${import.meta.env.BASE_URL}outcome_school.png`,
      isPrimary: false,
      points: [
        "Enhanced Student Development",
        "Career Awareness",
        "Stronger Parent Engagement",
        "Future-Ready Students"
      ]
    }
  ];

  return (
    <section className="program-outcomes section" id="outcomes" ref={sectionRef}>
      {/* Subtle Background Elements */}
      <div className="outcomes-bg-elements">
        <svg className="outcomes-compass-bg" viewBox="0 0 200 200" preserveAspectRatio="none">
          <path d="M 0 100 Q 50 150 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="container">
        <div className="outcomes-header">
          <h2>Program Outcomes</h2>
          <p className="outcomes-subtitle">Meaningful outcomes for students, parents, and educational institutions.</p>
        </div>

        {/* Mobile Tabs */}
        <div className="outcomes-mobile-tabs">
          {outcomesData.map((outcome, index) => (
            <button
              key={index}
              className={`outcome-tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {outcome.tabName}
            </button>
          ))}
        </div>

        <div className="outcomes-grid">
          {outcomesData.map((outcome, index) => (
            <div 
              key={index} 
              className={`outcome-card ${outcome.isPrimary ? 'outcome-card-primary' : 'outcome-card-standard'} ${activeTab === index ? 'active-mobile-card' : 'hidden-mobile-card'}`} 
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="outcome-image-wrapper">
                <img src={outcome.image} alt={outcome.category} className="outcome-image" />
                <div className="outcome-category-badge">{outcome.category}</div>
              </div>
              
              <div className="outcome-content">
                <ul className="outcome-list">
                  {outcome.points.map((point, idx) => (
                    <li key={idx} className="outcome-list-item">
                      <div className="outcome-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
