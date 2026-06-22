import React from 'react';
import ebraveMathsHero from '../assets/ebrave_maths_hero.png';
import EbraveLogo from './icons/EbraveLogo';

export default function Hero() {
    return (
        <section id="foundation" className="hero" style={{ minHeight: 'calc(100vh - 80px)', height: 'auto', paddingTop: '80px', paddingBottom: '60px', display: 'flex', alignItems: 'center', marginBottom: '0', position: 'relative', overflow: 'hidden' }}>
            {/* Background layers */}
            <div className="hero-grid" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--deep-forest)', zIndex: -2 }}></div>
            <div className="orb orb1" aria-hidden="true" style={{ background: 'var(--brand)' }}></div>
            <div className="orb orb2" aria-hidden="true" style={{ background: 'var(--accent)' }}></div>
            <div className="orb orb3" aria-hidden="true" style={{ background: 'var(--emerald)' }}></div>

            {/* Floating Math Graphics */}
            <div aria-hidden="true" style={{ position: 'absolute', top: '15%', left: '5%', opacity: 0.15, fontSize: '3rem', transform: 'rotate(-15deg)', animation: 'float 6s ease-in-out infinite' }}>∑</div>
            <div aria-hidden="true" style={{ position: 'absolute', top: '25%', right: '8%', opacity: 0.1, fontSize: '4rem', transform: 'rotate(20deg)', animation: 'float 8s ease-in-out infinite 1s' }}>π</div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: '20%', left: '10%', opacity: 0.15, fontSize: '2.5rem', transform: 'rotate(10deg)', animation: 'float 7s ease-in-out infinite 2s' }}>√</div>
            <div aria-hidden="true" style={{ position: 'absolute', bottom: '15%', right: '15%', opacity: 0.1, fontSize: '3.5rem', transform: 'rotate(-25deg)', animation: 'float 9s ease-in-out infinite 0.5s' }}>∞</div>

            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .hero h1, .hero p, .hero .hero-pill { color: var(--wh); }
                `}
            </style>

            <div className="hero-inner sw" style={{ display: 'grid', gridTemplateColumns: '48fr 28fr 24fr', gap: '32px', marginTop: '-40px' }}>
                {/* LEFT: Text (48%) */}
                <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="hero-pill">
                        <div className="pill-dot" aria-hidden="true"></div>
                        Overcome Maths Fear
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        Help Your Child<br />
                        Build Confidence In<br />
                        <em>Mathematics</em>
                    </h1>

                    <p className="hero-sub" style={{ fontSize: '1.1rem', marginBottom: '24px', maxWidth: '90%' }}>
                        Transform anxiety into achievement through structured lessons and one-to-one teacher support designed to eliminate learning gaps.
                    </p>

                    <div className="hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                        <a href="#maths-register" className="btn-main hover-lift" aria-label="Book a free demo class" style={{ background: 'var(--neon)', color: 'var(--dk)', padding: '18px 40px', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(74, 222, 128, 0.3)' }}>
                            Book Free Demo Class
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                        <a href="#maths-register" className="btn-ghost hover-lift" style={{ background: 'var(--wh)', color: 'var(--dk)', padding: '18px 40px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '14px', boxShadow: '0 10px 30px rgba(255, 255, 255, 0.15)' }}>
                            Register for Program
                        </a>
                    </div>

                    <div className="hero-trust" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            Grade 5-12
                        </div>
                        <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            One-to-One Teacher Support
                        </div>
                        <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            Homework Guidance
                        </div>
                        <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" width="16" height="16"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            Foundation First
                        </div>
                    </div>
                </div>

                {/* CENTER: Visual (28%) */}
                <div className="hero-visual hero-float-anim" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '-40px', zIndex: '5', position: 'relative' }}>
                    <div className="hero-blend-wrapper">
                        <img src={ebraveMathsHero} alt="Maths Mentorship" className="hero-blend-image" />
                    </div>
                </div>

                {/* RIGHT: Learning Journey Timeline (24%) */}
                <div className="hero-card-container hover-lift" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <div className="hv-roadmap" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '28px 24px', color: 'var(--card)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                        <div className="hvr-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                             <div style={{ background: 'linear-gradient(135deg, var(--brand), var(--emerald))', padding: '10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(47, 122, 69, 0.4)' }}>
                                <EbraveLogo width={24} height={24} className="hvr-logo" />
                             </div>
                             <div className="hvr-brand-text">
                                 <strong style={{ fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--wh)' }}>E-Brave Journey</strong>
                             </div>
                        </div>

                        <div className="hvr-steps" style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '15px', top: '20px', bottom: '20px', width: '2px', background: 'linear-gradient(to bottom, var(--accent), rgba(82, 195, 106, 0.1))', zIndex: 1 }}></div>
                            
                            <style>
                                {`
                                .hvr-timeline-item {
                                    display: flex;
                                    align-items: flex-start;
                                    gap: 20px;
                                    padding: 16px 0;
                                    position: relative;
                                    z-index: 2;
                                    cursor: pointer;
                                    transition: transform 0.3s ease;
                                }
                                .hvr-timeline-item:hover {
                                    transform: translateX(6px);
                                }
                                .hvr-timeline-node {
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    background: var(--deep-forest);
                                    border: 2px solid var(--accent);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-size: 0.8rem;
                                    font-weight: 800;
                                    color: var(--accent);
                                    flex-shrink: 0;
                                    box-shadow: 0 0 0 4px rgba(82, 195, 106, 0.1);
                                    transition: all 0.3s ease;
                                }
                                .hvr-timeline-item:hover .hvr-timeline-node {
                                    background: var(--accent);
                                    color: var(--deep-forest);
                                    box-shadow: 0 0 15px rgba(82, 195, 106, 0.5);
                                }
                                .hvr-timeline-content {
                                    padding-top: 4px;
                                }
                                .hvr-timeline-title {
                                    font-size: 1rem;
                                    font-weight: 700;
                                    color: var(--wh);
                                    margin-bottom: 4px;
                                }
                                .hvr-timeline-desc {
                                    font-size: 0.8rem;
                                    color: var(--light-text);
                                }
                                `}
                            </style>
                            {[
                                { num: '1', title: 'Video Lessons', desc: 'Visual concept breakdown' },
                                { num: '2', title: '1-to-1 Session', desc: 'Live teacher doubt solving' },
                                { num: '3', title: 'Targeted Practice', desc: 'Reinforce the core logic' },
                                { num: '4', title: 'Confidence', desc: 'Fearless exam readiness' }
                            ].map((step, idx) => (
                                <a href="#maths-register" key={idx} className="hvr-timeline-item" style={{ textDecoration: 'none' }}>
                                    <div className="hvr-timeline-node">{step.num}</div>
                                    <div className="hvr-timeline-content">
                                        <div className="hvr-timeline-title">{step.title}</div>
                                        <div className="hvr-timeline-desc">{step.desc}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="hvr-footer" style={{ marginTop: '32px' }}>
                            <div className="hvr-badge" style={{ background: 'rgba(82, 195, 106, 0.15)', color: 'var(--accent)', padding: '10px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', border: '1px solid rgba(82, 195, 106, 0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Limited Slots Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
