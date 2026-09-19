import React, { useState } from 'react';
import Mascot from '../shared/Mascot.jsx';
import BadgePanel from '../gamification/BadgePanel.jsx';

export function ReflectPhase({ xp = 0, streak = 0, maxStreak = 0, badges = [], worldScores = [], onRestart }) {
  const [journalText, setJournalText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const completedWorlds = worldScores.filter((ws) => ws !== null && ws >= 5).length;

  return (
    <div className="reflect-phase">
      <div className="certificate-card">
        <div className="cert-badge">🏅</div>
        <h1 className="cert-title">Global Cyber-Grid Certificate</h1>
        <p className="cert-subtitle">Grade 7 Mathematics • Fractions & Decimals</p>

        <div className="cert-stats">
          <div className="cert-stat">
            <div className="cert-stat-value">{xp}</div>
            <div className="cert-stat-label">Total XP</div>
          </div>
          <div className="cert-stat">
            <div className="cert-stat-value">{maxStreak}</div>
            <div className="cert-stat-label">Best Streak</div>
          </div>
          <div className="cert-stat">
            <div className="cert-stat-value">{completedWorlds}/10</div>
            <div className="cert-stat-label">Worlds Unlocked</div>
          </div>
        </div>

        {!submitted ? (
          <div style={{ textAlign: 'left', margin: '24px 0' }}>
            <label style={{ display: 'block', fontWeight: '700', marginBottom: '10px', fontSize: '1.2rem', lineHeight: '1.5', color: '#fff' }}>
              📝 Reflection Prompt: Give one real-world example where converting a fraction to a decimal (or rounding to significant figures) is crucial in engineering or digital systems!
            </label>
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Type your reflection here (e.g., When calculating server bandwidth, converting 3/8 to 0.375 GB/s allows accurate digital latency calculations)..."
              rows={3}
              style={{
                width: '100%',
                borderRadius: '14px',
                padding: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                lineHeight: '1.6',
                resize: 'vertical',
              }}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ marginTop: '14px', width: '100%' }}
              onClick={() => setSubmitted(true)}
              disabled={!journalText.trim()}
            >
              Submit Journal Entry ✍️
            </button>
          </div>
        ) : (
          <div style={{ background: 'rgba(76, 175, 80, 0.2)', border: '1.5px solid rgba(76, 175, 80, 0.45)', borderRadius: '14px', padding: '20px', margin: '24px 0', textAlign: 'left' }}>
            <div style={{ color: 'var(--green-light)', fontWeight: '800', fontSize: '1.2rem', marginBottom: '6px' }}>✓ Journal Reflection Saved:</div>
            <div style={{ fontStyle: 'italic', fontSize: '1.15rem', color: '#fff', lineHeight: '1.6' }}>"{journalText}"</div>
          </div>
        )}

        <Mascot mood="celebrating" speech="Congratulations! You are officially a Global Cyber-Grid Champion!" />

        <BadgePanel earnedBadges={badges} />

        <div style={{ marginTop: '20px' }}>
          <button type="button" className="btn btn-outline" onClick={onRestart}>
            Replay Adventure ↺
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReflectPhase;
