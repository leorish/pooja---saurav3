import React, { useEffect, useRef, useState } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import {
  BurgundyRoseClusterBottomLeft,
  BurgundyRoseClusterTopRight,
} from './BotanicalArtwork';
import { CornerFiligree, GoldFlourish } from './StationeryOrnaments';

/**
 * High-resolution, portrait-oriented (210 x 297 mm A4) luxury wedding invitation.
 * Uses pure vector SVG botanical artwork, double-line antique gold borders,
 * and crisp selectable typography so it prints sharply at 300+ DPI.
 */
export const PrintableInvitationCard: React.FC<{ isPrintRoot?: boolean }> = ({
  isPrintRoot = false,
}) => {
  return (
    <div
      className={
        isPrintRoot
          ? 'printable-sheet relative mx-auto flex h-[275mm] w-[188mm] flex-col justify-between overflow-hidden bg-[#F5E8D0] p-[7mm] text-[#493027]'
          : 'printable-sheet relative mx-auto flex aspect-[210/297] w-full max-w-[660px] flex-col justify-between overflow-hidden bg-[#F5E8D0] p-4 text-[#493027] shadow-[0_28px_60px_rgba(32,12,15,0.45)] sm:p-7'
      }
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 45%, rgba(255, 250, 240, 0.72) 0%, rgba(245, 232, 208, 0.92) 65%, rgba(232, 213, 180, 0.96) 100%)',
      }}
    >
      {/* Double-line antique gold border frame */}
      <div className="relative flex h-full w-full flex-col justify-between border-[1.5px] border-[#B2945E] p-1.5 sm:p-2">
        <div className="relative flex h-full w-full flex-col items-center justify-between border border-[#B2945E]/75 px-6 py-10 text-center sm:px-14 sm:py-14">
          {/* Vintage Ornamental Corners */}
          <CornerFiligree className="pointer-events-none absolute left-2 top-2 h-10 w-10 sm:h-12 sm:w-12" />
          <CornerFiligree className="pointer-events-none absolute right-2 top-2 h-10 w-10 rotate-90 sm:h-12 sm:w-12" />
          <CornerFiligree className="pointer-events-none absolute bottom-2 left-2 h-10 w-10 -rotate-90 sm:h-12 sm:w-12" />
          <CornerFiligree className="pointer-events-none absolute bottom-2 right-2 h-10 w-10 rotate-180 sm:h-12 sm:w-12" />

          {/* Upper-right floral arrangement */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 z-10 w-36 sm:-right-6 sm:-top-5 sm:w-56"
          >
            <BurgundyRoseClusterTopRight className="h-auto w-full" />
          </div>

          {/* Bottom-left matching floral arrangement */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -left-4 z-10 w-28 sm:-bottom-5 sm:-left-5 sm:w-44"
          >
            <BurgundyRoseClusterBottomLeft className="h-auto w-full" />
          </div>

          {/* Top Monogram Header */}
          <div className="relative z-20 flex flex-col items-center pt-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#B2945E] bg-[#F8EEDB]/85 shadow-sm sm:h-20 sm:w-20">
              <div className="flex h-[84%] w-[84%] items-center justify-center rounded-full border border-[#B2945E]/60">
                <span className="font-display text-sm font-semibold tracking-[0.16em] text-[#581F2A] sm:text-base">
                  {weddingConfig.monogram}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <GoldFlourish className="h-4 w-40 sm:w-48" />
            </div>
          </div>

          {/* Central Invitation Content */}
          <div className="relative z-20 my-auto flex max-w-md flex-col items-center py-4">
            <p className="font-editorial text-sm italic tracking-wide text-[#493027] sm:text-lg">
              Together with their families
            </p>
            <p className="font-editorial mt-1.5 text-sm tracking-wide text-[#493027]/90 sm:text-base">
              Request the pleasure of your company
            </p>
            <p className="font-editorial mt-1 text-sm italic text-[#7B6134] sm:text-base">
              At the wedding celebration of
            </p>

            {/* Bride & Groom */}
            <h1 className="font-script mt-5 text-[2.9rem] leading-[1.06] font-normal text-[#581F2A] sm:mt-6 sm:text-[4rem]">
              {weddingConfig.bride}
            </h1>
            <p className="font-editorial my-1 text-lg italic text-[#7B6134] sm:text-2xl">&amp;</p>
            <h1 className="font-script text-[2.9rem] leading-[1.06] font-normal text-[#581F2A] sm:text-[4rem]">
              {weddingConfig.groom}
            </h1>

            {/* Date Block */}
            <div className="my-5 w-full max-w-xs border-y border-[#B2945E]/60 py-3.5 sm:my-7 sm:py-4">
              <p className="font-display text-[11px] font-medium tracking-[0.34em] text-[#7B6134] uppercase sm:text-xs">
                FRIDAY
              </p>
              <p className="font-display mt-1.5 text-lg font-semibold tracking-[0.26em] text-[#581F2A] tabular-nums sm:text-2xl">
                20 NOVEMBER 2026
              </p>
            </div>

            <p className="font-display text-[10px] font-medium tracking-[0.22em] text-[#493027] uppercase sm:text-xs">
              Two Hearts. One Journey. A Lifetime of Love.
            </p>
            <p className="font-editorial mt-2.5 text-sm italic text-[#7B6134] sm:text-base">
              Your presence is our most precious gift.
            </p>
          </div>

          {/* Closing Signature */}
          <div className="relative z-20 flex flex-col items-center pb-2">
            <GoldFlourish className="mb-3 h-4 w-36 sm:w-44" />
            <p className="font-vibes text-2xl text-[#7B6134] sm:text-3xl">With Love</p>
            <p className="font-script mt-0.5 text-3xl text-[#581F2A] sm:text-4xl">
              {weddingConfig.coupleDisplay}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PrintableInvitationPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableInvitationPreviewModal: React.FC<PrintableInvitationPreviewProps> = ({
  isOpen,
  onClose,
}) => {
  const [printUnavailableHint, setPrintUnavailableHint] = useState(false);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);
  const printTriggeredAtRef = useRef<number>(0);

  const triggerBrowserPrint = async () => {
    setIsPreparingPrint(true);
    setPrintUnavailableHint(false);

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    } catch {
      // Proceed even if FontFaceSet check fails
    }

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    setIsPreparingPrint(false);

    if (typeof window.print !== 'function') {
      setPrintUnavailableHint(true);
      return;
    }

    printTriggeredAtRef.current = Date.now();
    try {
      window.print();
    } catch {
      setPrintUnavailableHint(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleAfterPrint = () => {
      const elapsed = Date.now() - printTriggeredAtRef.current;
      // If afterprint fires immediately (<250ms), browser suppressed or lacks print dialog support
      if (elapsed < 250) {
        setPrintUnavailableHint(true);
      } else {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('afterprint', handleAfterPrint);

    const autoTimer = window.setTimeout(() => {
      void triggerBrowserPrint();
    }, 280);

    return () => {
      window.clearTimeout(autoTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Printable Wedding Invitation Preview"
      className="no-print fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-[#23090E]/88 px-4 py-6 backdrop-blur-sm sm:py-10"
    >
      {/* Preview Action Bar */}
      <div className="mb-5 flex w-full max-w-[660px] flex-wrap items-center justify-between gap-3 border border-[#B2945E]/50 bg-[#581F2A] px-4 py-3 text-[#F5E8D0] shadow-lg">
        <div className="flex flex-col">
          <span className="font-display text-[11px] font-medium tracking-[0.22em] text-[#EFE0C4] uppercase">
            A4 Portrait Stationery Preview
          </span>
          <span className="font-editorial text-sm italic text-[#EFE0C4]/80">
            {isPreparingPrint
              ? 'Preparing calligraphy & borders for printing...'
              : 'Select Save as PDF or choose your printer'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => void triggerBrowserPrint()}
            className="font-display inline-flex min-h-[40px] cursor-pointer items-center gap-2 border border-[#B2945E] bg-[#F5E8D0] px-4 py-1.5 text-[10px] font-medium tracking-[0.2em] text-[#581F2A] uppercase transition-colors hover:bg-[#EFE0C4] whitespace-nowrap"
          >
            <Printer className="h-3.5 w-3.5 text-[#581F2A]" aria-hidden="true" />
            Print / Save as PDF
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close printable preview"
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#B2945E]/60 text-[#F5E8D0] transition-colors hover:bg-[#702D35]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Fallback Browser/Mobile Instructions if print dialog is unavailable or suppressed */}
      {printUnavailableHint && (
        <div className="mb-5 w-full max-w-[660px] border border-[#B2945E] bg-[#F8EEDB] px-4 py-3 text-left text-[#493027] shadow-md">
          <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-[#581F2A] uppercase">
            Browser Print / PDF Instructions
          </p>
          <p className="font-editorial mt-1 text-sm leading-relaxed text-[#493027]">
            If the print dialog did not open automatically, use your browser&apos;s{' '}
            <strong>Share → Print</strong> (iPhone Safari) or{' '}
            <strong>Menu (⋮) → Share / Print → Save as PDF</strong> (Android Chrome &amp; Desktop)
            to save this keepsake invitation.
          </p>
        </div>
      )}

      {/* High-Resolution Portrait Preview Card */}
      <PrintableInvitationCard />

      <div className="mt-5 flex items-center gap-2 text-center text-[#EFE0C4]/80">
        <Download className="h-3.5 w-3.5 text-[#B2945E]" aria-hidden="true" />
        <p className="font-editorial text-sm italic">
          Designed for A4 portrait (210 × 297 mm) · Turn on &ldquo;Background graphics&rdquo; in
          print settings for the antique ivory paper tint.
        </p>
      </div>
    </div>
  );
};
