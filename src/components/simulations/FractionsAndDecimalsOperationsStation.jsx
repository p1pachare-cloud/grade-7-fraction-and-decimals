import React, { useState } from 'react';
import {
  computeMixedOperation,
  fractionToDecimal,
  roundMeasurement,
  validateNumericAnswer,
} from '../../utils/fractionsAndDecimalsMath.js';

const STATION_B_CHALLENGES = [
  { num: 3, den: 4, dec: 0.5, op: '+', targetResult: 1.25, instruction: 'Calculate: 3/4 + 0.5 = ?' },
  { num: 4, den: 5, dec: 0.3, op: '−', targetResult: 0.5, instruction: 'Calculate: 4/5 − 0.3 = ?' },
  { num: 1, den: 2, dec: 0.8, op: '×', targetResult: 0.4, instruction: 'Calculate: 1/2 × 0.8 = ?' },
  { num: 3, den: 5, dec: 0.2, op: '÷', targetResult: 3.0, instruction: 'Calculate: 3/5 ÷ 0.2 = ?' },
];

export function FractionsAndDecimalsOperationsStation({ onStationComplete }) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const challenge = STATION_B_CHALLENGES[challengeIdx];

  // Live Formula Computation
  const fracVal = fractionToDecimal(challenge.num, challenge.den);

  const handleVerify = () => {
    const isCorrect = validateNumericAnswer(userAnswer, challenge.targetResult, 0.01);
    if (isCorrect) {
      setIsSuccess(true);
      setFeedback(`✨ Spot on! ${challenge.num}/${challenge.den} (${roundMeasurement(fracVal, 2)}) ${challenge.op} ${challenge.dec} = ${challenge.targetResult}!`);
    } else {
      setIsSuccess(false);
      setFeedback(`Not quite correct. Convert ${challenge.num}/${challenge.den} to ${roundMeasurement(fracVal, 2)}, then compute ${roundMeasurement(fracVal, 2)} ${challenge.op} ${challenge.dec}.`);
    }
  };

  const handleNextChallenge = () => {
    setFeedback('');
    setIsSuccess(false);
    setUserAnswer('');
    if (challengeIdx < STATION_B_CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
    } else {
      if (onStationComplete) onStationComplete(1);
    }
  };

  return (
    <div className="station-container" style={{ maxWidth: '800px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
        Station B: Mixed Fraction-Decimal Operations Simulator
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', fontWeight: '600', marginBottom: '20px' }}>
        Challenge {challengeIdx + 1} of {STATION_B_CHALLENGES.length}: <strong style={{ color: '#fff' }}>{challenge.instruction}</strong>
      </p>

      {/* Interactive Operands Display */}
      <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '22px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', fontSize: '2.2rem', fontWeight: '800' }}>
          <div style={{ padding: '10px 20px', borderRadius: '14px', background: 'rgba(255, 193, 7, 0.18)', border: '1.5px solid rgba(255, 193, 7, 0.45)', color: 'var(--gold)' }}>
            {challenge.num}/{challenge.den}
            <div style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-muted)', marginTop: '2px' }}>({roundMeasurement(fracVal, 2)})</div>
          </div>

          <div style={{ color: '#fff', fontSize: '2.4rem', fontWeight: '800' }}>{challenge.op}</div>

          <div style={{ padding: '10px 20px', borderRadius: '14px', background: 'rgba(76, 175, 80, 0.18)', border: '1.5px solid rgba(76, 175, 80, 0.45)', color: 'var(--green-light)' }}>
            {challenge.dec}
          </div>

          <div style={{ color: '#fff', fontSize: '2.4rem', fontWeight: '800' }}>=</div>

          <input
            type="number"
            step="0.01"
            value={userAnswer}
            onChange={(e) => { setUserAnswer(e.target.value); setIsSuccess(false); }}
            placeholder="Result"
            style={{
              width: '140px',
              padding: '12px',
              borderRadius: '14px',
              border: '2px solid var(--gold)',
              background: 'rgba(10, 10, 46, 0.95)',
              color: '#fff',
              fontSize: '1.8rem',
              fontWeight: '800',
              textAlign: 'center',
            }}
          />
        </div>
      </div>

      {/* Visual Live Comparison Bars */}
      <div style={{ background: 'rgba(10, 10, 46, 0.85)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '22px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '14px', textAlign: 'center' }}>
          Visual Split-Apart Proportion Model
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '90px', fontSize: '1.05rem', fontWeight: '700', color: 'var(--gold)' }}>{challenge.num}/{challenge.den}:</span>
            <div style={{ flex: 1, height: '20px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (fracVal / 2) * 100)}%`, height: '100%', background: 'var(--gold)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '90px', fontSize: '1.05rem', fontWeight: '700', color: 'var(--green-light)' }}>{challenge.dec}:</span>
            <div style={{ flex: 1, height: '20px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (challenge.dec / 2) * 100)}%`, height: '100%', background: 'var(--green-light)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback & Navigation */}
      {feedback && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            background: isSuccess ? 'rgba(76, 175, 80, 0.25)' : 'rgba(239, 83, 80, 0.25)',
            border: isSuccess ? '1.5px solid rgba(76, 175, 80, 0.5)' : '1.5px solid rgba(239, 83, 80, 0.5)',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: '600',
            lineHeight: '1.5',
            marginBottom: '20px',
          }}
        >
          {feedback}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        {!isSuccess ? (
          <button type="button" className="btn btn-primary" onClick={handleVerify} disabled={!userAnswer}>
            Verify Operations Result 🔍
          </button>
        ) : (
          <button type="button" className="btn btn-green btn-lg" onClick={handleNextChallenge}>
            {challengeIdx < STATION_B_CHALLENGES.length - 1 ? 'Next Challenge ➜' : 'Complete Station B 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}

export default FractionsAndDecimalsOperationsStation;
