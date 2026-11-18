import React from 'react';
import { weddingConfig } from '../config/weddingConfig';

/**
 * Delicate antique gold horizontal ornamental divider
 */
export const GoldFlourish: React.FC<{ className?: string; tone?: 'gold' | 'ivory' }> = ({
  className = '',
  tone = 'gold',
}) => {
  const stroke = tone === 'gold' ? '#B2945E' : '#EFE0C4';
  return (
    <svg
      viewBox="0 0 260 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12,14 L96,14" stroke={stroke} strokeWidth="0.9" strokeOpacity="0.7" />
      <path d="M164,14 L248,14" stroke={stroke} strokeWidth="0.9" strokeOpacity="0.7" />
      <path
        d="M96,14 C105,6 116,6 122,14 C116,22 105,22 96,14 Z"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M164,14 C155,6 144,6 138,14 C144,22 155,22 164,14 Z"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M130,5 L135,14 L130,23 L125,14 Z"
        fill={stroke}
        fillOpacity="0.85"
      />
      <circle cx="86" cy="14" r="1.6" fill={stroke} />
      <circle cx="174" cy="14" r="1.6" fill={stroke} />
    </svg>
  );
};

/**
 * Ornamental antique gold filigree corner for invitation cards
 */
export const CornerFiligree: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4,42 L4,12 C4,7.5 7.5,4 12,4 L42,4"
      stroke="#B2945E"
      strokeWidth="1.2"
    />
    <path
      d="M10,36 L10,16 C10,12.5 12.5,10 16,10 L36,10"
      stroke="#B2945E"
      strokeWidth="0.8"
      strokeOpacity="0.75"
    />
    <path
      d="M4,18 C10,18 14,14 14,8 C18,12 22,12 26,8"
      stroke="#B2945E"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    <circle cx="10" cy="10" r="2" fill="#B2945E" />
  </svg>
);

/**
 * Realistic burgundy wax seal with melted organic rim, raised inner ring,
 * and embossed antique gold P & S monogram.
 */
export const WaxSeal: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  monogram?: string;
}> = ({ size = 'lg', className = '', monogram = weddingConfig.monogram }) => {
  const px = size === 'lg' ? 108 : size === 'md' ? 76 : 52;
  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`waxBase-${uid}`} cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#85303C" />
          <stop offset="48%" stopColor="#5E202B" />
          <stop offset="85%" stopColor="#46141D" />
          <stop offset="100%" stopColor="#350D15" />
        </radialGradient>
        <radialGradient id={`waxInner-${uid}`} cx="62%" cy="65%" r="65%">
          <stop offset="0%" stopColor="#772A35" />
          <stop offset="65%" stopColor="#541C26" />
          <stop offset="100%" stopColor="#3C1018" />
        </radialGradient>
        <linearGradient id={`goldEmboss-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6CE9D" />
          <stop offset="50%" stopColor="#B2945E" />
          <stop offset="100%" stopColor="#8C6E3B" />
        </linearGradient>
        <filter id={`waxShadow-${uid}`} x="-20%" y="-20%" width="145%" height="145%">
          <feDropShadow dx="0" dy="6" stdDeviation="4.5" floodColor="#25090E" floodOpacity="0.48" />
        </filter>
      </defs>

      <g filter={`url(#waxShadow-${uid})`}>
        {/* Organic melted wax outer silhouette */}
        <path
          d="M60,6 C73,5 85,11 96,19 C106,27 113,40 114,55 C115,69 109,84 100,95 C90,106 75,113 60,114 C44,115 28,108 18,97 C8,86 5,70 6,55 C7,40 14,25 25,16 C35,8 48,7 60,6 Z"
          fill={`url(#waxBase-${uid})`}
        />
        {/* Wax rim highlight */}
        <path
          d="M24,25 C35,14 52,10 68,12 C84,14 99,24 105,39"
          stroke="#A84A57"
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Pressed inner seal basin */}
        <circle
          cx="60"
          cy="60"
          r="38"
          fill={`url(#waxInner-${uid})`}
          stroke="#360D14"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="60"
          r="35.5"
          stroke={`url(#goldEmboss-${uid})`}
          strokeOpacity="0.55"
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
        />

        {/* Subtle botanical laurel wreath embossed inside seal */}
        <path
          d="M35,72 C29,60 32,44 43,35"
          stroke={`url(#goldEmboss-${uid})`}
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M85,72 C91,60 88,44 77,35"
          stroke={`url(#goldEmboss-${uid})`}
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Embossed gold P & S monogram */}
        <text
          x="60"
          y="67"
          textAnchor="middle"
          fill={`url(#goldEmboss-${uid})`}
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: size === 'sm' ? '23px' : '24px',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          {monogram}
        </text>
      </g>
    </svg>
  );
};

