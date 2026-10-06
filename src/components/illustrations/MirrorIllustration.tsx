import React from 'react';

export const MirrorIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[280px] h-auto select-none ${className}`}
    >
      {/* Warm beige / sand floating shape behind */}
      <path
        d="M 20 120 L 45 105 L 55 125 L 30 140 Z"
        fill="#ECCF9B"
      />

      {/* Floating Orange Hearts */}
      <g transform="translate(230, 15) scale(0.7)">
        <path
          d="M 40 20 C 25 0, 0 5, 0 30 C 0 55, 40 75, 40 75 C 40 75, 80 55, 80 30 C 80 5, 55 0, 40 20 Z"
          fill="#F27A24"
        />
      </g>
      <g transform="translate(200, 35) scale(0.45)">
        <path
          d="M 40 20 C 25 0, 0 5, 0 30 C 0 55, 40 75, 40 75 C 40 75, 80 55, 80 30 C 80 5, 55 0, 40 20 Z"
          fill="#F27A24"
        />
      </g>

      {/* Hand Mirror Frame */}
      <g transform="translate(130, 40)">
        {/* Handle */}
        <path
          d="M 35 110 L 0 150 L 80 150 L 45 110 Z"
          fill="#E7D1B5"
        />
        {/* Mirror Circle Outer */}
        <ellipse cx="40" cy="55" rx="42" ry="46" fill="#0B2B26" />
        {/* Mirror Glass Reflection */}
        <ellipse cx="40" cy="55" rx="36" ry="40" fill="#FBF3EA" />

        {/* Cheerful Sun Face Reflection inside mirror */}
        <ellipse cx="40" cy="58" rx="26" ry="28" fill="#F2D701" />
        {/* Sun face eyes */}
        <circle cx="32" cy="54" r="2.5" fill="#0B2B26" />
        <circle cx="48" cy="54" r="2.5" fill="#0B2B26" />
        {/* Curved happy smile */}
        <path
          d="M 32 63 Q 40 74 48 63"
          stroke="#0B2B26"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Woman's head & shoulders from behind / side */}
      <g transform="translate(210, 80)">
        {/* Dark hair silhouette */}
        <path
          d="M 50 20 C 20 20, 10 50, 15 90 C 20 130, 10 140, 0 140 L 110 140 C 110 100, 105 70, 95 40 C 85 20, 70 20, 50 20 Z"
          fill="#0B2B26"
        />
        {/* Ponytail or bun curve */}
        <ellipse cx="75" cy="45" rx="20" ry="24" fill="#0B2B26" />

        {/* Coral pink sweater/shoulder */}
        <path
          d="M 2 135 C 15 115, 45 105, 75 110 C 105 115, 110 135, 110 140 Z"
          fill="#EE9CA7"
        />
      </g>
    </svg>
  );
};
