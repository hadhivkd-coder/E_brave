import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Layers, Headphones, BookA, Activity, Image, Brain, Users, UserCircle, TreePine, Phone, Mail, CheckCircle } from 'lucide-react';

export const Page17SkillsIntro = () => (
  <div id="student-page-17" style={{ ...commonStyles.page, backgroundColor: colors.primaryLight }}>
    <div style={{ position: 'absolute', right: 0, top: 0, width: '400px', height: '1080px', backgroundColor: colors.accentYellow, transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>
    <div style={{ position: 'absolute', right: '-100px', top: 0, width: '400px', height: '1080px', backgroundColor: colors.accentGreen, transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>
    <div style={{ position: 'absolute', right: '-200px', top: 0, width: '400px', height: '1080px', backgroundColor: colors.primaryDark, transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>

    <div style={{ position: 'absolute', left: '200px', top: '400px' }}>
      <div style={{ position: 'absolute', left: '-50px', top: '-50px', width: '300px', height: '300px', backgroundColor: colors.accentGreen, borderRadius: '50%', zIndex: 0, opacity: 0.2 }}></div>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '220px', color: colors.primaryDark, position: 'relative', zIndex: 1, margin: 0, lineHeight: '0.8' }}>SKILLS</h1>
      <h2 style={{ fontSize: '100px', fontWeight: 800, color: colors.traitStructure, margin: 0, position: 'relative', zIndex: 1 }}>ORIENTATION</h2>
    </div>

    {/* Graphic Simulation Right side */}
    <div style={{ position: 'absolute', right: '300px', top: '250px', width: '600px', height: '600px', backgroundColor: colors.white, borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
      <Layers size={300} color={colors.primaryDark} strokeWidth={1} />
    </div>
  </div>
);

export const Page18SkillsChart = ({ data }) => {
  const max = 100;
  
  const skills = [
    { label: 'MUSIC SMART', val: data.smarts.music, color: colors.accentYellow },
    { label: 'WORD SMART', val: data.smarts.word, color: colors.primaryDark },
    { label: 'BODY SMART', val: data.smarts.body, color: colors.traitStructure },
    { label: 'PICTURE SMART', val: data.smarts.picture, color: colors.accentGreen },
    { label: 'LOGIC SMART', val: data.smarts.logic, color: colors.primaryDark },
    { label: 'PEOPLE SMART', val: data.smarts.people, color: colors.traitStructure },
    { label: 'SELF SMART', val: data.smarts.self, color: colors.accentYellow },
    { label: 'NATURE SMART', val: data.smarts.nature, color: colors.accentGreen }
  ];

  return (
    <div id="student-page-18" style={commonStyles.page}>
      <h1 style={{ width: '100%', textAlign: 'center', fontSize: '80px', color: colors.primaryDark, fontWeight: 900, marginTop: '80px', letterSpacing: '2px' }}>SKILLS ORIENTATION</h1>

      <div style={{ position: 'absolute', left: '150px', top: '250px', width: '1600px', height: '650px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {/* Y Axis Grid Lines */}
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '0%' }}><span style={{ position: 'absolute', left: '-60px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>0</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '14.28%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>10</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '28.57%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>20</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '42.85%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>30</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '57.14%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>40</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '71.42%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>50</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '85.71%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>60</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: `2px dashed ${colors.textMut}`, bottom: '100%' }}><span style={{ position: 'absolute', left: '-70px', top: '-20px', fontSize: '30px', fontWeight: 700, color: colors.textMut }}>70</span></div>

        {skills.map((skill, i) => (
          <div key={i} style={{ width: '180px', height: `${(skill.val / 70) * 100}%`, backgroundColor: skill.color, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', position: 'relative', zIndex: 1, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', top: '20px', width: '100%', textAlign: 'center', fontSize: '30px', fontWeight: 800, color: 'white' }}>{skill.val}</div>
            <div style={{ position: 'absolute', bottom: '-50px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: colors.textDark, whiteSpace: 'nowrap' }}>{skill.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SmartDetailPage = ({ id, title, text, Icon }) => (
  <div id={id} style={{ ...commonStyles.page, backgroundColor: colors.primaryLight }}>
    <div style={{ position: 'absolute', right: '100px', top: '150px', width: '1000px', backgroundColor: colors.white, borderRadius: '40px', padding: '80px', paddingTop: '100px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
       {/* Badge Title */}
       <div style={{ position: 'absolute', top: '-40px', right: '50px', backgroundColor: colors.primaryDark, color: 'white', padding: '20px 50px', transform: 'rotate(-2deg)', fontSize: '60px', fontWeight: 900, textTransform: 'uppercase', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
         {title}
       </div>
       <p style={{ fontSize: '34px', color: colors.textDark, lineHeight: '1.8', margin: 0, textAlign: 'justify', fontWeight: 500 }}>{text}</p>
    </div>

    {/* Left Icon Graphic */}
    <div style={{ position: 'absolute', left: '150px', top: '300px', width: '600px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.primaryDark, backgroundColor: colors.white, borderRadius: '50%', border: `20px solid ${colors.accentGreen}`, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
       <Icon size={300} strokeWidth={1.5} />
    </div>
  </div>
);

export const Page19Word = () => (
  <SmartDetailPage id="student-page-19" title="Word Smart" Icon={BookA} text="Individuals who are 'word smart' demonstrate a high aptitude for language-related activities, such as reading, writing, speaking, and understanding verbal information. They have a knack for expressing themselves eloquently, crafting compelling narratives, and grasping intricate linguistic concepts with ease. People with strong linguistic intelligence often excel in careers that involve communication, such as writing, teaching, journalism, or public speaking. Cultivating linguistic intelligence not only enhances one's proficiency in language skills but also fosters critical thinking, creativity, and effective communication, contributing to personal and professional success." />
);

export const Page20Music = () => (
  <SmartDetailPage id="student-page-20" title="Music Smart" Icon={Headphones} text="Refers to individuals who possess a high level of musical intelligence. These individuals demonstrate a deep appreciation for music, exhibiting skills such as recognizing pitch and rhythm, composing melodies, and performing with proficiency on various musical instruments. People with strong musical intelligence often excel in careers such as music composition, performance, teaching, or music therapy. Developing musical intelligence not only enriches one's understanding and enjoyment of music but also fosters cognitive development, emotional expression, and cultural appreciation, contributing to personal fulfillment and artistic expression." />
);

export const Page21Body = () => (
  <SmartDetailPage id="student-page-21" title="Body Smart" Icon={Activity} text="Individuals who are 'body smart' exhibit a heightened awareness and control over their bodies, along with a keen sense of physical coordination and movement. These individuals excel in activities that involve physical prowess, such as sports, dance, acting, or hands-on crafts. Careers that capitalize on bodily-kinesthetic intelligence include athletics, dance choreography, physical therapy, and surgery. Cultivating this intelligence not only enhances physical abilities but also fosters discipline, perseverance, and spatial awareness, leading to personal growth and mastery in various domains of physical expression." />
);

export const Page22Picture = () => (
  <SmartDetailPage id="student-page-22" title="Picture Smart" Icon={Image} text="Individuals who are 'picture smart' possess a strong ability to perceive, understand, and manipulate visual-spatial information. They excel in tasks that require mental visualization, such as interpreting maps, solving puzzles, and navigating spatial environments. People with strong spatial intelligence often exhibit skills in areas such as architecture, graphic design, engineering, and art. Cultivating this intelligence not only enhances one's artistic and design abilities but also fosters problem-solving skills, creativity, and a deeper understanding of the physical world, leading to personal and professional success in spatially oriented fields." />
);

export const Page23Logic = () => (
  <SmartDetailPage id="student-page-23" title="Logic Smart" Icon={Brain} text="Individuals who are 'logic smart' possess a strong aptitude for reasoning, critical thinking, and problem-solving, particularly in mathematical and scientific domains. They excel in tasks that require logical analysis, such as solving puzzles, conducting experiments, and making mathematical calculations. Careers that capitalize on logical-mathematical intelligence include mathematics, computer science, engineering, and finance. Cultivating this intelligence not only enhances one's analytical and quantitative skills but also fosters a disciplined approach to reasoning and decision-making, leading to success in logical and mathematical domains." />
);

export const Page24People = () => (
  <SmartDetailPage id="student-page-24" title="People Smart" Icon={Users} text="Individuals who are 'people smart' possess a strong ability to understand and interact effectively with others. They excel in tasks that involve empathy, communication, and cooperation, such as counseling, leadership, teaching, and negotiation. People with strong interpersonal intelligence are adept at recognizing and responding to the feelings, motivations, and needs of those around them. Cultivating this intelligence not only enhances one's interpersonal skills but also fosters empathy, collaboration, and leadership abilities, leading to success in personal and professional relationships." />
);

export const Page25Self = () => (
  <SmartDetailPage id="student-page-25" title="Self Smart" Icon={UserCircle} text="Individuals who are 'self smart' possess a deep understanding of their own emotions, thoughts, and motivations. They excel in tasks that involve introspection, self-reflection, and self-awareness, such as meditation, journaling, and goal-setting. People with strong intrapersonal intelligence are adept at recognizing their strengths and weaknesses, managing their emotions, and setting personal goals aligned with their values. Cultivating intrapersonal intelligence enhances one's ability to make informed decisions, cope with challenges, and pursue meaningful life paths, ultimately leading to greater fulfillment and well-being." />
);

export const Page26Nature = () => (
  <SmartDetailPage id="student-page-26" title="Nature Smart" Icon={TreePine} text="Individuals who are 'nature smart' possess a deep affinity for and understanding of the natural world. They excel in tasks that involve observing, categorizing, and understanding patterns in nature, such as gardening, animal care, or environmental science. People with strong naturalistic intelligence have a keen eye for detail and are skilled at recognizing the interconnectedness of living organisms and ecosystems. Cultivating naturalistic intelligence fosters a deeper connection to nature, environmental stewardship, and a sense of awe and wonder at the beauty and complexity of the natural world." />
);

export const Page27CareerFitment = ({ data }) => (
  <div id="student-page-27" style={commonStyles.page}>
    <h1 style={{ ...commonStyles.sectionTitle, color: colors.primaryDark, fontSize: '100px', margin: '100px 0 20px 150px' }}>Career Fitment</h1>
    
    <div style={{ padding: '0 150px' }}>
      <div style={{ width: '100%', height: '20px', borderTop: `20px dashed ${colors.primaryDark}`, marginBottom: '40px' }}></div>
      <p style={{ ...commonStyles.bodyText, color: colors.textDark, marginBottom: '100px', fontSize: '36px' }}>
        Following an individual counseling session with your counselor, based on the test report, the counselor selects the top three career fits for you. These selections are then refined and updated after a personalized one-on-one counseling session. This process ensures that the chosen career paths align closely with your strengths, interests, and aspirations, providing you with the best possible guidance for your professional journey.
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 150px' }}>
      {data.careers.map((career, index) => (
        <div key={career.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', textAlign: 'center', position: 'relative' }}>
           {index !== 2 && <div style={{ position: 'absolute', right: '-150px', top: '100px', borderTop: `10px solid ${colors.accentGreen}`, width: '200px' }}></div>}
           <div style={{ width: '220px', height: '220px', borderRadius: '50%', backgroundColor: colors.white, border: `20px solid ${colors.primaryDark}`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '60px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
             <span style={{ fontSize: '100px', fontWeight: 900, color: colors.accentYellow }}>{career.id}</span>
           </div>
           <h3 style={{ fontSize: '40px', color: colors.primaryDark, margin: '0 0 15px 0', fontWeight: 800 }}>{career.title}</h3>
           <p style={{ fontSize: '28px', color: colors.textMut, margin: 0, fontWeight: 500 }}>{career.subtitle}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Page28Contact = ({ data }) => (
  <div id="student-page-28" style={{ ...commonStyles.page, backgroundColor: colors.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '200px', color: colors.primaryDark, fontWeight: 900, margin: '0 0 100px 0', letterSpacing: '-5px' }}>E-BRAVE</h1>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '100px' }}>
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '70px', color: colors.traitStructure, margin: 0, fontWeight: 800 }}>Contact us for</h2>
        <h2 style={{ fontSize: '70px', color: colors.primaryDark, margin: 0, fontWeight: 800 }}>more information</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: colors.primaryLight, padding: '30px 50px', borderRadius: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
         <div style={{ width: '100px', height: '100px', backgroundColor: colors.primaryDark, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <Phone size={50} />
         </div>
         <span style={{ fontSize: '50px', color: colors.primaryDark, fontWeight: 800 }}>{data.contact.mobile}</span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '20px', position: 'absolute', bottom: '100px', backgroundColor: colors.primaryDark, padding: '40px', borderRadius: '80px', width: '1600px', justifyContent: 'space-between', alignItems: 'center', color: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: colors.accentYellow, borderRadius: '15px' }}></div>
          <div style={{ width: '60px', height: '60px', backgroundColor: colors.traitStructure, borderRadius: '15px' }}></div>
          <div style={{ width: '60px', height: '60px', backgroundColor: colors.accentGreen, borderRadius: '15px' }}></div>
        </div>
        <span style={{ fontSize: '50px', fontWeight: 700, marginLeft: '30px' }}>{data.contact.social}</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: colors.accentGreen, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.primaryDark }}>
          <Mail size={40} />
        </div>
        <span style={{ fontSize: '50px', fontWeight: 700 }}>{data.contact.email}</span>
      </div>
    </div>
  </div>
);
