import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { SingleRoseVignette } from './BotanicalArtwork';
import { CandlelightGlow } from './RomanticEffects';
import { CornerFiligree, WaxSeal } from './StationeryOrnaments';

const LETTER_LINES = [
  'Some moments in life are too beautiful to celebrate alone.',
  'As we begin a new chapter together, we would love to share our happiness, laughter and beautiful memories with you.',
  'Your presence would mean the world to us.',
];

export const HandwrittenLetterSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Handwritten Welcome Letter"
      className="paper-ivory-surface relative overflow-x-clip px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="relative mx-auto max-w-2xl">
        {/* Soft candlelight illumination behind stationery letter */}
        <CandlelightGlow className="absolute -inset-x-8 top-1/2 h-80 -translate-y-1/2" />

        <motion.article
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="cardstock-ivory relative p-3 shadow-[0_22px_48px_rgba(58,34,24,0.16)] sm:p-4"
        >
          {/* Subtle paper fold crease across the middle of the letter */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#B2945E]/30 to-transparent shadow-[0_1px_2px_rgba(73,48,39,0.06)]"
          />

          <div className="relative border border-[#B2945E]/75 p-1.5">
            <div className="relative border border-[#B2945E]/45 px-6 py-12 sm:px-14 sm:py-14">
              <CornerFiligree className="absolute left-2 top-2 h-8 w-8 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute right-2 top-2 h-8 w-8 rotate-90 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute bottom-2 left-2 h-8 w-8 -rotate-90 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute bottom-2 right-2 h-8 w-8 rotate-180 sm:h-10 sm:w-10" />

              {/* Top floral vignette */}
              <div className="mb-7 flex justify-center">
                <SingleRoseVignette className="h-12 w-22 sm:h-14 sm:w-24" />
              </div>

              {/* Animated handwritten letter lines */}
              <div className="mx-auto max-w-lg space-y-5 text-left sm:text-center">
                {LETTER_LINES.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
                    }
                    whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 1.05,
                      delay: prefersReducedMotion ? 0 : 0.18 + index * 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-editorial text-[1.2rem] italic leading-[1.75] text-[#493027] sm:text-[1.35rem]"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Signature & Burgundy Wax Seal */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.85,
                  delay: prefersReducedMotion ? 0 : 1.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mt-9 flex flex-col items-center pt-2"
              >
                <p className="font-editorial text-lg italic text-[#7B6134]">With love,</p>
                <p className="font-script mt-1 text-4xl text-[#581F2A] sm:text-5xl">
                  {weddingConfig.coupleDisplay}
                </p>

                {/* Wax seal stamped softly in bottom-right corner */}
                <div className="mt-4 sm:absolute sm:-bottom-4 sm:right-2 sm:mt-0">
                  <WaxSeal size="sm" className="h-14 w-14 -rotate-6 sm:h-16 sm:w-16" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
