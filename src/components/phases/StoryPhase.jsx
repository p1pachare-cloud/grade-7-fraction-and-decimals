import React, { useState } from 'react';
import { storyPanels } from '../../data/storyContent.js';
import FractionDecimalVisualizer from '../shared/CircleDiagram.jsx';

import { playClickSound } from '../../utils/soundEffects.js';

export function StoryPhase({ onNext, onPanelChange }) {
  const [panelIndex, setPanelIndex] = useState(0);

  const panel = storyPanels[panelIndex];

  const handleNextPanel = () => {
    playClickSound();
    if (panelIndex < storyPanels.length - 1) {
      const nextIdx = panelIndex + 1;
      setPanelIndex(nextIdx);
      if (onPanelChange) onPanelChange(nextIdx);
    } else {
      if (onNext) onNext();
    }
  };

  const handlePrevPanel = () => {
    playClickSound();
    if (panelIndex > 0) {
      const prevIdx = panelIndex - 1;
      setPanelIndex(prevIdx);
      if (onPanelChange) onPanelChange(prevIdx);
    }
  };

  const numerators = [1, 3, 1, 1, 3, 3];
  const denominators = [1, 8, 3, 2, 4, 4];

  return (
    <div className="story-phase">
      <div className="story-main-card">
        {/* Left Column: Hero Image & Overlay Visualizer */}
        <div className="story-left-col">
          {panel.image && (
            <img
              src={panel.image}
              alt={panel.title}
              className="story-hero-img"
            />
          )}

          {/* Location / Character Pill Badge */}
          <div className="story-badge-tag">
            📍 {panel.city} • {panel.characterName}
          </div>

          {/* Live Math Visualizer Floating Card */}
          <div className="story-overlay-visualizer">
            <FractionDecimalVisualizer
              numerator={numerators[panelIndex] || 3}
              denominator={denominators[panelIndex] || 4}
              visualType={panelIndex % 2 === 1 ? 'numberLine' : 'fractionBar'}
              size={220}
            />
          </div>
        </div>

        {/* Right Column: Title, Narrative Text, Highlight & Control Bar */}
        <div className="story-right-col">
          <div className="story-content-body">
            <h2 className="story-hero-title">
              {panel.title} {panel.icon}
            </h2>
            <p className="story-hero-text">
              {panel.text}
            </p>

            <div className="story-hero-highlight">
              <span className="story-hero-highlight-text">
                💡 {panel.highlight}
              </span>
            </div>
          </div>

          {/* Bottom In-Card Controls Bar */}
          <div className="story-bottom-controls">
            <button
              type="button"
              className="story-btn-prev"
              onClick={handlePrevPanel}
              disabled={panelIndex === 0}
            >
              ← Prev
            </button>

            <div className="story-nav-progress">
              <div className="story-nav-dots">
                {storyPanels.map((_, idx) => (
                  <span
                    key={idx}
                    className={`story-nav-dot ${idx === panelIndex ? 'active' : ''}`}
                    onClick={() => {
                      setPanelIndex(idx);
                      if (onPanelChange) onPanelChange(idx);
                    }}
                  />
                ))}
              </div>
              <span className="story-nav-count">{panelIndex + 1} / {storyPanels.length}</span>
            </div>

            <button
              type="button"
              className="story-btn-next"
              onClick={handleNextPanel}
            >
              {panelIndex < storyPanels.length - 1 ? 'Next Panel →' : 'Enter Simulation Phase 🧪'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryPhase;
