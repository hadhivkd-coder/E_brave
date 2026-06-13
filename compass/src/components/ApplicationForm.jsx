import React, { useState, useEffect, useRef } from 'react';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const sectionRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

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

    const leftContent = sectionRef.current.querySelector('.form-left');
    const rightContent = sectionRef.current.querySelector('.form-right');
    
    if (leftContent) observer.observe(leftContent);
    if (rightContent) observer.observe(rightContent);

    return () => {
      if (leftContent) observer.unobserve(leftContent);
      if (rightContent) observer.unobserve(rightContent);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  const nextStep = (e, step) => {
    e.preventDefault();
    setActiveStep(step);
  };

  const timelineSteps = [
    { id: "01", text: "Submit Application" },
    { id: "02", text: "Initial Review" },
    { id: "03", text: "Guidance Call" },
    { id: "04", text: "Compass Journey Begins" }
  ];

  const trustIndicators = [
    "Personalized Guidance",
    "Expert Support",
    "Student-Centered Approach",
    "Future-Ready Learning"
  ];

  return (
    <section className="application-section section" id="apply" ref={sectionRef}>
      {/* Subtle Background Elements */}
      <div className="form-bg-elements">
        <svg className="form-compass-bg" viewBox="0 0 200 200" preserveAspectRatio="none">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="container">
        <div className="form-header">
          <h2>Apply for E-Brave Compass</h2>
          <p className="form-subtitle">Take the first step toward clarity, confidence, and a future-ready path.</p>
        </div>

        <div className="form-grid">
          
          {/* Left Side: Trust & Program Summary */}
          <div className="form-left">
            <div className="timeline-container">
              <h3>What Happens Next?</h3>
              <div className="timeline-steps">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="timeline-step">
                    <div className="step-number">{step.id}</div>
                    <div className="step-text">{step.text}</div>
                    {index < timelineSteps.length - 1 && (
                      <div className="step-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="trust-list-container">
              <ul className="trust-list">
                {trustIndicators.map((indicator, index) => (
                  <li key={index}>
                    <div className="trust-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Application Form */}
          <div className="form-right">
            {isSubmitted ? (
              <div className="success-state">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Application Submitted Successfully</h3>
                <p>Thank you for your interest in E-Brave Compass.<br/>Our team will contact you shortly.</p>
              </div>
            ) : (
              <form className="premium-form" onSubmit={handleSubmit}>
                
                {/* STEP 1: Basic Information */}
                <div className={`accordion-step ${activeStep === 1 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveStep(1)}>
                    <h4>Step 1: Basic Information</h4>
                    <span className="accordion-icon">{activeStep === 1 ? '−' : '+'}</span>
                  </div>
                  <div className="accordion-body">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input type="text" id="fullName" placeholder="Enter your full name" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" placeholder="+91 00000 00000" required />
                      </div>
                      <div className="form-group half">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="student@example.com" required />
                      </div>
                    </div>
                    <div className="mobile-next-btn-container">
                      <button className="mobile-next-btn" onClick={(e) => nextStep(e, 2)}>Continue to Step 2</button>
                    </div>
                  </div>
                </div>

                {/* STEP 2: Academic Information */}
                <div className={`accordion-step ${activeStep === 2 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveStep(2)}>
                    <h4>Step 2: Academic Information</h4>
                    <span className="accordion-icon">{activeStep === 2 ? '−' : '+'}</span>
                  </div>
                  <div className="accordion-body">
                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="role">I am a...</label>
                        <select id="role" required defaultValue="">
                          <option value="" disabled>Select role</option>
                          <option value="student">Student</option>
                          <option value="parent">Parent</option>
                          <option value="institution">Institution</option>
                        </select>
                      </div>
                      <div className="form-group half">
                        <label htmlFor="grade">Grade / Course</label>
                        <input type="text" id="grade" placeholder="e.g. 11th Grade, B.Tech" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="school">School / Institution <span className="optional">(Optional)</span></label>
                        <input type="text" id="school" placeholder="Enter institution name" />
                      </div>
                      <div className="form-group half">
                        <label htmlFor="city">City <span className="optional">(Optional)</span></label>
                        <input type="text" id="city" placeholder="Your city" />
                      </div>
                    </div>
                    <div className="mobile-next-btn-container">
                      <button className="mobile-next-btn" onClick={(e) => nextStep(e, 3)}>Continue to Submit</button>
                    </div>
                  </div>
                </div>

                {/* STEP 3: Submit */}
                <div className={`accordion-step ${activeStep === 3 ? 'active' : ''}`}>
                  <div className="accordion-header" onClick={() => setActiveStep(3)}>
                    <h4>Step 3: Submit</h4>
                    <span className="accordion-icon">{activeStep === 3 ? '−' : '+'}</span>
                  </div>
                  <div className="accordion-body">
                    <button type="submit" className="submit-btn">Begin My Compass Journey</button>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
