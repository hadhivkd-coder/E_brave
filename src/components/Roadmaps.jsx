import React from 'react';

export default function Roadmaps() {
    return (
        <section id="roadmaps" className="roadmaps scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">Expert Roadmaps</span>
                    <h2 className="sec-h">Your Path to Excellence</h2>
                    <p className="sec-p">Whether you're aiming for IIT or AIIMS, a structured approach is the key. Here is how we help you conquer the toughest entrances.</p>
                </div>

                <div className="roadmaps-container mt-4">
                    {/* JEE ROADMAP */}
                    <div className="roadmap-box scroll-reveal-child">
                        <div className="roadmap-header roadmap-header--jee">
                            <div className="roadmap-icon">⚙️</div>
                            <h3>JEE Roadmap <span>(Engineering)</span></h3>
                        </div>
                        <div className="roadmap-steps">
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 1: Foundation (Class 8-10)</h4>
                                    <p>Mastering core mathematics and logical reasoning. Developing curiosity for how physical systems work.</p>
                                </div>
                            </div>
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 2: Transition (Class 11)</h4>
                                    <p>In-depth Physics, Chemistry, and Advanced Math. Building the stamina for 6-hour problem-solving sessions.</p>
                                </div>
                            </div>
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 3: Precision (Class 12)</h4>
                                    <p>Solving previous year papers under timed conditions. Focus on accuracy and speed for JEE Main & Advanced.</p>
                                </div>
                            </div>
                            <div className="rm-step rm-step--goal">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>The Goal: Top IITs & NITs</h4>
                                    <p>Final polishing and mental conditioning for the big day.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEET ROADMAP */}
                    <div className="roadmap-box scroll-reveal-child delay-2">
                        <div className="roadmap-header roadmap-header--neet">
                            <div className="roadmap-icon">🩺</div>
                            <h3>NEET Roadmap <span>(Medical)</span></h3>
                        </div>
                        <div className="roadmap-steps">
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 1: Concepts (Class 8-10)</h4>
                                    <p>Building a deep love for Biology and understanding fundamental Chemistry reactions.</p>
                                </div>
                            </div>
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 2: Mastery (Class 11)</h4>
                                    <p>NCERT biology line-by-line mastery. Getting comfortable with Physics numericals from a medical perspective.</p>
                                </div>
                            </div>
                            <div className="rm-step">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>Phase 3: Drills (Class 12)</h4>
                                    <p>Repeated revisions of NCERT. Daily mock tests to hit the 180-question-in-3-hours sweet spot.</p>
                                </div>
                            </div>
                            <div className="rm-step rm-step--goal">
                                <div className="rm-dot"></div>
                                <div className="rm-content">
                                    <h4>The Goal: AIIMS & Government GMCs</h4>
                                    <p>Achieving the perfect score for a secure medical career.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="roadmap-footer scroll-reveal-child delay-3">
                    <p>Not sure which one is right for you? Our <strong>Psychometric Tests</strong> analyze your aptitude for both paths.</p>
                    <a href="#register" className="btn-main">Get Your Personalized Roadmap</a>
                </div>
            </div>
        </section>
    );
}
