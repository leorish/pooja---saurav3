import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, Heart, Info } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { BotanicalSprig, SingleRoseVignette } from './BotanicalArtwork';
import { CornerFiligree, GoldFlourish } from './StationeryOrnaments';

export const BlessingBookSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ guestName?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'unconfigured' | 'sent' | 'error'>(
    'idle'
  );
  const [showGoldHeart, setShowGoldHeart] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const next: { guestName?: string; message?: string } = {};
    if (!guestName.trim()) {
      next.guestName = 'Please enter your name.';
    }
    if (!message.trim()) {
      next.message = 'Please write a wish or blessing for Pooja & Saurav.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setShowGoldHeart(true);

    if (!weddingConfig.blessingService.configured || !weddingConfig.blessingService.endpointUrl) {
      setStatus('unconfigured');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(weddingConfig.blessingService.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const blessingSummary = `Blessings for ${weddingConfig.coupleDisplay}:\n"${message.trim()}"\n— ${guestName.trim()}`;

  const handleCopyBlessing = async () => {
    try {
      await navigator.clipboard.writeText(blessingSummary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <section
      id="blessing-book"
      aria-label="Digital Wedding Blessing Book"
      className="paper-ivory-surface relative overflow-x-clip border-t border-[#B2945E]/30 px-4 py-18 sm:px-6 sm:py-24"
    >
      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <SingleRoseVignette className="mb-2 h-13 w-22 sm:h-15 sm:w-26" />
          <h2 className="font-vibes text-5xl font-normal text-[#581F2A] sm:text-6xl">
            Leave a Little Love
          </h2>
          <p className="font-editorial mt-2 max-w-md text-lg italic text-[#493027]/90 sm:text-xl">
            A wish, a blessing or a few words for our new beginning.
          </p>
          <div className="mt-4">
            <GoldFlourish className="h-4 w-48" />
          </div>
        </motion.div>

        {/* Antique Bound Guestbook Open-Pages Frame */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 rounded-[3px] border border-[#7B6134]/45 bg-[#581F2A] p-2 shadow-[0_24px_48px_rgba(48,22,18,0.22)] sm:p-3"
        >
          {/* Realistic Ivory Guestbook Pages */}
          <div className="cardstock-ivory relative border border-[#B2945E]/80 p-2 sm:p-3">
            {/* Subtle centre book-crease shadow on wider viewports */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-6 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#B2945E]/14 to-transparent md:block"
            />

            <div className="relative border border-[#B2945E]/50 px-5 py-9 sm:px-10 sm:py-12">
              <CornerFiligree className="absolute left-2 top-2 h-7 w-7 sm:h-9 sm:w-9" />
              <CornerFiligree className="absolute right-2 top-2 h-7 w-7 rotate-90 sm:h-9 sm:w-9" />
              <CornerFiligree className="absolute bottom-2 left-2 h-7 w-7 -rotate-90 sm:h-9 sm:w-9" />
              <CornerFiligree className="absolute bottom-2 right-2 h-7 w-7 rotate-180 sm:h-9 sm:w-9" />

              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
                {/* Left Book Page: Dedication & Pressed Botanical */}
                <div className="flex flex-col items-center text-center md:col-span-5 md:border-r md:border-[#B2945E]/35 md:pr-8">
                  <div className="w-16 opacity-85">
                    <BotanicalSprig className="h-auto w-full" />
                  </div>
                  <p className="font-script mt-3 text-3xl text-[#581F2A] sm:text-4xl">
                    For {weddingConfig.coupleDisplay}
                  </p>
                  <p className="font-editorial mt-3 max-w-xs text-base italic leading-relaxed text-[#493027]/85">
                    Every kind word shared here is kept privately for the bride and groom to cherish
                    forever.
                  </p>

                  {/* Animated small golden heart after form completion */}
                  {showGoldHeart && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { scale: 0.4, opacity: 0, y: 6 }}
                      animate={{ scale: [0.6, 1.25, 1], opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 flex flex-col items-center gap-1.5"
                    >
                      <Heart
                        className="h-6 w-6 fill-[#B2945E] text-[#B2945E] drop-shadow-[0_2px_6px_rgba(178,148,94,0.45)]"
                        aria-hidden="true"
                      />
                      <span className="font-editorial text-xs italic text-[#7B6134]">
                        With gratitude from {weddingConfig.coupleDisplay}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Right Book Page: Blessing Form */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5 md:col-span-7 md:pl-4"
                >
                  <div>
                    <label
                      htmlFor="blessing-name"
                      className="font-display mb-1.5 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase"
                    >
                      Your Name
                    </label>
                    <input
                      id="blessing-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (errors.guestName) setErrors((p) => ({ ...p, guestName: undefined }));
                        if (status !== 'idle') setStatus('idle');
                      }}
                      aria-invalid={Boolean(errors.guestName)}
                      placeholder="Write your name"
                      className="font-editorial min-h-[44px] w-full border-b border-[#B2945E]/75 bg-[#EFE0C4]/70 px-3.5 py-2 text-lg text-[#493027] placeholder:text-[#493027]/45 focus:border-[#581F2A] focus:bg-[#EFE0C4] focus:outline-none"
                    />
                    {errors.guestName && (
                      <p role="alert" className="font-editorial mt-1 text-sm text-[#702D35]">
                        {errors.guestName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="blessing-message"
                      className="font-display mb-1.5 block text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase"
                    >
                      Your Wish or Blessing
                    </label>
                    <textarea
                      id="blessing-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                        if (status !== 'idle') setStatus('idle');
                      }}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="Write a heartfelt blessing for our new chapter..."
                      className="font-editorial w-full border border-[#B2945E]/65 bg-[#EFE0C4]/70 px-3.5 py-2.5 text-lg italic leading-relaxed text-[#493027] placeholder:text-[#493027]/45 focus:border-[#581F2A] focus:bg-[#EFE0C4] focus:outline-none"
                    />
                    {errors.message && (
                      <p role="alert" className="font-editorial mt-1 text-sm text-[#702D35]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === 'unconfigured' && (
                    <div
                      role="status"
                      className="border border-[#B2945E] bg-[#EFE0C4]/95 p-3.5 text-left text-[#493027]"
                    >
                      <div className="flex items-start gap-2.5">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#581F2A]" aria-hidden="true" />
                        <div className="space-y-2">
                          <p className="font-display text-[10px] font-semibold tracking-[0.18em] text-[#581F2A] uppercase">
                            Blessing Not Yet Sent
                          </p>
                          <p className="font-editorial text-sm leading-relaxed text-[#493027]">
                            Your message is ready, however no blessing submission service has been
                            connected yet so it has <strong>not been sent</strong> to Pooja &amp;
                            Saurav.
                          </p>
                          <button
                            type="button"
                            onClick={handleCopyBlessing}
                            className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 border border-[#B2945E] bg-[#F8EEDB] px-3 py-1 font-display text-[10px] tracking-[0.16em] text-[#581F2A] uppercase transition-colors hover:bg-[#581F2A] hover:text-[#F5E8D0]"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                Copied Blessing
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                Copy Your Blessing
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {status === 'sent' && (
                    <div
                      role="status"
                      className="border border-[#77704C] bg-[#EFE0C4] p-3.5 text-center text-[#581F2A]"
                    >
                      <p className="font-editorial text-base italic">
                        Thank you for sending your private blessing to {weddingConfig.coupleDisplay}.
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div role="alert" className="border border-[#702D35] bg-[#EFE0C4] p-3 text-sm text-[#702D35]">
                      Unable to send your blessing right now. Please try again shortly.
                    </div>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="font-display inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center border border-[#B2945E]/70 bg-[#581F2A] px-6 py-2.5 text-[11px] font-medium tracking-[0.26em] text-[#F5E8D0] uppercase shadow-[0_8px_18px_rgba(88,31,42,0.24)] transition-colors hover:bg-[#702D35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto"
                    >
                      {status === 'submitting' ? 'SENDING...' : 'Send Your Blessings'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
