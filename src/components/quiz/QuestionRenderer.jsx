import React, { useState } from 'react';
import CircleDiagram from '../shared/CircleDiagram.jsx';
import HintOverlay from './HintOverlay.jsx';
import { playClickSound, playCorrectSound, playWrongSound } from '../../utils/soundEffects.js';

export function QuestionRenderer({ question, onAnswer, hintsUsed = 0, onUseHint }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  if (!question) return null;

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    setAttemptCount((prev) => prev + 1);

    const isCorrect = option === question.correctAnswer;
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    onAnswer({
      option,
      isCorrect,
      attemptCount: attemptCount + 1,
    });
  };

  const handleHintClick = () => {
    playClickSound();
    if (onUseHint) onUseHint();
  };

  const getOptionClass = (opt) => {
    if (!isAnswered) {
      return selectedOption === opt ? 'selected' : '';
    }
    if (opt === question.correctAnswer) return 'correct';
    if (selectedOption === opt) return 'wrong';
    return 'disabled';
  };

  return (
    <div className="question-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px' }}>
        <span>📍 {question.characterName} ({question.city})</span>
        <span>World {question.world + 1} • Diff {question.difficulty}</span>
      </div>

      {question.visual === 'circleDiagram' && (
        <div style={{ margin: '16px 0' }}>
          <CircleDiagram
            radiusValue={question.radius || 5}
            showDiameter={question.type?.includes('diameter')}
            size={220}
          />
        </div>
      )}

      <h3 className="question-text">{question.questionText}</h3>

      <div className="options-grid">
        {question.options &&
          question.options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`option-btn ${getOptionClass(opt)}`}
              onClick={() => handleOptionClick(opt)}
              disabled={isAnswered}
            >
              {opt}
            </button>
          ))}
      </div>

      <HintOverlay
        hint1={question.hint1}
        hint2={question.hint2}
        hintsUsed={hintsUsed}
        onUseHint={handleHintClick}
        explanation={question.explanation}
        isFailed={isAnswered && selectedOption !== question.correctAnswer}
      />
    </div>
  );
}

export default QuestionRenderer;
