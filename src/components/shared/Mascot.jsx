import React from 'react';

export function Mascot({ mood = 'idle', speech = '', onClick }) {
  const getEmoji = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
        return '🤖✨';
      case 'thinking':
        return '🤖❓';
      case 'encouraging':
        return '🤖💪';
      default:
        return '🤖';
    }
  };

  return (
    <div className="mascot-container" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={`mascot ${mood}`}>
        <span>{getEmoji()}</span>
      </div>
      {speech && (
        <div className="speech-bubble">
          <p>{speech}</p>
        </div>
      )}
    </div>
  );
}

export default Mascot;
