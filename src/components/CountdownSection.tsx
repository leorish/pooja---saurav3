import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { getWeddingStageIST, WeddingStageIST } from '../utils/istDate';
import { GoldFlourish } from './StationeryOrnaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (Number.isNaN(targetMs) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function padTwo(val: number): string {
  return String(Math.max(0, val)).padStart(2, '0');
}

interface CountdownSectionProps {
  onStageChange?: (stage: WeddingStageIST) => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onStageChange }) => {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<WeddingStageIST>(() => getWeddingStageIST());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(weddingConfig.weddingTargetIsoIST)
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextStage = getWeddingStageIST();
      setStage((prev) => {
        if (prev !== nextStage && onStageChange) {
          onStageChange(nextStage);
        }
        return nextStage;
      });
      setTimeLeft(calculateTimeLeft(weddingConfig.weddingTargetIsoIST));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [onStageChange]);

  const units = [
    { label: 'DAYS', value: String(Math.max(0, timeLeft.days)).padStart(2, '0') },
    { label: 'HOURS', value: padTwo(timeLeft.hours) },
    { label: 'MINUTES', value: padTwo(timeLeft.minutes) },
    { label: 'SECONDS', value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      aria-label="Wedding Countdown"
      className="paper-ivory-surface relative border-y border-[#B2945E]/30 px-4 py-16 sm:py-24"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {stage === 'before' && (
          <>
            <p className="font-script mb-1 text-3xl text-[#7B6134] sm:text-4xl">
              Today, Tomorrow, Forever.
            </p>
            <h2 className="font-display text-xs font-medium tracking-[0.32em] text-[#581F2A] uppercase sm:text-sm">
              COUNTING DOWN TO OUR DAY
            </h2>

            <div className="my-5">
              <GoldFlourish className="h-5 w-44 sm:w-52" />
            </div>

            <div
              aria-live="polite"
              className="mt-4 flex w-full max-w-[640px] items-start justify-center gap-2 sm:gap-6 md:gap-8"
            >
              {units.map((unit, index) => (
                <React.Fragment key={unit.label}>
                  <div className="flex min-w-0 flex-1 flex-col items-center">
                    <span className="font-display text-[clamp(1.65rem,6.5vw,3.75rem)] leading-none font-normal text-[#493027] tabular-nums">
                      {unit.value}
                    </span>
                    <span className="font-display mt-2.5 text-[9px] tracking-[0.18em] text-[#7B6134] uppercase sm:text-[11px] sm:tracking-[0.26em]">
                      {unit.label}
                    </span>
                  </div>
                  {index < units.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="font-display pt-0.5 text-[clamp(1.35rem,5vw,2.75rem)] leading-none text-[#B2945E]"
                    >
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        {stage === 'wedding_day' && (
          <>
            <p className="font-display text-[11px] font-medium tracking-[0.32em] text-[#7B6134] uppercase">
              {weddingConfig.weddingDateFormatted}
            </p>
            <h2 className="font-script mt-2 text-4xl text-[#581F2A] sm:text-6xl">
              Today Is Our Beautiful Day!
            </h2>
            <div className="my-5">
              <GoldFlourish className="h-5 w-48" />
            </div>
            <p className="font-editorial max-w-lg text-lg italic leading-relaxed text-[#493027] sm:text-xl">
              Thank you for blessing us with your warmth, prayers, and presence as we celebrate our
              wedding today.
            </p>
          </>
        )}

        {stage === 'after' && (
          <>
            <p className="font-display text-[11px] font-medium tracking-[0.32em] text-[#7B6134] uppercase">
              {weddingConfig.weddingDateFormatted}
            </p>
            <h2 className="font-script mt-2 text-4xl text-[#581F2A] sm:text-6xl">
              The Beginning of Our Forever
            </h2>
            <div className="my-5">
              <GoldFlourish className="h-5 w-48" />
            </div>
            <p className="font-editorial max-w-lg text-lg italic leading-relaxed text-[#493027] sm:text-xl">
              With grateful hearts, we cherish every memory, smile, and blessing shared as we begin
              our married life together.
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
};
