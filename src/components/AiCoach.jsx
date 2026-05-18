import React, { useState, useEffect } from 'react';

export default function AiCoach({ onRegister }) {
    const [step, setStep] = useState('register'); // 'register', 'q1', 'q2', 'q3', 'q4', 'q5', 'loading', 'result'
    const [formData, setFormData] = useState({ name: '', phone: '', education: '' });
    const [errors, setErrors] = useState({});
    const [countdown, setCountdown] = useState(3);
    
    // Detailed 5-Step diagnostic selections
    const [answers, setAnswers] = useState({
        interest: '',
        skill: '',
        performance: '',
        location: '',
        confusion: ''
    });

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
        
        const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
        if (!formData.phone.trim()) {
            errs.phone = 'WhatsApp Number is required';
        } else if (cleanPhone.length < 10) {
            errs.phone = 'Please enter a valid 10-digit number';
        }
        
        if (!formData.education) errs.education = 'Please select your class';

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setStep('q1');
    };

    const handleSelectOption = (field, val, nextStep) => {
        const updatedAnswers = { ...answers, [field]: val };
        setAnswers(updatedAnswers);
        
        if (nextStep === 'loading') {
            setStep('loading');
            
            // Capture lead on final step with full diagnostic details bundled
            if (onRegister) {
                const fullDiagnosticProblems = `[AI Profile] Track: ${updatedAnswers.interest} | Skill: ${updatedAnswers.skill} | Performance: ${updatedAnswers.performance} | Target: ${updatedAnswers.location} | Core Problem: ${updatedAnswers.confusion}`;
                onRegister({
                    name: formData.name,
                    phone: formData.phone.replace(/[^0-9]/g, ''),
                    education: formData.education,
                    problems: fullDiagnosticProblems,
                    date: new Date().toLocaleDateString()
                });
            }
            
            runAiLoader();
        } else {
            setStep(nextStep);
        }
    };

    const runAiLoader = () => {
        const texts = [
            '🧠 Evaluating cognitive preferences & skill syncing...',
            '📊 Analyzing modern tech, business & creative career clusters...',
            '🎯 Mapping Indian entrance exams & global study options...',
            '✨ Compiling your personalized future-proof career roadmap...'
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

    // Deep dynamic career compiler engine (used to prefill the message with actual diagnostic value)
    const compileRoadmap = () => {
        const { interest, skill, performance, location } = answers;
        let coreTrack = '';

        if (interest === 'Science & Future-Tech') {
            coreTrack = skill === 'Building & logical analysis'
                ? 'Advanced Computer Science & AI Engineering'
                : 'Biotechnology & Computational Biology';
        } else if (interest === 'Medical & Life Sciences') {
            coreTrack = performance === 'Top Tier (>90%)'
                ? 'Clinical Medicine & Surgery'
                : 'Allied Health Sciences & Biotech';
        } else if (interest === 'Business & Modern Commerce') {
            coreTrack = skill === 'Public speaking & leading people'
                ? 'Corporate Strategy & Venture Management (MBA Track)'
                : 'Quantitative Finance & Professional Accounting';
        } else if (interest === 'Creative Design & Digital Media') {
            coreTrack = 'Human-Computer Interaction & UX/UI Design';
        } else {
            coreTrack = 'Integrated Law & Corporate Jurisprudence (CLAT)';
        }

        return { coreTrack };
    };

    const roadmap = compileRoadmap();

    const getPrefilledWaMsg = () => {
        const waNum = '919544547861';
        const text = `Hi! My name is ${formData.name}. I just completed my E-Brave AI Career Coach assessment and generated my Career Roadmap for: "${roadmap.coreTrack}". Please send me my custom roadmap and confirm my priority consultation!`;
        return `https://wa.me/${waNum}?text=${encodeURIComponent(text)}`;
    };

    // COUNTDOWN AND AUTOMATIC REDIRECT ENGINE
    useEffect(() => {
        if (step !== 'result') return;

        setCountdown(3); // Reset to 3 seconds

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Automatic redirect to WhatsApp chat
                    window.location.href = getPrefilledWaMsg();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [step]);

    return (
        <section id="ai-coach" className="ai-coach-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">E-Brave AI Guidance</span>
                    <h2 className="sec-h">Deep AI Career Coach & Roadmap</h2>
                    <p className="sec-p">Answer 5 quick, step-by-step diagnostic questions to compile your customized career strategy delivered instantly to your WhatsApp.</p>
                </div>

                <div className="ai-coach-container scroll-reveal-child delay-2">
                    {/* STEP 0: LEAD CAPTURE FORM */}
                    {step === 'register' && (
                        <div className="ai-form-card">
                            <div className="ai-card-badge">🔒 Private & Secure · Register to Start</div>
                            <h3>Unlock E-Brave AI Career Coach</h3>
                            <p className="ai-form-desc">Provide your basic details so the AI algorithm can customize options for your exact academic level.</p>
                            
                            <form onSubmit={handleRegisterSubmit} className="ai-mini-form">
                                <div className="ai-input-group">
                                    <label htmlFor="aiName">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="aiName" 
                                        placeholder="e.g. Sandra Joseph" 
                                        value={formData.name} 
                                        onChange={handleChange}
                                        className={errors.name ? 'input-error' : ''}
                                        required
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
                                            required
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
                                                required
                                            >
                                                <option value="" disabled>Select Class</option>
                                                {['Class 8','Class 9','Class 10','Class 11','Class 12','12th Pass','Graduate'].map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                        {errors.education && <span className="ai-field-error">{errors.education}</span>}
                                    </div>
                                </div>

                                <button type="submit" className="btn-main ai-submit-btn">
                                    Start AI Career Coach ⚡
                                </button>
                            </form>
                        </div>
                    )}

                    {/* STEP 1: INTEREST AREA */}
                    {step === 'q1' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Question 1 of 5</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Hi <strong>{formData.name}</strong>! Let\'s get started. First, select the primary domain that naturally excites you most:
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Science & Future-Tech', '💻 Science & Technology (AI, Software, Engineering)'],
                                        ['Medical & Life Sciences', '🩺 Medicine & Life Sciences (Doctors, Biotech, Health)'],
                                        ['Business & Modern Commerce', '📊 Business & Modern Commerce (Finance, Marketing, Management)'],
                                        ['Creative Design & Digital Media', '🎨 Creative Design & Digital Media (UI/UX, Animation, Writing)'],
                                        ['Law & Humanities', '⚖️ Law, Humanities & Psychology (Corporate Law, Civil Services)']
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

                    {/* STEP 2: CORE SKILL */}
                    {step === 'q2' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Question 2 of 5</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Excellent choice. Next, which of these activities feels most natural to you or represents your core skill?
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Building & logical analysis', '⚙️ Logical solving, building tools, or programming'],
                                        ['Writing & storytelling', '✍️ Storytelling, designing visuals, or copywriting'],
                                        ['Public speaking & leading people', '🗣️ Communicating, public speaking, leading, or sales'],
                                        ['Deep research & organizing facts', '🔬 Fact checking, analyzing database sheets, or research']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('skill', val, 'q3')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ACADEMIC PERFORMANCE */}
                    {step === 'q3' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Question 3 of 5</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Got it. Now let me understand your current or target academic performance style:
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Top Tier (>90%)', '🏆 High Scorer (I enjoy scoring >90%)'],
                                        ['Average/Pragmatic Scorer (75-90%)', '📈 Balanced (Typical scores between 75-90%)'],
                                        ['Practical/Hands-on learner (60-75%)', '🎯 Practical Scorer (Scores between 60-75%, I prefer hands-on work)'],
                                        ['Creative explorer (focus on passion over marks)', '🌱 Passion-first (I focus heavily on skill rather than marks)']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('performance', val, 'q4')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: STUDY STYLE / LOCATION */}
                    {step === 'q4' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Question 4 of 5</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Where or how are you currently planning to complete your university/higher education?
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Elite Colleges in India (IIT/IIM/NIT)', '🏛️ Premium Indian Institutes (IIT, IIM, NIT, NLUs)'],
                                        ['Professional degree in Kerala (KEAM/State Gov)', '🌴 Local State/Government (KEAM engineering/medical, Kerala Gov)'],
                                        ['Study Abroad / Overseas', '✈️ Study Abroad / Global Universities (EU, UK, Canada, Gulf)'],
                                        ['Fast-track direct careers (Freelancing/Bootcamps)', '🚀 Direct Career (Self-teaching, Bootcamps, starting business fast)']
                                    ].map(([val, label]) => (
                                        <button 
                                            key={val} 
                                            className="ai-option-chip" 
                                            onClick={() => handleSelectOption('location', val, 'q5')}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: CORE CONFUSION */}
                    {step === 'q5' && (
                        <div className="ai-chat-card">
                            <div className="ai-chat-header">
                                <div className="ai-avatar">🤖</div>
                                <div>
                                    <h4>E-Brave AI Career Coach</h4>
                                    <span>Final Step</span>
                                </div>
                            </div>
                            <div className="ai-chat-body">
                                <div className="ai-bubble ai-bubble--bot">
                                    Last question: What is your absolute biggest source of worry or confusion right now?
                                </div>
                                <div className="ai-options-grid">
                                    {[
                                        ['Parent alignment (They want Doctor/Engineer, I want my passion)', '👪 Parent pressure (They want MBBS/Engineering, I have other passions)'],
                                        ['Deciding post-10th stream options', '❓ Stream Selection (Confused between Science, Commerce, Arts post-10th)'],
                                        ['Selecting best university degree courses post-12th', '🎓 College Course (Confused what degree to choose post-12th)'],
                                        ['Finding high-paying non-traditional careers', '💼 Career Path (I don\'t know what high-paying jobs exist outside doctor/engineer)']
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

                    {/* STEP 6: LOADING SCREEN */}
                    {step === 'loading' && (
                        <div className="ai-loader-card">
                            <div className="ai-spinner"></div>
                            <p className="ai-loader-text">{loadingText}</p>
                        </div>
                    )}

                    {/* STEP 7: REDIRECT & WHATSAPP DIRECT DELIVERY SCREEN */}
                    {step === 'result' && (
                        <div className="ai-result-card" style={{ textAlign: 'center', padding: '50px 30px' }}>
                            <div className="ai-checkmark" style={{ margin: '0 auto 20px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', fontSize: '1.8rem' }}>✓</div>
                            
                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--dk)', marginBottom: '10px' }}>
                                Roadmap Ready for Delivery!
                            </h3>
                            
                            <p style={{ color: 'var(--mu)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 30px' }}>
                                Hi <strong>{formData.name}</strong>, your custom career roadmap has been compiled successfully. To receive your official copy and finalize your path, we are transferring you directly to WhatsApp.
                            </p>

                            <div style={{ background: '#f0fdf4', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '20px', padding: '24px', marginBottom: '35px', textAlign: 'left', maxWidth: '500px', margin: '0 auto 35px' }}>
                                <h5 style={{ margin: '0 0 10px', color: 'var(--dk)', fontWeight: '700' }}>📋 Delivery Steps:</h5>
                                <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--mu)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
                                    <li>Click the button below to open WhatsApp.</li>
                                    <li><strong>Send the pre-filled message</strong> (this sends your diagnostic profile to our counselor).</li>
                                    <li>Our counselor will instantly deliver your custom roadmap on chat!</li>
                                </ol>
                            </div>

                            <a 
                                href={getPrefilledWaMsg()} 
                                className="btn-main btn-elite-gold pulsing-btn"
                                style={{ width: '100%', maxWidth: '400px', justifyContent: 'center', padding: '18px', fontSize: '1.1rem', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                            >
                                Get Roadmap on WhatsApp 💬
                            </a>

                            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--mu)' }}>
                                Redirecting automatically in <strong style={{ color: 'var(--dk)' }}>{countdown}s</strong>...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
