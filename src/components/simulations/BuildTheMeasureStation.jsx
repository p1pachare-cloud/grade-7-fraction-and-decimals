import React, { useState } from 'react';
import NumberPad from '../shared/NumberPad.jsx';
import {
  fractionToDecimal,
  roundMeasurement,
  roundToSignificantFigures,
  validateNumericAnswer,
} from '../../utils/fractionsAndDecimalsMath.js';

const STATION_C_CHALLENGES = [
  { num: 5, den: 8, factor: 3.2, sigFigs: 3, instruction: 'Step 1: Convert 5/8 to decimal (0.625).\nStep 2: Multiply 0.625 × 3.2 = 2.0.\nStep 3: Round to 3 sig figs.' },
  { num: 1, den: 3, factor: 12.0, sigFigs: 3, instruction: 'Step 1: Convert 1/3 to decimal (0.3333...).\nStep 2: Multiply 0.3333 × 12.0 = 4.0.\nStep 3: Round to 3 sig figs.' },
  { num: 7, den: 16, factor: 4.5, sigFigs: 2, instruction: 'Step 1: Convert 7/16 to decimal (0.4375).\nStep 2: Multiply 0.4375 × 4.5 = 1.96875.\nStep 3: Round to 2 sig figs (2.0).' },
];

export function BuildTheMeasureStation({ onStationComplete }) {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [userVal, setUserVal] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const challenge = STATION_C_CHALLENGES[challengeIdx];

  // Live Formula Calculations
  const decVal = fractionToDecimal(challenge.num, challenge.den);
  const rawProduct = decVal * challenge.factor;
  const targetRounded = roundToSignificantFigures(rawProduct, challenge.sigFigs);

  const handleSubmit = () => {
    const isCorrect = validateNumericAnswer(userVal, targetRounded, 0.01);
    if (isCorrect) {
      setIsSuccess(true);
      setFeedback(`✨ Perfect! ${challenge.num}/${challenge.den} × ${challenge.factor} = ${roundMeasurement(rawProduct, 4)}, rounded to ${challenge.sigFigs} sig figs is exactly ${targetRounded}!`);
    } else {
      setIsSuccess(false);
      setFeedback(`Not quite! Raw result is ${roundMeasurement(rawProduct, 4)}. When rounded to ${challenge.sigFigs} significant figures, it equals ${targetRounded}.`);
    }
  };

  const handleNext = () => {
    setFeedback('');
    setIsSuccess(false);
    setUserVal('');
    if (challengeIdx < STATION_C_CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
    } else {
      if (onStationComplete) onStationComplete(2);
    }
  };

  return (
    <div className="station-container" style={{ maxWidth: '800px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
        Station C: Multi-Step Chain & Precision Rounding Simulator
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', fontWeight: '600', marginBottom: '18px' }}>
        Challenge {challengeIdx + 1} of {STATION_C_CHALLENGES.length}
      </p>

      {/* Chain Formula Display */}
      <div style={{ background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.4)', borderRadius: '18px', padding: '20px', marginBottom: '22px', whiteSpace: 'pre-line', fontFamily: 'var(--font-display)', fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--gold)', fontWeight: '600' }}>
        {challenge.instruction}
      </div>

      {/* Live Computation Telemetry */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '22px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>1. Fraction → Decimal</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>{challenge.num}/{challenge.den} = {roundMeasurement(decVal, 3)}</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>2. Raw Product</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginTop: '4px' }}>{roundMeasurement(rawProduct, 4)}</div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>3. Target ({challenge.sigFigs} Sig Figs)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--green-light)', marginTop: '4px' }}>{targetRounded}</div>
        </div>
      </div>

      {/* Answer Input Pad */}
      <div style={{ fontSize: '2.1rem', fontWeight: '800', margin: '20px 0', color: '#fff', textAlign: 'center' }}>
        Rounded Answer: <span style={{ color: 'var(--gold)', borderBottom: '3px dashed var(--gold)', padding: '0 14px' }}>{userVal || '?'}</span>
      </div>

      <NumberPad value={userVal} onChange={setUserVal} onSubmit={handleSubmit} disabled={isSuccess} />

      {/* Feedback & Actions */}
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
            marginTop: '22px',
          }}
        >
          {feedback}
        </div>
      )}

      {isSuccess && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button type="button" className="btn btn-green btn-lg" onClick={handleNext}>
            {challengeIdx < STATION_C_CHALLENGES.length - 1 ? 'Next Chain Challenge ➜' : 'Complete All Stations 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}

export default BuildTheMeasureStation;
