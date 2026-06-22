import React from 'react';

export default function About() {
    return (
        <section id="about" className="about scroll-reveal" style={{ padding: '70px 0', background: 'var(--lk)' }}>
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', padding: '6px 16px', borderRadius: '100px', fontWeight: '700' }}>Our Mission</span>
                    <h2 className="sec-h" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--tx)' }}>Beyond Just Mathematics</h2>
                    <p className="sec-p" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--mu)' }}>
                        E-Brave is not a tuition center. We are a comprehensive Student Growth Platform dedicated to transforming fear into fearless capability.
                    </p>
                </div>

                <div className="bento-grid mt-4">
                    <div className="bento-card bento-main scroll-reveal-child" style={{ background: 'var(--dk)', color: 'var(--wh)', padding: '40px', borderRadius: '24px' }}>
                        <div className="bento-icon" style={{ fontSize: '3rem', marginBottom: '20px' }}>🌟</div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--wh)' }}>Building Resilient Learners</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '1.05rem' }}>
                            We realized that students don't hate learning; they hate feeling stuck. By diagnosing foundational gaps and providing expert 1-on-1 mentorship, we don't just teach mathematics—we teach students how to overcome intellectual obstacles, a skill they carry for life.
                        </p>
                        <div className="bento-badge" style={{ marginTop: '24px', background: 'rgba(255,255,255,0.1)', color: 'var(--accent)', display: 'inline-block', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>E-Brave Philosophy</div>
                    </div>

                    <div className="bento-card bento-stat scroll-reveal-child delay-1" style={{ background: 'var(--brand)', color: 'var(--wh)', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="bento-val" style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--wh)' }}>500+</div>
                        <div className="bento-label" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Students Transformed</div>
                    </div>

                    <div className="bento-card bento-stat bento-alt scroll-reveal-child delay-2" style={{ background: 'var(--wh)', color: 'var(--tx)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="bento-val" style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--dk)' }}>100%</div>
                        <div className="bento-label" style={{ color: 'var(--mu)', fontSize: '1.1rem' }}>Focus on Fundamentals</div>
                    </div>

                    <div className="bento-card scroll-reveal-child delay-3" style={{ background: 'var(--wh)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px' }}>
                        <div className="bento-icon" style={{ fontSize: '2rem', marginBottom: '16px' }}>🤝</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--tx)' }}>Expert Mentorship</h3>
                        <p style={{ color: 'var(--mu)', lineHeight: '1.5' }}>Our teachers are trained to be empathetic mentors, understanding the psychological blocks behind learning difficulties.</p>
                    </div>

                    <div className="bento-card scroll-reveal-child delay-4" style={{ background: 'var(--wh)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '32px' }}>
                        <div className="bento-icon" style={{ fontSize: '2rem', marginBottom: '16px' }}>🧭</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--tx)' }}>Holistic Guidance</h3>
                        <p style={{ color: 'var(--mu)', lineHeight: '1.5' }}>From mathematical foundations to future career roadmaps, we guide the entire academic journey.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
