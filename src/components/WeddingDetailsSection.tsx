import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { SingleRoseVignette } from './BotanicalArtwork';
import { CornerFiligree, GoldFlourish } from './StationeryOrnaments';

export const WeddingDetailsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const hasOptionalDetails =
    Boolean(weddingConfig.venue) ||
    weddingConfig.ceremonySchedule.length > 0 ||
    Boolean(weddingConfig.dressCode) ||
    Boolean(weddingConfig.accommodation) ||
    Boolean(weddingConfig.transportation) ||
    weddingConfig.weddingEvents.length > 0;

  return (
    <section
      id="details"
      aria-label="Wedding Details"
      className="paper-ivory-surface relative px-4 py-18 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* Heading Block */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <SingleRoseVignette className="mb-2 h-14 w-24 sm:h-16 sm:w-28" />
          <span className="font-display text-xs font-medium tracking-[0.38em] text-[#7B6134] uppercase">
            THE
          </span>
          <h2 className="font-vibes -mt-1 text-5xl font-normal text-[#581F2A] sm:text-6xl">
            Details
          </h2>
          <div className="mt-4">
            <GoldFlourish className="h-5 w-48 sm:w-56" />
          </div>
        </motion.div>

        {/* Large Vintage Double-Line Ornamental Frame */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="cardstock-ivory relative mt-10 p-3 shadow-[0_20px_44px_rgba(61,35,24,0.14)] sm:p-4"
        >
          <div className="relative border border-[#B2945E]/80 p-1.5">
            <div className="relative border border-[#B2945E]/55 px-6 py-12 text-center sm:px-12 sm:py-16">
              <CornerFiligree className="absolute left-2 top-2 h-9 w-9 sm:h-11 sm:w-11" />
              <CornerFiligree className="absolute right-2 top-2 h-9 w-9 rotate-90 sm:h-11 sm:w-11" />
              <CornerFiligree className="absolute bottom-2 left-2 h-9 w-9 -rotate-90 sm:h-11 sm:w-11" />
              <CornerFiligree className="absolute bottom-2 right-2 h-9 w-9 rotate-180 sm:h-11 sm:w-11" />

              <div className="mx-auto flex max-w-xl flex-col gap-10">
                {/* Confirmed: The Wedding */}
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B2945E]/60 text-[#7B6134]">
                    <Calendar className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xs font-medium tracking-[0.28em] text-[#7B6134] uppercase sm:text-sm">
                    The Wedding
                  </h3>
                  <p className="font-editorial mt-2 text-2xl font-medium text-[#581F2A] sm:text-3xl">
                    {weddingConfig.weddingDateFormatted}
                  </p>
                </div>

                <div className="mx-auto h-[1px] w-24 bg-[#B2945E]/40" />

                {/* Confirmed: The Couple */}
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B2945E]/60 text-[#7B6134]">
                    <Heart className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xs font-medium tracking-[0.28em] text-[#7B6134] uppercase sm:text-sm">
                    The Couple
                  </h3>
                  <p className="font-script mt-2 text-4xl leading-tight text-[#581F2A] sm:text-5xl">
                    {weddingConfig.bride} &amp; {weddingConfig.groom}
                  </p>
                </div>

                <div className="mx-auto h-[1px] w-24 bg-[#B2945E]/40" />

                {/* Confirmed: A Celebration of Love */}
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B2945E]/60 text-[#7B6134]">
                    <Sparkles className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xs font-medium tracking-[0.28em] text-[#7B6134] uppercase sm:text-sm">
                    A Celebration of Love
                  </h3>
                  <p className="font-editorial mt-2 max-w-md text-lg italic leading-relaxed text-[#493027] sm:text-xl">
                    {weddingConfig.detailsLead}
                  </p>
                </div>

                {/* Optional Sections — Hidden cleanly until real info is supplied in weddingConfig.ts */}
                {hasOptionalDetails && (
                  <>
                    <div className="mx-auto h-[1px] w-32 bg-[#B2945E]/45" />
                    <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
                      {weddingConfig.venue && (
                        <div>
                          <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                            Wedding Venue
                          </h3>
                          <p className="font-editorial mt-2 text-lg font-medium text-[#581F2A]">
                            {weddingConfig.venue.name}
                          </p>
                          <p className="font-editorial text-base text-[#493027]/90">
                            {weddingConfig.venue.address}, {weddingConfig.venue.city}
                          </p>
                        </div>
                      )}

                      {weddingConfig.dressCode && (
                        <div>
                          <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                            Dress Code
                          </h3>
                          <p className="font-editorial mt-2 text-lg text-[#493027]">
                            {weddingConfig.dressCode}
                          </p>
                        </div>
                      )}

                      {weddingConfig.accommodation && (
                        <div>
                          <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                            Accommodation
                          </h3>
                          <p className="font-editorial mt-2 text-base text-[#493027]">
                            {weddingConfig.accommodation}
                          </p>
                        </div>
                      )}

                      {weddingConfig.transportation && (
                        <div>
                          <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                            Transportation
                          </h3>
                          <p className="font-editorial mt-2 text-base text-[#493027]">
                            {weddingConfig.transportation}
                          </p>
                        </div>
                      )}
                    </div>

                    {weddingConfig.ceremonySchedule.length > 0 && (
                      <div className="pt-4">
                        <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                          Ceremony Schedule
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {weddingConfig.ceremonySchedule.map((item, idx) => (
                            <li key={idx} className="font-editorial text-lg text-[#493027]">
                              <span className="font-medium text-[#581F2A]">{item.time}</span> —{' '}
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {weddingConfig.weddingEvents.length > 0 && (
                      <div className="pt-4">
                        <h3 className="font-display text-xs tracking-[0.26em] text-[#7B6134] uppercase">
                          Wedding Events
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {weddingConfig.weddingEvents.map((ev, idx) => (
                            <li key={idx} className="font-editorial text-lg text-[#493027]">
                              <span className="font-medium text-[#581F2A]">{ev.name}</span> ·{' '}
                              {ev.date}
                              {ev.time ? ` · ${ev.time}` : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
