import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Download } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BotanicalSprig,
  BurgundyRoseClusterBottomLeft,
  BurgundyRoseClusterTopRight,
  PearlBeadsCluster,
  SingleRoseVignette,
} from './BotanicalArtwork';
import { CandlelightGlow, MonogramSparkles } from './RomanticEffects';
import { CornerFiligree, GoldFlourish, WaxSeal } from './StationeryOrnaments';

interface StationeryFlatLayProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenPrintable: () => void;
}

export const StationeryFlatLay: React.FC<StationeryFlatLayProps> = ({
  onNavigateToSection,
  onOpenPrintable,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const d = (s: number) => (prefersReducedMotion ? 0.01 : s);

  return (
    <section
      id="invitation"
      aria-label="Wedding Invitation Stationery"
      className="paper-ivory-surface relative w-full overflow-x-clip px-4 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-10 lg:pt-12"
    >
      {/* Subtle warm radial vignette on stationery table */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_40%,rgba(130,101,68,0.12)_100%)]"
      />

      {/* Desktop & Mobile Artistic Flat-Lay Canvas */}
      <div className="relative mx-auto max-w-[1140px]">
        {/* Main Flat Lay Stage */}
        <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-4">
          {/* LEFT SIDE: Opened Burgundy Envelope + Secondary Olive Card + Pearls */}
          <div className="relative flex flex-col items-center lg:col-span-5 lg:items-start lg:pt-10">
            {/* Botanical sprig tucked beneath envelope */}
            <motion.div
              initial={{ opacity: 0, rotate: -18, y: 14 }}
              animate={{ opacity: 1, rotate: -14, y: 0 }}
              transition={{ duration: d(0.9), delay: d(0.25), ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -left-4 -top-10 z-0 w-24 opacity-90 sm:left-4 sm:-top-14 sm:w-28 lg:-left-8 lg:-top-12"
            >
              <BotanicalSprig className="h-auto w-full" />
            </motion.div>

            {/* Opened Burgundy Envelope resting on left */}
            <motion.div
              initial={{ opacity: 0, x: 38, rotate: -1 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: d(0.95), ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-[290px] max-w-full sm:w-[370px] lg:ml-2 lg:w-[390px]"
            >
              {/* Soft table shadow under opened envelope */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 left-4 right-4 h-7 rounded-[50%] bg-[#361B13]/26 blur-lg"
              />

              {/* Opened Flap extending upward showing floral liner */}
              <div
                className="relative mx-auto h-[108px] w-full sm:h-[132px]"
                style={{ filter: 'drop-shadow(0 -2px 6px rgba(42,16,18,0.18))' }}
              >
                {/* Burgundy outer trim behind floral liner */}
                <div
                  className="paper-burgundy absolute inset-0"
                  style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                />
                {/* Floral patterned ivory liner */}
                <div
                  className="liner-floral-ivory absolute inset-x-[6px] bottom-0 top-[6px]"
                  style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
                />
              </div>

              {/* Envelope Pocket Body */}
              <div className="paper-burgundy relative h-[196px] w-full overflow-hidden rounded-b-[3px] shadow-[0_20px_38px_rgba(44,16,20,0.28)] sm:h-[238px]">
                {/* Inner floral liner peek inside pocket opening */}
                <div className="liner-floral-ivory absolute inset-x-2 top-0 h-10 border-b border-[#B2945E]/35" />

                {/* Left, Right & Bottom pocket folds */}
                <div
                  className="paper-burgundy absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 52% 52%, 0 100%)',
                    filter: 'drop-shadow(2px 0 3px rgba(24,5,9,0.28))',
                  }}
                />
                <div
                  className="paper-burgundy absolute inset-0"
                  style={{
                    clipPath: 'polygon(100% 0, 48% 52%, 100% 100%)',
                    filter: 'drop-shadow(-2px 0 3px rgba(24,5,9,0.28))',
                  }}
                />
                <div
                  className="paper-burgundy absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 100%, 50% 42%, 100% 100%)',
                    filter: 'drop-shadow(0 -3px 5px rgba(24,5,9,0.34))',
                  }}
                />
                <svg viewBox="0 0 390 238" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path
                    d="M0,238 L195,100 L390,238"
                    fill="none"
                    stroke="#B2945E"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Matching floral accent resting at bottom-left edge of opened envelope */}
              <div className="pointer-events-none absolute -bottom-10 -left-8 z-20 w-32 sm:-bottom-12 sm:-left-12 sm:w-40">
                <BurgundyRoseClusterBottomLeft className="h-auto w-full" />
              </div>

              {/* Loose Wax Seal & Antique Pearl Beads resting near envelope */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: d(0.8), delay: d(0.35) }}
                className="pointer-events-none absolute -right-4 top-20 z-20 sm:-right-7 sm:top-24"
              >
                <WaxSeal size="sm" className="h-14 w-14 rotate-12 sm:h-16 sm:w-16" />
              </motion.div>
            </motion.div>

            {/* Antique Pearl Beads Strand */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.9), delay: d(0.4) }}
              className="pointer-events-none relative z-20 -mt-3 ml-28 w-36 sm:ml-44 sm:w-44 lg:-mt-4 lg:ml-40"
            >
              <PearlBeadsCluster className="h-auto w-full" />
            </motion.div>

            {/* Secondary Decorative Olive-Brown Invitation Card overlapping lower-left */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 2.5 }}
              transition={{ duration: d(0.9), delay: d(0.28), ease: [0.22, 1, 0.36, 1] }}
              className="cardstock-olive relative z-20 -mt-2 w-[268px] max-w-full p-3 shadow-[0_18px_36px_rgba(45,28,18,0.28)] sm:w-[305px] lg:-mt-4 lg:ml-14"
            >
              <div className="relative border border-[#B2945E]/75 px-5 py-7 text-center text-[#F5E8D0]">
                {/* Corner floral line-art accents */}
                <CornerFiligree className="absolute left-1.5 top-1.5 h-6 w-6 opacity-80" />
                <CornerFiligree className="absolute right-1.5 top-1.5 h-6 w-6 rotate-90 opacity-80" />
                <CornerFiligree className="absolute bottom-1.5 left-1.5 h-6 w-6 -rotate-90 opacity-80" />
                <CornerFiligree className="absolute bottom-1.5 right-1.5 h-6 w-6 rotate-180 opacity-80" />

                <p className="font-display text-[10px] tracking-[0.28em] text-[#EFE0C4] uppercase">
                  PLEASE JOIN US
                </p>
                <p className="font-display mt-1.5 text-[10px] tracking-[0.24em] text-[#EFE0C4]/85 uppercase">
                  FOR THE WEDDING OF
                </p>
                <p className="font-script mt-3 text-4xl leading-none text-[#F5E8D0] sm:text-[2.6rem]">
                  {weddingConfig.coupleDisplay}
                </p>
              </div>
            </motion.div>
          </div>

          {/* CENTER-RIGHT: Main Tall Antique Ivory Invitation Card */}
          <div className="relative flex flex-col items-center lg:col-span-4 lg:-ml-4">
            <CandlelightGlow className="absolute left-1/2 top-1/2 h-96 w-80 -translate-x-1/2 -translate-y-1/2" />
            <motion.article
              initial={{ opacity: 0, x: -34, y: 12, rotate: 0 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 1.2 }}
              transition={{ duration: d(0.95), delay: d(0.08), ease: [0.22, 1, 0.36, 1] }}
              className="cardstock-ivory relative z-20 w-full max-w-[390px] p-3.5 shadow-[0_24px_48px_rgba(61,35,24,0.22),0_4px_12px_rgba(61,35,24,0.1)] sm:p-4"
            >
              {/* Double-line antique golden border with decorated corners */}
              <div className="relative border border-[#B2945E]/80 p-1.5">
                <div className="relative border border-[#B2945E]/55 px-6 pb-8 pt-9 text-center sm:px-8 sm:pb-10 sm:pt-11">
                  <CornerFiligree className="absolute left-1.5 top-1.5 h-8 w-8" />
                  <CornerFiligree className="absolute right-1.5 top-1.5 h-8 w-8 rotate-90" />
                  <CornerFiligree className="absolute bottom-1.5 left-1.5 h-8 w-8 -rotate-90" />
                  <CornerFiligree className="absolute bottom-1.5 right-1.5 h-8 w-8 rotate-180" />

                  {/* Monogram with subtle golden sparkles */}
                  <div className="relative inline-flex items-center justify-center px-8 py-1">
                    <MonogramSparkles className="absolute inset-0 h-full w-full" />
                    <p className="font-display relative z-10 text-sm font-medium tracking-[0.34em] text-[#7B6134] uppercase">
                      {weddingConfig.monogram}
                    </p>
                  </div>

                  <div className="mx-auto my-3 h-[1px] w-14 bg-[#B2945E]/55" />

                  <p className="font-editorial text-sm italic tracking-wide text-[#493027]/85 sm:text-base">
                    Together with their families
                  </p>

                  {/* Couple Names */}
                  <h2 className="font-script mt-4 text-[2.75rem] leading-[1.06] text-[#581F2A] sm:text-[3.2rem]">
                    {weddingConfig.bride}
                  </h2>
                  <p className="font-editorial my-1 text-lg italic text-[#7B6134]">&amp;</p>
                  <h2 className="font-script text-[2.75rem] leading-[1.06] text-[#581F2A] sm:text-[3.2rem]">
                    {weddingConfig.groom}
                  </h2>

                  <p className="font-editorial mt-5 text-sm tracking-wide text-[#493027]/90 sm:text-base">
                    Invite you to celebrate their wedding
                  </p>

                  {/* Formal Vintage Date Layout: NOVEMBER — 20 — 2026 / FRIDAY */}
                  <div className="my-6 border-y border-[#B2945E]/45 py-4">
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
                      <span className="font-display text-[11px] font-medium tracking-[0.22em] text-[#493027] sm:text-xs">
                        {weddingConfig.weddingMonthLabel}
                      </span>
                      <span className="h-[1px] w-4 bg-[#B2945E]" aria-hidden="true" />
                      <span className="font-display text-3xl font-semibold leading-none text-[#581F2A] tabular-nums sm:text-4xl">
                        {weddingConfig.weddingDayNumber}
                      </span>
                      <span className="h-[1px] w-4 bg-[#B2945E]" aria-hidden="true" />
                      <span className="font-display text-[11px] font-medium tracking-[0.22em] text-[#493027] sm:text-xs">
                        {weddingConfig.weddingYear}
                      </span>
                    </div>
                    <p className="font-display mt-2 text-[11px] tracking-[0.3em] text-[#7B6134] uppercase">
                      {weddingConfig.weddingDayOfWeek}
                    </p>
                  </div>

                  <p className="font-editorial mx-auto max-w-[260px] text-sm italic leading-relaxed text-[#493027]/90 sm:text-[15px]">
                    {weddingConfig.invitationTagline}
                  </p>

                  <div className="mt-6 flex justify-center">
                    <GoldFlourish className="h-5 w-40" />
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Royal Vintage Download Printable Version Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.85), delay: d(0.42), ease: [0.22, 1, 0.36, 1] }}
              className="no-print relative z-20 mt-8 flex flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={onOpenPrintable}
                className="group relative inline-flex min-h-[48px] cursor-pointer items-center justify-center bg-[#581F2A] p-1 text-[#F5E8D0] shadow-[0_10px_26px_rgba(62,22,28,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(178,148,94,0.42),0_8px_20px_rgba(88,31,42,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]"
              >
                {/* Thin antique gold double-line border */}
                <span className="relative flex items-center gap-2.5 border border-[#B2945E]/85 px-6 py-2.5 transition-colors duration-300 group-hover:border-[#E2C994]">
                  <span className="pointer-events-none absolute inset-[3px] border border-[#B2945E]/45 transition-colors duration-300 group-hover:border-[#E2C994]/70" />

                  {/* Decorative ornamental corners */}
                  <CornerFiligree className="pointer-events-none absolute left-0.5 top-0.5 h-3.5 w-3.5 opacity-90" />
                  <CornerFiligree className="pointer-events-none absolute right-0.5 top-0.5 h-3.5 w-3.5 rotate-90 opacity-90" />
                  <CornerFiligree className="pointer-events-none absolute bottom-0.5 left-0.5 h-3.5 w-3.5 -rotate-90 opacity-90" />
                  <CornerFiligree className="pointer-events-none absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rotate-180 opacity-90" />

                  <Download
                    className="relative z-10 h-4 w-4 text-[#B2945E] transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-[#E2C994]"
                    aria-hidden="true"
                  />
                  <span className="font-editorial relative z-10 text-base font-medium tracking-[0.06em] text-[#F5E8D0] sm:text-[17px]">
                    Download Printable Version
                  </span>
                </span>
              </button>

              <p className="font-editorial mt-2.5 text-sm italic text-[#7B6134]">
                A little keepsake of our beautiful beginning.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Hanging Details Tag + Miniature RSVP Booklet + Florals */}
          <div className="relative flex flex-col items-center gap-9 lg:col-span-3 lg:items-center lg:pt-6">
            {/* Upper-right lush floral spray with gentle sway */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(1.0), delay: d(0.35) }}
              className="pointer-events-none absolute -right-8 -top-12 z-10 hidden w-48 lg:block"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { rotate: [-1, 1, -1] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: 'top center' }}
              >
                <BurgundyRoseClusterTopRight className="h-auto w-full opacity-95" />
              </motion.div>
            </motion.div>

            {/* Wedding Details Hanging Paper Tag with Silk Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -3.5 }}
              transition={{ duration: d(0.85), delay: d(0.32), ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 flex flex-col items-center lg:mt-16"
            >
              {/* Olive/Champagne Silk Ribbon Hanging Loop */}
              <div aria-hidden="true" className="relative -mb-3 flex flex-col items-center">
                <div className="h-12 w-3.5 rounded-t-full bg-gradient-to-b from-[#8A825B] via-[#77704C] to-[#5E583A] shadow-sm" />
                <div className="h-2.5 w-8 -mt-1.5 rounded-full bg-gradient-to-r from-[#C8B287] via-[#EFE0C4] to-[#B2945E] shadow" />
              </div>

              <button
                type="button"
                onClick={() => onNavigateToSection('details')}
                className="cardstock-ivory group relative flex min-h-[44px] w-[205px] cursor-pointer flex-col items-center border border-[#B2945E]/70 px-5 pb-6 pt-6 text-center shadow-[0_14px_28px_rgba(58,34,24,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(58,34,24,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]"
                style={{
                  clipPath: 'polygon(14% 0, 86% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)',
                }}
              >
                {/* Brass/Gold Eyelet */}
                <span
                  aria-hidden="true"
                  className="mb-2 h-3 w-3 rounded-full border-2 border-[#B2945E] bg-[#EFE0C4] shadow-inner"
                />
                <SingleRoseVignette className="mb-1 h-12 w-20" />
                <span className="font-vibes text-[2.1rem] leading-none text-[#581F2A] transition-colors group-hover:text-[#702D35]">
                  The Details
                </span>
                <span className="font-display mt-2.5 text-[10px] tracking-[0.26em] text-[#7B6134] uppercase">
                  VIEW DETAILS
                </span>
              </button>
            </motion.div>

            {/* Miniature Antique Ivory RSVP Invitation Booklet */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: d(0.85), delay: d(0.45), ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20"
            >
              <button
                type="button"
                onClick={() => onNavigateToSection('rsvp')}
                className="cardstock-ivory group relative w-[238px] cursor-pointer p-2.5 text-center shadow-[0_16px_34px_rgba(58,34,24,0.22)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_rgba(58,34,24,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5E8D0]"
              >
                {/* Delicate champagne ribbon tie along left fold */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-2.5 top-3 w-[2px] bg-gradient-to-b from-[#B2945E]/30 via-[#B2945E]/80 to-[#B2945E]/30"
                />
                <div className="border border-[#B2945E]/70 px-5 py-6">
                  <p className="font-editorial text-sm italic text-[#7B6134]">Kindly</p>
                  <p className="font-display mt-1 text-2xl font-medium tracking-[0.26em] text-[#581F2A] transition-colors group-hover:text-[#702D35]">
                    RSVP
                  </p>
                  <div className="mx-auto my-3 h-[1px] w-10 bg-[#B2945E]/60" />
                  <p className="font-editorial text-[15px] italic leading-snug text-[#493027]">
                    We would love to celebrate with you.
                  </p>
                  <span className="font-display mt-4 inline-block border-b border-[#B2945E]/65 pb-0.5 text-[10px] tracking-[0.24em] text-[#7B6134] uppercase group-hover:border-[#581F2A] group-hover:text-[#581F2A]">
                    RESPOND NOW
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
