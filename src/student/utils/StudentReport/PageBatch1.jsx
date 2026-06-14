import React from 'react';
import { colors, commonStyles, slideWidth, slideHeight } from './ReportStyles';
import { User, MapPin, Phone, Mail, GraduationCap, ArrowRight, Gauge, BrainCircuit } from 'lucide-react';

export const Page01Cover = ({ data }) => (
  <div id="student-page-1" style={{ ...commonStyles.page, backgroundColor: '#4a154b', color: colors.white }}>
    {/* Left abstract shapes */}
    <div style={{ position: 'absolute', left: '-200px', top: '-200px', width: '800px', height: '1200px', backgroundColor: '#e2e8f0', borderRadius: '50%' }}></div>
    
    {/* Simulated Phone Mockup */}
    <div style={{ position: 'absolute', left: '150px', top: '150px', width: '400px', height: '780px', backgroundColor: '#d946ef', borderRadius: '40px', border: '12px solid #334155', transform: 'rotate(-5deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px' }}>
       <div style={{ width: '200px', height: '200px', backgroundColor: '#0ea5e9', borderRadius: '50%', border: '8px solid #0284c7' }}></div>
    </div>
    
    <div style={{ position: 'absolute', left: '700px', top: '200px' }}>
      <h1 style={{ fontSize: '120px', fontWeight: 900, marginBottom: '20px' }}>SKilliX</h1>
      <div style={{ backgroundColor: '#e2e8f0', color: '#0f172a', padding: '20px 100px', borderRadius: '60px', display: 'inline-block' }}>
        <h2 style={{ fontSize: '100px', fontWeight: 900, margin: 0 }}>Profile</h2>
      </div>
    </div>

    <div style={{ position: 'absolute', left: '800px', top: '550px', fontSize: '36px', lineHeight: '2.5' }}>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ width: '300px', fontWeight: 700 }}>Name</div>
        <div>: {data.student.name}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ width: '300px', fontWeight: 700 }}>Place</div>
        <div>: {data.student.place}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ width: '300px', fontWeight: 700 }}>Mobile</div>
        <div>: {data.student.mobile}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px', marginTop: '40px' }}>
        <div style={{ width: '300px', fontWeight: 700 }}>Class Studying</div>
        <div>: {data.student.class}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ width: '300px', fontWeight: 700 }}>Email id</div>
        <div>: {data.student.email}</div>
      </div>
    </div>
  </div>
);

export const Page02Title = () => (
  <div id="student-page-2" style={commonStyles.page}>
    <div style={{ position: 'absolute', left: '150px', top: '350px' }}>
      <h1 style={commonStyles.titleHuge}>CAREER</h1>
      <h1 style={commonStyles.titleHuge}>ASSESSMENT</h1>
      <h1 style={commonStyles.titleHuge}>REPORT</h1>
    </div>
    
    <div style={{ position: 'absolute', right: '150px', top: '100px', color: '#475569', fontSize: '24px' }}>
      rameezvkd@gmail.com
    </div>

    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: '#0f172a' }}>
      <h2 style={{ color: '#e2e8f0', fontSize: '80px', margin: '40px 0 0 150px', fontWeight: 900 }}>SKilliX</h2>
    </div>

    {/* Abstract Vector Simulation */}
    <div style={{ position: 'absolute', right: '200px', bottom: '200px' }}>
      <svg width="600" height="600" viewBox="0 0 600 600">
        <path d="M 100,500 Q 300,500 300,300 T 500,100" fill="none" stroke="#fbbf24" strokeWidth="40" strokeLinecap="round" />
        <circle cx="100" cy="500" r="30" fill="#ef4444" />
        <circle cx="500" cy="100" r="30" fill="#3b82f6" />
      </svg>
    </div>
  </div>
);

