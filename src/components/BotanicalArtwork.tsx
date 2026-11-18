import React from 'react';

interface FloralProps {
  className?: string;
}

/**
 * Reusable layered botanical rose builder for realistic depth and shading.
 */
function DetailedRose({
  cx,
  cy,
  scale = 1,
  variant = 'burgundy',
  rotate = 0,
}: {
  cx: number;
  cy: number;
  scale?: number;
  variant?: 'burgundy' | 'champagne' | 'ivory';
  rotate?: number;
}) {
  const palette =
    variant === 'burgundy'
      ? {
          outer: '#4A1621',
          mid: '#68232E',
          inner: '#86333E',
          highlight: '#A94F5A',
          core: '#3B0E17',
          stroke: '#3A1019',
        }
      : variant === 'champagne'
        ? {
            outer: '#C9B18A',
            mid: '#DECAA6',
            inner: '#EFE0C4',
            highlight: '#FAF2E3',
            core: '#B49669',
            stroke: '#A38659',
          }
        : {
            outer: '#D6C4A5',
            mid: '#EADBC0',
            inner: '#F5E8D0',
            highlight: '#FFF8EB',
            core: '#C2A87E',
            stroke: '#AE9369',
          };

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      {/* Soft shadow beneath blossom */}
      <ellipse cx="2" cy="4" rx="28" ry="26" fill="rgba(42, 16, 18, 0.16)" />

      {/* Outer guard petals */}
      <path
        d="M-6,-26 C10,-32 28,-20 26,-3 C24,14 8,28 -10,25 C-26,22 -32,4 -25,-12 C-20,-22 -14,-24 -6,-26 Z"
        fill={palette.outer}
        stroke={palette.stroke}
        strokeWidth="0.7"
      />
      <path
        d="M-24,-6 C-28,-22 -10,-30 6,-24 C18,-20 28,-4 22,12 C15,24 -4,26 -16,18 C-23,12 -22,2 -24,-6 Z"
        fill={palette.mid}
        stroke={palette.stroke}
        strokeWidth="0.6"
      />

      {/* Mid layered petals */}
      <path
        d="M-16,-14 C-6,-24 14,-22 19,-7 C23,6 13,20 -3,19 C-16,18 -23,4 -16,-14 Z"
        fill={palette.mid}
        stroke={palette.highlight}
        strokeOpacity="0.35"
        strokeWidth="0.7"
      />
      <path
        d="M14,-12 C22,-2 18,14 4,17 C-10,20 -19,8 -15,-4 C-11,-15 6,-20 14,-12 Z"
        fill={palette.inner}
        stroke={palette.highlight}
        strokeOpacity="0.4"
        strokeWidth="0.6"
      />

      {/* Inner cupped petals */}
      <path
        d="M-11,-8 C-4,-17 10,-14 13,-4 C16,6 7,14 -4,12 C-13,10 -16,-1 -11,-8 Z"
        fill={palette.highlight}
        fillOpacity="0.88"
        stroke={palette.stroke}
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      <path
        d="M-7,-5 C-1,-11 8,-9 9,-1 C10,6 3,10 -4,8 C-9,6 -11,-1 -7,-5 Z"
        fill={palette.inner}
      />

      {/* Spiral rose center */}
      <path
        d="M-4,-2 C0,-6 6,-4 5,1 C4,5 -2,6 -4,2 C-6,-1 -2,-4 1,-3"
        fill={palette.core}
        stroke={palette.highlight}
        strokeOpacity="0.45"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M-1.5,0 C0.5,-2.5 3.5,-1 2,1.5 C0.8,3 -2,2 -1.5,0 Z"
        fill={palette.core}
      />
    </g>
  );
}

/**
 * Rosebud helper for organic botanical ends
 */
