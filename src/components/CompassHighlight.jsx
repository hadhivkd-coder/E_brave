import React from 'react';

export default function CompassHighlight() {
    return (
        <section className="compass-highlight" style={{ padding: '6rem 0', background: '#E6F0E2', color: '#0c2016', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
                
                {/* Text Content */}
                <div style={{ flex: '1 1 500px' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(46, 107, 58, 0.1)', color: '#2E6B3A', padding: '6px 16px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', marginBottom: '1.5rem' }}>
                        FOR SCHOOLS & INSTITUTIONS
                    </div>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.2' }}>
                        Introducing <br />
                        <span style={{ color: '#2E6B3A' }}>E-Brave Compass</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(12, 32, 22, 0.75)', lineHeight: '1.8', marginBottom: '2rem' }}>
                        A structured, institutional-grade program designed to help students gain clarity, confidence, and direction. E-Brave Compass partners with schools to deliver career discovery, aptitude testing, and expert counseling at scale.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Bulk enrollment for 100+ students', 'Customized progress reports', 'Parent communication sessions'].map((feature, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }}>
                                <div style={{ width: '24px', height: '24px', background: '#3AB562', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <a href="/compass/" style={{ display: 'inline-block', background: '#0c2016', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 10px 30px rgba(12,32,22,0.2)' }}>
                        Discover E-Brave Compass &rarr;
                    </a>
                </div>

                {/* Visual */}
                <div style={{ flex: '1 1 400px', background: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(46,107,58,0.1)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(58,181,98,0.1)', color: '#3AB562', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>4-Step Framework</h3>
                            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', lineHeight: '1.5' }}>Discover, Explore, Plan, and Grow through our proven methodology.</p>
                        </div>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)', margin: '1.5rem 0' }}></div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', background: 'rgba(58,181,98,0.1)', color: '#3AB562', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 8v8"/></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>Scalable Impact</h3>
                            <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', lineHeight: '1.5' }}>Designed specifically for institutions looking to provide true value.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
