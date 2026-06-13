import React, { useEffect, useRef, useState } from 'react';
import './StatsCounter.css';

// ── SVG Icons ────────────────────────────────────────────────────────────────

const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
    <path
      d="M12 2L2 7l10 5 10-5-10-5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="rgba(58,181,98,0.15)"
    />
    <path
      d="M6 10.5v5c0 2.5 2.686 4.5 6 4.5s6-2 6-4.5v-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M20 7v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="20" cy="14" r="1.2" fill="currentColor" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
    <path
      d="M12 2l2.88 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.12-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="rgba(58,181,98,0.15)"
    />
    <path
      d="M12 6l1.5 3.5L17 10l-2.5 2.5.5 3.5L12 14.5 9 16l.5-3.5L7 10l3.5-.5L12 6z"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
    <rect
      x="3" y="3" width="18" height="18" rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="rgba(58,181,98,0.15)"
    />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="6"    y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
    <rect x="15"   y="12" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
    <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" fill="rgba(58,181,98,0.15)" />
    <path
      d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6l.9 2h2.1l-1.7 1.3.65 2-1.95-1.3-1.95 1.3.65-2L9 8h2.1L12 6z"
      fill="currentColor"
      opacity="0.7"
    />
  </svg>
);

// ── Stats Data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    id: 'students',
    icon: <GraduationCapIcon />,
    value: 1200,
    suffix: '+',
    label: 'Students Guided',
    duration: 2000,
  },
  {
    id: 'clarity',
    icon: <StarIcon />,
    value: 95,
    suffix: '%',
    label: 'Career Clarity Rate',
    duration: 1600,
  },
  {
    id: 'schools',
    icon: <BuildingIcon />,
    value: 50,
    suffix: '+',
    label: 'Schools Partnered',
    duration: 1400,
  },
  {
    id: 'years',
    icon: <AwardIcon />,
    value: 4,
    suffix: '+',
    label: 'Years of Excellence',
    duration: 1000,
  },
];

// ── Floating Particles (deterministic positions) ──────────────────────────────

const PARTICLES = [
  { id: 0,  top: '8%',  left: '5%',  size: '4px', duration: '6.2s', delay: '0.3s',  opacity: '0.18' },
  { id: 1,  top: '15%', left: '18%', size: '5px', duration: '8.1s', delay: '1.2s',  opacity: '0.12' },
  { id: 2,  top: '25%', left: '32%', size: '3px', duration: '5.4s', delay: '0.7s',  opacity: '0.20' },
  { id: 3,  top: '40%', left: '8%',  size: '4px', duration: '7.3s', delay: '2.1s',  opacity: '0.14' },
  { id: 4,  top: '55%', left: '22%', size: '5px', duration: '9.0s', delay: '0.5s',  opacity: '0.10' },
  { id: 5,  top: '70%', left: '12%', size: '3px', duration: '6.8s', delay: '3.0s',  opacity: '0.16' },
  { id: 6,  top: '85%', left: '28%', size: '4px', duration: '4.9s', delay: '1.8s',  opacity: '0.20' },
  { id: 7,  top: '92%', left: '45%', size: '5px', duration: '7.6s', delay: '0.9s',  opacity: '0.13' },
  { id: 8,  top: '80%', left: '60%', size: '3px', duration: '5.1s', delay: '2.4s',  opacity: '0.18' },
  { id: 9,  top: '65%', left: '75%', size: '4px', duration: '8.4s', delay: '1.1s',  opacity: '0.11' },
  { id: 10, top: '50%', left: '88%', size: '5px', duration: '6.6s', delay: '0.2s',  opacity: '0.17' },
  { id: 11, top: '35%', left: '92%', size: '3px', duration: '9.2s', delay: '3.5s',  opacity: '0.14' },
  { id: 12, top: '20%', left: '80%', size: '4px', duration: '5.8s', delay: '1.6s',  opacity: '0.20' },
  { id: 13, top: '10%', left: '65%', size: '5px', duration: '7.0s', delay: '0.4s',  opacity: '0.12' },
  { id: 14, top: '5%',  left: '50%', size: '3px', duration: '4.5s', delay: '2.8s',  opacity: '0.18' },
  { id: 15, top: '30%', left: '55%', size: '4px', duration: '8.9s', delay: '1.4s',  opacity: '0.15' },
  { id: 16, top: '45%', left: '42%', size: '5px', duration: '6.3s', delay: '3.2s',  opacity: '0.10' },
  { id: 17, top: '60%', left: '38%', size: '3px', duration: '5.5s', delay: '0.6s',  opacity: '0.20' },
  { id: 18, top: '75%', left: '52%', size: '4px', duration: '7.8s', delay: '2.0s',  opacity: '0.13' },
  { id: 19, top: '88%', left: '70%', size: '5px', duration: '9.5s', delay: '1.0s',  opacity: '0.16' },
];

// ── useCountUp hook ───────────────────────────────────────────────────────────

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({ stat, active, index }) {
  const count = useCountUp(stat.value, stat.duration, active);

  return (
    <div
      className={`stat-card${active ? ' stat-card--visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
    >
      <div className="stat-card__icon-wrapper" aria-hidden="true">
        {stat.icon}
      </div>

      <p className="stat-card__number" aria-live="polite">
        {count.toLocaleString()}
        <span className="stat-card__suffix">{stat.suffix}</span>
      </p>

      <p className="stat-card__label">{stat.label}</p>
    </div>
  );
}

// ── StatsCounter ──────────────────────────────────────────────────────────────

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef} aria-labelledby="stats-heading">

      {/* Floating particles */}
      <div className="stats-section__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="stats-particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <div className="stats-section__header">
        <h2
          id="stats-heading"
          className={`stats-section__title${isVisible ? ' stats-section__title--visible' : ''}`}
        >
          E-Brave by the Numbers
        </h2>
        <div
          className={`stats-section__underline${isVisible ? ' stats-section__underline--visible' : ''}`}
          aria-hidden="true"
        />
        <p
          className={`stats-section__subtitle${isVisible ? ' stats-section__subtitle--visible' : ''}`}
        >
          Proven results that speak for themselves.
        </p>
      </div>

      {/* Stats grid */}
      <div className="stats-section__grid">
        {STATS.map((stat, index) => (
          <StatCard
            key={stat.id}
            stat={stat}
            active={isVisible}
            index={index}
          />
        ))}
      </div>

    </section>
  );
}
