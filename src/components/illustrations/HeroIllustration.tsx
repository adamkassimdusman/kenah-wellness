import React from 'react';

interface HeroIllustrationProps {
  className?: string;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 1200 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover select-none pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Subtle noise/texture overlay for character authentic feel */}
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0" />
          <feComposite in2="SourceGraphic" in="glitch" operator="in" />
        </filter>
      </defs>

      {/* Warm beige / sand background */}
      <rect width="1200" height="680" rx="36" fill="#F8EDE2" />

      {/* ========================================================
          TOP-LEFT CHARACTER: White/Cream semicircle smiling wedge
         ======================================================== */}
      <g transform="translate(-10, 140)">
        <path
          d="M 120 40 A 100 100 0 0 0 20 180 L 140 180 Z"
          fill="#FFFFFF"
        />
        {/* Eyes & smile */}
        <ellipse cx="60" cy="120" rx="6" ry="8" fill="#0B2B26" />
        <ellipse cx="95" cy="115" rx="6" ry="8" fill="#0B2B26" />
        <path
          d="M 58 138 Q 78 165 98 138 Z"
          fill="#0B2B26"
        />
      </g>

      {/* Dark kidney behind top-left */}
      <path
        d="M -30 260 C -10 240, 20 250, 30 290 C 40 330, 10 360, -20 370 Z"
        fill="#0B2B26"
      />

      {/* ========================================================
          BOTTOM-LEFT CHARACTERS
         ======================================================== */}
      {/* Orange Hexagon with smiling face */}
      <g transform="translate(30, 340)">
        <polygon
          points="80,10 145,45 145,125 80,165 15,125 15,45"
          fill="#F27A24"
        />
        {/* Smiling face */}
        <circle cx="55" cy="80" r="5" fill="#0B2B26" />
        <circle cx="105" cy="80" r="5" fill="#0B2B26" />
        <path
          d="M 65 98 Q 80 120 95 98"
          stroke="#0B2B26"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Teal rounded card with curved eyes */}
      <g transform="translate(-25, 460)">
        <rect
          x="10"
          y="10"
          width="110"
          height="140"
          rx="24"
          fill="#3CB9A8"
          transform="rotate(-8 60 70)"
        />
        {/* Curved sleepy/content eyes */}
        <path
          d="M 35 70 Q 48 82 60 70"
          stroke="#0B2B26"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 75 66 Q 88 78 100 66"
          stroke="#0B2B26"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Mouth */}
        <path
          d="M 45 105 Q 65 90 85 105"
          stroke="#0B2B26"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Pink circle character with open happy smile */}
      <g transform="translate(85, 485)">
        <circle cx="65" cy="65" r="62" fill="#EE9CA7" />
        {/* Eyes */}
        <path
          d="M 40 50 Q 48 38 56 50"
          stroke="#0B2B26"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 74 50 Q 82 38 90 50"
          stroke="#0B2B26"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Big open mouth */}
        <path
          d="M 45 68 Q 65 102 85 68 Z"
          fill="#FFFFFF"
          stroke="#0B2B26"
          strokeWidth="4"
        />
      </g>

      {/* Black 8-point asterisk shape */}
      <g transform="translate(45, 600) scale(0.65)">
        <path
          d="M 50 10 L 50 90 M 10 50 L 90 50 M 22 22 L 78 78 M 22 78 L 78 22"
          stroke="#0B2B26"
          strokeWidth="16"
          strokeLinecap="round"
        />
      </g>

      {/* Orange block bottom */}
      <rect x="130" y="635" width="80" height="50" rx="10" fill="#F27A24" />

      {/* ========================================================
          TOP-RIGHT CHARACTER: Sand pie wedge
         ======================================================== */}
      <g transform="translate(1070, 0)">
        <path
          d="M 120 0 L 120 180 L 10 30 Z"
          fill="#ECCF9B"
        />
        {/* Eyes & mouth */}
        <circle cx="55" cy="80" r="6" fill="#0B2B26" />
        <circle cx="95" cy="70" r="6" fill="#0B2B26" />
        <path
          d="M 70 95 Q 85 120 100 95 Z"
          fill="#0B2B26"
        />
      </g>

      {/* ========================================================
          BOTTOM-RIGHT CHARACTERS
         ======================================================== */}
      {/* Black 8-point outlined star */}
      <g transform="translate(950, 455) scale(0.9)">
        <path
          d="M 50 0 L 62 35 L 98 25 L 75 55 L 100 80 L 65 78 L 50 110 L 35 78 L 0 80 L 25 55 L 2 25 L 38 35 Z"
          fill="none"
          stroke="#0B2B26"
          strokeWidth="8"
          strokeLinejoin="round"
        />
      </g>

      {/* Teal rounded card with white curly lines */}
      <g transform="translate(1085, 460)">
        <rect x="0" y="0" width="130" height="150" rx="30" fill="#3EB4A5" />
        <path
          d="M 20 60 Q 50 20 80 60 T 120 60"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M 20 90 Q 60 50 90 90 T 130 90"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          fill="none"
        />
      </g>

      {/* Pink textured heart character */}
      <g transform="translate(790, 560)">
        <path
          d="M 80 40 C 50 0, 0 10, 0 60 C 0 110, 80 150, 80 150 C 80 150, 160 110, 160 60 C 160 10, 110 0, 80 40 Z"
          fill="#E89A9C"
          transform="scale(1.4) translate(-10, -20)"
        />
        {/* Smiling eyes & mouth */}
        <circle cx="70" cy="50" r="5" fill="#0B2B26" />
        <circle cx="120" cy="55" r="5" fill="#0B2B26" />
        <path
          d="M 75 75 Q 95 100 115 75"
          stroke="#0B2B26"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Green rounded blob character with yellow curls */}
      <g transform="translate(1030, 540)">
        <ellipse cx="85" cy="85" rx="80" ry="75" fill="#22A45A" />
        {/* Yellow squiggles */}
        <path
          d="M 30 65 Q 45 45 60 65 T 90 65"
          stroke="#F2D701"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M 40 105 Q 60 85 80 105 T 110 105"
          stroke="#F2D701"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Sleepy curved eyes */}
        <circle cx="115" cy="65" r="5" fill="#0B2B26" />
        <path
          d="M 105 85 Q 120 100 135 85"
          stroke="#0B2B26"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
