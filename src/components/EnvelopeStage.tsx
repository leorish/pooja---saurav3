import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BurgundyRoseClusterBottomLeft,
  BurgundyRoseClusterTopRight,
} from './BotanicalArtwork';
import { CandlelightGlow, MonogramSparkles, RosePetalsOverlay } from './RomanticEffects';
import { GoldFlourish, WaxSeal } from './StationeryOrnaments';

export type EnvelopePhase = 'sealed' | 'opening' | 'opened';

interface EnvelopeStageProps {
  phase: EnvelopePhase;
  onOpen: () => void;
}

export const EnvelopeStage: React.FC<EnvelopeStageProps> = ({ phase, onOpen }) => {
  const prefersReducedMotion = useReducedMotion();
  const isOpening = phase === 'opening';

  // Gentle timing multiplier so reduced motion respects user preference
  const d = (seconds: number) => (prefersReducedMotion ? 0.01 : seconds);

  return (
    <section
      aria-label="Wedding Invitation Envelope"
      className="paper-ivory-surface relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:py-10"
    >
      {/* Natural rose petals falling softly during envelope opening */}
      <RosePetalsOverlay active={isOpening} density="opening" />

      {/* Subtle ambient warm edge shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(138,108,74,0.14)_100%)]"
      />

      {/* Soft candlelight illumination behind sealed envelope */}
      <CandlelightGlow className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 sm:h-[480px] sm:w-[480px]" />

      {/* Top Header: Decorative gold ornament + A LOVE LETTER FROM + Pooja & Saurav */}
      <motion.div
        animate={
          isOpening
            ? { opacity: 0, y: -18, transition: { duration: d(0.6), delay: d(1.6), ease: [0.22, 1, 0.36, 1] } }
            : { opacity: 1, y: 0 }
        }
        className="relative z-20 mb-6 flex flex-col items-center text-center sm:mb-8"
      >
        {/* 0 - 0.8s: Gold ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: d(0.8), ease: [0.22, 1, 0.36, 1] }}
          className="mb-3"
        >
          <GoldFlourish className="h-5 w-40 sm:w-52" />
        </motion.div>

        {/* 0.8 - 1.5s: A LOVE LETTER FROM */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.65), delay: d(0.75), ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[11px] font-medium tracking-[0.34em] text-[#7B6134] uppercase sm:text-xs"
        >
          A LOVE LETTER FROM
        </motion.p>

        {/* 0.8 - 1.5s: Pooja & Saurav calligraphy reveal */}
        <motion.h1
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: d(0.95), delay: d(0.9), ease: [0.22, 1, 0.36, 1] }}
          className="font-script mt-1 px-2 text-[clamp(2.85rem,9vw,4.75rem)] leading-[1.08] font-normal text-[#581F2A] drop-shadow-[0_1px_1px_rgba(73,48,39,0.08)]"
        >
          {weddingConfig.coupleDisplay}
        </motion.h1>
      </motion.div>

      {/* Central Envelope + Overlapping Florals */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -8 : 0,
          scale: isOpening ? 1.04 : 1,
        }}
        transition={
          isOpening
            ? {
                scale: { duration: d(0.55), ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: d(0.7), delay: d(2.15), ease: 'easeOut' },
                y: { duration: d(0.8), delay: d(1.85), ease: [0.22, 1, 0.36, 1] },
              }
            : { duration: d(0.95), delay: d(1.45), ease: [0.22, 1, 0.36, 1] }
        }
        className="relative z-10 my-2 flex items-center justify-center"
      >
        {/* Envelope container sized responsively for 320px-430px mobile & desktop */}
        <div
          className="perspective-1200 relative h-[210px] w-[300px] sm:h-[290px] sm:w-[440px] md:h-[320px] md:w-[490px]"
        >
          {/* Natural ground shadow underneath envelope */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: d(0.85), delay: d(1.65), ease: 'easeOut' }}
            className="pointer-events-none absolute -bottom-5 left-[4%] right-[4%] h-9 rounded-[50%] bg-[#3B1E14]/30 blur-xl"
          />

          {/* Main Envelope Body (clickable when sealed) */}
          <div
            onClick={phase === 'sealed' ? onOpen : undefined}
            role={phase === 'sealed' ? 'button' : undefined}
            tabIndex={phase === 'sealed' ? 0 : undefined}
            aria-label={phase === 'sealed' ? 'Open wedding invitation envelope' : undefined}
            onKeyDown={
              phase === 'sealed'
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpen();
                    }
                  }
                : undefined
            }
            className={`relative h-full w-full select-none ${
              phase === 'sealed' ? 'cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]' : ''
            }`}
          >
            {/* Inside Back Wall (Floral-patterned Ivory Liner visible once flap opens) */}
            <div className="paper-burgundy absolute inset-0 overflow-hidden rounded-[3px] shadow-[0_20px_45px_rgba(52,18,22,0.34),0_6px_14px_rgba(52,18,22,0.2)]">
              <div className="liner-floral-ivory absolute inset-[6px] rounded-[2px] border border-[#B2945E]/30 shadow-inner" />
            </div>

            {/* Invitation Card rising inside envelope during Step 3 */}
            <motion.div
              aria-hidden="true"
              initial={{ y: 12, opacity: 0 }}
              animate={
                isOpening
                  ? {
                      y: -115,
                      opacity: 1,
                      x: 24,
                      transition: {
                        y: { duration: d(1.05), delay: d(1.0), ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: d(0.3), delay: d(0.95) },
                        x: { duration: d(0.75), delay: d(1.95), ease: [0.22, 1, 0.36, 1] },
                      },
                    }
                  : { y: 12, opacity: 0 }
              }
              className="cardstock-ivory pointer-events-none absolute left-[8%] right-[8%] top-[10%] z-10 flex h-[86%] flex-col items-center justify-start border border-[#B2945E]/60 px-4 pt-5 text-center shadow-[0_8px_24px_rgba(45,22,16,0.22)]"
            >
              <div className="w-full border border-[#B2945E]/50 px-3 py-4">
                <p className="font-display text-[10px] tracking-[0.28em] text-[#7B6134] uppercase sm:text-xs">
                  {weddingConfig.monogram}
                </p>
                <p className="font-editorial mt-1 text-[11px] italic text-[#493027]/80">
                  Together with their families
                </p>
                <p className="font-script mt-1 text-2xl leading-tight text-[#581F2A] sm:text-3xl">
                  {weddingConfig.bride}
                </p>
                <p className="font-editorial text-xs italic text-[#7B6134]">&amp;</p>
                <p className="font-script text-2xl leading-tight text-[#581F2A] sm:text-3xl">
                  {weddingConfig.groom}
                </p>
              </div>
            </motion.div>

            {/* Front Envelope Pocket Folds (Left, Right, Bottom triangular folds) */}
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[3px]">
              {/* Left side fold */}
              <div
                className="paper-burgundy absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 52% 54%, 0 100%)',
                  filter: 'drop-shadow(2px 0 3px rgba(24, 5, 9, 0.3))',
                }}
              />
              {/* Right side fold */}
              <div
                className="paper-burgundy absolute inset-0"
                style={{
                  clipPath: 'polygon(100% 0, 48% 54%, 100% 100%)',
                  filter: 'drop-shadow(-2px 0 3px rgba(24, 5, 9, 0.3))',
                }}
              />
              {/* Bottom triangle fold */}
              <div
                className="paper-burgundy absolute inset-0"
                style={{
                  clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)',
                  filter: 'drop-shadow(0 -3px 5px rgba(20, 4, 8, 0.36))',
                }}
              />
              {/* Fine embossed gold seam highlights */}
              <svg
                viewBox="0 0 490 320"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <path
                  d="M0,320 L245,141 L490,320"
                  fill="none"
                  stroke="#B2945E"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <rect
                  x="7"
                  y="7"
                  width="476"
                  height="306"
                  fill="none"
                  stroke="#B2945E"
                  strokeOpacity="0.16"
                  strokeWidth="0.8"
                />
              </svg>
            </div>

            {/* 3D Animated Top Triangular Flap */}
            <motion.div
              animate={
                isOpening
                  ? {
                      rotateX: 178,
                      transition: {
                        duration: d(0.85),
                        delay: d(0.45),
                        ease: [0.32, 0.08, 0.24, 1],
                      },
                    }
                  : { rotateX: 0 }
              }
              style={{ transformOrigin: 'top center', zIndex: isOpening ? 5 : 30 }}
              className="preserve-3d pointer-events-none absolute inset-x-0 top-0 h-[58%]"
            >
              {/* Outer Burgundy Flap Face */}
              <div
                className="backface-hidden absolute inset-0"
                style={{
                  filter: 'drop-shadow(0 6px 8px rgba(25, 6, 10, 0.42))',
                }}
              >
                <div
                  className="paper-burgundy h-full w-full"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                {/* Subtle embossed border along triangular flap edge */}
                <svg viewBox="0 0 490 186" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path
                    d="M8,4 L245,176 L482,4"
                    fill="none"
                    stroke="#B2945E"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Inner Floral Ivory Liner Face (revealed when flap flips up) */}
              <div
                className="backface-hidden absolute inset-0"
                style={{ transform: 'rotateX(180deg)' }}
              >
                <div
                  className="liner-floral-ivory h-full w-full border border-[#B2945E]/30"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </div>
            </motion.div>

            {/* Central Embossed Burgundy Wax Seal + Subtle Monogram Sparkles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                isOpening
                  ? {
                      opacity: 0,
                      scale: 1.12,
                      rotate: -14,
                      y: -8,
                      transition: { duration: d(0.48), ease: [0.22, 1, 0.36, 1] },
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: d(0.75), delay: d(1.85), ease: [0.22, 1, 0.36, 1] },
                    }
              }
              className="pointer-events-none absolute left-1/2 top-[56%] z-40 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-105"
            >
              <MonogramSparkles className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] opacity-80" />
              <WaxSeal size="lg" className="relative h-[74px] w-[74px] sm:h-[96px] sm:w-[96px]" />
            </motion.div>
          </div>

          {/* 2.5 - 3.5s: Upper-Right Luxury Floral Arrangement with gentle hanging sway */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 10, y: -8 }}
            animate={
              isOpening
                ? {
                    opacity: 1,
                    x: 16,
                    y: -14,
                    transition: { duration: d(1.1), delay: d(0.8), ease: 'easeOut' },
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: d(1.0), delay: d(2.45), ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="pointer-events-none absolute -right-12 -top-14 z-40 w-[165px] sm:-right-20 sm:-top-20 sm:w-[245px] md:-right-24 md:-top-24 md:w-[275px]"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { rotate: [-0.9, 0.9, -0.9] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
            >
              <BurgundyRoseClusterTopRight className="h-auto w-full" />
            </motion.div>
          </motion.div>

          {/* 2.5 - 3.5s: Bottom-Left Matching Smaller Floral Arrangement overlapping the envelope */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: -10, y: 8 }}
            animate={
              isOpening
                ? {
                    opacity: 1,
                    x: -14,
                    y: 12,
                    transition: { duration: d(1.1), delay: d(0.8), ease: 'easeOut' },
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: d(1.0), delay: d(2.6), ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="pointer-events-none absolute -bottom-10 -left-10 z-40 w-[125px] sm:-bottom-14 sm:-left-16 sm:w-[175px] md:-bottom-16 md:-left-20 md:w-[195px]"
          >
            <BurgundyRoseClusterBottomLeft className="h-auto w-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* 2.5 - 3.5s: Opening Button ("OPEN THE INVITATION") */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          isOpening
            ? { opacity: 0, y: 8, transition: { duration: d(0.35), ease: 'easeOut' } }
            : {
                opacity: 1,
                y: 0,
                transition: { duration: d(0.85), delay: d(2.75), ease: [0.22, 1, 0.36, 1] },
              }
        }
        className="relative z-20 mt-9 flex flex-col items-center sm:mt-12"
      >
        <button
          type="button"
          onClick={onOpen}
          disabled={phase !== 'sealed'}
          className="group relative flex min-h-[46px] cursor-pointer flex-col items-center justify-center px-6 py-2.5 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]"
        >
          <span className="font-display text-xs font-medium tracking-[0.32em] text-[#581F2A] transition-colors duration-200 group-hover:text-[#702D35] sm:text-sm">
            OPEN THE INVITATION
          </span>
          {/* Subtle gold ornamental underline */}
          <span className="mt-2 flex items-center gap-2">
            <span className="h-[1px] w-10 bg-[#B2945E]/70 transition-all duration-300 group-hover:w-14 group-hover:bg-[#B2945E]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#B2945E] bg-[#B2945E]/40" />
            <span className="h-[1px] w-10 bg-[#B2945E]/70 transition-all duration-300 group-hover:w-14 group-hover:bg-[#B2945E]" />
          </span>
        </button>
      </motion.div>
    </section>
  );
};
