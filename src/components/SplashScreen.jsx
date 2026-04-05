import React, { useEffect, useState } from 'react';
import EbraveLogo from './icons/EbraveLogo';

export default function SplashScreen() {
    const [hidden, setHidden] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
        const hideTimer = setTimeout(() => setHidden(true), 2500);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (hidden) return null;

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <div className="splash-logo">
                    <EbraveLogo width={80} height={80} />
                </div>
                <div className="splash-text">
                    <span className="splash-brand">E-Brave</span>
                    <span className="splash-sub">Career Council</span>
                </div>
                <div className="splash-loader">
                    <div className="splash-bar"></div>
                </div>
            </div>
        </div>
    );
}
