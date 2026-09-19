/**
 * Fisher-Yates Shuffle implementation for unbiased question and option randomization.
 */

export function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank, questionsPerWorld = 10) {
  if (!bank || !Array.isArray(bank)) return [];
  
  // Group by world (0..9)
  const byWorld = {};
  for (let i = 0; i < 10; i++) {
    byWorld[i] = [];
  }
  
  bank.forEach((q) => {
    const w = q.world !== undefined ? q.world : 0;
    if (!byWorld[w]) byWorld[w] = [];
    byWorld[w].push(q);
  });

  const sessionBank = {};
  Object.keys(byWorld).forEach((w) => {
    const shuffled = shuffleArray(byWorld[w]);
    sessionBank[w] = shuffled.slice(0, questionsPerWorld);
  });

  return sessionBank;
}
