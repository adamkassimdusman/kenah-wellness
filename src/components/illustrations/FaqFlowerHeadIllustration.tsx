import React from 'react';

export const FaqFlowerHeadIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full rounded-[32px] bg-[#FBF3EA] p-6 sm:p-8 flex items-center justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 340 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] h-auto select-none"
      >
        {/* Soft pastel decorative floating shapes */}
        <ellipse cx="60" cy="180" rx="14" ry="12" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="280" cy="190" rx="16" ry="14" fill="#FFFFFF" opacity="0.8" />

        {/* ========================================================
            BLOOMING GARDEN OVER HEAD
           ======================================================== */}
        <g transform="translate(40, 40)">
          {/* Blue daisy on left */}
          <g transform="translate(30, 80)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx="30"
                cy="14"
                rx="6"
                ry="14"
                fill="#72BCD4"
                transform={`rotate(${angle} 30 30)`}
              />
            ))}
            <circle cx="30" cy="30" r="8" fill="#F2D701" />
          </g>

          {/* Pink smiling flower in center */}
          <g transform="translate(100, 50)">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle
                key={i}
                cx="30"
                cy="10"
                r="10"
                fill="#F6A8B8"
                transform={`rotate(${angle} 30 30)`}
              />
            ))}
            <circle cx="30" cy="30" r="12" fill="#F27A24" />
            {/* Tiny face on flower */}
            <circle cx="26" cy="28" r="1.5" fill="#0B2B26" />
            <circle cx="34" cy="28" r="1.5" fill="#0B2B26" />
            <path d="M 27 34 Q 30 37 33 34" stroke="#0B2B26" strokeWidth="1.5" fill="none" />
          </g>

          {/* Yellow 8-petal daisy on right */}
          <g transform="translate(170, 75)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx="24"
                cy="10"
                rx="5"
                ry="12"
                fill="#F2D701"
                transform={`rotate(${angle} 24 24)`}
              />
            ))}
            <circle cx="24" cy="24" r="7" fill="#0B2B26" />
          </g>

          {/* Mint green leaves and stems */}
          <path
            d="M 50 130 C 50 100, 70 80, 80 80 C 70 95, 65 110, 65 130 Z"
            fill="#3CB9A8"
          />
          <path
            d="M 190 120 C 190 95, 175 75, 165 75 C 175 90, 180 105, 180 125 Z"
            fill="#3CB9A8"
          />

          {/* Tiny orange smiling bud */}
          <g transform="translate(75, 110)">
            <circle cx="12" cy="12" r="10" fill="#F27A24" />
            <circle cx="9" cy="10" r="1.2" fill="#0B2B26" />
            <circle cx="15" cy="10" r="1.2" fill="#0B2B26" />
            <path d="M 9 14 Q 12 17 15 14" stroke="#0B2B26" strokeWidth="1.2" fill="none" />
          </g>
        </g>

        {/* ========================================================
            YELLOW CHEERFUL BUST & SMILING HEAD
           ======================================================== */}
        <g transform="translate(70, 190)">
          {/* Shoulders / Base */}
          <path
            d="M 10 180 C 20 125, 60 110, 100 110 C 140 110, 180 125, 190 180 Z"
            fill="#F2D701"
          />

          {/* Neck */}
          <rect x="80" y="85" width="40" height="35" rx="6" fill="#ECC800" />

          {/* Head */}
          <ellipse cx="100" cy="65" rx="55" ry="58" fill="#F2D701" />

          {/* Cheerful curved eyes with eyebrows */}
          <path
            d="M 72 45 Q 82 35 92 45"
            stroke="#0B2B26"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 74 54 Q 82 46 90 54"
            stroke="#0B2B26"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 108 45 Q 118 35 128 45"
            stroke="#0B2B26"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 110 54 Q 118 46 126 54"
            stroke="#0B2B26"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Big happy smile */}
          <path
            d="M 76 75 Q 100 106 124 75"
            stroke="#0B2B26"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
