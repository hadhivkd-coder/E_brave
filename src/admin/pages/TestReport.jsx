import React from 'react';
import StudentReportTemplate from '../../student/utils/StudentReport/StudentReportTemplate';

export default function TestReport() {
  const mockStudentInfo = {
    fullName: "Alex Rivera",
    grade: "Grade 11",
    schoolName: "E-Brave Partner Academy",
    mobile: "+91 9876543210"
  };

  const mockAssessmentData = {
    archetype: "The Visionary Technologist"
  };

  return (
    <div style={{ backgroundColor: '#ccc', padding: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333' }}>Student & Parent Report Preview</h1>
        <p style={{ color: '#555' }}>Scroll down to see all 30 pages rendered consecutively.</p>
      </div>
      
      {/* 
        We pass a ref but override the position absolute logic
        so it renders visibly on screen for testing 
      */}
      <div style={{ position: 'relative', top: '0', left: '0', zIndex: 1, backgroundColor: 'transparent' }}>
        <style>{`
          #student-pdf-render-root > div {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            z-index: 1 !important;
          }
          #student-pdf-render-root > div > div {
            margin-bottom: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
        `}</style>
        <div id="student-pdf-render-root">
          <StudentReportTemplate studentInfo={mockStudentInfo} assessmentData={mockAssessmentData} />
        </div>
      </div>
    </div>
  );
}
