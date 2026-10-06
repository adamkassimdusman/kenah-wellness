import React from 'react';

export const HowItWorksIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full rounded-[36px] bg-[#0B2B26] p-8 sm:p-12 flex items-center justify-center overflow-hidden shadow-lg ${className}`}>
      <svg
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] h-auto select-none"
      >
        {/* Soft cream circular portrait backdrop */}
        <circle cx="210" cy="210" r="185" fill="#F4E8DB" />

        {/* Circular inner border */}
        <circle cx="210" cy="210" r="185" stroke="#E5D6C5" strokeWidth="2" fill="none" />

        {/* Person bust in white turtleneck */}
        <g transform="translate(105, 230)">
          {/* Shoulders & body */}
          <path
            d="M 5 180 C 15 120, 50 100, 105 100 C 160 100, 195 120, 205 180 Z"
            fill="#FFFFFF"
          />
          {/* Neck / turtleneck */}
          <rect x="85" y="70" width="40" height="35" rx="8" fill="#F7F1EB" />

          {/* Head */}
          <ellipse cx="105" cy="55" rx="42" ry="48" fill="#FFFFFF" stroke="#E5D6C5" strokeWidth="2" />

          {/* Face features: closed peaceful eyes with subtle tear mark */}
          <path
            d="M 88 52 Q 95 56 102 52"
            stroke="#0B2B26"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 108 52 Q 115 56 122 52"
            stroke="#0B2B26"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cute dots under left eye */}
          <circle cx="95" cy="62" r="2.5" fill="#0B2B26" />
          <circle cx="100" cy="67" r="2.5" fill="#0B2B26" />
          <circle cx="92" cy="68" r="2.5" fill="#0B2B26" />

          {/* Calm mouth */}
          <path
            d="M 100 80 Q 105 84 110 80"
            stroke="#0B2B26"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Blooming bouquet of thoughts / creativity flourishing on head */}
        <g transform="translate(125, 45)">
          {/* Dark pod base */}
          <ellipse cx="85" cy="180" rx="60" ry="25" fill="#0B2B26" />

          {/* Orange heart */}
          <path
            d="M 35 125 C 20 105, -5 115, -5 135 C -5 155, 35 180, 35 180 C 35 180, 75 155, 75 135 C 75 115, 50 105, 35 125 Z"
            fill="#F27A24"
            transform="rotate(-15 35 140)"
          />

          {/* Mint/teal cloud thought */}
          <path
            d="M 60 90 C 50 70, 75 55, 95 65 C 115 50, 140 70, 135 90 C 150 105, 135 130, 115 125 C 100 135, 75 125, 70 110 Z"
            fill="#3CB9A8"
          />

          {/* Pink thought with face */}
          <ellipse cx="115" cy="115" rx="22" ry="20" fill="#EE9CA7" />
          <circle cx="110" cy="112" r="2" fill="#0B2B26" />
          <circle cx="120" cy="112" r="2" fill="#0B2B26" />
          <path d="M 112 120 Q 115 125 118 120" stroke="#0B2B26" strokeWidth="2" fill="none" />

          {/* Yellow star/sun */}
          <polygon
            points="55,40 60,52 73,53 62,61 66,73 55,65 44,73 48,61 37,53 50,52"
            fill="#F2D701"
          />

          {/* Lilac shape with sleepy eyes */}
          <circle cx="50" cy="100" r="16" fill="#CBB6E2" />
          <path d="M 44 98 Q 48 102 52 98" stroke="#0B2B26" strokeWidth="2" fill="none" />

          {/* Black squiggle */}
          <path
            d="M 130 85 Q 145 70 140 100 T 150 120"
            stroke="#0B2B26"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
