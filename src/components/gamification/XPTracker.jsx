import React from 'react';

export function XPTracker({ xp = 0, recentXP = 0 }) {
  return (
    <div className="hud-item" style={{ color: '#ffc107', background: 'rgba(255, 193, 7, 0.15)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
      <span>⚡</span>
      <span>{xp} XP</span>
      {recentXP > 0 && <span className="xp-popup">+{recentXP} XP!</span>}
    </div>
  );
}

export default XPTracker;
