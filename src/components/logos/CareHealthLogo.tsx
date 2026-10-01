import React from 'react';

interface LogoProps {
  className?: string;
  height?: number | string;
}

export const CareHealthLogo: React.FC<LogoProps> = ({ className = 'h-12 w-auto', height }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      style={height ? { height } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Care Health Insurance Logo"
    >
      {/* Outer border & white background */}
      <rect x="1" y="1" width="318" height="218" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      
      {/* Top Yellow Panel */}
      <path
        d="M 6 6 L 314 6 L 314 160 L 6 160 Z"
        fill="#FFDE00"
      />

      {/* "carē" Wordmark in Blue */}
      <g fill="#0A66C2">
        {/* 'c' */}
        <path d="M 88 88 C 88 72 76 60 58 60 C 40 60 26 74 26 94 C 26 114 40 128 58 128 C 74 128 85 118 87 104 L 75 104 C 73 112 66 117 58 117 C 46 117 38 107 38 94 C 38 81 46 71 58 71 C 67 71 73 76 75 88 Z" />

        {/* 'a' */}
        <path d="M 144 76 L 144 126 L 132 126 L 132 117 C 127 124 119 128 108 128 C 94 128 85 119 85 105 C 85 91 97 83 114 83 C 122 83 128 84 132 86 L 132 82 C 132 74 126 69 116 69 C 108 69 101 72 98 77 L 91 69 C 97 62 107 59 118 59 C 134 59 144 65 144 76 Z M 132 98 C 128 95 122 94 115 94 C 103 94 97 98 97 105 C 97 112 103 117 111 117 C 122 117 132 109 132 98 Z" />

        {/* 'r' */}
        <path d="M 160 62 L 171 62 L 171 76 C 176 65 186 60 196 61 L 194 73 C 184 72 173 78 171 90 L 171 126 L 159 126 Z" />

        {/* 'e' */}
        <path d="M 264 96 C 264 74 250 60 231 60 C 213 60 199 74 199 94 C 199 114 213 128 232 128 C 248 128 259 118 262 104 L 250 104 C 247 112 241 117 232 117 C 220 117 212 107 212 96 Z M 212 88 C 213 78 221 71 231 71 C 241 71 249 78 250 88 Z" />

        {/* Macron bar above 'e' */}
        <rect x="210" y="40" width="46" height="8" rx="4" />
      </g>

      {/* Bottom White Area Text: "HEALTH INSURANCE" */}
      <text
        x="160"
        y="196"
        fill="#0A66C2"
        fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="2.8"
        textAnchor="middle"
      >
        HEALTH INSURANCE
      </text>
    </svg>
  );
};
