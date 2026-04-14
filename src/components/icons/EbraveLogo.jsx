import React from 'react';

/**
 * E-Brave Official Logo Component (V4 — Pure SVG Vector)
 * Completely hand-coded to exactly match the E-Brave branding
 * Graduation Cap, Open Book, Stylized 'e', and swoosh.
 * Uses currentColor to blend seamlessly anywhere without backgrounds!
 */
export const EbraveLogo = ({ width = 120, height = 120, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 200 200" 
        width={width} 
        height={height} 
        className={className}
        fill="#ffffff"
    >
        {/* Graduation Cap */}
        <path d="M100 35 L150 50 L100 65 L50 50 Z" />
        {/* Tassel */}
        <path d="M148 50 V68" stroke="#ffffff" strokeWidth="5" fill="none" />
        <circle cx="148" cy="72" r="4" />
        {/* Cap Base */}
        <path d="M75 58 L75 68 Q100 78 125 68 L125 58" stroke="#ffffff" strokeWidth="14" fill="none" />

        {/* Open Book */}
        <path d="M100 78 Q60 58 20 75 L28 85 Q70 65 100 86 Q130 65 172 85 L180 75 Q140 58 100 78 Z" />
        
        {/* Swoosh Underneath */}
        <path d="M30 145 Q100 210 180 120 Q110 185 30 145 Z" />

        {/* Stylized 'e' */}
        <text 
            x="96" 
            y="152" 
            fontFamily="Arial, Helvetica, sans-serif" 
            fontSize="100" 
            fontWeight="900" 
            fontStyle="italic"
            textAnchor="middle"
        >
            e
        </text>
    </svg>
);

export default EbraveLogo;
