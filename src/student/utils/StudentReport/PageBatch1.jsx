import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { User, MapPin, Phone, Mail, GraduationCap, Gauge, BrainCircuit } from 'lucide-react';

// Reusable decorative background for premium feel
const PremiumBackground = ({ opacity = 0.05 }) => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <svg width="100%" height="100%" viewBox="0 0 1200 1697" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colors.primaryDark} strokeWidth="1" strokeOpacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid)`} opacity={opacity} />
      <circle cx="100" cy="200" r="400" fill={colors.accentGreen} opacity={opacity * 1.5} filter="blur(100px)" />
      <circle cx="1100" cy="1400" r="500" fill={colors.accentYellow} opacity={opacity * 1.5} filter="blur(150px)" />
    </svg>
  </div>
);

export const Page01Cover = ({ data }) => (
  <div id="student-page-1" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, color: colors.white, padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <PremiumBackground opacity={0.15} />
    
    <div style={{ zIndex: 10, marginBottom: '80px', position: 'relative' }}>
      <h1 style={{ fontSize: '180px', fontWeight: 900, marginBottom: '0', letterSpacing: '-5px', color: colors.accentYellow, textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>E-BRAVE</h1>
      <div style={{ backgroundColor: 'rgba(230, 240, 226, 0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '20px 80px', borderRadius: '80px', display: 'inline-block', backdropFilter: 'blur(20px)', marginTop: '-20px' }}>
        <h2 style={{ fontSize: '60px', fontWeight: 900, margin: 0, textTransform: 'uppercase', color: colors.white, letterSpacing: '4px' }}>Profile</h2>
      </div>
    </div>

    {/* Avatar with multiple pulsing rings */}
    <div style={{ zIndex: 10, position: 'relative', width: '450px', height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '80px' }}>
      <div style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', border: `4px dashed ${colors.accentYellow}`, opacity: 0.5, animation: 'spin 20s linear infinite' }}></div>
      <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', backgroundColor: colors.accentGreen, opacity: 0.3 }}></div>
      <div style={{ position: 'absolute', width: '330px', height: '330px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
        <User size={180} color={colors.primaryDark} />
      </div>
    </div>

    {/* Glassmorphic Data Card */}
    <div style={{ zIndex: 10, width: '100%', fontSize: '32px', lineHeight: '2.5', backgroundColor: 'rgba(255,255,255,0.05)', padding: '60px 80px', borderRadius: '40px', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', color: colors.accentYellow }}><User size={40} /> Name</div>
        <div style={{ fontWeight: 600 }}>: {data.student.name}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', color: colors.accentYellow }}><MapPin size={40} /> Place</div>
        <div style={{ fontWeight: 600 }}>: {data.student.place}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', color: colors.accentYellow }}><Phone size={40} /> Mobile</div>
        <div style={{ fontWeight: 600 }}>: {data.student.mobile}</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', color: colors.accentYellow }}><GraduationCap size={40} /> Class</div>
        <div style={{ fontWeight: 600 }}>: {data.student.class}</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '400px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '20px', color: colors.accentYellow }}><Mail size={40} /> Email id</div>
        <div style={{ fontWeight: 600 }}>: {data.student.email}</div>
      </div>
    </div>
  </div>
);

export const Page02Title = ({ data }) => (
  <div id="student-page-2" style={{ ...commonStyles.page, justifyContent: 'space-between', padding: '100px' }}>
    <PremiumBackground opacity={0.08} />
    
    <div style={{ alignSelf: 'flex-end', color: colors.primaryDark, backgroundColor: colors.white, padding: '15px 40px', borderRadius: '50px', fontSize: '28px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: `2px solid ${colors.primaryLight}`, zIndex: 10 }}>
      <Mail size={30} color={colors.accentGreen} /> {data?.contact?.email || 'ebravestudies@gmail.com'}
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
      <div style={{ position: 'relative' }}>
         <h1 style={{ fontSize: '150px', fontWeight: 900, color: colors.primaryLight, position: 'absolute', top: '-100px', left: '-20px', opacity: 0.8, letterSpacing: '5px' }}>REPORT</h1>
         <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryDark, position: 'relative' }}>CAREER</h1>
         <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.accentGreen, position: 'relative' }}>ASSESSMENT</h1>
         <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryDark, position: 'relative' }}>REPORT</h1>
      </div>
      
      {/* Abstract Corporate Graphic */}
      <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'flex-start', paddingLeft: '50px' }}>
        <svg width="600" height="300" viewBox="0 0 600 300">
          <path d="M 0,250 Q 150,50 300,150 T 600,50" fill="none" stroke={`url(#grad)`} strokeWidth="30" strokeLinecap="round" />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.accentYellow} />
              <stop offset="100%" stopColor={colors.accentGreen} />
            </linearGradient>
          </defs>
          <circle cx="0" cy="250" r="30" fill={colors.primaryDark} />
          <circle cx="600" cy="50" r="30" fill={colors.traitStructure} />
        </svg>
      </div>
    </div>

    <div style={{ borderTop: `10px solid ${colors.primaryDark}`, paddingTop: '40px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <h2 style={{ color: colors.primaryDark, fontSize: '70px', margin: 0, fontWeight: 900, letterSpacing: '3px' }}>E-BRAVE</h2>
        <p style={{ color: colors.textMut, fontSize: '26px', fontWeight: 700, margin: '10px 0 0 0', letterSpacing: '2px' }}>EXPERT CAREER GUIDANCE</p>
      </div>
      <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: colors.accentYellow, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={colors.primaryDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    </div>
  </div>
);

export const Page03Brief = () => (
  <div id="student-page-3" style={{ ...commonStyles.page, display: 'flex', flexDirection: 'column' }}>
    <PremiumBackground opacity={0.1} />
    <div style={{ flex: 1, padding: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '80px' }}>
         <div style={{ width: '80px', height: '80px', backgroundColor: colors.accentYellow, borderRadius: '20px', transform: 'rotate(45deg)' }}></div>
         <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.primaryDark }}>A Brief</h1>
      </div>

      <div style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: '80px', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.08)', borderLeft: `20px solid ${colors.accentGreen}`, backdropFilter: 'blur(20px)' }}>
        <p style={{ ...commonStyles.bodyText, color: colors.textDark, lineHeight: '2.0', fontSize: '36px', textAlign: 'justify' }}>
          We empower individuals to discover their <strong style={{ color: colors.primaryDark }}>true potential</strong> and embark on a journey towards a rewarding career. We firmly believe in the transformative power of growth. We provide a dynamic environment where you can shape your professional journey. Step into our vibrant space, where experienced mentors will guide you through practical experiences, honing your skills and unleashing your potential. With <strong style={{ color: colors.accentGreen }}>E-Brave</strong>, unlock endless possibilities and design your career path with confidence. Every step you take with us leads to a future filled with growth and success.
        </p>
      </div>
    </div>
    <div style={{ width: '100%', height: '120px', backgroundColor: colors.primaryDark, zIndex: 10 }}></div>
  </div>
);

