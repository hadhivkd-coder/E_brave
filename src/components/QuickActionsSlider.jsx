import React from 'react';

export default function QuickActionsSlider() {
    const actions = [
        { title: "Book Consultation", icon: "🗓️", link: "#book-consultation" },
        { title: "Talk To AI Counselor", icon: "🤖", link: "#ai-coach" },
        { title: "Take Career Assessment", icon: "📊", link: "/student/assessment" },
        { title: "Explore E-Brave Compass", icon: "🧭", link: "/compass/" }
    ];

    return (
        <section className="quick-actions-section" style={{ padding: '60px 0', background: 'var(--wh)' }}>
            <div className="sw">
                <style>
                    {`
                    .qa-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 24px;
                        width: 100%;
                    }
                    .qa-card {
                        background: var(--card);
                        border: 1px solid rgba(0, 0, 0, 0.06);
                        border-radius: 16px;
                        padding: 24px;
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        text-decoration: none;
                        color: var(--tx);
                        transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                    }
                    .qa-card:hover {
                        transform: translateY(-6px);
                        border-color: var(--brand);
                        box-shadow: 0 15px 35px rgba(30, 122, 82, 0.1);
                    }
                    .qa-icon {
                        font-size: 1.5rem;
                        background: rgba(30, 122, 82, 0.08);
                        width: 54px; height: 54px;
                        display: flex; align-items: center; justify-content: center;
                        border-radius: 12px;
                    }
                    .qa-title {
                        font-family: 'Plus Jakarta Sans', sans-serif;
                        font-weight: 700;
                        font-size: 1.05rem;
                    }
                    `}
                </style>

                <div className="qa-grid">
                    {actions.map((action, i) => (
                        <a href={action.link} key={i} className="qa-card">
                            <div className="qa-icon rotate-icon-hover">{action.icon}</div>
                            <div className="qa-title">{action.title}</div>
                            <svg viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" width="18" height="18" style={{ marginLeft: 'auto', opacity: 0.8 }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
