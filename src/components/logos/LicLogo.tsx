import React from 'react';

interface LogoProps {
  className?: string;
  height?: number | string;
}

export const LicLogo: React.FC<LogoProps> = ({ className = 'h-12 w-auto', height }) => {
  return (
    <svg
      viewBox="0 0 420 190"
      className={className}
      style={height ? { height } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LIC - Life Insurance Corporation of India Logo"
    >
      {/* Outer border & white background */}
      <rect x="1" y="1" width="418" height="188" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      
      {/* Top Blue Block (Left) */}
      <path
        d="M 6 6 L 165 6 L 165 142 L 6 142 Z"
        fill="#004A99"
      />

      {/* Blue Pill / Enclosure for hands */}
      <rect x="25" y="16" width="115" height="116" rx="57.5" fill="none" stroke="#FFFFFF" strokeWidth="4" />

      {/* Flame / Diya (center top inside hands) */}
      {/* Flame flame tip */}
      <path
        d="M 82.5 35 C 80 43 75 50 75 58 C 75 64 78 68 82.5 70 C 87 68 90 64 90 58 C 90 50 85 43 82.5 35 Z"
        fill="#FFFFFF"
      />
      {/* Diya Lamp Base */}
      <path
        d="M 72 70 C 72 75 93 75 93 70 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 78 74 L 87 74 L 85 79 L 80 79 Z"
        fill="#FFFFFF"
      />

      {/* Left Hand cupping flame */}
      <path
        d="M 46 62 C 46 62 48 50 51 46 C 53 43 56 45 55 49 L 52 64 C 52 64 56 50 58 46 C 60 43 63 45 62 50 L 59 66 C 59 66 64 52 66 49 C 68 46 71 49 69 54 L 66 70 C 66 70 70 59 72 57 C 74 55 76 57 75 61 L 72 77 C 71 85 64 94 58 97 L 46 92 C 43 88 42 77 46 62 Z"
        fill="#FFFFFF"
      />

      {/* Right Hand cupping flame */}
      <path
        d="M 119 62 C 119 62 117 50 114 46 C 112 43 109 45 110 49 L 113 64 C 113 64 109 50 107 46 C 105 43 102 45 103 50 L 106 66 C 106 66 101 52 99 49 C 97 46 94 49 96 54 L 99 70 C 99 70 95 59 93 57 C 91 55 89 57 90 61 L 93 77 C 94 85 101 94 107 97 L 119 92 C 122 88 123 77 119 62 Z"
        fill="#FFFFFF"
      />

      {/* Top Yellow Block (Right) */}
      <path
        d="M 165 6 L 414 6 L 414 142 L 165 142 Z"
        fill="#FFC709"
      />

      {/* Large Bold "LIC" Text */}
      <text
        x="289"
        y="108"
        fill="#004A99"
        fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
        fontSize="106"
        fontWeight="800"
        letterSpacing="-2"
        textAnchor="middle"
      >
        LIC
      </text>

      {/* Bottom White Bar separator line */}
      <line x1="6" y1="142" x2="414" y2="142" stroke="#CBD5E1" strokeWidth="1" />

      {/* Bottom Text: LIFE INSURANCE CORPORATION OF INDIA */}
      <text
        x="210"
        y="170"
        fill="#004A99"
        fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
        fontSize="17"
        fontWeight="700"
        letterSpacing="1.2"
        textAnchor="middle"
      >
        LIFE INSURANCE CORPORATION OF INDIA
      </text>
    </svg>
  );
};
