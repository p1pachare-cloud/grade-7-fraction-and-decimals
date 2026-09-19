import React, { useState } from 'react';
import WorldMap from '../gamification/WorldMap.jsx';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import StarRating from '../gamification/StarRating.jsx';
import { calcStars, calcXP } from '../../utils/scoring.js';
import { generateProceduralQuizRound } from '../../utils/proceduralMathEngine.js';
import { playVictorySound } from '../../utils/soundEffects.js';

export function PlayPhase({
  worldScores = [],
  currentWorld = 0,
  xp = 0,
  streak = 0,
  onWorldSelect,
  onRecordWorldScore,
  onAnswerResult,
  onNextPhase,
}) {
  const [isPlayingQuiz, setIsPlayingQuiz] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [worldCompleteSummary, setWorldCompleteSummary] = useState(null);

  const startWorldQuiz = (worldId) => {
    onWorldSelect(worldId);
    // Procedural question synthesis per session attempt
    const selected = generateProceduralQuizRound(worldId, 10);
    setCurrentQuestions(selected);
    setCurrentQIndex(0);
    setCorrectCount(0);
    setHintsUsed(0);
    setIsPlayingQuiz(true);
    setWorldCompleteSummary(null);
  };

  const handleAnswer = ({ isCorrect, attemptCount }) => {
    const xpEarned = isCorrect ? calcXP(attemptCount, hintsUsed, streak) : 0;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    onAnswerResult({ isCorrect, xpEarned });

    const q = currentQuestions[currentQIndex];
    setFeedback({
      isCorrect,
      xpEarned,
      message: isCorrect ? 'Spot On Cyber-Grid Signal!' : 'Check the Math Protocol!',
      subMessage: isCorrect
        ? `You earned +${xpEarned} XP!`
        : `Correct Answer: ${q.correctAnswer}`,
      explanation: q.explanation,
    });
  };

  const handleContinueFeedback = () => {
    setFeedback(null);
    setHintsUsed(0);

    if (currentQIndex < currentQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // World Quiz Complete!
      const finalScore = feedback?.isCorrect ? correctCount + 1 : correctCount;
      if (finalScore >= 5) {
        playVictorySound();
      }
      onRecordWorldScore(currentWorld, finalScore);
      setWorldCompleteSummary({
        score: finalScore,
        total: currentQuestions.length,
        stars: calcStars(finalScore),
        isBossLevel: currentWorld === 4 || currentWorld === 9,
      });
      setIsPlayingQuiz(false);
    }
  };

  return (
    <div className="play-phase">
      {!isPlayingQuiz && !worldCompleteSummary && (
        <>
          <div className="play-header">
            <h2 className="play-title">Global Cyber-Grid League (10 Worlds)</h2>
            <p className="play-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontWeight: '600', maxWdith: '650px', margin: '0 auto' }}>
              Procedural challenges on fraction-decimal conversions, operations, terminating/recurring, and sig figs!
            </p>
          </div>

          <WorldMap
            worldScores={worldScores}
            currentWorld={currentWorld}
            onSelectWorld={startWorldQuiz}
          />

          <div style={{ marginTop: '24px' }}>
            <button type="button" className="btn btn-outline btn-lg" onClick={onNextPhase}>
              Go to Reflect Phase 📝
            </button>
          </div>
        </>
      )}

      {isPlayingQuiz && currentQuestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ margin: '14px 0', fontSize: '1.15rem', color: 'var(--gold-light)', fontWeight: '700' }}>
            {(currentWorld === 4 || currentWorld === 9) ? '🔥 BOSS MILESTONE CHALLENGE • ' : ''}
            Question {currentQIndex + 1} of {currentQuestions.length} • World {currentWorld + 1}
          </div>

          <QuestionRenderer
            question={currentQuestions[currentQIndex]}
            onAnswer={handleAnswer}
            hintsUsed={hintsUsed}
            onUseHint={() => setHintsUsed((prev) => Math.min(2, prev + 1))}
          />

          {feedback && (
            <FeedbackOverlay
              isCorrect={feedback.isCorrect}
              message={feedback.message}
              subMessage={feedback.subMessage}
              xpEarned={feedback.xpEarned}
              explanation={feedback.explanation}
              onContinue={handleContinueFeedback}
            />
          )}
        </div>
      )}

      {worldCompleteSummary && (
        <div className="world-complete-card">
          <div className="world-complete-icon">{worldCompleteSummary.isBossLevel ? '👑' : '🏆'}</div>
          <h2 className="world-complete-title">
            {worldCompleteSummary.isBossLevel ? 'Boss Milestone Defeated!' : `World ${currentWorld + 1} Complete!`}
          </h2>
          <div className="world-complete-score">
            {worldCompleteSummary.score} / {worldCompleteSummary.total} Correct
          </div>
          <StarRating stars={worldCompleteSummary.stars} size="2.5rem" />

          <div style={{ margin: '20px 0' }}>
            {worldCompleteSummary.score >= 5 ? (
              <p style={{ color: 'var(--green-light)', fontWeight: '600' }}>
                🎉 Outstanding! Cyber-grid node calibrated. Next world unlocked!
              </p>
            ) : (
              <p style={{ color: 'var(--red-light)' }}>
                Score at least 5/10 to unlock the next world. Try again!
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button type="button" className="btn btn-primary" onClick={() => setWorldCompleteSummary(null)}>
              Back to World Map 🗺️
            </button>
            {worldCompleteSummary.score >= 5 && currentWorld < 9 && (
              <button type="button" className="btn btn-green" onClick={() => startWorldQuiz(currentWorld + 1)}>
                Next World ➜
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayPhase;
