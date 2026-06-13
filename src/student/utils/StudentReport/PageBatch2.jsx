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

export const Page11Communication = ({ data }) => (
  <div id="student-page-11" style={commonStyles.page}>
    <PageHeader title="COMMUNICATION STYLE" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Interpersonal Dynamics</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>How {data.student.firstName} translates internal thoughts into external dialogue.</p>
    </div>
    <PageFooter num={11} />
  </div>
);

export const Page12DecisionMaking = ({ data }) => (
  <div id="student-page-12" style={commonStyles.page}>
    <PageHeader title="DECISION-MAKING STYLE" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>How Choices Are Made</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Understanding if {data.student.firstName} relies on logic, intuition, consensus, or authority.</p>
    </div>
    <PageFooter num={12} />
  </div>
);

export const Page13FutureSkills = ({ data }) => (
  <div id="student-page-13" style={commonStyles.page}>
    <PageHeader title="FUTURE SKILLS READINESS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Preparedness for Tomorrow</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Evaluating adaptability, technical literacy, and complex problem-solving readiness.</p>
    </div>
    <PageFooter num={13} />
  </div>
);

export const Page14CareerReadiness = ({ data }) => (
  <div id="student-page-14" style={commonStyles.page}>
    <PageHeader title="CAREER READINESS INSIGHTS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Professional Alignment</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>How closely {data.student.firstName}'s current trajectory aligns with the demands of the modern workforce.</p>
    </div>
    <PageFooter num={14} />
  </div>
);

export const Page15Challenges = ({ data }) => (
  <div id="student-page-15" style={commonStyles.page}>
    <PageHeader title="POTENTIAL CHALLENGES" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Friction Points</h2>
    <div style={{ ...commonStyles.card, backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' }}>
      <h3 style={{ color: '#B91C1C', fontSize: '18px', marginBottom: '15px' }}>Areas Requiring Attention</h3>
      <p style={{ color: '#7F1D1D', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
        Every strength has a corresponding shadow. For {data.student.firstName}, their high autonomy and deep focus may lead to friction in highly collaborative or fast-paced communicative environments. They may struggle to delegate tasks.
      </p>
    </div>
    <PageFooter num={15} />
  </div>
);

export const Page16Growth = ({ data }) => (
  <div id="student-page-16" style={commonStyles.page}>
    <PageHeader title="GROWTH & DEVELOPMENT" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Areas for Expansion</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Targeted skills that will act as multipliers for {data.student.firstName}'s natural talents.</p>
    </div>
    <PageFooter num={16} />
  </div>
);

export const Page17Exploration = ({ data }) => (
  <div id="student-page-17" style={commonStyles.page}>
    <PageHeader title="CAREER EXPLORATION" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Navigating the Future</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>The following three pages detail specific career archetypes that mathematically and psychologically align with {data.student.firstName}'s profile.</p>
    </div>
    <PageFooter num={17} />
  </div>
);

const CareerPageTemplate = ({ career, num, name }) => (
  <div style={commonStyles.page}>
    <PageHeader title={`CAREER MATCH: ${career.title.toUpperCase()}`} name={name} />
    
    <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
      <div style={{ flex: 2 }}>
        <h2 style={{ fontSize: '32px', color: colors.pGreen, margin: '0 0 10px 0' }}>{career.title}</h2>
        <div style={{ display: 'inline-block', backgroundColor: colors.bgTint, color: colors.pGreen, padding: '5px 15px', borderRadius: '20px', fontWeight: 800, fontSize: '14px', marginBottom: '20px' }}>
          {career.match}% ALIGNMENT
        </div>
        <p style={{ ...commonStyles.bodyText, fontSize: '16px' }}>{career.overview}</p>
      </div>
      <div style={{ flex: 1, backgroundColor: colors.pGreen, color: colors.bgWhite, padding: '25px', borderRadius: '16px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: colors.sGreen, textTransform: 'uppercase' }}>Industry Data</h3>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.8 }}>Projected Salary</p>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{career.salary}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px', opacity: 0.8 }}>Future Outlook</p>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{career.outlook}</p>
        </div>
      </div>
    </div>

    <div style={commonStyles.card}>
      <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '10px' }}>Why This Fits</h3>
      <p style={commonStyles.bodyText}>{career.why}</p>
    </div>

    <div style={{ ...commonStyles.card, backgroundColor: colors.bgTint, border: 'none' }}>
      <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '10px' }}>Critical Skills Required</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {career.skills.map(s => <span key={s} style={{ backgroundColor: colors.bgWhite, color: colors.pGreen, padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>{s}</span>)}
      </div>
    </div>
    
    <PageFooter num={num} />
  </div>
);

export const Page18Career1 = ({ data }) => (
  <div id="student-page-18"><CareerPageTemplate career={data.careers[0]} num={18} name={data.student.fullName} /></div>
);
export const Page19Career2 = ({ data }) => (
  <div id="student-page-19"><CareerPageTemplate career={data.careers[1]} num={19} name={data.student.fullName} /></div>
);
export const Page20Career3 = ({ data }) => (
  <div id="student-page-20"><CareerPageTemplate career={data.careers[2]} num={20} name={data.student.fullName} /></div>
);
