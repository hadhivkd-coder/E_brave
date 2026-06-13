import React from 'react';
import { colors, commonStyles } from './ReportStyles';

const PageFooter = ({ num }) => (
  <div style={commonStyles.footer(num)}>
    <span>E-Brave Premium Education Report</span>
    <span>Page {num} of 30</span>
  </div>
);

const PageHeader = ({ title, name }) => (
  <div style={commonStyles.header}>
    <h1 style={commonStyles.title}>{title}</h1>
    <span style={{ color: colors.tSec, fontSize: '14px', fontWeight: 600 }}>{name}</span>
  </div>
);

export const Page01Cover = ({ data }) => (
  <div id="student-page-1" style={{ ...commonStyles.page, backgroundColor: colors.pGreen, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: colors.bgWhite }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>
    </div>
    <div style={{ zIndex: 1, textAlign: 'center' }}>
      <h3 style={{ color: colors.sGreen, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>E-Brave Assessment Ecosystem</h3>
      <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '20px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>STUDENT & PARENT REPORT</h1>
      <h2 style={{ fontSize: '28px', fontWeight: 400, opacity: 0.9, marginBottom: '60px' }}>A Comprehensive Blueprint for Growth</h2>
      
      <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '40px 60px', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px', opacity: 0.8, textTransform: 'uppercase' }}>Prepared Exclusively For</p>
        <p style={{ margin: '0 0 30px 0', fontSize: '36px', fontWeight: 800 }}>{data.student.fullName}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', textAlign: 'left' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Date</p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{data.student.date}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Institution</p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{data.student.schoolName}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Page02Welcome = ({ data }) => (
  <div id="student-page-2" style={commonStyles.page}>
    <PageHeader title="WELCOME" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>What This Report Is</h2>
    <p style={commonStyles.bodyText}>
      Welcome to the E-Brave Student & Parent Report. This is not a traditional test with pass or fail metrics. This is a comprehensive evaluation of potential. The insights contained within these pages are derived from a robust psychometric and behavioral assessment designed to map out {data.student.firstName}'s unique cognitive fingerprint.
    </p>
    
    <div style={{ ...commonStyles.card, marginTop: '40px' }}>
      <h3 style={{ color: colors.pGreen, fontSize: '20px', marginBottom: '15px' }}>Why It Matters</h3>
      <p style={commonStyles.bodyText}>
        In a rapidly changing world, understanding oneself is the foundation of future readiness. By identifying natural talents, communication styles, and intrinsic motivations early, we can significantly reduce the friction associated with academic choices and career planning.
      </p>
    </div>

    <div style={{ ...commonStyles.card, backgroundColor: colors.bgTint, border: 'none' }}>
      <h3 style={{ color: colors.pGreen, fontSize: '20px', marginBottom: '15px' }}>How To Use It</h3>
      <ul style={{ ...commonStyles.bodyText, paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}><strong>For Students:</strong> Use this as a mirror. Let it validate your strengths and guide your areas of growth.</li>
        <li style={{ marginBottom: '10px' }}><strong>For Parents:</strong> Use this as a handbook. It provides targeted advice on how to communicate with, motivate, and support your child effectively.</li>
        <li><strong>For Counselors:</strong> Use this to inform academic planning and university preparation.</li>
      </ul>
    </div>
    <PageFooter num={2} />
  </div>
);

export const Page03Executive = ({ data }) => (
  <div id="student-page-3" style={commonStyles.page}>
    <PageHeader title="EXECUTIVE SUMMARY" name={data.student.fullName} />
    
    <div style={{ backgroundColor: colors.pGreen, color: colors.bgWhite, padding: '50px', borderRadius: '24px', marginBottom: '40px' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', marginBottom: '10px', color: colors.sGreen }}>Primary Archetype</p>
      <h2 style={{ fontSize: '42px', margin: '0 0 20px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{data.executiveSummary.title}</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6', margin: 0, opacity: 0.9 }}>
        {data.executiveSummary.intro}
      </p>
    </div>

    <h2 style={commonStyles.sectionTitle}>Core Profile Analysis</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>
        {data.executiveSummary.description}
      </p>
      <p style={commonStyles.bodyText}>
        Through our multi-dimensional evaluation, we have identified distinct patterns in how {data.student.firstName} approaches complex challenges, processes new information, and interacts with their environment. The subsequent pages will break down these elements into actionable intelligence.
      </p>
    </div>
    <PageFooter num={3} />
  </div>
);

export const Page04Snapshot = ({ data }) => (
  <div id="student-page-4" style={commonStyles.page}>
    <PageHeader title="STUDENT SNAPSHOT" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Visual Overview</h2>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div style={commonStyles.card}>
        <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '20px' }}>Top Strengths</h3>
        {data.strengths.top.map((str, i) => (
          <div key={i} style={{ backgroundColor: colors.bgTint, color: colors.pGreen, padding: '15px 20px', borderRadius: '8px', marginBottom: '10px', fontWeight: 600 }}>
            {str}
          </div>
        ))}
      </div>
      
      <div style={commonStyles.card}>
        <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '20px' }}>Primary Learning Style</h3>
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <h2 style={{ fontSize: '36px', color: colors.tPrim, margin: '0 0 10px 0' }}>{data.learningStyle.primary}</h2>
          <p style={{ color: colors.tSec, margin: 0 }}>Requires structured visualization to internalize complex data.</p>
        </div>
      </div>
    </div>
    <PageFooter num={4} />
  </div>
);

export const Page05Personality = ({ data }) => {
  const { personality } = data;
  return (
    <div id="student-page-5" style={commonStyles.page}>
      <PageHeader title="PERSONALITY OVERVIEW" name={data.student.fullName} />
      <h2 style={commonStyles.sectionTitle}>Behavioral Foundations</h2>
      <p style={commonStyles.bodyText}>
        Understanding personality is crucial for predicting how {data.student.firstName} will respond to stress, collaboration, and unfamiliar academic environments. 
      </p>
      
      <div style={commonStyles.card}>
        {Object.entries({
          'Openness to Experience': personality.openness,
          'Conscientiousness': personality.conscientiousness,
          'Extraversion': personality.extraversion,
          'Agreeableness': personality.agreeableness,
          'Emotional Stability': 100 - personality.neuroticism
        }).map(([key, val]) => (
          <div key={key} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: colors.tPrim }}>{key}</span>
              <span style={{ fontWeight: 800, color: colors.pGreen }}>{val}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: colors.bLine, borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${val}%`, height: '100%', backgroundColor: colors.pGreen, borderRadius: '5px' }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ ...commonStyles.card, backgroundColor: colors.bgTint, border: 'none' }}>
        <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '15px' }}>Key Insights</h3>
        <ul style={{ ...commonStyles.bodyText, paddingLeft: '20px' }}>
          {personality.insights.map((ins, i) => <li key={i} style={{ marginBottom: '10px' }}>{ins}</li>)}
        </ul>
      </div>
      <PageFooter num={5} />
    </div>
  );
};

export const Page06Strength = ({ data }) => (
  <div id="student-page-6" style={commonStyles.page}>
    <PageHeader title="STRENGTH ANALYSIS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Defining Advantages</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>{data.strengths.description}</p>
    </div>
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      {data.strengths.top.map((str, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '20px', border: `1px solid ${colors.bLine}`, borderRadius: '12px' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: colors.pGreen, color: colors.bgWhite, borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 800, marginRight: '20px' }}>
            {i + 1}
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: colors.pGreen, fontSize: '20px' }}>{str}</h3>
            <p style={{ margin: 0, color: colors.tSec, fontSize: '14px' }}>This trait acts as a core multiplier for academic and career success.</p>
          </div>
        </div>
      ))}
    </div>
    <PageFooter num={6} />
  </div>
);

// Placeholder implementations for 7-10 to maintain pace, matching design system exactly
export const Page07Talents = ({ data }) => (
  <div id="student-page-7" style={commonStyles.page}>
    <PageHeader title="NATURAL TALENTS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Innate Capabilities</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Natural talents are distinct from learned skills. They represent areas where {data.student.firstName} requires less effort to achieve mastery compared to their peers.</p>
    </div>
    <PageFooter num={7} />
  </div>
);

export const Page08Interest = ({ data }) => (
  <div id="student-page-8" style={commonStyles.page}>
    <PageHeader title="INTEREST ANALYSIS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Sector Affinity</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Understanding where {data.student.firstName}'s natural curiosity lies ensures career alignment.</p>
    </div>
    <PageFooter num={8} />
  </div>
);

export const Page09Motivation = ({ data }) => (
  <div id="student-page-9" style={commonStyles.page}>
    <PageHeader title="MOTIVATION DRIVERS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>What Drives Action</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Motivation is the fuel for achievement. Identifying whether {data.student.firstName} is driven intrinsically by mastery or extrinsically by recognition.</p>
    </div>
    <PageFooter num={9} />
  </div>
);

export const Page10LearningStyle = ({ data }) => (
  <div id="student-page-10" style={commonStyles.page}>
    <PageHeader title="LEARNING STYLE ANALYSIS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Cognitive Processing</h2>
    <div style={commonStyles.card}>
      <h3 style={{ color: colors.pGreen, fontSize: '24px', margin: '0 0 15px 0' }}>Primary: {data.learningStyle.primary}</h3>
      <p style={commonStyles.bodyText}>{data.learningStyle.description}</p>
    </div>
    <PageFooter num={10} />
  </div>
);
