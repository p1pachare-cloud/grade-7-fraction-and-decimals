import React, { useState } from 'react';
import FractionsAndDecimalsExplorerStation from '../simulations/FractionsAndDecimalsExplorerStation.jsx';
import FractionsAndDecimalsOperationsStation from '../simulations/FractionsAndDecimalsOperationsStation.jsx';
import BuildTheMeasureStation from '../simulations/BuildTheMeasureStation.jsx';

export function SimulatePhase({ stationsComplete = [false, false, false], onStationComplete, onNextPhase }) {
  const [activeStation, setActiveStation] = useState(0);

  const handleCompleteStation = (index) => {
    if (onStationComplete) onStationComplete(index);
    if (index < 2) {
      setActiveStation(index + 1);
    }
  };

  const allDone = stationsComplete.every(Boolean);

  return (
    <div className="simulate-phase">
      <div className="simulate-header">
        <div className="simulate-label">Phase 3: Interactive Simulation Stations</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Complete all 3 simulation stations to unlock IntelliPlay™!
        </p>
      </div>

      <div className="station-tabs">
        <button
          type="button"
          className={`station-tab ${activeStation === 0 ? 'active' : ''} ${stationsComplete[0] ? 'complete' : ''}`}
          onClick={() => setActiveStation(0)}
        >
          {stationsComplete[0] ? '✓ ' : ''}Station A: Explorer
        </button>
        <button
          type="button"
          className={`station-tab ${activeStation === 1 ? 'active' : ''} ${stationsComplete[1] ? 'complete' : ''}`}
          onClick={() => setActiveStation(1)}
        >
          {stationsComplete[1] ? '✓ ' : ''}Station B: Operations
        </button>
        <button
          type="button"
          className={`station-tab ${activeStation === 2 ? 'active' : ''} ${stationsComplete[2] ? 'complete' : ''}`}
          onClick={() => setActiveStation(2)}
        >
          {stationsComplete[2] ? '✓ ' : ''}Station C: Build Measure
        </button>
      </div>

      {activeStation === 0 && (
        <FractionsAndDecimalsExplorerStation onStationComplete={() => handleCompleteStation(0)} />
      )}

      {activeStation === 1 && (
        <FractionsAndDecimalsOperationsStation onStationComplete={() => handleCompleteStation(1)} />
      )}

      {activeStation === 2 && (
        <BuildTheMeasureStation onStationComplete={() => handleCompleteStation(2)} />
      )}

      {allDone && (
        <div style={{ marginTop: '24px' }}>
          <button type="button" className="btn btn-green btn-lg" onClick={onNextPhase}>
            Proceed to Practice Phase (IntelliPlay™) 🎮
          </button>
        </div>
      )}
    </div>
  );
}

export default SimulatePhase;
