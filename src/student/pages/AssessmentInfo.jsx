import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AssessmentInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    grade: '',
    mobile: '',
    schoolCode: '',
    schoolName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.fullName || !formData.grade || !formData.mobile) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const validCodes = ['EBRAVE-KMHSS-2026', 'EBRAVE-GHSS-2026', 'EBRAVE-CAMPUS-2026'];
      
      if (!formData.schoolCode || validCodes.includes(formData.schoolCode.toUpperCase())) {
        // Save to local storage for the AssessmentEngine to use upon completion
        localStorage.setItem('ebrave_student_info', JSON.stringify(formData));
        navigate('/student/assessment/run');
      } else {
        setError('Invalid School Code. Please check with your administrator or leave it blank.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--adm-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: 500, width: '100%', background: 'var(--adm-card)', border: '1px solid var(--adm-border)', borderRadius: 16, padding: '40px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--adm-text)', marginBottom: '8px' }}>Student Registration</h1>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.95rem' }}>
            Please enter your details below. If your school provided an access code, enter it to link your results.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginBottom: 6 }}>Full Name *</label>
            <input 
              type="text" 
              className="adm-input" 
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginBottom: 6 }}>Class / Grade *</label>
              <select 
                className="adm-select"
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
              >
                <option value="">Select Grade</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
                <option value="College">College</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginBottom: 6 }}>Mobile Number *</label>
              <input 
                type="tel" 
                className="adm-input" 
                value={formData.mobile}
                onChange={e => setFormData({...formData, mobile: e.target.value})}
                placeholder="e.g. +91 9876543210"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-text-secondary)', marginBottom: 6 }}>School Name (Optional)</label>
            <input 
              type="text" 
              className="adm-input" 
              value={formData.schoolName}
              onChange={e => setFormData({...formData, schoolName: e.target.value})}
              placeholder="Enter your school name"
            />
          </div>

          <div style={{ background: 'var(--adm-bg)', padding: 20, borderRadius: 10, border: '1px solid var(--adm-border)' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--adm-accent)', marginBottom: 6 }}>Access Code (Optional)</label>
            <input 
              type="text" 
              className="adm-input" 
              value={formData.schoolCode}
              onChange={e => setFormData({...formData, schoolCode: e.target.value})}
              placeholder="e.g. EBRAVE-KMHSS-2026"
              style={{ textTransform: 'uppercase', borderColor: 'var(--adm-accent)' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-secondary)', marginTop: 8 }}>
              If your school provided a code, enter it here. Otherwise, you may leave it blank.
            </div>
          </div>

          <button 
            type="submit" 
            className="adm-btn adm-btn-primary" 
            disabled={isLoading}
            style={{ padding: '14px', fontSize: '1.1rem', marginTop: 10 }}
          >
            {isLoading ? 'Validating Code...' : 'Begin Assessment'}
          </button>

        </form>
      </div>
    </div>
  );
}
