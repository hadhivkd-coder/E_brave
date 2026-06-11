import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import './AssessmentEngine.css';

export default function AssessmentComplete() {
  
  useEffect(() => {
    // Clear student info so they can't simply refresh back into the test
    // localStorage.removeItem('ebrave_student_info');
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ae-root">
      <div className="ae-center-view">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="ae-card"
          style={{ maxWidth: '640px', padding: '60px 40px' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            style={{ 
              width: '100px', height: '100px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 32px',
              border: '2px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: '#10b981' }} />
          </motion.div>

          <h1 className="ae-title" style={{ marginBottom: '16px' }}>Intelligence Dossier Complete</h1>
          
          <p className="ae-subtitle" style={{ color: '#5c6b5e', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
            Your psychometric data has been successfully transmitted to the E-Brave Intelligence Engine. We are now generating your highly personalized career roadmap.
          </p>

          <div style={{
            background: 'rgba(15, 76, 58, 0.04)',
            border: '1px solid rgba(15, 76, 58, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
            textAlign: 'left'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#062a1f', fontWeight: 800, marginBottom: '12px' }}>
              <UserCheck className="w-5 h-5" style={{ color: '#d97706' }} />
              What Happens Next?
            </h3>
            <p style={{ color: '#1a1a1a', fontSize: '15px', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
              An expert E-Brave Career Counselor will comprehensively review your profile. 
              <strong> Once your strategy dossier is finalized, we will contact you directly to schedule your 1-on-1 consultation session.</strong>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#7f9282', fontSize: '14px', marginBottom: '40px', fontWeight: 600 }}>
            <ShieldCheck className="w-5 h-5" />
            Your data is securely encrypted and confidentially stored.
          </div>

          <button 
            onClick={() => window.location.href = '/'}
            className="ae-btn-primary"
            style={{ maxWidth: '300px', margin: '0 auto' }}
          >
            Return to Homepage <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
