import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CalendarPlus, Download } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { SingleRoseVignette } from './BotanicalArtwork';
import { CornerFiligree, GoldFlourish } from './StationeryOrnaments';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
// November 2026 starts on Sunday (0 offset) and has 30 days; Nov 20 is a Friday.
const NOVEMBER_2026_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

function buildGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${weddingConfig.coupleDisplay} — Wedding`,
    dates: '20261120/20261121',
    details: `${weddingConfig.invitationTagline}\nTogether with their families, ${weddingConfig.bride} & ${weddingConfig.groom} invite you to celebrate their wedding.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsContent(): string {
  const uid = `pooja-saurav-20261120@wedding-invitation`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pooja & Saurav//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    'DTSTAMP:20260101T000000Z',
    'DTSTART;VALUE=DATE:20261120',
    'DTEND;VALUE=DATE:20261121',
    `SUMMARY:${weddingConfig.coupleDisplay} — Wedding`,
    `DESCRIPTION:${weddingConfig.invitationTagline} Together with their families, ${weddingConfig.bride} & ${weddingConfig.groom} invite you to celebrate their wedding.`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function downloadIcsFile(filename: string): void {
  const content = buildIcsContent();
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const WeddingCalendarSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const googleCalUrl = buildGoogleCalendarUrl();

  return (
    <section
      id="calendar"
      aria-label="Wedding Calendar"
      className="paper-ivory-surface relative px-4 py-16 sm:px-6 sm:py-22"
    >
      <div className="mx-auto max-w-xl">
        {/* Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <SingleRoseVignette className="mb-2 h-12 w-22 sm:h-14 sm:w-24" />
          <h2 className="font-vibes text-4xl font-normal text-[#581F2A] sm:text-5xl">
            The Day Our Forever Begins
          </h2>
          <p className="font-display mt-2 text-[11px] tracking-[0.28em] text-[#7B6134] uppercase">
            SAVE THE DATE · FRIDAY, 20 NOVEMBER 2026
          </p>
          <div className="mt-4">
            <GoldFlourish className="h-4 w-44" />
          </div>
        </motion.div>

        {/* Vintage Paper Calendar Card */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="cardstock-ivory relative mt-9 p-3 shadow-[0_20px_44px_rgba(61,35,24,0.15)] sm:p-4"
        >
          <div className="relative border border-[#B2945E]/80 p-1.5">
            <div className="relative border border-[#B2945E]/50 px-4 py-8 sm:px-9 sm:py-10">
              <CornerFiligree className="absolute left-1.5 top-1.5 h-7 w-7" />
              <CornerFiligree className="absolute right-1.5 top-1.5 h-7 w-7 rotate-90" />
              <CornerFiligree className="absolute bottom-1.5 left-1.5 h-7 w-7 -rotate-90" />
              <CornerFiligree className="absolute bottom-1.5 right-1.5 h-7 w-7 rotate-180" />

              {/* Month Title */}
              <div className="mb-6 border-b border-[#B2945E]/40 pb-4 text-center">
                <p className="font-display text-lg font-medium tracking-[0.32em] text-[#581F2A] uppercase sm:text-xl">
                  NOVEMBER 2026
                </p>
              </div>

              {/* Weekday Headers */}
              <div className="mb-3 grid grid-cols-7 text-center">
                {WEEKDAYS.map((day) => (
                  <span
                    key={day}
                    className={`font-display text-[10px] tracking-[0.14em] sm:text-[11px] ${
                      day === 'FRI' ? 'font-semibold text-[#581F2A]' : 'text-[#7B6134]'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-2 text-center sm:gap-y-2.5">
                {NOVEMBER_2026_DAYS.map((day) => {
                  const isWeddingDay = day === 20;
                  return (
                    <div
                      key={day}
                      className="relative flex h-10 items-center justify-center sm:h-12"
                    >
                      {isWeddingDay ? (
                        <div className="relative flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
                          {/* Handwritten Burgundy Heart circling 20 */}
                          <svg
                            viewBox="0 0 56 52"
                            fill="none"
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full"
                          >
                            <motion.path
                              d="M28,46 C15,37 5,28 5,17 C5,9.5 11.2,5 17.8,5 C22.5,5 26,7.8 28,11.8 C30,7.8 33.5,5 38.2,5 C44.8,5 51,9.5 51,17 C51,28 41,37 28,46 Z"
                              fill="#581F2A"
                              fillOpacity="0.1"
                              stroke="#581F2A"
                              strokeWidth="2.1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{
                                duration: prefersReducedMotion ? 0.01 : 1.25,
                                delay: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </svg>
                          <span
                            aria-label="Friday, 20 November 2026 — Wedding Day"
                            className="font-display relative z-10 text-base font-semibold text-[#581F2A] tabular-nums sm:text-lg"
                          >
                            20
                          </span>
                        </div>
                      ) : (
                        <span className="font-editorial text-base text-[#493027]/85 tabular-nums sm:text-lg">
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* All-day calendar actions */}
              <div className="mt-8 border-t border-[#B2945E]/40 pt-6">
                <p className="font-editorial mb-4 text-center text-sm italic text-[#7B6134]">
                  Save Friday, 20 November 2026 to your calendar
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#B2945E]/75 bg-[#581F2A] px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] text-[#F5E8D0] uppercase transition-colors hover:bg-[#702D35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
                  >
                    <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add to Google Calendar
                  </a>

                  <button
                    type="button"
                    onClick={() => downloadIcsFile('Pooja-and-Saurav-Apple-Calendar.ics')}
                    className="font-display inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 border border-[#B2945E]/80 bg-[#EFE0C4] px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] text-[#493027] uppercase transition-colors hover:border-[#581F2A] hover:bg-[#581F2A] hover:text-[#F5E8D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
                  >
                    <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Add to Apple Calendar
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadIcsFile('Pooja-and-Saurav-Wedding.ics')}
                    className="font-display inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 border border-[#B2945E]/65 bg-transparent px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] text-[#581F2A] uppercase transition-colors hover:bg-[#EFE0C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download Calendar Invitation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
