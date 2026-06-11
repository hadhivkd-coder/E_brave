/**
 * E-Brave Career Discovery Platform - Master Assessment Configuration Engine
 * SOURCE: EBrave_Career_Discovery_Platform_Master_Reference.pdf
 * 
 * This file contains the finalized intelligence parameters.
 */

// 1. Assessment Sections (The Six Labs)
export const ASSESSMENT_SECTIONS = [
  { id: 'interest_matrix', title: 'The Interest Matrix', description: 'Core vocational matching mapping intrinsic motivation across 16 modern sectors.', questionCount: 25 },
  { id: 'personality_lab', title: 'The Personality Lab', description: 'Evaluates environmental fit using the Big Five (OCEAN) behavioral guardrails.', questionCount: 25 },
  { id: 'future_skills', title: 'The Future Simulator', description: 'Assesses adaptability and AI-era competencies via SJTs.', questionCount: 20 },
  { id: 'academic_alignment', title: 'The Reality Check', description: 'Grounds aspirations by evaluating subject strengths, weaknesses, and academic performance.', questionCount: 10 },
  { id: 'contextual_compass', title: 'The Contextual Compass', description: 'Evaluates OECD-aligned external factors like parent and peer influence.', questionCount: 10 },
  { id: 'career_motivation', title: 'Career Motivation', description: 'Measures psychological readiness and decision confidence.', questionCount: 10 }
];

// 2. Trait Dimensions & Sector Targets
export const TRAIT_DIMENSIONS = [
  // Sectors
  { id: 'technology', label: 'Technology', category: 'sector' },
  { id: 'healthcare', label: 'Healthcare', category: 'sector' },
  { id: 'business', label: 'Business & Finance', category: 'sector' },
  { id: 'law', label: 'Law & Government', category: 'sector' },
  { id: 'arts', label: 'Arts & Design', category: 'sector' },
  { id: 'engineering', label: 'Engineering & Trades', category: 'sector' },
  { id: 'social', label: 'Social Impact & Edu', category: 'sector' },
  // Big 5
  { id: 'extroversion', label: 'Extroversion', category: 'personality' },
  { id: 'introversion', label: 'Introversion', category: 'personality' },
  { id: 'conscientiousness', label: 'Conscientiousness', category: 'personality' },
  { id: 'emotional_stability', label: 'Emotional Stability', category: 'personality' },
  { id: 'openness', label: 'Openness', category: 'personality' },
  // Future Skills
  { id: 'ai_readiness', label: 'AI Readiness', category: 'future_skills' },
  { id: 'critical_thinking', label: 'Critical Thinking', category: 'future_skills' },
  { id: 'problem_solving', label: 'Problem Solving', category: 'future_skills' },
  { id: 'collaboration', label: 'Collaboration', category: 'future_skills' },
  { id: 'creativity_innov', label: 'Creativity & Innovation', category: 'future_skills' },
  { id: 'learning_agility', label: 'Learning Agility', category: 'future_skills' },
  { id: 'independence', label: 'Independence', category: 'future_skills' },
  { id: 'initiative', label: 'Initiative', category: 'future_skills' },
  // Contextual
  { id: 'parent_influence', label: 'Parental Pressure', category: 'contextual' },
  { id: 'confusion', label: 'Career Confusion', category: 'contextual' },
  { id: 'entrepreneurial_potential', label: 'Entrepreneurial Potential', category: 'composite' }
];

