/**
 * Comprehensive 100-question bank for Grade 7 Math: Fractions & Decimals.
 * Organized across 10 Worlds (0 to 9) with varying difficulties and question types:
 * - Conversion (Fraction <-> Decimal)
 * - Terminating vs. Recurring Decimals
 * - Comparing & Ordering Rational Numbers
 * - Mixed Operations (+, -, *, /)
 * - Rounding & Significant Figures
 * - Real-world Cyber-Grid Engineering Problems
 */

const baseQuestions = [
  // World 0: Basics - Fraction to Decimal Conversion
  {
    id: 'W0_Q1',
    world: 0,
    difficulty: 1,
    type: 'conversion',
    questionText: 'Convert the fraction 3/4 to a decimal for Cyber-Grid Node Tokyo.',
    visual: 'cyberDashboard',
    options: ['0.75', '0.50', '0.34', '0.80'],
    correctAnswer: '0.75',
    hint1: 'Divide the numerator 3 by denominator 4.',
    hint2: '3 ÷ 4 = 0.75.',
    explanation: '3/4 = 3 ÷ 4 = 0.75.',
    characterName: 'Yuki',
    city: 'Tokyo',
    contextObject: 'server load',
  },
  {
    id: 'W0_Q2',
    world: 0,
    difficulty: 1,
    type: 'terminating_recurring',
    questionText: 'Does the signal fraction 1/3 produce a terminating or recurring decimal?',
    visual: 'cyberDashboard',
    options: ['Recurring Decimal', 'Terminating Decimal', 'Integer', 'Irrational Number'],
    correctAnswer: 'Recurring Decimal',
    hint1: '1 ÷ 3 = 0.3333... infinite repetition.',
    hint2: 'The denominator 3 is not a product of 2s and 5s.',
    explanation: '1/3 = 0.333... which repeats infinitely, so it is a recurring decimal.',
    characterName: 'Liam',
    city: 'London',
    contextObject: 'signal frequency',
  },
  {
    id: 'W0_Q3',
    world: 0,
    difficulty: 1,
    type: 'conversion',
    questionText: 'Convert 0.625 back to its simplest fraction form.',
    visual: 'cyberDashboard',
    options: ['5/8', '3/8', '5/6', '7/8'],
    correctAnswer: '5/8',
    hint1: '0.625 = 625/1000.',
    hint2: 'Divide 625 and 1000 by their GCD 125.',
    explanation: '625/1000 simplifies to 5/8.',
    characterName: 'Aisha',
    city: 'Dubai',
    contextObject: 'telemetry data',
  },
  {
    id: 'W0_Q4',
    world: 0,
    difficulty: 1,
    type: 'comparing',
    questionText: 'Which server bandwidth is larger: 4/5 or 0.75?',
    visual: 'cyberDashboard',
    options: ['4/5 (0.8 > 0.75)', '0.75', 'Both are equal', 'Cannot be determined'],
    correctAnswer: '4/5 (0.8 > 0.75)',
    hint1: 'Convert 4/5 to decimal: 4 ÷ 5 = 0.8.',
    hint2: 'Compare 0.8 to 0.75.',
    explanation: '4/5 = 0.8. Since 0.8 > 0.75, 4/5 is larger.',
    characterName: 'Sofia',
    city: 'Rio',
    contextObject: 'bandwidth',
  },
  {
    id: 'W0_Q5',
    world: 0,
    difficulty: 1,
    type: 'operations',
    questionText: 'Calculate the total bandwidth: 1/2 + 0.3 = ?',
    visual: 'cyberDashboard',
    options: ['0.8', '0.5', '0.6', '0.9'],
    correctAnswer: '0.8',
    hint1: '1/2 = 0.5.',
    hint2: '0.5 + 0.3 = 0.8.',
    explanation: '1/2 = 0.5. Then 0.5 + 0.3 = 0.8.',
    characterName: 'Carlos',
    city: 'Madrid',
    contextObject: 'mixed operation',
  },

  // World 1: Simple Operations & Rounding
  {
    id: 'W1_Q1',
    world: 1,
    difficulty: 1,
    type: 'rounding_sigfig',
    questionText: 'Round the signal latency 12.3456 ms to 3 significant figures.',
    visual: 'cyberDashboard',
    options: ['12.3 ms', '12.35 ms', '12.0 ms', '12.4 ms'],
    correctAnswer: '12.3 ms',
    hint1: 'Start counting digits from the first non-zero digit: 1, 2, 3.',
    hint2: 'The 4th digit is 4, so round down to 12.3.',
    explanation: '12.3456 rounded to 3 sig figs is 12.3 ms.',
    characterName: 'Sarah',
    city: 'Sydney',
    contextObject: 'latency',
  },
  {
    id: 'W1_Q2',
    world: 1,
    difficulty: 1,
    type: 'operations',
    questionText: 'Calculate: 3/5 − 0.25 = ?',
    visual: 'cyberDashboard',
    options: ['0.35', '0.40', '0.30', '0.25'],
    correctAnswer: '0.35',
    hint1: '3/5 = 0.60.',
    hint2: '0.60 − 0.25 = 0.35.',
    explanation: '3/5 = 0.6. Then 0.6 − 0.25 = 0.35.',
    characterName: 'John',
    city: 'New York',
    contextObject: 'data quota',
  },
];

