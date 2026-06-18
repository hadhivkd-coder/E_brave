import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, HelpCircle, ArrowRight, CheckCircle2, Globe, BrainCircuit, Target, Briefcase, HeartPulse, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { QUESTION_BANK, ASSESSMENT_SECTIONS } from '../../admin/data/assessmentConfig';
import { useNotifications } from '../../admin/context/NotificationContext';
import { v4 as uuidv4 } from 'uuid';
import { generateDossierPDF } from '../utils/pdfGenerator';
import { supabase } from '../../lib/supabase';
import './AssessmentEngine.css';

const categoryImages = {
  science_project: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
  school_event: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
  social_gathering: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ea?auto=format&fit=crop&q=80&w=600',
  study_desk: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
  tech_interface: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
  classroom_surprise: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
  textbooks_studying: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
  hands_on_workshop: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  family_dinner: 'https://images.unsplash.com/photo-1555243896-771a812bd15e?auto=format&fit=crop&q=80&w=600',
  mountain_peak: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
  sports_team: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=600',
  art_studio: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
  debate_club: 'https://images.unsplash.com/photo-1526660690293-bcd32dc3b507?auto=format&fit=crop&q=80&w=600',
  coding_bootcamp: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600',
  volunteer_work: 'https://images.unsplash.com/photo-1593113589914-009f48a12d1b?auto=format&fit=crop&q=80&w=600',
  music_band: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600',
  nature_hike: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600'
};

