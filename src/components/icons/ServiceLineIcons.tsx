import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  accentColor?: string;
}

// 1. Personal Care Line Icon: Caring supportive hands holding a warm heart
export const PersonalCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#E89A24'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#F8EDE2" stroke="none" opacity="0.6" />
    <path
      d="M24 28.5L20.8 25.4C16.5 21.3 14 18.8 14 15.6C14 13 16 11 18.6 11C20.1 11 21.5 11.7 22.4 12.8L24 14.6L25.6 12.8C26.5 11.7 27.9 11 29.4 11C32 11 34 13 34 15.6C34 18.8 31.5 21.3 27.2 25.4L24 28.5Z"
      fill={accentColor}
      stroke={color}
      strokeWidth="2"
    />
    <path d="M11 33C14 36 18 37 22 36L25 35" />
    <path d="M9 30C12 28 15 29 18 31" />
    <path d="M37 33C34 36 30 37 26 36L23 35" />
    <path d="M39 30C36 28 33 29 30 31" />
    <path d="M36 9L37 12L40 13L37 14L36 17L35 14L32 13L35 12L36 9Z" fill={accentColor} stroke="none" />
  </svg>
);

// 2. Senior Care Line Icon: Respectful support, guiding cane and warm sunrise
export const SeniorCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#4EBAA8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#E6F7F4" stroke="none" opacity="0.6" />
    {/* Senior figure with gentle posture */}
    <circle cx="20" cy="16" r="4.5" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <path d="M15 36V28C15 25 17 23 20 23C23 23 25 25 25 28V36" stroke={color} strokeWidth="2" />
    {/* Gentle cane */}
    <path d="M28 22C29.5 22 31 23 31 24.5V36" stroke={accentColor} strokeWidth="2.5" />
    {/* Caregiver supportive hand on shoulder */}
    <path d="M12 27C14 25.5 17 25 19 25" stroke={accentColor} strokeWidth="2" />
    {/* Golden sunrise / longevity badge */}
    <circle cx="36" cy="14" r="4" fill="#E89A24" stroke="none" />
    <path d="M36 8V9.5" stroke="#E89A24" strokeWidth="1.5" />
    <path d="M41 14H42.5" stroke="#E89A24" strokeWidth="1.5" />
    <path d="M40 10L39 11" stroke="#E89A24" strokeWidth="1.5" />
  </svg>
);

// 3. End of Life Care Line Icon: Peaceful lotus / gentle comforting candlelight
export const EndOfLifeCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#E89A24'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#F8EDE2" stroke="none" opacity="0.7" />
    {/* Gentle cupped caring hands */}
    <path d="M12 30C15 35 20 37 24 37C28 37 33 35 36 30" stroke={color} strokeWidth="2" />
    <path d="M15 28C19 32 23 33 24 33C25 33 29 32 33 28" stroke={color} strokeWidth="1.5" />
    {/* Peaceful flame / gentle lotus bloom */}
    <path
      d="M24 11C24 11 20 16 20 20C20 22.2 21.8 24 24 24C26.2 24 28 22.2 28 20C28 16 24 11 24 11Z"
      fill={accentColor}
      stroke={color}
      strokeWidth="1.8"
    />
    <path d="M16 21C16.5 18 19 16 21 16" stroke={accentColor} strokeWidth="1.5" />
    <path d="M32 21C31.5 18 29 16 27 16" stroke={accentColor} strokeWidth="1.5" />
    {/* Serene aura */}
    <circle cx="24" cy="20" r="11" stroke="#F28FA5" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
  </svg>
);

// 4. Respite Care Line Icon: Peaceful home cup and relaxing tea / scheduled relief
export const RespiteCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#4EBAA8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#E6F7F4" stroke="none" opacity="0.6" />
    <path d="M12 21L24 11L36 21" stroke={color} strokeWidth="2" />
    <path d="M15 19V36C15 36.6 15.4 37 16 37H32C32.6 37 33 36.6 33 36V19" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    {/* Warm teacup representing relief and relaxation */}
    <path d="M21 29H27C28.1 29 29 28.1 29 27V25H19V27C19 28.1 19.9 29 21 29Z" stroke={color} strokeWidth="1.8" fill="#F8EDE2" />
    <path d="M29 26H31C31.6 26 32 26.4 32 27C32 27.6 31.6 28 31 28H29" stroke={color} strokeWidth="1.5" />
    <path d="M22 22C22 21 23 20 23 19" stroke={accentColor} strokeWidth="1.5" />
    <path d="M25 22C25 21 26 20 26 19" stroke={accentColor} strokeWidth="1.5" />
    <circle cx="36" cy="13" r="3" fill="#E89A24" stroke="none" />
  </svg>
);

