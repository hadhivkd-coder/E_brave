import React, { useState, useEffect } from 'react';
import EbraveLogo from './icons/EbraveLogo';

export default function Navbar({ registrationsList }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('ebrave-theme') === 'dark' ||
                (!localStorage.getItem('ebrave-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('ebrave-theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on link click
    const closeMenu = () => setMenuOpen(false);

    const waNum = import.meta.env.VITE_WA_NUMBER || '919605001733';

    const downloadCSV = () => {
        if (!registrationsList.length) return;
        const header = 'Name,Phone,Education,Problems,Date\n';
        const rows = registrationsList.map(r =>
            `"${r.name}","${r.phone}","${r.education}","${r.problems}","${r.date}"`
        ).join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'ebrave_registrations.csv'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <nav className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
                <a href="#" className="nav-brand" aria-label="E-Brave Home">
                    <div className="nav-logo-img" aria-hidden="true">
                        <EbraveLogo width={28} height={28} />
                    </div>
                    <span className="nav-name">E-<em>Brave</em></span>
                </a>

                {/* Desktop nav links */}
                <ul className="nav-links" role="list">
                    <li><a href="#about">About</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#experts">Experts</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>

                <div className="nav-r">
                    {/* Dark mode toggle */}
                    <button
                        className="dark-toggle"
                        onClick={() => setDark(d => !d)}
                        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={dark ? 'Light mode' : 'Dark mode'}
                    >
                        {dark ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                            </svg>
                        )}
                    </button>

                    {registrationsList.length > 0 && (
                        <button className="btn-admin" onClick={downloadCSV} aria-label="Download CSV of registrations">
                            ↓ CSV ({registrationsList.length})
                        </button>
                    )}

                    <a href={`https://wa.me/${waNum}`} className="nav-wa" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.1.541 4.12 1.586 5.9L.057 24l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.011-1.376l-.36-.213-3.7.97 1.003-3.612-.235-.373A9.818 9.818 0 1112 21.818z"/></svg>
                        WhatsApp Us
                    </a>

                    {/* Hamburger */}
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                id="mobile-menu"
                className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
                role="dialog"
                aria-label="Mobile navigation"
                aria-modal="true"
            >
                <div className="mobile-menu-inner">
                    <ul className="mobile-nav-links" role="list">
                        {[
                            ['#about', 'About'],
                            ['#how-it-works', 'How It Works'],
                            ['#experts', 'Our Experts'],
                            ['#pricing', 'Pricing'],
                            ['#reviews', 'Reviews'],
                            ['#faq', 'FAQ'],
                            ['#resources', 'Free Guides'],
                        ].map(([href, label]) => (
                            <li key={href}><a href={href} onClick={closeMenu}>{label}</a></li>
                        ))}
                    </ul>
                    <a href={`https://wa.me/${waNum}`} className="btn-main mobile-cta" onClick={closeMenu}
                        target="_blank" rel="noopener noreferrer">
                        Book a Session on WhatsApp
                    </a>
                </div>
            </div>
            {menuOpen && <div className="mobile-overlay" onClick={closeMenu} aria-hidden="true"></div>}
        </>
    );
}
