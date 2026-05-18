import React, { useRef, useState } from 'react';

export default function VideoSection() {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const videoRef3 = useRef(null);
    const [isPlaying1, setIsPlaying1] = useState(false);
    const [isPlaying2, setIsPlaying2] = useState(false);
    const [isPlaying3, setIsPlaying3] = useState(false);

    const togglePlay1 = () => {
        if (videoRef1.current) {
            if (isPlaying1) {
                videoRef1.current.pause();
                setIsPlaying1(false);
            } else {
                videoRef1.current.play().catch(err => console.log("Video 1 pending: ", err));
                setIsPlaying1(true);
            }
        }
    };

    const togglePlay2 = () => {
        if (videoRef2.current) {
            if (isPlaying2) {
                videoRef2.current.pause();
                setIsPlaying2(false);
            } else {
                videoRef2.current.play().catch(err => console.log("Video 2 pending: ", err));
                setIsPlaying2(true);
            }
        }
    };

    const togglePlay3 = () => {
        if (videoRef3.current) {
            if (isPlaying3) {
                videoRef3.current.pause();
                setIsPlaying3(false);
            } else {
                videoRef3.current.play().catch(err => console.log("Video 3 pending: ", err));
                setIsPlaying3(true);
            }
        }
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
                    <div className="portrait-video-card" onClick={togglePlay1}>
                        <div className="portrait-video-wrapper">
                            <video 
                                ref={videoRef1}
                                src="/videos/portrait-video-1.mp4" 
                                className="portrait-video-element"
                                playsInline
                                loop
                                controls={isPlaying1}
                                onClick={(e) => e.stopPropagation()} // Let native controls work without triggering togglePlay1
                                onPlay={() => setIsPlaying1(true)}
                                onPause={() => setIsPlaying1(false)}
                            />
                            {!isPlaying1 && (
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
                    <div className="portrait-video-card" onClick={togglePlay2}>
                        <div className="portrait-video-wrapper">
                            <video 
                                ref={videoRef2}
                                src="/videos/portrait-video-2.mp4" 
                                className="portrait-video-element"
                                playsInline
                                loop
                                controls={isPlaying2}
                                onClick={(e) => e.stopPropagation()} // Let native controls work without triggering togglePlay2
                                onPlay={() => setIsPlaying2(true)}
                                onPause={() => setIsPlaying2(false)}
                            />
                            {!isPlaying2 && (
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
                    <div className="portrait-video-card" onClick={togglePlay3}>
                        <div className="portrait-video-wrapper">
                            <video 
                                ref={videoRef3}
                                src="/videos/portrait-video-3.mp4" 
                                className="portrait-video-element"
                                playsInline
                                loop
                                controls={isPlaying3}
                                onClick={(e) => e.stopPropagation()} // Let native controls work without triggering togglePlay3
                                onPlay={() => setIsPlaying3(true)}
                                onPause={() => setIsPlaying3(false)}
                            />
                            {!isPlaying3 && (
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
