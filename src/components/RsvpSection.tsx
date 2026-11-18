import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, Info } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { BurgundyRoseClusterTopRight, SingleRoseVignette } from './BotanicalArtwork';
import { CornerFiligree } from './StationeryOrnaments';

type AttendanceChoice = 'accepts' | 'declines';

interface RsvpFormState {
  fullName: string;
  attending: AttendanceChoice | '';
  guests: string;
  dietaryNotes: string;
}

export const RsvpSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<RsvpFormState>({
    fullName: '',
    attending: '',
    guests: '1',
    dietaryNotes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RsvpFormState, string>>>({});
  const [submissionState, setSubmissionState] = useState<
    'idle' | 'submitting' | 'unconfigured' | 'sent' | 'error'
  >('idle');
  const [copiedSummary, setCopiedSummary] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof RsvpFormState, string>> = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!form.attending) {
      nextErrors.attending = 'Please select whether you will be attending.';
    }
    if (form.attending === 'accepts') {
      const count = Number(form.guests);
      if (!Number.isInteger(count) || count < 1 || count > 20) {
        nextErrors.guests = 'Please enter a valid number of guests (1 to 20).';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!weddingConfig.rsvpService.configured || !weddingConfig.rsvpService.endpointUrl) {
      setSubmissionState('unconfigured');
      return;
    }

    setSubmissionState('submitting');
    try {
      const res = await fetch(weddingConfig.rsvpService.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          attending: form.attending === 'accepts' ? 'Joyfully accepts' : 'Regretfully declines',
          guests: form.attending === 'accepts' ? Number(form.guests) : 0,
          dietaryNotes: form.dietaryNotes.trim(),
        }),
      });
      if (!res.ok) {
        setSubmissionState('error');
        return;
      }
      setSubmissionState('sent');
    } catch {
      setSubmissionState('error');
    }
  };

  const formattedSummary = [
    `RSVP for ${weddingConfig.coupleDisplay} (${weddingConfig.weddingDateFormatted})`,
    `Name: ${form.fullName.trim()}`,
    `Response: ${form.attending === 'accepts' ? 'Joyfully accepts' : 'Regretfully declines'}`,
    form.attending === 'accepts' ? `Number of guests: ${form.guests}` : null,
    form.dietaryNotes.trim() ? `Notes: ${form.dietaryNotes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <section
      id="rsvp"
      aria-label="RSVP"
      className="paper-ivory-surface relative overflow-x-clip border-t border-[#B2945E]/30 px-4 py-18 sm:px-6 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-2xl">
        {/* Hanging floral arrangement in the upper-right corner */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -right-10 top-6 z-20 w-[140px] sm:-right-16 sm:top-4 sm:w-[205px] md:-right-24 md:w-[235px]"
        >
          <BurgundyRoseClusterTopRight className="h-auto w-full" />
        </motion.div>

        {/* Top Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <SingleRoseVignette className="mb-2 h-14 w-24 sm:h-16 sm:w-28" />
          <h2 className="font-vibes text-5xl font-normal text-[#581F2A] sm:text-6xl">RSVP</h2>
          <p className="font-editorial mt-2 max-w-md text-lg italic text-[#493027]/90 sm:text-xl">
            Kindly let us know if you will be joining us.
          </p>
        </motion.div>

        {/* Vintage Invitation-Style Form Frame */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="cardstock-ivory relative z-10 mt-10 p-3 shadow-[0_22px_46px_rgba(61,35,24,0.16)] sm:p-4"
        >
          <div className="relative border border-[#B2945E]/80 p-1.5">
            <div className="relative border border-[#B2945E]/55 px-5 py-10 sm:px-11 sm:py-12">
              <CornerFiligree className="absolute left-2 top-2 h-8 w-8 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute right-2 top-2 h-8 w-8 rotate-90 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute bottom-2 left-2 h-8 w-8 -rotate-90 sm:h-10 sm:w-10" />
              <CornerFiligree className="absolute bottom-2 right-2 h-8 w-8 rotate-180 sm:h-10 sm:w-10" />

              <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-lg space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="rsvp-full-name"
                    className="font-display mb-2 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase"
                  >
                    Full Name
                  </label>
                  <input
                    id="rsvp-full-name"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, fullName: e.target.value }));
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      if (submissionState !== 'idle') setSubmissionState('idle');
                    }}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Enter your full name"
                    className="font-editorial min-h-[46px] w-full border border-[#B2945E]/65 bg-[#EFE0C4] px-4 py-2.5 text-lg text-[#493027] placeholder:text-[#493027]/50 transition-colors focus:border-[#581F2A] focus:bg-[#F5E8D0] focus:outline-none focus:ring-2 focus:ring-[#B2945E]/50"
                  />
                  {errors.fullName && (
                    <p role="alert" className="font-editorial mt-1.5 text-sm font-medium text-[#702D35]">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Will you be attending? */}
                <fieldset>
                  <legend className="font-display mb-2.5 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase">
                    Will you be attending?
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label
                      className={`flex min-h-[48px] cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                        form.attending === 'accepts'
                          ? 'border-[#581F2A] bg-[#581F2A] text-[#F5E8D0]'
                          : 'border-[#B2945E]/65 bg-[#EFE0C4] text-[#493027] hover:border-[#702D35]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="accepts"
                        checked={form.attending === 'accepts'}
                        onChange={() => {
                          setForm((prev) => ({ ...prev, attending: 'accepts' }));
                          if (errors.attending) setErrors((prev) => ({ ...prev, attending: undefined }));
                          if (submissionState !== 'idle') setSubmissionState('idle');
                        }}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          form.attending === 'accepts'
                            ? 'border-[#EFE0C4] bg-[#EFE0C4]'
                            : 'border-[#7B6134]'
                        }`}
                      >
                        {form.attending === 'accepts' && (
                          <span className="h-2 w-2 rounded-full bg-[#581F2A]" />
                        )}
                      </span>
                      <span className="font-editorial text-lg">Joyfully accepts</span>
                    </label>

                    <label
                      className={`flex min-h-[48px] cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                        form.attending === 'declines'
                          ? 'border-[#581F2A] bg-[#581F2A] text-[#F5E8D0]'
                          : 'border-[#B2945E]/65 bg-[#EFE0C4] text-[#493027] hover:border-[#702D35]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="declines"
                        checked={form.attending === 'declines'}
                        onChange={() => {
                          setForm((prev) => ({ ...prev, attending: 'declines' }));
                          if (errors.attending) setErrors((prev) => ({ ...prev, attending: undefined }));
                          if (submissionState !== 'idle') setSubmissionState('idle');
                        }}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          form.attending === 'declines'
                            ? 'border-[#EFE0C4] bg-[#EFE0C4]'
                            : 'border-[#7B6134]'
                        }`}
                      >
                        {form.attending === 'declines' && (
                          <span className="h-2 w-2 rounded-full bg-[#581F2A]" />
                        )}
                      </span>
                      <span className="font-editorial text-lg">Regretfully declines</span>
                    </label>
                  </div>
                  {errors.attending && (
                    <p role="alert" className="font-editorial mt-1.5 text-sm font-medium text-[#702D35]">
                      {errors.attending}
                    </p>
                  )}
                </fieldset>

                {/* Number of Guests */}
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="font-display mb-2 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase"
                  >
                    Number of Guests
                  </label>
                  <input
                    id="rsvp-guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={20}
                    disabled={form.attending === 'declines'}
                    value={form.attending === 'declines' ? '0' : form.guests}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, guests: e.target.value }));
                      if (errors.guests) setErrors((prev) => ({ ...prev, guests: undefined }));
                      if (submissionState !== 'idle') setSubmissionState('idle');
                    }}
                    aria-invalid={Boolean(errors.guests)}
                    className="font-editorial min-h-[46px] w-full border border-[#B2945E]/65 bg-[#EFE0C4] px-4 py-2.5 text-lg text-[#493027] tabular-nums transition-colors focus:border-[#581F2A] focus:bg-[#F5E8D0] focus:outline-none focus:ring-2 focus:ring-[#B2945E]/50 disabled:cursor-not-allowed disabled:opacity-55"
                  />
                  {errors.guests && (
                    <p role="alert" className="font-editorial mt-1.5 text-sm font-medium text-[#702D35]">
                      {errors.guests}
                    </p>
                  )}
                </div>

                {/* Dietary Requirements or Special Requests */}
                <div>
                  <label
                    htmlFor="rsvp-dietary"
                    className="font-display mb-2 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase"
                  >
                    Dietary Requirements or Special Requests{' '}
                    <span className="font-editorial tracking-normal lowercase italic text-[#7B6134]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="rsvp-dietary"
                    name="dietaryNotes"
                    rows={3}
                    value={form.dietaryNotes}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, dietaryNotes: e.target.value }));
                      if (submissionState !== 'idle') setSubmissionState('idle');
                    }}
                    placeholder="Share any allergies, dietary preferences, or a warm note..."
                    className="font-editorial w-full border border-[#B2945E]/65 bg-[#EFE0C4] px-4 py-3 text-lg text-[#493027] placeholder:text-[#493027]/50 transition-colors focus:border-[#581F2A] focus:bg-[#F5E8D0] focus:outline-none focus:ring-2 focus:ring-[#B2945E]/50"
                  />
                </div>

                {/* Honest Unconfigured Notice (never pretends to submit) */}
                {submissionState === 'unconfigured' && (
                  <div
                    role="status"
                    className="border border-[#B2945E] bg-[#EFE0C4]/90 p-4 text-left text-[#493027]"
                  >
                    <div className="flex items-start gap-3">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#581F2A]" aria-hidden="true" />
                      <div className="space-y-2">
                        <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-[#581F2A] uppercase">
                          Response Not Yet Sent
                        </p>
                        <p className="font-editorial text-base leading-relaxed text-[#493027]">
                          Your RSVP details have been validated, however an online RSVP destination
                          has not yet been connected for this invitation. Your response has{' '}
                          <strong>not been sent</strong> to the family yet.
                        </p>
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex min-h-[38px] cursor-pointer items-center gap-2 border border-[#B2945E] bg-[#F8EEDB] px-3.5 py-1.5 font-display text-[10px] tracking-[0.18em] text-[#581F2A] uppercase transition-colors hover:bg-[#581F2A] hover:text-[#F5E8D0]"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              Copied RSVP Summary
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              Copy RSVP Summary
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {submissionState === 'sent' && (
                  <div
                    role="status"
                    className="border border-[#77704C] bg-[#EFE0C4] p-4 text-center text-[#493027]"
                  >
                    <p className="font-editorial text-lg font-medium text-[#581F2A]">
                      Thank you, {form.fullName}. Your RSVP has been recorded.
                    </p>
                  </div>
                )}

                {submissionState === 'error' && (
                  <div
                    role="alert"
                    className="border border-[#702D35] bg-[#EFE0C4] p-4 text-center text-[#702D35]"
                  >
                    <p className="font-editorial text-base">
                      We could not send your response right now. Please try again shortly.
                    </p>
                  </div>
                )}

                {/* Luxurious Burgundy Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={submissionState === 'submitting'}
                    className="font-display inline-flex min-h-[48px] min-w-[180px] cursor-pointer items-center justify-center border border-[#B2945E]/70 bg-[#581F2A] px-10 py-3 text-xs font-medium tracking-[0.34em] text-[#F5E8D0] uppercase shadow-[0_8px_20px_rgba(88,31,42,0.28)] transition-all duration-200 hover:bg-[#702D35] hover:shadow-[0_10px_24px_rgba(88,31,42,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5E8D0] disabled:opacity-60"
                  >
                    {submissionState === 'submitting' ? 'SENDING...' : 'RSVP'}
                  </button>
                </div>

                {/* Bottom Closing Line */}
                <p className="font-display pt-4 text-center text-[11px] font-medium tracking-[0.26em] text-[#7B6134] uppercase sm:text-xs">
                  WE CAN&apos;T WAIT TO CELEBRATE WITH YOU!
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
