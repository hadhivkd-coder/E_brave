import React from 'react';
import { renderToString } from 'react-dom/server';
import PremiumDossierTemplate from './src/student/utils/PremiumDossierTemplate.jsx';
import fs from 'fs';

const mockStudentInfo = {
  fullName: "Validation User",
  grade: "Grade 12",
  mobile: "+91 9876543210",
  schoolName: "E-Brave Global Academy",
  schoolCode: "EBRAVE-2026"
};

const mockAssessmentData = {
  assessmentId: "val-847293-1029",
  archetype: "The Visionary Technologist",
  topCareerMatch: "Artificial Intelligence Architect",
  topTraits: "Analytical Reasoning, Creative Problem Solving, Strategic Vision, Leadership",
  primaryRiskFlag: "May experience cognitive fatigue if forced into highly repetitive administrative tasks."
};

const htmlContent = renderToString(
  <PremiumDossierTemplate studentInfo={mockStudentInfo} assessmentData={mockAssessmentData} />
);

const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Premium Dossier Preview</title>
  <style>
    body { background-color: #333; display: flex; flex-direction: column; align-items: center; padding: 40px; }
    .page-preview { box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom: 40px; border-radius: 4px; overflow: hidden; }
  </style>
</head>
<body>
  <div style="color: white; margin-bottom: 20px; font-family: sans-serif; text-align: center;">
    <h2>Visual Proof: Premium Counselor Dossier</h2>
    <p>This is a live render of the exact React component used by the PDF generator.</p>
  </div>
  <div class="page-preview">
    ${htmlContent}
  </div>
</body>
</html>
`;

fs.writeFileSync('C:/Users/Shafeeq/.gemini/antigravity/brain/24ce5453-55bf-41c1-8007-abdcbcd8a712/dossier_preview.html', fullHtml);
console.log('Preview generated successfully.');
