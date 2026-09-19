import React from 'react';

export function HintOverlay({ hint1, hint2, hintsUsed = 0, onUseHint, explanation, isFailed = false }) {
  return (
    <div style={{ margin: '16px 0', textOverflow: 'ellipsis' }}>
      {hintsUsed >= 1 && hint1 && (
        <div className="hint-text" style={{ background: 'rgba(255, 193, 7, 0.15)', padding: '10px 16px', borderRadius: '14px', fontSize: '1.15rem', lineHeight: '1.5' }}>
          💡 <strong>Hint 1:</strong> {hint1}
        </div>
      )}

      {hintsUsed >= 2 && hint2 && (
        <div className="hint-text" style={{ background: 'rgba(255, 193, 7, 0.2)', padding: '10px 16px', borderRadius: '14px', marginTop: '8px', fontSize: '1.15rem', lineHeight: '1.5' }}>
          💡 <strong>Hint 2:</strong> {hint2}
        </div>
      )}

      {isFailed && explanation && (
        <div style={{ background: 'rgba(76, 175, 80, 0.2)', border: '1px solid rgba(76, 175, 80, 0.4)', borderRadius: '14px', padding: '16px 20px', marginTop: '12px', fontSize: '1.2rem', lineHeight: '1.6' }}>
          📖 <strong>Worked Explanation:</strong> {explanation}
        </div>
      )}

      {!isFailed && hintsUsed < 2 && (
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onUseHint}
          style={{ marginTop: '10px' }}
        >
          💡 Need a Hint? ({hintsUsed === 0 ? 'Hint 1' : 'Hint 2'})
        </button>
      )}
    </div>
  );
}

export default HintOverlay;
