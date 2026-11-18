import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { BurgundyRoseClusterBottomLeft, BurgundyRoseClusterTopRight } from './BotanicalArtwork';
import { GoldFlourish, RoyalWeddingCrest } from './StationeryOrnaments';

interface RomanticFooterProps {
  onBackToInvitation: () => void;
  onReopenEnvelope: () => void;
}

export const RomanticFooter: React.FC<RomanticFooterProps> = ({
  onBackToInvitation,
  onReopenEnvelope,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      aria-label="With Love"
      className="damask-burgundy relative overflow-hidden border-t border-[#B2945E]/40 px-4 py-20 text-center text-[#F5E8D0] sm:py-24"
    >
      {/* Delicate gold inner hairline frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-[#B2945E]/20 sm:inset-7"
      />

      {/* Subtle botanical rose flourishes framing the burgundy damask footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-10 w-44 opacity-45 sm:-right-10 sm:w-60"
      >
        <BurgundyRoseClusterTopRight className="h-auto w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 w-40 opacity-45 sm:-left-6 sm:w-52"
      >
        <BurgundyRoseClusterBottomLeft className="h-auto w-full" />
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex max-w-xl flex-col items-center"
      >
        <h2 className="font-vibes text-5xl font-normal text-[#F5E8D0] sm:text-6xl">
          With Love
        </h2>

        <div className="mt-3 mb-7">
          <GoldFlourish tone="ivory" className="h-4 w-40 opacity-75" />
        </div>

        {/* Royal Wedding Crest */}
        <RoyalWeddingCrest className="h-auto w-52 sm:w-60" />

        <p className="font-display mt-7 text-xs font-medium tracking-[0.26em] text-[#EFE0C4] uppercase sm:text-sm">
          {weddingConfig.footerQuote}
        </p>

        <p className="font-script mt-5 text-4xl text-[#F5E8D0] sm:text-5xl">
          {weddingConfig.coupleDisplay}
        </p>

        <p className="font-display mt-2 text-xs tracking-[0.34em] text-[#B2945E] sm:text-sm">
          20 November 2026
        </p>

        <p className="font-script mt-5 text-3xl text-[#EFE0C4]/90 sm:text-4xl">
          And so, our forever begins...
        </p>

        {/* Footer Actions */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onBackToInvitation}
            className="font-display min-h-[44px] cursor-pointer border border-[#B2945E]/65 px-7 py-2.5 text-[11px] font-medium tracking-[0.28em] text-[#F5E8D0] uppercase transition-colors duration-200 hover:border-[#F5E8D0] hover:bg-[#F5E8D0] hover:text-[#581F2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#581F2A]"
          >
            BACK TO INVITATION
          </button>

          <button
            type="button"
            onClick={onReopenEnvelope}
            className="font-editorial min-h-[40px] cursor-pointer px-4 py-1 text-sm italic tracking-wide text-[#EFE0C4]/75 underline decoration-[#B2945E]/50 underline-offset-4 transition-colors hover:text-[#F5E8D0] hover:decoration-[#F5E8D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E]"
          >
            Replay Sealed Invitation
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
