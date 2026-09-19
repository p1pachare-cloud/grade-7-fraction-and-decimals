import React, { useState } from 'react';
import {
  fractionToDecimal,
  isTerminatingDenominator,
  roundMeasurement,
  simplifyFraction,
  validateNumericAnswer,
} from '../../utils/fractionsAndDecimalsMath.js';
import { playSliderTick, playCorrectSound, playWrongSound, playClickSound } from '../../utils/soundEffects.js';

const STATION_A_CHALLENGES = [
  { targetDecimal: 0.75, description: 'Adjust sliders to build a fraction equal to 0.75 (e.g., 3/4, 6/8)' },
  { targetDecimal: 0.4, description: 'Adjust sliders to build a fraction equal to 0.4 (e.g., 2/5, 4/10)' },
  { targetDecimal: 0.625, description: 'Adjust sliders to build a fraction equal to 0.625 (e.g., 5/8)' },
  { isRecurringTarget: true, description: 'Adjust sliders to build any RECURRING decimal fraction (e.g., 1/3, 2/3, 1/6)' },
];

export function FractionsAndDecimalsExplorerStation({ onStationComplete }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const challenge = STATION_A_CHALLENGES[roundIdx];

  // Live Math Computations
  const liveDecimal = fractionToDecimal(numerator, denominator);
  const roundedDec = roundMeasurement(liveDecimal, 4);
  const isTerminating = isTerminatingDenominator(denominator);
  const simplified = simplifyFraction(numerator, denominator);

  const handleCheck = () => {
    let correct = false;
    if (challenge.isRecurringTarget) {
      correct = !isTerminating;
    } else {
      correct = validateNumericAnswer(liveDecimal, challenge.targetDecimal, 0.005);
    }

    if (correct) {
      playCorrectSound();
      setIsSuccess(true);
      setFeedback(`🎉 Excellent! ${numerator}/${denominator} = ${roundedDec} matches the mathematical target!`);
    } else {
      playWrongSound();
      setIsSuccess(false);
      setFeedback(`Not quite target match. Current value is ${roundedDec}. Keep adjusting sliders!`);
    }
  };

  const handleNextRound = () => {
    playClickSound();
    setFeedback('');
    setIsSuccess(false);
    if (roundIdx < STATION_A_CHALLENGES.length - 1) {
      setRoundIdx((prev) => prev + 1);
    } else {
      if (onStationComplete) onStationComplete(0);
    }
  };

  return (
    <div className="station-container" style={{ maxWidth: '800px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
        Station A: Live Formula-Driven Converter & Visualizer
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', fontWeight: '600', marginBottom: '20px' }}>
        Challenge {roundIdx + 1} of {STATION_A_CHALLENGES.length}: <strong style={{ color: '#fff' }}>{challenge.description}</strong>
      </p>

      {/* Sliders for Numerator & Denominator */}
      <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '22px' }}>
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>
            <span>Numerator (a): <strong style={{ color: 'var(--gold)', fontSize: '1.3rem' }}>{numerator}</strong></span>
          </div>
          <input
            type="range"
            min="1"
            max="16"
            value={numerator}
            onChange={(e) => {
              playSliderTick();
              setNumerator(Number(e.target.value));
              setIsSuccess(false);
            }}
            style={{ width: '100%', height: '8px', accentColor: 'var(--gold)', cursor: 'pointer' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>
            <span>Denominator (b): <strong style={{ color: 'var(--gold)', fontSize: '1.3rem' }}>{denominator}</strong></span>
          </div>
          <input
            type="range"
            min="2"
            max="20"
            value={denominator}
            onChange={(e) => {
              playSliderTick();
              setDenominator(Number(e.target.value));
              setIsSuccess(false);
            }}
            style={{ width: '100%', height: '8px', accentColor: 'var(--gold)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Live Formula Computation Readout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '22px' }}>
        <div style={{ background: 'rgba(255, 193, 7, 0.12)', border: '1px solid rgba(255, 193, 7, 0.35)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>Fraction Value</div>
          <div style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--gold)', margin: '4px 0' }}>{numerator} / {denominator}</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Simplified: {simplified.num}/{simplified.den}</div>
        </div>

        <div style={{ background: 'rgba(76, 175, 80, 0.12)', border: '1px solid rgba(76, 175, 80, 0.35)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>Computed Decimal</div>
          <div style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--green-light)', margin: '4px 0' }}>{roundedDec}</div>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{(liveDecimal * 100).toFixed(1)}%</div>
        </div>

        <div style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.35)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-muted)' }}>Decimal Type</div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', margin: '4px 0' }}>
            {isTerminating ? 'Terminating ⏹️' : 'Recurring 🔄'}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-muted)' }}>Factors: {isTerminating ? '2, 5 only' : 'contains non-2/5'}</div>
        </div>
      </div>

      {/* Live Shaded Visualizer: 10x10 Decimal Grid */}
      <div style={{ background: 'rgba(10, 10, 46, 0.85)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '22px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center' }}>
          Live 100-Cell Decimal Grid Model ({Math.min(100, Math.round(liveDecimal * 100))}/100 cells shaded)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '3px', maxWidth: '280px', margin: '0 auto' }}>
          {Array.from({ length: 100 }).map((_, i) => {
            const isShaded = i < Math.min(100, Math.round(liveDecimal * 100));
            return (
              <div
                key={i}
                style={{
                  height: '24px',
                  background: isShaded ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'rgba(255,255,255,0.06)',
                  borderRadius: '3px',
                  transition: 'background 0.15s ease',
                }}
              />
            );
          })}
        </div>
      </div>

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
            marginBottom: '20px',
          }}
        >
          {feedback}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        {!isSuccess ? (
          <button type="button" className="btn btn-primary" onClick={handleCheck}>
            Verify Math Target 🔍
          </button>
        ) : (
          <button type="button" className="btn btn-green btn-lg" onClick={handleNextRound}>
            {roundIdx < STATION_A_CHALLENGES.length - 1 ? 'Next Challenge ➜' : 'Complete Station A 🏆'}
          </button>
        )}
      </div>
    </div>
  );
}

export default FractionsAndDecimalsExplorerStation;
