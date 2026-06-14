import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Calendar, PenTool, QrCode, ArrowRight, UserCheck } from 'lucide-react';

export const Page29ActionPlan = () => (
  <div id="student-page-29" style={{ ...commonStyles.page, padding: '100px', backgroundColor: colors.white, display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '30px' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: colors.primaryDark, borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Calendar size={50} color={colors.accentYellow} />
      </div>
      <div>
        <h1 style={{ ...commonStyles.sectionTitle, color: colors.primaryDark, fontSize: '60px', margin: 0, textTransform: 'uppercase' }}>ACTION PLAN</h1>
        <p style={{ fontSize: '26px', color: colors.textMut, margin: '10px 0 0 0', fontWeight: 600 }}>Your 30, 60, and 90-day execution strategy.</p>
      </div>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* 30 Days */}
      <div style={{ flex: 1, border: `3px solid ${colors.primaryLight}`, borderRadius: '30px', padding: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-25px', left: '40px', backgroundColor: colors.white, padding: '0 20px', color: colors.accentGreen, fontSize: '30px', fontWeight: 900 }}>30 DAYS: Immediate Focus</div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ height: '33%', width: '100%' }}></div>
      </div>

      {/* 60 Days */}
      <div style={{ flex: 1, border: `3px solid ${colors.primaryLight}`, borderRadius: '30px', padding: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-25px', left: '40px', backgroundColor: colors.white, padding: '0 20px', color: colors.traitAction, fontSize: '30px', fontWeight: 900 }}>60 DAYS: Skill Acquisition</div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ height: '33%', width: '100%' }}></div>
      </div>

      {/* 90 Days */}
      <div style={{ flex: 1, border: `3px solid ${colors.primaryLight}`, borderRadius: '30px', padding: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-25px', left: '40px', backgroundColor: colors.white, padding: '0 20px', color: colors.primaryDark, fontSize: '30px', fontWeight: 900 }}>90 DAYS: Milestone Review</div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ borderBottom: '2px dashed rgba(0,0,0,0.1)', height: '33%', width: '100%' }}></div>
        <div style={{ height: '33%', width: '100%' }}></div>
      </div>
    </div>
  </div>
);

export const Page30CounselorNotes = () => (
  <div id="student-page-30" style={{ ...commonStyles.page, padding: '100px', backgroundColor: colors.white, display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '30px' }}>
      <div style={{ width: '100px', height: '100px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PenTool size={45} color={colors.primaryDark} />
      </div>
      <div>
        <h1 style={{ ...commonStyles.sectionTitle, color: colors.primaryDark, fontSize: '60px', margin: 0, textTransform: 'uppercase' }}>COUNSELOR NOTES</h1>
        <p style={{ fontSize: '26px', color: colors.textMut, margin: '10px 0 0 0', fontWeight: 600 }}>Personalized insights from your E-Brave mentor.</p>
      </div>
    </div>

    {/* Lined paper effect */}
    <div style={{ flex: 1, border: `2px solid rgba(0,0,0,0.05)`, borderRadius: '30px', padding: '60px 40px', position: 'relative', overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
      {/* Red vertical margin line */}
      <div style={{ position: 'absolute', left: '120px', top: 0, bottom: 0, width: '2px', backgroundColor: 'rgba(255, 0, 0, 0.2)' }}></div>
      
      {/* Horizontal lines */}
      {[...Array(15)].map((_, i) => (
        <div key={i} style={{ width: '100%', height: '60px', borderBottom: '2px solid rgba(0,100,200,0.1)' }}></div>
      ))}
      
      <div style={{ position: 'absolute', bottom: '40px', right: '60px', display: 'flex', alignItems: 'center', gap: '20px' }}>
         <div style={{ fontSize: '24px', fontWeight: 600, color: colors.textMut }}>Sign:</div>
         <div style={{ width: '250px', borderBottom: `2px solid ${colors.primaryDark}` }}></div>
      </div>
    </div>
  </div>
);

export const Page31DigitalBridge = () => (
  <div id="student-page-31" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    {/* Abstract Background Overlay */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(/images/ebrave_abstract_future.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, zIndex: 0, mixBlendMode: 'screen' }}></div>
    
    <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '80px' }}>
       <h1 style={{ fontSize: '120px', color: colors.white, fontWeight: 900, margin: '0 0 20px 0', letterSpacing: '-2px', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>YOUR JOURNEY</h1>
       <h1 style={{ fontSize: '120px', color: colors.accentYellow, fontWeight: 900, margin: '0 0 20px 0', letterSpacing: '-2px', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>STARTS HERE</h1>
       <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px 60px', borderRadius: '50px', display: 'inline-block', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <h2 style={{ fontSize: '32px', color: colors.white, margin: 0, fontWeight: 700, letterSpacing: '5px' }}>ACCESS YOUR DIGITAL PORTAL</h2>
       </div>
    </div>

    <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', width: '100%', borderRadius: '50px', padding: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', zIndex: 10 }}>
      
      <div style={{ flex: 1, paddingRight: '60px' }}>
        <h3 style={{ fontSize: '45px', color: colors.primaryDark, fontWeight: 900, marginBottom: '30px', lineHeight: '1.2' }}>Connect with your Counselor instantly.</h3>
        <p style={{ fontSize: '28px', color: colors.textDark, lineHeight: '1.8', marginBottom: '40px' }}>
          Scan the QR code to access your interactive dashboard, book your 1-on-1 counseling session, and explore deep insights into your career roadmap.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: colors.accentGreen, fontWeight: 800, fontSize: '28px' }}>
          <UserCheck size={35} /> E-Brave Verified
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
         <ArrowRight size={80} color={colors.textMut} strokeWidth={1} />
         
         <div style={{ width: '350px', height: '350px', backgroundColor: colors.white, border: `10px solid ${colors.primaryDark}`, borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            {/* Mock QR Code generation using SVG */}
            <svg width="250" height="250" viewBox="0 0 100 100">
               {/* 3 corner squares */}
               <rect x="10" y="10" width="25" height="25" fill="none" stroke={colors.primaryDark} strokeWidth="5" rx="3" />
               <rect x="15" y="15" width="15" height="15" fill={colors.primaryDark} rx="2" />
               
               <rect x="65" y="10" width="25" height="25" fill="none" stroke={colors.primaryDark} strokeWidth="5" rx="3" />
               <rect x="70" y="15" width="15" height="15" fill={colors.primaryDark} rx="2" />
               
               <rect x="10" y="65" width="25" height="25" fill="none" stroke={colors.primaryDark} strokeWidth="5" rx="3" />
               <rect x="15" y="70" width="15" height="15" fill={colors.primaryDark} rx="2" />

               {/* Random abstract blocks to simulate QR data */}
               <path d="M 45 10 h 10 v 10 h -10 z M 45 25 h 5 v 20 h -5 z M 55 15 h 5 v 5 h -5 z M 55 30 h 10 v 10 h -10 z M 80 45 h 10 v 10 h -10 z M 65 55 h 25 v 5 h -25 z M 45 55 h 10 v 5 h -10 z M 45 70 h 5 v 20 h -5 z M 55 65 h 20 v 10 h -20 z M 80 75 h 10 v 15 h -10 z M 65 85 h 10 v 5 h -10 z" fill={colors.primaryDark} />
               
               <circle cx="50" cy="50" r="15" fill={colors.accentGreen} />
               <QrCode x="40" y="40" width="20" height="20" color={colors.white} />
            </svg>
         </div>
      </div>

    </div>
  </div>
);
