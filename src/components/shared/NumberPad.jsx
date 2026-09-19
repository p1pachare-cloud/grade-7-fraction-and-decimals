import React from 'react';
import { playClickSound } from '../../utils/soundEffects.js';

export function NumberPad({ value = '', onChange, onSubmit, disabled = false }) {
  const handleNumClick = (num) => {
    if (disabled) return;
    if (num === '.' && value.includes('.')) return;
    playClickSound();
    onChange(value + num);
  };

  const handleBackspace = () => {
    if (disabled) return;
    playClickSound();
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    playClickSound();
    onChange('');
  };

  const handleSubmit = () => {
    playClickSound();
    if (onSubmit) onSubmit();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div className="number-pad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((n) => (
          <button
            key={n}
            type="button"
            className="num-pad-btn"
            onClick={() => handleNumClick(n)}
            disabled={disabled}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className="num-pad-btn"
          style={{ color: '#ef5350' }}
          onClick={handleBackspace}
          disabled={disabled}
        >
          ⌫
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handleClear}
          disabled={disabled || !value}
        >
          Clear
        </button>
        {onSubmit && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={disabled || !value}
          >
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}

export default NumberPad;
