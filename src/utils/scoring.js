import { shuffleArray } from './shuffle.js';
import { roundMeasurement } from './fractionsAndDecimalsMath.js';

export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold (>=90%)
  if (correct >= 7) return 2; // Silver (>=70%)
  if (correct >= 5) return 1; // Bronze (>=50% - unlock next world)
  return 0;
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  if (!Array.isArray(worldScores)) return 0;
  return worldScores.reduce((sum, ws) => sum + (ws !== null && ws !== undefined ? calcStars(ws) : 0), 0);
}

export function generateDistractors(correctValue, count = 3, isDecimal = false) {
  const distractors = new Set();
  const val = Number(correctValue);
  
  if (isNaN(val)) {
    return [String(correctValue), 'Option A', 'Option B', 'Option C'];
  }

  const candidates = [
    val * 2,           // Doubled multiplier distractor
    val / 2,           // Halved multiplier distractor
    val + (isDecimal ? 0.5 : 2),
    val - (isDecimal ? 0.5 : 2),
    val * 1.5,
    val + 1,
  ];

  shuffleArray(candidates).forEach((c) => {
    const rounded = isDecimal ? roundMeasurement(c, 1) : Math.round(c);
    if (rounded !== val && rounded > 0 && distractors.size < count) {
      distractors.add(rounded);
    }
  });

  const finalOptions = shuffleArray([val, ...Array.from(distractors)]);
  return finalOptions.map((o) => (typeof correctValue === 'string' && correctValue.includes('GB/s') ? `${o} GB/s` : String(o)));
}
