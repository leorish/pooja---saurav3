import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { GoldFlourish, WaxSeal } from './StationeryOrnaments';

export const MiniatureSurpriseEnvelope: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => setIsOpen((prev) => !prev);
  const d = (s: number) => (prefersReducedMotion ? 0.01 : s);

  return (
    <section
      aria-label="A Little Note For You"
      className="paper-ivory-surface relative overflow-x-clip border-t border-[#B2945E]/30 px-4 py-16 text-center sm:px-6 sm:py-22"
    >
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <p className="font-editorial text-lg italic tracking-wide text-[#581F2A] sm:text-xl">
          Psst... There&apos;s a little something for you.
        </p>

        {/* Interactive Miniature Sealed Burgundy Envelope */}
        <div className="relative mt-8 flex flex-col items-center">
          {/* Revealed Antique Ivory Note sliding smoothly above when opened */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { opacity: 1, y: 0, height: 'auto', marginBottom: 20 }
                : { opacity: 0, y: 16, height: 0, marginBottom: 0 }
            }
            transition={{ duration: d(0.7), ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[360px] overflow-hidden"
            aria-hidden={!isOpen}
          >
            <div className="cardstock-ivory border border-[#B2945E]/80 p-2 shadow-[0_14px_30px_rgba(61,35,24,0.16)]">
              <div className="border border-[#B2945E]/45 px-6 py-7 text-center">
                <p className="font-editorial text-[17px] italic leading-relaxed text-[#493027]">
                  Of all the gifts we could receive, your presence is the most precious.
                </p>
                <p className="font-editorial mt-3 text-[17px] italic leading-relaxed text-[#493027]">
                  Thank you for being a part of our beautiful beginning.
                </p>
                <div className="my-4 flex justify-center">
                  <GoldFlourish className="h-3.5 w-32" />
                </div>
                <p className="font-editorial text-sm italic text-[#7B6134]">With all our love,</p>
                <p className="font-script mt-1 text-3xl text-[#581F2A]">
                  {weddingConfig.coupleDisplay}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Miniature Envelope Body */}
          <button
            type="button"
            onClick={toggleEnvelope}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close miniature surprise envelope' : 'Open miniature surprise envelope'}
            className="perspective-1200 group relative h-[126px] w-[196px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]"
          >
            {/* Soft ground shadow */}
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-3 right-3 h-5 rounded-[50%] bg-[#361B13]/28 blur-md"
            />

            {/* Envelope back & floral liner */}
            <div className="paper-burgundy relative h-full w-full overflow-hidden rounded-[2px] shadow-[0_14px_26px_rgba(44,16,20,0.28)]">
              <div className="liner-floral-ivory absolute inset-1.5 rounded-[1px]" />

              {/* Side & bottom folds */}
              <div
                className="paper-burgundy absolute inset-0"
                style={{ clipPath: 'polygon(0 0, 52% 55%, 0 100%)' }}
              />
              <div
                className="paper-burgundy absolute inset-0"
                style={{ clipPath: 'polygon(100% 0, 48% 55%, 100% 100%)' }}
              />
              <div
                className="paper-burgundy absolute inset-0"
                style={{
                  clipPath: 'polygon(0 100%, 50% 42%, 100% 100%)',
                  filter: 'drop-shadow(0 -2px 3px rgba(24,5,9,0.32))',
                }}
              />
            </div>

            {/* 3D Top Flap */}
            <motion.div
              animate={{ rotateX: isOpen ? 176 : 0 }}
              transition={{ duration: d(0.65), ease: [0.32, 0.08, 0.24, 1] }}
              style={{ transformOrigin: 'top center', zIndex: isOpen ? 5 : 20 }}
              className="preserve-3d pointer-events-none absolute inset-x-0 top-0 h-[58%]"
            >
              <div
                className="backface-hidden absolute inset-0"
                style={{ filter: 'drop-shadow(0 3px 5px rgba(24,5,9,0.35))' }}
              >
                <div
                  className="paper-burgundy h-full w-full"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </div>
              <div
                className="backface-hidden absolute inset-0"
                style={{ transform: 'rotateX(180deg)' }}
              >
                <div
                  className="liner-floral-ivory h-full w-full"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </div>
            </motion.div>

            {/* Tiny Burgundy Wax Seal */}
            <motion.div
              animate={
                isOpen
                  ? { opacity: 0, scale: 0.75, y: -6 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: d(0.35) }}
              className="pointer-events-none absolute left-1/2 top-[56%] z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group-hover:scale-105"
            >
              <WaxSeal size="sm" className="h-11 w-11" />
            </motion.div>
          </button>

          <button
            type="button"
            onClick={toggleEnvelope}
            className="font-display mt-5 min-h-[36px] cursor-pointer text-[10px] tracking-[0.26em] text-[#7B6134] uppercase underline decoration-[#B2945E]/60 underline-offset-4 transition-colors hover:text-[#581F2A]"
          >
            {isOpen ? 'Tuck Note Back Inside' : 'Tap To Open'}
          </button>
        </div>
      </div>
    </section>
  );
};
