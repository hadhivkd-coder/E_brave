import React from 'react';

const universities = [
    { name: "IIT Madras", location: "Chennai" },
    { name: "AIIMS", location: "New Delhi" },
    { name: "NIT Calicut", location: "Kerala" },
    { name: "CUSAT", location: "Kerala" },
    { name: "IIM Kozhikode", location: "Kerala" },
    { name: "KEAM Top Rank", location: "Kerala" },
    { name: "LSE", location: "London" },
    { name: "BITS Pilani", location: "Rajasthan" },
    { name: "Indian Naval Academy", location: "Kerala" },
    { name: "DU", location: "Delhi" },
    { name: "Amrita University", location: "Coimbatore" },
    { name: "SCMS", location: "Kerala" }
];

export default function PrestigeTicker() {
    return (
        <div className="prestige-ticker-container">
            <div className="ticker-label">OUR STUDENTS AT TOP DESTINATIONS:</div>
            <div className="ticker-wrapper">
                <div className="ticker-track">
                    {/* First instance of list */}
                    {universities.map((uni, i) => (
                        <div key={i} className="ticker-item">
                            <span className="uni-name">{uni.name}</span>
                            <span className="uni-loc">{uni.location}</span>
                            <span className="ticker-sep">•</span>
                        </div>
                    ))}
                    {/* Second instance for seamless loop */}
                    {universities.map((uni, i) => (
                        <div key={`dup-${i}`} className="ticker-item">
                            <span className="uni-name">{uni.name}</span>
                            <span className="uni-loc">{uni.location}</span>
                            <span className="ticker-sep">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
