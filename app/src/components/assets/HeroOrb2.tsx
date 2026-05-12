import React from 'react';

interface HeroOrb2Props {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Large gradient orb - cyan to transparent
 * Used as decorative background element on cover/thank-you slides
 */
const HeroOrb2: React.FC<HeroOrb2Props> = ({ className, width = 400, height = 400 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="hero-orb-2-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--secondary, #00B4D8)" stopOpacity="0.4" />
        <stop offset="60%" stopColor="var(--secondary, #00B4D8)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="var(--secondary, #00B4D8)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="200" cy="200" r="200" fill="url(#hero-orb-2-gradient)" />
  </svg>
);

export default HeroOrb2;
