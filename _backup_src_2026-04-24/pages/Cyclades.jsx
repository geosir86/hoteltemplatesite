import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, MapPin, Wifi, Wind, Sun, Waves, ChevronLeft, ChevronRight, X, Plus, Minus, ArrowUpRight, Check, Users, Bed, Bath, Heart, Anchor, Umbrella } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const PHOTOS = [
  "/assets/cyclades_hero.png",
  "/assets/cyclades_pool.png",
  "/assets/cyclades_bed.png",
  "/assets/greek_luxury_living_room_dining_1776942426126.png",
  "/assets/greek_luxury_marble_bathroom_1776942694181.png",
  "/assets/greek_luxury_terrace_sunset_view_1776942676038.png",
];

const AMENITIES = [
  { icon: Waves, label: "Infinity Pool" },
  { icon: Wind, label: "Sea Breeze A/C" },
  { icon: Sun, label: "Νότιος Προσ." },
  { icon: Wifi, label: "WiFi 1Gbps" },
  { icon: Anchor, label: "Private Dock" },
  { icon: Umbrella, label: "Beach Access" },
];

const REVIEWS = [
  { name: "Isabella F.", loc: "Φλωρεντία", rating: 5, text: "Η θέα από την infinity pool είναι κάτι που δεν ξεχνάς ποτέ. Θα επιστρέψουμε σίγουρα.", avatar: "https://i.pravatar.cc/100?img=44" },
  { name: "James H.", loc: "Λονδίνο", rating: 5, text: "Minimal perfection. The caldera view at sunrise is otherworldly.", avatar: "https://i.pravatar.cc/100?img=51" },
  { name: "Leila N.", loc: "Παρίσι", rating: 5, text: "Architecture, light, silence. The Cyclades distilled into one property.", avatar: "https://i.pravatar.cc/100?img=29" },
];

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(!!e.target.closest('button,a,[data-hover]'));
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', over); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-3 h-3 bg-[#0284C7] rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hov ? 0 : 1 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} />
      <motion.div className="fixed top-0 left-0 w-10 h-10 border border-[#0284C7] rounded-full pointer-events-none z-[9998] hidden lg:block"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hov ? 2.5 : 1 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} />
    </>
  );
};

const Reveal = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: EASE, delay }}>
    {children}
  </motion.div>
);

const Lightbox = ({ photos, idx, onClose, onPrev, onNext }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-[#0A192F]/98 flex items-center justify-center">
    <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white z-10"><X size={36} /></button>
    <button onClick={onPrev} className="absolute left-6 text-white/40 hover:text-white"><ChevronLeft size={48} /></button>
    <button onClick={onNext} className="absolute right-6 text-white/40 hover:text-white"><ChevronRight size={48} /></button>
    <AnimatePresence mode="wait">
      <motion.img key={idx} src={photos[idx]} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }} className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl" />
    </AnimatePresence>
    <div className="absolute bottom-6 text-white/30 text-sm">{idx + 1} / {photos.length}</div>
  </motion.div>
);

