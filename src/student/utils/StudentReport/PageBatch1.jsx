import React from 'react';
import { colors, commonStyles, slideWidth } from './ReportStyles';
import { User, MapPin, Phone, Mail, GraduationCap, Gauge, BrainCircuit } from 'lucide-react';

export const Page01Cover = ({ data }) => (
  <div id="student-page-1" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, color: colors.white, padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    {/* Background elements */}
    <div style={{ position: 'absolute', top: '-300px', right: '-300px', width: '1000px', height: '1000px', backgroundColor: colors.primaryLight, borderRadius: '50%', opacity: 0.05 }}></div>
    <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '800px', height: '800px', backgroundColor: colors.accentGreen, borderRadius: '50%', opacity: 0.1 }}></div>
    
    <div style={{ zIndex: 10, marginBottom: '100px' }}>
      <h1 style={{ fontSize: '150px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-3px', color: colors.accentYellow }}>E-BRAVE</h1>
      <div style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark, padding: '30px 100px', borderRadius: '80px', display: 'inline-block', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '80px', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>Profile</h2>
      </div>
    </div>

    {/* Simulated Avatar / Profile badge */}
    <div style={{ zIndex: 10, width: '400px', height: '400px', backgroundColor: colors.accentGreen, borderRadius: '50%', border: '15px solid #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '100px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
      <User size={200} color="#ffffff" />
    </div>

    <div style={{ zIndex: 10, width: '100%', fontSize: '32px', lineHeight: '2.5', backgroundColor: 'rgba(255,255,255,0.08)', padding: '60px', borderRadius: '40px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}><User size={40} color={colors.accentYellow} /> Name</div>
        <div style={{ fontWeight: 600 }}>: {data.student.name}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}><MapPin size={40} color={colors.accentYellow} /> Place</div>
        <div style={{ fontWeight: 600 }}>: {data.student.place}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}><Phone size={40} color={colors.accentYellow} /> Mobile</div>
        <div style={{ fontWeight: 600 }}>: {data.student.mobile}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}><GraduationCap size={40} color={colors.accentYellow} /> Class</div>
        <div style={{ fontWeight: 600 }}>: {data.student.class}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left' }}><Mail size={40} color={colors.accentYellow} /> Email id</div>
        <div style={{ fontWeight: 600 }}>: {data.student.email}</div>
      </div>
    </div>
  </div>
);

export const Page02Title = ({ data }) => (
  <div id="student-page-2" style={{ ...commonStyles.page, justifyContent: 'space-between', padding: '100px' }}>
    <div style={{ alignSelf: 'flex-end', color: colors.textMut, fontSize: '28px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Mail size={30} /> {data?.contact?.email || 'ebravestudies@gmail.com'}
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryDark }}>CAREER</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.accentGreen }}>ASSESSMENT</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryDark }}>REPORT</h1>
      
      {/* Abstract Graphic */}
      <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
        <svg width="400" height="400" viewBox="0 0 600 600">
          <path d="M 100,500 Q 300,500 300,300 T 500,100" fill="none" stroke={colors.accentYellow} strokeWidth="40" strokeLinecap="round" />
          <circle cx="100" cy="500" r="50" fill={colors.accentGreen} />
          <circle cx="500" cy="100" r="50" fill={colors.primaryDark} />
        </svg>
      </div>
    </div>

    <div style={{ borderTop: `8px solid ${colors.primaryDark}`, paddingTop: '40px' }}>
      <h2 style={{ color: colors.primaryDark, fontSize: '60px', margin: 0, fontWeight: 900, letterSpacing: '5px' }}>E-BRAVE</h2>
      <p style={{ color: colors.textMut, fontSize: '24px', fontWeight: 600, margin: '10px 0 0 0' }}>EXPERT CAREER GUIDANCE</p>
    </div>
  </div>
);

export const Page03Brief = () => (
  <div id="student-page-3" style={{ ...commonStyles.page, backgroundColor: colors.primaryLight, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '140px', color: colors.primaryDark, marginBottom: '80px', textAlign: 'center' }}>A Brief</h1>

      <div style={{ backgroundColor: colors.white, padding: '80px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', borderTop: `15px solid ${colors.accentGreen}` }}>
        <p style={{ ...commonStyles.bodyText, color: colors.textDark, lineHeight: '2.0', fontSize: '32px', textAlign: 'justify' }}>
          We empower individuals to discover their true potential and embark on a journey towards a rewarding career. We firmly believe in the transformative power of growth. We provide a dynamic environment where you can shape your professional journey. Step into our vibrant space, where experienced mentors will guide you through practical experiences, honing your skills and unleashing your potential. With E-Brave, unlock endless possibilities and design your career path with confidence. Every step you take with us leads to a future filled with growth and success.
        </p>
      </div>
    </div>
    <div style={{ width: '100%', height: '100px', backgroundColor: colors.primaryDark }}></div>
  </div>
);