/**
 * Royal Wedding Crest for the deep burgundy "With Love" footer.
 * Oval antique ivory center, ornamental antique gold frame, intertwined P & S,
 * and small burgundy and champagne roses at the bottom.
 */
export const RoyalWeddingCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E4CC9A" />
        <stop offset="50%" stopColor="#B2945E" />
        <stop offset="100%" stopColor="#8A6D3C" />
      </linearGradient>
      <radialGradient id="crestIvory" cx="50%" cy="42%" r="60%">
        <stop offset="0%" stopColor="#FBF3E4" />
        <stop offset="70%" stopColor="#F5E8D0" />
        <stop offset="100%" stopColor="#E5D1AE" />
      </radialGradient>
      <filter id="crestShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#23080E" floodOpacity="0.45" />
      </filter>
    </defs>

    <g filter="url(#crestShadow)">
      {/* Top crown ornament */}
      <path
        d="M120,16 C125,26 135,28 142,22 C137,33 130,38 120,40 C110,38 103,33 98,22 C105,28 115,26 120,16 Z"
        fill="url(#crestGold)"
      />
      <circle cx="120" cy="12" r="3" fill="#E4CC9A" />

      {/* Outer gold botanical wreath framing the oval */}
      <path
        d="M52,195 C26,155 28,90 66,54 C76,44 90,38 104,35"
        stroke="url(#crestGold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M188,195 C214,155 212,90 174,54 C164,44 150,38 136,35"
        stroke="url(#crestGold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {[
        { x: 42, y: 158, r: -125 },
        { x: 37, y: 122, r: -100 },
        { x: 46, y: 84, r: -65 },
        { x: 70, y: 52, r: -35 },
        { x: 198, y: 158, r: -55 },
        { x: 203, y: 122, r: -80 },
        { x: 194, y: 84, r: -115 },
        { x: 170, y: 52, r: -145 },
      ].map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <path d="M0,0 C5,-9 14,-9 20,0 C14,9 5,9 0,0 Z" fill="url(#crestGold)" fillOpacity="0.88" />
        </g>
      ))}

      {/* Oval antique ivory center */}
      <ellipse
        cx="120"
        cy="134"
        rx="68"
        ry="88"
        fill="url(#crestIvory)"
        stroke="url(#crestGold)"
        strokeWidth="3.2"
      />
      <ellipse
        cx="120"
        cy="134"
        rx="60"
        ry="80"
        fill="none"
        stroke="#B2945E"
        strokeWidth="0.9"
        strokeOpacity="0.7"
      />

      {/* Intertwined P & S initials */}
      <text
        x="104"
        y="142"
        textAnchor="middle"
        fill="#581F2A"
        style={{
          fontFamily: '"Pinyon Script", cursive',
          fontSize: '58px',
        }}
      >
        P
      </text>
      <text
        x="121"
        y="138"
        textAnchor="middle"
        fill="#B2945E"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '26px',
          fontStyle: 'italic',
        }}
      >
        &amp;
      </text>
      <text
        x="139"
        y="150"
        textAnchor="middle"
        fill="#581F2A"
        style={{
          fontFamily: '"Pinyon Script", cursive',
          fontSize: '58px',
        }}
      >
        S
      </text>

      {/* Small burgundy and champagne roses nestled at the base of the crest */}
      <g transform="translate(86 218)">
        <circle cx="0" cy="0" r="13" fill="#EFE0C4" stroke="#B2945E" strokeWidth="0.8" />
        <path d="M-6,-4 C0,-10 8,-6 6,2 C4,8 -5,7 -6,-4 Z" fill="#DEC8A0" />
        <circle cx="0" cy="0" r="3" fill="#B2945E" />
      </g>
      <g transform="translate(154 218)">
        <circle cx="0" cy="0" r="13" fill="#EFE0C4" stroke="#B2945E" strokeWidth="0.8" />
        <path d="M-6,-4 C0,-10 8,-6 6,2 C4,8 -5,7 -6,-4 Z" fill="#DEC8A0" />
        <circle cx="0" cy="0" r="3" fill="#B2945E" />
      </g>
      <g transform="translate(120 225)">
        <circle cx="0" cy="0" r="18" fill="#581F2A" stroke="#3E111B" strokeWidth="1" />
        <path d="M-10,-6 C-2,-15 12,-10 10,3 C7,12 -8,12 -10,-6 Z" fill="#7B2D39" />
        <path d="M-5,-3 C-1,-8 6,-6 5,1 C4,6 -4,6 -5,-3 Z" fill="#9A434F" />
        <circle cx="0" cy="0" r="3.2" fill="#3C0F18" />
      </g>
    </g>
  </svg>
);
