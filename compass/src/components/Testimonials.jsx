import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    role: 'School Principal, DPS Bangalore',
    quote:
      'E-Brave Compass transformed how our students approach their futures. Within one semester, we saw a 40% reduction in student anxiety around career decisions. This program is not just guidance — it is genuine transformation.',
    initials: 'PS',
    color: '#3AB562',
  },
  {
    name: 'Rahul Mehta',
    role: 'Founder, EduVentures India',
    quote:
      'As someone who has seen dozens of career guidance programs, E-Brave stands alone. The depth of their assessment methodology and the quality of their counselors is at a level that institutions can proudly present to parents.',
    initials: 'RM',
    color: '#2E6B3A',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Student, Grade 12',
    quote:
      'Before E-Brave, I had absolutely no idea what I wanted to do. After the Compass program, I have a clear roadmap, a confidence I never had before, and a genuine excitement about my future.',
    initials: 'AK',
    color: '#1a8a45',
  },
  {
    name: 'Suresh Nair',
    role: 'HR Director, TechCorp Solutions',
    quote:
      'We partnered with E-Brave for our CSR education initiative and the impact was measurable. Students who went through the program demonstrated better communication, clearer goals, and stronger self-awareness during our campus visits.',
    initials: 'SN',
    color: '#0d6e35',
  },
  {
    name: 'Mrs. Lakshmi Iyer',
    role: 'Academic Director, Presidency School',
    quote:
      'The professionalism of the E-Brave team, combined with their structured methodology, gave us complete confidence. Our parent community was especially impressed by the transparent progress reporting.',
    initials: 'LI',
    color: '#4caf70',
  },
  {
    name: 'Arjun Patel',
    role: 'Parent & Business Owner',
    quote:
      'My son was confused and directionless. Six weeks with E-Brave Compass and he had a plan, a purpose, and a passion. Worth every investment. I recommend this to every parent I meet.',
    initials: 'AP',
    color: '#3AB562',
  },
];

const TOTAL = testimonials.length;

function getRelativeIndex(i, current, total) {
  let diff = i - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  /* ── Responsive detection ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Auto-rotate ── */
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL);
    }, 4000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);

  /* ── Pause on hover ── */
  const handleMouseEnter = () => stopInterval();
  const handleMouseLeave = () => startInterval();

  /* ── Manual dot navigation ── */
  const goTo = (index) => {
    stopInterval();
    setCurrent(index);
    startInterval();
  };

  /* ── Determine which cards are visible & their role ── */
  const getCardRole = (index) => {
    const diff = getRelativeIndex(index, current, TOTAL);
    if (diff === 0) return 'center';
    if (diff === -1 || diff === TOTAL - 1) return 'left';
    if (diff === 1 || diff === -(TOTAL - 1)) return 'right';
    return 'hidden';
  };

  return (
    <section className="testimonials-section" ref={sectionRef}>
      {/* ── Header ── */}
      <div className="testimonials-header">
        <p className="testimonials-eyebrow">TRUSTED BY EDUCATORS &amp; LEADERS</p>
        <h2 className="testimonials-title">What Leaders Are Saying</h2>
        <div className="testimonials-accent-line" />
      </div>

      {/* ── Carousel ── */}
      <div
        className="testimonials-carousel-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`testimonials-track ${isMobile ? 'mobile' : 'desktop'}`}>
          {testimonials.map((t, i) => {
            const role = getCardRole(i);
            return (
              <div
                key={i}
                className={`testimonial-card card-${role}`}
                onClick={() => role !== 'center' && goTo(i)}
                aria-hidden={role === 'hidden'}
              >
                {/* Big quote mark */}
                <div className="testimonial-quote-mark">&ldquo;</div>

                {/* Quote text */}
                <p className="testimonial-quote">{t.quote}</p>

                {/* Stars */}
                <div className="testimonial-stars">★★★★★</div>

                {/* Footer: avatar + name */}
                <div className="testimonial-footer">
                  <div
                    className="testimonial-avatar"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="testimonial-info">
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot navigation ── */}
      <div className="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
