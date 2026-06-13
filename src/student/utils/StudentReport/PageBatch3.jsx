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

export const Page21Education = ({ data }) => (
  <div id="student-page-21" style={commonStyles.page}>
    <PageHeader title="EDUCATIONAL PATHWAYS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Academic Roadmap</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Recommended degrees, courses, and certifications to support the top career recommendations.</p>
    </div>
    <PageFooter num={21} />
  </div>
);

export const Page22SkillsDev = ({ data }) => (
  <div id="student-page-22" style={commonStyles.page}>
    <PageHeader title="FUTURE SKILLS DEVELOPMENT" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Building the Toolkit</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Actionable ways to develop AI literacy, communication, and complex problem-solving.</p>
    </div>
    <PageFooter num={22} />
  </div>
);

export const Page23ParentGuidance = ({ data }) => (
  <div id="student-page-23" style={commonStyles.page}>
    <PageHeader title="PARENT GUIDANCE" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Understanding Your Child</h2>
    <div style={commonStyles.card}>
      <p style={{ ...commonStyles.bodyText, fontSize: '16px' }}>{data.parentGuidance.description}</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div style={{ ...commonStyles.card, borderTop: `4px solid ${colors.pGreen}`, marginBottom: 0 }}>
        <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '15px' }}>What to Encourage</h3>
        <ul style={{ ...commonStyles.bodyText, paddingLeft: '20px', margin: 0 }}>
          {data.parentGuidance.do.map((item, i) => <li key={i} style={{ marginBottom: '10px' }}>{item}</li>)}
        </ul>
      </div>
      <div style={{ ...commonStyles.card, borderTop: '4px solid #B91C1C', marginBottom: 0 }}>
        <h3 style={{ color: '#B91C1C', fontSize: '18px', marginBottom: '15px' }}>What to Avoid</h3>
        <ul style={{ ...commonStyles.bodyText, paddingLeft: '20px', margin: 0 }}>
          {data.parentGuidance.dont.map((item, i) => <li key={i} style={{ marginBottom: '10px' }}>{item}</li>)}
        </ul>
      </div>
    </div>
    <PageFooter num={23} />
  </div>
);

export const Page24ParentAction = ({ data }) => (
  <div id="student-page-24" style={commonStyles.page}>
    <PageHeader title="PARENT ACTION PLAN" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Practical Next Steps</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Specific conversations to have and habits to build over the next 90 days.</p>
    </div>
    <PageFooter num={24} />
  </div>
);

export const Page25StudentAction = ({ data }) => (
  <div id="student-page-25" style={commonStyles.page}>
    <PageHeader title="STUDENT ACTION PLAN" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Your Playbook</h2>
    <div style={{ ...commonStyles.card, backgroundColor: colors.bgTint, border: 'none' }}>
      <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '10px' }}>Immediate Action (Next 30 Days)</h3>
      <p style={{ ...commonStyles.bodyText, color: colors.pGreen, fontWeight: 600 }}>{data.studentAction.immediate}</p>
    </div>
    <div style={commonStyles.card}>
      <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '10px' }}>Short-Term Action (Next 6 Months)</h3>
      <p style={commonStyles.bodyText}>{data.studentAction.shortTerm}</p>
    </div>
    <div style={commonStyles.card}>
      <h3 style={{ color: colors.pGreen, fontSize: '18px', marginBottom: '10px' }}>Mindset Shift</h3>
      <p style={commonStyles.bodyText}>{data.studentAction.mindset}</p>
    </div>
    <PageFooter num={25} />
  </div>
);

export const Page26Roadmap = ({ data }) => (
  <div id="student-page-26" style={commonStyles.page}>
    <PageHeader title="ONE-YEAR ROADMAP" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>The Development Timeline</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>A visual timeline for {data.student.firstName}'s next 12 months of development.</p>
    </div>
    <PageFooter num={26} />
  </div>
);

export const Page27LongTerm = ({ data }) => (
  <div id="student-page-27" style={commonStyles.page}>
    <PageHeader title="LONG-TERM GROWTH" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Looking Ahead</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Strategies for high school, university preparation, and early career positioning.</p>
    </div>
    <PageFooter num={27} />
  </div>
);

export const Page28Resources = ({ data }) => (
  <div id="student-page-28" style={commonStyles.page}>
    <PageHeader title="RECOMMENDED RESOURCES" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Tools for Success</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>Curated books, courses, platforms, and activities tailored to {data.student.firstName}.</p>
    </div>
    <PageFooter num={28} />
  </div>
);

export const Page29Counselor = ({ data }) => (
  <div id="student-page-29" style={commonStyles.page}>
    <PageHeader title="COUNSELOR INSIGHTS" name={data.student.fullName} />
    <h2 style={commonStyles.sectionTitle}>Expert Observations</h2>
    <div style={commonStyles.card}>
      <p style={commonStyles.bodyText}>A parent-friendly summary of the counselor's private notes and discussion points.</p>
    </div>
    <PageFooter num={29} />
  </div>
);

export const Page30Conclusion = ({ data }) => (
  <div id="student-page-30" style={{ ...commonStyles.page, backgroundColor: colors.pGreen, color: colors.bgWhite, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
    <h2 style={{ fontSize: '36px', margin: '0 0 20px 0', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Your Journey Begins Here</h2>
    <p style={{ fontSize: '18px', lineHeight: '1.8', margin: '0 auto 40px auto', maxWidth: '600px', opacity: 0.9 }}>
      {data.student.firstName}, you have a unique and powerful cognitive profile. The world needs the specific combination of talents you bring. Use this report not as a set of rules, but as a compass to navigate your future with confidence and clarity.
    </p>
    <div style={{ width: '60px', height: '4px', backgroundColor: colors.sGreen, margin: '0 auto 40px auto', borderRadius: '2px' }}></div>
    <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>The E-Brave Compass Team</p>
    <PageFooter num={30} />
  </div>
);
