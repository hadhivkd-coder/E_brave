import React, { useState } from 'react';
import DynamicRegistrationModal from './DynamicRegistrationModal';

export default function SecondaryServices() {
    const services = [
        {
            title: "Career Guidance",
            desc: "Expert 1-on-1 counseling to help students choose the perfect path.",
            icon: "🗺️",
            link: "#career-guidance"
        },
        {
            title: "AI Counselor",
            desc: "24/7 intelligent career and academic support assistant.",
            icon: "🤖",
            link: "/student/ai-coach"
        },
        {
            title: "Career Assessment Test",
            desc: "Comprehensive Psychometric testing to identify core strengths.",
            icon: "🧠",
            link: "/student/assessment"
        },
        {
            title: "E-Brave Compass Program",
            desc: "Specialized initiative for schools to empower their students.",
            icon: "🧭",
            link: "/compass"
        },
        {
            title: "Future Programs",
            desc: "Advanced skill-building and university placement tracks.",
            icon: "🚀",
            link: "#future"
        }
    ];

    const [activeModal, setActiveModal] = useState(null);

    return (
        <section id="career" className="about scroll-reveal" style={{ padding: '70px 0', background: 'var(--wh)' }}>
            <div className="sw">
                <style>
                    {`
                    .sec-service-grid {
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        gap: 20px;
                        margin-top: 48px;
                    }
                    @media (max-width: 1200px) {
                        .sec-service-grid {
                            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        }
                    }
                    .sec-service-card {
                        background: var(--card);
                        border: 1px solid rgba(0,0,0,0.04);
                        border-radius: 20px;
                        padding: 24px;
                        text-decoration: none;
                        color: var(--tx);
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        overflow: hidden;
                    }
                    .sec-service-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(30,122,82,0.12);
                        border-color: var(--brand);
                    }
                    .sec-service-card:active {
                        transform: translateY(-4px) scale(0.98);
                    }
                    .sec-icon-wrap {
                        width: 64px;
                        height: 64px;
                        background: rgba(30,122,82,0.08);
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        margin-bottom: 24px;
                        transition: transform 0.3s ease;
                    }
                    .sec-service-card:hover .sec-icon-wrap {
                        transform: rotate(5deg) scale(1.1);
                        background: rgba(30,122,82,0.15);
                    }
                    .sec-explore-arrow {
                        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .sec-service-card:hover .sec-explore-arrow {
                        transform: translateX(6px);
                    }
                    
                    /* AI Card Highlight */
                    .card-highlight-ai {
                        border: 1.5px solid transparent;
                        background: linear-gradient(var(--card), var(--card)) padding-box,
                                    linear-gradient(135deg, rgba(74, 222, 128, 0.6), rgba(30, 122, 82, 0.8)) border-box;
                    }
                    .card-highlight-ai:hover {
                        box-shadow: 0 20px 40px rgba(74, 222, 128, 0.25);
                    }
                    `}
                </style>
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', padding: '6px 16px', borderRadius: '100px', fontWeight: '700' }}>Additional Services</span>
                    <h2 className="sec-h" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>Complete Career Guidance</h2>
                    <p className="sec-p" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Beyond foundational mathematics, we provide expert counseling for students Class 8 to 12th pass.</p>
                </div>

                <div className="sec-service-grid">
                    {services.map((s, i) => {
                        const isAI = s.title === "AI Counselor";
                        return (
                        <div onClick={() => setActiveModal(s.title)} key={i} className={`sec-service-card scroll-reveal-child delay-${i + 1} ${isAI ? 'card-highlight-ai' : ''}`} style={{ cursor: 'pointer' }}>
                            <div className="sec-icon-wrap" style={{ width: '48px', height: '48px', fontSize: '1.5rem', marginBottom: '16px' }}>{s.icon}</div>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', fontWeight: '700' }}>
                                {s.title}
                                {isAI && <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.65rem', padding: '3px 8px', background: 'var(--brand)', color: 'var(--card)', borderRadius: '100px', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro</span>}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--mu)', lineHeight: '1.5' }}>{s.desc}</p>
                            
                            <div style={{ marginTop: 'auto', paddingTop: '16px', color: 'var(--brand)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                Explore <svg className="sec-explore-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

            <DynamicRegistrationModal 
                isOpen={activeModal !== null} 
                serviceTitle={activeModal} 
                onClose={() => setActiveModal(null)} 
            />
        </section>
    );
}