// 3. Final Question Bank (Excerpt of the 100 questions)
export const QUESTION_BANK = [
  {
    "id": "q1",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "Your school is hosting a massive science fair. Which part do you want to lead?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q2",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You're organizing a weekend trip with your friends. What is your main role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q3",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You just got a brand new video game. How do you approach playing it for the first time?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q4",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "Your teacher assigns a difficult group project. What is your immediate reaction?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q5",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are given free time to learn anything you want. What do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q6",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You see a student struggling with a heavy box in the hallway. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q7",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "Your team is losing a sports match at halftime. How do you motivate them?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q8",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You have to write an essay on a topic of your choice. What do you write about?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q9",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "Your phone breaks and you can't afford a new one right away. What is your solution?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q10",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You find a complicated puzzle box. How do you open it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q11",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "A local community center needs help organizing an event. What do you volunteer for?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q12",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are designing a brand new app. What is its main feature?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q13",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You get to interview any famous person. Who do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q14",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "Your class is debating a controversial new school rule. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q15",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are trapped in an escape room with your friends. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  },
  {
    "id": "q16",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are starting a YouTube channel. What kind of videos do you make?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "music_band"
  },
  {
    "id": "q17",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You have to build a model bridge for a physics project. How do you do it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "nature_hike"
  },
  {
    "id": "q18",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are asked to plan the school's annual talent show. What do you focus on?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q19",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You find a lost wallet with no ID but a lot of cash. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q20",
    "sectionId": "interest_matrix",
    "type": "Ipsative",
    "text": {
      "en": "You are stranded on a deserted island with a group of people. What is your role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q21",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "Your school is hosting a massive science fair. Which part do you want to lead?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q22",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You're organizing a weekend trip with your friends. What is your main role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q23",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You just got a brand new video game. How do you approach playing it for the first time?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q24",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "Your teacher assigns a difficult group project. What is your immediate reaction?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q25",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are given free time to learn anything you want. What do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q26",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You see a student struggling with a heavy box in the hallway. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q27",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "Your team is losing a sports match at halftime. How do you motivate them?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q28",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You have to write an essay on a topic of your choice. What do you write about?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q29",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "Your phone breaks and you can't afford a new one right away. What is your solution?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q30",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You find a complicated puzzle box. How do you open it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q31",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "A local community center needs help organizing an event. What do you volunteer for?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q32",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are designing a brand new app. What is its main feature?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  },
  {
    "id": "q33",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You get to interview any famous person. Who do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "music_band"
  },
  {
    "id": "q34",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "Your class is debating a controversial new school rule. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "nature_hike"
  },
  {
    "id": "q35",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are trapped in an escape room with your friends. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q36",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are starting a YouTube channel. What kind of videos do you make?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q37",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You have to build a model bridge for a physics project. How do you do it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q38",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are asked to plan the school's annual talent show. What do you focus on?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q39",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You find a lost wallet with no ID but a lot of cash. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q40",
    "sectionId": "personality_lab",
    "type": "Behav.",
    "text": {
      "en": "You are stranded on a deserted island with a group of people. What is your role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 3
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -1
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q41",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "Your school is hosting a massive science fair. Which part do you want to lead?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I design a machine or write the code to solve it automatically.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q42",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You're organizing a weekend trip with your friends. What is your main role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I design a machine or write the code to solve it automatically.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I gather everyone together to talk about their feelings.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q43",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You just got a brand new video game. How do you approach playing it for the first time?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I design a machine or write the code to solve it automatically.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I gather everyone together to talk about their feelings.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q44",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "Your teacher assigns a difficult group project. What is your immediate reaction?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I design a machine or write the code to solve it automatically.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I gather everyone together to talk about their feelings.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q45",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are given free time to learn anything you want. What do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design a machine or write the code to solve it automatically.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I gather everyone together to talk about their feelings.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I confidently take the lead and talk to as many people as possible.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q46",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You see a student struggling with a heavy box in the hallway. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I gather everyone together to talk about their feelings.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I confidently take the lead and talk to as many people as possible.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I prefer to observe the situation and think deeply before acting.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q47",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "Your team is losing a sports match at halftime. How do you motivate them?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I confidently take the lead and talk to as many people as possible.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I prefer to observe the situation and think deeply before acting.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I stick to the plan and work meticulously until it's finished.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q48",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You have to write an essay on a topic of your choice. What do you write about?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I confidently take the lead and talk to as many people as possible.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I prefer to observe the situation and think deeply before acting.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I stick to the plan and work meticulously until it's finished.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I stay completely calm and logically handle the stress.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q49",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "Your phone breaks and you can't afford a new one right away. What is your solution?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I confidently take the lead and talk to as many people as possible.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I prefer to observe the situation and think deeply before acting.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I stick to the plan and work meticulously until it's finished.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I stay completely calm and logically handle the stress.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I embrace the unknown and look for creative, out-of-the-box solutions.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  },
  {
    "id": "q50",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You find a complicated puzzle box. How do you open it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I prefer to observe the situation and think deeply before acting.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I stick to the plan and work meticulously until it's finished.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I stay completely calm and logically handle the stress.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I embrace the unknown and look for creative, out-of-the-box solutions.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I break the complex issue down into smaller, solvable parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "music_band"
  },
  {
    "id": "q51",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "A local community center needs help organizing an event. What do you volunteer for?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I stick to the plan and work meticulously until it's finished.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I stay completely calm and logically handle the stress.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I embrace the unknown and look for creative, out-of-the-box solutions.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I break the complex issue down into smaller, solvable parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I ask my friends for their input and we work on it together.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "nature_hike"
  },
  {
    "id": "q52",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are designing a brand new app. What is its main feature?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I stay completely calm and logically handle the stress.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I embrace the unknown and look for creative, out-of-the-box solutions.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I break the complex issue down into smaller, solvable parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I ask my friends for their input and we work on it together.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q53",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You get to interview any famous person. Who do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I embrace the unknown and look for creative, out-of-the-box solutions.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I break the complex issue down into smaller, solvable parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I ask my friends for their input and we work on it together.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q54",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "Your class is debating a controversial new school rule. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I break the complex issue down into smaller, solvable parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I ask my friends for their input and we work on it together.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I quickly look up tutorials and learn the new skill on the spot.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q55",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are trapped in an escape room with your friends. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I ask my friends for their input and we work on it together.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I quickly look up tutorials and learn the new skill on the spot.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I test different AI prompts to see which gets the best result.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q56",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are starting a YouTube channel. What kind of videos do you make?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I quickly look up tutorials and learn the new skill on the spot.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I test different AI prompts to see which gets the best result.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I build a tech platform to manage the situation.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q57",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You have to build a model bridge for a physics project. How do you do it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I quickly look up tutorials and learn the new skill on the spot.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I test different AI prompts to see which gets the best result.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I build a tech platform to manage the situation.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q58",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are asked to plan the school's annual talent show. What do you focus on?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I quickly look up tutorials and learn the new skill on the spot.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I test different AI prompts to see which gets the best result.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I build a tech platform to manage the situation.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q59",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You find a lost wallet with no ID but a lot of cash. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I test different AI prompts to see which gets the best result.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I build a tech platform to manage the situation.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q60",
    "sectionId": "future_skills",
    "type": "SJT",
    "text": {
      "en": "You are stranded on a deserted island with a group of people. What is your role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I build a tech platform to manage the situation.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q61",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "Your school is hosting a massive science fair. Which part do you want to lead?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make sure everyone is feeling okay and check on their health.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q62",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You're organizing a weekend trip with your friends. What is your main role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on the creative direction and emotional expression.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q63",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You just got a brand new video game. How do you approach playing it for the first time?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I look for ways to market the idea and reach more people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q64",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "Your teacher assigns a difficult group project. What is your immediate reaction?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I establish clear rules and make sure everyone follows them fairly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q65",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are given free time to learn anything you want. What do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I try to understand the mechanics and fix the technical issues.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q66",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You see a student struggling with a heavy box in the hallway. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I teach others what I know so they can succeed too.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  },
  {
    "id": "q67",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "Your team is losing a sports match at halftime. How do you motivate them?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "music_band"
  },
  {
    "id": "q68",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You have to write an essay on a topic of your choice. What do you write about?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "nature_hike"
  },
  {
    "id": "q69",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "Your phone breaks and you can't afford a new one right away. What is your solution?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I loudly volunteer my ideas and try to involve everyone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q70",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You find a complicated puzzle box. How do you open it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step back and work independently on a quiet, focused task.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q71",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "A local community center needs help organizing an event. What do you volunteer for?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I organize all the materials and ensure everything is perfect.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q72",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are designing a brand new app. What is its main feature?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I remain grounded and help calm others down.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q73",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You get to interview any famous person. Who do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I eagerly try the strangest, most unconventional idea.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q74",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "Your class is debating a controversial new school rule. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I brainstorm multiple alternative solutions before picking one.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q75",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are trapped in an escape room with your friends. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I ensure the team is communicating and cooperating smoothly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q76",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are starting a YouTube channel. What kind of videos do you make?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q77",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You have to build a model bridge for a physics project. How do you do it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q78",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are asked to plan the school's annual talent show. What do you focus on?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I figure it out through rapid trial and error.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q79",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You find a lost wallet with no ID but a lot of cash. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use AI tools to generate ideas and automate the boring parts.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q80",
    "sectionId": "academic_alignment",
    "type": "Likert",
    "text": {
      "en": "You are stranded on a deserted island with a group of people. What is your role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use digital tools to analyze the data and find a solution.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q81",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "Your school is hosting a massive science fair. Which part do you want to lead?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I volunteer for the medical or caretaking responsibilities.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q82",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You're organizing a weekend trip with your friends. What is your main role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design the visual elements and make sure it looks beautiful.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q83",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You just got a brand new video game. How do you approach playing it for the first time?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I take charge of the budget and resource management.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  },
  {
    "id": "q84",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "Your teacher assigns a difficult group project. What is your immediate reaction?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I read the guidelines carefully to ensure strict compliance.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "music_band"
  },
  {
    "id": "q85",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You are given free time to learn anything you want. What do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on building the physical structure and making sure it works.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "engineering",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "nature_hike"
  },
  {
    "id": "q86",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You see a student struggling with a heavy box in the hallway. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on helping the community and supporting the vulnerable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "social",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "science_project"
  },
  {
    "id": "q87",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "Your team is losing a sports match at halftime. How do you motivate them?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I step up as a leader and guide the group.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "environment",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "school_event"
  },
  {
    "id": "q88",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You have to write an essay on a topic of your choice. What do you write about?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "research",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "social_gathering"
  },
  {
    "id": "q89",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "Your phone breaks and you can't afford a new one right away. What is your solution?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I thrive in the energetic crowd and keep everyone hyped up.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "extroversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "study_desk"
  },
  {
    "id": "q90",
    "sectionId": "contextual_compass",
    "type": "SJT",
    "text": {
      "en": "You find a complicated puzzle box. How do you open it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I find a peaceful corner to handle my responsibilities alone.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "introversion",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 3
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      }
    ],
    "imageCategory": "tech_interface"
  },
  {
    "id": "q91",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "A local community center needs help organizing an event. What do you volunteer for?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I create a highly detailed schedule and strict deadlines for myself.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "conscientiousness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "classroom_surprise"
  },
  {
    "id": "q92",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You are designing a brand new app. What is its main feature?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I don't panic; I just keep moving forward steadily.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "emotional_stability",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "textbooks_studying"
  },
  {
    "id": "q93",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You get to interview any famous person. Who do you choose?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I explore abstract theories to find a unique perspective.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "openness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "hands_on_workshop"
  },
  {
    "id": "q94",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "Your class is debating a controversial new school rule. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I analyze the puzzle methodically until I find the root cause.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "problem_solving",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "family_dinner"
  },
  {
    "id": "q95",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You are trapped in an escape room with your friends. What is your strategy?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I delegate tasks based on everyone's strengths.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "collaboration",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "mountain_peak"
  },
  {
    "id": "q96",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You are starting a YouTube channel. What kind of videos do you make?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on getting the job done efficiently and correctly.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "critical_thinking",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "sports_team"
  },
  {
    "id": "q97",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You have to build a model bridge for a physics project. How do you do it?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I logically analyze the situation and take decisive action.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "creativity_innov",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "art_studio"
  },
  {
    "id": "q98",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You are asked to plan the school's annual talent show. What do you focus on?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I adapt instantly to the new rules and try a different approach.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "learning_agility",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "debate_club"
  },
  {
    "id": "q99",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You find a lost wallet with no ID but a lot of cash. What do you do?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I look for a technological workaround using modern AI algorithms.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "ai_readiness",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "coding_bootcamp"
  },
  {
    "id": "q100",
    "sectionId": "career_motivation",
    "type": "Likert",
    "text": {
      "en": "You are stranded on a deserted island with a group of people. What is your role?",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I immediately look for a software solution or start coding.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "technology",
            "weight": 2
          }
        ]
      },
      {
        "id": "B",
        "text": {
          "en": "I focus on the human impact and try to heal or support people.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "healthcare",
            "weight": 1
          }
        ]
      },
      {
        "id": "C",
        "text": {
          "en": "I sketch out artistic ideas and brainstorm creative themes.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "arts",
            "weight": 0
          }
        ]
      },
      {
        "id": "D",
        "text": {
          "en": "I calculate the costs and figure out how to make it profitable.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "business",
            "weight": -1
          }
        ]
      },
      {
        "id": "E",
        "text": {
          "en": "I debate the logic and ensure justice is served.",
          "hi": "",
          "ml": ""
        },
        "traits": [
          {
            "traitId": "law",
            "weight": -2
          }
        ]
      }
    ],
    "imageCategory": "volunteer_work"
  }
];


