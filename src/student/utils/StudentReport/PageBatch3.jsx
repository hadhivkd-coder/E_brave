import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Layers, Headphones, BookA, Activity, Image, Brain, Users, UserCircle, TreePine, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

// Reusable Background Mesh
const MeshBackground = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', pointerEvents: 'none', backgroundColor: colors.primaryDark }}>
     <svg width="100%" height="100%">
        <defs>
           <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.accentGreen} stopOpacity="0.4" />
              <stop offset="100%" stopColor={colors.primaryDark} stopOpacity="0" />
           </radialGradient>
           <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.accentYellow} stopOpacity="0.2" />
              <stop offset="100%" stopColor={colors.primaryDark} stopOpacity="0" />
           </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad1)" transform="translate(-400, -400) scale(2)" />
        <rect width="100%" height="100%" fill="url(#grad2)" transform="translate(600, 800) scale(2)" />
        {/* Subtle dot pattern over mesh */}
        <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <circle cx="2" cy="2" r="1.5" fill={colors.white} opacity="0.05" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
     </svg>
  </div>
);

export const Page17SkillsIntro = () => (
  <div id="student-page-17" style={{ ...commonStyles.page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <MeshBackground />

    <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '120px', position: 'relative' }}>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '200px', color: colors.white, margin: 0, lineHeight: '0.9', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>SKILLS</h1>
      <h2 style={{ fontSize: '75px', fontWeight: 900, color: colors.accentYellow, margin: 0, letterSpacing: '5px' }}>ORIENTATION</h2>
      <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '8px', backgroundColor: colors.accentGreen, borderRadius: '4px' }}></div>
    </div>

    <div style={{ width: '500px', height: '500px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: `2px solid rgba(255,255,255,0.1)`, backdropFilter: 'blur(20px)' }}>
      <Layers size={250} color={colors.accentGreen} strokeWidth={1} />
    </div>
  </div>
);

// Advanced SVG Radial Bar Chart
export const Page18SkillsChart = ({ data }) => {
  const skills = [
    { label: 'MUSIC', val: data.smarts.music, color: colors.accentYellow },
    { label: 'WORD', val: data.smarts.word, color: colors.primaryDark },
    { label: 'BODY', val: data.smarts.body, color: colors.traitStructure },
    { label: 'PICTURE', val: data.smarts.picture, color: colors.accentGreen },
    { label: 'LOGIC', val: data.smarts.logic, color: colors.primaryDark },
    { label: 'PEOPLE', val: data.smarts.people, color: colors.traitStructure },
    { label: 'SELF', val: data.smarts.self, color: colors.accentYellow },
    { label: 'NATURE', val: data.smarts.nature, color: colors.accentGreen }
  ];

  const maxRadius = 350;
  const innerRadius = 100;
  const cx = 500;
  const cy = 500;

  return (
    <div id="student-page-18" style={{ ...commonStyles.page, padding: '80px', alignItems: 'center', backgroundColor: colors.primaryLight }}>
      
      <h1 style={{ ...commonStyles.sectionTitle, textAlign: 'center', fontSize: '70px', marginBottom: '80px', zIndex: 10 }}>MULTIPLE INTELLIGENCES</h1>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        <div style={{ position: 'relative', width: '1000px', height: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <svg width="1000" height="1000" style={{ position: 'absolute' }}>
            {/* Background guide circles */}
            {[1, 2, 3, 4, 5].map(ring => (
               <circle key={ring} cx={cx} cy={cy} r={innerRadius + (ring * 50)} fill="none" stroke={colors.textMut} strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
            ))}

            {skills.map((skill, index) => {
              const angleSpan = 360 / skills.length;
              const startAngle = (index * angleSpan) - 90;
              const barRadius = innerRadius + ((skill.val / 100) * (maxRadius - innerRadius));
              
              // Draw the bar wedge
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = ((startAngle + angleSpan - 5) * Math.PI) / 180; // -5 for padding between bars
              
              const x1 = cx + innerRadius * Math.cos(startRad);
              const y1 = cy + innerRadius * Math.sin(startRad);
              const x2 = cx + barRadius * Math.cos(startRad);
              const y2 = cy + barRadius * Math.sin(startRad);
              const x3 = cx + barRadius * Math.cos(endRad);
              const y3 = cy + barRadius * Math.sin(endRad);
              const x4 = cx + innerRadius * Math.cos(endRad);
              const y4 = cy + innerRadius * Math.sin(endRad);

              const pathData = `M ${x1} ${y1} L ${x2} ${y2} A ${barRadius} ${barRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`;

              // Calculate label position
              const midAngle = startAngle + (angleSpan / 2);
              const labelRadius = maxRadius + 60;
              const labelX = cx + labelRadius * Math.cos((midAngle * Math.PI) / 180);
              const labelY = cy + labelRadius * Math.sin((midAngle * Math.PI) / 180);

              return (
                <g key={skill.label}>
                  <path d={pathData} fill={skill.color} opacity="0.9" />
                  <text x={labelX} y={labelY} textAnchor="middle" alignmentBaseline="middle" fill={colors.primaryDark} fontSize="28px" fontWeight="800">
                    {skill.label}
                  </text>
                  <text x={labelX} y={labelY + 35} textAnchor="middle" alignmentBaseline="middle" fill={colors.textMut} fontSize="24px" fontWeight="600">
                    {skill.val}%
                  </text>
                </g>
              );
            })}
          </svg>
          
          <div style={{ width: '180px', height: '180px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 10 }}>
            <span style={{ fontSize: '36px', fontWeight: 900, color: colors.primaryDark, textAlign: 'center', lineHeight: '1.2' }}>SMART<br/>INDEX</span>
          </div>

        </div>
      </div>
    </div>
  );
};

// Premium Glassmorphic Detail Page
const SmartDetailPage = ({ id, title, text, Icon, dataKey, data }) => {
  const percentage = data ? data.smarts[dataKey] : 0;
  
  return (
    <div id={id} style={{ ...commonStyles.page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <MeshBackground />
      
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '0 80px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '80px' }}>
           <div style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.white, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', border: `4px solid rgba(255,255,255,0.2)`, backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
             <Icon size={150} strokeWidth={1} />
           </div>
           
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '120px', fontWeight: 900, color: colors.accentYellow, lineHeight: '1' }}>{percentage}%</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: colors.white, letterSpacing: '2px', textTransform: 'uppercase' }}>Proficiency</div>
           </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '40px', padding: '80px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', position: 'relative', width: '100%', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(30px)' }}>
           <h1 style={{ fontSize: '70px', color: colors.white, margin: '0 0 40px 0', fontWeight: 900, textTransform: 'uppercase' }}>{title}</h1>
           <div style={{ width: '100px', height: '6px', backgroundColor: colors.accentGreen, marginBottom: '40px' }}></div>
           <p style={{ fontSize: '32px', color: colors.primaryLight, lineHeight: '2.0', margin: 0, textAlign: 'justify', fontWeight: 400 }}>{text}</p>
        </div>

      </div>
    </div>
  );
};

export const Page19Word = ({ data }) => (
  <SmartDetailPage data={data} dataKey="word" id="student-page-19" title="Word Smart" Icon={BookA} text="Individuals who are 'word smart' demonstrate a high aptitude for language-related activities, such as reading, writing, speaking, and understanding verbal information. They have a knack for expressing themselves eloquently, crafting compelling narratives, and grasping intricate linguistic concepts with ease. People with strong linguistic intelligence often excel in careers that involve communication, such as writing, teaching, journalism, or public speaking. Cultivating linguistic intelligence not only enhances one's proficiency in language skills but also fosters critical thinking, creativity, and effective communication, contributing to personal and professional success." />
);

export const Page20Music = ({ data }) => (
  <SmartDetailPage data={data} dataKey="music" id="student-page-20" title="Music Smart" Icon={Headphones} text="Refers to individuals who possess a high level of musical intelligence. These individuals demonstrate a deep appreciation for music, exhibiting skills such as recognizing pitch and rhythm, composing melodies, and performing with proficiency on various musical instruments. People with strong musical intelligence often excel in careers such as music composition, performance, teaching, or music therapy. Developing musical intelligence not only enriches one's understanding and enjoyment of music but also fosters cognitive development, emotional expression, and cultural appreciation, contributing to personal fulfillment and artistic expression." />
);

export const Page21Body = ({ data }) => (
  <SmartDetailPage data={data} dataKey="body" id="student-page-21" title="Body Smart" Icon={Activity} text="Individuals who are 'body smart' exhibit a heightened awareness and control over their bodies, along with a keen sense of physical coordination and movement. These individuals excel in activities that involve physical prowess, such as sports, dance, acting, or hands-on crafts. Careers that capitalize on bodily-kinesthetic intelligence include athletics, dance choreography, physical therapy, and surgery. Cultivating this intelligence not only enhances physical abilities but also fosters discipline, perseverance, and spatial awareness, leading to personal growth and mastery in various domains of physical expression." />
);

export const Page22Picture = ({ data }) => (
  <SmartDetailPage data={data} dataKey="picture" id="student-page-22" title="Picture Smart" Icon={Image} text="Individuals who are 'picture smart' possess a strong ability to perceive, understand, and manipulate visual-spatial information. They excel in tasks that require mental visualization, such as interpreting maps, solving puzzles, and navigating spatial environments. People with strong spatial intelligence often exhibit skills in areas such as architecture, graphic design, engineering, and art. Cultivating this intelligence not only enhances one's artistic and design abilities but also fosters problem-solving skills, creativity, and a deeper understanding of the physical world, leading to personal and professional success in spatially oriented fields." />
);

export const Page23Logic = ({ data }) => (
  <SmartDetailPage data={data} dataKey="logic" id="student-page-23" title="Logic Smart" Icon={Brain} text="Individuals who are 'logic smart' possess a strong aptitude for reasoning, critical thinking, and problem-solving, particularly in mathematical and scientific domains. They excel in tasks that require logical analysis, such as solving puzzles, conducting experiments, and making mathematical calculations. Careers that capitalize on logical-mathematical intelligence include mathematics, computer science, engineering, and finance. Cultivating this intelligence not only enhances one's analytical and quantitative skills but also fosters a disciplined approach to reasoning and decision-making, leading to success in logical and mathematical domains." />
);

export const Page24People = ({ data }) => (
  <SmartDetailPage data={data} dataKey="people" id="student-page-24" title="People Smart" Icon={Users} text="Individuals who are 'people smart' possess a strong ability to understand and interact effectively with others. They excel in tasks that involve empathy, communication, and cooperation, such as counseling, leadership, teaching, and negotiation. People with strong interpersonal intelligence are adept at recognizing and responding to the feelings, motivations, and needs of those around them. Cultivating this intelligence not only enhances one's interpersonal skills but also fosters empathy, collaboration, and leadership abilities, leading to success in personal and professional relationships." />
);

export const Page25Self = ({ data }) => (
  <SmartDetailPage data={data} dataKey="self" id="student-page-25" title="Self Smart" Icon={UserCircle} text="Individuals who are 'self smart' possess a deep understanding of their own emotions, thoughts, and motivations. They excel in tasks that involve introspection, self-reflection, and self-awareness, such as meditation, journaling, and goal-setting. People with strong intrapersonal intelligence are adept at recognizing their strengths and weaknesses, managing their emotions, and setting personal goals aligned with their values. Cultivating intrapersonal intelligence enhances one's ability to make informed decisions, cope with challenges, and pursue meaningful life paths, ultimately leading to greater fulfillment and well-being." />
);

export const Page26Nature = ({ data }) => (
  <SmartDetailPage data={data} dataKey="nature" id="student-page-26" title="Nature Smart" Icon={TreePine} text="Individuals who are 'nature smart' possess a deep affinity for and understanding of the natural world. They excel in tasks that involve observing, categorizing, and understanding patterns in nature, such as gardening, animal care, or environmental science. People with strong naturalistic intelligence have a keen eye for detail and are skilled at recognizing the interconnectedness of living organisms and ecosystems. Cultivating naturalistic intelligence fosters a deeper connection to nature, environmental stewardship, and a sense of awe and wonder at the beauty and complexity of the natural world." />
);

export const Page27CareerFitment = ({ data }) => (
  <div id="student-page-27" style={{ ...commonStyles.page, padding: '100px', display: 'flex', flexDirection: 'column', backgroundColor: colors.primaryLight }}>
    
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
       <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentYellow, padding: '15px 40px', borderRadius: '50px', marginBottom: '30px' }}>
          <Award size={40} color={colors.primaryDark} style={{ marginRight: '15px' }} />
          <span style={{ fontSize: '28px', fontWeight: 800, color: colors.primaryDark }}>TOP RECOMMENDATIONS</span>
       </div>
       <h1 style={{ ...commonStyles.sectionTitle, color: colors.primaryDark, fontSize: '90px', margin: 0 }}>CAREER FITMENT</h1>
    </div>
    
    <div style={{ backgroundColor: colors.white, padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '80px' }}>
       <p style={{ ...commonStyles.bodyText, color: colors.textDark, fontSize: '30px', textAlign: 'justify' }}>
         Following an individual counseling session with your counselor, based on the test report, the counselor selects the top three career fits for you. These selections are refined and updated after a personalized one-on-one session. This process ensures the chosen paths align closely with your strengths, interests, and aspirations.
       </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', flex: 1 }}>
      {data.careers.map((career, index) => (
        <div key={career.id} style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: colors.primaryDark, padding: '40px', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
           
           <div style={{ position: 'absolute', right: '-20px', top: '-50px', opacity: 0.1 }}>
             <span style={{ fontSize: '250px', fontWeight: 900, color: colors.white }}>{career.id}</span>
           </div>

           <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: colors.accentGreen, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginRight: '40px', zIndex: 10 }}>
             <CheckCircle2 size={50} color={colors.white} strokeWidth={2.5} />
           </div>
           <div style={{ flex: 1, zIndex: 10 }}>
             <h3 style={{ fontSize: '50px', color: colors.white, margin: '0 0 10px 0', fontWeight: 900 }}>{career.title}</h3>
             <p style={{ fontSize: '30px', color: colors.primaryLight, margin: 0, fontWeight: 500, opacity: 0.8 }}>{career.subtitle}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);

export const Page28Contact = ({ data }) => (
  <div id="student-page-28" style={{ ...commonStyles.page, backgroundColor: colors.primaryDark, padding: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <MeshBackground />
    
    <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '100px' }}>
       <h1 style={{ fontSize: '200px', color: colors.accentYellow, fontWeight: 900, margin: '0 0 20px 0', letterSpacing: '-5px', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>E-BRAVE</h1>
       <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px 60px', borderRadius: '50px', display: 'inline-block', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <h2 style={{ fontSize: '40px', color: colors.white, margin: 0, fontWeight: 700, letterSpacing: '10px' }}>CAREER GUIDANCE</h2>
       </div>
    </div>

    <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', width: '100%', borderRadius: '50px', padding: '80px', display: 'flex', flexDirection: 'column', gap: '60px', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
         <div style={{ width: '100px', height: '100px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.primaryDark }}>
            <Phone size={45} />
         </div>
         <span style={{ fontSize: '50px', color: colors.textDark, fontWeight: 800 }}>{data.contact.mobile}</span>
      </div>

      <div style={{ width: '100%', height: '2px', backgroundColor: colors.textMut, opacity: 0.1 }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
         <div style={{ width: '100px', height: '100px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.primaryDark }}>
            <Mail size={45} />
         </div>
         <span style={{ fontSize: '50px', color: colors.textDark, fontWeight: 800 }}>{data.contact.email}</span>
      </div>

      <div style={{ width: '100%', height: '2px', backgroundColor: colors.textMut, opacity: 0.1 }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
         <div style={{ display: 'flex', gap: '15px', padding: '0 10px' }}>
            <div style={{ width: '35px', height: '35px', backgroundColor: colors.primaryDark, borderRadius: '8px' }}></div>
            <div style={{ width: '35px', height: '35px', backgroundColor: colors.accentGreen, borderRadius: '8px' }}></div>
            <div style={{ width: '35px', height: '35px', backgroundColor: colors.accentYellow, borderRadius: '8px' }}></div>
         </div>
         <span style={{ fontSize: '50px', color: colors.textDark, fontWeight: 800 }}>{data.contact.social}</span>
      </div>
    </div>
  </div>
);