export default function Cyclades() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(4);
  const [liked, setLiked] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const { scrollYProgress: globalProgress } = useScroll();

  const total = 380 * nights;

  return (
    <div className="min-h-screen text-[#0A192F] antialiased overflow-x-hidden" style={{ backgroundColor: '#FFFFFF', fontFamily: "'Inter', sans-serif", cursor: 'none' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      <Cursor />

      {/* Progress bar — ocean blue */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#0284C7] origin-left z-[100]" style={{ scaleX: globalProgress }} />

      {/* NAVBAR */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-white/85 backdrop-blur-xl border-b border-[#0A192F]/8">
        <div className="font-['Playfair_Display'] text-xl font-bold tracking-wide">AEGEAN<span className="text-[#0284C7]">.</span>VILLAS</div>
        <div className="flex items-center gap-4">
          <button data-hover onClick={() => setLiked(!liked)} className="w-11 h-11 rounded-full border border-[#0A192F]/15 flex items-center justify-center hover:border-[#0284C7] transition-colors">
            <Heart size={18} fill={liked ? '#0284C7' : 'none'} color={liked ? '#0284C7' : '#0A192F'} />
          </button>
          <motion.button data-hover whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="bg-[#0A192F] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-wider hover:bg-[#0284C7] transition-colors duration-500">
            ΚΡΑΤΗΣΗ
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO — arch shape */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <img src={PHOTOS[0]} alt="Cyclades Villa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/30 via-transparent to-white" />
        </motion.div>

        <motion.div style={{ y: textY, opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-end pb-32 px-8 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit shadow-lg">
            <MapPin size={13} className="text-[#0284C7]" />
            <span>Σαντορίνη — Caldera View</span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
              className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-[100px] text-white font-bold leading-[1.0] drop-shadow-2xl">
              AEGEAN
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
              className="font-['Playfair_Display'] text-6xl md:text-8xl lg:text-[100px] text-white/30 font-bold italic leading-[1.0]">
              Sanctuary
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            className="flex items-center gap-4 mt-8 text-white">
            <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#0284C7" color="#0284C7" />)}</div>
            <span className="text-white/70 text-sm font-medium">4.99 · 180+ κριτικές</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2 text-white/50">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-[1px] h-10 bg-white/30" />
          <span className="text-[10px] tracking-[0.3em] uppercase rotate-90 mt-4">Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <Reveal>
        <div className="max-w-[1200px] mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-[#0A192F]/8">
          {[
            { n: '3', l: 'Υπνοδωμάτια', icon: Bed },
            { n: '6', l: 'Επισκέπτες', icon: Users },
            { n: '2', l: 'Μπάνια', icon: Bath },
            { n: '∞', l: 'Θέα Caldera', icon: Waves },
          ].map(({ n, l, icon: Icon }) => (
            <div key={l} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0284C7]/10 flex items-center justify-center">
                <Icon size={20} className="text-[#0284C7]" />
              </div>
              <div>
                <div className="font-['Playfair_Display'] text-2xl font-bold">{n}</div>
                <div className="text-sm text-[#0A192F]/60">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* MAIN CONTENT + BOOKING */}
      <div className="max-w-[1200px] mx-auto px-8 py-16 grid lg:grid-cols-[1fr_380px] gap-16">
        <div>
          <Reveal>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-6">Ζήστε την Κυκλαδίτικη Αύρα</h2>
            <p className="text-lg text-[#0A192F]/60 leading-relaxed mb-12">
              Τρία υπνοδωμάτια με θέα caldera, ιδιωτική infinity pool και αρχιτεκτονική που σέβεται το κυκλαδίτικο λευκό. Εδώ ο χρόνος σταματά.
            </p>
          </Reveal>

          {/* PHOTO GRID */}
          <Reveal>
            <div className="grid grid-cols-3 gap-3 mb-16">
              {PHOTOS.slice(0, 6).map((src, i) => (
                <motion.div key={i} data-hover onClick={() => setLightbox({ open: true, idx: i })}
                  className={`relative overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2 h-[400px]' : 'h-[192px]'}`}
                  style={{ borderRadius: i === 0 ? '24px' : '16px' }}
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#0A192F]/0 group-hover:bg-[#0A192F]/25 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* AMENITIES */}
          <Reveal>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Παροχές</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14">
              {AMENITIES.map(({ icon: Icon, label }) => (
                <motion.div key={label} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#0A192F]/10 bg-[#FAFAFA] hover:border-[#0284C7]/40 transition-colors cursor-pointer">
                  <Icon size={18} className="text-[#0284C7]" />
                  <span className="font-medium text-sm">{label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* EXPERIENCE SECTION — scroll triggered */}
          <Reveal>
            <div className="bg-[#0A192F] rounded-3xl p-10 mb-14 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284C7] to-[#38BDF8]" />
              <h3 className="font-['Playfair_Display'] text-3xl text-white font-bold mb-4">Η Εμπειρία</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">Κυκλαδίτικη αρχιτεκτονική. Infinity pool με άπλετη θέα στη Caldera. Κάθε λεπτομέρεια έχει σχεδιαστεί για απόλυτη ησυχία.</p>
              <div className="grid grid-cols-3 gap-6">
                {[{ n: '4.99', l: 'Rating' }, { n: '180+', l: 'Κριτικές' }, { n: '95%', l: 'Επανέρχονται' }].map(({ n, l }) => (
                  <div key={l}>
                    <div className="font-['Playfair_Display'] text-4xl text-white font-bold">{n}</div>
                    <div className="text-white/40 text-sm mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* REVIEWS */}
          <Reveal>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Playfair_Display'] text-2xl font-bold">Κριτικές</h3>
              <div className="flex gap-2">
                {[ChevronLeft, ChevronRight].map((Icon, d) => (
                  <button key={d} data-hover onClick={() => setReviewIdx(i => d === 0 ? Math.max(0, i - 1) : Math.min(REVIEWS.length - 1, i + 1))}
                    className="w-10 h-10 rounded-full border border-[#0A192F]/15 flex items-center justify-center hover:border-[#0284C7] transition-colors">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={reviewIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5, ease: EASE }}
                className="bg-white rounded-2xl p-8 border border-[#0A192F]/8 shadow-sm">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#0284C7" color="#0284C7" />)}</div>
                <p className="text-[#0A192F]/70 text-lg leading-relaxed mb-6">"{REVIEWS[reviewIdx].text}"</p>
                <div className="flex items-center gap-3">
                  <img src={REVIEWS[reviewIdx].avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <div className="font-semibold text-sm">{REVIEWS[reviewIdx].name}</div>
                    <div className="text-xs text-[#0A192F]/50">{REVIEWS[reviewIdx].loc}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* BOOKING PANEL */}
        <div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease: EASE }}
            className="sticky top-28 bg-white rounded-3xl border border-[#0A192F]/10 shadow-2xl shadow-[#0284C7]/8 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0284C7] to-[#38BDF8]" />

            <div className="mb-6">
              <div className="font-['Playfair_Display'] text-3xl font-bold">380€ <span className="text-base font-normal text-[#0A192F]/60">/ νύχτα</span></div>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} fill="#0284C7" color="#0284C7" />
                <span className="text-sm font-semibold">4.99</span>
                <span className="text-sm text-[#0A192F]/50">· 180+ κριτικές</span>
              </div>
            </div>

            {[
              { label: 'Επισκέπτες', val: guests, set: setGuests, min: 1, max: 6 },
              { label: 'Νύχτες', val: nights, set: setNights, min: 1, max: 30 },
            ].map(({ label, val, set, min, max }) => (
              <div key={label} className="mb-4">
                <label className="text-xs font-bold tracking-[0.2em] text-[#0A192F]/50 uppercase mb-2 block">{label}</label>
                <div className="flex items-center justify-between border border-[#0A192F]/15 rounded-xl p-4">
                  <button data-hover onClick={() => set(v => Math.max(min, v - 1))} className="w-8 h-8 rounded-full border border-[#0A192F]/15 flex items-center justify-center hover:border-[#0284C7] transition-colors"><Minus size={14} /></button>
                  <span className="font-bold">{val} {label.toLowerCase()}</span>
                  <button data-hover onClick={() => set(v => Math.min(max, v + 1))} className="w-8 h-8 rounded-full border border-[#0A192F]/15 flex items-center justify-center hover:border-[#0284C7] transition-colors"><Plus size={14} /></button>
                </div>
              </div>
            ))}

            <div className="space-y-3 mb-6 py-4 border-t border-[#0A192F]/8">
              <div className="flex justify-between text-sm"><span className="text-[#0A192F]/60">380€ × {nights} νύχτες</span><span className="font-medium">{total}€</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#0A192F]/60">Τέλη καθαρισμού</span><span className="font-medium">100€</span></div>
              <div className="flex justify-between font-bold pt-3 border-t border-[#0A192F]/8 text-lg"><span>Σύνολο</span><span>{total + 100}€</span></div>
            </div>

            <motion.button data-hover whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0A192F] text-white py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-[#0284C7] transition-colors duration-500 flex items-center justify-center gap-2">
              ΚΡΑΤΗΣΗ ΤΩΡΑ <ArrowUpRight size={18} />
            </motion.button>
            <p className="text-center text-xs text-[#0A192F]/40 mt-4">Δεν χρεώνεστε ακόμα</p>
            <div className="mt-4 flex items-center gap-2 pt-4 border-t border-[#0A192F]/8">
              <Check size={13} className="text-[#0284C7]" />
              <span className="text-xs text-[#0A192F]/50">Δωρεάν ακύρωση έως 48ω πριν</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-[#0A192F] py-32 px-8 mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <Reveal>
            <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white leading-[1.0]">
              Το Αιγαίο<br />σας καλεί.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center">
              <div className="text-[#0284C7] text-sm tracking-[0.3em] uppercase mb-2">από μόνο</div>
              <div className="font-['Playfair_Display'] text-6xl font-bold text-white mb-6">380€</div>
              <motion.button data-hover whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0A192F] px-12 py-5 rounded-full font-bold tracking-widest text-sm hover:bg-[#0284C7] hover:text-white transition-colors duration-500">
                ΚΑΝΕ ΚΡΑΤΗΣΗ
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {lightbox.open && <Lightbox photos={PHOTOS} idx={lightbox.idx}
          onClose={() => setLightbox({ open: false, idx: 0 })}
          onPrev={() => setLightbox(l => ({ ...l, idx: (l.idx - 1 + PHOTOS.length) % PHOTOS.length }))}
          onNext={() => setLightbox(l => ({ ...l, idx: (l.idx + 1) % PHOTOS.length }))} />}
      </AnimatePresence>
    </div>
  );
}
