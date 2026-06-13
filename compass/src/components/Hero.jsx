import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const words = ['Direction.', 'Purpose.', 'Confidence.', 'Clarity.', 'Future.'];
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[currentWord];
    let timeout;

    if (!isDeleting && displayText === fullWord) {
      // Word fully typed — wait then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      // Word fully deleted — move to next word
      setIsDeleting(false);
      setCurrentWord((prev) => (prev + 1) % words.length);
    } else if (!isDeleting) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(fullWord.slice(0, displayText.length + 1));
      }, 120);
    } else {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 60);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord]);

  return (
    <section className="hero section">
      <div className="container hero-container">
        
        {/* LEFT SIDE: Content */}
        <div className="hero-content fade-in">
          <div className="badge hover-card">
            <span className="badge-dot"></span> E-BRAVE COMPASS
          </div>
          <h1 className='headline'>
            Helping Students<br />
            Find Their<br />
            <span className='text-light-green typewriter-text'>{displayText}<span className='typewriter-cursor'>|</span></span>
          </h1>
          <h3 className="sub-headline">
            Know Yourself. Explore Opportunities. Build Your Future.
          </h3>
          <p className="hero-description">
            A structured program designed to help students gain clarity, confidence,
            and direction through self-discovery, career exploration, expert guidance, and future-readiness development.
          </p>
          
          <div className="hero-ctas">
            <a href="#apply" className="btn btn-primary">Apply for E-Brave Compass</a>
            <a href="#about" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        
        {/* RIGHT SIDE: Roadmap Card */}
        <div className="hero-visual fade-in" style={{animationDelay: '0.2s'}}>
          <div className="roadmap-card">
            {/* Header */}
            <div className="roadmap-header">
              <div className="roadmap-logo-text">
                <div className="roadmap-logo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="roadmap-brand">E-Brave</h4>
                  <p className="roadmap-subtitle">CAREER ROADMAP</p>
                </div>
              </div>
              <div className="roadmap-badge">COMPASS</div>
            </div>
            
            <div className="roadmap-divider"></div>

            {/* Timeline */}
            <div className="roadmap-timeline">
              
              <div className="rt-item fade-up" style={{animationDelay: '0.3s'}}>
                <div className="rt-marker">01</div>
                <div className="rt-content-box">
                  <h5>DISCOVER</h5>
                  <p>Understand strengths, interests, aptitude, personality, and potential.</p>
                </div>
              </div>

              <div className="rt-item fade-up" style={{animationDelay: '0.45s'}}>
                <div className="rt-marker">02</div>
                <div className="rt-content-box">
                  <h5>EXPLORE</h5>
                  <p>Explore opportunities, careers, educational pathways, and future possibilities.</p>
                </div>
              </div>

              <div className="rt-item fade-up" style={{animationDelay: '0.6s'}}>
                <div className="rt-marker">03</div>
                <div className="rt-content-box">
                  <h5>PLAN</h5>
                  <p>Create a personalized roadmap through expert guidance and counseling.</p>
                </div>
              </div>

              <div className="rt-item fade-up" style={{animationDelay: '0.75s'}}>
                <div className="rt-marker rt-marker-final">04</div>
                <div className="rt-content-box rt-content-box-final">
                  <h5 className="text-yellow">GROW</h5>
                  <p>Build confidence, communication skills, leadership, and future readiness.</p>
                </div>
              </div>

            </div>

            <div className="roadmap-divider"></div>

            {/* Footer */}
            <div className="roadmap-footer">
              <span className="live-dot"></span>
              <p>124 students started today</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
