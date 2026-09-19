import React from 'react';

export function IntroScreen({ onStart }) {
  const handleCardClick = (phaseId) => {
    if (onStart) onStart(phaseId);
  };

  return (
    <div className="intro-screen">
      {/* Top Badge Pill */}
      <div className="home-top-badge">
        ✨ Grade 7 Math
      </div>

      {/* Main Headline */}
      <h1 className="home-main-title">
        Fractions & Decimals
      </h1>

      {/* Subhead in Coral */}
      <div className="home-subtitle">
        Converting, Operations & Precision Rounding!
      </div>

      {/* Description Glass Container */}
      <div className="home-desc-card">
        Let's master converting fractions to decimals, mixed operations, comparing, and precision rounding across the Cyber Grid! 🚀
      </div>

      {/* 5 Feature Cards Grid */}
      <div className="home-cards-grid">
        <div className="home-card" onClick={() => handleCardClick('wonder')}>
          <div className="home-card-icon">🤔</div>
          <div className="home-card-title">Wonder</div>
          <div className="home-card-subtitle">A math mystery!</div>
        </div>

        <div className="home-card" onClick={() => handleCardClick('story')}>
          <div className="home-card-icon">📖</div>
          <div className="home-card-title">Story</div>
          <div className="home-card-subtitle">Global Cyber-Grid</div>
        </div>

        <div className="home-card" onClick={() => handleCardClick('simulate')}>
          <div className="home-card-icon">🧪</div>
          <div className="home-card-title">Simulate</div>
          <div className="home-card-subtitle">3 Station Sandbox</div>
        </div>

        <div className="home-card" onClick={() => handleCardClick('play')}>
          <div className="home-card-icon">🎮</div>
          <div className="home-card-title">Practice</div>
          <div className="home-card-subtitle">Global World Quiz</div>
        </div>

        <div className="home-card" onClick={() => handleCardClick('reflect')}>
          <div className="home-card-icon">📓</div>
          <div className="home-card-title">Reflect</div>
          <div className="home-card-subtitle">Journal & Badges</div>
        </div>
      </div>

      {/* Main CTA Button */}
      <button type="button" className="home-cta-btn" onClick={() => handleCardClick('wonder')}>
        🚀 Begin Your Journey!
      </button>

      {/* Bottom Feature Pill Badges */}
      <div className="home-tags-row">
        <div className="home-tag-pill">
          <span>🎯</span>
          <span>100+ Questions</span>
        </div>
        <div className="home-tag-pill">
          <span>🔢</span>
          <span>Fractions & Decimals</span>
        </div>
        <div className="home-tag-pill">
          <span>🏆</span>
          <span>Badges & XP</span>
        </div>
      </div>
    </div>
  );
}

export default IntroScreen;