function RoseBud({
  cx,
  cy,
  rotate = 0,
  scale = 1,
  variant = 'burgundy',
}: {
  cx: number;
  cy: number;
  rotate?: number;
  scale?: number;
  variant?: 'burgundy' | 'ivory';
}) {
  const fill = variant === 'burgundy' ? '#6D2530' : '#EFE0C4';
  const hi = variant === 'burgundy' ? '#95414C' : '#FAF1E2';
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0,12 C-7,8 -9,-2 -3,-10 C0,-14 3,-14 5,-10 C9,-2 7,8 0,12 Z"
        fill={fill}
        stroke="#4A1722"
        strokeOpacity="0.4"
        strokeWidth="0.6"
      />
      <path
        d="M-2,-8 C2,-10 5,-2 3,6 C0,8 -4,4 -2,-8 Z"
        fill={hi}
        fillOpacity="0.65"
      />
      {/* Sepals */}
      <path
        d="M-5,8 C-2,11 0,14 0,16 C0,14 2,11 5,8 C2,11 -2,11 -5,8 Z"
        fill="#5E583A"
      />
    </g>
  );
}

/**
 * Hanging burgundy amaranthus tassel
 */
function AmaranthusCascade({
  x,
  y,
  length = 110,
  curve = 12,
}: {
  x: number;
  y: number;
  length?: number;
  curve?: number;
}) {
  const beads = Array.from({ length: 14 }, (_, idx) => {
    const t = idx / 13;
    const bx = x + Math.sin(t * Math.PI) * curve;
    const by = y + t * length;
    const r = 4.6 - t * 2.6;
    const tone = idx % 3 === 0 ? '#581F2A' : idx % 3 === 1 ? '#702D35' : '#8A3942';
    return { bx, by, r, tone, idx };
  });

  return (
    <g>
      <path
        d={`M${x},${y} Q${x + curve},${y + length * 0.5} ${x + curve * 0.25},${y + length}`}
        fill="none"
        stroke="#5D222D"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {beads.map((b) => (
        <g key={b.idx}>
          <ellipse
            cx={b.bx - 1.8}
            cy={b.by}
            rx={b.r}
            ry={b.r * 0.82}
            fill={b.tone}
          />
          <ellipse
            cx={b.bx + 1.8}
            cy={b.by + 1.4}
            rx={b.r * 0.9}
            ry={b.r * 0.78}
            fill={b.idx % 2 === 0 ? '#702D35' : '#4B1721'}
          />
        </g>
      ))}
    </g>
  );
}

/**
 * Luxury asymmetrical floral arrangement for upper-right corner of the envelope.
 * Includes deep burgundy roses, champagne & ivory roses, dried golden leaves,
 * muted olive eucalyptus branches, and long hanging burgundy amaranthus.
 */
