import React, { useState } from 'react';
import FractionDecimalVisualizer from '../shared/CircleDiagram.jsx';
import Mascot from '../shared/Mascot.jsx';

export function WonderPhase({ onNext }) {
  const [activeNum, setActiveNum] = useState(3);
  const [tested, setTested] = useState(false);

  return (
    <div className="wonder-phase">
      <div className="wonder-content">
        <div className="wonder-qmark">
          <span className="wonder-qmark-icon">?</span>
        </div>

        <div className="wonder-question-card">
          <div className="wonder-question-text">
            "Why does 1/3 equal 0.333... forever as an infinite recurring decimal, while 1/4 terminates cleanly at 0.25?"
          </div>

          <div style={{ margin: '20px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <FractionDecimalVisualizer
              numerator={activeNum}
              denominator={4}
              visualType="fractionBar"
              interactive={true}
              onChange={(n) => {
                setActiveNum(n);
                setTested(true);
              }}
              size={320}
            />
          </div>

          <Mascot
            mood={tested ? 'happy' : 'thinking'}
            speech={
              tested
                ? `You selected ${activeNum}/4 = ${(activeNum / 4).toFixed(2)}! Notice how fraction parts map cleanly into decimals!`
                : "Click any segment in the fraction bar above to test how fractions convert to decimals!"
            }
          />

          <div style={{ marginTop: '20px' }}>
            <button type="button" className="btn btn-primary btn-lg" onClick={onNext}>
              Discover Story Phase ➜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WonderPhase;
