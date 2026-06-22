import React from 'react';

export default function FuturePrograms() {
    const programs = [
        {
            title: "Global Virtual School (2027)",
            desc: "A revolutionary, fully-accredited online school removing geographic boundaries and delivering world-class education directly to your home.",
            icon: "🌍",
            color: "var(--brand)"
        },
        {
            title: "The E-Brave Show",
            desc: "An engaging, high-production web series where students showcase their talents, debate ideas, and interact with global thought leaders.",
            icon: "🎬",
            color: "var(--accent)"
        },
        {
            title: "AI & Future Tech Courses",
            desc: "Preparing students for tomorrow with hands-on courses in Artificial Intelligence, coding, and robotics.",
            icon: "🤖",
            color: "var(--dk)"
        }
    ];

    return (
        <section id="future" className="future-programs scroll-reveal" style={{ padding: '120px 0', background: 'var(--wh)' }}>
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag" style={{ background: 'rgba(30,122,82,0.1)', color: 'var(--brand)', padding: '6px 16px', borderRadius: '100px', fontWeight: '700' }}>The Vision</span>
                    <h2 className="sec-h" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--tx)' }}>Future Programs</h2>
                    <p className="sec-p" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--mu)' }}>
                        We are building an ecosystem. Here is a glimpse of what's coming next to the E-Brave platform.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}>
                    {programs.map((prog, i) => (
                        <div key={i} className={`scroll-reveal-child delay-${i}`} style={{ background: 'var(--card)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', transition: 'transform 0.4s ease', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: prog.color }}></div>
                            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{prog.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--tx)' }}>{prog.title}</h3>
                            <p style={{ color: 'var(--mu)', lineHeight: '1.6', fontSize: '1.05rem' }}>{prog.desc}</p>
                            <div style={{ marginTop: '24px', display: 'inline-block', background: 'rgba(0,0,0,0.04)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--tx)' }}>In Development</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
