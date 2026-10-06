import React from 'react';

export const CommunityClusterIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[420px] h-auto select-none ${className}`}
    >
      {/* Black 8-point outline star top right */}
      <g transform="translate(320, 30) scale(0.9)">
        <path
          d="M 50 0 L 62 35 L 98 25 L 75 55 L 100 80 L 65 78 L 50 110 L 35 78 L 0 80 L 25 55 L 2 25 L 38 35 Z"
          fill="none"
          stroke="#0B2B26"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>

      {/* Black zig-zag / wire burst on right */}
      <path
        d="M 330 65 L 340 10 L 350 70 L 360 15 L 370 75 L 380 20 L 390 80 L 400 30 L 410 85"
        stroke="#0B2B26"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Orange Hexagon with smiley face */}
      <g transform="translate(240, 50)">
        <polygon
          points="80,10 145,45 145,125 80,165 15,125 15,45"
          fill="#F27A24"
        />
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

      {/* Teal rounded card with curved sleepy eyes */}
      <g transform="translate(130, 80)">
        <rect
          x="10"
          y="10"
          width="110"
          height="130"
          rx="24"
          fill="#3CB9A8"
          transform="rotate(-10 60 70)"
        />
        <path
          d="M 35 65 Q 48 77 60 65"
          stroke="#0B2B26"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 75 60 Q 88 72 100 60"
          stroke="#0B2B26"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 45 95 Q 65 80 85 95"
          stroke="#0B2B26"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Pink circle character with open happy mouth */}
      <g transform="translate(250, 160)">
        <circle cx="60" cy="60" r="55" fill="#EE9CA7" />
        <path
          d="M 35 48 Q 44 36 52 48"
          stroke="#0B2B26"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 68 48 Q 76 36 84 48"
          stroke="#0B2B26"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 40 65 Q 60 98 80 65 Z"
          fill="#FFFFFF"
          stroke="#0B2B26"
          strokeWidth="3.5"
        />
      </g>

      {/* Orange 8-petal daisy flower */}
      <g transform="translate(130, 190) scale(0.9)">
        <ellipse cx="60" cy="30" rx="14" ry="24" fill="#F27A24" />
        <ellipse cx="60" cy="90" rx="14" ry="24" fill="#F27A24" />
        <ellipse cx="30" cy="60" rx="24" ry="14" fill="#F27A24" />
        <ellipse cx="90" cy="60" rx="24" ry="14" fill="#F27A24" />
        <ellipse cx="38" cy="38" rx="16" ry="16" fill="#F27A24" />
        <ellipse cx="82" cy="82" rx="16" ry="16" fill="#F27A24" />
        <ellipse cx="82" cy="38" rx="16" ry="16" fill="#F27A24" />
        <ellipse cx="38" cy="82" rx="16" ry="16" fill="#F27A24" />
        <circle cx="60" cy="60" r="16" fill="#0B2B26" />
      </g>

      {/* Green rounded blob character on bottom right */}
      <g transform="translate(340, 180)">
        <ellipse cx="60" cy="60" rx="60" ry="55" fill="#22A45A" />
        <path
          d="M 20 45 Q 35 25 50 45 T 80 45"
          stroke="#F2D701"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="85" cy="50" r="4.5" fill="#0B2B26" />
        <path
          d="M 78 68 Q 90 80 102 68"
          stroke="#0B2B26"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
