import React, { useEffect, useState } from 'react';

const names = [
    { name: "Arjun M.", city: "Kochi" },
    { name: "Sneha R.", city: "Trivandrum" },
    { name: "Vishnu K.", city: "Kozhikode" },
    { name: "Amina S.", city: "Malappuram" },
    { name: "Arun P.", city: "Thrissur" },
    { name: "Devika N.", city: "Kannur" },
    { name: "Rahul T.", city: "Ernakulam" },
    { name: "Gayathri V.", city: "Palakkad" },
    { name: "Nandhu B.", city: "Kollam" },
    { name: "Fathima J.", city: "Alappuzha" },
    { name: "Hafiz K.", city: "Wayanad" },
    { name: "Priya M.", city: "Kasaragod" }
];

const timeAgo = () => {
    const mins = Math.floor(Math.random() * 12) + 1;
    return mins === 1 ? '1 minute ago' : `${mins} minutes ago`;
};

export default function SocialProof() {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Start after 6 seconds
        const initialDelay = setTimeout(() => showToast(), 6000);

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        if (!toast) return;
        // Show for 5 seconds, then hide, then show next after 12 seconds
        const hideTimer = setTimeout(() => setVisible(false), 5000);
        const nextTimer = setTimeout(() => showToast(), 120000); // 2 minutes

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(nextTimer);
        };
    }, [toast]);

    const showToast = () => {
        const person = names[Math.floor(Math.random() * names.length)];
        setToast({ ...person, time: timeAgo() });
        setVisible(true);
    };

    if (!toast) return null;

    return (
        <div className={`social-proof-toast ${visible ? 'show' : ''}`}>
            <div className="sp-icon">🎉</div>
            <div className="sp-content">
                <div className="sp-name">{toast.name} from {toast.city}</div>
                <div className="sp-action">just registered — {toast.time}</div>
            </div>
            <button className="sp-close" onClick={() => setVisible(false)} aria-label="Close">&times;</button>
        </div>
    );
}
