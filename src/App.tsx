/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BlessingBookSection } from './components/BlessingBookSection';
import { CountdownSection } from './components/CountdownSection';
import { EnvelopePhase, EnvelopeStage } from './components/EnvelopeStage';
import { HandwrittenLetterSection } from './components/HandwrittenLetterSection';
import { MemoryGallerySection } from './components/MemoryGallerySection';
import { MiniatureSurpriseEnvelope } from './components/MiniatureSurpriseEnvelope';
import { MusicControl } from './components/MusicControl';
import { PersonalisedWelcome } from './components/PersonalisedWelcome';
import {
  PrintableInvitationCard,
  PrintableInvitationPreviewModal,
} from './components/PrintableInvitation';
import { RosePetalsOverlay } from './components/RomanticEffects';
import { RomanticFooter } from './components/RomanticFooter';
import { RsvpSection } from './components/RsvpSection';
import { ShareSection } from './components/ShareSection';
import { StationeryFlatLay } from './components/StationeryFlatLay';
import { WeddingCalendarSection } from './components/WeddingCalendarSection';
import { WeddingDetailsSection } from './components/WeddingDetailsSection';
import { weddingConfig } from './config/weddingConfig';
import { getWeddingStageIST, WeddingStageIST } from './utils/istDate';
import { romanticAudio } from './utils/romanticAudio';

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<EnvelopePhase>('sealed');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [weddingStage, setWeddingStage] = useState<WeddingStageIST>(() => getWeddingStageIST());
  const [isPrintableOpen, setIsPrintableOpen] = useState(false);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.title = weddingConfig.websiteTitle;
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
      romanticAudio.pause();
    };
  }, []);

  const handleOpenInvitation = () => {
    if (phase !== 'sealed') return;
    setPhase('opening');

    // Start gentle romantic music only after guest interaction
    if (!romanticAudio.isPlaying()) {
      romanticAudio.start(weddingConfig.audioUrl);
      setIsMusicPlaying(true);
    }

    const durationMs = prefersReducedMotion ? 150 : 2850;
    openTimerRef.current = window.setTimeout(() => {
      setPhase('opened');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, durationMs);
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      romanticAudio.pause();
      setIsMusicPlaying(false);
    } else {
      romanticAudio.start(weddingConfig.audioUrl);
      setIsMusicPlaying(true);
    }
  };

  const handleNavigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const handleReopenEnvelope = () => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    setPhase('sealed');
  };

  return (
    <>
      <div
        id="app-interactive-shell"
        className="paper-ivory-surface min-h-dvh w-full text-[#493027] print:hidden"
      >
        {/* Delicate rose petal celebration on Wedding Day (20 Nov 2026 IST) after invitation is opened */}
        {phase === 'opened' && weddingStage === 'wedding_day' && (
          <RosePetalsOverlay active density="celebration" />
        )}

        <AnimatePresence mode="wait">
          {phase !== 'opened' ? (
            <motion.main
              key="love-letter-stage"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.05 : 0.45 } }}
            >
              {/* 1 & 2: Royal sealed-envelope landing page + cinematic envelope opening */}
              <EnvelopeStage phase={phase} onOpen={handleOpenInvitation} />
            </motion.main>
          ) : (
            <motion.main
              key="main-invitation-experience"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* 3. Personalised guest welcome */}
              <PersonalisedWelcome weddingStage={weddingStage} />

              {/* 4. Main vintage wedding invitation flat lay */}
              <StationeryFlatLay
                onNavigateToSection={handleNavigateToSection}
                onOpenPrintable={() => setIsPrintableOpen(true)}
              />

              {/* 5. Handwritten love letter */}
              <HandwrittenLetterSection />

              {/* 6. Wedding countdown & IST wedding-day transformation */}
              <CountdownSection onStageChange={setWeddingStage} />

              {/* 7. Interactive November 2026 wedding calendar */}
              <WeddingCalendarSection />

              {/* 8. Wedding details */}
              <WeddingDetailsSection />

              {/* 9. Optional memory gallery (hidden until real photos are provided) */}
              <MemoryGallerySection />

              {/* 10. RSVP */}
              <RsvpSection />

              {/* 11. Digital wedding blessing book */}
              <BlessingBookSection />

              {/* 12. Hidden miniature envelope surprise */}
              <MiniatureSurpriseEnvelope />

              {/* 13. Share the invitation */}
              <ShareSection />

              {/* 14. Royal wedding footer */}
              <RomanticFooter
                onBackToInvitation={() => handleNavigateToSection('invitation')}
                onReopenEnvelope={handleReopenEnvelope}
              />
            </motion.main>
          )}
        </AnimatePresence>

        {/* Discreet gold music control */}
        <MusicControl isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />

        {/* Dedicated High-Resolution Printable Invitation Preview */}
        <PrintableInvitationPreviewModal
          isOpen={isPrintableOpen}
          onClose={() => setIsPrintableOpen(false)}
        />
      </div>

      {/* Dedicated Single-Page A4 Print Root (hidden on screen, exclusively visible during print) */}
      <div id="printable-invitation-print-node" className="hidden print:flex" aria-hidden="true">
        <PrintableInvitationCard isPrintRoot />
      </div>
    </>
  );
}
