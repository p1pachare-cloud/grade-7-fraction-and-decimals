import React from 'react';

export function StreakCounter({ streak = 0 }) {
  return (
    <div
      className={`hud-item ${streak > 0 ? 'streak-fire' : ''}`}
      style={{
        color: streak > 0 ? '#ff7043' : 'rgba(255,255,255,0.4)',
        background: streak > 0 ? 'rgba(255, 112, 67, 0.15)' : 'rgba(255,255,255,0.05)',
        border: streak > 0 ? '1px solid rgba(255, 112, 67, 0.4)' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <span>🔥</span>
      <span>{streak} Streak</span>
    </div>
  );
}

export default StreakCounter;
