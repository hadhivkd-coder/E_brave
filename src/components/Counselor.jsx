import React from 'react';

export default function Counselor() {
    const experts = [
        {
            name: 'CKM Rafeek',
            title: 'CEO, WEFI Kerala',
            photo: '/portraits/ckm_rafeek.jpg',
            rating: 5.0,
            reviews: 450,
            specialization: 'Educational Leadership & Strategy',
            bio: 'M.Sc & B.Ed in Physics, currently pursuing Strategic Management at IIM Kozhikode. Visionary leader dedicated to shaping educational and career pathways across Kerala.',
            tags: ['Strategic Management', 'Leadership', 'Physics', 'IIMK'],
            badge: 'CEO & LEAD MENTOR'
        },
        {
            name: 'Navas Kuthiradam',
            title: 'Professional Career Coach',
            photo: '/portraits/navas.jpg',
            rating: 4.9,
            reviews: 320,
            specialization: 'Holistic Career Guidance',
            bio: 'B.Sc in Radiology and M.A in Sociology. Passionate career coach focused on leveraging sociological insights and mentoring to help students uncover their true professional potential.',
            tags: ['Sociology', 'Career Coaching', 'Mentoring', 'Radiology'],
            badge: 'CAREER COACH'
        },
        {
            name: 'Muhammed Rameez C',
            title: 'Certified Career Counselor',
            photo: '/portraits/rameez.jpg',
            rating: 4.9,
            reviews: 4000,
            specialization: 'Personal Guidance for Students & Professionals',
            bio: 'B.Tech in EEE. Directorate Member of WEFI Kerala and Founder of Skillix Academy. Certified counselor under WEFI Kerala & Kerala Govt. Project (KKEM), with 4000+ successful sessions.',
            tags: ['Govt Certified', 'KKEM', 'Skillix Academy', 'B.Tech EEE'],
            badge: 'CERTIFIED EXPERT'
        }
    ];

    return (
        <section id="experts" className="counselor scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">The Expert Panel</span>
                    <h2 className="sec-h">Meet Your Lead Mentors</h2>
                    <p className="sec-p">Real counselors. Real credentials. Real results — for 10,000+ students across Kerala.</p>
                </div>

                <div className="expert-grid mt-4">
                    {experts.map((expert, i) => (
                        <div key={i} className={`expert-card scroll-reveal-child delay-${i}`}>
                            <div className="expert-badge-pro">{expert.badge}</div>
                            <div className="expert-avatar-box">
                                <img
                                    src={expert.photo}
                                    alt={`${expert.name} — E-Brave Career Counselor`}
                                    className="expert-photo"
                                    loading="lazy"
                                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                                <div className="expert-avatar-inner" style={{ display: 'none' }}>
                                    {expert.name.charAt(0)}
                                </div>
                            </div>
                            <h3>{expert.name}</h3>
                            <p className="expert-title">{expert.title}</p>
                            <div className="expert-rating">
                                {'★'.repeat(Math.floor(expert.rating))}
                                <span>{expert.rating}</span>
                                <span className="expert-review-count">({expert.reviews} reviews)</span>
                            </div>
                            <p className="expert-bio">{expert.bio}</p>
                            <div className="expert-tags">
                                {expert.tags.map((tag, j) => <span key={j}>{tag}</span>)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="counselor-cta scroll-reveal-child">
                    <p>All counselors are background-verified and hold recognized certifications in career counseling.</p>
                    <a href="#register" className="btn-main">Book a Session with an Expert</a>
                </div>
            </div>
        </section>
    );
}
