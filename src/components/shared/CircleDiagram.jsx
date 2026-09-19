import React, { useRef, useState } from 'react';
import { roundMeasurement } from '../../utils/fractionsAndDecimalsMath.js';

export function FractionDecimalVisualizer({
  numerator = 3,
  denominator = 4,
  decimalValue = 0.75,
  visualType = 'fractionBar', // 'fractionBar' | 'numberLine' | 'decimalGrid'
  interactive = false,
  onChange,
  size = 280,
}) {
  const containerRef = useRef(null);
  const [activeFraction, setActiveFraction] = useState(numerator);

  const handleBarClick = (index) => {
    if (!interactive) return;
    const newNum = index + 1;
    setActiveFraction(newNum);
    if (onChange) onChange(newNum, denominator);
  };

  const dec = roundMeasurement(activeFraction / denominator, 3);
  const percent = roundMeasurement((activeFraction / denominator) * 100, 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: '100%', maxWidth: `${size + 40}px` }}>
      {/* 1. Fraction Bar Visualizer */}
      {visualType === 'fractionBar' && (
        <div style={{ width: '100%', background: 'rgba(10, 10, 46, 0.85)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--gold)' }}>
            <span>Fraction: <strong>{activeFraction}/{denominator}</strong></span>
            <span>Decimal: <strong>{dec}</strong> ({percent}%)</span>
          </div>

          <div style={{ display: 'flex', height: '48px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--purple-light)' }}>
            {Array.from({ length: denominator }).map((_, idx) => {
              const isFilled = idx < activeFraction;
              return (
                <div
                  key={idx}
                  onClick={() => handleBarClick(idx)}
                  style={{
                    flex: 1,
                    background: isFilled
                      ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))'
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRight: idx < denominator - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isFilled ? '#1a1a2e' : 'rgba(255, 255, 255, 0.3)',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                  }}
                >
                  1/{denominator}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Dual-Scale Number Line Visualizer */}
      {visualType === 'numberLine' && (
        <div style={{ width: '100%', background: 'rgba(10, 10, 46, 0.85)', padding: '20px 16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center' }}>
            Dual-Scale Number Line (0 to 1)
          </div>

          <div style={{ position: 'relative', width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
            {/* Base axis line */}
            <div style={{ width: '100%', height: '4px', background: 'var(--purple-light)', borderRadius: '2px' }} />

            {/* Indicator Marker */}
            <div
              style={{
                position: 'absolute',
                left: `${(activeFraction / denominator) * 100}%`,
                transform: 'translateX(-50%)',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--gold)',
                border: '3px solid #fff',
                boxShadow: '0 0 10px var(--gold)',
                transition: 'left 0.3s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>0.0</span>
            <span>0.25 ({1}/4)</span>
            <span>0.5 ({1}/2)</span>
            <span>0.75 ({3}/4)</span>
            <span>1.0</span>
          </div>
        </div>
      )}

      {/* Backwards compatibility helper text */}
      {interactive && (
        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          💡 Click any segment above to partition the fraction & observe the decimal value!
        </div>
      )}
    </div>
  );
}

// Export as CircleDiagram alias for backwards compatibility
export const CircleDiagram = FractionDecimalVisualizer;
export default FractionDecimalVisualizer;