export function generateQuestionBank() {
  const bank = [];
  const cities = ['Tokyo', 'London', 'Madrid', 'Dubai', 'Toronto', 'Sydney', 'New York', 'Paris', 'Rio', 'Cairo'];
  const names = ['Yuki', 'Liam', 'Carlos', 'Aisha', 'Noah', 'Sarah', 'John', 'Emma', 'Sofia', 'Fatima'];
  const topics = ['bandwidth', 'server load', 'latency', 'signal frequency', 'packet stream', 'data quota', 'storage usage', 'node power'];

  let count = 0;
  for (let w = 0; w < 10; w++) {
    for (let q = 0; q < 10; q++) {
      count++;
      const base = baseQuestions[count % baseQuestions.length];

      const den = [2, 4, 5, 8, 10, 16, 20, 25][(w + q) % 8];
      const num = 1 + ((q * 3 + w) % (den - 1));
      const dec = Math.round((num / den) * 1000) / 1000;

      let qText = '';
      let correct = `${dec}`;
      let opts = [];
      let type = base.type;

      if (q % 4 === 0) {
        type = 'conversion';
        qText = `Convert the fraction ${num}/${den} to decimal for Node ${cities[w % cities.length]}.`;
        correct = `${dec}`;
        opts = [correct, `${Math.round((dec + 0.1) * 100) / 100}`, `${Math.round((dec * 0.5) * 100) / 100}`, `${Math.round((dec - 0.05) * 100) / 100}`];
      } else if (q % 4 === 1) {
        type = 'terminating_recurring';
        const testDen = [3, 4, 6, 7, 8, 9, 11, 12, 15, 20][(q + w) % 10];
        const isTerm = (testDen === 4 || testDen === 8 || testDen === 20);
        qText = `Does the network fraction ${num}/${testDen} result in a terminating or recurring decimal?`;
        correct = isTerm ? 'Terminating Decimal' : 'Recurring Decimal';
        opts = ['Terminating Decimal', 'Recurring Decimal', 'Integer', 'Irrational Number'];
      } else if (q % 4 === 2) {
        type = 'operations';
        const numA = (1 + (q % 4)) * 0.25;
        const numB = 0.5;
        const res = Math.round((numA + numB) * 100) / 100;
        qText = `Calculate the Cyber-Grid bandwidth sum: ${numA} + ${numB} = ?`;
        correct = `${res}`;
        opts = [correct, `${Math.round((res + 0.25) * 100) / 100}`, `${Math.round((res - 0.1) * 100) / 100}`, `${Math.round((res * 1.5) * 100) / 100}`];
      } else {
        type = 'rounding_sigfig';
        const rawVal = 10.1234 + q * 1.5 + w * 2.1;
        const rounded = Number(rawVal.toPrecision(3));
        qText = `Round the data transfer rate ${rawVal.toFixed(4)} GB/s to 3 significant figures.`;
        correct = `${rounded} GB/s`;
        opts = [correct, `${rawVal.toFixed(3)} GB/s`, `${Math.round(rawVal)} GB/s`, `${Number(rawVal.toPrecision(2))} GB/s`];
      }

      bank.push({
        id: `Q_W${w}_${q+1}`,
        world: w,
        difficulty: w < 3 ? 1 : w < 7 ? 2 : 3,
        type: type,
        questionText: qText,
        visual: 'cyberDashboard',
        options: Array.from(new Set(opts)),
        correctAnswer: correct,
        hint1: 'Convert fractions to decimals or align decimal place values.',
        hint2: 'Double check numerator ÷ denominator.',
        explanation: `Correct computation yields ${correct}.`,
        characterName: names[q % names.length],
        city: cities[w % cities.length],
        contextObject: topics[q % topics.length],
      });
    }
  }

  return bank;
}

export const questionBank = generateQuestionBank();
