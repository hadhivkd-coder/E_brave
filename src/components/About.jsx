import React from 'react';

export default function About() {
    return (
        <section id="about" className="about scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">The Science of Success</span>
                    <h2 className="sec-h">Why E-Brave Is Your Best Choice</h2>
                    <p className="sec-p">We combine deep psychological insights with modern technology to provide 
                        unmatched clarity in career selection.</p>
                </div>

                <div className="bento-grid mt-4">
                    <div className="bento-card bento-main scroll-reveal-child">
                        <div className="bento-icon">🔬</div>
                        <h3>Scientific Career Mapping</h3>
                        <p>Our proprietary 5-point psychometric algorithm analyzes aptitude, interest, personality, and values to find your perfect fit.</p>
                        <div className="bento-badge">99.8% Accuracy</div>
                    </div>

                    <div className="bento-card bento-stat scroll-reveal-child delay-1">
                        <div className="bento-val">10k+</div>
                        <div className="bento-label">Students Guided</div>
                    </div>

                    <div className="bento-card bento-stat bento-alt scroll-reveal-child delay-2">
                        <div className="bento-val">200+</div>
                        <div className="bento-label">Career Streams</div>
                    </div>

                    <div className="bento-card bento-feature scroll-reveal-child delay-3">
                        <div className="bento-icon">🤝</div>
                        <h3>Expert 1-on-1 Sessions</h3>
                        <p>No generic advice. Every session is deeply personalized to your unique situation and family goals.</p>
                    </div>

                    <div className="bento-card bento-mini scroll-reveal-child delay-4">
                        <div className="bento-icon">🎓</div>
                        <h3>University Placement</h3>
                        <p>From IITs to Ivy Leagues, we help you reach the top.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
