import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import imgStep1 from '../assets/step_recorded.png';
import imgStep2 from '../assets/one_to_one.png';
import imgStep3 from '../assets/step_practice.png';
import imgStep4 from '../assets/step_confidence.png';

export default function HowTheProgramWorks() {
    const [activeStep, setActiveStep] = useState(null);

    useEffect(() => {
        if (activeStep !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeStep]);

    const steps = [
        { 
            title: "Recorded Lesson", 
            icon: "📺", 
            image: imgStep1,
            desc: "Interactive modules to grasp the core concepts.",
            details: "Students first watch premium animated video lessons. These are designed to visually break down abstract mathematical concepts into simple, real-world examples. They can watch at their own pace, pause, and rewind until the fundamental concept clicks."
        },
        { 
            title: "One-to-One Teacher Session", 
            icon: "👩‍🏫", 
            image: imgStep2,
            desc: "Expert mentor explains and solves doubts in real-time.",
            details: "This is the core of our program. Once the student has a baseline understanding, they join a live 1-on-1 session with our expert teacher. The teacher assesses their understanding, identifies any remaining gaps, and actively solves problems with them until mastery is achieved."
        },
        { 
            title: "Homework & Practice", 
            icon: "📝", 
            image: imgStep3,
            desc: "Curated assignments to reinforce learning.",
            details: "Learning is solidified through action. After the live session, students receive highly targeted practice assignments. These are not generic worksheets; they are curated to specifically reinforce the concepts the student just learned, ensuring long-term retention."
        },
        { 
            title: "Build Confidence", 
            icon: "🚀", 
            image: imgStep4,
            desc: "Students tackle exams fearlessly.",
            details: "With a strong foundation and consistent practice, anxiety naturally fades. Students transition from fearing math to treating it as a logical puzzle. They enter exams with absolute confidence, knowing they have mastered the underlying principles, not just memorized formulas."
        }
    ];

    return (
        <section id="how-it-works" className="how-it-works-section scroll-reveal" style={{ padding: '70px 0', background: 'var(--wh)' }}>
            <div className="sw">
                <style>
                    {`
                    .hiw-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                        gap: 24px;
                        width: 100%;
                    }
                    .hiw-card {
                        background: var(--card);
                        border: 1px solid rgba(0, 0, 0, 0.05);
                        border-radius: 24px;
                        padding: 32px 24px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        color: var(--tx);
                        transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                        position: relative;
                    }
                    .hiw-card:hover {
                        transform: translateY(-6px);
                        border-color: var(--brand);
                        box-shadow: 0 20px 40px rgba(30, 122, 82, 0.15);
                    }
                    .hiw-icon {
                        font-size: 2.5rem;
                        background: rgba(30, 122, 82, 0.08);
                        width: 80px; height: 80px;
                        display: flex; align-items: center; justify-content: center;
                        border-radius: 20px;
                        margin-bottom: 24px;
                        transition: transform 0.3s ease;
                    }
                    .hiw-card:hover .hiw-icon {
                        transform: rotate(5deg) scale(1.1);
                        background: rgba(30, 122, 82, 0.15);
                    }
                    .hiw-title {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-weight: 700;
                        font-size: 1.2rem;
                        margin-bottom: 12px;
                    }
                    .hiw-desc {
                        font-size: 0.95rem;
                        color: var(--mu);
                        line-height: 1.5;
                    }
                    .hiw-arrow {
                        position: absolute;
                        right: -30px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--brand);
                        font-size: 1.5rem;
                        z-index: 2;
                        opacity: 0.5;
                    }
                    @media (max-width: 900px) {
                        .hiw-arrow {
                            right: 50%;
                            bottom: -30px;
                            top: auto;
                            transform: translateX(50%) rotate(90deg);
                        }
                    }
                    `}
                </style>
                
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', padding: '6px 16px', borderRadius: '100px', fontWeight: '700' }}>The Framework</span>
                    <h2 className="sec-h" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--tx)' }}>How The Program Works</h2>
                    <p className="sec-p" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--mu)' }}>
                        A systematic 4-step approach that eliminates fear and ensures true understanding.
                    </p>
                </div>

                <div className="hiw-grid mt-4">
                    {steps.map((action, i) => (
                        <button onClick={() => setActiveStep(i)} key={i} className={`hiw-card scroll-reveal-child delay-${i}`} style={{ border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                            <div className="hiw-icon">{action.icon}</div>
                            <div className="hiw-title" style={{ color: 'var(--tx)' }}>{action.title}</div>
                            <div className="hiw-desc">{action.desc}</div>
                            <div style={{ color: 'var(--brand)', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '16px' }}>See details →</div>
                            {i < steps.length - 1 && <div className="hiw-arrow">→</div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {activeStep !== null && createPortal(
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setActiveStep(null)}>
                    <div style={{ background: 'var(--wh)', borderRadius: '24px', maxWidth: '800px', width: '100%', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', display: 'flex', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setActiveStep(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.05)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 10 }}>×</button>
                        
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', background: 'var(--deep-forest)', minHeight: '300px', position: 'relative' }}>
                            <img src={steps[activeStep].image} alt={steps[activeStep].title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                            <div style={{ position: 'absolute', bottom: '24px', left: '24px', fontSize: '3rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '12px', borderRadius: '16px' }}>{steps[activeStep].icon}</div>
                        </div>

                        <div style={{ flex: '1.2', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--hd)' }}>{steps[activeStep].title}</h3>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--tx)', marginBottom: '32px' }}>{steps[activeStep].details}</p>
                            <a href="#maths-register" onClick={() => setActiveStep(null)} className="btn-main" style={{ width: '100%', justifyContent: 'center' }}>Start This Journey</a>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
