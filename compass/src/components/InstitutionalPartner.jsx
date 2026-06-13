import React, { useEffect, useRef } from 'react';
import './InstitutionalPartner.css';

/* ── Icon Components ── */
function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21V9l9-6 9 6v12H3z" />
      <path d="M9 21V13h6v8" />
      <rect x="10" y="4" width="4" height="4" rx="0.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ── Data ── */
const features = [
  'Bulk enrollment for 100+ students',
  'Dedicated counselor assigned to your school',
  'Principal & staff orientation session included',
  'Customized progress reports per student',
  'Certificate of Institutional Partnership',
  'Parent communication & guidance sessions',
];

const cards = [
  {
    id: 'school',
    Icon: BuildingIcon,
    title: 'School Partnership',
    desc: 'Structured program for 50 to 1000+ students with dedicated counselors and quarterly progress reports.',
  },
  {
    id: 'corporate',
    Icon: UsersIcon,
    title: 'Corporate CSR Program',
    desc: 'Partner with E-Brave for your education-focused CSR initiatives with measurable impact metrics.',
  },
  {
    id: 'ngo',
    Icon: GlobeIcon,
    title: 'Government & NGO',
    desc: 'Collaborate to bring career clarity to underserved student communities at scale.',
  },
];

/* ── Component ── */
export default function InstitutionalPartner() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const options = { threshold: 0.18, rootMargin: '0px 0px -60px 0px' };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ip-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const leftEl  = leftRef.current;
    const rightEl = rightRef.current;

    if (leftEl)  observer.observe(leftEl);
    if (rightEl) observer.observe(rightEl);

    return () => {
      if (leftEl)  observer.unobserve(leftEl);
      if (rightEl) observer.unobserve(rightEl);
    };
  }, []);

  return (
    <section id="partner" className="institutional-partner section">
      {/* Compass-rose watermark — purely decorative */}
      <div className="ip-watermark" aria-hidden="true" />

      <div className="ip-container">

        {/* ══ LEFT COLUMN ══ */}
        <div className="ip-left" ref={leftRef}>
          <span className="ip-badge">FOR SCHOOLS &amp; INSTITUTIONS</span>

          <h2 className="ip-heading">Partner With E-Brave Compass</h2>

          <p className="ip-subtitle">
            Bring structured career clarity to every student in your institution.
            E-Brave offers a dedicated institutional program designed for schools,
            colleges, and organizations.
          </p>

          <ul className="ip-features">
            {features.map((feat, i) => (
              <li key={i} className="ip-feature-item">
                <span className="ip-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {feat}
              </li>
            ))}
          </ul>

          <div className="ip-cta-row">
            <button className="ip-cta-btn">Request Partnership Proposal</button>
            <a href="#" className="ip-secondary-link">
              Download Program Brochure &rarr;
            </a>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div className="ip-right" ref={rightRef}>
          {cards.map((card) => (
            <div className="ip-card" key={card.id}>
              <div className="ip-card-icon">
                <card.Icon />
              </div>
              <div className="ip-card-body">
                <h3 className="ip-card-title">{card.title}</h3>
                <p className="ip-card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
