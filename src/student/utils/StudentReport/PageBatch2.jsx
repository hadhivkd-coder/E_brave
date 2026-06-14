import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Settings, Lightbulb, Zap, Users } from 'lucide-react';

const StarDetailPage = ({ id, title, text, bgColor, textColor, Icon, colorTheme }) => (
  <div id={id} style={{ ...commonStyles.page, backgroundColor: bgColor }}>
    {/* Left Icon Representation */}
    <div style={{ position: 'absolute', left: '200px', top: '50%', transform: 'translateY(-50%)', color: colorTheme, opacity: 0.2 }}>
      <Icon size={800} strokeWidth={1} />
    </div>

    <div style={{ position: 'absolute', right: '100px', top: '200px', width: '900px', backgroundColor: '#bfdbfe', borderRadius: '40px', padding: '60px' }}>
      <h1 style={{ fontSize: '90px', color: textColor, margin: '0 0 40px 0', fontWeight: 900, textTransform: 'uppercase' }}>{title}</h1>
      <p style={{ fontSize: '32px', color: '#1e293b', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>{text}</p>
    </div>
  </div>
);

export const Page09Structure = () => (
  <StarDetailPage 
    id="student-page-9"
    title="Structure"
    bgColor={colors.primaryDark}
    textColor={colors.primaryDark}
    colorTheme="#38bdf8"
    Icon={Settings}
    text="Individuals with a structured personality thrive in environments where clear guidelines, routines, and systems are in place, enabling them to work with efficiency and precision. Known for their meticulous planning and attention to detail, they excel at adhering to schedules and meeting deadlines. Such individuals are well-suited for roles that demand strong organizational skills and consistent follow-through, such as project management, administration, or accounting. Structure not only boosts their productivity but also provides a sense of stability and control, helping them navigate complexity and achieve their goals. To further develop this trait, they can refine their organizational abilities, establish effective routines, and utilize tools that enhance order and efficiency. Ultimately, structured personalities play a vital role in creating harmonious and well-functioning environments, ensuring tasks are completed accurately and reliably."
  />
);

export const Page10Theoretical = () => (
  <StarDetailPage 
    id="student-page-10"
    title="Theoretical"
    bgColor={colors.primaryDark}
    textColor={colors.primaryDark}
    colorTheme="#c084fc"
    Icon={Lightbulb}
    text="Individuals with a theoretical mindset are naturally drawn to abstract concepts and the pursuit of understanding fundamental principles and universal truths. They thrive in roles that demand strategic thinking, problem-solving, and the generation of innovative ideas. Careers in research, academia, and theoretical sciences provide ideal platforms for these individuals to explore complex systems, develop theoretical frameworks, and contribute to the expansion of knowledge. Beyond academia, roles in consulting, strategic planning, and technology development allow them to leverage their analytical prowess and visionary thinking to address real-world challenges and spearhead forward-thinking initiatives. Their ability to think deeply and critically makes them invaluable in shaping innovative solutions and driving progress."
  />
);

export const Page11Action = () => (
  <StarDetailPage 
    id="student-page-11"
    title="Action"
    bgColor={colors.primaryDark}
    textColor={colors.primaryDark}
    colorTheme="#bef264"
    Icon={Zap}
    text="Action-oriented individuals are fueled by a need for immediate results and flourish in dynamic, fast-paced environments where they can create a tangible impact. They excel in roles that demand adaptability, quick decision-making, and a hands-on approach, making them well-suited for careers in sales, entrepreneurship, project management, and emergency response. Their energetic and spontaneous nature also finds a natural fit in fields like entertainment, sports, and event planning, where their enthusiasm and ability to inspire others shine. Often drawn to leadership positions, action-oriented individuals lead by example, motivate teams, and drive initiatives forward with passion and determination, making them catalysts for progress and success."
  />
);

export const Page12Relationship = () => (
  <StarDetailPage 
    id="student-page-12"
    title="Relationship"
    bgColor={colors.primaryDark}
    textColor={colors.primaryDark}
    colorTheme="#fb923c"
    Icon={Users}
    text="Relationship-oriented individuals are deeply focused on building meaningful connections and fostering personal growth, thriving in roles that require empathy, communication, and collaboration. They excel in environments where they can inspire and support others, making them ideal for careers in counseling, mentoring, coaching, human resources, social work, and community outreach. Their natural ability to build rapport, create harmony, and positively impact lives shines in these fields. Additionally, they often succeed in leadership roles that prioritize teamwork, inclusivity, and the development of strong interpersonal relationships within organizations. With their exceptional empathy, communication skills, and authenticity, relationship-oriented individuals play a vital role in nurturing healthy connections and cultivating a positive, collaborative work culture."
  />
);

// Abstract component for the Growth Area pages
const GrowthAreaRow = ({ title, text, percentage, colorLeft, colorRight, align }) => {
  const isLeft = align === 'left';
  return (
    <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: isLeft ? 'flex-start' : 'flex-end', marginBottom: '60px' }}>
      {isLeft && (
        <div style={{ width: '600px', textAlign: 'right', paddingRight: '40px' }}>
          <h2 style={{ fontSize: '36px', color: colorLeft, marginBottom: '15px' }}>{title}</h2>
          <p style={{ fontSize: '24px', lineHeight: '1.4', margin: 0, color: '#1e293b' }}>{text}</p>
        </div>
      )}
      <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: colorRight, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: isLeft ? '0' : '0', zIndex: 10, boxShadow: '0 0 0 20px white inset' }}>
        <span style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a' }}>{percentage}%</span>
      </div>
      {!isLeft && (
        <div style={{ width: '600px', textAlign: 'left', paddingLeft: '40px' }}>
          <h2 style={{ fontSize: '36px', color: colorLeft, marginBottom: '15px' }}>{title}</h2>
          <p style={{ fontSize: '24px', lineHeight: '1.4', margin: 0, color: '#1e293b' }}>{text}</p>
        </div>
      )}
    </div>
  );
};

