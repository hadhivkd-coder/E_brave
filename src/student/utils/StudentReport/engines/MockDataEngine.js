/**
 * Mock Data Engine for the 28-Page Landscape Slide Report.
 * Maps data to the STAR behavioural model and 8 Multiple Intelligences (Smarts).
 */

export const generateReportData = (studentInfo, assessmentData) => {
  return {
    student: {
      name: studentInfo?.fullName || 'Fathima Faiha',
      place: 'Padanilam',
      mobile: studentInfo?.mobile || '+91 9961 243591',
      class: studentInfo?.grade || 'PLUS TWO',
      email: 'raseenapoyil763@gmail.com'
    },
    
    // STAR Behavioural Abilities
    star: {
      relationship: 63,
      theoretical: 66,
      structure: 58,
      action: 77
    },

    // 8 Multiple Intelligences (Smarts)
    smarts: {
      music: 40,
      word: 65,
      body: 65,
      picture: 55,
      logic: 60,
      people: 70,
      self: 60,
      nature: 45
    },

    // Key Areas For Growth Percentages (from the roadmap pages)
    growth: {
      stability: 66.7,
      predictability: 50,
      credentials: 70,
      responsibility: 44,
      belonging: 60,
      
      knowledge: 44,
      strategic: 70,
      progress: 60,
      logical: 78,
      ethics: 80,

      freedom: 78,
      adaptability: 80,
      negotiation: 70,
      spontaneity: 56,
      passion: 100,

      empathic: 56,
      identity: 60,
      ethical: 80,
      cooperation: 44,
      recognition: 70
    },

    // Top Careers
    careers: [
      { id: 1, title: "Integrated B.tech + MBA", subtitle: "or MBA" },
      { id: 2, title: "Government Service", subtitle: "After Completing Any Degree" },
      { id: 3, title: "Office Administration Courses", subtitle: "After Completing Any Degree" }
    ],

    contact: {
      name: "MUHAMMED RAMEEZ C",
      mobile: "+91 9048 446 840",
      email: "ebravestudies@gmail.com",
      social: "@ebravestudies"
    }
  };
};