export const Page04Preface = () => (
  <div id="student-page-4" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '100px', justifyContent: 'center' }}>
    
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
      <div style={{ width: '300px', height: '300px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <Gauge size={150} color={colors.primaryDark} strokeWidth={2} />
      </div>
    </div>

    <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryLight, marginBottom: '60px', textAlign: 'center' }}>Preface</h1>
    
    <div style={{ borderLeft: `10px solid ${colors.accentYellow}`, paddingLeft: '50px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '50px', borderRadius: '0 40px 40px 0' }}>
      <p style={{ ...commonStyles.bodyText, color: colors.white, marginBottom: '40px', fontSize: '32px', lineHeight: '1.9', textAlign: 'justify' }}>
        Understanding aptitude, personality types, behavior, and interests is crucial for pursuing a successful career and achieving your future goals. Now that you have completed a skill assessment based on these criteria, carefully review the report provided on the following pages. Seek the necessary guidance to comprehend and utilize the insights to advance toward your desired career path.
      </p>
      <div style={{ backgroundColor: 'rgba(202, 138, 4, 0.2)', padding: '30px', borderRadius: '20px' }}>
        <p style={{ ...commonStyles.bodyText, color: colors.accentYellow, fontWeight: 700, fontSize: '26px', textAlign: 'center' }}>
          This report offers informational guidance only, not decisions; for a detailed assessment, consult a professional career coach to tailor it to your goals.
        </p>
      </div>
    </div>
  </div>
);

export const Page05StarAssessment = () => (
  <div id="student-page-5" style={{ ...commonStyles.page, justifyContent: 'space-between' }}>
    
    <div style={{ padding: '100px', textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '120px' }}>STAR CAREER</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '120px', color: colors.accentGreen }}>ASSESSMENT</h1>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {/* Abstract Circular Graphic */}
      <div style={{ width: '800px', height: '800px', borderRadius: '50%', background: `conic-gradient(from 180deg at 50% 50%, ${colors.accentYellow} 0deg, ${colors.accentGreen} 180deg, ${colors.primaryDark} 360deg)`, position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '500px', height: '500px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.1)' }}>
           <span style={{ color: colors.primaryDark, fontSize: '80px', fontWeight: 900, letterSpacing: '5px' }}>SKILL</span>
        </div>
      </div>
    </div>

    <div style={{ width: '100%', height: '150px', backgroundColor: colors.primaryDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: colors.white, fontSize: '40px', margin: 0, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>Behaviour, Skills, Aptitude</h2>
    </div>
  </div>
);

export const Page06BehaviourIntro = () => (
  <div id="student-page-6" style={{ ...commonStyles.page, padding: '100px', justifyContent: 'center', alignItems: 'center' }}>
    
    <div style={{ color: colors.accentGreen, opacity: 0.8, marginBottom: '60px' }}>
      <BrainCircuit size={400} strokeWidth={1} />
    </div>

    <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'center', fontSize: '70px', color: colors.primaryDark, marginBottom: '60px' }}>BEHAVIOURAL ABILITIES</h1>
    
    <div style={{ backgroundColor: colors.white, padding: '60px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)', borderTop: `10px solid ${colors.traitStructure}` }}>
       <p style={{ ...commonStyles.bodyText, textAlign: 'justify', fontSize: '32px', lineHeight: '2' }}>
         Behavioural ability, encompassing traits like communication, problem-solving, adaptability, and emotional intelligence, is crucial in career guidance. It aids individuals in understanding themselves, making informed decisions, and effectively communicating their ideas. Moreover, it equips them with the skills needed to navigate challenges, collaborate with others, and thrive in dynamic work environments. By focusing on behavioural abilities, career guidance programs not only enhance individual employability and job satisfaction but also contribute to organizational success.
       </p>
    </div>
  </div>
);

