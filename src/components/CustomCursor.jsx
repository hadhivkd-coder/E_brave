import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => {
            const targets = document.querySelectorAll('a, button, input, select, textarea');
            targets.forEach(t => {
                t.addEventListener('mouseenter', () => setIsHovering(true));
                t.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div 
            className={`custom-cursor ${isHovering ? 'hover' : ''}`}
            style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px`
            }}
        >
            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>
        </div>
    );
}
