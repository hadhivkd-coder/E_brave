import React, { useEffect, useState } from 'react';

export default function ExitIntent() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        const handleMouseLeave = (e) => {
            // Only trigger when mouse leaves from the top of the page
            if (e.clientY <= 5 && !dismissed) {
                setShow(true);
            }
        };

        // Wait 10 seconds before arming the exit intent
        const armTimer = setTimeout(() => {
            document.addEventListener('mouseleave', handleMouseLeave);
        }, 10000);

        return () => {
            clearTimeout(armTimer);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [dismissed]);

    const dismiss = () => {
        setShow(false);
        setDismissed(true);
    };

    if (!show) return null;

    return (
        <div className="exit-overlay" onClick={dismiss}>
            <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
                <button className="exit-close" onClick={dismiss}>&times;</button>
                <div className="exit-emoji">🎯</div>
                <h3 className="exit-title">Wait! Don't Leave Without Your Free Career Clarity Session</h3>
                <p className="exit-text">
                    Over <strong>500+ students from Kerala</strong> discovered their ideal career path this month alone. 
                    Your future is just one conversation away.
                </p>
                <a href="#register" className="btn-main exit-cta" onClick={dismiss}>
                    Yes, I Want Free Guidance →
                </a>
                <button className="exit-skip" onClick={dismiss}>No thanks, I'll figure it out myself</button>
            </div>
        </div>
    );
}
