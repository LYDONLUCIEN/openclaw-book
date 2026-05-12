import React from 'react';

interface CmLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * China Mobile simplified blue logo mark
 * Uses currentColor to adapt to theme
 */
const CmLogo: React.FC<CmLogoProps> = ({ className, width = 32, height = 32 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* China Mobile simplified logo - stylized "C" with mobile signal waves */}
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" fill="none" />
    <path
      d="M20 8 C12 8, 8 14, 8 20 C8 26, 12 32, 20 32"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M24 12 C28 14, 30 17, 30 20 C30 23, 28 26, 24 28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
  </svg>
);

export default CmLogo;
