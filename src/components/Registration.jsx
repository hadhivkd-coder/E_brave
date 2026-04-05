import React, { useState } from 'react';

// ── Input sanitizer: strips HTML tags and trims whitespace
const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim().slice(0, 1000);

// ── Phone validator: Indian mobile numbers (6–9 start, 10 digits)
const isValidPhone = (ph) => /^[6-9]\d{9}$/.test(ph.replace(/\s/g, ''));

export default function Registration({ onRegister }) {
    const [formData, setFormData] = useState({
        name: '', phone: '', education: '', problems: '', hp_field: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        const keyMap = {
            regName: 'name', regPhone: 'phone',
            regEducation: 'education', regProblems: 'problems', regHp: 'hp_field'
        };
        const key = keyMap[id];
        if (key) setFormData(prev => ({ ...prev, [key]: value }));
        // Clear error on change
        if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
    };

    const handleBlur = (e) => {
        const { id } = e.target;
        const keyMap = { regName: 'name', regPhone: 'phone', regEducation: 'education' };
        const key = keyMap[id];
        if (key) setTouched(prev => ({ ...prev, [key]: true }));
        validateField(id, e.target.value);
    };

    const validateField = (id, value) => {
        const keyMap = { regName: 'name', regPhone: 'phone', regEducation: 'education' };
        const key = keyMap[id];
        if (!key) return true;
        let error = '';
        if (key === 'name') {
            if (!value.trim()) error = 'Full name is required';
            else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
            else if (value.trim().length > 100) error = 'Name is too long';
        }
        if (key === 'phone') {
            if (!value.trim()) error = 'Phone number is required';
            else if (!isValidPhone(value)) error = 'Enter a valid 10-digit Indian mobile number';
        }
        if (key === 'education') {
            if (!value) error = 'Please select your education level';
        }
        setErrors(prev => ({ ...prev, [key]: error }));
        return !error;
    };

    const validate = () => {
        const nameOk = validateField('regName', formData.name);
        const phoneOk = validateField('regPhone', formData.phone);
        const eduOk = validateField('regEducation', formData.education);
        setTouched({ name: true, phone: true, education: true });
        return nameOk && phoneOk && eduOk;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.hp_field !== '') return; // Honeypot bot check
        if (!validate()) return;

        setSubmitting(true);

        const newRegistration = {
            name: sanitize(formData.name),
            phone: formData.phone.replace(/\s/g, '').slice(0, 15),
            education: formData.education,
            problems: sanitize(formData.problems || 'N/A'),
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (SCRIPT_URL) {
            try {
                await fetch(SCRIPT_URL, {
                    method: 'POST', mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRegistration)
                });
            } catch (err) {
                console.error('Sheet error:', err);
            }
        }

        onRegister(newRegistration);
        setSubmitting(false);
        setFormData({ name: '', phone: '', education: '', problems: '', hp_field: '' });
        setTouched({});
        setErrors({});

        const waNum = import.meta.env.VITE_WA_NUMBER || '919605001733';
        const msg = `Hi! My name is ${newRegistration.name}. I'd like to book a career counseling session.`;
        window.location.href = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
    };

    const InputField = ({ id, label, type = 'text', required, placeholder, children }) => {
        const keyMap = { regName: 'name', regPhone: 'phone', regEducation: 'education', regProblems: 'problems' };
        const key = keyMap[id];
        const hasError = touched[key] && errors[key];
        const isValid = touched[key] && !errors[key] && formData[key];
        return (
            <div className={`input-group ${hasError ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
                <label htmlFor={id}>{label}{required && <span className="req-star">*</span>}</label>
                {children || (
                    <input type={type} id={id} placeholder={placeholder}
                        value={formData[key] || ''} onChange={handleChange} onBlur={handleBlur}
                        required={required} />
                )}
                {hasError && <span className="field-error">{errors[key]}</span>}
                {isValid && <span className="field-valid">✓</span>}
            </div>
        );
    };

    return (
        <section id="register" className="register scroll-reveal">
            <div className="sw">
                <div className="register-grid">
                    <div className="register-text scroll-reveal-child">
                        <span className="stag stag-inv">Secure Your Spot Today</span>
                        <h2 className="sec-h">Your Roadmap Starts Here</h2>
                        <p className="sec-p">We keep sessions small — <strong>15 students per week</strong> — so every student gets focused, personal guidance. Reserve your free consultation before this week's slots close.</p>

                        <div className="reg-benefits">
                            <div className="reg-benefit">
                                <div className="rb-icon">🎯</div>
                                <div><strong>Personalised Roadmap</strong><br /><span>Career path built around your unique strengths</span></div>
                            </div>
                            <div className="reg-benefit">
                                <div className="rb-icon">🧠</div>
                                <div><strong>Psychometric Assessment</strong><br /><span>Science-backed aptitude & personality test included</span></div>
                            </div>
                            <div className="reg-benefit">
                                <div className="rb-icon">🌐</div>
                                <div><strong>Bilingual Sessions</strong><br /><span>Available in Malayalam & English — your comfort first</span></div>
                            </div>
                        </div>

                        <div className="trust-badges">
                            <div className="t-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                <span>256-bit Encrypted</span>
                            </div>
                            <div className="t-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span>Data Never Shared</span>
                            </div>
                            <div className="t-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                                <span>DPDP Act Compliant</span>
                            </div>
                        </div>
                    </div>

                    <div className="register-form-box scroll-reveal-child delay-2">
                        <div className="form-header">
                            <h3>Book Your Free Consultation</h3>
                            <p>Takes less than 60 seconds · No payment required</p>
                        </div>
                        <form id="registrationForm" className="styled-form" onSubmit={handleSubmit} noValidate>
                            {/* Honeypot — hidden from real users, visible to bots */}
                            <div className="hp-field" aria-hidden="true">
                                <input type="text" id="regHp" tabIndex="-1" autoComplete="off"
                                    value={formData.hp_field} onChange={handleChange} />
                            </div>

                            <InputField id="regName" label="Full Name" required placeholder="e.g. Arun Kumar" />

                            <div className="input-row">
                                <InputField id="regPhone" label="WhatsApp Number" type="tel" required placeholder="10-digit mobile" />
                                <div className={`input-group ${touched.education && errors.education ? 'has-error' : ''} ${touched.education && !errors.education && formData.education ? 'is-valid' : ''}`}>
                                    <label htmlFor="regEducation">Current Class <span className="req-star">*</span></label>
                                    <div className="custom-select-wrapper">
                                        <select id="regEducation" required value={formData.education}
                                            onChange={handleChange}
                                            onBlur={() => { setTouched(p => ({...p, education: true})); validateField('regEducation', formData.education); }}>
                                            <option value="" disabled>Select level</option>
                                            {['Class 8','Class 9','Class 10','Class 11','Class 12','12th Pass','Graduate'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                    {touched.education && errors.education && <span className="field-error">{errors.education}</span>}
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="regProblems">Your Goal or Confusion <span className="optional-tag">(Optional)</span></label>
                                <textarea id="regProblems" rows="3"
                                    placeholder="e.g. Confused between Medicine and Engineering. Need help choosing stream after 10th…"
                                    value={formData.problems} onChange={handleChange} maxLength={1000} />
                            </div>

                            <button type="submit" className="btn-main submit-btn btn-elite-gold" disabled={submitting}>
                                <span>{submitting ? 'Booking your slot…' : 'Book My Free Consultation'}</span>
                                {!submitting && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                    </svg>
                                )}
                            </button>
                            <p className="form-note">🔒 By submitting, you agree to our <a href="#privacy" className="form-link">Privacy Policy</a>. Your data is private — we never share or spam.</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
