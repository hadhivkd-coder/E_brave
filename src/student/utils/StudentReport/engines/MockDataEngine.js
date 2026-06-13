/**
 * Mock Data Engine for the Premium Student & Parent Report.
 * In a real implementation, this would be replaced by API calls to the AI backend
 * which would stream down these personalized paragraphs based on the student's actual psychometric data.
 */

export const generateReportData = (studentInfo, assessmentData) => {
  const name = studentInfo?.fullName?.split(' ')[0] || 'Student';
  const archetype = assessmentData?.archetype || 'The Architect';
  
  return {
    student: {
      firstName: name,
      fullName: studentInfo?.fullName || 'Alex Student',
      grade: studentInfo?.grade || 'Grade 11',
      schoolName: studentInfo?.schoolName || 'E-Brave Partner School',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    },
    
    executiveSummary: {
      title: `The ${archetype}`,
      intro: `This report is designed specifically for ${name}. It is not just a collection of scores, but a personalized roadmap to understanding ${name}'s unique potential.`,
      description: `${name} demonstrates a rare combination of structured logical thinking and deep intrinsic motivation. In environments that value precision, deep focus, and strategic problem-solving, ${name} will naturally emerge as a leader. This profile indicates a student who doesn't just want to know *how* things work, but *why* they work.`
    },

    personality: {
      openness: 88,
      conscientiousness: 75,
      extraversion: 40,
      agreeableness: 60,
      neuroticism: 18, // Emotional Stability is 82, so neuroticism is low
      insights: [
        "Highly open to new, complex ideas and abstract theories.",
        "Demonstrates strong self-discipline when the goal is logically sound.",
        "Draws energy from internal reflection rather than external crowds.",
        "Remains exceptionally calm and resilient under high-pressure scenarios."
      ]
    },

    strengths: {
      top: ["Systematic Design", "Critical Thinking", "Sustained Focus"],
      description: `When ${name} encounters a complex system, their natural instinct is to break it down into logical components. This isn't just an academic skill—it's a fundamental way of viewing the world. They have an exceptional ability to maintain focus on abstract problems long after others might experience cognitive fatigue.`
    },

    learningStyle: {
      primary: "Visual-Logical",
      breakdown: { visual: 65, kinesthetic: 20, auditory: 15 },
      description: `${name} absorbs information best when it can be mapped, charted, or read at their own pace. Auditory lectures without visual aids will lead to rapid disengagement. They need to 'see' the architecture of the information.`
    },

    careers: [
      {
        title: "Artificial Intelligence Architect",
        match: 98,
        overview: "Designing the fundamental logic models that power machine learning algorithms.",
        why: `This perfectly aligns with ${name}'s high 'Logic Smart' score and their preference for deep, uninterrupted technical work.`,
        skills: ["Advanced Mathematics", "Python/C++", "System Architecture"],
        salary: "$150,000 - $250,000+",
        outlook: "Exponential Growth (35%+ over next decade)"
      },
      {
        title: "Data Scientist",
        match: 92,
        overview: "Extracting actionable intelligence and predictions from massive, unstructured datasets.",
        why: `Leverages ${name}'s ability to spot patterns in chaos—a direct manifestation of their high Openness and analytical reasoning.`,
        skills: ["Statistical Modeling", "Data Visualization", "SQL"],
        salary: "$120,000 - $180,000+",
        outlook: "High Growth (21%+ over next decade)"
      },
      {
        title: "Systems Engineer",
        match: 85,
        overview: "Ensuring complex aerospace, software, or infrastructural systems operate flawlessly.",
        why: `${name}'s high Conscientiousness and systemic worldview makes them ideal for roles where a single logical error could cause cascading failures.`,
        skills: ["Systems Thinking", "Project Management", "Risk Analysis"],
        salary: "$100,000 - $160,000+",
        outlook: "Steady Growth (10%+ over next decade)"
      }
    ],

    parentGuidance: {
      do: [
        `Give ${name} complex problems, not just instructions.`,
        `Allow them extensive quiet time to recharge after social events.`,
        `Discuss the *logic* behind your decisions, avoiding emotional appeals.`
      ],
      dont: [
        "Micromanage their study schedule—they need autonomy.",
        "Force them into highly extroverted leadership roles prematurely.",
        "Dismiss their questions as 'arguing'—they are just seeking logical consistency."
      ],
      description: `As a parent, your greatest tool is providing ${name} with access to high-level resources and then stepping back. They do not need you to push them; they need you to clear the runway so they can take off.`
    },

    studentAction: {
      immediate: "Enroll in an introductory logic or programming course this semester.",
      shortTerm: "Identify one complex project (like building a PC or learning a new language) to complete independently.",
      mindset: "Recognize that your need for quiet is a strength, not a weakness. Protect your deep-work time."
    }
  };
};
