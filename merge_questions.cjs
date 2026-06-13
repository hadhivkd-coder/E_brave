const fs = require('fs');

try {
  // Read original
  const content = fs.readFileSync('src/admin/data/assessmentConfig.js', 'utf8');
  const bankStart = content.indexOf('export const QUESTION_BANK = [');
  const bankEnd = content.indexOf('];\n', bankStart) + 2;
  const beforeBank = content.slice(0, bankStart);
  const afterBank = content.slice(bankEnd);

  const bankString = content.slice(bankStart + 29, bankEnd - 1);
  const originalQuestions = eval(`(${bankString})`);

  // Read new
  const new50 = JSON.parse(fs.readFileSync('new_questions_1_to_50.json', 'utf8'));
  const new100 = JSON.parse(fs.readFileSync('new_questions_51_to_100.json', 'utf8'));
  const allNew = [...new50, ...new100];

  // Merge
  const mergedQuestions = originalQuestions.map(orig => {
    const newQ = allNew.find(n => n.id === orig.id);
    if (!newQ) {
      console.warn('Missing new question for id:', orig.id);
      return orig;
    }

    return {
      ...orig,
      text: {
        ...orig.text,
        en: newQ.text.en
      },
      options: orig.options.map(origOpt => {
        const newOpt = newQ.options.find(n => n.id === origOpt.id);
        if (!newOpt) return origOpt;
        return {
          ...origOpt,
          text: {
            ...origOpt.text,
            en: newOpt.text.en
          }
        };
      })
    };
  });

  // Write back
  const newBankString = 'export const QUESTION_BANK = ' + JSON.stringify(mergedQuestions, null, 2) + ';';
  const newContent = beforeBank + newBankString + '\n' + afterBank;
  fs.writeFileSync('src/admin/data/assessmentConfig.js', newContent, 'utf8');
  console.log('Successfully merged all 100 questions!');
} catch (e) {
  console.error('Error during merge:', e);
}
