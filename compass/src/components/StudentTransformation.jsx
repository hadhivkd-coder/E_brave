import React, { useEffect, useRef } from 'react';
import './StudentTransformation.css';

const StudentTransformation = () => {
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
      { threshold: 0.2 }
    );

    const stages = sectionRef.current.querySelectorAll('.transform-stage');
    stages.forEach((stage) => observer.observe(stage));
    
    const line = sectionRef.current.querySelector('.transform-line-fill');
    if (line) observer.observe(line);

    return () => {
      stages.forEach((stage) => observer.unobserve(stage));
      if (line) observer.unobserve(line);
    };
  }, []);

  const transformationStages = [
    {
      id: "confused",
      title: "CONFUSED",
      description: "Unsure about strengths, interests, and future direction.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      id: "aware",
      title: "AWARE",
      description: "Develops self-understanding through structured assessment and reflection.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18h6"></path>
          <path d="M10 22h4"></path>
          <path d="M12 2v1"></path>
          <path d="M12 7v1"></path>
          <path d="M4.5 9.5l.7.7"></path>
          <path d="M2 12h1"></path>
          <path d="M22 12h-1"></path>
          <path d="M18.8 9.5l-.7.7"></path>
          <path d="M12 11a5 5 0 0 0-5 5v2h10v-2a5 5 0 0 0-5-5z"></path>
        </svg>
      )
    },
    {
      id: "focused",
      title: "FOCUSED",
      description: "Identifies suitable pathways and creates a clear plan.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      )
    },
    {
      id: "future-ready",
      title: "FUTURE READY",
      description: "Moves forward with confidence, clarity, and direction.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      ),
      isFinal: true
    }
  ];

  return (
    <section className="student-transformation section" id="transformation" ref={sectionRef}>
      {/* Premium Watermark Background Elements */}
      <div className="transform-bg-elements">
        <svg className="bg-pathway" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d="M 0 100 C 250 150, 750 50, 1000 100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 10" />
        </svg>
        <svg className="bg-compass-curve" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container">
        <div className="transform-header">
          <h2>Student Transformation</h2>
          <p className="transform-subtitle">The journey students experience through E-Brave Compass.</p>
        </div>

        <div className="transform-journey-container">
          
          {/* Connecting Path Line Background */}
          <div className="transform-line-bg"></div>
          {/* Animated Connecting Path Line Foreground */}
          <div className="transform-line-fill"></div>

          <div className="transform-stages-grid">
            {transformationStages.map((stage, index) => (
              <div 
                key={index} 
                className={`transform-stage ${stage.isFinal ? 'stage-final' : ''}`}
                style={{ transitionDelay: `${0.3 + (index * 0.2)}s` }}
              >
                {/* Node Milestone */}
                <div className="stage-node-container">
                  <div className="stage-node">
                    {stage.icon}
                  </div>
                </div>

                {/* Stage Content Card */}
                <div className="stage-card">
                  <h3 className="stage-title">{stage.title}</h3>
                  <p className="stage-description">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentTransformation;
