import React, { forwardRef } from 'react';

const PremiumDossierTemplate = forwardRef(({ studentInfo, assessmentData }, ref) => {
  // A4 aspect ratio at 96 DPI
  const pageWidth = 794;
  const pageHeight = 1123;

  // E-Brave Official Palette
  const pGreen = '#2E6B3A'; // Primary Green
  const sGreen = '#7FA86E'; // Secondary Green
  const tPrim = '#22242A'; // Primary Text
  const tSec = '#6E7278'; // Secondary Text
  const tMut = '#8A9099'; // Muted Text
  const bgLight = '#FAFAFA'; // Background
  const bgWhite = '#FFFFFF';
  const bgTint = '#E6F0E2';
  const bLine = '#E2E2E3';

  const pageStyle = {
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
    backgroundColor: bgLight,
    padding: '50px 60px',
    boxSizing: 'border-box',
    fontFamily: '"Plus Jakarta Sans", "DM Sans", sans-serif',
    color: tPrim,
    position: 'relative',
    overflow: 'hidden'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${bLine}`,
    paddingBottom: '20px',
    marginBottom: '30px'
  };

  const titleStyle = { margin: 0, fontSize: '28px', color: pGreen, fontWeight: 800, fontFamily: '"Plus Jakarta Sans", sans-serif' };
  const sectionTitle = { fontSize: '20px', color: pGreen, borderBottom: `2px solid ${sGreen}`, paddingBottom: '8px', marginBottom: '20px', fontWeight: 700 };
  const cardStyle = { backgroundColor: bgWhite, padding: '24px', borderRadius: '16px', border: `1px solid ${bLine}`, marginBottom: '25px' };
  const labelStyle = { color: tSec, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 600 };
  const valueStyle = { color: tPrim, fontSize: '16px', fontWeight: 700 };

  const footer = (pageNum) => (
    <div style={{ position: 'absolute', bottom: '40px', left: '60px', right: '60px', borderTop: `1px solid ${bLine}`, paddingTop: '15px', display: 'flex', justifyContent: 'space-between', color: tMut, fontSize: '12px', fontWeight: 600 }}>
      <span>E-Brave Premium Education Report</span>
      <span>Page {pageNum} of 5</span>
    </div>
  );

  const renderBar = (label, score) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: tPrim }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: pGreen }}>{score}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: bgTint, borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', backgroundColor: pGreen, borderRadius: '4px' }}></div>
      </div>
    </div>
  );

  return (
    <div ref={ref} style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1000 }}>
      
      {/* PAGE 1 */}
      <div id="dossier-page-1" style={pageStyle}>
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>E-BRAVE DOSSIER</h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: tSec, fontWeight: 600 }}>Confidential Counselor Report</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '12px', color: tMut }}>ID: {assessmentData?.assessmentId?.split('-')[0].toUpperCase() || 'EBR-001'}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: tMut }}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* 1. Cover Page / Student Profile */}
        <h2 style={sectionTitle}>3. Student Profile</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ ...cardStyle, flex: 1, marginBottom: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div><div style={labelStyle}>Full Name</div><div style={valueStyle}>{studentInfo?.fullName || 'N/A'}</div></div>
              <div><div style={labelStyle}>Grade</div><div style={valueStyle}>{studentInfo?.grade || 'N/A'}</div></div>
              <div><div style={labelStyle}>School</div><div style={valueStyle}>{studentInfo?.schoolName || 'N/A'}</div></div>
              <div><div style={labelStyle}>Contact</div><div style={valueStyle}>{studentInfo?.mobile || 'N/A'}</div></div>
            </div>
          </div>
        </div>

        {/* 2. Executive Summary */}
        <h2 style={sectionTitle}>2. Executive Summary</h2>
        <div style={{ ...cardStyle, backgroundColor: pGreen, color: bgWhite, border: 'none' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 800 }}>Primary Archetype: {assessmentData?.archetype || 'The Architect'}</h3>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: bgTint }}>
            This student demonstrates exceptional analytical reasoning coupled with strong internal motivation. They are naturally inclined towards structured problem-solving and thrive in environments that reward deep focus and logical consistency. Their profile suggests a high capacity for technical leadership.
          </p>
        </div>

        {/* 4. Interest Analysis */}
        <h2 style={sectionTitle}>4. Interest Analysis (Sector Affinity)</h2>
        <div style={cardStyle}>
          {renderBar('Technology & Engineering', 92)}
          {renderBar('Business & Management', 65)}
          {renderBar('Healthcare & Medical', 45)}
          {renderBar('Arts & Design', 78)}
          {renderBar('Law & Public Policy', 55)}
        </div>

        {footer(1)}
      </div>

      {/* PAGE 2 */}
      <div id="dossier-page-2" style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>BEHAVIORAL ANALYSIS</h1>
          <span style={{ color: tSec, fontSize: '14px', fontWeight: 600 }}>{studentInfo?.fullName}</span>
        </div>

        {/* 5. Personality Analysis */}
        <h2 style={sectionTitle}>5. Personality Analysis (OCEAN Framework)</h2>
        <div style={cardStyle}>
          {renderBar('Openness to Experience', 88)}
          {renderBar('Conscientiousness (Work Ethic)', 75)}
          {renderBar('Extraversion (Social Energy)', 40)}
          {renderBar('Agreeableness (Empathy)', 60)}
          {renderBar('Emotional Stability (Resilience)', 82)}
        </div>

        {/* 6. Learning Style Analysis */}
        <h2 style={sectionTitle}>6. Learning Style Analysis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 0, borderTop: `4px solid ${sGreen}` }}>
            <h3 style={{ fontSize: '18px', color: pGreen, margin: '0 0 10px 0' }}>Kinesthetic</h3>
            <h4 style={{ fontSize: '28px', color: tPrim, margin: '0 0 10px 0' }}>65%</h4>
            <p style={{ fontSize: '13px', color: tSec, margin: 0 }}>Learns by doing and physical interaction.</p>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 0, borderTop: `4px solid ${pGreen}` }}>
            <h3 style={{ fontSize: '18px', color: pGreen, margin: '0 0 10px 0' }}>Visual</h3>
            <h4 style={{ fontSize: '28px', color: tPrim, margin: '0 0 10px 0' }}>85%</h4>
            <p style={{ fontSize: '13px', color: tSec, margin: 0 }}>Learns best through charts, reading, and observation.</p>
          </div>
          <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 0, borderTop: `4px solid ${bgTint}` }}>
            <h3 style={{ fontSize: '18px', color: pGreen, margin: '0 0 10px 0' }}>Auditory</h3>
            <h4 style={{ fontSize: '28px', color: tPrim, margin: '0 0 10px 0' }}>40%</h4>
            <p style={{ fontSize: '13px', color: tSec, margin: 0 }}>Learns via lectures and discussions.</p>
          </div>
        </div>

        {/* 7. Strength Analysis */}
        <h2 style={sectionTitle}>7. Strength Analysis</h2>
        <div style={cardStyle}>
          <p style={{ fontSize: '14px', color: tSec, lineHeight: '1.6', margin: '0 0 15px 0' }}>
            The student possesses a highly developed sense of logical consistency and strategic foresight. They are capable of isolating variables in complex scenarios and deriving systemic solutions. Their independence is a massive asset in academic research or technical development.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Critical Thinking', 'Focus', 'Systematic Design', 'Data Analysis'].map(trait => (
              <span key={trait} style={{ backgroundColor: bgTint, color: pGreen, padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>{trait}</span>
            ))}
          </div>
        </div>

        {footer(2)}
      </div>

      {/* PAGE 3 */}
      <div id="dossier-page-3" style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>CAREER INTELLIGENCE</h1>
          <span style={{ color: tSec, fontSize: '14px', fontWeight: 600 }}>{studentInfo?.fullName}</span>
        </div>

        {/* 8. Skill Analysis */}
        <h2 style={sectionTitle}>8. Skill Analysis (Multiple Intelligences)</h2>
        <div style={cardStyle}>
          {renderBar('Logic Smart (Mathematical)', 95)}
          {renderBar('Picture Smart (Spatial)', 80)}
          {renderBar('Word Smart (Linguistic)', 70)}
          {renderBar('People Smart (Interpersonal)', 45)}
          {renderBar('Self Smart (Intrapersonal)', 85)}
        </div>

        {/* 9. Career Match Analysis */}
        <h2 style={sectionTitle}>9. Career Match Analysis</h2>
        <div style={cardStyle}>
          <p style={{ fontSize: '14px', color: tSec, lineHeight: '1.6', margin: 0 }}>
            Based on the psychometric evaluation, the student's highest alignment is with sectors requiring high autonomy, deep technical focus, and creative problem-solving. They show a lower affinity for highly repetitive or socially exhausting customer-facing roles.
          </p>
        </div>

        {/* 10. Top Career Recommendations */}
        <h2 style={sectionTitle}>10. Top Career Recommendations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ ...cardStyle, marginBottom: 0, borderLeft: `6px solid ${pGreen}` }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: pGreen }}>1. Artificial Intelligence Architect</h3>
            <p style={{ margin: 0, fontSize: '14px', color: tSec }}>98% Match • Aligns with high Logic and Introversion scores.</p>
          </div>
          <div style={{ ...cardStyle, marginBottom: 0, borderLeft: `6px solid ${sGreen}` }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: pGreen }}>2. Data Scientist / Analyst</h3>
            <p style={{ margin: 0, fontSize: '14px', color: tSec }}>92% Match • Leverages strong visual and mathematical capabilities.</p>
          </div>
          <div style={{ ...cardStyle, marginBottom: 0, borderLeft: `6px solid ${bgTint}` }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: pGreen }}>3. Systems Engineer</h3>
            <p style={{ margin: 0, fontSize: '14px', color: tSec }}>85% Match • Perfect for structural and conscientious tendencies.</p>
          </div>
        </div>

        {footer(3)}
      </div>

      {/* PAGE 4 */}
      <div id="dossier-page-4" style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>FUTURE READINESS</h1>
          <span style={{ color: tSec, fontSize: '14px', fontWeight: 600 }}>{studentInfo?.fullName}</span>
        </div>

        {/* 11. Future Skills Readiness */}
        <h2 style={sectionTitle}>11. Future Skills Readiness</h2>
        <div style={cardStyle}>
          {renderBar('AI & Technological Adaptability', 90)}
          {renderBar('Complex Problem Solving', 88)}
          {renderBar('Cross-functional Collaboration', 55)}
          {renderBar('Cognitive Flexibility', 78)}
        </div>

        {/* 12. Growth Opportunities */}
        <h2 style={sectionTitle}>12. Growth Opportunities</h2>
        <div style={{ ...cardStyle, backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#B91C1C' }}>Identified Friction Points</h3>
          <p style={{ fontSize: '14px', color: '#7F1D1D', lineHeight: '1.6', margin: 0 }}>
            The student's strong preference for autonomy may result in friction during mandatory collaborative projects. They may struggle to delegate tasks or trust peers with lower academic standards. Developing diplomatic communication skills is highly recommended.
          </p>
        </div>

        {/* 13. Parent Insights */}
        <h2 style={sectionTitle}>13. Parent Insights</h2>
        <div style={cardStyle}>
          <p style={{ fontSize: '14px', color: tSec, lineHeight: '1.6', margin: 0 }}>
            Your child thrives when given the independence to solve complex problems. Avoid micromanaging their study schedule; instead, provide them with challenging resources (like coding camps or advanced logic puzzles) and allow them to manage their own time. They respond better to logical explanations than emotional appeals.
          </p>
        </div>

        {footer(4)}
      </div>

      {/* PAGE 5 */}
      <div id="dossier-page-5" style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>ACTION & ROADMAP</h1>
          <span style={{ color: tSec, fontSize: '14px', fontWeight: 600 }}>{studentInfo?.fullName}</span>
        </div>

        {/* 14. Counselor Insights */}
        <h2 style={sectionTitle}>14. Counselor Insights (Private)</h2>
        <div style={{ ...cardStyle, backgroundColor: bgLight }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: tSec, fontSize: '14px', lineHeight: '1.8' }}>
            <li>Verify if the student's interest in technology is intrinsic or peer-driven.</li>
            <li>Explore their comfort level with public speaking; propose joining a debate or robotics club to build confidence in a structured environment.</li>
            <li>Discuss the "Friction Point" regarding group work gently to see if they acknowledge it.</li>
          </ul>
        </div>

        {/* 15. Recommended Action Plan */}
        <h2 style={sectionTitle}>15. Immediate Action Plan (Next 30 Days)</h2>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{ backgroundColor: bgTint, color: pGreen, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 }}>1</div>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: tPrim, fontSize: '15px' }}>Enroll in an Introductory Coding/Logic Course</h4>
              <p style={{ margin: 0, color: tSec, fontSize: '13px' }}>Capitalize on their high Logic Smart score immediately.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: bgTint, color: pGreen, width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px', flexShrink: 0 }}>2</div>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: tPrim, fontSize: '15px' }}>Complete the 'Team Dynamics' Module</h4>
              <p style={{ margin: 0, color: tSec, fontSize: '13px' }}>A short exercise to help them understand different working styles to reduce friction in group projects.</p>
            </div>
          </div>
        </div>

        {/* 16. Development Roadmap */}
        <h2 style={sectionTitle}>16. Long-Term Development Roadmap</h2>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${bLine}`, paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 700, color: tPrim }}>High School</span>
            <span style={{ color: tSec }}>Focus on Advanced Math & Physics</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${bLine}`, paddingBottom: '10px', marginBottom: '10px' }}>
            <span style={{ fontWeight: 700, color: tPrim }}>Extracurriculars</span>
            <span style={{ color: tSec }}>Robotics Team, Science Olympiad</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, color: tPrim }}>University Prep</span>
            <span style={{ color: tSec }}>Computer Science or Data Analytics</span>
          </div>
        </div>

        {footer(5)}
      </div>

    </div>
  );
});

export default PremiumDossierTemplate;
