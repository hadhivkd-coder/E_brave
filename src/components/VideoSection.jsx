import React from 'react';

export default function VideoSection() {
    return (
        <section className="video-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">See Us In Action</span>
                    <h2 className="sec-h">Experience the E-Brave Difference</h2>
                    <p className="sec-p">Watch our introductory video to understand how our unique psychometric profiling guarantees your career absolute absolute clarity.</p>
                </div>
                
                <div className="video-container mt-4 scroll-reveal-child delay-2">
                    {/* Placeholder for future video. When you have the video, replace the div below with an iframe or video tag */}
                    <div className="interactive-video-placeholder">
                        <div className="play-button-overlay">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="video-text-fallback">Premium Video Coming Soon</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