export default function AssessmentEngine() {
  const navigate = useNavigate();
  const { showToast } = useNotifications();
  
  // App States
  const [hasStarted, setHasStarted] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const currentQuestion = QUESTION_BANK[currentQuestionIndex];
  const totalQuestions = QUESTION_BANK.length;
  const progress = Math.round(((currentQuestionIndex) / totalQuestions) * 100);
  const currentSection = ASSESSMENT_SECTIONS.find(s => s.id === currentQuestion?.sectionId) || ASSESSMENT_SECTIONS[0];
  const sectionIndex = ASSESSMENT_SECTIONS.findIndex(s => s.id === currentSection.id);

  // Section Icons mapping
  const sectionIcons = [
    <Target className="w-6 h-6" style={{ color: '#0f4c3a' }} />,
    <BrainCircuit className="w-6 h-6" style={{ color: '#10b981' }} />,
    <Globe className="w-6 h-6" style={{ color: '#062a1f' }} />,
    <GraduationCap className="w-6 h-6" style={{ color: '#d97706' }} />,
    <Briefcase className="w-6 h-6" style={{ color: '#0f4c3a' }} />,
    <HeartPulse className="w-6 h-6" style={{ color: '#e11d48' }} />
  ];

  // Section Imagery Mapping
  const sectionVisuals = {
    'interest_matrix': {
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      desc: 'Discover what drives your natural curiosity and passion.'
    },
    'personality_lab': {
      img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop',
      desc: 'Understand how your core traits influence your work style.'
    },
    'future_skills': {
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      desc: 'Evaluate your readiness for the careers of tomorrow.'
    },
    'academic_alignment': {
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
      desc: 'Align your academic strengths with real-world disciplines.'
    },
    'contextual_compass': {
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
      desc: 'Navigate external influences to find your true north.'
    },
    'career_motivation': {
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
      desc: 'Identify the ultimate impact you want to make in the world.'
    }
  };
  const timeoutRef = React.useRef(null);
  const isCompletingRef = React.useRef(false);

  const handleSelectOption = (optionId) => {
    if (isProcessing) return;

    setAnswers(prev => ({ ...prev, [currentQuestion?.id]: optionId }));
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleComplete();
      }
    }, 450);
  };

  const handleComplete = async () => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    
    setIsProcessing(true);
    
    const steps = [
      'Analyzing Psychometric Traits...',
      'Mapping Future Skills...',
      'Calculating Career Confidence...',
      'Synthesizing Archetype...',
      'Generating Recommendations...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }
    
    // SYNCHRONIZATION: Generate PDF, Upload to Supabase, Send to Google Sheets
    try {
      const studentInfo = JSON.parse(localStorage.getItem('ebrave_student_info') || '{}');
      const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
      
      const assessmentId = uuidv4();
      
      // Calculate derived traits (Mock logic for test)
      const mockArchetype = "The Visionary Technologist";
      const mockCareer = "Systems Architect / AI Lead";
      const mockTraits = "High Openness, High Learning Agility, Analytical Focus";
      const mockRisk = "May struggle with highly repetitive operational tasks.";

      const assessmentData = {
        assessmentId,
        archetype: mockArchetype,
        topCareerMatch: mockCareer,
        topTraits: mockTraits,
        primaryRiskFlag: mockRisk,
      };

      // 1. Generate Physical PDF Blob
      const pdfBlob = await generateDossierPDF(studentInfo, assessmentData);

      // 2. Upload to Supabase Storage
      const fileName = `${Date.now()}_${studentInfo.mobile || 'student'}_dossier.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('dossiers')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      let finalPdfUrl = "Error: Upload Failed";

      if (uploadError) {
        console.error('Supabase PDF Upload Error:', uploadError);
        finalPdfUrl = `Upload Error: ${uploadError.message || JSON.stringify(uploadError)}`;
      } else {
        // 3. Retrieve Public URL
        const { data: urlData } = supabase.storage.from('dossiers').getPublicUrl(fileName);
        finalPdfUrl = urlData.publicUrl;
      }

      // 4. Construct 13-Column Google Sheets Payload
      const payload = {
        assessmentId,
        studentName: studentInfo.fullName,
        className: studentInfo.grade,
        phone: studentInfo.mobile,
        schoolName: studentInfo.schoolName,
        schoolCode: studentInfo.schoolCode,
        archetype: mockArchetype,
        topCareerMatch: mockCareer,
        primaryRiskFlag: mockRisk,
        pdfUrl: finalPdfUrl,
        assignedCounselor: "Unassigned",
        sessionStatus: "Pending"
      };

      // 5. Send to Google Sheets
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        console.warn('VITE_GOOGLE_SHEETS_WEBHOOK_URL is not set. Skipping sheet sync.');
      }
    } catch (err) {
      console.error('Failed to sync assessment data:', err);
    }

    const waNum = '916282819122';
    const schoolInfo = studentInfo.schoolName ? ` from ${studentInfo.schoolName}` : '';
    const waText = `Hi! I am ${studentInfo.fullName}, studying in Class ${studentInfo.grade}${schoolInfo}. I have attended the career assessment and I want to get to know about the result.`;
    
    showToast('Assessment Complete! Redirecting to WhatsApp...', 'success');
    
    setTimeout(() => {
      window.location.href = `https://wa.me/${waNum}?text=${encodeURIComponent(waText)}`;
    }, 1500);
  };

  const getTranslatedText = (textObj) => {
    if (typeof textObj === 'string') return textObj;
    if (!textObj) return '';
    return textObj[language] || textObj['en'] || 'Translation Error';
  };

  // 1. Language Selector Screen
  if (!hasStarted) {
    return (
      <div className="ae-root">
        <div className="ae-center-view">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="ae-card"
          >
            <div className="ae-icon-container">
              <Globe className="w-10 h-10" />
            </div>
            <h1 className="ae-title">Select Your Language</h1>
            <p className="ae-subtitle">Choose the language you are most comfortable with for the assessment.</p>
            
            <div className="ae-lang-grid">
              {[
                { id: 'en', label: 'English', desc: 'Primary' },
                { id: 'hi', label: 'हिन्दी (Hindi)', desc: 'Regional' },
                { id: 'ml', label: 'മലയാളം (Malayalam)', desc: 'Regional' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`ae-lang-btn ${language === lang.id ? 'active' : ''}`}
                >
                  <span className="ae-lang-label">{lang.label}</span>
                  <span className="ae-lang-desc">{lang.desc}</span>
                  {language === lang.id && <CheckCircle2 className="w-5 h-5 mt-3" style={{ color: '#0f4c3a', marginTop: '12px' }} />}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setHasStarted(true)}
              className="ae-btn-primary"
            >
              Start Assessment <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  // 2. Processing Screen
  if (isProcessing) {
    const steps = [
      'Analyzing Psychometric Traits...',
      'Mapping Future Skills...',
      'Calculating Career Confidence...',
      'Synthesizing Archetype...',
      'Generating Recommendations...'
    ];

    return (
      <div className="ae-root">
        <div className="ae-center-view">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="ae-processing"
          >
            <div className="ae-spinner-container">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="ae-spinner-outer" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="ae-spinner-inner" />
              <div className="ae-spinner-icon">
                <BrainCircuit className="w-10 h-10" />
              </div>
            </div>
            
            <h2 className="ae-title">E-Brave Cognitive Engine</h2>
            
            <div className="ae-steps-list">
              {steps.map((step, idx) => {
                const state = idx < processingStep ? 'done' : idx === processingStep ? 'active' : 'pending';
                return (
                  <div key={idx} className="ae-step-item">
                    <div className={`ae-step-dot ${state}`}>
                      {state === 'done' && <CheckCircle2 className="w-4 h-4" style={{ color: '#fff' }} />}
                      {state === 'active' && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity }} style={{ width: '8px', height: '8px', backgroundColor: '#fff', borderRadius: '50%' }} />}
                    </div>
                    <span className={`ae-step-text ${state}`}>{step}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 3. Assessment UI (Mobile First Layout)
  return (
    <div className="ae-root">
      <div className="ae-interactive-panel">
        {/* Dynamic Progress Bar */}
        <div className="ae-progress-bar-container">
          <motion.div 
            className="ae-progress-bar-fill" 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            transition={{ duration: 0.5, ease: "easeOut" }} 
          />
        </div>

        {/* Header Container */}
        <header className="ae-header">
          <div className="ae-header-inner">
            <div>
              <div>
                <span className="ae-lab-badge">
                  Lab {sectionIndex + 1} of {ASSESSMENT_SECTIONS.length}
                </span>
                <span style={{ color: '#7f9282', fontSize: '14px', fontWeight: 600 }}>E-Brave Discovery</span>
              </div>
              <h2 className="ae-header-title">
                {sectionIcons[sectionIndex]}
                {currentSection.title}
              </h2>
            </div>
            
            <div className="ae-counter">
              {currentQuestionIndex + 1}<span>/{totalQuestions}</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="ae-main">
          <div style={{ maxWidth: '800px', width: '100%', zIndex: 10 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 25 }}
                className="ae-question-card"
              >
                <img 
                  src={categoryImages[currentQuestion.imageCategory] || categoryImages.school_event} 
                  alt="Context" 
                  className="ae-inline-image"
                />
                <h1 className="ae-question-text">
                  {getTranslatedText(currentQuestion.text)}
                </h1>

                <div className="ae-options-list">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                    
                    return (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectOption(option.id)}
                        className={`ae-option-btn ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="ae-option-letter">
                          {optionLetters[idx]}
                        </div>
                        <span className="ae-option-text">
                          {getTranslatedText(option.text)}
                        </span>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 className="w-6 h-6" style={{ color: '#0f4c3a' }} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer Navigation */}
        <footer className="ae-footer">
          <button 
            onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))}
            disabled={currentQuestionIndex === 0}
            className="ae-nav-btn"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          
          <div className="ae-sync">
            <div className="ae-sync-dot" />
            <span className="ae-sync-text">Syncing Progress...</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
