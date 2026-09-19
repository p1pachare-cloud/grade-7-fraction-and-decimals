import React from 'react';

export function FeedbackOverlay({
  isCorrect,
  message,
  subMessage,
  xpEarned,
  explanation,
  onContinue,
}) {
  return (
    <div className="feedback-overlay">
      <div className={`feedback-content ${isCorrect ? 'correct' : 'wrong'}`}>
        <div className="feedback-emoji">{isCorrect ? '🌟🎉' : '💡🔍'}</div>
        <h2 className="feedback-message">{message || (isCorrect ? 'Spot On!' : 'Let’s Check Again!')}</h2>
        {subMessage && <p className="feedback-sub">{subMessage}</p>}

        {isCorrect && xpEarned > 0 && (
          <div style={{ margin: '12px 0', fontSize: '1.2rem', fontWeight: '700', color: '#ffc107' }}>
            +{xpEarned} XP Earned!
          </div>
        )}

        {explanation && (
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              margin: '16px 0',
              fontSize: '0.9rem',
              textAlign: 'left',
              lineHeight: '1.5',
            }}
          >
            <strong>Explanation:</strong> {explanation}
          </div>
        )}

        <button type="button" className="btn btn-secondary btn-lg" onClick={onContinue}>
          {isCorrect ? 'Continue ➜' : 'Try Again ↺'}
        </button>
      </div>
    </div>
  );
}

export default FeedbackOverlay;
