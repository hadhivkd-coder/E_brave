import React, { useEffect, useRef } from 'react';
import './WhyTrustEBrave.css';

const WhyTrustEBrave = () => {
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

    const cards = sectionRef.current.querySelectorAll('.trust-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const trustFeatures = [
    {
      title: "Student-Centered",
      description: "Personalized guidance tailored to each student.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      title: "Practical Guidance",
      description: "Focused on real academic and career decisions.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      )
    },
    {
      title: "Future-Ready Learning",
      description: "Helping students prepare for a rapidly changing world.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      )
    },
    {
      title: "Trusted Support",
      description: "Guidance designed to build confidence and clarity.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="why-trust-section section" id="why-trust" ref={sectionRef}>
      {/* Subtle Educational Background Elements */}
      <div className="trust-bg-elements">
        <svg className="trust-watermark-1" viewBox="0 0 400 400" preserveAspectRatio="none">
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 10" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="trust-watermark-2" viewBox="0 0 200 200" preserveAspectRatio="none">
          <path d="M0 200 Q 100 100 200 200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>

      <div className="container">
        <div className="trust-header">
          <h2>Why Students Trust E-Brave</h2>
          <div className="trust-line"></div>
        </div>

        <div className="trust-grid">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="trust-card"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="trust-card-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustEBrave;
