import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function DynamicRegistrationModal({ isOpen, serviceTitle, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        grade: '10',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            if (onSubmit) onSubmit({ ...formData, service: serviceTitle });
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 3000);
        }, 1200);
    };

    return createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
            <div style={{ background: 'var(--wh)', borderRadius: '24px', maxWidth: '500px', width: '100%', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', padding: '40px' }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.05)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', zIndex: 10 }}>×</button>
                
                {success ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--hd)', marginBottom: '12px', fontWeight: '700' }}>Request Received!</h3>
                        <p style={{ color: 'var(--mu)', fontSize: '1.1rem' }}>Our team will contact you regarding {serviceTitle} shortly.</p>
                    </div>
                ) : (
                    <>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--hd)' }}>Register for {serviceTitle}</h3>
                        <p style={{ fontSize: '1.05rem', color: 'var(--mu)', marginBottom: '32px' }}>Fill out your details to begin your journey.</p>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--tx)' }}>Student Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--card)', fontSize: '1rem', color: 'var(--tx)' }} placeholder="Enter student name" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--tx)' }}>Email</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--card)', fontSize: '1rem', color: 'var(--tx)' }} placeholder="Email address" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--tx)' }}>Phone</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--card)', fontSize: '1rem', color: 'var(--tx)' }} placeholder="Phone number" />
                                </div>
                            </div>
                            <button type="submit" className="btn-main" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: '12px', opacity: submitting ? 0.7 : 1 }}>
                                {submitting ? 'Processing...' : 'Submit Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
