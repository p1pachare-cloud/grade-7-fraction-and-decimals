/**
 * Pure Math Logic Engine for Grade 7 Fractions & Decimals.
 * Handles conversions, prime factorization, terminating/recurring classification,
 * mixed fraction/decimal operations, significant figures, and numeric validation.
 */

export function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function simplifyFraction(num, den) {
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function isTerminatingDenominator(den) {
  const { den: simplifiedDen } = simplifyFraction(1, den);
  let temp = simplifiedDen;
  while (temp % 2 === 0) temp /= 2;
  while (temp % 5 === 0) temp /= 5;
  return temp === 1;
}

export function fractionToDecimal(num, den) {
  if (!den || den === 0) return 0;
  return num / den;
}

export function decimalToFraction(decimal, maxDenominator = 100) {
  let bestNum = 1;
  let bestDen = 1;
  let minDiff = Math.abs(decimal - bestNum / bestDen);

  for (let den = 1; den <= maxDenominator; den++) {
    const num = Math.round(decimal * den);
    const diff = Math.abs(decimal - num / den);
    if (diff < minDiff) {
      minDiff = diff;
      bestNum = num;
      bestDen = den;
    }
  }

  return simplifyFraction(bestNum, bestDen);
}

export function roundMeasurement(value, decimals = 3) {
  if (value === undefined || value === null || isNaN(value)) return 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export function roundToSignificantFigures(value, sigFigs = 3) {
  if (value === 0 || isNaN(value)) return 0;
  return Number(value.toPrecision(sigFigs));
}

export function computeMixedOperation(num, den, decimal, operator) {
  const fracVal = fractionToDecimal(num, den);
  let result = 0;
  switch (operator) {
    case '+':
      result = fracVal + decimal;
      break;
    case '-':
      result = fracVal - decimal;
      break;
    case '×':
    case '*':
      result = fracVal * decimal;
      break;
    case '÷':
    case '/':
      result = decimal !== 0 ? fracVal / decimal : 0;
      break;
    default:
      result = fracVal + decimal;
  }
  return roundMeasurement(result, 4);
}

export function validateNumericAnswer(userVal, expectedVal, tolerance = 0.005) {
  const u = parseFloat(userVal);
  const e = parseFloat(expectedVal);
  if (isNaN(u) || isNaN(e)) return false;
  return Math.abs(u - e) <= tolerance;
}
