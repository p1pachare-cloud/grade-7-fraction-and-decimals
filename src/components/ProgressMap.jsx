import React from 'react';

const PHASES = [
  { id: 'intro', label: 'INTRO', num: 1 },
  { id: 'wonder', label: 'WONDER', num: 2 },
  { id: 'story', label: 'STORY', num: 3 },
  { id: 'simulate', label: 'SIMULATE', num: 4 },
  { id: 'play', label: 'PRACTICE', num: 5 },
  { id: 'reflect', label: 'REFLECT', num: 6 },
];

export function ProgressMap({ currentPhase = 'intro', phaseComplete = {}, onSelectPhase }) {
  const currentIdx = PHASES.findIndex((p) => p.id === currentPhase);

  return (
    <div className="journey-bar">
      {PHASES.map((p, idx) => {
        const isActive = p.id === currentPhase;
        const isCompleted = phaseComplete[p.id] || idx < currentIdx;

        return (
          <React.Fragment key={p.id}>
            <div
              className={`journey-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectPhase && onSelectPhase(p.id)}
            >
              <div className="journey-step-dot">
                {isCompleted ? '✓' : p.num}
              </div>
              <span className="journey-step-label">{p.label}</span>
            </div>
            {idx < PHASES.length - 1 && (
              <div className={`journey-connector ${idx < currentIdx ? 'filled' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProgressMap;
