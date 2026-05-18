import React, { useState } from 'react';

export default function VideoSection() {
    const [activeVideo, setActiveVideo] = useState(null); // 'vid1', 'vid2', 'vid3' or null

    const playVideo = (id) => {
        setActiveVideo(id);
    };

    return (
        <section className="video-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">See Us In Action</span>
                    <h2 className="sec-h">Experience the E-Brave Difference</h2>
                    <p className="sec-p">Watch our quick portrait guides to see how our expert counseling and psychometric tests set you up for success.</p>
                </div>
                
                <div className="portrait-video-grid scroll-reveal-child delay-2">
                    {/* Portrait Video 1 */}
                    <div className="portrait-video-card" onClick={() => playVideo('vid1')}>
                        <div className="portrait-video-wrapper">
                            {activeVideo === 'vid1' ? (
                                <iframe 
                                    src="https://drive.google.com/file/d/1Z6SGOO4cGTCy3I9s6PNXZobEkQRKgr-W/preview?autoplay=1" 
                                    className="portrait-video-element"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{ border: 'none', width: '100%', height: '100%', borderRadius: '30px' }}
                                    title="Student Success Story"
                                ></iframe>
                            ) : (
                                <div className="video-overlay-ui">
                                    <div className="play-button-overlay">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="video-text-fallback">Student Success Story</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Portrait Video 2 */}
                    <div className="portrait-video-card" onClick={() => playVideo('vid2')}>
                        <div className="portrait-video-wrapper">
                            {activeVideo === 'vid2' ? (
                                <iframe 
                                    src="https://drive.google.com/file/d/1bfLT4XqPbPzSzIU1R7igbKx8gKZqI40Z/preview?autoplay=1" 
                                    className="portrait-video-element"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{ border: 'none', width: '100%', height: '100%', borderRadius: '30px' }}
                                    title="Counselor Walkthrough"
                                ></iframe>
                            ) : (
                                <div className="video-overlay-ui">
                                    <div className="play-button-overlay">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="video-text-fallback">Counselor Walkthrough</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Portrait Video 3 */}
                    <div className="portrait-video-card" onClick={() => playVideo('vid3')}>
                        <div className="portrait-video-wrapper">
                            {activeVideo === 'vid3' ? (
                                <iframe 
                                    src="https://drive.google.com/file/d/1Z6SGOO4cGTCy3I9s6PNXZobEkQRKgr-W/preview?autoplay=1" 
                                    className="portrait-video-element"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    style={{ border: 'none', width: '100%', height: '100%', borderRadius: '30px' }}
                                    title="Assessment Demo"
                                ></iframe>
                            ) : (
                                <div className="video-overlay-ui">
                                    <div className="play-button-overlay">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="video-text-fallback">Assessment Demo</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
