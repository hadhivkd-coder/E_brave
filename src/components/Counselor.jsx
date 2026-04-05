import React from 'react';

export default function Counselor() {
    const experts = [
        {
            name: 'Dr. Priya Menon',
            title: 'Lead Career Strategist',
            photo: '/portraits/counselor_priya.png',
            rating: 4.9,
            reviews: 312,
            specialization: 'Medical & Engineering Entrance (Kerala)',
            bio: 'M.Sc Psychology, B.Ed — 9 years guiding students through KEAM, NEET, and JEE streams across 15 districts of Kerala.',
            tags: ['NEET', 'KEAM', 'Malayalam', 'English'],
            badge: 'LEAD COUNSELOR'
        },
        {
            name: 'Rahul Krishnan',
            title: 'Overseas Admissions Expert',
            photo: '/portraits/counselor_rahul.png',
            rating: 5.0,
            reviews: 198,
            specialization: 'UK, Germany & Canadian Universities',
            bio: 'MBA International Education (UK) — helped 200+ Kerala students secure admissions in top 100 QS-ranked universities.',
            tags: ['UK', 'Germany', 'Canada', 'SOP Writing'],
            badge: 'GLOBAL EXPERT'
        },
        {
            name: 'Dr. Sreelakshmi Nair',
            title: 'Psychometric & Aptitude Analyst',
            photo: '/portraits/counselor_sreelakshmi.png',
            rating: 4.8,
            reviews: 267,
            specialization: 'Personality Mapping & Stream Selection',
            bio: 'PhD Counseling Psychology — specializes in aptitude profiling and helping students align their innate strengths with the right career path.',
            tags: ['Psychometrics', 'Stream Selection', 'Arts', 'Science'],
            badge: 'VERIFIED EXPERT'
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
