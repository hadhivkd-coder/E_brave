import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import imgTrap from '../assets/foundation_trap.png';
import imgGaps from '../assets/learning_gaps.png';
import imgAttention from '../assets/one_to_one.png';
import imgAnxiety from '../assets/maths_anxiety.png';
import imgLimit from '../assets/classroom_limit.png';

export default function WhyStudentsStruggle() {
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeModal]);

    const modalData = {
        trap: {
            title: "The Foundation Trap",
            icon: "⚠️",
            image: imgTrap,
            content: "Mathematics is deeply cumulative. If a student misses how fractions work in Grade 5, they won't understand algebra in Grade 8. At E-Brave, we start by identifying the exact point in the past where the disconnect happened, and we bridge that gap before moving forward."
        },
        gaps: {
            title: "Invisible Learning Gaps",
            icon: "📊",
            image: imgGaps,
            content: "85% of students struggle not because they lack intelligence, but because they have 'invisible gaps'. A student might be in 10th grade but still operating with 7th-grade math fundamentals. We diagnose these gaps instantly."
        },
        attention: {
            title: "1-on-1 Attention Needed",
            icon: "👩‍🏫",
            image: imgAttention,
            content: "Every student learns differently. A generic lesson plan fails to address personal blind spots. Our framework ensures that every student gets dedicated 1-on-1 time with an expert teacher to solve their unique doubts."
        },
        anxiety: {
            title: "Maths Anxiety",
            icon: "😰",
            image: imgAnxiety,
            content: "Repeated failure breeds fear. Maths anxiety can physically block a student's working memory during an exam. By securing their foundation, we replace fear with confidence and logical clarity."
        },
        limit: {
            title: "The Classroom Limit",
            icon: "🏫",
            image: imgLimit,
            content: "A school teacher with 40 students is bound by a strict syllabus and timeline. They physically cannot pause the entire class to fix a foundational gap for one student. Our program acts as the ultimate supplement to school learning."
        }
    };
    return (
        <section id="struggle" className="about scroll-reveal" style={{ padding: '70px 0', background: 'var(--card)' }}>
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', padding: '6px 16px', borderRadius: '100px', fontWeight: '700' }}>The Root Cause</span>
                    <h2 className="sec-h" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--tx)' }}>Why Students Struggle With Mathematics</h2>
                    <p className="sec-p" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--mu)' }}>
                        It's rarely a lack of ability. Most students struggle because of unaddressed learning gaps from previous grades. When foundational concepts are missed, anxiety builds.
                    </p>
                </div>

                <style>
                    {`
                    .struggle-card {
                        text-decoration: none;
                        display: flex;
                        flex-direction: column;
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
                    }
                    .struggle-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 40px rgba(30,122,82,0.12) !important;
                        border-color: var(--brand) !important;
                    }
                    `}
                </style>

                <div className="bento-grid mt-4">
                    <button onClick={() => setActiveModal('trap')} className="bento-card bento-main scroll-reveal-child struggle-card" style={{ background: 'var(--wh)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'left', cursor: 'pointer' }}>
                        <div className="bento-icon" style={{ background: 'rgba(30,122,82,0.08)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', fontSize: '2rem' }}>⚠️</div>
                        <h3 style={{ fontSize: '1.3rem', marginTop: '24px', marginBottom: '12px', color: 'var(--tx)' }}>The Foundation Trap</h3>
                        <p style={{ color: 'var(--mu)', fontSize: '1rem', lineHeight: '1.5' }}>Maths is cumulative. If a student misses a core concept in Grade 6, they will invariably struggle with advanced applications in Grade 9. These invisible gaps create a cycle of frustration.</p>
                        <div className="bento-badge" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', marginTop: '24px' }}>Learn More →</div>
                    </button>

                    <button onClick={() => setActiveModal('gaps')} className="bento-card bento-stat scroll-reveal-child delay-1 struggle-card" style={{ background: 'var(--brand)', color: 'var(--card)', border: '1px solid transparent', boxShadow: '0 10px 30px rgba(30,122,82,0.2)', cursor: 'pointer' }}>
                        <div className="bento-val" style={{ color: 'var(--card)' }}>85%</div>
                        <div className="bento-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Students have invisible learning gaps <br/><br/><span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Read Why →</span></div>
                    </button>

                    <button onClick={() => setActiveModal('attention')} className="bento-card bento-stat bento-alt scroll-reveal-child delay-2 struggle-card" style={{ background: 'var(--dk)', color: 'var(--card)', border: '1px solid transparent', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', cursor: 'pointer' }}>
                        <div className="bento-val" style={{ color: 'var(--card)' }}>1:1</div>
                        <div className="bento-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Attention needed to fix them <br/><br/><span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Our Solution →</span></div>
                    </button>

                    <button onClick={() => setActiveModal('anxiety')} className="bento-card scroll-reveal-child delay-3 struggle-card" style={{ background: 'var(--wh)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                        <div className="bento-icon" style={{ background: 'rgba(30,122,82,0.08)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', fontSize: '2rem' }}>😰</div>
                        <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '8px', color: 'var(--tx)' }}>Maths Anxiety</h3>
                        <p style={{ color: 'var(--mu)', fontSize: '0.95rem', lineHeight: '1.5' }}>Constant poor performance leads to a deep fear of numbers.</p>
                        <div style={{ color: 'var(--brand)', fontSize: '0.85rem', fontWeight: 'bold', marginTop: 'auto', paddingTop: '12px' }}>How to overcome it →</div>
                    </button>

                    <button onClick={() => setActiveModal('limit')} className="bento-card scroll-reveal-child delay-4 struggle-card" style={{ background: 'var(--wh)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                        <div className="bento-icon" style={{ background: 'rgba(30,122,82,0.08)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', fontSize: '2rem' }}>🏫</div>
                        <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '8px', color: 'var(--tx)' }}>The Classroom Limit</h3>
                        <p style={{ color: 'var(--mu)', fontSize: '0.95rem', lineHeight: '1.5' }}>A teacher with 40 students cannot go back to fix foundational gaps.</p>
                        <div style={{ color: 'var(--brand)', fontSize: '0.85rem', fontWeight: 'bold', marginTop: 'auto', paddingTop: '12px' }}>Why schools aren't enough →</div>
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {activeModal && createPortal(
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setActiveModal(null)}>
                    <div style={{ background: 'var(--wh)', borderRadius: '24px', maxWidth: '800px', width: '100%', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', display: 'flex', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.05)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 10 }}>×</button>
                        
                        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', background: 'var(--deep-forest)', minHeight: '300px', position: 'relative' }}>
                            <img src={modalData[activeModal].image} alt={modalData[activeModal].title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                            <div style={{ position: 'absolute', bottom: '24px', left: '24px', fontSize: '3rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '12px', borderRadius: '16px' }}>{modalData[activeModal].icon}</div>
                        </div>

                        <div style={{ flex: '1.2', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--hd)' }}>{modalData[activeModal].title}</h3>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--tx)', marginBottom: '32px' }}>{modalData[activeModal].content}</p>
                            <a href="#maths-register" onClick={() => setActiveModal(null)} className="btn-main" style={{ width: '100%', justifyContent: 'center' }}>Solve This Now</a>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