export const Page07StarQuadrants = () => (
  <div id="student-page-7" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '80px' }}>
    <h1 style={{ ...commonStyles.sectionTitle, color: colors.white, fontSize: '70px', textAlign: 'center', marginBottom: '60px' }}>BEHAVIOURAL ABILITIES</h1>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '30px', padding: '40px 60px', borderLeft: `20px solid ${colors.traitStructure}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '45px', color: colors.primaryDark, margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>Structure</h2>
        <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Methodical individuals with a strong preference for structure prioritize stability, predictability, and adherence to established rules and procedures while excelling in organization and efficiency.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '30px', padding: '40px 60px', borderLeft: `20px solid ${colors.traitTheoretical}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '45px', color: colors.primaryDark, margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>Theoretical</h2>
        <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Theory-oriented individuals prioritize logic, seek innovation, and require support to bridge abstract ideas with practical implementation while recognizing emotional nuances in interactions.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '30px', padding: '40px 60px', borderLeft: `20px solid ${colors.traitAction}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '45px', color: colors.primaryDark, margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>Action</h2>
        <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Action-oriented individuals excel in negotiation and problem-solving, but need support to balance impulsivity with long-term planning and grasp conceptual importance.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '30px', padding: '40px 60px', borderLeft: `20px solid ${colors.traitRelationship}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <h2 style={{ fontSize: '45px', color: colors.primaryDark, margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>Relationship</h2>
        <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Relationship-oriented individuals excel in inspiring others while seeking meaningful connections and personal growth, yet require support to assert boundaries and maintain well-being.</p>
      </div>
    </div>
  </div>
);

export const Page08StarChart = ({ data }) => {
  const max = 100;
  const barWidth = 140;
  
  return (
    <div id="student-page-8" style={{ ...commonStyles.page, padding: '100px' }}>
      <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'center', fontSize: '70px', marginBottom: '100px' }}>BEHAVIOURAL CHART</h1>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '850px', height: '900px', borderLeft: `6px solid ${colors.textMut}`, borderBottom: `6px solid ${colors.textMut}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', position: 'relative' }}>
          
          {/* Y Axis Labels */}
          <div style={{ position: 'absolute', left: '-70px', bottom: '-25px', fontSize: '32px', color: colors.textMut, fontWeight: 700 }}>0</div>
          <div style={{ position: 'absolute', left: '-80px', bottom: '25%', fontSize: '32px', color: colors.textMut, fontWeight: 700 }}>20</div>
          <div style={{ position: 'absolute', left: '-80px', bottom: '50%', fontSize: '32px', color: colors.textMut, fontWeight: 700 }}>40</div>
          <div style={{ position: 'absolute', left: '-80px', bottom: '75%', fontSize: '32px', color: colors.textMut, fontWeight: 700 }}>60</div>
          <div style={{ position: 'absolute', left: '-80px', bottom: '100%', fontSize: '32px', color: colors.textMut, fontWeight: 700 }}>80</div>

          {/* Bars */}
          <div style={{ width: `${barWidth}px`, height: `${(data.star.relationship / max) * 100}%`, backgroundColor: colors.traitRelationship, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '36px', fontWeight: 900, color: colors.primaryDark }}>{data.star.relationship}</div>
            <div style={{ position: 'absolute', bottom: '-80px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: colors.textDark }}>RELATIONSHIP</div>
          </div>
          
          <div style={{ width: `${barWidth}px`, height: `${(data.star.theoretical / max) * 100}%`, backgroundColor: colors.traitTheoretical, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '36px', fontWeight: 900, color: colors.primaryDark }}>{data.star.theoretical}</div>
            <div style={{ position: 'absolute', bottom: '-80px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: colors.textDark }}>THEORETICAL</div>
          </div>

          <div style={{ width: `${barWidth}px`, height: `${(data.star.structure / max) * 100}%`, backgroundColor: colors.traitStructure, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '36px', fontWeight: 900, color: colors.primaryDark }}>{data.star.structure}</div>
            <div style={{ position: 'absolute', bottom: '-80px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: colors.textDark }}>STRUCTURE</div>
          </div>

          <div style={{ width: `${barWidth}px`, height: `${(data.star.action / max) * 100}%`, backgroundColor: colors.traitAction, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '36px', fontWeight: 900, color: colors.primaryDark }}>{data.star.action}</div>
            <div style={{ position: 'absolute', bottom: '-80px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: colors.textDark }}>ACTION</div>
          </div>
        </div>
      </div>
    </div>
  );
};