export const Page04Preface = () => (
  <div id="student-page-4" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '100px', justifyContent: 'center', position: 'relative' }}>
    {/* Abstract geometric background */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, zIndex: 0 }}>
       <svg width="100%" height="100%">
          <circle cx="200" cy="200" r="600" fill="none" stroke={colors.accentGreen} strokeWidth="2" strokeDasharray="10 20" />
          <circle cx="1000" cy="1400" r="800" fill="none" stroke={colors.accentYellow} strokeWidth="2" strokeDasharray="20 40" />
       </svg>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px', zIndex: 10 }}>
      <div style={{ width: '250px', height: '250px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `10px solid ${colors.accentGreen}` }}>
        <Gauge size={120} color={colors.primaryDark} strokeWidth={2} />
      </div>
    </div>

    <h1 style={{ ...commonStyles.titleHuge, fontSize: '130px', color: colors.white, marginBottom: '80px', textAlign: 'center', zIndex: 10 }}>Preface</h1>
    
    <div style={{ zIndex: 10, borderLeft: `12px solid ${colors.accentYellow}`, backgroundColor: 'rgba(255,255,255,0.05)', padding: '60px', borderRadius: '0 50px 50px 0', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
      <p style={{ ...commonStyles.bodyText, color: colors.primaryLight, marginBottom: '50px', fontSize: '34px', lineHeight: '2.0', textAlign: 'justify', fontWeight: 400 }}>
        Understanding aptitude, personality types, behavior, and interests is crucial for pursuing a successful career and achieving your future goals. Now that you have completed a skill assessment based on these criteria, carefully review the report provided on the following pages. Seek the necessary guidance to comprehend and utilize the insights to advance toward your desired career path.
      </p>
      <div style={{ backgroundColor: colors.white, padding: '30px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
        <p style={{ ...commonStyles.bodyText, color: colors.primaryDark, fontWeight: 800, fontSize: '26px', textAlign: 'center' }}>
          This report offers informational guidance only, not decisions; for a detailed assessment, consult a professional career coach to tailor it to your goals.
        </p>
      </div>
    </div>
  </div>
);

export const Page05StarAssessment = () => (
  <div id="student-page-5" style={{ ...commonStyles.page, justifyContent: 'space-between', backgroundColor: colors.primaryDark }}>
    {/* Aspirational Photography Background */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/images/ebrave_abstract_future.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, zIndex: 0 }}></div>
    
    <div style={{ padding: '120px 100px 0 100px', textAlign: 'center', zIndex: 10 }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '140px', letterSpacing: '-2px', color: colors.white }}>STAR CAREER</h1>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '140px', color: colors.accentYellow, letterSpacing: '-2px' }}>ASSESSMENT</h1>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, zIndex: 10 }}>
      {/* Intricate Radial Data Visualization */}
      <div style={{ width: '700px', height: '700px', borderRadius: '50%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width="800" height="800" style={{ position: 'absolute' }}>
          <circle cx="400" cy="400" r="380" fill="none" stroke={colors.accentGreen} strokeWidth="40" opacity="0.3" />
          <circle cx="400" cy="400" r="380" fill="none" stroke={colors.accentGreen} strokeWidth="40" strokeDasharray="600 2000" strokeLinecap="round" transform="rotate(-90 400 400)" />
          <circle cx="400" cy="400" r="320" fill="none" stroke={colors.accentYellow} strokeWidth="20" strokeDasharray="400 2000" strokeLinecap="round" transform="rotate(45 400 400)" />
          <circle cx="400" cy="400" r="260" fill="none" stroke={colors.white} strokeWidth="10" strokeDasharray="30 20" opacity="0.5" />
        </svg>
        <div style={{ width: '450px', height: '450px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', zIndex: 2 }}>
           <div style={{ textAlign: 'center' }}>
             <span style={{ color: colors.primaryDark, fontSize: '90px', fontWeight: 900, display: 'block', lineHeight: '1' }}>STAR</span>
             <span style={{ color: colors.textMut, fontSize: '30px', fontWeight: 700, letterSpacing: '5px' }}>MODEL</span>
           </div>
        </div>
      </div>
    </div>

    <div style={{ width: '100%', height: '180px', backgroundColor: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
      <h2 style={{ color: colors.primaryDark, fontSize: '42px', margin: 0, fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase' }}>Behaviour • Skills • Aptitude</h2>
    </div>
  </div>
);

export const Page06BehaviourIntro = () => (
  <div id="student-page-6" style={{ ...commonStyles.page, padding: '100px', justifyContent: 'center', alignItems: 'center' }}>
    <PremiumBackground opacity={0.05} />
    
    <div style={{ width: '300px', height: '300px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '80px', boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.1)', zIndex: 10 }}>
      <BrainCircuit size={150} color={colors.accentGreen} strokeWidth={1.5} />
    </div>

    <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'center', fontSize: '80px', color: colors.primaryDark, marginBottom: '60px', zIndex: 10 }}>BEHAVIOURAL ABILITIES</h1>
    
    <div style={{ zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', padding: '80px', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.08)', borderTop: `15px solid ${colors.traitStructure}`, backdropFilter: 'blur(20px)' }}>
       <p style={{ ...commonStyles.bodyText, textAlign: 'justify', fontSize: '34px', lineHeight: '2.0', color: colors.textDark }}>
         Behavioural ability, encompassing traits like communication, problem-solving, adaptability, and emotional intelligence, is <strong style={{ color: colors.primaryDark }}>crucial in career guidance</strong>. It aids individuals in understanding themselves, making informed decisions, and effectively communicating their ideas. Moreover, it equips them with the skills needed to navigate challenges, collaborate with others, and thrive in dynamic work environments. By focusing on behavioural abilities, career guidance programs not only enhance individual employability and job satisfaction but also contribute to organizational success.
       </p>
    </div>
  </div>
);

export const Page07StarQuadrants = () => (
  <div id="student-page-7" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '80px' }}>
    {/* Aspirational Image Overlay */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/images/ebrave_student_success.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: 0, mixBlendMode: 'luminosity' }}></div>

    <h1 style={{ ...commonStyles.sectionTitle, color: colors.white, fontSize: '75px', textAlign: 'center', marginBottom: '80px', zIndex: 10, position: 'relative' }}>BEHAVIOURAL TRAITS</h1>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', zIndex: 10, position: 'relative' }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '40px', padding: '50px 70px', borderLeft: `25px solid ${colors.traitStructure}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: 0, fontWeight: 900, textTransform: 'uppercase' }}>Structure</h2>
          <span style={{ fontSize: '80px', color: colors.traitStructure, opacity: 0.2, fontWeight: 900 }}>01</span>
        </div>
        <p style={{ fontSize: '30px', color: colors.textDark, lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>Methodical individuals with a strong preference for structure prioritize stability, predictability, and adherence to established rules and procedures while excelling in organization and efficiency.</p>
      </div>
      
      <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '40px', padding: '50px 70px', borderLeft: `25px solid ${colors.traitTheoretical}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: 0, fontWeight: 900, textTransform: 'uppercase' }}>Theoretical</h2>
          <span style={{ fontSize: '80px', color: colors.traitTheoretical, opacity: 0.2, fontWeight: 900 }}>02</span>
        </div>
        <p style={{ fontSize: '30px', color: colors.textDark, lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>Theory-oriented individuals prioritize logic, seek innovation, and require support to bridge abstract ideas with practical implementation while recognizing emotional nuances in interactions.</p>
      </div>
      
      <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '40px', padding: '50px 70px', borderLeft: `25px solid ${colors.traitAction}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: 0, fontWeight: 900, textTransform: 'uppercase' }}>Action</h2>
          <span style={{ fontSize: '80px', color: colors.traitAction, opacity: 0.2, fontWeight: 900 }}>03</span>
        </div>
        <p style={{ fontSize: '30px', color: colors.textDark, lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>Action-oriented individuals excel in negotiation and problem-solving, but need support to balance impulsivity with long-term planning and grasp conceptual importance.</p>
      </div>
      
      <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '40px', padding: '50px 70px', borderLeft: `25px solid ${colors.traitRelationship}`, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '50px', color: colors.primaryDark, margin: 0, fontWeight: 900, textTransform: 'uppercase' }}>Relationship</h2>
          <span style={{ fontSize: '80px', color: colors.traitRelationship, opacity: 0.2, fontWeight: 900 }}>04</span>
        </div>
        <p style={{ fontSize: '30px', color: colors.textDark, lineHeight: '1.7', margin: 0, textAlign: 'justify' }}>Relationship-oriented individuals excel in inspiring others while seeking meaningful connections and personal growth, yet require support to assert boundaries and maintain well-being.</p>
      </div>
    </div>
  </div>
);

