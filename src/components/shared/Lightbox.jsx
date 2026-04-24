import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const EASE = [0.23, 1, 0.32, 1];

export default function Lightbox({ photos, idx, onClose, onPrev, onNext }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 cursor-pointer">
        <X size={32} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors cursor-pointer">
        <ChevronLeft size={44} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors cursor-pointer">
        <ChevronRight size={44} />
      </button>
      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          src={photos[idx]} alt=""
          initial={reduced ? {} : { opacity: 0, scale: 1.04 }}
          animate={reduced ? {} : { opacity: 1, scale: 1 }}
          exit={reduced ? {} : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>
      <div className="absolute bottom-6 text-white/40 text-sm">{idx + 1} / {photos.length}</div>
    </motion.div>
  );
}
