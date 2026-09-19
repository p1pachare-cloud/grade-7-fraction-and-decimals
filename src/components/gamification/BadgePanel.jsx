import React from 'react';
import { BADGES } from '../../utils/badgeEngine.js';

export function BadgePanel({ earnedBadges = [] }) {
  return (
    <div className="glass-card" style={{ maxWidth: '720px', width: '100%', margin: '24px 0' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: '800', marginBottom: '20px', textAlign: 'center' }}>
        🏆 Achievements & Badges ({earnedBadges.length}/{BADGES.length})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '14px' }}>
        {BADGES.map((b) => {
          const isUnlocked = earnedBadges.includes(b.id);
          return (
            <div
              key={b.id}
              style={{
                background: isUnlocked ? 'rgba(255, 193, 7, 0.18)' : 'rgba(255, 255, 255, 0.06)',
                border: isUnlocked ? '1.5px solid rgba(255, 193, 7, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '18px',
                padding: '18px 12px',
                textAlign: 'center',
                opacity: isUnlocked ? 1 : 0.5,
                filter: isUnlocked ? 'none' : 'grayscale(0.7)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{b.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '800', color: isUnlocked ? '#ffc107' : '#fff' }}>
                {b.label}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '6px', fontWeight: '600', lineHeight: '1.4' }}>
                {b.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BadgePanel;