// Advanced SVG Radar Chart for Page 8 with Dynamic Archetype
export const Page08StarChart = ({ data }) => {
  const size = 650;
  const center = size / 2;
  const radius = size * 0.35; // 227px radius for 100%
  const max = 100;

  // Calculate points for the 4 axes
  // Structure (Top) -> Theoretical (Right) -> Action (Bottom) -> Relationship (Left)
  const getPoint = (value, angleDeg) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    const r = (value / max) * radius;
    return `${center + r * Math.cos(angleRad)},${center + r * Math.sin(angleRad)}`;
  };

  const pStructure = getPoint(data.star.structure, 0);
  const pTheoretical = getPoint(data.star.theoretical, 90);
  const pAction = getPoint(data.star.action, 180);
  const pRelationship = getPoint(data.star.relationship, 270);
  
  const polygonPoints = `${pStructure} ${pTheoretical} ${pAction} ${pRelationship}`;

  return (
    <div id="student-page-8" style={{ ...commonStyles.page, padding: '80px', alignItems: 'center' }}>
      <PremiumBackground opacity={0.1} />
      
      <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'center', fontSize: '75px', marginBottom: '10px', zIndex: 10 }}>STAR RADAR ANALYSIS</h1>
      <p style={{ fontSize: '28px', color: colors.textMut, textAlign: 'center', marginBottom: '40px', zIndex: 10 }}>A visual representation of your core behavioural archetype.</p>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10, width: '100%' }}>
        
        {/* Radar Chart */}
        <div style={{ width: `${size}px`, height: `${size}px`, position: 'relative', marginBottom: '40px' }}>
          <svg width={size} height={size}>
            {/* Grid Circles */}
            {[20, 40, 60, 80, 100].map((val) => (
              <circle key={val} cx={center} cy={center} r={(val / max) * radius} fill="none" stroke={colors.textMut} strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
            ))}
            
            {/* Axis Lines */}
            <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke={colors.textMut} strokeWidth="2" opacity="0.3" />
            <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke={colors.textMut} strokeWidth="2" opacity="0.3" />

            {/* Data Polygon */}
            <polygon points={polygonPoints} fill={colors.accentGreen} fillOpacity="0.4" stroke={colors.primaryDark} strokeWidth="5" strokeLinejoin="round" />
            
            {/* Data Points */}
            <circle cx={pStructure.split(',')[0]} cy={pStructure.split(',')[1]} r="12" fill={colors.traitStructure} />
            <circle cx={pTheoretical.split(',')[0]} cy={pTheoretical.split(',')[1]} r="12" fill={colors.traitTheoretical} />
            <circle cx={pAction.split(',')[0]} cy={pAction.split(',')[1]} r="12" fill={colors.traitAction} />
            <circle cx={pRelationship.split(',')[0]} cy={pRelationship.split(',')[1]} r="12" fill={colors.traitRelationship} />
          </svg>
          
          {/* Labels outside the SVG for perfect text rendering */}
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
             <div style={{ fontSize: '32px', fontWeight: 900, color: colors.traitStructure }}>STRUCTURE</div>
             <div style={{ fontSize: '26px', fontWeight: 700, color: colors.primaryDark }}>{data.star.structure}%</div>
          </div>
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
             <div style={{ fontSize: '26px', fontWeight: 700, color: colors.primaryDark }}>{data.star.action}%</div>
             <div style={{ fontSize: '32px', fontWeight: 900, color: colors.traitAction }}>ACTION</div>
          </div>
          <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
             <div style={{ fontSize: '32px', fontWeight: 900, color: colors.traitTheoretical }}>THEORETICAL</div>
             <div style={{ fontSize: '26px', fontWeight: 700, color: colors.primaryDark }}>{data.star.theoretical}%</div>
          </div>
          <div style={{ position: 'absolute', left: '-40px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
             <div style={{ fontSize: '32px', fontWeight: 900, color: colors.traitRelationship }}>RELATIONSHIP</div>
             <div style={{ fontSize: '26px', fontWeight: 700, color: colors.primaryDark }}>{data.star.relationship}%</div>
          </div>
        </div>

        {/* Dynamic Archetype Storytelling Box */}
        <div style={{ width: '100%', backgroundColor: colors.white, borderRadius: '30px', padding: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', borderTop: `10px solid ${colors.accentYellow}` }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: colors.textMut, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '2px' }}>Your Dominant Archetype</div>
          <h2 style={{ fontSize: '60px', fontWeight: 900, color: colors.primaryDark, margin: '0 0 20px 0' }}>{data?.archetype?.title || 'The Visionary'}</h2>
          <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.8', margin: 0, fontWeight: 500, textAlign: 'justify' }}>
            {data?.archetype?.description || "Your balanced scores across multiple traits suggest a well-rounded and versatile personality."}
          </p>
        </div>

      </div>
    </div>
  );
};