export const CAREER_CLUSTERS = [
  { id: 'c1', name: 'Software & Technology', description: 'Development, engineering, data science.' },
  { id: 'c2', name: 'Healthcare & Medical', description: 'Clinical, research, administration.' },
  { id: 'c3', name: 'Business & Finance', description: 'Management, analytics, investing.' },
  { id: 'c4', name: 'Arts & Design', description: 'Creative direction, UX/UI, media.' }
];

export const SCORING_RULES = {
  // Base multipliers
  multipliers: {
    SJT: 1.5,
    Likert: 1.0,
    Ipsative: 1.0
  },
  // Normalization N_t = [ (S_t - S_min) / (S_max - S_min) ] * 100
  normalize: (rawScore, min, max) => Math.max(0, Math.min(100, Math.round(((rawScore - min) / (max - min)) * 100)))
};

// 5. Archetype Engine (Boolean Qualification Logic)
export const ARCHETYPES = [
  {
    id: 'builder', name: 'The Builder',
    logic: (scores) => (scores.engineering > 70 || scores.technology > 70) && scores.problem_solving > 65 && scores.openness < 80,
    description: 'Pragmatic, hands-on individuals driven by tangible results, optimization, and structural creation.',
    strengths: ['High execution capability', 'Logical reasoning', 'High discipline'],
    weaknesses: ['May struggle in highly ambiguous or emotionally complex environments'],
    careers: ['Software Architect', 'Civil Engineer', 'Advanced Manufacturing']
  },
  {
    id: 'creator', name: 'The Creator',
    logic: (scores) => (scores.arts > 75) && scores.openness > 75 && scores.creativity_innov > 75,
    description: 'Innovative thinkers who excel in environments with high autonomy and abstract problem-solving.',
    strengths: ['Lateral thinking', 'Emotional resonance', 'Generating novel concepts'],
    weaknesses: ['Vulnerable to burnout in structured, bureaucratic roles'],
    careers: ['UX/UI Designer', 'Creative Director', 'Multimedia Producer']
  },
  {
    id: 'strategist', name: 'The Strategist',
    logic: (scores) => (scores.business > 70 || scores.law > 70) && scores.conscientiousness > 70 && scores.critical_thinking > 70,
    description: 'Systems-level thinkers excelling at managing resources, analyzing trends, and directing teams.',
    strengths: ['Organizational leadership', 'Risk calculation', 'Resilience'],
    weaknesses: ['Analysis paralysis; may struggle with rapid unstructured innovation'],
    careers: ['Management Consultant', 'Corporate Lawyer', 'Data Scientist']
  },
  {
    id: 'investigator', name: 'The Investigator',
    logic: (scores) => scores.healthcare > 70 && scores.learning_agility > 75 && scores.introversion > 60,
    description: 'Deeply analytical individuals driven by the pursuit of knowledge and empirical truth.',
    strengths: ['High focus', 'Exceptional critical thinking', 'Mastery of complex domains'],
    weaknesses: ['Isolation in team environments; high risk of academic burnout'],
    careers: ['Medical Researcher', 'Cybersecurity Analyst', 'Academic Professor']
  },
  {
    id: 'helper', name: 'The Helper',
    logic: (scores) => scores.social > 75 && scores.collaboration > 70,
    description: 'Empathetic, socially driven individuals focused on human development and community wellbeing.',
    strengths: ['High emotional intelligence', 'Conflict resolution', 'Team cohesion'],
    weaknesses: ['Compassion fatigue; struggling to assert boundaries'],
    careers: ['Clinical Psychologist', 'Educator', 'NGO Director']
  },
  {
    id: 'entrepreneur', name: 'The Entrepreneur',
    logic: (scores) => scores.entrepreneurial_potential > 75 && scores.independence > 70 && scores.initiative > 75,
    description: 'High-initiative risk-takers who identify gaps in the market and mobilize resources.',
    strengths: ['Unmatched resilience', 'Rapid learning agility', 'High autonomy'],
    weaknesses: ['Frustration with traditional schooling; clashes with authoritative structures'],
    careers: ['Startup Founder', 'Venture Capital', 'Product Management']
  }
];

// 6. Counselor Intervention Logic (Red/Yellow Flags)
export const COUNSELOR_RULES = [
  {
    id: 'rule_1',
    flag: 'Red',
    title: 'High Parental Pressure',
    condition: (scores) => scores.parent_influence > 75,
    focus: 'Explore if choices are self-directed.'
  },
  {
    id: 'rule_5',
    flag: 'Yellow',
    title: 'Pressure-Induced Paralysis',
    condition: (scores) => scores.parent_influence > 80 && scores.confusion > 70,
    focus: 'Alleviate anxiety before discussing careers.'
  },
  {
    id: 'rule_25',
    flag: 'Red',
    title: 'Digital Obsolescence Risk',
    condition: (scores) => scores.ai_readiness < 30,
    focus: 'Assign basic AI literacy exploration.'
  },
  {
    id: 'rule_30',
    flag: 'Yellow',
    title: 'The Lone Wolf',
    condition: (scores) => scores.problem_solving > 80 && scores.collaboration < 40,
    focus: 'Warn that modern technical problems require team execution.'
  }
];
