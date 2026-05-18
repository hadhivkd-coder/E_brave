import React, { useState } from 'react';

export default function AiCoach({ onRegister }) {
    const [step, setStep] = useState('register'); // 'register', 'q1', 'q2', 'q3', 'loading', 'result'
    const [formData, setFormData] = useState({ name: '', phone: '', education: '' });
    const [errors, setErrors] = useState({});
    const [answers, setAnswers] = useState({ interest: '', performance: '', confusion: '' });
    const [loadingText, setLoadingText] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('ai', '').toLowerCase();
        setFormData(p => ({ ...p, [fieldName]: value }));
        if (errors[fieldName]) setErrors(p => ({ ...p, [fieldName]: '' }));
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Full Name is required';
        if (!formData.phone.trim()) {
            errs.phone = 'WhatsApp Number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
            errs.phone = 'Please enter a valid 10-digit number';
        }
        if (!formData.education) errs.education = 'Please select your class';

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        // Save lead in admin list
        if (onRegister) {
            onRegister({
                name: formData.name,
                phone: formData.phone,
                education: formData.education,
                problems: 'Used AI Career Coach tool',
                date: new Date().toLocaleDateString()
            });
        }

        // Transition to first question
        setStep('q1');
    };

    const handleSelectOption = (field, val, nextStep) => {
        setAnswers(p => ({ ...p, [field]: val }));
        
        if (nextStep === 'loading') {
            setStep('loading');
            runAiLoader();
        } else {
            setStep(nextStep);
        }
    };

    const runAiLoader = () => {
        const texts = [
            '🧠 Analyzing cognitive preferences...',
            '📋 Mapping Kerala board stream criteria...',
            '🎯 Matching entrance exam syllabus timelines...',
            '✨ Generating your customized E-Brave roadmap...'
        ];
        let idx = 0;
        setLoadingText(texts[0]);
        const interval = setInterval(() => {
            idx++;
            if (idx < texts.length) {
                setLoadingText(texts[idx]);
            } else {
                clearInterval(interval);
                setStep('result');
            }
        }, 1200);
    };

    // Simple deterministic roadmap compiler based on selections
    const compileRoadmap = () => {
        const { interest, performance, confusion } = answers;
        let mainTrack = '';
        let exams = [];
        let details = [];

        if (interest === 'Science & Tech') {
            mainTrack = performance === 'Top Tier (>90%)' 
                ? 'Advanced Engineering & Research (IIT/IISER/IISc)'
                : 'Applied Engineering, IT, & Computing (B.Tech / BCA)';
            exams = ['JEE Advanced / Main', 'KEAM (Kerala)', 'VITEEE / BITSAT', 'CUET'];
            details = [
                'Focus on strong foundation in Physics, Chemistry, and Advanced Mathematics.',
                'Target top-tier colleges: NITs, IIITs, or top state government engineering colleges.',
                'Start mock entrance test practices at least 6 months in advance.'
            ];
        } else if (interest === 'Medical & Biology') {
            mainTrack = performance === 'Top Tier (>90%)' 
                ? 'Clinical Medicine / Dentistry (MBBS / BDS)'
                : 'Allied Health Sciences, Nursing, or Biotechnology (B.Sc / Pharm.D)';
            exams = ['NEET (UG)', 'KEAM Medical', 'CUET (Biology tracks)'];
            details = [
                'Build intense concept clarity in Botany and Zoology.',
                'If NEET is not your path, consider emerging fields like Bioinformatics or Food Tech.',
                'Ensure strong practical lab exposure and active volunteer observation.'
            ];
        } else if (interest === 'Commerce & Finance') {
            mainTrack = performance === 'Top Tier (>90%)'
                ? 'Professional Accounts & Corporate Finance (CA / CMA / Actuary)'
                : 'Business Administration & Management (BBA / B.Com)';
            exams = ['CA Foundation', 'IPMAT (IIM Indore/Rohtak)', 'CUET (Commerce/Finance)'];
            details = [
                'Focus heavily on Accountancy, Economics, and Statistics.',
                'Actuarial Science and Financial Analytics are highly lucrative options for high scorers.',
                'Target premium institutes like IIMs (5-year Integrated Program) or SRCC.'
            ];
        } else if (interest === 'Arts & Creative') {
            mainTrack = 'Design, Media, UI/UX, or Liberal Arts (B.Des / BJMC)';
            exams = ['UCEED (IIT Design)', 'NID / NIFT Entrance', 'CUET (Liberal Arts / Humanities)'];
            details = [
                'Build a strong portfolio of creative sketches, digital work, or writings.',
                'UX/UI design is currently one of the highest-paying non-coding tech fields globally.',
                'Target premium government design institutes: National Institute of Design (NID).'
            ];
        } else {
            mainTrack = 'Civil Services, Law, or International Relations (BA.LL.B / B.Sc)';
            exams = ['CLAT (Common Law Admission Test)', 'KLEE (Kerala Law Entrance)', 'CUET'];
            details = [
                'Read newspapers daily and practice logical reasoning.',
                'Law is an outstanding foundational track leading to corporate consultation or judiciary.',
                'A 5-year integrated BA.LL.B from a National Law University (NLU) is the gold standard.'
            ];
        }

        return { mainTrack, exams, details };
    };

    const roadmap = compileRoadmap();

    const getPrefilledWaMsg = () => {
        const waNum = '919544547861';
        const text = `Hi! My name is ${formData.name}. I ran the E-Brave AI Career Coach and got "${roadmap.mainTrack}". I want to book a 1-on-1 human consultation to finalize my plan!`;
        return `https://wa.me/${waNum}?text=${encodeURIComponent(text)}`;
    };

    return (
        <section id="ai-coach" className="ai-coach-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">E-Brave AI Guidance</span>
                    <h2 className="sec-h">Get Your Free AI Career Roadmap</h2>
                    <p className="sec-p">Unlock a customized stream and entrance exam roadmap built in seconds by our specialized career algorithm.</p>
                </div>

                <div className="ai-coach-container scroll-reveal-child delay-2">
                    {/* STEP 1: LEAD CAPTURE FORM */}
                    {step === 'register' && (
                        <div className="ai-form-card">
                            <div className="ai-card-badge">🔒 Locked · Register to Start</div>
                            <h3>Unlock E-Brave AI Career Planner</h3>
                            <p className="ai-form-desc">Provide your basic details so the AI can tailor the analysis and save your roadmap progress.</p>
                            
                            <form onSubmit={handleRegisterSubmit} className="ai-mini-form">
                                <div className="ai-input-group">
                                    <label htmlFor="aiName">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="aiName" 
                                        placeholder="e.g. Rahul Das" 
                                        value={formData.name} 
                                        onChange={handleChange}
                                        className={errors.name ? 'input-error' : ''}
                                    />
                                    {errors.name && <span className="ai-field-error">{errors.name}</span>}
                                </div>

                                <div className="ai-input-grid">
                                    <div className="ai-input-group">
                                        <label htmlFor="aiPhone">WhatsApp Number</label>
                                        <input 
                                            type="tel" 
                                            id="aiPhone" 
                                            placeholder="10-digit number" 
                                            value={formData.phone} 
                                            onChange={handleChange}
                                            className={errors.phone ? 'input-error' : ''}
                                        />
                                        {errors.phone && <span className="ai-field-error">{errors.phone}</span>}
                                    </div>

                                    <div className="ai-input-group">
                                        <label htmlFor="aiEducation">Current Class</label>
                                        <div className="ai-select-wrapper">
                                            <select 
                                                id="aiEducation" 
                                                value={formData.education} 
                                                onChange={handleChange}
                                                className={errors.education ? 'input-error' : ''}
                                            >
                                                <option value="" disabled>Select Class</option>
                                                {['Class 8','Class 9','Class 10','Class 11','Class 12','12th Pass','Graduate'].map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                        {errors.education && <span className="ai-field-error">{errors.education}</span>}
                                    </div>
                                </div>

                                <button type="submit" className="btn-main ai-submit-btn">
                                    Unlock AI Career Planner ⚡
                                </button>
                            </form>
                        </div>
                    )}

                    {/* STEP 2: CHOOSE INTEREST */}
                    {step === 'q1' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Online</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Hi <strong>{formData.name}</strong>! I'm ready. Let's find your perfect track. First, select your primary area of interest or favorite subject category:
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Science & Tech', '💻 Science & Engineering'],
                                        ['Medical & Biology', '🩺 Medical & Biosciences'],
                                        ['Commerce & Finance', '📊 Commerce & Business'],
                                        ['Arts & Creative', '🎨 Designing & Arts'],
                                        ['Law & Humanities', '⚖️ Law & Social Science']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('interest', val, 'q2')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: CHOOSE ACADEMIC PERFORMANCE */}
                    {step === 'q2' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Analyzing choice: {answers.interest}</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--user">
                                    My interest is in {answers.interest}.
                                </div>
                                <div className="ai-bubble ai-bubble--bot">
                                    Perfect choice. Now, let me understand your current or target academic performance level:
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Top Tier (>90%)', '🏆 High Performer (>90%)'],
                                        ['High Average (75-90%)', '📈 Good Scorer (75-90%)'],
                                        ['Moderate (60-75%)', '🎯 Average Scorer (60-75%)'],
                                        ['Passion-driven (explore)', '🌱 Passion-first (exploring)']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('performance', val, 'q3')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: CHOOSE CONFUSION */}
                    {step === 'q3' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Formulating strategy...</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--user">
                                    Target level: {answers.performance}.
                                </div>
                                <div className="ai-bubble ai-bubble--bot">
                                    Got it! Last question: What is your absolute biggest doubt or career confusion right now?
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Stream after 10th', '❓ Choosing stream after 10th'],
                                        ['Course after 12th', '🎓 Best course after 12th'],
                                        ['Entrance exam strategy', '✍️ Entrance prep strategy'],
                                        ['High-salary career options', '💼 Highest-paying career paths']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('confusion', val, 'loading')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: LOADER */}
                    {step === 'loading' && (
                        <div className="ai-loader-card">
                            <div className="ai-spinner"></div>
                            <p className="ai-loader-text">{loadingText}</p>
                        </div>
                    )}

                    {/* STEP 6: PERSONALIZED ROADMAP */}
                    {step === 'result' && (
                        <div className="ai-result-card">
                            <div className="ai-result-header">
                                <div className="ai-checkmark">⭐</div>
                                <div>
                                    <h4>AI Career Roadmap Generated</h4>
                                    <span>Custom analysis for {formData.name} ({formData.education})</span>
                                </div>
                            </div>

                            <div className="ai-result-body">
                                <div className="ai-roadmap-block">
                                    <span className="ai-roadmap-label">🎯 PRIMARY RECOMMENDATION</span>
                                    <h3 className="ai-roadmap-title">{roadmap.mainTrack}</h3>
                                </div>

                                <div className="ai-roadmap-details">
                                    <div className="ai-detail-section">
                                        <h5>📚 Recommended Actions:</h5>
                                        <ul>
                                            {roadmap.details.map((d, i) => <li key={i}>{d}</li>)}
                                        </ul>
                                    </div>

                                    <div className="ai-detail-section">
                                        <h5>✍️ Top Entrance Exams to Focus On:</h5>
                                        <div className="ai-exam-tags">
                                            {roadmap.exams.map((ex, i) => <span key={i} className="ai-exam-tag">{ex}</span>)}
                                        </div>
                                    </div>
                                </div>

                                {/* CRITICAL CALL TO ACTION (CTA) */}
                                <div className="ai-conversion-banner">
                                    <div className="ai-banner-icon">💡</div>
                                    <div className="ai-banner-content">
                                        <h5>AI Plan Generated! What Next?</h5>
                                        <p>
                                            AI roadmaps are an excellent starting baseline. However, choosing a university, preparing for entrances, and convincing parents require deep, personal human guidance. Speak with our Certified Counselors to lock in your exact admission path!
                                        </p>
                                        <a 
                                            href={getPrefilledWaMsg()} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn-main ai-banner-cta btn-elite-gold"
                                        >
                                            Confirm with 1-on-1 Counselor 📞
                                        </a>
                                    </div>
                                </div>

                                <button onClick={() => setStep('q1')} className="ai-retry-btn">
                                    ↺ Re-run AI Analysis
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
