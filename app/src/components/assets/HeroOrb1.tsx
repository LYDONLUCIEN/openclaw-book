import React from 'react';

interface HeroOrb1Props {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Large gradient orb - blue to cyan
 * Used as decorative background element on cover/thank-you slides
 */
const HeroOrb1: React.FC<HeroOrb1Props> = ({ className, width = 500, height = 500 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="hero-orb-1-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--primary, #0066CC)" stopOpacity="0.5" />
        <stop offset="50%" stopColor="var(--secondary, #00B4D8)" stopOpacity="0.25" />
        <stop offset="100%" stopColor="var(--secondary, #00B4D8)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="250" cy="250" r="250" fill="url(#hero-orb-1-gradient)" />
  </svg>
);

export default HeroOrb1;
