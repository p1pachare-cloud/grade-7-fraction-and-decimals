import React from 'react';
import StarRating from './StarRating.jsx';
import { calcStars, canUnlockWorld } from '../../utils/scoring.js';

const WORLDS_DATA = [
  { id: 0, name: 'World 1: Rio de Janeiro', desc: 'Fraction ↔ Decimal Conversions', icon: '🇧🇷' },
  { id: 1, name: 'World 2: London', desc: 'Terminating vs. Recurring Decimals', icon: '🇬🇧' },
  { id: 2, name: 'World 3: Madrid', desc: 'Comparing & Ordering Rational Numbers', icon: '🇪🇸' },
  { id: 3, name: 'World 4: Tokyo', desc: 'Mixed Fraction & Decimal Operations', icon: '🇯🇵' },
  { id: 4, name: 'World 5: Cairo', desc: 'Boss Challenge: Cyber Grid Telemetry', icon: '🇪🇬' },
  { id: 5, name: 'World 6: Sydney', desc: 'Precision Rounding & Significant Figures', icon: '🇦🇺' },
  { id: 6, name: 'World 7: New York', desc: 'Real-World Cyber-Grid Systems', icon: '🇺🇸' },
  { id: 7, name: 'World 8: Paris', desc: 'Bandwidth & Server Load Calculations', icon: '🇫🇷' },
  { id: 8, name: 'World 9: Dubai', desc: 'Multi-Step Rational Chain Reasoning', icon: '🇦🇪' },
  { id: 9, name: 'World 10: Global Summit', desc: 'Boss Challenge: Global Cyber-Grid Architect', icon: '🏆' },
];

export function WorldMap({ worldScores = [], currentWorld = 0, onSelectWorld }) {
  return (
    <div className="world-map">
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
        🌍 Global Cyber-Grid World Map (10 Worlds)
      </h3>
      <p style={{ textAlign: 'center', fontSize: '1.15rem', fontWeight: '600', color: 'rgba(255,255,255,0.85)', marginBottom: '18px' }}>
        Score at least 5/10 to unlock the next world!
      </p>

      {WORLDS_DATA.map((w, index) => {
        const score = worldScores[w.id];
        const isUnlocked = w.id === 0 || canUnlockWorld(worldScores[w.id - 1]);
        const isCompleted = score !== null && score !== undefined;
        const stars = isCompleted ? calcStars(score) : 0;

        return (
          <div
            key={w.id}
            className={`world-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''} ${currentWorld === w.id ? 'active' : ''}`}
            onClick={() => isUnlocked && onSelectWorld(w.id)}
            style={{
              borderColor: currentWorld === w.id ? 'var(--gold)' : undefined,
              boxShadow: currentWorld === w.id ? '0 0 20px rgba(255, 193, 7, 0.4)' : undefined,
            }}
          >
            {!isUnlocked && <div className="world-lock">🔒</div>}
            <div className="world-icon" style={{ fontSize: '2.5rem' }}>{w.icon}</div>
            <div className="world-name" style={{ fontSize: '1.3rem', fontWeight: '700' }}>{w.name}</div>
            <div className="world-desc" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{w.desc}</div>

            {isUnlocked && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <StarRating stars={stars} size="1.35rem" />
                {score !== null && score !== undefined && (
                  <span style={{ fontSize: '1.1rem', color: '#ffc107', fontWeight: '800' }}>
                    {score}/10
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WorldMap;
