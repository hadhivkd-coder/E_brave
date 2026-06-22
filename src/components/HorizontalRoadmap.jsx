import React, { useRef } from 'react';

export default function HorizontalRoadmap() {
    const scrollContainerRef = useRef(null);

    const steps = [
        { title: "Watch A Lesson", desc: "Start with an animated breakdown.", icon: "🎬" },
        { title: "Meet Your Teacher", desc: "1-on-1 session for your doubts.", icon: "👩‍🏫" },
        { title: "Practice Together", desc: "Solve problems live with a mentor.", icon: "✏️" },
        { title: "Homework Review", desc: "Targeted assignments to lock it in.", icon: "📝" },
        { title: "Build Confidence", desc: "Concepts finally make perfect sense.", icon: "🚀" },
        { title: "Grow Independently", desc: "Tackle exams without anxiety.", icon: "🌟" }
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="roadmap-section scroll-reveal" style={{ padding: '70px 0', background: 'var(--wh)', overflow: 'hidden', position: 'relative' }}>
            <div className="sw">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
                    <div className="scroll-reveal-child">
                        <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px' }}>Our Process</span>
                        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--tx)', marginBottom: '8px' }}>The E-Brave Learning Journey</h2>
                        <p style={{ maxWidth: '600px', color: 'var(--mu)', fontSize: '1.1rem' }}>
                            A proven step-by-step framework to eliminate math anxiety.
                        </p>
                    </div>
                    
                    <div className="scroll-reveal-child delay-1" style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={scrollLeft} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }} aria-label="Scroll left">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tx)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <button onClick={scrollRight} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }} aria-label="Scroll right">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--tx)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <style>
                {`
                .timeline-track {
                    display: flex;
                    padding: 0 5% 40px 5%;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    position: relative;
                }
                .timeline-track::-webkit-scrollbar {
                    display: none;
                }
                
                /* The continuous animated line */
                .timeline-track::before {
                    content: '';
                    position: absolute;
                    top: 40px;
                    left: 5%;
                    right: 5%;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(30,122,82,0.1) 0%, rgba(30,122,82,0.5) 50%, rgba(30,122,82,0.1) 100%);
                    z-index: 1;
                }

                .timeline-node {
                    min-width: 260px;
                    scroll-snap-align: start;
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 0 20px;
                }

                .timeline-icon-wrap {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: var(--wh);
                    border: 2px solid rgba(30,122,82,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.03);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                }

                .timeline-node:hover .timeline-icon-wrap {
                    transform: scale(1.1) translateY(-5px);
                    border-color: var(--brand);
                    box-shadow: 0 15px 30px rgba(30,122,82,0.15);
                }

                .timeline-step-num {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--brand);
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }

                .timeline-title {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--tx);
                    margin-bottom: 12px;
                    line-height: 1.3;
                }

                .timeline-desc {
                    font-size: 0.95rem;
                    color: var(--mu);
                    line-height: 1.6;
                }
                `}
            </style>

            <div className="timeline-track scroll-reveal-child delay-2" ref={scrollContainerRef}>
                {steps.map((step, index) => (
                    <div key={index} className="timeline-node">
                        <div className="timeline-icon-wrap">
                            {step.icon}
                        </div>
                        <div className="timeline-step-num">STEP 0{index + 1}</div>
                        <h3 className="timeline-title">{step.title}</h3>
                        <p className="timeline-desc">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
