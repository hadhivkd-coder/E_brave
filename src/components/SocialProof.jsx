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

    const showToast = () => {
        const person = names[Math.floor(Math.random() * names.length)];
        setToast({ ...person, time: timeAgo() });
        setVisible(true);
    };

    useEffect(() => {
        // Start after 6 seconds
        const initialDelay = setTimeout(() => showToast(), 6000);

        return () => clearTimeout(initialDelay);
    }, []);

    useEffect(() => {
        if (visible) {
            const hideDelay = setTimeout(() => {
                setVisible(false);
            }, 5000); // stay visible for 5s

            return () => clearTimeout(hideDelay);
        } else if (toast) {
            // Next popup in 10-25 seconds
            const nextDelay = setTimeout(() => {
                showToast();
            }, Math.random() * 15000 + 10000);

            return () => clearTimeout(nextDelay);
        }
    }, [visible, toast]);

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