// 5. Dementia Care Service Line Icon: Mind illuminated with empathy & warm heart puzzle piece
export const DementiaCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#F28FA5'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#FDEEF1" stroke="none" opacity="0.6" />
    {/* Human profile line */}
    <path
      d="M17 37V33C17 31 16 30 15 28C14 26 13 23 14 19C15.5 13 21 10 27 11C32 12 35 16 35 21C35 24 33 26 32 28C31 30 31 33 31 37"
      stroke={color}
      strokeWidth="2"
      fill="#FFFFFF"
    />
    {/* Memory heart inside mind */}
    <path
      d="M24 23.5L22.2 21.8C19.8 19.5 18.5 18 18.5 16.2C18.5 14.8 19.6 13.7 21 13.7C21.8 13.7 22.6 14.1 23.1 14.7L24 15.7L24.9 14.7C25.4 14.1 26.2 13.7 27 13.7C28.4 13.7 29.5 14.8 29.5 16.2C29.5 18 28.2 19.5 25.8 21.8L24 23.5Z"
      fill={accentColor}
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Supportive gentle halo */}
    <path d="M21 28H27" stroke="#4EBAA8" strokeWidth="2" />
    <circle cx="36" cy="18" r="1.5" fill="#E89A24" />
    <circle cx="12" cy="18" r="1.5" fill="#E89A24" />
  </svg>
);

// 6. Companionship Care Line Icon: Two friendly figures connected in conversation
export const CompanionCareLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#4EBAA8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#E6F7F4" stroke="none" opacity="0.6" />
    <circle cx="17" cy="18" r="5" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <path d="M10 33C10 28.5 13.5 25 18 25C19.5 25 21 25.5 22 26.5" />
    <circle cx="31" cy="18" r="5" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <path d="M38 33C38 28.5 34.5 25 30 25C28.5 25 27 25.5 26 26.5" />
    <path
      d="M24 16C23 14.5 21 14.5 20 15.5C19 16.5 19 18 24 21C29 18 29 16.5 28 15.5C27 14.5 25 14.5 24 16Z"
      fill="#F28FA5"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M19 33L29 33" stroke={accentColor} strokeWidth="2.5" />
  </svg>
);

// 7. Specialized Support Line Icon: Protective shield with clinical precision & adaptive care
export const SpecializedSupportLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#E89A24'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#F8EDE2" stroke="none" opacity="0.6" />
    {/* Shield */}
    <path
      d="M24 10L14 15V23C14 30.5 18.2 35.8 24 38C29.8 35.8 34 30.5 34 23V15L24 10Z"
      stroke={color}
      strokeWidth="2"
      fill="#FFFFFF"
    />
    {/* Medical Cross & Star */}
    <path d="M24 18V28" stroke={accentColor} strokeWidth="2.5" />
    <path d="M19 23H29" stroke={accentColor} strokeWidth="2.5" />
    <circle cx="24" cy="23" r="1.5" fill="#FFFFFF" />
    <path d="M37 11L38 13L40 14L38 15L37 17L36 15L34 14L36 13L37 11Z" fill="#4EBAA8" stroke="none" />
  </svg>
);

// 8. Additional Services Line Icon: Multi-faceted lifestyle & home assistance star
export const AdditionalServicesLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#4EBAA8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#E6F7F4" stroke="none" opacity="0.6" />
    {/* Clipboard / Organizer */}
    <rect x="15" y="14" width="18" height="22" rx="3" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <path d="M20 11H28V15H20V11Z" stroke={color} strokeWidth="1.5" fill="#F8EDE2" />
    <path d="M19 21H29" stroke={color} strokeWidth="1.8" />
    <path d="M19 26H26" stroke={color} strokeWidth="1.8" />
    {/* Star for additional custom touches */}
    <path d="M33 26L34.5 30L39 30.5L35.5 33.5L36.5 38L33 35.5L29.5 38L30.5 33.5L27 30.5L31.5 30L33 26Z" fill={accentColor} stroke={color} strokeWidth="1.5" />
  </svg>
);

// Legacy aliases for backward compatibility
export const HomemakerLineIcon = AdditionalServicesLineIcon;
export const MedicationRemindersLineIcon = SpecializedSupportLineIcon;
export const DailyLivingLineIcon = SeniorCareLineIcon;
export const AdditionalSupportsLineIcon = AdditionalServicesLineIcon;

