export const BADGES = [
  {
    id: 'blueprint_reader',
    label: '📐 Cyber Architect',
    description: 'Complete Wonder and Story phases',
    icon: '📐',
    condition: (s) => s.phaseComplete?.wonder && s.phaseComplete?.story,
  },
  {
    id: 'fractions_explorer',
    label: '🥈 Fractions & Decimals Explorer',
    description: 'Complete all 3 Simulation stations',
    icon: '🧭',
    condition: (s) => s.simStationsComplete && s.simStationsComplete.every(Boolean),
  },
  {
    id: 'fractions_ranger',
    label: '🥇 Fractions & Decimals Ranger',
    description: 'Score 80%+ across Play phase questions',
    icon: '⭐',
    condition: (s) => {
      if (!s.worldScores) return false;
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_plan',
    label: '💎 Perfect Grid',
    description: 'Score a perfect 10/10 in any world',
    icon: '💎',
    condition: (s) => s.worldScores && s.worldScores.some((ws) => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    icon: '🔥',
    condition: (s) => (s.maxStreak || 0) >= 10,
  },
  {
    id: 'global_blueprint_champion',
    label: '🌍 Global Grid Master',
    description: 'Complete all 6 phases of the lesson',
    icon: '🌍',
    condition: (s) => s.phaseComplete && Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'sharp_eye',
    label: '🎯 Sharp Eye',
    description: 'Complete Station B without any incorrect classification',
    icon: '🎯',
    condition: (s) => s.stationBPerfect === true,
  },
  {
    id: 'decimal_detective',
    label: '⚡ Decimal Detective',
    description: 'Correctly solve 5 fraction-decimal conversion questions',
    icon: '⚡',
    condition: (s) => (s.conversionCorrect || 0) >= 5,
  },
];

export function checkBadges(state) {
  if (!state || !state.badges) return [];
  return BADGES
    .filter((b) => !state.badges.includes(b.id) && b.condition(state))
    .map((b) => b.id);
}
