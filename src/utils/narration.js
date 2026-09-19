/**
 * Narration helpers and phase script definitions.
 * ONLY includes paragraph text and questions - NEVER titles or headings.
 */

export function say(text) {
  return { text, style: 'statement' };
}

export function ask(text) {
  return { text, style: 'question' };
}

export function cheer(text) {
  return { text, style: 'celebration' };
}

export function emphasize(text) {
  return { text, style: 'emphasis' };
}

export function think(text) {
  return { text, style: 'thinking' };
}

export function instruct(text) {
  return { text, style: 'instruction' };
}

export function getWonderNarration() {
  return [
    ask("Why does 1/3 equal 0.333... forever as an infinite recurring decimal, while 1/4 terminates cleanly at 0.25?"),
    think("Is this determined by prime factors of the denominator? Let's test it!"),
  ];
}

export function getStoryNarration(panelIndex) {
  const stories = [
    [say("John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki form the Global Cyber-Grid Architects team.")],
    [say("Aisha in Dubai allocates 3/8 of a high-speed data stream to telemetry, converting 3/8 into 0.375 for decimal signal processing.")],
    [say("Liam in London calculates a 1/3 server bandwidth split, noticing the signal creates a recurring decimal 0.333... forever.")],
    [emphasize("Yuki in Tokyo multiplies a 1/2 bandwidth quota by 0.8 latency boost, calculating 0.5 × 0.8 = 0.4 total signal efficiency!")],
    [think("Sofia in Rio measures signal latency as 12.3456 ms and rounds it to 3 significant figures: 12.3 ms for real-time routing!")],
    [cheer("Every server node, data fraction, and decimal latency calculation works together to power our global cyber grid!")],
  ];
  return stories[panelIndex] || [say("Let's explore fractions and decimals in the cyber grid!")];
}

export function getStationIntroNarration(stationIndex) {
  if (stationIndex === 0) {
    return [instruct("Adjust the numerator and denominator sliders to observe live decimal conversions and grid shading!")];
  }
  if (stationIndex === 1) {
    return [instruct("Compute the mixed operation between fractions and decimals!")];
  }
  return [instruct("Execute multi-step fraction conversions and precision rounding to significant figures!")];
}

export function getReflectNarration() {
  return [
    ask("Give one real-world example where converting a fraction to a decimal is crucial in engineering or digital systems!"),
  ];
}
