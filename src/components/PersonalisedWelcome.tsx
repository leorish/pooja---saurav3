import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GoldFlourish } from './StationeryOrnaments';
import { WeddingStageIST } from '../utils/istDate';

interface PersonalisedWelcomeProps {
  weddingStage: WeddingStageIST;
}

function getGuestNameFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('guest');
  if (!raw) return null;
  const cleaned = raw.replace(/[<>]/g, '').trim().slice(0, 60);
  return cleaned.length > 0 ? cleaned : null;
}

export const PersonalisedWelcome: React.FC<PersonalisedWelcomeProps> = ({ weddingStage }) => {
  const prefersReducedMotion = useReducedMotion();
  const guestName = useMemo(() => getGuestNameFromUrl(), []);

  return (
    <section
      aria-label="Personalised Guest Welcome"
      className="paper-ivory-surface relative px-4 pb-4 pt-12 text-center sm:px-6 sm:pt-16"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-2xl flex-col items-center"
      >
        {weddingStage === 'wedding_day' && (
          <p className="font-display mb-4 text-[11px] font-medium tracking-[0.32em] text-[#581F2A] uppercase">
            TODAY IS OUR BEAUTIFUL DAY · 20 NOVEMBER 2026
          </p>
        )}

        <h2 className="font-script text-[clamp(2.5rem,7vw,3.85rem)] leading-[1.1] font-normal text-[#581F2A]">
          {guestName ? `Dear ${guestName},` : 'Dear Loved Ones,'}
        </h2>

        <p className="font-editorial mt-3 max-w-xl text-lg italic leading-relaxed text-[#493027]/95 sm:text-xl">
          {weddingStage === 'wedding_day'
            ? 'The morning of our forever has finally arrived, and having you celebrate this day with us fills our hearts with joy.'
            : 'Your presence will make our special day even more beautiful.'}
        </p>

        <div className="mt-6">
          <GoldFlourish className="h-4 w-40 opacity-85" />
        </div>
      </motion.div>
    </section>
  );
};
