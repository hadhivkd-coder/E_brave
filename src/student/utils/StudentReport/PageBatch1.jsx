import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { User, MapPin, Phone, Mail, GraduationCap, ArrowRight, Gauge, BrainCircuit } from 'lucide-react';

export const Page01Cover = ({ data }) => (
  <div id="student-page-1" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, color: colors.white }}>
    {/* Left abstract shapes */}
    <div style={{ position: 'absolute', left: '-200px', top: '-200px', width: '800px', height: '1200px', backgroundColor: colors.primaryLight, borderRadius: '50%', opacity: 0.1 }}></div>
    
    {/* Simulated Phone Mockup */}
    <div style={{ position: 'absolute', left: '150px', top: '150px', width: '400px', height: '780px', backgroundColor: colors.accentGreen, borderRadius: '40px', border: '12px solid #ffffff', transform: 'rotate(-5deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '150px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
       <div style={{ width: '200px', height: '200px', backgroundColor: colors.primaryDark, borderRadius: '50%', border: '8px solid #ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <User size={100} color="#ffffff" />
       </div>
    </div>
    
    <div style={{ position: 'absolute', left: '700px', top: '200px' }}>
      <h1 style={{ fontSize: '140px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-3px' }}>E-BRAVE</h1>
      <div style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark, padding: '20px 100px', borderRadius: '60px', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontSize: '100px', fontWeight: 900, margin: 0 }}>Profile</h2>
      </div>
    </div>

    <div style={{ position: 'absolute', left: '750px', top: '550px', fontSize: '36px', lineHeight: '2.5', backgroundColor: 'rgba(255,255,255,0.1)', padding: '60px', borderRadius: '40px', backdropFilter: 'blur(10px)' }}>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <div style={{ width: '300px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px' }}><User size={40}/> Name</div>
        <div>: {data.student.name}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <div style={{ width: '300px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px' }}><MapPin size={40}/> Place</div>
        <div>: {data.student.place}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <div style={{ width: '300px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px' }}><Phone size={40}/> Mobile</div>
        <div>: {data.student.mobile}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px', marginTop: '20px', alignItems: 'center' }}>
        <div style={{ width: '300px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px' }}><GraduationCap size={40}/> Class Studying</div>
        <div>: {data.student.class}</div>
      </div>
      <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
        <div style={{ width: '300px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px' }}><Mail size={40}/> Email id</div>
        <div>: {data.student.email}</div>
      </div>
    </div>
  </div>
);

export const Page02Title = ({ data }) => (
  <div id="student-page-2" style={commonStyles.page}>
    <div style={{ position: 'absolute', left: '150px', top: '350px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '150px', color: colors.primaryDark }}>CAREER</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '150px', color: colors.accentGreen }}>ASSESSMENT</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '150px', color: colors.primaryDark }}>REPORT</h1>
    </div>
    
    <div style={{ position: 'absolute', right: '150px', top: '100px', color: colors.textMut, fontSize: '28px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Mail size={30} /> {data.contact.email}
    </div>

    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: colors.primaryDark }}>
      <h2 style={{ color: colors.white, fontSize: '80px', margin: '50px 0 0 150px', fontWeight: 900, letterSpacing: '5px' }}>E-BRAVE</h2>
    </div>

    {/* Abstract Vector Simulation */}
    <div style={{ position: 'absolute', right: '200px', bottom: '250px' }}>
      <svg width="600" height="600" viewBox="0 0 600 600">
        <path d="M 100,500 Q 300,500 300,300 T 500,100" fill="none" stroke={colors.accentYellow} strokeWidth="40" strokeLinecap="round" />
        <circle cx="100" cy="500" r="40" fill={colors.accentGreen} />
        <circle cx="500" cy="100" r="40" fill={colors.primaryDark} />
      </svg>
    </div>
  </div>
);

export const Page03Brief = () => (
  <div id="student-page-3" style={{ ...commonStyles.page, backgroundColor: colors.primaryLight }}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '700px', backgroundColor: colors.primaryDark }}></div>
    
    <div style={{ position: 'absolute', right: '150px', top: '150px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '200px', color: colors.primaryDark }}>A Brief</h1>
    </div>

    <div style={{ position: 'absolute', right: '150px', top: '450px', width: '1200px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '60px', borderRadius: '40px', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)' }}>
      <p style={{ ...commonStyles.bodyText, color: colors.white, lineHeight: '2.2', fontSize: '36px', textAlign: 'justify' }}>
        We empower individuals to discover their true potential and embark on a journey towards a rewarding career. We firmly believe in the transformative power of growth. We provide a dynamic environment where you can shape your professional journey. Step into our vibrant space, where experienced mentors will guide you through practical experiences, honing your skills and unleashing your potential. With Aspiro Learnings, unlock endless possibilities and design your career path with confidence. Every step you take with us leads to a future filled with growth and success.
      </p>
    </div>
  </div>
);

export const Page04Preface = () => (
  <div id="student-page-4" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark }}>
    <div style={{ position: 'absolute', left: '150px', top: '200px', width: '1000px' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '160px', color: colors.primaryLight, marginBottom: '60px' }}>Preface</h1>
      <div style={{ borderLeft: `8px solid ${colors.accentGreen}`, paddingLeft: '40px' }}>
        <p style={{ ...commonStyles.bodyText, color: colors.white, marginBottom: '60px', fontSize: '38px', lineHeight: '1.8' }}>
          Understanding aptitude, personality types, behavior, and interests is crucial for pursuing a successful career and achieving your future goals. Now that you have completed a skill assessment based on these criteria, carefully review the report provided on the following pages. Seek the necessary guidance to comprehend and utilize the insights to advance toward your desired career path.
        </p>
        <p style={{ ...commonStyles.bodyText, color: colors.accentYellow, fontWeight: 700, fontSize: '30px' }}>
          This report offers informational guidance only, not decisions; for a detailed assessment, consult a professional career coach to tailor it to your goals.
        </p>
      </div>
    </div>
    
    {/* Simulated Emotion Dial */}
    <div style={{ position: 'absolute', right: '150px', top: '200px', width: '600px', height: '600px', backgroundColor: colors.accentGreen, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
      <Gauge size={300} color={colors.primaryDark} strokeWidth={1.5} />
    </div>
  </div>
);

export const Page05StarAssessment = () => (
  <div id="student-page-5" style={commonStyles.page}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '250px', backgroundColor: colors.primaryDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ color: colors.white, fontSize: '60px', margin: 0, fontWeight: 600, letterSpacing: '2px' }}>Behaviour, Skills, Aptitude etc...</h2>
    </div>

    <div style={{ position: 'absolute', right: '150px', top: '350px', textAlign: 'right' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '150px' }}>STAR CAREER</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '150px', color: colors.accentGreen }}>ASSESSMENT</h1>
    </div>

    {/* Speedometer Left */}
    <div style={{ position: 'absolute', left: '150px', bottom: '250px' }}>
      <div style={{ width: '600px', height: '300px', borderTopLeftRadius: '300px', borderTopRightRadius: '300px', background: `conic-gradient(from 180deg at 50% 100%, ${colors.accentYellow} 0deg, ${colors.accentGreen} 90deg, ${colors.primaryDark} 180deg)`, position: 'relative', boxShadow: '0 0 50px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', bottom: '0px', left: '150px', width: '300px', height: '150px', backgroundColor: colors.primaryLight, borderTopLeftRadius: '150px', borderTopRightRadius: '150px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '20px' }}>
           <span style={{ color: colors.primaryDark, fontSize: '50px', fontWeight: 900 }}>SKILL</span>
        </div>
      </div>
    </div>
  </div>
);

export const Page06BehaviourIntro = () => (
  <div id="student-page-6" style={commonStyles.page}>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '200px', backgroundColor: colors.primaryDark }}></div>
    
    <div style={{ position: 'absolute', right: '150px', top: '200px', width: '1000px' }}>
      <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'right', fontSize: '80px', color: colors.primaryDark }}>BEHAVIOURAL ABILITIES</h1>
      <div style={{ backgroundColor: colors.white, padding: '50px', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
         <p style={{ ...commonStyles.bodyText, textAlign: 'justify' }}>
           Behavioural ability, encompassing traits like communication, problem-solving, adaptability, and emotional intelligence, is crucial in career guidance. It aids individuals in understanding themselves, making informed decisions, and effectively communicating their ideas. Moreover, it equips them with the skills needed to navigate challenges, collaborate with others, and thrive in dynamic work environments. By focusing on behavioural abilities, career guidance programs not only enhance individual employability and job satisfaction but also contribute to organizational success and societal development.
         </p>
      </div>
    </div>

    {/* Left Visual Simulation */}
    <div style={{ position: 'absolute', left: '150px', top: '250px', color: colors.accentGreen, opacity: 0.8 }}>
      <BrainCircuit size={600} strokeWidth={1} />
    </div>
  </div>
);

export const Page07StarQuadrants = () => (
  <div id="student-page-7" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark }}>
    <h1 style={{ ...commonStyles.sectionTitle, color: colors.white, margin: '80px 0 80px 100px', fontSize: '90px' }}>BEHAVIOURAL ABILITIES</h1>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', padding: '0 100px' }}>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '40px', padding: '60px', borderLeft: `15px solid ${colors.traitStructure}` }}>
        <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: '0 0 20px 0', fontWeight: 900 }}>STRUCTURE</h2>
        <p style={{ fontSize: '32px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Methodical individuals with a strong preference for structure prioritize stability, predictability, and adherence to established rules and procedures while excelling in organization and efficiency.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '40px', padding: '60px', borderLeft: `15px solid ${colors.traitTheoretical}` }}>
        <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: '0 0 20px 0', fontWeight: 900 }}>THEORETICAL</h2>
        <p style={{ fontSize: '32px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Theory-oriented individuals prioritize logic, seek innovation, and require support to bridge abstract ideas with practical implementation while recognizing emotional nuances in interactions.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '40px', padding: '60px', borderLeft: `15px solid ${colors.traitAction}` }}>
        <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: '0 0 20px 0', fontWeight: 900 }}>ACTION</h2>
        <p style={{ fontSize: '32px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Action-oriented individuals excel in negotiation and problem-solving, but need support to balance impulsivity with long-term planning and grasp conceptual importance.</p>
      </div>
      <div style={{ backgroundColor: colors.primaryLight, borderRadius: '40px', padding: '60px', borderLeft: `15px solid ${colors.traitRelationship}` }}>
        <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: '0 0 20px 0', fontWeight: 900 }}>RELATIONSHIP</h2>
        <p style={{ fontSize: '32px', color: colors.textDark, lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>Relationship-oriented individuals excel in inspiring others while seeking meaningful connections and personal growth, yet require support to assert boundaries and maintain well-being.</p>
      </div>
    </div>
  </div>
);

export const Page08StarChart = ({ data }) => {
  const max = 100;
  const barWidth = 200;
  
  return (
    <div id="student-page-8" style={commonStyles.page}>
      <h1 style={{ ...commonStyles.sectionTitle, position: 'absolute', top: '80px', left: '100px', fontSize: '80px' }}>BEHAVIOURAL ABILITIES CHART</h1>
      
      <div style={{ position: 'absolute', left: '400px', top: '250px', width: '1300px', height: '650px', borderLeft: `4px solid ${colors.textMut}`, borderBottom: `4px solid ${colors.textMut}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '0' }}>
        
        {/* Y Axis Labels */}
        <div style={{ position: 'absolute', left: '-80px', bottom: '-20px', fontSize: '36px', color: colors.textMut, fontWeight: 700 }}>0</div>
        <div style={{ position: 'absolute', left: '-100px', bottom: '25%', fontSize: '36px', color: colors.textMut, fontWeight: 700 }}>20</div>
        <div style={{ position: 'absolute', left: '-100px', bottom: '50%', fontSize: '36px', color: colors.textMut, fontWeight: 700 }}>40</div>
        <div style={{ position: 'absolute', left: '-100px', bottom: '75%', fontSize: '36px', color: colors.textMut, fontWeight: 700 }}>60</div>
        <div style={{ position: 'absolute', left: '-100px', bottom: '100%', fontSize: '36px', color: colors.textMut, fontWeight: 700 }}>80</div>

        {/* Bars */}
        <div style={{ width: `${barWidth}px`, height: `${(data.star.relationship / max) * 100}%`, backgroundColor: colors.traitRelationship, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '40px', fontWeight: 900, color: colors.primaryDark }}>{data.star.relationship}</div>
          <div style={{ position: 'absolute', bottom: '-70px', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 800, color: colors.textDark }}>RELATIONSHIP</div>
        </div>
        
        <div style={{ width: `${barWidth}px`, height: `${(data.star.theoretical / max) * 100}%`, backgroundColor: colors.traitTheoretical, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '40px', fontWeight: 900, color: colors.primaryDark }}>{data.star.theoretical}</div>
          <div style={{ position: 'absolute', bottom: '-70px', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 800, color: colors.textDark }}>THEORETICAL</div>
        </div>

        <div style={{ width: `${barWidth}px`, height: `${(data.star.structure / max) * 100}%`, backgroundColor: colors.traitStructure, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '40px', fontWeight: 900, color: colors.primaryDark }}>{data.star.structure}</div>
          <div style={{ position: 'absolute', bottom: '-70px', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 800, color: colors.textDark }}>STRUCTURE</div>
        </div>

        <div style={{ width: `${barWidth}px`, height: `${(data.star.action / max) * 100}%`, backgroundColor: colors.traitAction, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: '-60px', width: '100%', textAlign: 'center', fontSize: '40px', fontWeight: 900, color: colors.primaryDark }}>{data.star.action}</div>
          <div style={{ position: 'absolute', bottom: '-70px', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 800, color: colors.textDark }}>ACTION</div>
        </div>

      </div>
    </div>
  );
};
