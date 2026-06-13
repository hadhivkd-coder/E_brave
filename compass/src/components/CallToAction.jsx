import React, { useEffect, useRef } from 'react';
import './CallToAction.css';

const CallToAction = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-bg-elements">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M 0 300 C 300 0, 700 0, 1000 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="10 15" />
          <path d="M 0 150 C 300 -50, 700 -50, 1000 150" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Discover Your Direction?</h2>
          <p>Join E-Brave Compass and take the first step toward a confident future.</p>
          <div className="cta-buttons">
            <a href="#apply" className="btn btn-primary cta-btn">Apply Now</a>
            <a href="#contact" className="btn btn-outline cta-btn outline-light">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
