import React from 'react';

const plans = [
    {
        id: 'starter',
        name: 'Explorer',
        badge: null,
        price: '₹499',
        period: 'one-time',
        desc: 'Perfect for early-stage students who need initial clarity',
        features: [
            '30-minute online session',
            'Basic career interest assessment',
            'Top 3 career path suggestions',
            'Session summary PDF',
        ],
        missing: [
            'Psychometric test not included',
            'No follow-up session',
        ],
        cta: 'Get Started',
        ctaLink: '#register',
        accent: false
    },
    {
        id: 'pro',
        name: 'Pathfinder',
        badge: 'MOST POPULAR',
        price: '₹999',
        period: 'one-time',
        desc: 'Our most complete session — trusted by 10,000+ families',
        features: [
            '60-minute in-depth online session',
            'Full psychometric & aptitude test',
            'Detailed career roadmap (PDF + video)',
            'Stream selection strategy',
            'College shortlist for your profile',
            '1 follow-up Q&A (30 days)',
            'Malayalam or English — your choice',
        ],
        missing: [],
        cta: 'Book Pathfinder',
        ctaLink: '#register',
        accent: true
    },
    {
        id: 'elite',
        name: 'Launchpad',
        badge: 'BEST VALUE',
        price: '₹1,999',
        period: 'one-time',
        desc: 'Full-year support for students serious about their future',
        features: [
            'Everything in Pathfinder',
            '3 follow-up sessions (1 per quarter)',
            'SOP & application letter guidance',
            'Scholarship identification support',
            'Overseas university roadmap (optional)',
            'WhatsApp priority access to counselor',
            'Parent counseling session included',
        ],
        missing: [],
        cta: 'Go Launchpad',
        ctaLink: '#register',
        accent: false
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="pricing scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">Transparent Pricing</span>
                    <h2 className="sec-h">Simple & Honest Plans</h2>
                    <p className="sec-p">No hidden fees. No subscriptions. Pay once, transform your future.</p>
                </div>

                <div className="pricing-grid mt-4">
                    {plans.map((plan, i) => (
                        <div key={plan.id}
                            className={`pricing-card scroll-reveal-child delay-${i+1} ${plan.accent ? 'pricing-card--featured' : ''}`}>
                            {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                            <div className="pricing-top">
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="price-amount">{plan.price}</span>
                                    <span className="price-period">/ {plan.period}</span>
                                </div>
                                <p className="plan-desc">{plan.desc}</p>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="feature-item feature-yes">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M20 6L9 17l-5-5"/>
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                                {plan.missing.map((f, j) => (
                                    <li key={j} className="feature-item feature-no">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12"/>
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <a href={plan.ctaLink} className={`plan-cta ${plan.accent ? 'btn-main' : 'btn-ghost-green'}`}>
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="pricing-note scroll-reveal-child">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <p>All plans include a <strong>100% satisfaction guarantee</strong>. If you are not satisfied after your session, we will schedule a free re-session — no questions asked.</p>
                </div>
            </div>
        </section>
    );
}