export const BurgundyRoseClusterTopRight: React.FC<FloralProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 340 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <filter id="floralShadowTR" x="-15%" y="-15%" width="135%" height="135%">
        <feDropShadow dx="-2" dy="6" stdDeviation="5" floodColor="#2E1612" floodOpacity="0.22" />
      </filter>
      <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D8BE87" />
        <stop offset="55%" stopColor="#B2945E" />
        <stop offset="100%" stopColor="#856A3B" />
      </linearGradient>
      <linearGradient id="oliveLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8C855D" />
        <stop offset="60%" stopColor="#77704C" />
        <stop offset="100%" stopColor="#565136" />
      </linearGradient>
    </defs>

    <g filter="url(#floralShadowTR)">
      {/* Olive & botanical branches fanning upward and left */}
      <path
        d="M195,120 C165,75 118,45 65,30"
        stroke="#625C3E"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M210,125 C245,75 278,42 308,22"
        stroke="#625C3E"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M225,155 C265,155 302,162 325,180"
        stroke="#7D673E"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Olive foliage leaves */}
      {[
        { x: 145, y: 65, r: -35, sx: 1 },
        { x: 118, y: 52, r: -48, sx: 0.9 },
        { x: 92, y: 40, r: -28, sx: 0.85 },
        { x: 132, y: 78, r: 15, sx: 0.95 },
        { x: 245, y: 76, r: 35, sx: 1 },
        { x: 268, y: 55, r: 42, sx: 0.9 },
        { x: 292, y: 38, r: 22, sx: 0.8 },
        { x: 255, y: 98, r: 72, sx: 0.9 },
      ].map((leaf, i) => (
        <g
          key={i}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.sx})`}
        >
          <path
            d="M0,0 C8,-12 24,-14 34,0 C24,14 8,12 0,0 Z"
            fill="url(#oliveLeafGrad)"
          />
          <path d="M2,0 L30,0" stroke="#A69F77" strokeOpacity="0.5" strokeWidth="0.7" />
        </g>
      ))}

      {/* Dried antique golden fern & eucalyptus leaves */}
      {[
        { x: 165, y: 92, r: -65, s: 1.05 },
        { x: 235, y: 120, r: 18, s: 1.1 },
        { x: 268, y: 158, r: 38, s: 0.95 },
        { x: 182, y: 50, r: -18, s: 0.9 },
        { x: 120, y: 112, r: -125, s: 0.85 },
      ].map((leaf, i) => (
        <g
          key={i}
          transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
        >
          <path
            d="M0,0 C10,-15 30,-16 42,-1 C30,15 10,14 0,0 Z"
            fill="url(#goldLeafGrad)"
          />
          <path d="M3,0 L36,-1" stroke="#EAD5A6" strokeOpacity="0.6" strokeWidth="0.75" />
        </g>
      ))}

      {/* Long hanging burgundy amaranthus cascading gracefully down the right */}
      <AmaranthusCascade x={262} y={168} length={165} curve={16} />
      <AmaranthusCascade x={238} y={180} length={125} curve={-10} />
      <AmaranthusCascade x={282} y={152} length={112} curve={12} />

      {/* Delicate golden baby's breath / botanical sprigs */}
      {[
        [82, 34],
        [72, 26],
        [98, 25],
        [305, 25],
        [314, 38],
        [322, 178],
        [152, 36],
      ].map(([bx, by], idx) => (
        <circle
          key={idx}
          cx={bx}
          cy={by}
          r={idx % 2 === 0 ? 3.2 : 2.3}
          fill="#EFE0C4"
          stroke="#B2945E"
          strokeWidth="0.6"
        />
      ))}

      {/* Primary champagne & ivory roses */}
      <DetailedRose cx={162} cy={104} scale={0.92} variant="champagne" rotate={-18} />
      <DetailedRose cx={246} cy={105} scale={0.84} variant="ivory" rotate={25} />

      {/* Hero deep burgundy roses */}
      <DetailedRose cx={208} cy={135} scale={1.18} variant="burgundy" rotate={12} />
      <DetailedRose cx={164} cy={156} scale={0.96} variant="burgundy" rotate={-28} />
      <DetailedRose cx={254} cy={154} scale={0.88} variant="champagne" rotate={18} />

      {/* Rosebuds for organic edge */}
      <RoseBud cx={116} cy={108} rotate={-58} scale={0.95} variant="burgundy" />
      <RoseBud cx={288} cy={118} rotate={42} scale={0.9} variant="ivory" />
      <RoseBud cx={196} cy={72} rotate={-8} scale={0.85} variant="burgundy" />
    </g>
  </svg>
);

/**
 * Matching smaller asymmetrical floral arrangement at the bottom-left corner of the envelope.
 */
export const BurgundyRoseClusterBottomLeft: React.FC<FloralProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 240 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <filter id="floralShadowBL" x="-15%" y="-15%" width="135%" height="135%">
        <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#2E1612" floodOpacity="0.22" />
      </filter>
    </defs>

    <g filter="url(#floralShadowBL)">
      {/* Stems */}
      <path d="M108,118 C75,138 42,165 18,195" stroke="#625C3E" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M116,120 C145,148 175,168 205,176" stroke="#625C3E" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M98,108 C72,82 54,54 45,25" stroke="#7D673E" strokeWidth="1.5" strokeLinecap="round" />

      {/* Olive & gold leaves */}
      {[
        { x: 64, y: 152, r: 138, c: '#77704C' },
        { x: 46, y: 170, r: 152, c: '#5D583B' },
        { x: 145, y: 150, r: 22, c: '#B2945E' },
        { x: 172, y: 164, r: 15, c: '#77704C' },
        { x: 76, y: 78, r: -115, c: '#B2945E' },
        { x: 58, y: 54, r: -102, c: '#77704C' },
      ].map((l, idx) => (
        <g key={idx} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
          <path d="M0,0 C9,-11 24,-12 34,0 C24,12 9,11 0,0 Z" fill={l.c} />
        </g>
      ))}

      {/* Short trailing amaranthus */}
      <AmaranthusCascade x={58} y={142} length={64} curve={-8} />

      {/* Roses */}
      <DetailedRose cx={128} cy={128} scale={0.78} variant="champagne" rotate={22} />
      <DetailedRose cx={92} cy={112} scale={1.02} variant="burgundy" rotate={-14} />
      <RoseBud cx={164} cy={156} rotate={72} scale={0.85} variant="ivory" />
      <RoseBud cx={62} cy={72} rotate={-35} scale={0.8} variant="burgundy" />
    </g>
  </svg>
);

/**
 * Small burgundy rose with antique gold foliage for Details tag, Details heading, and RSVP heading.
 */
export const SingleRoseVignette: React.FC<FloralProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g>
      {/* Left & right gold foliage */}
      <path d="M52,44 C35,44 20,36 10,24" stroke="#9B7E4B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M68,44 C85,44 100,36 110,24" stroke="#9B7E4B" strokeWidth="1.2" strokeLinecap="round" />
      <g transform="translate(38 42) rotate(-155)">
        <path d="M0,0 C7,-8 18,-8 25,0 C18,8 7,8 0,0 Z" fill="#B2945E" fillOpacity="0.88" />
      </g>
      <g transform="translate(24 34) rotate(-145)">
        <path d="M0,0 C6,-6 14,-6 19,0 C14,6 6,6 0,0 Z" fill="#77704C" fillOpacity="0.88" />
      </g>
      <g transform="translate(82 42) rotate(-25)">
        <path d="M0,0 C7,-8 18,-8 25,0 C18,8 7,8 0,0 Z" fill="#B2945E" fillOpacity="0.88" />
      </g>
      <g transform="translate(96 34) rotate(-35)">
        <path d="M0,0 C6,-6 14,-6 19,0 C14,6 6,6 0,0 Z" fill="#77704C" fillOpacity="0.88" />
      </g>
      <DetailedRose cx={60} cy={40} scale={0.78} variant="burgundy" rotate={6} />
    </g>
  </svg>
);

/**
 * Vintage botanical sprig for stationery flat lay accents.
 */
export const BotanicalSprig: React.FC<FloralProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M58,170 C54,125 60,72 68,14" stroke="#6D6644" strokeWidth="1.6" strokeLinecap="round" />
    {[
      { x: 56, y: 138, r: -45, c: '#77704C' },
      { x: 59, y: 122, r: 42, c: '#B2945E' },
      { x: 56, y: 98, r: -40, c: '#655F40' },
      { x: 61, y: 80, r: 38, c: '#77704C' },
      { x: 61, y: 56, r: -35, c: '#B2945E' },
      { x: 65, y: 38, r: 32, c: '#77704C' },
      { x: 68, y: 18, r: -5, c: '#B2945E' },
    ].map((leaf, idx) => (
      <g key={idx} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
        <path d="M0,0 C6,-12 18,-14 26,-2 C18,10 6,10 0,0 Z" fill={leaf.c} fillOpacity="0.9" />
      </g>
    ))}
  </svg>
);

/**
 * Antique pearl beads cluster for wedding stationery flat lay.
 */
export const PearlBeadsCluster: React.FC<FloralProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="pearlGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFDF9" />
        <stop offset="45%" stopColor="#F3E7D4" />
        <stop offset="85%" stopColor="#D3BF9F" />
        <stop offset="100%" stopColor="#B89F7A" />
      </radialGradient>
      <filter id="pearlShadow" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="1.5" dy="3" stdDeviation="2.2" floodColor="#3A241B" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Fine silk thread connecting pearls */}
    <path
      d="M16,66 Q58,92 108,58 T148,24"
      stroke="#C8B490"
      strokeWidth="0.9"
      strokeDasharray="1 2"
      fill="none"
    />
    {[
      { x: 22, y: 66, r: 7 },
      { x: 40, y: 76, r: 8.5 },
      { x: 60, y: 80, r: 7.5 },
      { x: 80, y: 76, r: 9 },
      { x: 99, y: 66, r: 8 },
      { x: 117, y: 52, r: 7 },
      { x: 132, y: 38, r: 8.5 },
      { x: 145, y: 24, r: 6.5 },
    ].map((p, idx) => (
      <g key={idx} filter="url(#pearlShadow)">
        <circle cx={p.x} cy={p.y} r={p.r} fill="url(#pearlGrad)" />
        <circle cx={p.x - p.r * 0.28} cy={p.y - p.r * 0.28} r={p.r * 0.22} fill="#FFFFFF" fillOpacity="0.85" />
      </g>
    ))}
  </svg>
);
