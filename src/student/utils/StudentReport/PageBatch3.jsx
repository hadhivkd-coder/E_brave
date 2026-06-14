import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Layers, Headphones, BookA, Activity, Image, Brain, Users, UserCircle, TreePine, Phone, Mail } from 'lucide-react';

export const Page17SkillsIntro = () => (
  <div id="student-page-17" style={{ ...commonStyles.page, backgroundColor: '#bfdbfe' }}>
    <div style={{ position: 'absolute', right: 0, top: 0, width: '400px', height: '1080px', backgroundColor: '#475569', transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>
    <div style={{ position: 'absolute', right: '-100px', top: 0, width: '400px', height: '1080px', backgroundColor: '#312e81', transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>
    <div style={{ position: 'absolute', right: '-200px', top: 0, width: '400px', height: '1080px', backgroundColor: '#1e3a8a', transform: 'skewX(-20deg)', transformOrigin: 'top' }}></div>

    <div style={{ position: 'absolute', left: '200px', top: '400px' }}>
      <div style={{ position: 'absolute', left: '-50px', top: '-50px', width: '300px', height: '300px', backgroundColor: '#93c5fd', borderRadius: '50%', zIndex: 0 }}></div>
      <h1 style={{ ...commonStyles.titleHuge, fontSize: '220px', color: '#1e3a8a', position: 'relative', zIndex: 1, margin: 0, lineHeight: '0.8' }}>SKILLS</h1>
      <h2 style={{ fontSize: '100px', fontWeight: 800, color: '#1e3a8a', margin: 0, position: 'relative', zIndex: 1 }}>ORIENTATION</h2>
    </div>

    {/* Graphic Simulation Right side */}
    <div style={{ position: 'absolute', right: '300px', top: '250px', width: '600px', height: '600px', backgroundColor: '#bbf7d0', borderRadius: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
      <Layers size={300} color="#047857" strokeWidth={1} />
    </div>
  </div>
);

export const Page18SkillsChart = ({ data }) => {
  const max = 100;
  
  const skills = [
    { label: 'MUSIC SMART', val: data.smarts.music, color: '#ef4444' },
    { label: 'WORD SMART', val: data.smarts.word, color: '#1e3a8a' },
    { label: 'BODY SMART', val: data.smarts.body, color: '#312e81' },
    { label: 'PICTURE SMART', val: data.smarts.picture, color: '#a3e635' },
    { label: 'LOGIC SMART', val: data.smarts.logic, color: '#65a30d' },
    { label: 'PEOPLE SMART', val: data.smarts.people, color: '#15803d' },
    { label: 'SELF SMART', val: data.smarts.self, color: '#166534' },
    { label: 'NATURE SMART', val: data.smarts.nature, color: '#0f766e' }
  ];

  return (
    <div id="student-page-18" style={commonStyles.page}>
      <h1 style={{ width: '100%', textAlign: 'center', fontSize: '70px', color: '#1e3a8a', fontWeight: 900, marginTop: '80px' }}>SKILLS ORIENTATION</h1>

      <div style={{ position: 'absolute', left: '150px', top: '250px', width: '1600px', height: '650px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {/* Y Axis Grid Lines */}
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '0%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>0</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '14.28%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>10</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '28.57%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>20</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '42.85%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>30</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '57.14%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>40</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '71.42%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>50</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '85.71%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>60</span></div>
        <div style={{ position: 'absolute', width: '100%', borderTop: '1px solid #94a3b8', bottom: '100%' }}><span style={{ position: 'absolute', left: '-50px', top: '-15px', fontSize: '24px', fontWeight: 700, color: '#475569' }}>70</span></div>

        {skills.map((skill, i) => (
          <div key={i} style={{ width: '180px', height: `${(skill.val / 70) * 100}%`, backgroundColor: skill.color, borderTopLeftRadius: '20px', borderTopRightRadius: '20px', position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'absolute', top: '20px', width: '100%', textAlign: 'center', fontSize: '24px', fontWeight: 700, color: 'white' }}>{skill.val}</div>
            <div style={{ position: 'absolute', bottom: '-40px', width: '100%', textAlign: 'center', fontSize: '22px', fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>{skill.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SmartDetailPage = ({ id, title, text, Icon }) => (
  <div id={id} style={commonStyles.page}>
    <div style={{ position: 'absolute', right: '100px', top: '100px', width: '1000px', backgroundColor: '#93c5fd', borderRadius: '40px', padding: '60px', paddingTop: '100px' }}>
       {/* Badge Title */}
       <div style={{ position: 'absolute', top: '-30px', right: '50px', backgroundColor: '#1e3a8a', color: 'white', padding: '20px 40px', transform: 'rotate(-3deg)', fontSize: '60px', fontWeight: 900, textTransform: 'uppercase' }}>
         {title}
       </div>
       <p style={{ fontSize: '32px', color: '#0f172a', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>{text}</p>
    </div>

    {/* Left Icon Graphic */}
    <div style={{ position: 'absolute', left: '150px', top: '300px', width: '600px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1e3a8a' }}>
       <Icon size={500} strokeWidth={1} />
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
    <h1 style={{ ...commonStyles.sectionTitle, color: '#1e3a8a', fontSize: '90px', margin: '100px 0 20px 150px' }}>Career Fitment</h1>
    
    <div style={{ padding: '0 150px' }}>
      <div style={{ width: '100%', height: '20px', borderTop: '20px dashed #1e3a8a', marginBottom: '40px' }}></div>
      <p style={{ ...commonStyles.bodyText, color: '#334155', marginBottom: '100px' }}>
        Following an individual counseling session with your counselor, based on the test report, the counselor selects the top three career fits for you. These selections are then refined and updated after a personalized one-on-one counseling session. This process ensures that the chosen career paths align closely with your strengths, interests, and aspirations, providing you with the best possible guidance for your professional journey.
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0 150px' }}>
      {data.careers.map(career => (
        <div key={career.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', textAlign: 'center', borderRight: career.id !== 3 ? '2px solid #64748b' : 'none' }}>
           <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#a855f7', border: '20px solid #7e22ce', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '60px' }}>
             <span style={{ fontSize: '100px', fontWeight: 900, color: '#1e3a8a' }}>{career.id}</span>
           </div>
           <h3 style={{ fontSize: '36px', color: '#1e3a8a', margin: '0 0 10px 0' }}>{career.title}</h3>
           <p style={{ fontSize: '30px', color: '#475569', margin: 0 }}>{career.subtitle}</p>
        </div>
      ))}
    </div>
  </div>
);

export const Page28Contact = ({ data }) => (
  <div id="student-page-28" style={{ ...commonStyles.page, backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: '160px', color: '#0f172a', fontWeight: 900, margin: '0 0 100px 0' }}>E-BRAVE</h1>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '50px', marginBottom: '100px' }}>
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '60px', color: '#1e3a8a', margin: 0 }}>Contact us for</h2>
        <h2 style={{ fontSize: '60px', color: '#1e3a8a', margin: 0 }}>more information</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#e2e8f0', padding: '20px 40px', borderRadius: '40px' }}>
         <div style={{ width: '80px', height: '80px', backgroundColor: '#1e3a8a', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <Phone size={40} />
         </div>
         <span style={{ fontSize: '40px', color: '#0f172a', fontWeight: 700 }}>{data.contact.mobile}</span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '20px', position: 'absolute', bottom: '100px', backgroundColor: '#0f766e', padding: '30px', borderRadius: '60px', width: '1600px', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#ec4899', borderRadius: '10px' }}></div>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#0ea5e9', borderRadius: '10px' }}></div>
        </div>
        <span style={{ fontSize: '40px', fontWeight: 600, marginLeft: '20px' }}>{data.contact.social}</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Mail size={30} />
        </div>
        <span style={{ fontSize: '40px', fontWeight: 600 }}>{data.contact.email}</span>
      </div>
    </div>
  </div>
);
