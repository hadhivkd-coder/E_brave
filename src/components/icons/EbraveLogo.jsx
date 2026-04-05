import React from 'react';

/**
 * E-Brave Official Logo Component (V3 — Linked to File)
 * This component now references the physical logo file in /public,
 * allowing the user to simply swap public/logo.svg or public/logo.png
 * to update branding across the entire site.
 */
export const EbraveLogo = ({ width = 120, height = 120, className = "" }) => (
    <img 
        src="/logo.svg" 
        alt="E-Brave Logo" 
        width={width} 
        height={height} 
        className={className} 
        style={{ objectFit: 'contain' }}
        onError={(e) => {
            // Fallback to .png if .svg is missing (optional safety)
            e.target.src = "/logo.png";
        }}
    />
);

export default EbraveLogo;
