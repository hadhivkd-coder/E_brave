import React from 'react';
import './PartnerLogos.css';

const partners = [
  { name: 'Delhi Public School' },
  { name: 'Presidency School' },
  { name: 'Kendriya Vidyalaya' },
  { name: 'Ryan International' },
  { name: 'EduVentures India' },
  { name: 'National Academy' },
  { name: 'Vision Global School' },
  { name: 'Heritage Foundation' },
  { name: 'Scholars Institute' },
  { name: 'Pinnacle Academy' },
];

const PartnerLogos = () => {
  // Duplicate for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <div className="partner-logos-section">
      <p className="partner-logos-label">TRUSTED BY LEADING INSTITUTIONS ACROSS INDIA</p>
      <div className="partner-logos-track-wrapper">
        <div className="partner-logos-track">
          {doubled.map((partner, index) => (
            <div key={index} className="partner-logo-item">
              <div className="partner-logo-inner">
                <div className="partner-logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <span>{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogos;