// ==========================================
// PENNSYLVANIA ODP WAIVER SERVICES LINE ICONS
// ==========================================

// In-Home Respite
export const InHomeRespiteLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#4EBAA8'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#E6F7F4" stroke="none" opacity="0.7" />
    <path d="M12 21L24 11L36 21" stroke={color} strokeWidth="2" />
    <path d="M15 19V36C15 36.6 15.4 37 16 37H32C32.6 37 33 36.6 33 36V19" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <path d="M21 29H27C28.1 29 29 28.1 29 27V25H19V27C19 28.1 19.9 29 21 29Z" stroke={color} strokeWidth="1.8" fill="#F8EDE2" />
    <path d="M29 26H31C31.6 26 32 26.4 32 27C32 27.6 31.6 28 31 28H29" stroke={color} strokeWidth="1.5" />
    <path d="M22 22C22 21 23 20 23 19" stroke={accentColor} strokeWidth="1.5" />
    <path d="M25 22C25 21 26 20 26 19" stroke={accentColor} strokeWidth="1.5" />
    <path d="M37 10C35.5 11.5 35.5 14 37 15.5C36 15.5 34.5 15 34 13.5C33.5 12 34 10.5 35.5 10C36 10 36.5 10 37 10Z" fill="#E89A24" stroke="none" />
  </svg>
);

// Out-of-Home Respite
export const OutOfHomeRespiteLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#E89A24'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#F8EDE2" stroke="none" opacity="0.7" />
    <path d="M10 24L20 15L30 24" stroke={color} strokeWidth="2" />
    <path d="M13 22V36H27V22" stroke={color} strokeWidth="2" fill="#FFFFFF" />
    <rect x="17" y="27" width="6" height="9" stroke={color} strokeWidth="1.8" fill="#F8EDE2" />
    <path d="M35 36V30" stroke={color} strokeWidth="2" />
    <path
      d="M35 18C32 18 30 20.5 30 23C30 25.5 32 27 33 28C33 29 34 30 35 30C36 30 37 29 37 28C38 27 40 25.5 40 23C40 20.5 38 18 35 18Z"
      fill="#4EBAA8"
      stroke={color}
      strokeWidth="1.8"
    />
    <path d="M21 9L22 11.5L24.5 12L22 13.5L21 16L20 13.5L17.5 12L20 11.5L21 9Z" fill={accentColor} stroke="none" />
  </svg>
);

// Habilitation (HAB)
export const HabilitationLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#E89A24'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#F8EDE2" stroke="none" opacity="0.7" />
    <path d="M11 36H18V30H25V24H32V18H37" stroke={color} strokeWidth="2" />
    <circle cx="37" cy="14" r="4.5" fill={accentColor} stroke={color} strokeWidth="1.8" />
    <path d="M37 12V16" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M35 14H39" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M14 26L23 17" stroke="#4EBAA8" strokeWidth="2.5" strokeDasharray="1 3" />
    <path d="M20 16H24V20" stroke="#4EBAA8" strokeWidth="2" />
  </svg>
);

// Community Participation Support (CPS)
export const CommunityParticipationLineIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
  color = '#0B2B26',
  accentColor = '#F28FA5'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="24" cy="24" r="21" fill="#FDEEF1" stroke="none" opacity="0.7" />
    <circle cx="24" cy="16" r="4" stroke={color} strokeWidth="1.8" fill="#FFFFFF" />
    <path d="M19 28C19 25 21 23 24 23C27 23 29 25 29 28V36H19V28Z" stroke={color} strokeWidth="1.8" fill="#FFFFFF" />
    <circle cx="14" cy="20" r="3.5" stroke={color} strokeWidth="1.8" fill="#4EBAA8" />
    <path d="M9 34C9 30 11.5 28 14 28C15 28 16 28.5 17 29.5" stroke={color} strokeWidth="1.8" />
    <circle cx="34" cy="20" r="3.5" stroke={color} strokeWidth="1.8" fill="#E89A24" />
    <path d="M39 34C39 30 36.5 28 34 28C33 28 32 28.5 31 29.5" stroke={color} strokeWidth="1.8" />
    <path d="M24 8L25 10L27 11L25 12L24 14L23 12L21 11L23 10L24 8Z" fill="#E89A24" stroke="none" />
  </svg>
);
