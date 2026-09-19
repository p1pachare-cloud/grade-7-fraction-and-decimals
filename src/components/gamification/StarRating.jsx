import React from 'react';

export function StarRating({ stars = 0, maxStars = 3, size = '1.2rem' }) {
  const starArray = Array.from({ length: maxStars });

  return (
    <div style={{ display: 'inline-flex', gap: '4px', fontSize: size }}>
      {starArray.map((_, index) => (
        <span key={index} style={{ opacity: index < stars ? 1 : 0.25, color: '#ffc107', transition: 'all 0.3s ease' }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
