import React, { useState } from 'react';
import FractionDecimalVisualizer from '../shared/CircleDiagram.jsx';
import Mascot from '../shared/Mascot.jsx';

export function WonderPhase({ onNext }) {
  const [activeNum, setActiveNum] = useState(3);
  const [tested, setTested] = useState(false);

  return (
    <div className="wonder-phase">
      <div className="wonder-content">
        <div className="wonder-question-card">
          <div className="wonder-header-badge">
            <span>❓</span>
            <span>WONDER HOOK • MATH MYSTERY</span>
          </div>

          <div className="wonder-question-text">
            "Why does 1/3 equal 0.333... forever as an infinite recurring decimal, while 1/4 terminates cleanly at 0.25?"
          </div>

          <div style={{ margin: '6px 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <FractionDecimalVisualizer
              numerator={activeNum}
              denominator={4}
              visualType="fractionBar"
              interactive={true}
              onChange={(n) => {
                setActiveNum(n);
                setTested(true);
              }}
              size={250}
            />
          </div>

          <div style={{ margin: '6px 0', width: '100%' }}>
            <Mascot
              mood={tested ? 'happy' : 'thinking'}
              speech={
                tested
                  ? `You selected ${activeNum}/4 = ${(activeNum / 4).toFixed(2)}! Notice how fraction parts map cleanly into decimals!`
                  : "Click any segment in the fraction bar above to test how fractions convert to decimals!"
              }
            />
          </div>

          <div style={{ marginTop: '8px' }}>
            <button type="button" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.92rem', fontWeight: '800' }} onClick={onNext}>
              Discover Story Phase ➜
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WonderPhase;
