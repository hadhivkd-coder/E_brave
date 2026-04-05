import React, { useEffect, useRef, useState } from 'react';
import EbraveLogo from './icons/EbraveLogo';

export default function Hero() {
    const countersRef = useRef(null);
    const [counts, setCounts] = useState({ counselors: 0, students: 0, rating: 0 });
    const animatedRef = useRef(false);

    // ── ANIMATED COUNTERS ──
    useEffect(() => {
        const el = countersRef.current;
        if (!el) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animatedRef.current) {
                animatedRef.current = true;
                animateCount('counselors', 25, 1500);
                animateCount('students', 10000, 2000);
                animateCount('rating', 4.9, 1800, true);
            }
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const animateCount = (key, target, duration, isDecimal = false) => {
        const start = performance.now();
        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setCounts(prev => ({ ...prev, [key]: isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current) }));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(0) + 'k' : n;

    return (
        <section className="hero">
            {/* Background layers */}
            <div className="hero-grid" aria-hidden="true"></div>
            <div className="orb orb1" aria-hidden="true"></div>
            <div className="orb orb2" aria-hidden="true"></div>
            <div className="orb orb3" aria-hidden="true"></div>

            <div className="hero-inner sw">
                {/* LEFT: Text */}
                <div className="hero-content">
                    <div className="hero-pill">
                        <div className="pill-dot" aria-hidden="true"></div>
                        Kerala's #1 Online Career Guidance Platform
                    </div>

                    <h1>
                        Find Your <em>Perfect</em> Career Path — In Your Language
                    </h1>

                    <p className="hero-sub">
                        Expert 1-on-1 career counseling for students Class 8 to 12th pass.
                        Psychometric testing, stream selection, and overseas guidance — in <strong>Malayalam &amp; English</strong>.
                    </p>

                    <div className="hero-btns">
                        <a href="#register" className="btn-main" aria-label="Book a free consultation session">
                            Book Free Consultation
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                        <a href="#how-it-works" className="btn-ghost" aria-label="Learn how E-Brave works">
                            See How It Works
                        </a>
                    </div>

                    <div className="hero-trust">
                        <div className="hero-trust-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            100% Satisfaction Guarantee
                        </div>
                        <div className="hero-trust-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                            Sessions in 24 hrs
                        </div>
                        <div className="hero-trust-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            25+ Certified Counselors
                        </div>
                    </div>

                    <div className="hero-stats" ref={countersRef}>
                        <div className="hst">
                            <div className="hst-n">{counts.counselors}+</div>
                            <div className="hst-l">Certified Counselors</div>
                        </div>
                        <div className="hst">
                            <div className="hst-n">{fmt(counts.students)}+</div>
                            <div className="hst-l">Students Guided</div>
                        </div>
                        <div className="hst">
                            <div className="hst-n">{counts.rating}</div>
                            <div className="hst-l">⭐ Star Rating</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Highly Designed Career Roadmap for Class 12+ Pass */}
                <div className="hero-visual" aria-hidden="true">
                    <div className="hv-roadmap">
                        
                        <div className="hvr-brand">
                             <EbraveLogo width={40} height={40} className="hvr-logo" />
                             <div className="hvr-brand-text">
                                 <strong>E-Brave</strong>
                                 <span>Career Roadmap</span>
                             </div>
                             <div className="hvr-badge">CLASS 12 PASS</div>
                        </div>

                        <div className="hvr-steps">
                            <div className="hvr-step hvr-step--1">
                                <div className="hvr-num">01</div>
                                <div className="hvr-box">
                                    <h4>Skill & Aptitude Sync</h4>
                                    <p>Comprehensive Psychometric testing to identify your core strengths.</p>
                                </div>
                            </div>

                            <div className="hvr-step hvr-step--2">
                                <div className="hvr-num">02</div>
                                <div className="hvr-box">
                                    <h4>Stream & Entrance Mapping</h4>
                                    <p>Choosing between Engineering, Medical, or 50+ alternative careers.</p>
                                </div>
                            </div>

                            <div className="hvr-step hvr-step--3">
                                <div className="hvr-num">03</div>
                                <div className="hvr-box">
                                    <h4>Admission Strategy</h4>
                                    <p>Expert guidance on entrance prep and top-tier college applications.</p>
                                </div>
                            </div>

                            <div className="hvr-step hvr-step--4">
                                <div className="hvr-num">04</div>
                                <div className="hvr-box hvr-box--gold">
                                    <h4>Career Launch</h4>
                                    <p>Final roadmap to your dream university and future profession.</p>
                                </div>
                            </div>
                        </div>

                        <div className="hvr-footer">
                            <div className="hvr-live">
                                <span className="hvr-dot"></span> 124 students started today
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
