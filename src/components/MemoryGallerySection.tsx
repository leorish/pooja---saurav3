import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { CouplePhotoItem, weddingConfig } from '../config/weddingConfig';
import { BotanicalSprig, SingleRoseVignette } from './BotanicalArtwork';
import { GoldFlourish } from './StationeryOrnaments';

export const MemoryGallerySection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedPhoto, setSelectedPhoto] = useState<CouplePhotoItem | null>(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPhoto]);

  // Hide entire section until real photographs of Pooja & Saurav are uploaded
  if (weddingConfig.couplePhotos.length === 0) {
    return null;
  }

  return (
    <section
      id="memories"
      aria-label="Little Moments, Forever Memories"
      className="paper-ivory-surface relative overflow-x-clip border-t border-[#B2945E]/30 px-4 py-18 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <SingleRoseVignette className="mb-2 h-14 w-24" />
          <h2 className="font-vibes text-4xl font-normal text-[#581F2A] sm:text-5xl">
            Little Moments, Forever Memories
          </h2>
          <div className="mt-4">
            <GoldFlourish className="h-4 w-48" />
          </div>
        </motion.div>

        <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {weddingConfig.couplePhotos.map((photo, index) => {
            const rotation = index % 3 === 0 ? '-rotate-2' : index % 3 === 1 ? 'rotate-1' : 'rotate-2';
            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className={`cardstock-ivory group relative cursor-pointer border border-[#B2945E]/60 p-3 pb-7 text-left shadow-[0_18px_38px_rgba(61,35,24,0.18)] transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] ${rotation}`}
              >
                {/* Pressed botanical accent on alternating frames */}
                {index % 2 === 0 && (
                  <div className="pointer-events-none absolute -right-4 -top-6 z-10 w-12 rotate-12 opacity-80">
                    <BotanicalSprig className="h-auto w-full" />
                  </div>
                )}

                <div className="aspect-[4/5] w-full overflow-hidden border border-[#B2945E]/40 bg-[#EFE0C4]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {photo.caption && (
                  <p className="font-script mt-4 text-center text-2xl text-[#581F2A]">
                    {photo.caption}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Preview */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.caption || selectedPhoto.alt}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#23090E]/88 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="cardstock-ivory relative max-h-[92vh] max-w-3xl border border-[#B2945E] p-3 pb-6 shadow-2xl sm:p-5"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photograph preview"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#B2945E] bg-[#F8EEDB] text-[#581F2A] transition-colors hover:bg-[#581F2A] hover:text-[#F5E8D0]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
            {selectedPhoto.caption && (
              <p className="font-script mt-3 text-center text-3xl text-[#581F2A]">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
