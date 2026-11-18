import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, MessageCircle, Share2 } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { GoldFlourish } from './StationeryOrnaments';

export const ShareSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [siteUrl, setSiteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteUrl(window.location.href);
      setSupportsNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    }
  }, []);

  const shareTextBase = `With immense happiness, we invite you to celebrate the wedding of ${weddingConfig.bride} & ${weddingConfig.groom} on 20 November 2026.\n\nJoin us as we begin our beautiful forever.`;
  const whatsappMessage = `${shareTextBase}\n\n${siteUrl}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyLink = async () => {
    if (!siteUrl) return;
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleNativeShare = async () => {
    if (!supportsNativeShare) return;
    try {
      await navigator.share({
        title: weddingConfig.websiteTitle,
        text: shareTextBase,
        url: siteUrl,
      });
    } catch {
      // User dismissed native share sheet
    }
  };

  return (
    <section
      id="share"
      aria-label="Share the Invitation"
      className="paper-ivory-surface relative border-t border-[#B2945E]/30 px-4 py-16 text-center sm:px-6 sm:py-20"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-xl flex-col items-center"
      >
        <h2 className="font-vibes text-4xl font-normal text-[#581F2A] sm:text-5xl">
          Share the Love
        </h2>
        <p className="font-editorial mt-2 max-w-md text-lg italic text-[#493027]/90">
          Pass this wedding invitation along to family and cherished friends.
        </p>

        <div className="my-5">
          <GoldFlourish className="h-4 w-44" />
        </div>

        <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-flex min-h-[46px] w-full items-center justify-center gap-2 border border-[#B2945E]/75 bg-[#581F2A] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-[#F5E8D0] uppercase shadow-[0_6px_16px_rgba(88,31,42,0.2)] transition-colors hover:bg-[#702D35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Share on WhatsApp
          </a>

          <button
            type="button"
            onClick={handleCopyLink}
            className="font-display inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 border border-[#B2945E]/80 bg-[#EFE0C4] px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-[#493027] uppercase transition-colors hover:border-[#581F2A] hover:bg-[#581F2A] hover:text-[#F5E8D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Invitation Link Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copy Invitation Link
              </>
            )}
          </button>

          {supportsNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="font-display inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 border border-[#B2945E]/65 bg-transparent px-6 py-2.5 text-[11px] font-medium tracking-[0.22em] text-[#581F2A] uppercase transition-colors hover:bg-[#EFE0C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] sm:w-auto whitespace-nowrap"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              Share Invitation
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