const GrowthPage = ({ id, children }) => (
  <div id={id} style={commonStyles.page}>
    <div style={{ position: 'absolute', left: '100px', top: '150px' }}>
       <h1 style={{ fontSize: '60px', fontWeight: 900, color: colors.primaryDark, textTransform: 'uppercase', transform: 'rotate(-90deg)', transformOrigin: 'left bottom', position: 'absolute', bottom: '-400px', left: '0', whiteSpace: 'nowrap' }}>KEY AREAS FOR GROWTH</h1>
       <h1 style={{ fontSize: '60px', fontWeight: 900, color: colors.primaryDark, textTransform: 'uppercase', transform: 'rotate(-90deg)', transformOrigin: 'left bottom', position: 'absolute', bottom: '-950px', left: '80px', whiteSpace: 'nowrap' }}>AND IMPROVEMENT</h1>
    </div>

    {/* Abstract Wavy SVG Roadmap */}
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, width: '400px', height: '1080px', zIndex: 0 }}>
       <svg width="400" height="1080" viewBox="0 0 400 1080">
          <path d="M 200,0 C 400,300 0,500 200,800 C 400,1000 200,1080 200,1080" fill="none" stroke="#b45309" strokeWidth="80" strokeLinecap="round" />
          <path d="M 200,0 C 400,300 0,500 200,800 C 400,1000 200,1080 200,1080" fill="none" stroke="white" strokeWidth="10" strokeDasharray="30 40" strokeLinecap="round" />
       </svg>
    </div>

    <div style={{ position: 'absolute', top: '100px', width: '1500px', left: '200px', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

export const Page13Growth1 = ({ data }) => (
  <GrowthPage id="student-page-13">
    <GrowthAreaRow title="Stability & Order" text="Stability and order in a career provide a predictable environment, reducing stress and enabling long-term planning." percentage={data.growth.stability} colorLeft="#4c1d95" colorRight="#4c1d95" align="left" />
    <GrowthAreaRow title="Predictability" text="Predictability in a career ensures a clear understanding of roles, responsibilities, and future prospects, allowing for better decision-making." percentage={data.growth.predictability} colorLeft="#9a3412" colorRight="#22d3ee" align="right" />
    <GrowthAreaRow title="Credentials and Titles" text="Credentials and titles validate expertise, enhance credibility, and open doors to advanced opportunities in a chosen career." percentage={data.growth.credentials} colorLeft="#ef4444" colorRight="#ef4444" align="left" />
    <GrowthAreaRow title="Responsibility and Dependability" text="Responsibility and dependability are crucial as they build trust, enhance reputation, and foster long-term success in any career." percentage={data.growth.responsibility} colorLeft="#10b981" colorRight="#2dd4bf" align="right" />
    <GrowthAreaRow title="Belonging and Tradition" text="Belonging and tradition provide a sense of identity, purpose, and connection to a community, making a career feel meaningful." percentage={data.growth.belonging} colorLeft="#6d28d9" colorRight="#8b5cf6" align="left" />
  </GrowthPage>
);

export const Page14Growth2 = ({ data }) => (
  <GrowthPage id="student-page-14">
    <GrowthAreaRow title="Knowledge and Learning" text="Knowledge and learning are essential for staying competitive and adaptable in a rapidly evolving job market." percentage={data.growth.knowledge} colorLeft="#4c1d95" colorRight="#4c1d95" align="left" />
    <GrowthAreaRow title="Strategic Thinking" text="Strategic thinking is crucial for making informed decisions and solving complex problems in a career." percentage={data.growth.strategic} colorLeft="#9a3412" colorRight="#78350f" align="right" />
    <GrowthAreaRow title="Progress and Innovation" text="Progress and innovation drive career growth by fostering creativity, adaptability, and forward-thinking solutions." percentage={data.growth.progress} colorLeft="#ef4444" colorRight="#ef4444" align="left" />
    <GrowthAreaRow title="Logical Consistency" text="Logical consistency ensures clear, rational decision-making and problem-solving in a career." percentage={data.growth.logical} colorLeft="#10b981" colorRight="#10b981" align="right" />
    <GrowthAreaRow title="Ethics and Universal Truths" text="Ethics and universal truths provide a moral compass, ensuring integrity and trustworthiness in a career." percentage={data.growth.ethics} colorLeft="#6d28d9" colorRight="#6d28d9" align="left" />
  </GrowthPage>
);

export const Page15Growth3 = ({ data }) => (
  <GrowthPage id="student-page-15">
    <GrowthAreaRow title="Freedom of Action" text="Freedom of action empowers individuals to make independent decisions, fostering creativity and personal growth." percentage={data.growth.freedom} colorLeft="#4c1d95" colorRight="#4c1d95" align="left" />
    <GrowthAreaRow title="Adaptability and Flexibility" text="Adaptability and flexibility enable individuals to navigate change and uncertainty effectively in their careers." percentage={data.growth.adaptability} colorLeft="#9a3412" colorRight="#78350f" align="right" />
    <GrowthAreaRow title="Negotiation and Troubleshooting" text="Negotiation and troubleshooting skills are vital for resolving conflicts, overcoming challenges, and achieving mutually beneficial outcomes." percentage={data.growth.negotiation} colorLeft="#ef4444" colorRight="#ef4444" align="left" />
    <GrowthAreaRow title="Spontaneity, Stimulation & Excitement" text="Spontaneity, stimulation, and excitement bring energy and creativity to a career, making work more engaging and fulfilling." percentage={data.growth.spontaneity} colorLeft="#10b981" colorRight="#10b981" align="right" />
    <GrowthAreaRow title="Passion and Entertaining" text="Passion fuels motivation and dedication, making work more enjoyable and meaningful in a career." percentage={data.growth.passion} colorLeft="#6d28d9" colorRight="#6d28d9" align="left" />
  </GrowthPage>
);

export const Page16Growth4 = ({ data }) => (
  <GrowthPage id="student-page-16">
    <GrowthAreaRow title="Empathic Relationships" text="Empathic relationships build trust, collaboration, and emotional intelligence in a career. They enhance teamwork." percentage={data.growth.empathic} colorLeft="#4c1d95" colorRight="#4c1d95" align="left" />
    <GrowthAreaRow title="Identity and Significance" text="Identity and significance provide a sense of purpose and self-worth in a career, aligning work with personal values." percentage={data.growth.identity} colorLeft="#9a3412" colorRight="#78350f" align="right" />
    <GrowthAreaRow title="Ethical Leadership" text="Ethical leadership inspires trust, integrity, and accountability, creating a positive and sustainable impact." percentage={data.growth.ethical} colorLeft="#ef4444" colorRight="#ef4444" align="left" />
    <GrowthAreaRow title="Cooperation and Involvement" text="Cooperation and involvement promote teamwork, shared goals, and active participation in a career." percentage={data.growth.cooperation} colorLeft="#10b981" colorRight="#10b981" align="right" />
    <GrowthAreaRow title="Recognition and Appreciation" text="Recognition and appreciation boost morale, motivation, and job satisfaction in a career." percentage={data.growth.recognition} colorLeft="#6d28d9" colorRight="#6d28d9" align="left" />
  </GrowthPage>
);
