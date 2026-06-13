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
      "en": "Your school is organizing a massive health awareness week.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I volunteer to run the CPR and first-aid demonstration booth.",
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
          "en": "I paint the colorful banners and posters to promote the event.",
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
          "en": "I manage the budget and find local sponsors to fund the activities.",
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
          "en": "I ensure all physical activities comply with the school's safety regulations.",
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
          "en": "I build the physical framework for the interactive displays.",
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
      "en": "The student council wants to revamp the old, unused courtyard.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sketch a beautiful layout for a new mural and seating area.",
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
          "en": "I calculate the costs and run a fundraiser to pay for materials.",
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
          "en": "I write a proposal to the principal arguing why students deserve this space.",
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
          "en": "I design a sturdy, weather-proof bench and table system.",
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
          "en": "I survey the students to see what kind of space would make them happiest.",
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
      "en": "Your town is hosting a massive weekend flea market and you want to participate.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I set up a stall to sell my old video games and maximize my profits.",
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
          "en": "I read the market guidelines to make sure our booth meets all vendor rules.",
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
          "en": "I construct a clever folding table that is easy to transport and set up.",
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
          "en": "I spend my time chatting with other vendors and making new friends.",
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
          "en": "I focus on selling upcycled items to reduce waste.",
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
      "en": "Your science class is doing a project on the local river's water quality.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I debate the town's water policies and argue for stricter pollution controls.",
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
          "en": "I build a custom water filtration device to test on the samples.",
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
          "en": "I organize a weekend student cleanup crew for the riverbanks.",
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
          "en": "I study how the local fish and plant life are being affected.",
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
          "en": "I spend hours in the library looking up historical water data for comparison.",
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
      "en": "Your neighborhood is completely snowed in after a massive blizzard.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I rig up a makeshift snowplow using my bike and some scrap wood.",
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
          "en": "I go door-to-door to check if the elderly neighbors need anything.",
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
          "en": "I make sure the local birds and wildlife have access to food.",
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
          "en": "I look up meteorological maps to track when the storm will finally pass.",
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
          "en": "I organize a massive neighborhood snowball fight and hot cocoa party.",
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
      "en": "Your school requires everyone to complete 10 hours of community service.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I volunteer at the local youth center tutoring younger kids.",
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
          "en": "I join the tree-planting initiative at the community park.",
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
          "en": "I analyze demographic data for a local non-profit to help target campaigns.",
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
          "en": "I host a loud and lively charity auction in the school gym.",
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
          "en": "I silently organize the inventory in the back room of a food bank.",
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
      "en": "Your biology teacher assigns a massive end-of-year group presentation.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I choose to focus our topic on the effects of climate change on local bugs.",
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
          "en": "I dive deep into the academic journals to find the most accurate facts.",
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
          "en": "I volunteer to be the main speaker who presents in front of the whole class.",
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
          "en": "I handle creating the slides quietly by myself so they look perfect.",
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
          "en": "I create a strict timeline so our group doesn't leave anything to the last minute.",
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
      "en": "You are placed in a debate tournament, and your team is given a tough topic.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I dig up obscure statistics and facts to build an unbreakable argument.",
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
          "en": "I take the lead on the stage, using my charisma to sway the judges.",
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
          "en": "I sit back and write down rebuttals for my teammates to use.",
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
          "en": "I format our notes meticulously so we can find any point in seconds.",
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
          "en": "When the other team attacks our points, I stay completely calm and collected.",
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
      "en": "Your family is planning a two-week summer road trip.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I convince everyone we should stop at the busiest tourist traps and theme parks.",
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
          "en": "I pack my headphones and a good book to enjoy the quiet time in the backseat.",
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
          "en": "I map out the exact route, gas stops, and hotel reservations.",
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
          "en": "When the car gets a flat tire, I keep everyone from panicking.",
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
          "en": "I suggest we ditch the plan and explore a weird, unknown roadside attraction.",
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
      "en": "You're trying to build a complicated 1000-piece puzzle but a piece seems to be missing.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sit alone in my room for hours, hyper-focused on scanning every piece.",
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
          "en": "I sort all the pieces by color and edge type into neat little piles.",
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
          "en": "I don't get frustrated; I just calmly keep working on the rest of the puzzle.",
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
          "en": "I decide to paint a tiny piece of cardboard to match the missing spot.",
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
          "en": "I deduce exactly what shape and color the missing piece must be based on the gap.",
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
      "en": "Your group is locked in an escape room with only 10 minutes left.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I systematically check every drawer and corner we might have missed.",
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
          "en": "I tell everyone to take a deep breath and stop yelling.",
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
          "en": "I try completely ridiculous ideas, like reading the clues backward.",
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
          "en": "I crack the math code on the final padlock by finding the pattern.",
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
          "en": "I coordinate everyone so we are all searching different parts of the room.",
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
      "en": "During a school play, the main prop breaks right before the curtain opens.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I calm down the panicking lead actor and tell them it will be fine.",
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
          "en": "I suggest we completely change the scene to make the broken prop part of the joke.",
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
          "en": "I quickly duct-tape and wire the prop back together so it holds up.",
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
          "en": "I grab three stagehands and we work together to swap it for a backup.",
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
          "en": "I analyze which scenes need the prop and figure out if we can just skip it.",
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
      "en": "Your teacher asks you to submit a final project in any format you want.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I decide to do an interpretive dance instead of a standard essay.",
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
          "en": "I build a functional mechanical model to demonstrate the concepts.",
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
          "en": "I team up with two classmates to make a comprehensive documentary.",
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
          "en": "I write an essay that challenges the core assumptions of the textbook.",
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
          "en": "I design an original board game that teaches the subject to players.",
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
      "en": "Your school's WiFi goes down right when you have an online assignment due.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I figure out how to tether my phone's data to my laptop to get it submitted.",
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
          "en": "I text my classmates to see who has a connection and if we can share a hotspot.",
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
          "en": "I realize the due date will likely be extended and prioritize offline studying instead.",
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
          "en": "I draw my assignment by hand and take a photo to submit later.",
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
          "en": "I quickly learn how to use a new offline app to finish the work.",
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
      "en": "You want to start a podcast about high school life with your friends.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make sure everyone gets equal talking time and we brainstorm topics together.",
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
          "en": "I listen to our test recordings and analyze what makes them engaging or boring.",
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
          "en": "I come up with a highly unique theme and catchy name for our show.",
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
          "en": "I watch a few tutorials and immediately figure out how to mix the audio.",
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
          "en": "I use an AI tool to clean up our background noise and generate show notes.",
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
      "en": "You're tasked with organizing the school's talent show.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I review past shows to figure out why some acts dragged and fix the schedule.",
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
          "en": "I come up with a spectacular new lighting concept for the stage.",
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
          "en": "I quickly master the school's old soundboard after playing with it for an hour.",
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
          "en": "I use an AI scheduling assistant to coordinate 30 different student acts.",
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
          "en": "I set up a multi-camera livestream so parents can watch from home.",
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
      "en": "You notice a lot of students are completely stressed out during exam week.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design a 'smash room' with bubble wrap for students to relieve stress.",
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
          "en": "I rapidly read up on stress-relief techniques and share the best ones.",
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
          "en": "I build an AI chatbot that sends encouraging messages and study reminders.",
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
          "en": "I code an app that tracks sleep and study hours to prevent burnout.",
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
          "en": "I organize a healthy snack station and a meditation circle in the library.",
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
      "en": "You want to learn how to make your own video game.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I jump straight into a new coding language and pick it up as I go.",
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
          "en": "I use AI image generators to quickly create the background assets.",
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
          "en": "I focus on the core programming logic and debugging the game engine.",
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
          "en": "I design a game that encourages players to exercise and eat well.",
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
          "en": "I spend most of my time drawing the character sprites and composing the music.",
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
      "en": "Your friend wants to start a YouTube channel about fitness and nutrition.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use AI to write SEO-optimized video titles and descriptions.",
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
          "en": "I handle the camera equipment, lighting, and video editing software.",
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
          "en": "I help them research accurate nutritional information for the videos.",
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
          "en": "I design the thumbnails and create the channel's visual branding.",
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
          "en": "I figure out how to monetize the channel and get local gym sponsorships.",
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
      "en": "The school cafeteria is trying to improve its daily lunch menu.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I create a digital voting system where students can rate the meals.",
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
          "en": "I advocate for more fresh vegetables and balanced macros.",
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
          "en": "I make the cafeteria look more inviting with new signs and menu boards.",
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
          "en": "I calculate how to offer better food without raising the lunch prices.",
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
          "en": "I check the state nutritional guidelines to ensure our new menu is compliant.",
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
      "en": "Your school is hosting a massive track and field sports day.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I volunteer at the injury tent, handing out ice packs and bandages.",
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
          "en": "I design the logos and paint the faces of everyone on my team.",
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
          "en": "I run the snack stand and maximize our profits for the sports club.",
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
          "en": "I act as a referee to ensure no one is breaking the tournament rules.",
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
          "en": "I fix the broken hurdles and measure the long jump sandpit accurately.",
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
      "en": "The school library is undergoing a complete makeover.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I arrange the reading nooks with aesthetically pleasing colors and lighting.",
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
          "en": "I organize a used book sale to help buy new comfy chairs.",
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
          "en": "I draft a new set of rules regarding noise levels and computer usage.",
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
          "en": "I assemble the new heavy-duty metal bookshelves.",
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
          "en": "I set up a peer reading group to help freshmen find good books.",
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
      "en": "Your class is organizing a bake sale for a local charity.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I set the prices and track every single dollar we make.",
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
          "en": "I write down all the allergy warnings so we don't violate food safety rules.",
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
          "en": "I build a tiered wooden display stand to show off the cupcakes.",
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
          "en": "I stand at the front, loudly greeting everyone who walks by.",
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
          "en": "I make sure we have plenty of vegan and ethically sourced options.",
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
      "en": "You are participating in the regional science fair.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I check the patent databases to make sure my idea hasn't been done.",
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
          "en": "I construct a working robotic arm out of spare parts.",
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
          "en": "I cheer on my classmates and help them practice their speeches.",
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
          "en": "I present a project on reducing microplastics in the ocean.",
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
          "en": "I collect hundreds of data points and organize them into clear tables.",
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
      "en": "Your community center received a donation of broken bicycles.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I weld the cracked frames and tighten the loose chains.",
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
          "en": "I teach the younger kids how to ride the bikes once they are fixed.",
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
          "en": "I recycle the ruined tires and rubber grips properly.",
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
          "en": "I read the original manufacturer manuals to find the exact specs.",
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
          "en": "I organize a massive group bike ride through town to celebrate.",
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
      "en": "You volunteer at the local animal shelter on weekends.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I spend my time talking to visitors and helping them find the right pet.",
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
          "en": "I clean the outdoor pens and plant dog-friendly grass in the yard.",
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
          "en": "I track the adoption rates and figure out which breeds are most popular.",
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
          "en": "I hype up the crowd at the shelter's public adoption events.",
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
          "en": "I sit quietly in the back room rehabilitating the shy, scared cats.",
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
      "en": "Your scout troop goes on a weekend camping trip.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make sure we follow 'leave no trace' principles and clean up the site.",
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
          "en": "I use a guidebook to identify the different plants and tracks we see.",
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
          "en": "I tell loud ghost stories around the campfire to entertain everyone.",
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
          "en": "I wake up early to enjoy the quiet sunrise completely by myself.",
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
          "en": "I double-check everyone's packing list so we don't forget the tent pegs.",
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
      "en": "Your math team makes it to the state finals.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I study advanced college-level theorems to prepare for the hardest questions.",
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
          "en": "I lead the team cheer and high-five everyone before the test starts.",
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
          "en": "I sit in the corner with my headphones on, running practice drills alone.",
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
          "en": "I meticulously check my work line by line to avoid silly errors.",
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
          "en": "When we miss a question, I don't get upset; I just focus on the next one.",
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
      "en": "You and your friends go to a loud, chaotic music festival.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I push my way to the front row and dance wildly in the crowd.",
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
          "en": "I wear earplugs and stay near the back so I don't get overwhelmed.",
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
          "en": "I create a detailed schedule so we see all our favorite bands on time.",
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
          "en": "When it starts pouring rain, I shrug it off and keep having fun.",
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
          "en": "I ditch the main stage to find a weird, obscure indie band playing in a tent.",
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
      "en": "You get lost in the woods while hiking with your family.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I stop talking to focus entirely on listening for highway sounds.",
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
          "en": "I pull out the compass and strictly follow a straight path north.",
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
          "en": "I stay totally calm and prevent my younger siblings from panicking.",
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
          "en": "I suggest we try climbing a strange rock formation to get a better view.",
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
          "en": "I triangulate our position using the sun and the shadows.",
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
      "en": "You and your friends are cooking a fancy dinner for your parents.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I strictly follow the recipe measurements down to the gram.",
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
          "en": "When the smoke alarm goes off, I calmly turn on the fan and open a window.",
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
          "en": "I throw in some unusual spices just to see how it alters the flavor.",
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
          "en": "The sauce is too salty, so I figure out how to balance it with lemon and sugar.",
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
          "en": "I delegate chopping, stirring, and setting the table so we finish together.",
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
      "en": "You host a movie night, but the power suddenly goes out.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I tell everyone to relax and not worry while we wait it out.",
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
          "en": "I suggest we make shadow puppets on the wall with our flashlights.",
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
          "en": "I go check the breaker box to see if I can restore the power safely.",
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
          "en": "I get everyone to pitch in and clean up the snacks in the dark.",
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
          "en": "I analyze the grid map on my phone to predict when the blackout will end.",
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
      "en": "You are redesigning your bedroom to make it cooler.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I paint my ceiling black and cover it with glow-in-the-dark stars.",
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
          "en": "I build a custom shelf that perfectly fits the awkward corner.",
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
          "en": "I ask my siblings to help me move the heavy bed and dresser.",
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
          "en": "I measure the space and determine which layout maximizes walking room.",
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
          "en": "I make a unique lamp out of an old skateboard and some string lights.",
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
      "en": "Your neighbor's dog goes missing, and everyone is trying to find it.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I figure out the places the dog usually hides and check there first.",
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
          "en": "I form a search party and assign everyone a specific street to check.",
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
          "en": "I realize searching randomly won't work and create a grid map instead.",
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
          "en": "I use a recording of the owner's voice playing from a drone to lure him.",
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
          "en": "I quickly read up on animal tracking techniques to look for paw prints.",
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
      "en": "You join the school's coding and app development club.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I do pair programming, working closely with a partner on the same code.",
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
          "en": "I review other people's code to find logical errors and bugs.",
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
          "en": "I pitch a completely wild idea for an app that gamifies homework.",
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
          "en": "I learn a completely new database language in just a weekend.",
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
          "en": "I use an AI assistant to autocompleting my boilerplate code faster.",
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
      "en": "You are on the editorial team for the school newspaper.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I fact-check every article to make sure the arguments actually make sense.",
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
          "en": "I come up with a completely new layout design that looks like a magazine.",
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
          "en": "I quickly figure out how to use the complex publishing software.",
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
          "en": "I run the articles through an AI tool to check for tone and clarity.",
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
          "en": "I manage the newspaper's website and fix the broken image links.",
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
      "en": "Your school is launching an anti-bullying campaign.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I direct an emotional, creative skit to be performed at the assembly.",
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
          "en": "I take a quick course on peer mediation and start applying the techniques.",
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
          "en": "I use AI sentiment analysis on school forums to spot toxic trends.",
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
          "en": "I code an anonymous reporting app for students to use safely.",
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
          "en": "I bring in therapy dogs to comfort students who have been bullied.",
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
      "en": "You are part of the school's drama production.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I memorize all my lines and blocking in record time.",
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
          "en": "I use an AI prompt to generate extra dialogue for the background characters.",
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
          "en": "I program the complicated lighting rig to sync perfectly with the music.",
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
          "en": "I remind the cast to drink tea and do vocal warm-ups to protect their throats.",
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
          "en": "I spend hours painting the intricate backdrops for the castle scene.",
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
      "en": "You and your friends start a tech entrepreneurship club.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use AI to generate a business plan and market analysis in minutes.",
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
          "en": "I set up the club's servers and build our actual prototype website.",
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
          "en": "I make sure we have ergonomic chairs to prevent back pain during hackathons.",
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
          "en": "I design a slick, professional logo for our startup.",
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
          "en": "I prepare the pitch deck to secure funding from local businesses.",
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
      "en": "Your school's e-sports team is preparing for a major tournament.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I optimize our PCs and test the ping to ensure we have zero lag.",
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
          "en": "I lead the team in wrist stretches to prevent carpal tunnel syndrome.",
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
          "en": "I create the animated overlays for our Twitch stream.",
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
          "en": "I secure sponsorships with gaming gear companies to pay for our entry fees.",
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
          "en": "I read the tournament rulebook carefully to make sure we don't get disqualified.",
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
      "en": "You are starting a First Responder and First Aid club at school.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I demonstrate how to use a defibrillator and do chest compressions.",
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
          "en": "I use makeup to create realistic fake wounds for our practice drills.",
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
          "en": "I collect the club dues to buy more bandages and medical supplies.",
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
          "en": "I draft the liability waiver forms that members have to sign.",
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
          "en": "I build a custom splinting device out of 3D-printed plastic.",
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
      "en": "You are working on the senior yearbook committee.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design the front cover and pick the aesthetic theme for the pages.",
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
          "en": "I sell ad space to local restaurants to lower the cost of the yearbook.",
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
          "en": "I review the senior quotes to ensure none violate the school's code of conduct.",
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
          "en": "I fix the broken binding machine we use to assemble the drafts.",
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
          "en": "I interview the shy students to make sure everyone gets featured.",
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
      "en": "You are helping run a pop-up thrift store in the gymnasium.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I decide the pricing tiers and manage the cash box.",
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
          "en": "I make sure we charge the correct sales tax according to local laws.",
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
          "en": "I assemble the heavy metal clothing racks so they don't tip over.",
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
          "en": "I act as a personal shopper, helping students pick out cool outfits.",
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
          "en": "I only accept donations of eco-friendly and biodegradable fabrics.",
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
      "en": "Your class is doing a mock trial about a factory polluting a town.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I play the lead attorney and cross-examine the witnesses aggressively.",
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
          "en": "I build a scale model of the factory to use as physical evidence.",
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
          "en": "I work with my team to make sure everyone feels heard during deliberations.",
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
          "en": "I focus my arguments on the severe damage done to the local ecosystem.",
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
          "en": "I read past Supreme Court cases to find precedents for our argument.",
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
      "en": "Your school's robotics team is building a battle bot.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I solder the wires and assemble the bot's titanium armor.",
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
          "en": "I host team dinners to make sure everyone bonds and gets along.",
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
          "en": "I scavenge old electronics from the dump to reuse their motors.",
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
          "en": "I analyze the designs of past champions to see what weapons work best.",
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
          "en": "I get on the microphone and hype up the crowd before our match.",
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
      "en": "You go on a summer volunteer trip to a remote village.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I spend all day playing soccer and games with the local kids.",
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
          "en": "I help plant drought-resistant crops in the community garden.",
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
          "en": "I interview the elders to document the village's oral history.",
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
          "en": "I perform a song at the massive town festival.",
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
          "en": "I spend my evenings quietly journaling and reflecting by myself.",
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
      "en": "You organize a massive beach cleanup on Saturday morning.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I focus on safely separating the microplastics from the seaweed.",
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
          "en": "I check the tide charts to determine the absolute safest time to clean.",
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
          "en": "I run around with a megaphone directing the large crowds of volunteers.",
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
          "en": "I walk far down the shoreline so I can pick up trash completely alone.",
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
          "en": "I bring a meticulous checklist and sorting bags for different types of waste.",
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
      "en": "You are competing in the regional chess club championship.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I study hundreds of grandmaster games to memorize opening theory.",
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
          "en": "I confidently walk around the hall chatting and psyching out opponents.",
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
          "en": "I wear noise-canceling headphones to block everyone out during my match.",
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
          "en": "I carefully write down every single move in my notebook without failing.",
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
          "en": "When I make a huge blunder, I don't panic; I just keep playing my best.",
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
      "en": "You go to a massive, crowded theme park for a friend's birthday.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I scream and throw my hands up in the very front row of the roller coaster.",
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
          "en": "I avoid the crowds by riding the slow, quiet observation wheel.",
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
          "en": "I plan out our fast-passes so we never waste time walking back and forth.",
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
          "en": "When the ride breaks down while we are on it, I just relax and wait.",
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
          "en": "I drag everyone to a weird, neon-lit 4D experience nobody has heard of.",
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
      "en": "You are accidentally locked out of your house without your keys.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sit quietly on the porch reading a book on my phone until someone gets home.",
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
          "en": "I meticulously retrace my steps to see if I dropped the keys in the grass.",
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
          "en": "I don't freak out or get angry; I just accept the situation.",
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
          "en": "I try getting in through the dog door or climbing a tree to a balcony.",
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
          "en": "I figure out how to pop the garage door latch using a wire hanger.",
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
      "en": "You are organizing a massive surprise birthday party for your best friend.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I meticulously hide the gifts and keep track of the RSVPs.",
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
          "en": "When they almost find out early, I stay completely calm and divert their attention.",
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
          "en": "I throw out the standard party idea and suggest an alien-invasion theme.",
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
          "en": "I figure out how to fix the broken speaker system just before they arrive.",
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
          "en": "I make sure everyone has a specific task so we all work together seamlessly.",
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
      "en": "A fire drill goes off right in the middle of a very important final exam.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I calmly put down my pencil and tell others not to panic.",
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
          "en": "I actually enjoy the random disruption and treat it like a fun break.",
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
          "en": "I quickly grab a paperweight to keep our exams from blowing away.",
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
          "en": "I help the teacher make sure the entire class stays together in line.",
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
          "en": "I analyze the situation to determine if the test will likely be voided.",
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
      "en": "You enter a school photography contest with a vague theme.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I take pictures from completely weird, upside-down angles just to be different.",
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
          "en": "I build a custom tripod rig out of PVC pipes to get the perfect shot.",
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
          "en": "I share my expensive camera lenses with other students who need them.",
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
          "en": "I critique the lighting in my photos and adjust the exposure settings logically.",
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
          "en": "I invent a completely new editing style that makes the photos look like paintings.",
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
      "en": "Your bike tire pops halfway to school and you are running late.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I temporarily fix the inner tube using some duct tape from my backpack.",
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
          "en": "I text a friend who drives to school and ask them to pick me up.",
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
          "en": "I realize I can't make it to first period, so I email my teacher immediately.",
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
          "en": "I ditch the bike at a shop and use my skateboard for the rest of the way.",
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
          "en": "I quickly look up a video and learn how to patch a tire in two minutes.",
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
      "en": "Your history teacher assigns a group project to make an educational TikTok.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I choreograph a dance that gets all group members involved.",
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
          "en": "I analyze the TikTok algorithm to figure out what hooks will get the most views.",
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
          "en": "I design a hilarious historical costume out of cardboard and aluminum foil.",
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
          "en": "I pick up the complex video editing software incredibly fast.",
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
          "en": "I use an AI voice generator to narrate the script perfectly.",
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
      "en": "You are designing a custom organizer for your messy school locker.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I analyze the flaws in standard lockers and figure out why they waste space.",
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
          "en": "I invent a fold-out desk that pops out when the door opens.",
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
          "en": "I rapidly build and test multiple cardboard prototypes until one works.",
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
          "en": "I ask an AI to calculate the optimal shelf dimensions based on standard textbooks.",
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
          "en": "I use a CAD program to 3D print the exact pieces I need.",
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
      "en": "Your best friend breaks their dominant arm and needs help at school.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I invent a clever shoulder-strap system to carry both our backpacks.",
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
          "en": "I learn how to write legibly with my non-dominant hand just to show them how.",
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
          "en": "I set up an AI speech-to-text program on their laptop so they can 'type' essays.",
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
          "en": "I reconfigure their keyboard settings for one-handed accessibility.",
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
          "en": "I make sure they are eating calcium-rich foods to help their bone heal faster.",
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
      "en": "You decide to make an indie film with your friends over the summer.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I learn the basics of cinematography and color grading over a single weekend.",
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
          "en": "I use AI tools to generate crazy sci-fi backgrounds we can't afford to film.",
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
          "en": "I manage the camera equipment, microphones, and the massive video files.",
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
          "en": "I ensure all our action scenes and stunts have proper safety pads.",
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
          "en": "I spend hours directing the actors to get the perfect emotional performance.",
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
      "en": "You start a sneaker resale side hustle to make some extra cash.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use AI models to predict which sneaker drops will skyrocket in value.",
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
          "en": "I write scripts and use bots to automate the checkout process.",
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
          "en": "I carefully clean and restore old shoes using special chemicals.",
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
          "en": "I take highly aesthetic, stylized photos of the shoes for my Instagram page.",
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
          "en": "I track every purchase, sale, and shipping cost in a detailed spreadsheet.",
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
      "en": "Your smartphone screen shatters and you decide to fix it yourself.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I follow a teardown video to disconnect the tiny ribbon cables.",
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
          "en": "I make sure no tiny glass shards cut my fingers during the repair.",
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
          "en": "I buy a customized, hand-painted replacement back glass just for fun.",
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
          "en": "I find the cheapest wholesale supplier for screens to save money.",
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
          "en": "I read the warranty terms carefully to see if opening the phone voids it.",
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
      "en": "You volunteer to help run a massive city marathon.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I stand at the medical tent handing out water and checking for dehydration.",
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
          "en": "I paint cool face designs and numbers on the runners before the race.",
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
          "en": "I manage the merchandise booth, selling t-shirts to the spectators.",
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
          "en": "I verify that the running route has all the required city permits.",
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
          "en": "I help construct the massive scaffolding for the finish line.",
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
      "en": "Your art club takes a field trip to an impressive modern museum.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sit quietly in front of the statues and try to sketch them accurately.",
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
          "en": "I go to the gift shop and calculate what I can buy with my ten dollars.",
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
          "en": "I make sure everyone follows the strict 'no flash photography' rules.",
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
          "en": "I fix a wobbly display stand that was about to fall over.",
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
          "en": "I talk to the tour guide, asking them lots of questions about their job.",
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
      "en": "You are put in charge of the school's student supply store.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I run sales promotions to get rid of the old pencil inventory.",
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
          "en": "I check the tax regulations on selling snacks on school property.",
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
          "en": "I build new, sturdy display racks out of spare lumber.",
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
          "en": "I eagerly greet the freshmen and help them find their classes.",
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
          "en": "I replace all our plastic products with eco-friendly, recycled alternatives.",
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
      "en": "You join the school's Model United Nations conference.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I aggressively debate international treaties and international law.",
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
          "en": "I run the microphone and timer system to keep the speeches on track.",
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
          "en": "I pass notes and form alliances with other delegates during breaks.",
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
          "en": "I sponsor a resolution focused entirely on global carbon emissions.",
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
          "en": "I read hundreds of pages of background guides on the countries.",
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
      "en": "You decide to build a treehouse in your backyard.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I hammer the nails and construct the wooden frame myself.",
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
          "en": "I invite all my friends over to hang out in it once it's built.",
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
          "en": "I make sure to use reclaimed wood so I don't harm new trees.",
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
          "en": "I calculate the load-bearing capacity of the main branches.",
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
          "en": "I shout to all the neighbors and throw a massive treehouse party.",
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
      "en": "You organize a weekend cleanup event at the local state park.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I hand out trash bags and make sure every volunteer feels welcome.",
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
          "en": "I focus on planting new native flowers near the park entrance.",
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
          "en": "I track the types of litter we find to report to the city council.",
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
          "en": "I stand on a bench and give a loud, motivating speech to the crowd.",
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
          "en": "I put my headphones on and quietly pick up trash deep in the woods alone.",
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
      "en": "Your science lab group has to dissect a frog.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make sure all biological waste is disposed of in the eco-friendly bin.",
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
          "en": "I read the textbook manual ahead of time so I know the anatomy.",
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
          "en": "I take charge and enthusiastically lead the dissection for the squeamish kids.",
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
          "en": "I prefer to do the cutting quietly and carefully without making jokes.",
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
          "en": "I meticulously clean and organize the scalpels and trays afterward.",
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
      "en": "You are writing a massive 20-page research paper for history class.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I dive into primary source documents and ancient books to find evidence.",
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
          "en": "I do a highly animated oral presentation of my findings to the class.",
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
          "en": "I lock myself in my room for three days to write in absolute silence.",
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
          "en": "I format every single citation flawlessly according to the rubric.",
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
          "en": "When I get a bad grade on the draft, I just sigh and start rewriting calmly.",
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
      "en": "You go to a massive, incredibly crowded mall on Black Friday.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I thrive in the chaos and loudly bargain with the kiosk vendors.",
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
          "en": "I retreat to the quietest corner of the bookstore to escape the noise.",
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
          "en": "I bring a map and strike off every store we need to visit in order.",
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
          "en": "I don't get annoyed by the long lines; I just patiently wait my turn.",
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
          "en": "I decide to try a completely strange new food from the food court.",
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
      "en": "You are playing a notoriously difficult, frustrating video game.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I turn off the multiplayer chat so I can focus on the single-player mode.",
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
          "en": "I carefully manage my inventory and organize my potions by color.",
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
          "en": "When I lose to the boss 50 times, I don't rage-quit, I just try again.",
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
          "en": "I equip completely random, bizarre armor just to see what happens.",
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
          "en": "I memorize the boss's attack patterns and calculate the exact dodge timing.",
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
      "en": "You are putting together a 5,000 piece model kit with friends.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sort all the tiny plastic pieces into numbered bags before we start.",
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
          "en": "When someone accidentally steps on a piece, I tell them it's not a big deal.",
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
          "en": "I suggest we build the spaceship backward just for a challenge.",
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
          "en": "I figure out how to substitute a lost gear with a spare part from another set.",
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
          "en": "I pass pieces to the builder and read the instructions out loud.",
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
      "en": "A massive thunderstorm knocks out your home's internet for the night.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I relax and enjoy the break from social media without complaining.",
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
          "en": "I dig out a strange, dusty board game my family has never played before.",
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
          "en": "I reset the router and check the IP settings to see if it's a local issue.",
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
          "en": "I gather my siblings in the living room for a game of charades.",
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
          "en": "I check the cellular outage map to determine if the whole grid is down.",
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
      "en": "You are making a custom Halloween costume for a huge party.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I come up with a highly abstract, conceptual costume idea.",
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
          "en": "I figure out how to wire battery-powered LEDs into the fabric safely.",
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
          "en": "I coordinate with three friends so we can go as a matching group.",
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
          "en": "I analyze the weather forecast to decide if the costume needs a coat.",
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
          "en": "I sculpt a completely original monster mask out of foam and clay.",
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
      "en": "You completely forget your lunch at home and have no money.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I figure out a clever way to trade a pencil for an apple.",
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
          "en": "I tell my friends, knowing they will all pitch in and share their snacks.",
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
          "en": "I realize missing one meal won't hurt me and just drink water instead.",
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
          "en": "I make a bizarre 'soup' out of free ketchup packets and crackers.",
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
          "en": "I learn the cafeteria's policy on free emergency lunch vouchers.",
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
      "en": "Your class is planning a harmless but legendary senior prank.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I coordinate the group chat so nobody accidentally leaks the plan.",
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
          "en": "I analyze the school's camera blind spots to find the safest route.",
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
          "en": "I come up with the hilarious idea to cover the hallways in sticky notes.",
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
          "en": "I quickly learn how to pick the cheap padlock on the gym doors.",
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
          "en": "I use an AI voice tool to leave a fake voicemail from the principal.",
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
      "en": "You are upgrading an old PC to make it run games faster.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I benchmark the system to see if the CPU or GPU is the bottleneck.",
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
          "en": "I design a really cool custom water-cooling loop with neon lights.",
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
          "en": "I read the motherboard manual and figure out the front panel pins fast.",
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
          "en": "I use an AI utility program to safely auto-overclock the processor.",
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
          "en": "I carefully apply the thermal paste and slot the new RAM sticks.",
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
      "en": "A friend has a sudden panic attack in the middle of the hallway.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I invent a silly distraction game to help ground them in reality.",
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
          "en": "I rapidly recall the grounding techniques I read about in health class.",
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
          "en": "I load up an AI-guided breathing exercise on my phone for them to follow.",
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
          "en": "I text the school counselor on their secure messaging portal.",
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
          "en": "I get them a cup of water and monitor their heart rate.",
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
      "en": "You and your friends decide to start a rock band in a garage.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I learn how to play the bass guitar from scratch in two weeks.",
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
          "en": "I generate cool synth backing tracks using an AI music generator.",
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
          "en": "I set up the amplifiers, pedals, and PA system so we don't blow a fuse.",
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
          "en": "I make everyone wear earplugs so we don't get hearing damage.",
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
          "en": "I draw the edgy skull artwork for our band's first album cover.",
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
      "en": "You run a highly popular meme page for your high school.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use an AI bot to generate hilarious captions based on school news.",
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
          "en": "I write a script that automatically posts at the highest traffic times.",
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
          "en": "I post memes about getting enough sleep and staying hydrated.",
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
          "en": "I hand-draw funny caricatures of the teachers to use as templates.",
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
          "en": "I sell sponsored shoutouts to local pizza places to make money.",
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
      "en": "You buy a cheap smart-home hub to control your bedroom lights.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I splice the power wires and solder the LED strips myself.",
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
          "en": "I set the lights to a warm tone that helps reduce eye strain at night.",
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
          "en": "I program the lights to sync perfectly with the colors in my favorite movies.",
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
          "en": "I track the wattage to see how much money the LEDs save on the electric bill.",
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
          "en": "I read the privacy policy to make sure the microphone isn't recording me.",
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
      "en": "You are the manager for the school's basketball team.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I tape up the players' ankles and keep the ice baths ready.",
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
          "en": "I design the cool warmup shirts that the players wear.",
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
          "en": "I organize the concession stand to maximize profits for new uniforms.",
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
          "en": "I check the league rulebook to ensure all players are academically eligible.",
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
          "en": "I fix the broken digital scoreboard buzzer with a soldering iron.",
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
      "en": "Your class gets permission to renovate the dusty senior lounge.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I pick out the paint swatches and design a relaxing color scheme.",
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
          "en": "I negotiate discounts with local furniture stores to stay under budget.",
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
          "en": "I check the school fire codes to ensure our couches are compliant.",
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
          "en": "I assemble the heavy coffee tables and mount the TV to the wall.",
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
          "en": "I ask everyone for input to ensure the room feels welcoming to all cliques.",
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
      "en": "You host a weekend car wash to raise money for the band.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I hold the cash box and quickly calculate change for the drivers.",
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
          "en": "I make sure our signs don't violate the city's advertising ordinances.",
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
          "en": "I fix the leaky power washer pump using a spare rubber gasket.",
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
          "en": "I joke around with the drivers and keep the volunteers energized.",
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
          "en": "I ensure we only use biodegradable soap that won't harm the drains.",
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
      "en": "You join the school's highly competitive debate club.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I practice arguing both sides of a complex legal case.",
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
          "en": "I help build the wooden podiums we use during our home tournaments.",
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
          "en": "I comfort the younger members who are nervous before their speeches.",
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
          "en": "I focus my arguments entirely on renewable energy legislation.",
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
          "en": "I dig through library archives to find statistics that crush the opponent.",
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
      "en": "You are helping a close friend move into a new house.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I take apart the bunk beds and reassemble them in the new room perfectly.",
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
          "en": "I keep everyone laughing and pass out drinks to keep morale high.",
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
          "en": "I make sure all the cardboard boxes are broken down and recycled properly.",
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
          "en": "I study the floor plans to figure out the best way to pivot the couch.",
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
          "en": "I blast music and turn the unpacking process into a massive dance party.",
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
      "en": "You get a summer job as a counselor at a sleepaway camp.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sit with the homesick kids and listen to their problems patiently.",
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
          "en": "I lead the nature walks and teach the kids not to step on the saplings.",
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
          "en": "I read books on child psychology to handle camper conflicts better.",
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
          "en": "I stand on the dining hall tables and lead the loudest camp chants.",
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
          "en": "I sweep the cabins by myself while the others are at the noisy bonfire.",
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
      "en": "Your school allows you to build a community garden on an empty lot.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I select native plants that require less water to help the local ecosystem.",
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
          "en": "I test the soil's pH levels and research which vegetables will grow best.",
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
          "en": "I enthusiastically give garden tours to the elementary school kids.",
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
          "en": "I spend hours quietly pulling weeds by myself on Sunday mornings.",
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
          "en": "I create a strict daily watering schedule and check it off religiously.",
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
      "en": "You are preparing for the hardest standardized test of the year.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I dig up ten years of past exams to analyze the question patterns.",
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
          "en": "I host a huge study group where I hype everyone up before the test.",
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
          "en": "I put my phone on airplane mode and study completely alone in a quiet room.",
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
          "en": "I use a stopwatch to time my practice sections down to the second.",
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
          "en": "When I see a question I don't know, I don't panic; I just guess and move on.",
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
      "en": "Your family goes on a huge, crowded cruise ship for vacation.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I sign up for the karaoke contest and sing in front of hundreds of strangers.",
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
          "en": "I find a secluded deck chair and read my book away from the pool noise.",
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
          "en": "I pack my suitcase perfectly so all my outfits are organized by day.",
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
          "en": "When the ship hits rough waters, I stay totally relaxed and ignore it.",
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
          "en": "I ignore the burgers and head straight for the weirdest exotic food buffet.",
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
      "en": "You decide to completely reorganize your incredibly messy closet.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I lock my door so nobody bothers me while I sort through my stuff.",
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
          "en": "I fold every single shirt perfectly and arrange them by color.",
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
          "en": "When the clothes pile falls over, I don't get mad, I just restart.",
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
          "en": "I keep some really weird, outdated clothes just because they look cool.",
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
          "en": "I figure out a clever way to fit two rows of shoes in a tiny space.",
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
      "en": "You and your friends are planning a trip to a nearby city.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I make a detailed itinerary with exact train departure times.",
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
          "en": "When we miss the bus, I calm everyone down and say we'll catch the next one.",
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
          "en": "I convince everyone to visit a bizarre, underground modern art exhibit.",
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
          "en": "I figure out how to navigate the complicated subway map to save money.",
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
          "en": "I use an app to easily split the hotel and food costs evenly among us.",
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
      "en": "You get lost while walking around a busy downtown area.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I don't freak out; I just enjoy the scenery until I figure it out.",
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
          "en": "I decide to just hop on a random bus and see where it takes me.",
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
          "en": "I deduce which way is north based on the sun and the street numbers.",
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
          "en": "I flag down a group of locals and ask them nicely for directions.",
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
          "en": "I analyze the city grid map on the bus stop to find the quickest route back.",
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
      "en": "You enter a school baking competition with a strict time limit.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I invent a crazy jalapeño-chocolate cupcake flavor to stand out.",
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
          "en": "When my cake burns, I scrape the edges and turn it into cake pops.",
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
          "en": "I partner with a friend so one mixes while the other handles the oven.",
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
          "en": "I calculate the exact baking times to ensure I don't run out of time.",
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
          "en": "I sculpt an incredibly detailed, artistic fondant dragon for the cake.",
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
      "en": "Your phone dies right before the concert starts and you lose your friends.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I find a security guard and logically explain where I saw them last.",
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
          "en": "I borrow a stranger's phone to quickly log into my social media and DM them.",
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
          "en": "I realize finding them in the dark is unlikely and just head to our agreed spot.",
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
          "en": "I buy a glowing marker and write my friend's name huge on my shirt.",
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
          "en": "I recall their phone number from memory, even though I usually rely on contacts.",
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
      "en": "You are creating a comprehensive study guide for midterms.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I share a Google Doc and assign different chapters to my classmates.",
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
          "en": "I analyze the syllabus to predict exactly which topics the teacher will test.",
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
          "en": "I draw a massive, colorful mind map to connect all the historical events.",
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
          "en": "I learn complex markdown formatting to make the document easily searchable.",
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
          "en": "I use an AI summarizer to condense a 50-page chapter into bullet points.",
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
      "en": "You find a broken remote-control car at a garage sale.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I reverse-engineer the steering mechanism to find the jammed gear.",
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
          "en": "I strip the plastic shell and paint it to look like a post-apocalyptic buggy.",
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
          "en": "I watch a tutorial and successfully solder the tiny broken wires back together.",
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
          "en": "I ask an AI chatbot for troubleshooting steps for this specific RC model.",
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
          "en": "I swap out the broken motor with a stronger one from an old drill.",
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
      "en": "You are brainstorming ideas for a new student fitness app.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I design a weird feature that makes users run away from virtual zombies.",
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
          "en": "I quickly learn how to use a drag-and-drop app builder to make a prototype.",
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
          "en": "I integrate an AI that generates a custom workout plan based on user goals.",
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
          "en": "I code the GPS tracking API so the app accurately measures running distance.",
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
          "en": "I ensure the app includes warm-up stretches to prevent muscle injuries.",
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
      "en": "Your friend asks you to direct a music video for their song.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I quickly master the drone camera controls after just a few practice flights.",
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
          "en": "I use an AI tool to lip-sync and auto-cut the video to the beat.",
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
          "en": "I adjust the camera's ISO and shutter speed to shoot in low light.",
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
          "en": "I make sure everyone stays hydrated and takes breaks during the long shoot.",
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
          "en": "I sketch out a detailed storyboard visualizing the exact cinematic shots.",
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
      "en": "You decide to start a neighborhood dog walking business.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I use an AI assistant to auto-reply to clients and manage my calendar.",
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
          "en": "I set up a secure payment portal and GPS tracking app for the owners.",
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
          "en": "I learn how to safely administer tick medication and handle dog injuries.",
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
          "en": "I draw a cute, recognizable logo of a paw print for my business cards.",
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
          "en": "I analyze the local market to set competitive, profitable walking rates.",
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
      "en": "You accidentally crash your expensive camera drone into a tree.",
      "hi": "",
      "ml": ""
    },
    "options": [
      {
        "id": "A",
        "text": {
          "en": "I re-solder the broken circuit board and recalibrate the gyroscopes.",
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
          "en": "I wear safety goggles and heavy gloves when handling the shattered propellers.",
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
          "en": "I take the opportunity to paint the drone a cool neon color before reassembling.",
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
          "en": "I calculate if it's cheaper to order replacement parts or just buy a used drone.",
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
          "en": "I check the local aviation rules to ensure I'm not flying it in restricted airspace.",
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
