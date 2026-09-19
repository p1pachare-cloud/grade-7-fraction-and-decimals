/**
 * Procedural Math Engine for Grade 7: Fractions & Decimals.
 * Synthesizes infinite unique problems dynamically per session across 6 core sub-topics:
 * 1. Fraction <-> Decimal Conversions
 * 2. Comparing & Ordering Fractions/Decimals
 * 3. Mixed Operations (+, -, *, /)
 * 4. Terminating vs. Recurring Decimals
 * 5. Rounding & Significant Figures
 * 6. Real-world Cyber-Grid Engineering Word Problems
 */

import { shuffleArray } from './shuffle.js';
import { roundMeasurement } from './fractionsAndDecimalsMath.js';

function isTerminatingDenominator(den) {
  let temp = den;
  while (temp % 2 === 0) temp /= 2;
  while (temp % 5 === 0) temp /= 5;
  return temp === 1;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export function generateProceduralQuestion(worldId = 0, difficulty = 1) {
  const topicIndex = (worldId + Math.floor(Math.random() * 3)) % 6;
  const isBossLevel = (worldId === 4 || worldId === 9);

  let qText = '';
  let correctAnswer = '';
  let options = [];
  let hint1 = '';
  let hint2 = '';
  let explanation = '';
  let type = '';

  const cities = ['Tokyo', 'London', 'Dubai', 'New York', 'Rio', 'Nairobi', 'Sydney', 'Paris'];
  const characters = ['Yuki', 'Liam', 'Aisha', 'John', 'Sofia', 'Ravi', 'Sarah', 'Emma'];
  const city = cities[worldId % cities.length];
  const character = characters[worldId % characters.length];

  switch (topicIndex) {
    case 0: { // Fraction <-> Decimal Conversion
      type = 'conversion';
      const denOptions = [2, 4, 5, 8, 10, 16, 20, 25, 50];
      const den = denOptions[Math.floor(Math.random() * denOptions.length)];
      const num = Math.floor(Math.random() * (den - 1)) + 1;
      const dec = roundMeasurement(num / den, 4);

      if (Math.random() > 0.5) {
        qText = `Convert the fraction ${num}/${den} to a decimal for Cyber-Grid Node ${city}.`;
        correctAnswer = `${dec}`;
        explanation = `To convert ${num}/${den} to a decimal, divide ${num} by ${den}: ${num} ÷ ${den} = ${dec}.`;
      } else {
        qText = `Convert the decimal signal ${dec} to its simplest fraction form.`;
        const divisor = gcd(num, den);
        correctAnswer = `${num / divisor}/${den / divisor}`;
        explanation = `${dec} equals ${num}/${den}, which simplifies to ${num / divisor}/${den / divisor} by dividing by GCD ${divisor}.`;
      }

      hint1 = 'Divide numerator by denominator to convert fraction to decimal.';
      hint2 = 'Use place value (tenths, hundredths, thousandths) for decimal to fraction conversion.';
      options = [correctAnswer, `${dec + 0.1}`, `${roundMeasurement(dec * 0.5, 3)}`, `${dec - 0.05}`];
      break;
    }

    case 1: { // Terminating vs. Recurring Decimals
      type = 'terminating_recurring';
      const denList = [3, 4, 6, 7, 8, 9, 11, 12, 15, 20, 25];
      const den = denList[Math.floor(Math.random() * denList.length)];
      const num = 1 + Math.floor(Math.random() * 5);
      const isTerminating = isTerminatingDenominator(den);
      const decVal = (num / den).toFixed(3);

      qText = `Does the network frequency fraction ${num}/${den} produce a terminating or recurring decimal?`;
      correctAnswer = isTerminating ? 'Terminating Decimal' : 'Recurring Decimal';
      explanation = `The prime factors of denominator ${den} are ${isTerminating ? 'only 2 and/or 5' : 'contain factors other than 2 and 5'}. Therefore, ${num}/${den} = ${decVal}... is a ${correctAnswer.toLowerCase()}.`;

      hint1 = 'A fraction produces a terminating decimal ONLY if its simplified denominator has prime factors of 2 and 5 only.';
      hint2 = 'Check if prime factorization of the denominator contains 3, 7, 11, etc.';
      options = ['Terminating Decimal', 'Recurring Decimal', 'Integer', 'Irrational Number'];
      break;
    }

    case 2: { // Comparing & Ordering
      type = 'comparing';
      const numFrac = 1 + Math.floor(Math.random() * 3);
      const fracA = `${numFrac}/4`;
      const decB = roundMeasurement(0.2 + Math.random() * 0.7, 2);

      const valA = numFrac / 4;
      const winner = valA > decB ? fracA : decB > valA ? `${decB}` : 'Equal';

      qText = `Which bandwidth metric is larger: ${fracA} or ${decB}?`;
      correctAnswer = winner === 'Equal' ? 'Both are equal' : `${winner}`;
      explanation = `${fracA} equals ${roundMeasurement(valA, 2)}. Comparing ${roundMeasurement(valA, 2)} and ${decB}, ${correctAnswer} is greater.`;

      hint1 = 'Convert the fraction to a decimal first to compare them easily.';
      hint2 = `${fracA} = ${roundMeasurement(valA, 2)}. Compare it directly to ${decB}.`;
      options = [correctAnswer, winner === fracA ? `${decB}` : fracA, 'Both are equal', 'Cannot be determined'];
      break;
    }

    case 3: { // Operations (+, -, *, /)
      type = 'operations';
      const op = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
      const numA = (1 + Math.floor(Math.random() * 4)) * 0.5;
      const numB = (1 + Math.floor(Math.random() * 4)) * 0.25;

      let res = 0;
      if (op === '+') res = numA + numB;
      else if (op === '-') res = numA - numB;
      else if (op === '×') res = numA * numB;
      else res = numA / numB;

      res = roundMeasurement(res, 3);

      qText = `Calculate the Cyber-Grid power load: ${numA} ${op} ${numB} = ?`;
      correctAnswer = `${res}`;
      explanation = `Performing ${numA} ${op} ${numB} gives ${res}.`;

      hint1 = `Align decimals or convert to fractions to calculate ${op}.`;
      hint2 = `Double check your calculation: ${numA} ${op} ${numB}.`;
      options = [correctAnswer, `${roundMeasurement(res + 0.5, 2)}`, `${roundMeasurement(res * 2, 2)}`, `${roundMeasurement(Math.abs(res - 0.25), 2)}`];
      break;
    }

    case 4: { // Rounding & Significant Figures
      type = 'rounding_sigfig';
      const val = 12.3456 + Math.random() * 80;
      const sigFigs = [2, 3, 4][Math.floor(Math.random() * 3)];
      const rounded = Number(val.toPrecision(sigFigs));

      qText = `Round the data transfer rate ${val.toFixed(4)} GB/s to ${sigFigs} significant figures.`;
      correctAnswer = `${rounded}`;
      explanation = `To round ${val.toFixed(4)} to ${sigFigs} significant figures, count ${sigFigs} digits starting from the first non-zero digit. Result = ${rounded}.`;

      hint1 = 'Significant figures start from the first non-zero digit on the left.';
      hint2 = `Look at the (${sigFigs} + 1)th digit to decide whether to round up.`;
      options = [correctAnswer, `${val.toFixed(sigFigs)}`, `${Math.round(val)}`, `${Number(val.toPrecision(sigFigs + 1))}`];
      break;
    }

    default: { // Real-World Word Problem / Boss Challenge
      type = 'word_problem';
      const speed = roundMeasurement(12.5 + Math.random() * 10, 1);
      const hours = roundMeasurement(2.4 + Math.random() * 2, 1);
      const total = roundMeasurement(speed * hours, 2);

      qText = `${character} in ${city} is routing data at ${speed} TB/hr. How many TB of data are transmitted in ${hours} hours?`;
      correctAnswer = `${total} TB`;
      explanation = `Total data transmitted = Rate × Time = ${speed} × ${hours} = ${total} TB.`;

      hint1 = 'Multiply the transmission rate by the time in hours.';
      hint2 = `${speed} × ${hours} = ${total}.`;
      options = [correctAnswer, `${roundMeasurement(total * 1.2, 2)} TB`, `${roundMeasurement(speed + hours, 2)} TB`, `${roundMeasurement(total / 2, 2)} TB`];
      break;
    }
  }

  // Ensure unique distractor options
  const finalOptions = shuffleArray(Array.from(new Set([correctAnswer, ...options])));

  return {
    id: `PROC_W${worldId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    world: worldId,
    difficulty,
    type,
    questionText: qText,
    visual: isBossLevel ? 'bossChallenge' : 'cyberDashboard',
    correctAnswer,
    options: finalOptions,
    hint1,
    hint2,
    explanation,
    characterName: character,
    city,
    contextObject: 'Cyber Grid Node',
    isBossLevel,
  };
}

export function generateProceduralQuizRound(worldId = 0, count = 10) {
  const quiz = [];
  for (let i = 0; i < count; i++) {
    quiz.push(generateProceduralQuestion(worldId, Math.min(3, Math.floor(i / 3) + 1)));
  }
  return quiz;
}
