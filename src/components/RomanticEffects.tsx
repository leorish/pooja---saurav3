import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface RosePetalsOverlayProps {
  active: boolean;
  density?: 'opening' | 'celebration';
}

const PETAL_SPECS = [
  { id: 1, x: '12%', delay: 0.1, duration: 5.2, size: 18, rotateStart: -20, rotateEnd: 145, color: '#6E2530' },
  { id: 2, x: '24%', delay: 0.45, duration: 6.1, size: 15, rotateStart: 35, rotateEnd: -120, color: '#8A3944' },
  { id: 3, x: '37%', delay: 0.25, duration: 5.7, size: 20, rotateStart: -15, rotateEnd: 165, color: '#EFE0C4' },
  { id: 4, x: '51%', delay: 0.65, duration: 6.4, size: 16, rotateStart: 12, rotateEnd: -140, color: '#581F2A' },
  { id: 5, x: '66%', delay: 0.18, duration: 5.4, size: 19, rotateStart: -30, rotateEnd: 125, color: '#DFC69F' },
  { id: 6, x: '79%', delay: 0.52, duration: 5.9, size: 17, rotateStart: 25, rotateEnd: -150, color: '#702D35' },
  { id: 7, x: '89%', delay: 0.35, duration: 6.2, size: 15, rotateStart: -10, rotateEnd: 110, color: '#581F2A' },
  { id: 8, x: '44%', delay: 0.9, duration: 6.5, size: 14, rotateStart: 40, rotateEnd: -95, color: '#7D2E39' },
];

/**
 * Natural drifting rose petals used delicately during envelope opening
 * or on Wedding Day (20 November 2026 IST).
 */
export const RosePetalsOverlay: React.FC<RosePetalsOverlayProps> = ({
  active,
  density = 'opening',
}) => {
  const prefersReducedMotion = useReducedMotion();
  if (!active || prefersReducedMotion) return null;

  const petals = density === 'opening' ? PETAL_SPECS : PETAL_SPECS.slice(0, 6);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: '-8vh',
            x: 0,
            opacity: 0,
            rotate: petal.rotateStart,
          }}
          animate={{
            y: '108vh',
            x: [0, 22, -18, 12],
            opacity: [0, 0.85, 0.8, 0],
            rotate: petal.rotateEnd,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: density === 'celebration' ? Infinity : 0,
            repeatDelay: density === 'celebration' ? 2.4 : 0,
            ease: 'easeInOut',
          }}
          style={{ left: petal.x }}
          className="absolute top-0"
        >
          <svg
            width={petal.size}
            height={petal.size * 1.25}
            viewBox="0 0 24 30"
            fill="none"
          >
            <path
              d="M12,2 C19,5 23,13 20,21 C17,27 8,29 4,23 C0,17 4,6 12,2 Z"
              fill={petal.color}
              fillOpacity="0.88"
            />
            <path
              d="M12,4 C15,10 15,18 11,25"
              stroke="#B2945E"
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Subtle antique gold sparkles breathing gently around the P & S monogram.
 */
export const MonogramSparkles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  const stars = [
    { cx: 14, cy: 16, r: 4.5, delay: 0 },
    { cx: 106, cy: 12, r: 3.8, delay: 1.1 },
    { cx: 112, cy: 36, r: 3.2, delay: 0.5 },
    { cx: 8, cy: 38, r: 3.5, delay: 1.7 },
  ];

  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {stars.map((s, idx) => (
        <motion.path
          key={idx}
          d={`M${s.cx},${s.cy - s.r} L${s.cx + s.r * 0.28},${s.cy - s.r * 0.28} L${s.cx + s.r},${s.cy} L${s.cx + s.r * 0.28},${s.cy + s.r * 0.28} L${s.cx},${s.cy + s.r} L${s.cx - s.r * 0.28},${s.cy + s.r * 0.28} L${s.cx - s.r},${s.cy} L${s.cx - s.r * 0.28},${s.cy - s.r * 0.28} Z`}
          fill="#B2945E"
          initial={{ opacity: 0.25, scale: 0.85 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.55 }
              : { opacity: [0.2, 0.85, 0.2], scale: [0.8, 1.15, 0.8] }
          }
          transition={{
            duration: 3.4,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
        />
      ))}
    </svg>
  );
};

/**
 * Soft warm candlelight-inspired radial aura behind centerpiece cards.
 */
export const CandlelightGlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      animate={
        prefersReducedMotion
          ? { opacity: 0.5 }
          : { opacity: [0.42, 0.62, 0.45], scale: [0.98, 1.03, 0.99] }
      }
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none rounded-full bg-[radial-gradient(circle,rgba(239,205,142,0.38)_0%,rgba(210,162,92,0.12)_48%,transparent_72%)] blur-2xl ${className}`}
    />
  );
};
