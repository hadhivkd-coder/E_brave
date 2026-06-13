import React, { forwardRef } from 'react';
import { generateReportData } from './engines/MockDataEngine';
import { 
  Page01Cover, Page02Welcome, Page03Executive, Page04Snapshot, Page05Personality, 
  Page06Strength, Page07Talents, Page08Interest, Page09Motivation, Page10LearningStyle 
} from './PageBatch1';
import { 
  Page11Communication, Page12DecisionMaking, Page13FutureSkills, Page14CareerReadiness, 
  Page15Challenges, Page16Growth, Page17Exploration, Page18Career1, Page19Career2, Page20Career3 
} from './PageBatch2';
import { 
  Page21Education, Page22SkillsDev, Page23ParentGuidance, Page24ParentAction, Page25StudentAction, 
  Page26Roadmap, Page27LongTerm, Page28Resources, Page29Counselor, Page30Conclusion 
} from './PageBatch3';

const StudentReportTemplate = forwardRef(({ studentInfo, assessmentData }, ref) => {
  const data = generateReportData(studentInfo, assessmentData);

  return (
    <div ref={ref} style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1000 }}>
      {/* Batch 1: Pages 1-10 */}
      <Page01Cover data={data} />
      <Page02Welcome data={data} />
      <Page03Executive data={data} />
      <Page04Snapshot data={data} />
      <Page05Personality data={data} />
      <Page06Strength data={data} />
      <Page07Talents data={data} />
      <Page08Interest data={data} />
      <Page09Motivation data={data} />
      <Page10LearningStyle data={data} />

      {/* Batch 2: Pages 11-20 */}
      <Page11Communication data={data} />
      <Page12DecisionMaking data={data} />
      <Page13FutureSkills data={data} />
      <Page14CareerReadiness data={data} />
      <Page15Challenges data={data} />
      <Page16Growth data={data} />
      <Page17Exploration data={data} />
      <Page18Career1 data={data} />
      <Page19Career2 data={data} />
      <Page20Career3 data={data} />

      {/* Batch 3: Pages 21-30 */}
      <Page21Education data={data} />
      <Page22SkillsDev data={data} />
      <Page23ParentGuidance data={data} />
      <Page24ParentAction data={data} />
      <Page25StudentAction data={data} />
      <Page26Roadmap data={data} />
      <Page27LongTerm data={data} />
      <Page28Resources data={data} />
      <Page29Counselor data={data} />
      <Page30Conclusion data={data} />
    </div>
  );
});

export default StudentReportTemplate;
