import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid2X2 } from 'lucide-react';
import Lightbox from '../shared/Lightbox';
import SectionReveal from '../shared/SectionReveal';

export default function Gallery({ photos, theme }) {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });

  const close = () => setLightbox({ open: false, idx: 0 });
  const prev = () => setLightbox(l => ({ ...l, idx: (l.idx - 1 + photos.length) % photos.length }));
  const next = () => setLightbox(l => ({ ...l, idx: (l.idx + 1) % photos.length }));

  return (
    <SectionReveal>
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>
            The Space
          </h2>
          <button
            data-hover
            onClick={() => setLightbox({ open: true, idx: 0 })}
            className="flex items-center gap-2 text-xs tracking-widest uppercase cursor-pointer transition-opacity hover:opacity-60"
            style={{ color: theme.accent }}
          >
            <Grid2X2 size={14} />
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {photos.slice(0, 6).map((src, i) => (
            <motion.div
              key={i}
              data-hover
              onClick={() => setLightbox({ open: true, idx: i })}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2 h-[280px] md:h-[420px]' : 'h-[135px] md:h-[200px]'}`}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src={src} alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
              <span className="absolute bottom-3 right-3 text-white/0 group-hover:text-white/80 text-xs tracking-widest transition-all duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightbox.open && (
          <Lightbox photos={photos} idx={lightbox.idx} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
