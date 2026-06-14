import React, { forwardRef } from 'react';
import { generateReportData } from './engines/MockDataEngine';
import { 
  Page01Cover, Page02Title, Page03Brief, Page04Preface, Page05StarAssessment, 
  Page06BehaviourIntro, Page07StarQuadrants, Page08StarChart 
} from './PageBatch1';
import { 
  Page09Structure, Page10Theoretical, Page11Action, Page12Relationship, 
  Page13Growth1, Page14Growth2, Page15Growth3, Page16Growth4 
} from './PageBatch2';
import { 
  Page17SkillsIntro, Page18SkillsChart, Page19Word, Page20Music, Page21Body, 
  Page22Picture, Page23Logic, Page24People, Page25Self, Page26Nature, 
  Page27CareerFitment, Page28Contact 
} from './PageBatch3';
import { Page29ActionPlan, Page30CounselorNotes, Page31DigitalBridge } from './PageBatch4';

const StudentReportTemplate = forwardRef(({ studentInfo, assessmentData }, ref) => {
  const data = generateReportData(studentInfo, assessmentData);

  return (
    <div ref={ref} style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1000 }}>
      {/* Batch 1: Pages 1-8 */}
      <Page01Cover data={data} />
      <Page02Title data={data} />
      <Page03Brief />
      <Page04Preface />
      <Page05StarAssessment />
      <Page06BehaviourIntro />
      <Page07StarQuadrants />
      <Page08StarChart data={data} />

      {/* Batch 2: Pages 9-16 */}
      <Page09Structure data={data} />
      <Page10Theoretical data={data} />
      <Page11Action data={data} />
      <Page12Relationship data={data} />
      <Page13Growth1 data={data} />
      <Page14Growth2 data={data} />
      <Page15Growth3 data={data} />
      <Page16Growth4 data={data} />

      {/* Batch 3: Pages 17-28 */}
      <Page17SkillsIntro />
      <Page18SkillsChart data={data} />
      <Page19Word data={data} />
      <Page20Music data={data} />
      <Page21Body data={data} />
      <Page22Picture data={data} />
      <Page23Logic data={data} />
      <Page24People data={data} />
      <Page25Self data={data} />
      <Page26Nature data={data} />
      <Page27CareerFitment data={data} />
      <Page28Contact data={data} />

      {/* Batch 4: Pages 29-31 (Interactive Workbook & Digital Bridge) */}
      <Page29ActionPlan />
      <Page30CounselorNotes />
      <Page31DigitalBridge />
    </div>
  );
});

export default StudentReportTemplate;
