/**
 * Mock Data Engine for the 28-Page Landscape Slide Report.
 * Maps data to the STAR behavioural model and 8 Multiple Intelligences (Smarts).
 */

export const generateReportData = (studentInfo, assessmentData) => {
  // Base STAR scores
  const star = {
    relationship: 88,
    theoretical: 70,
    structure: 60,
    action: 40
  };

  // Dynamic Archetype Logic
  const getArchetype = (scores) => {
    let highestTrait = 'relationship';
    let maxScore = scores.relationship;
    
    Object.keys(scores).forEach(key => {
      if (scores[key] > maxScore) {
        maxScore = scores[key];
        highestTrait = key;
      }
    });

    switch(highestTrait) {
      case 'action':
        return {
          title: "The Catalyst",
          description: `Because you scored exceptionally high in Action (${maxScore}%), you are a natural 'Catalyst'. You thrive in fast-paced environments and love turning ideas into reality instantly. To reach your absolute peak, partner with individuals who excel in Structure to help manage the finer details while you drive the vision forward.`
        };
      case 'structure':
        return {
          title: "The Architect",
          description: `With a dominant score in Structure (${maxScore}%), you are an 'Architect' of systems. You build the foundations that others rely on. Your superpower is organization and predictability. Push yourself out of your comfort zone occasionally to embrace the unexpected, which will accelerate your leadership growth.`
        };
      case 'theoretical':
        return {
          title: "The Visionary",
          description: `Scoring highly in Theoretical (${maxScore}%) makes you a 'Visionary'. You see patterns, concepts, and strategies that others miss. You are built for innovation. Ensure you anchor your grand ideas with actionable steps so they don't remain purely conceptual.`
        };
      case 'relationship':
      default:
        return {
          title: "The Empathic Leader",
          description: `Your exceptionally high Relationship score (${maxScore}%) marks you as an 'Empathic Leader'. You possess a rare ability to unite people, inspire teams, and mediate conflict naturally. In the modern workforce, emotional intelligence is your greatest asset. Protect your energy and learn to set firm boundaries.`
        };
    }
  };

  const archetype = getArchetype(star);

  return {
    student: {
      name: studentInfo?.fullName || 'Fathima Faiha',
      place: 'Padanilam',
      mobile: studentInfo?.mobile || '+91 9961 243591',
      class: studentInfo?.grade || 'PLUS TWO',
      email: 'raseenapoyil763@gmail.com'
    },
    archetype: archetype,
    star: star,
    
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
