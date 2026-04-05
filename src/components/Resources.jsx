import React from 'react';

const resources = [
    {
        tag: 'Free Download',
        emoji: '📋',
        badge: 'PDF · Instant Access',
        title: 'The 12-Question Stream Selection Framework',
        benefit: 'Stop guessing. Know exactly which stream — Science, Commerce, or Arts — matches your aptitude and goals.',
        cta: 'Download Free Guide',
        ctaIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        ),
        accent: 'neon',
        href: '/stream-selection-guide.html',
        target: '_blank',
    },
    {
        tag: 'Free Session',
        emoji: '📞',
        badge: '30 Min · No Commitment',
        title: 'Book a Free Discovery Call with a Certified Counselor',
        benefit: 'Talk to a real expert in Malayalam or English. Walk away with clarity on your next step — completely free.',
        cta: 'Book Free Call Now',
        ctaIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.5 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
        ),
        accent: 'gold',
        href: '#register',
        featured: true,
    },
    {
        tag: 'Free Checklist',
        emoji: '🗺️',
        badge: '10-Step · Class 10–12',
        title: 'Career Readiness Roadmap for Kerala Students',
        benefit: "A clear, step-by-step checklist so you know exactly where you stand and what to do next — before it's too late.",
        cta: 'Get Free Checklist',
        ctaIcon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
        ),
        accent: 'neon',
        href: '/career-readiness-roadmap.html',
        target: '_blank',
    },
];

export default function Resources() {
    return (
        <section id="resources" className="resources scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">Free Career Resources</span>
                    <h2 className="sec-h">Start Your Journey — For Free</h2>
                    <p className="sec-p">
                        Every resource below gives you something real and actionable — no fluff, no paywalls.
                        Pick what's most useful for you right now.
                    </p>
                </div>

                <div className="resources-grid mt-4">
                    {resources.map((res, i) => (
                        <div
                            key={i}
                            className={`resource-card resource-card--v2 scroll-reveal-child delay-${i + 1} ${res.featured ? 'resource-card--featured' : ''}`}
                        >
                            {res.featured && (
                                <div className="rc-top-badge">Most Popular</div>
                            )}

                            <div className="rc-header">
                                <span className="rc-emoji" aria-hidden="true">{res.emoji}</span>
                                <div className="rc-tags">
                                    <span className={`rc-tag rc-tag--${res.accent}`}>{res.tag}</span>
                                    <span className="rc-meta-badge">{res.badge}</span>
                                </div>
                            </div>

                            <h3 className="rc-title">{res.title}</h3>

                            <p className="rc-benefit">{res.benefit}</p>

                            <div className="rc-value-row">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                <span>100% Free · No credit card</span>
                            </div>

                            <a
                                href={res.href}
                                className={`rc-cta rc-cta--${res.accent}`}
                                aria-label={res.cta}
                                target={res.target}
                                rel={res.target === '_blank' ? 'noopener noreferrer' : undefined}
                            >
                                <span>{res.cta}</span>
                                {res.ctaIcon}
                            </a>
                        </div>
                    ))}
                </div>

                <p className="resources-footnote scroll-reveal-child delay-4">
                    🔒 Your details are private. We never share or spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
