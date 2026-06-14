import React from 'react';
import { colors, commonStyles } from './ReportStyles';
import { Settings, Lightbulb, Zap, Users } from 'lucide-react';

// Advanced Circular Progress Ring
const CircularProgress = ({ percentage, color, icon: Icon }) => {
  const radius = 180;
  const stroke = 30;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '60px' }}>
      <svg height="400" width="400" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle stroke="rgba(255,255,255,0.1)" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx="200" cy="200" />
        <circle stroke={color} fill="transparent" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} strokeLinecap="round" r={normalizedRadius} cx="200" cy="200" />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon size={80} color={color} style={{ marginBottom: '10px' }} />
        <span style={{ fontSize: '60px', fontWeight: 900, color: colors.white }}>{percentage}%</span>
      </div>
    </div>
  );
};

const StarDetailPage = ({ id, title, text, bgColor, textColor, colorTheme, Icon, percentage }) => (
  <div id={id} style={{ ...commonStyles.page, backgroundColor: bgColor, padding: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    
    {/* Geometric Abstract Background */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill={colors.white} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    <div style={{ zIndex: 10 }}>
       <CircularProgress percentage={percentage} color={textColor} icon={Icon} />
    </div>

    <div style={{ zIndex: 10, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '40px', padding: '80px', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', borderTop: `15px solid ${textColor}`, width: '100%', position: 'relative' }}>
      {/* Decorative large faint text */}
      <div style={{ position: 'absolute', top: '20px', right: '40px', fontSize: '100px', fontWeight: 900, color: textColor, opacity: 0.1, textTransform: 'uppercase' }}>
         {title}
      </div>
      <h1 style={{ fontSize: '80px', color: textColor, margin: '0 0 40px 0', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>{title}</h1>
      <p style={{ fontSize: '32px', color: colors.textDark, lineHeight: '1.9', margin: 0, textAlign: 'justify', fontWeight: 500 }}>{text}</p>
    </div>
  </div>
);

export const Page09Structure = ({ data }) => (
  <StarDetailPage 
    id="student-page-9"
    title="Structure"
    bgColor={colors.primaryDark}
    textColor={colors.traitStructure}
    colorTheme={colors.primaryLight}
    Icon={Settings}
    percentage={data.star.structure}
    text="Individuals with a structured personality thrive in environments where clear guidelines, routines, and systems are in place, enabling them to work with efficiency and precision. Known for their meticulous planning and attention to detail, they excel at adhering to schedules and meeting deadlines. Such individuals are well-suited for roles that demand strong organizational skills and consistent follow-through, such as project management, administration, or accounting. Structure not only boosts their productivity but also provides a sense of stability and control, helping them navigate complexity and achieve their goals. To further develop this trait, they can refine their organizational abilities, establish effective routines, and utilize tools that enhance order and efficiency."
  />
);

export const Page10Theoretical = ({ data }) => (
  <StarDetailPage 
    id="student-page-10"
    title="Theoretical"
    bgColor={colors.primaryDark}
    textColor={colors.traitTheoretical}
    colorTheme={colors.primaryLight}
    Icon={Lightbulb}
    percentage={data.star.theoretical}
    text="Individuals with a theoretical mindset are naturally drawn to abstract concepts and the pursuit of understanding fundamental principles and universal truths. They thrive in roles that demand strategic thinking, problem-solving, and the generation of innovative ideas. Careers in research, academia, and theoretical sciences provide ideal platforms for these individuals to explore complex systems, develop theoretical frameworks, and contribute to the expansion of knowledge. Beyond academia, roles in consulting, strategic planning, and technology development allow them to leverage their analytical prowess and visionary thinking to address real-world challenges and spearhead forward-thinking initiatives."
  />
);

export const Page11Action = ({ data }) => (
  <StarDetailPage 
    id="student-page-11"
    title="Action"
    bgColor={colors.primaryDark}
    textColor={colors.traitAction}
    colorTheme={colors.primaryLight}
    Icon={Zap}
    percentage={data.star.action}
    text="Action-oriented individuals are fueled by a need for immediate results and flourish in dynamic, fast-paced environments where they can create a tangible impact. They excel in roles that demand adaptability, quick decision-making, and a hands-on approach, making them well-suited for careers in sales, entrepreneurship, project management, and emergency response. Their energetic and spontaneous nature also finds a natural fit in fields like entertainment, sports, and event planning, where their enthusiasm and ability to inspire others shine. Often drawn to leadership positions, action-oriented individuals lead by example, motivate teams, and drive initiatives forward with passion and determination, making them catalysts for progress and success."
  />
);

export const Page12Relationship = ({ data }) => (
  <StarDetailPage 
    id="student-page-12"
    title="Relationship"
    bgColor={colors.primaryDark}
    textColor={colors.traitRelationship}
    colorTheme={colors.primaryLight}
    Icon={Users}
    percentage={data.star.relationship}
    text="Relationship-oriented individuals are deeply focused on building meaningful connections and fostering personal growth, thriving in roles that require empathy, communication, and collaboration. They excel in environments where they can inspire and support others, making them ideal for careers in counseling, mentoring, coaching, human resources, social work, and community outreach. Their natural ability to build rapport, create harmony, and positively impact lives shines in these fields. Additionally, they often succeed in leadership roles that prioritize teamwork, inclusivity, and the development of strong interpersonal relationships within organizations. With their exceptional empathy, communication skills, and authenticity, relationship-oriented individuals play a vital role in nurturing healthy connections."
  />
);

// Advanced Infographic Roadmap layout for Growth Areas
const GrowthAreaNode = ({ title, text, percentage, colorLeft, colorRight, index, isLast }) => {
  return (
    <div style={{ position: 'relative', display: 'flex', width: '100%', marginBottom: isLast ? '0' : '60px' }}>
      {/* Vertical SVG Connecting Line */}
      {!isLast && (
        <div style={{ position: 'absolute', left: '75px', top: '150px', bottom: '-60px', width: '6px', backgroundColor: colors.textMut, opacity: 0.2, zIndex: 0 }}></div>
      )}
      
      {/* Node Circle */}
      <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: colorRight, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, border: `10px solid ${colors.white}`, boxShadow: '0 20px 40px rgba(0,0,0,0.2)', flexShrink: 0 }}>
        <span style={{ fontSize: '40px', fontWeight: 900, color: colors.white }}>{percentage}%</span>
      </div>

      {/* Content Card with pointing arrow */}
      <div style={{ marginLeft: '40px', flex: 1, backgroundColor: colors.white, borderRadius: '30px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '-15px', top: '55px', width: '30px', height: '30px', backgroundColor: colors.white, transform: 'rotate(45deg)', borderRadius: '5px' }}></div>
        <h2 style={{ fontSize: '36px', color: colorLeft, marginBottom: '15px', fontWeight: 900 }}>{title}</h2>
        <p style={{ fontSize: '26px', lineHeight: '1.6', margin: 0, color: colors.textDark, fontWeight: 500 }}>{text}</p>
      </div>
    </div>
  );
};

const GrowthPage = ({ id, children }) => (
  <div id={id} style={{ ...commonStyles.page, padding: '80px', display: 'flex', flexDirection: 'column', backgroundColor: colors.primaryLight }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', backgroundColor: colors.accentGreen, opacity: 0.1, borderRadius: '0 0 0 100%' }}></div>

    <div style={{ marginBottom: '80px', zIndex: 10 }}>
       <h1 style={{ fontSize: '70px', fontWeight: 900, color: colors.primaryDark, textTransform: 'uppercase', lineHeight: '1.1', margin: 0 }}>KEY AREAS FOR GROWTH</h1>
       <div style={{ width: '150px', height: '10px', backgroundColor: colors.accentYellow, marginTop: '20px', borderRadius: '5px' }}></div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
       {children}
    </div>
  </div>
);

// Mapping colors
const c1 = colors.primaryDark; // Deep Green
const c2 = colors.traitStructure; // Teal
const c3 = colors.traitAction; // Yellow
const c4 = colors.accentGreen; // Light Green

export const Page13Growth1 = ({ data }) => (
  <GrowthPage id="student-page-13">
    <GrowthAreaNode title="Stability & Order" text="Stability and order provide a predictable environment, reducing stress and enabling long-term planning." percentage={data.growth.stability} colorLeft={c1} colorRight={c1} index={0} />
    <GrowthAreaNode title="Predictability" text="Predictability ensures a clear understanding of roles, responsibilities, and future prospects, allowing for better decisions." percentage={data.growth.predictability} colorLeft={c2} colorRight={c2} index={1} />
    <GrowthAreaNode title="Credentials and Titles" text="Credentials and titles validate expertise, enhance credibility, and open doors to advanced career opportunities." percentage={data.growth.credentials} colorLeft={c3} colorRight={c3} index={2} />
    <GrowthAreaNode title="Responsibility and Dependability" text="Responsibility builds trust, enhances reputation, and fosters long-term success in any profession." percentage={data.growth.responsibility} colorLeft={c4} colorRight={c4} index={3} />
    <GrowthAreaNode title="Belonging and Tradition" text="Belonging provides a sense of identity, purpose, and connection to a community, making a career meaningful." percentage={data.growth.belonging} colorLeft={c1} colorRight={c1} index={4} isLast={true} />
  </GrowthPage>
);

export const Page14Growth2 = ({ data }) => (
  <GrowthPage id="student-page-14">
    <GrowthAreaNode title="Knowledge and Learning" text="Knowledge and learning are essential for staying competitive and adaptable in a rapidly evolving job market." percentage={data.growth.knowledge} colorLeft={c1} colorRight={c1} index={0} />
    <GrowthAreaNode title="Strategic Thinking" text="Strategic thinking is crucial for making informed decisions and solving complex organizational problems." percentage={data.growth.strategic} colorLeft={c2} colorRight={c2} index={1} />
    <GrowthAreaNode title="Progress and Innovation" text="Progress and innovation drive career growth by fostering creativity, adaptability, and forward-thinking." percentage={data.growth.progress} colorLeft={c3} colorRight={c3} index={2} />
    <GrowthAreaNode title="Logical Consistency" text="Logical consistency ensures clear, rational decision-making and efficient resource allocation." percentage={data.growth.logical} colorLeft={c4} colorRight={c4} index={3} />
    <GrowthAreaNode title="Ethics and Universal Truths" text="Ethics provide a moral compass, ensuring integrity and trustworthiness in professional environments." percentage={data.growth.ethics} colorLeft={c1} colorRight={c1} index={4} isLast={true} />
  </GrowthPage>
);

export const Page15Growth3 = ({ data }) => (
  <GrowthPage id="student-page-15">
    <GrowthAreaNode title="Freedom of Action" text="Freedom of action empowers individuals to make independent decisions, fostering creativity and personal growth." percentage={data.growth.freedom} colorLeft={c1} colorRight={c1} index={0} />
    <GrowthAreaNode title="Adaptability and Flexibility" text="Adaptability enables individuals to navigate change and uncertainty effectively in their careers." percentage={data.growth.adaptability} colorLeft={c2} colorRight={c2} index={1} />
    <GrowthAreaNode title="Negotiation and Troubleshooting" text="Negotiation skills are vital for resolving conflicts, overcoming challenges, and achieving mutual outcomes." percentage={data.growth.negotiation} colorLeft={c3} colorRight={c3} index={2} />
    <GrowthAreaNode title="Spontaneity & Excitement" text="Spontaneity and excitement bring energy to a career, making work more engaging and dynamically fulfilling." percentage={data.growth.spontaneity} colorLeft={c4} colorRight={c4} index={3} />
    <GrowthAreaNode title="Passion and Entertaining" text="Passion fuels motivation and dedication, making work naturally more enjoyable and deeply meaningful." percentage={data.growth.passion} colorLeft={c1} colorRight={c1} index={4} isLast={true} />
  </GrowthPage>
);

export const Page16Growth4 = ({ data }) => (
  <GrowthPage id="student-page-16">
    <GrowthAreaNode title="Empathic Relationships" text="Empathic relationships build trust, collaboration, and emotional intelligence in a career. They enhance teamwork." percentage={data.growth.empathic} colorLeft={c1} colorRight={c1} index={0} />
    <GrowthAreaNode title="Identity and Significance" text="Identity and significance provide a sense of purpose, aligning daily work with profound personal values." percentage={data.growth.identity} colorLeft={c2} colorRight={c2} index={1} />
    <GrowthAreaNode title="Ethical Leadership" text="Ethical leadership inspires trust, integrity, and accountability, creating a positive and sustainable impact." percentage={data.growth.ethical} colorLeft={c3} colorRight={c3} index={2} />
    <GrowthAreaNode title="Cooperation and Involvement" text="Cooperation and involvement promote teamwork, shared organizational goals, and active participation." percentage={data.growth.cooperation} colorLeft={c4} colorRight={c4} index={3} />
    <GrowthAreaNode title="Recognition and Appreciation" text="Recognition and appreciation boost morale, motivation, and overall job satisfaction in any career." percentage={data.growth.recognition} colorLeft={c1} colorRight={c1} index={4} isLast={true} />
  </GrowthPage>
);
