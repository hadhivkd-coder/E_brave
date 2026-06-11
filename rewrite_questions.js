import fs from 'fs';

// Read the original file
const content = fs.readFileSync('src/admin/data/assessmentConfig.js', 'utf8');

// Extract QUESTION_BANK
const bankStart = content.indexOf('export const QUESTION_BANK = [');
const bankEnd = content.indexOf('];\n', bankStart) + 2;
const beforeBank = content.slice(0, bankStart);
const afterBank = content.slice(bankEnd);

const bankString = content.slice(bankStart + 29, bankEnd - 1);
const questions = eval(`(${bankString})`);

const imageCategories = [
  'science_project', 'school_event', 'social_gathering', 'study_desk',
  'tech_interface', 'classroom_surprise', 'textbooks_studying', 'hands_on_workshop',
  'family_dinner', 'mountain_peak', 'sports_team', 'art_studio', 'debate_club',
  'coding_bootcamp', 'volunteer_work', 'music_band', 'nature_hike'
];

const scenarios = [
  "Your school is hosting a massive science fair. Which part do you want to lead?",
  "You're organizing a weekend trip with your friends. What is your main role?",
  "You just got a brand new video game. How do you approach playing it for the first time?",
  "Your teacher assigns a difficult group project. What is your immediate reaction?",
  "You are given free time to learn anything you want. What do you choose?",
  "You see a student struggling with a heavy box in the hallway. What do you do?",
  "Your team is losing a sports match at halftime. How do you motivate them?",
  "You have to write an essay on a topic of your choice. What do you write about?",
  "Your phone breaks and you can't afford a new one right away. What is your solution?",
  "You find a complicated puzzle box. How do you open it?",
  "A local community center needs help organizing an event. What do you volunteer for?",
  "You are designing a brand new app. What is its main feature?",
  "You get to interview any famous person. Who do you choose?",
  "Your class is debating a controversial new school rule. What is your strategy?",
  "You are trapped in an escape room with your friends. What is your strategy?",
  "You are starting a YouTube channel. What kind of videos do you make?",
  "You have to build a model bridge for a physics project. How do you do it?",
  "You are asked to plan the school's annual talent show. What do you focus on?",
  "You find a lost wallet with no ID but a lot of cash. What do you do?",
  "You are stranded on a deserted island with a group of people. What is your role?"
];

// Helper to generate a contextual option based on traits
function generateOptionText(traitsArray, scenarioIndex) {
  const primaryTrait = traitsArray[0]?.traitId || 'general';
  
  const optionsMap = {
    'engineering': ["I focus on building the physical structure and making sure it works.", "I try to understand the mechanics and fix the technical issues.", "I design a machine or write the code to solve it automatically."],
    'technology': ["I immediately look for a software solution or start coding.", "I use digital tools to analyze the data and find a solution.", "I build a tech platform to manage the situation."],
    'healthcare': ["I make sure everyone is feeling okay and check on their health.", "I focus on the human impact and try to heal or support people.", "I volunteer for the medical or caretaking responsibilities."],
    'social': ["I gather everyone together to talk about their feelings.", "I focus on helping the community and supporting the vulnerable.", "I teach others what I know so they can succeed too."],
    'business': ["I calculate the costs and figure out how to make it profitable.", "I take charge of the budget and resource management.", "I look for ways to market the idea and reach more people."],
    'law': ["I establish clear rules and make sure everyone follows them fairly.", "I debate the logic and ensure justice is served.", "I read the guidelines carefully to ensure strict compliance."],
    'arts': ["I design the visual elements and make sure it looks beautiful.", "I focus on the creative direction and emotional expression.", "I sketch out artistic ideas and brainstorm creative themes."],
    
    'extroversion': ["I confidently take the lead and talk to as many people as possible.", "I thrive in the energetic crowd and keep everyone hyped up.", "I loudly volunteer my ideas and try to involve everyone."],
    'introversion': ["I step back and work independently on a quiet, focused task.", "I prefer to observe the situation and think deeply before acting.", "I find a peaceful corner to handle my responsibilities alone."],
    'conscientiousness': ["I create a highly detailed schedule and strict deadlines for myself.", "I organize all the materials and ensure everything is perfect.", "I stick to the plan and work meticulously until it's finished."],
    'emotional_stability': ["I stay completely calm and logically handle the stress.", "I don't panic; I just keep moving forward steadily.", "I remain grounded and help calm others down."],
    'openness': ["I eagerly try the strangest, most unconventional idea.", "I embrace the unknown and look for creative, out-of-the-box solutions.", "I explore abstract theories to find a unique perspective."],
    
    'ai_readiness': ["I use AI tools to generate ideas and automate the boring parts.", "I test different AI prompts to see which gets the best result.", "I look for a technological workaround using modern AI algorithms."],
    'problem_solving': ["I analyze the puzzle methodically until I find the root cause.", "I brainstorm multiple alternative solutions before picking one.", "I break the complex issue down into smaller, solvable parts."],
    'collaboration': ["I ask my friends for their input and we work on it together.", "I delegate tasks based on everyone's strengths.", "I ensure the team is communicating and cooperating smoothly."],
    'learning_agility': ["I quickly look up tutorials and learn the new skill on the spot.", "I adapt instantly to the new rules and try a different approach.", "I figure it out through rapid trial and error."],
    'independence': ["I trust my own instincts and handle it entirely by myself.", "I prefer not to ask for help and prove I can do it alone.", "I break away from the group to execute my personal vision."],
    
    'parent_influence': ["I ask my parents what they think I should do and follow their advice.", "I consider how this will look to my family and peers.", "I prioritize the option that my parents would be proud of."],
    'confusion': ["I hesitate because I'm not entirely sure what the best path is.", "I feel a bit overwhelmed and wait to see what others do.", "I try a little bit of everything because I can't decide."]
  };

  const genericOptions = [
    "I logically analyze the situation and take decisive action.",
    "I try to find a creative and unique way to handle it.",
    "I step up as a leader and guide the group.",
    "I focus on getting the job done efficiently and correctly."
  ];

  let possibleOptions = optionsMap[primaryTrait] || genericOptions;
  return possibleOptions[scenarioIndex % possibleOptions.length];
}

const rewrittenQuestions = questions.map((q, idx) => {
  const scenarioText = scenarios[idx % scenarios.length];
  const imgCat = imageCategories[idx % imageCategories.length];
  
  const newOptions = q.options.map((opt, optIdx) => {
    return {
      id: opt.id,
      text: {
        en: generateOptionText(opt.traits || [], idx + optIdx),
        hi: "",
        ml: ""
      },
      traits: opt.traits
    };
  });

  return {
    ...q,
    imageCategory: imgCat,
    text: {
      en: scenarioText,
      hi: "",
      ml: ""
    },
    options: newOptions
  };
});

const newBankString = 'export const QUESTION_BANK = ' + JSON.stringify(rewrittenQuestions, null, 2) + ';';

const newContent = beforeBank + newBankString + '\n' + afterBank;

fs.writeFileSync('src/admin/data/assessmentConfig.js', newContent, 'utf8');
console.log('Successfully rewrote 100 questions!');