export const Page03Brief = () => (
  <div id="student-page-3" style={commonStyles.page}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '700px', backgroundColor: '#1e3a8a' }}></div>
    
    <div style={{ position: 'absolute', right: '150px', top: '150px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '200px', color: '#1e3a8a' }}>A Brief</h1>
    </div>

    <div style={{ position: 'absolute', right: '150px', top: '450px', width: '1000px' }}>
      <p style={{ ...commonStyles.bodyText, color: '#f8fafc', lineHeight: '2' }}>
        We empower individuals to discover their true potential and embark on a journey towards a rewarding career. We firmly believe in the transformative power of growth. We provide a dynamic environment where you can shape your professional journey. Step into our vibrant space, where experienced mentors will guide you through practical experiences, honing your skills and unleashing your potential. With Aspiro Learnings, unlock endless possibilities and design your career path with confidence. Every step you take with us leads to a future filled with growth and success.
      </p>
    </div>
  </div>
);

export const Page04Preface = () => (
  <div id="student-page-4" style={{ ...commonStyles.page, backgroundColor: '#0f172a' }}>
    <div style={{ position: 'absolute', left: '150px', top: '150px', width: '800px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '160px', color: '#93c5fd', marginBottom: '60px' }}>Preface</h1>
      <p style={{ ...commonStyles.bodyText, color: '#f8fafc', marginBottom: '60px' }}>
        Understanding aptitude, personality types, behavior, and interests is crucial for pursuing a successful career and achieving your future goals. Now that you have completed a skill assessment based on these criteria, carefully review the report provided on the following pages. Seek the necessary guidance to comprehend and utilize the insights to advance toward your desired career path.
      </p>
      <p style={{ ...commonStyles.bodyText, color: '#fbbf24', fontWeight: 700 }}>
        This report offers informational guidance only, not decisions; for a detailed assessment, consult a professional career coach to tailor it to your goals.
      </p>
    </div>
    
    {/* Simulated Emotion Dial */}
    <div style={{ position: 'absolute', right: '150px', top: '150px', width: '800px', height: '800px', backgroundColor: '#7dd3fc', borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Gauge size={400} color="#0f172a" strokeWidth={1} />
    </div>
  </div>
);

export const Page05StarAssessment = () => (
  <div id="student-page-5" style={commonStyles.page}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: '#f8fafc', fontSize: '60px', margin: 0 }}>Behaviour, Skills, Aptitude etc...</h2>
    </div>

    <div style={{ position: 'absolute', right: '150px', top: '400px' }}>
      <h1 style={commonStyles.titleHuge}>STAR CAREER</h1>
      <h1 style={commonStyles.titleHuge}>ASSESSMENT</h1>
    </div>

    {/* Speedometer Left */}
    <div style={{ position: 'absolute', left: '100px', bottom: '200px' }}>
      <div style={{ width: '600px', height: '300px', borderTopLeftRadius: '300px', borderTopRightRadius: '300px', background: 'conic-gradient(from 180deg at 50% 100%, #ef4444 0deg, #fbbf24 90deg, #10b981 180deg)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-80px', left: '200px', width: '200px', height: '200px', backgroundColor: '#6366f1', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <span style={{ color: 'white', fontSize: '40px', fontWeight: 800 }}>SKILL</span>
        </div>
      </div>
    </div>
  </div>
);

export const Page06BehaviourIntro = () => (
  <div id="student-page-6" style={commonStyles.page}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: '#1e3a8a' }}></div>
    
    <div style={{ position: 'absolute', right: '100px', top: '100px', width: '1000px' }}>
      <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'right', fontSize: '70px' }}>BEHAVIOURAL ABILITIES</h1>
      <p style={{ ...commonStyles.bodyText, textAlign: 'justify' }}>
        Behavioural ability, encompassing traits like communication, problem-solving, adaptability, and emotional intelligence, is crucial in career guidance. It aids individuals in understanding themselves, making informed decisions, and effectively communicating their ideas. Moreover, it equips them with the skills needed to navigate challenges, collaborate with others, and thrive in dynamic work environments. By focusing on behavioural abilities, career guidance programs not only enhance individual employability and job satisfaction but also contribute to organizational success and societal development.
      </p>
    </div>

    {/* Left Visual Simulation */}
    <div style={{ position: 'absolute', left: '100px', top: '200px', color: '#0d9488' }}>
      <BrainCircuit size={600} strokeWidth={1} />
    </div>
  </div>
);

export const Page07StarQuadrants = () => (
  <div id="student-page-7" style={{ ...commonStyles.page, backgroundColor: '#1e3a8a' }}>
    <h1 style={{ ...commonStyles.sectionTitle, color: '#f8fafc', margin: '80px 0 60px 100px' }}>BEHAVIOURAL ABILITIES</h1>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '0 100px' }}>
      <div style={{ backgroundColor: '#bfdbfe', borderRadius: '40px', padding: '50px' }}>
        <h2 style={{ fontSize: '50px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: 900 }}>STRUCTURE</h2>
        <p style={{ fontSize: '32px', color: '#334155', lineHeight: '1.5', margin: 0 }}>Methodical individuals with a strong preference for structure prioritize stability, predictability, and adherence to established rules and procedures while excelling in organization and efficiency.</p>
      </div>
      <div style={{ backgroundColor: '#bfdbfe', borderRadius: '40px', padding: '50px' }}>
        <h2 style={{ fontSize: '50px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: 900 }}>THEORETICAL</h2>
        <p style={{ fontSize: '32px', color: '#334155', lineHeight: '1.5', margin: 0 }}>Theory-oriented individuals prioritize logic, seek innovation, and require support to bridge abstract ideas with practical implementation while recognizing emotional nuances in interactions.</p>
      </div>
      <div style={{ backgroundColor: '#bfdbfe', borderRadius: '40px', padding: '50px' }}>
        <h2 style={{ fontSize: '50px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: 900 }}>ACTION</h2>
        <p style={{ fontSize: '32px', color: '#334155', lineHeight: '1.5', margin: 0 }}>Action-oriented individuals excel in negotiation and problem-solving, but need support to balance impulsivity with long-term planning and grasp conceptual importance.</p>
      </div>
      <div style={{ backgroundColor: '#bfdbfe', borderRadius: '40px', padding: '50px' }}>
        <h2 style={{ fontSize: '50px', color: '#0f172a', margin: '0 0 20px 0', fontWeight: 900 }}>RELATIONSHIP</h2>
        <p style={{ fontSize: '32px', color: '#334155', lineHeight: '1.5', margin: 0 }}>Relationship-oriented individuals excel in inspiring others while seeking meaningful connections and personal growth, yet require support to assert boundaries and maintain well-being.</p>
      </div>
    </div>
  </div>
);

export const Page08StarChart = ({ data }) => {
  const max = 100;
  const barWidth = 200;
  
  return (
    <div id="student-page-8" style={commonStyles.page}>
      <div style={{ position: 'absolute', left: '600px', top: '150px', width: '1100px', height: '750px', borderLeft: '2px solid #94a3b8', borderBottom: '2px solid #94a3b8', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '0' }}>
        
        {/* Y Axis Labels */}
        <div style={{ position: 'absolute', left: '-60px', bottom: '-20px', fontSize: '30px', color: '#475569' }}>0</div>
        <div style={{ position: 'absolute', left: '-70px', bottom: '25%', fontSize: '30px', color: '#475569' }}>20</div>
        <div style={{ position: 'absolute', left: '-70px', bottom: '50%', fontSize: '30px', color: '#475569' }}>40</div>
        <div style={{ position: 'absolute', left: '-70px', bottom: '75%', fontSize: '30px', color: '#475569' }}>60</div>
        <div style={{ position: 'absolute', left: '-70px', bottom: '100%', fontSize: '30px', color: '#475569' }}>80</div>

        {/* Bars */}
        <div style={{ width: `${barWidth}px`, height: `${(data.star.relationship / max) * 100}%`, backgroundColor: colors.traitRelationship, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', width: '100%', textAlign: 'center', fontSize: '36px', color: '#475569' }}>{data.star.relationship}</div>
          <div style={{ position: 'absolute', bottom: '-60px', width: '100%', textAlign: 'center', fontSize: '30px', color: '#475569' }}>RELATIONSHIP</div>
        </div>
        
        <div style={{ width: `${barWidth}px`, height: `${(data.star.theoretical / max) * 100}%`, backgroundColor: colors.traitTheoretical, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', width: '100%', textAlign: 'center', fontSize: '36px', color: '#475569' }}>{data.star.theoretical}</div>
          <div style={{ position: 'absolute', bottom: '-60px', width: '100%', textAlign: 'center', fontSize: '30px', color: '#475569' }}>THEORETICAL</div>
        </div>

        <div style={{ width: `${barWidth}px`, height: `${(data.star.structure / max) * 100}%`, backgroundColor: colors.traitStructure, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', width: '100%', textAlign: 'center', fontSize: '36px', color: '#475569' }}>{data.star.structure}</div>
          <div style={{ position: 'absolute', bottom: '-60px', width: '100%', textAlign: 'center', fontSize: '30px', color: '#475569' }}>STRUCTURE</div>
        </div>

        <div style={{ width: `${barWidth}px`, height: `${(data.star.action / max) * 100}%`, backgroundColor: colors.traitAction, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-50px', width: '100%', textAlign: 'center', fontSize: '36px', color: '#475569' }}>{data.star.action}</div>
          <div style={{ position: 'absolute', bottom: '-60px', width: '100%', textAlign: 'center', fontSize: '30px', color: '#475569' }}>ACTION</div>
        </div>

      </div>
    </div>
  );
};
