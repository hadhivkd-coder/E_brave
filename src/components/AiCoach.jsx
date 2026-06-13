import React, { useState } from 'react';

export default function AiCoach({ onRegister }) {
    const [step, setStep] = useState('register'); // 'register', 'q1', 'q2', 'q3', 'q4', 'q5', 'loading', 'result'
    const [formData, setFormData] = useState({ name: '', phone: '', education: '' });
    const [errors, setErrors] = useState({});
    
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
            const fullDiagnosticProblems = `[AI Profile] Track: ${updatedAnswers.interest} | Skill: ${updatedAnswers.skill} | Performance: ${updatedAnswers.performance} | Target: ${updatedAnswers.location} | Core Problem: ${updatedAnswers.confusion}`;
            const newRegistration = {
                name: formData.name.trim(),
                phone: formData.phone.replace(/[^0-9]/g, ''),
                education: formData.education,
                problems: fullDiagnosticProblems,
                date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            };

            // 1. Save in local registrationsList (fallback)
            if (onRegister) {
                onRegister(newRegistration);
            }

            // 2. Direct automatic post call to your Google Sheet spreadsheet webhook
            const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
            if (SCRIPT_URL) {
                try {
                    fetch(SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newRegistration)
                    });
                } catch (err) {
                    console.error('AI Sheet error:', err);
                }
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

    // Deep dynamic career compiler engine
    const compileRoadmap = () => {
        const { interest, skill, performance, location, confusion } = answers;
        let coreTrack = '';
        let modernCourses = [];
        let entranceExams = [];
        let milestones = [];

        // DYNAMIC CORE TRACK DETERMINATION
        if (interest === 'Science & Future-Tech') {
            if (skill === 'Building & logical analysis') {
                coreTrack = location === 'Study Abroad / Overseas' 
                    ? 'Global Software Architecture & AI Engineering'
                    : 'Advanced Computer Science & Intelligent Systems';
                modernCourses = ['AI & Large Language Modeling (LLM)', 'Robotics & Automation', 'Cybersecurity & Blockchain Architecture'];
                entranceExams = ['JEE Advanced / Main', 'KEAM (Kerala)', 'SAT (for global universities)', 'CUET (Computer Science)'];
            } else {
                coreTrack = 'Biotechnology & Computational Biology';
                modernCourses = ['Bioinformatics', 'Sustainable Green Technology', 'Clinical Research & Genetics'];
                entranceExams = ['NEET (UG)', 'CUET (Biosciences)', 'IISER Aptitude Test (IAT)'];
            }
            milestones = [
                'Focus intensely on coding platforms (GitHub, LeetCode) and algorithmic logic.',
                'If aiming overseas, target IELTS/TOEFL preparation early.',
                'Engage in active STEM science fairs and build 2-3 real-world software/science prototypes.'
            ];
        } 
        else if (interest === 'Medical & Life Sciences') {
            if (performance === 'Top Tier (>90%)') {
                coreTrack = 'Clinical Medicine & Specialized Surgery';
                modernCourses = ['MBBS / BDS', 'Digital Therapeutics', 'Genomics & Precision Medicine'];
                entranceExams = ['NEET (UG)', 'KEAM Medical'];
            } else {
                coreTrack = 'Allied Health Sciences & Biotech Innovation';
                modernCourses = ['Pharm.D (Doctor of Pharmacy)', 'Physiotherapy & Sports Medicine', 'Biotech Entrepreneurship'];
                entranceExams = ['NEET (UG)', 'CUET (Allied Health Tracks)', 'KLEE / B.Sc Admission tests'];
            }
            milestones = [
                'Ensure perfect conceptual mapping of biological cell functions and organic chemistry.',
                'Research non-traditional high-paying medical careers such as Healthcare Data Analytics.',
                'Secure hospital observation / volunteer programs during vacations.'
            ];
        } 
        else if (interest === 'Business & Modern Commerce') {
            if (skill === 'Public speaking & leading people') {
                coreTrack = location === 'Study Abroad / Overseas'
                    ? 'Global Business Administration & International Trade'
                    : 'Corporate Strategy & Venture Management (MBA Track)';
                modernCourses = ['Growth Marketing & Branding', 'E-commerce Management', 'Fintech & Investment Banking'];
                entranceExams = ['IPMAT (5-Year IIM Program)', 'CUET (BBA/BMS)', 'CAT (post-grad targeting)'];
            } else {
                coreTrack = 'Quantitative Finance & Professional Accounting';
                modernCourses = ['Chartered Accountancy (CA)', 'Financial Risk Management (FRM)', 'Actuarial Science & Quantitative Analysis'];
                entranceExams = ['CA Foundation', 'CMA Foundation', 'CUET (Financial Markets)'];
            }
            milestones = [
                'Build advanced Excel, corporate math, and accounting foundation early.',
                'Explore high-paying Fintech careers and micro-credentials in data modeling.',
                'Read economic news daily and participate in mock stock market analysis programs.'
            ];
        } 
        else if (interest === 'Creative Design & Digital Media') {
            coreTrack = skill === 'Building & logical analysis'
                ? 'Human-Computer Interaction & UX/UI Design'
                : 'Digital Media Production & Visual Communication';
            modernCourses = ['UI/UX Product Design', '3D Animation & Virtual Reality (VR)', 'Digital Content Creation & Brand Strategy'];
            entranceExams = ['UCEED (IIT Design)', 'NID / NIFT Entrance Exam', 'CUCET (Media & Design Tracks)'];
            milestones = [
                'Build a stunning digital portfolio displaying your designs, videos, or UI layouts.',
                'UI/UX design currently commands tech-counseling salary grades without standard engineering constraints.',
                'Target premier design colleges like National Institute of Design (NID) or IIT Design departments.'
            ];
        } 
        else {
            if (skill === 'Public speaking & leading people' || performance === 'Top Tier (>90%)') {
                coreTrack = 'Judiciary & Corporate Jurisprudence (Integrated Law)';
                modernCourses = ['Corporate & Cyber Law', 'Intellectual Property Rights', 'International Relations & Diplomacy'];
                entranceExams = ['CLAT (Common Law Admission Test)', 'KLEE (Kerala Law Entrance)', 'LSAT India'];
            } else {
                coreTrack = 'Psychology & Behavioral Counseling';
                modernCourses = ['Clinical Psychology', 'Organizational Psychology', 'Human Resources & Public Policy'];
                entranceExams = ['CUET (Humanities)', 'TISSNET', 'State University Entrance Exams'];
            }
            milestones = [
                'Hone critical verbal analysis, presentation styles, and persuasive writing skills.',
                'A 5-year integrated B.A. LL.B from a National Law University (NLU) is the gold standard for high corporate packages.',
                'Follow current affairs closely and practice mock debating/analytical writing regularly.'
            ];
        }

        if (confusion === 'Parent alignment (They want Doctor/Engineer, I want my passion)') {
            milestones.unshift('⭐ CRITICAL: Schedule a parent alignment session. Use objective, science-backed salary and job market data for alternative careers to show them.');
        }

        return { coreTrack, modernCourses, entranceExams, milestones };
    };

    const roadmap = compileRoadmap();

    const getPrefilledWaMsg = () => {
        const waNum = '919162829122';
        const text = `Hi! My name is ${formData.name}. I just completed my E-Brave AI Career Coach assessment and generated my Career Roadmap for: "${roadmap.coreTrack}". I want to book a 1-on-1 professional session to finalize my plan!`;
        return `https://wa.me/${waNum}?text=${encodeURIComponent(text)}`;
    };

    return (
        <section id="ai-coach" className="ai-coach-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">E-Brave AI Guidance</span>
                    <h2 className="sec-h">Deep AI Career Coach & Roadmap</h2>
                    <p className="sec-p">Answer 5 quick, step-by-step diagnostic questions to compile a highly customized career strategy incorporating standard and futuristic options.</p>
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

                    {/* STEP 7: PERSONALIZED DIVERSE RESULT ROADMAP */}
                    {step === 'result' && (
                        <div className="ai-result-card">
                            <div className="ai-result-header">
                                <div className="ai-checkmark">⚡</div>
                                <div>
                                    <h4>Your Personalized AI Career Strategy</h4>
                                    <span>Compiled for {formData.name} ({formData.education})</span>
                                </div>
                            </div>

                            <div className="ai-result-body">
                                <div className="ai-roadmap-block">
                                    <span className="ai-roadmap-label">🎯 DIVERSE CORE CAREER TRACK</span>
                                    <h3 className="ai-roadmap-title">{roadmap.coreTrack}</h3>
                                </div>

                                <div className="ai-roadmap-details">
                                    <div className="ai-detail-section">
                                        <h5>📚 Recommended Specialized Courses:</h5>
                                        <div className="ai-exam-tags" style={{ marginBottom: '20px' }}>
                                            {roadmap.modernCourses.map((mc, i) => (
                                                <span key={i} className="ai-exam-tag" style={{ background: '#f0fdf4', borderColor: 'rgba(74, 222, 128, 0.2)', color: 'var(--dk)' }}>
                                                    {mc}
                                                </span>
                                            ))}
                                        </div>

                                        <h5>🚀 Key Action Milestones:</h5>
                                        <ul>
                                            {roadmap.milestones.map((d, i) => <li key={i}>{d}</li>)}
                                        </ul>
                                    </div>

                                    <div className="ai-detail-section">
                                        <h5>🏛️ Target Entrance Exams & Universities:</h5>
                                        <div className="ai-exam-tags">
                                            {roadmap.entranceExams.map((ex, i) => <span key={i} className="ai-exam-tag">{ex}</span>)}
                                        </div>
                                    </div>
                                </div>

                                {/* CONVERSION BANNER - ONE-ON-ONE VALUE UPGRADE */}
                                <div className="ai-conversion-banner">
                                    <div className="ai-banner-icon">🎯</div>
                                    <div className="ai-banner-content">
                                        <h5>Lock In Your Career Path With An Expert</h5>
                                        <p>
                                            Your AI roadmap is an excellent starting baseline. However, choosing a university, preparing for entrances, and convincing parents require deep, personal human guidance. Connect with our Certified Counselors to secure your exact career roadmap!
                                        </p>
                                        <a 
                                            href={getPrefilledWaMsg()} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn-main ai-banner-cta btn-elite-gold"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Book 1-on-1 Session on WhatsApp 📞
                                        </a>
                                    </div>
                                </div>

                                <button onClick={() => setStep('q1')} className="ai-retry-btn">
                                    ↺ Restart Diagnostic Assessment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
