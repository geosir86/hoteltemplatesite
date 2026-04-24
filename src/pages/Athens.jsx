import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { Star, MapPin, Wifi, Wind, Coffee, Tv, Car, Waves, ChevronLeft, ChevronRight, X, Plus, Minus, ArrowUpRight, Check, Users, Bed, Bath, Square, Heart, Share2 } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const PHOTOS = [
  "/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png",
  "/assets/greek_luxury_interior_master_bedroom_1776942408192.png",
  "/assets/greek_luxury_living_room_dining_1776942426126.png",
  "/assets/greek_luxury_terrace_sunset_view_1776942676038.png",
  "/assets/greek_luxury_marble_bathroom_1776942694181.png",
  "/assets/greek_luxury_kitchen_detail_1776942713984.png",
];

const AMENITIES = [
  { icon: Wifi, label: "WiFi 1Gbps" },
  { icon: Wind, label: "A/C Nest" },
  { icon: Coffee, label: "Nespresso" },
  { icon: Tv, label: '85" 8K TV' },
  { icon: Car, label: "Parking" },
  { icon: Waves, label: "Ιδ. SPA" },
];

const REVIEWS = [
  { name: "Sofia M.", loc: "Λονδίνο", rating: 5, text: "Απίστευτη θέα στην Ακρόπολη. Η καλύτερη εμπειρία που είχαμε ποτέ στην Αθήνα.", avatar: "https://i.pravatar.cc/100?img=47" },
  { name: "Marco R.", loc: "Μιλάνο", rating: 5, text: "Perfectly curated space. The marble bathroom alone is worth every euro.", avatar: "https://i.pravatar.cc/100?img=33" },
  { name: "Anna K.", loc: "Παρίσι", rating: 5, text: "Superhost με κάθε έννοια. Επιστρέφουμε σίγουρα.", avatar: "https://i.pravatar.cc/100?img=25" },
];

// Custom magnetic cursor
const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(!!e.target.closest('button, a, [data-hover]'));
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', over); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 w-3 h-3 bg-[#1C1917] rounded-full pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hov ? 0 : 1 }} transition={{ type: 'spring', stiffness: 500, damping: 28 }} />
      <motion.div className="fixed top-0 left-0 w-10 h-10 border border-[#1C1917] rounded-full pointer-events-none z-[9998] hidden lg:block"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hov ? 2.5 : 1, opacity: hov ? 0.5 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} />
    </>
  );
};

// Scroll progress bar
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#CA8A04] origin-left z-[100]" style={{ scaleX: scrollYProgress }} />;
};

// Reveal on scroll
const Reveal = ({ children, delay = 0, y = 60 }) => (
  <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: EASE, delay }}>
    {children}
  </motion.div>
);

// Staggered word reveal
const WordReveal = ({ text, className }) => (
  <motion.h1 className={className} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
    {text.split(' ').map((word, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
        <motion.span style={{ display: 'inline-block' }} variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 1, ease: EASE } } }}>
          {word}
        </motion.span>
      </span>
    ))}
  </motion.h1>
);

// Photo Lightbox
const Lightbox = ({ photos, idx, onClose, onPrev, onNext }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center">
    <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"><X size={36} /></button>
    <button onClick={onPrev} className="absolute left-6 text-white/60 hover:text-white transition-colors"><ChevronLeft size={48} /></button>
    <button onClick={onNext} className="absolute right-6 text-white/60 hover:text-white transition-colors"><ChevronRight size={48} /></button>
    <AnimatePresence mode="wait">
      <motion.img key={idx} src={photos[idx]} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5, ease: EASE }} className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl" />
    </AnimatePresence>
    <div className="absolute bottom-6 text-white/40 text-sm font-medium">{idx + 1} / {photos.length}</div>
  </motion.div>
);

export default function Athens() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);
  const [liked, setLiked] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  const total = 290 * nights;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAF9] text-[#1C1917] antialiased overflow-x-hidden" style={{ fontFamily: "'Jost', sans-serif", cursor: 'none' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap');`}</style>

      <Cursor />
      <ProgressBar />

      {/* NAVBAR */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-[#1C1917]/8">
        <div className="font-['Bodoni_Moda'] text-xl font-bold tracking-wide">STAYSCAPE<span className="text-[#CA8A04]">.</span>GR</div>
        <div className="flex items-center gap-4">
          <button data-hover onClick={() => setLiked(!liked)} className="w-11 h-11 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors">
            <Heart size={18} fill={liked ? '#CA8A04' : 'none'} color={liked ? '#CA8A04' : '#1C1917'} />
          </button>
          <button data-hover className="w-11 h-11 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors">
            <Share2 size={18} />
          </button>
          <motion.button data-hover whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="bg-[#1C1917] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-wider hover:bg-[#CA8A04] transition-colors duration-500">
            ΚΡΑΤΗΣΗ
          </motion.button>
        </div>
      </motion.nav>

      {/* HERO - full screen parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <img src={PHOTOS[0]} alt="Athens Penthouse" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FAFAF9]" />
        </motion.div>

        <motion.div style={{ y: textY, opacity: heroOpacity }} className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <MapPin size={14} className="text-[#CA8A04]" />
            <span>Πλάκα, Αθήνα — με θέα Ακρόπολη</span>
          </motion.div>

          <WordReveal text="ΠΟΛΥΤΕΛΗΣ PENTHOUSE ΑΘΗΝΑ" className="font-['Bodoni_Moda'] text-5xl md:text-7xl lg:text-[90px] text-white leading-[1.0] mb-8 drop-shadow-2xl" />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            className="flex items-center gap-6 text-white">
            <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#CA8A04" color="#CA8A04" />)}</div>
            <span className="text-white/80 font-medium">4.98 · 200+ κριτικές</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-[1px] h-10 bg-white/40" />
        </motion.div>
      </section>

      {/* STATS ROW */}
      <Reveal>
        <div className="max-w-[1200px] mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#1C1917]/8">
          {[
            { n: '4', l: 'Υπνοδωμάτια', icon: Bed },
            { n: '8', l: 'Επισκέπτες', icon: Users },
            { n: '3', l: 'Μπάνια', icon: Bath },
            { n: '280m²', l: 'Εμβαδό', icon: Square },
          ].map(({ n, l, icon: Icon }) => (
            <div key={l} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center">
                <Icon size={20} className="text-[#CA8A04]" />
              </div>
              <div>
                <div className="font-['Bodoni_Moda'] text-2xl font-bold">{n}</div>
                <div className="text-sm text-[#44403C]">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* MAIN CONTENT + BOOKING */}
      <div className="max-w-[1200px] mx-auto px-8 py-16 grid lg:grid-cols-[1fr_380px] gap-16">
        {/* LEFT */}
        <div>
          <Reveal>
            <h2 className="font-['Bodoni_Moda'] text-4xl font-bold mb-6">Η Διαμονή σας ως Εμπειρία</h2>
            <p className="text-lg text-[#44403C] leading-relaxed mb-12">
              Ένα εξαιρετικό penthouse 280τμ στην Πλάκα με ανεμπόδιστη θέα στην Ακρόπολη. Σχεδιασμένο για όσους αξιώνουν το καλύτερο — από την υφή των υφασμάτων έως την ποιότητα του ήχου.
            </p>
          </Reveal>

          {/* PHOTO GRID */}
          <Reveal>
            <div className="grid grid-cols-3 gap-3 mb-16">
              {PHOTOS.slice(0, 6).map((src, i) => (
                <motion.div key={i} data-hover onClick={() => setLightbox({ open: true, idx: i })}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2 h-[420px]' : 'h-[200px]'}`}
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  {i === 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                      <span className="text-lg">+{PHOTOS.length - 6} φωτό</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* AMENITIES */}
          <Reveal>
            <h3 className="font-['Bodoni_Moda'] text-2xl font-bold mb-8">Παροχές</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {AMENITIES.map(({ icon: Icon, label }) => (
                <motion.div key={label} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-[#1C1917]/10 bg-white hover:border-[#CA8A04]/40 transition-colors">
                  <Icon size={20} className="text-[#CA8A04]" />
                  <span className="font-medium text-sm">{label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* REVIEWS */}
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-['Bodoni_Moda'] text-2xl font-bold">Κριτικές</h3>
              <div className="flex gap-2">
                <button data-hover onClick={() => setReviewIdx(i => Math.max(0, i - 1))}
                  className="w-10 h-10 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button data-hover onClick={() => setReviewIdx(i => Math.min(REVIEWS.length - 1, i + 1))}
                  className="w-10 h-10 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={reviewIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="bg-white rounded-2xl p-8 border border-[#1C1917]/8 shadow-sm">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#CA8A04" color="#CA8A04" />)}</div>
                <p className="text-[#44403C] text-lg leading-relaxed mb-6">"{REVIEWS[reviewIdx].text}"</p>
                <div className="flex items-center gap-3">
                  <img src={REVIEWS[reviewIdx].avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <div className="font-semibold text-sm">{REVIEWS[reviewIdx].name}</div>
                    <div className="text-xs text-[#44403C]">{REVIEWS[reviewIdx].loc}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        {/* RIGHT — STICKY BOOKING PANEL */}
        <div className="relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease: EASE }}
            className="sticky top-28 bg-white rounded-3xl border border-[#1C1917]/10 shadow-2xl shadow-[#1C1917]/8 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CA8A04] via-[#D97706] to-[#CA8A04]" />

            <div className="mb-6">
              <div className="text-3xl font-['Bodoni_Moda'] font-bold">290€ <span className="text-base font-normal text-[#44403C]">/ νύχτα</span></div>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} fill="#CA8A04" color="#CA8A04" />
                <span className="text-sm font-semibold">4.98</span>
                <span className="text-sm text-[#44403C]">· 200+ κριτικές</span>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-4">
              <label className="text-xs font-bold tracking-[0.2em] text-[#44403C] uppercase mb-2 block">Επισκέπτες</label>
              <div className="flex items-center justify-between border border-[#1C1917]/15 rounded-xl p-4">
                <button data-hover onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-8 h-8 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors"><Minus size={14} /></button>
                <span className="font-bold">{guests} επισκέπτες</span>
                <button data-hover onClick={() => setGuests(g => Math.min(8, g + 1))} className="w-8 h-8 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors"><Plus size={14} /></button>
              </div>
            </div>

            {/* Nights */}
            <div className="mb-6">
              <label className="text-xs font-bold tracking-[0.2em] text-[#44403C] uppercase mb-2 block">Νύχτες</label>
              <div className="flex items-center justify-between border border-[#1C1917]/15 rounded-xl p-4">
                <button data-hover onClick={() => setNights(n => Math.max(1, n - 1))} className="w-8 h-8 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors"><Minus size={14} /></button>
                <span className="font-bold">{nights} νύχτες</span>
                <button data-hover onClick={() => setNights(n => Math.min(30, n + 1))} className="w-8 h-8 rounded-full border border-[#1C1917]/15 flex items-center justify-center hover:border-[#CA8A04] transition-colors"><Plus size={14} /></button>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 mb-6 py-4 border-t border-[#1C1917]/8">
              <div className="flex justify-between text-sm">
                <span className="text-[#44403C]">290€ × {nights} νύχτες</span>
                <span className="font-medium">{total}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#44403C]">Τέλη καθαρισμού</span>
                <span className="font-medium">80€</span>
              </div>
              <div className="flex justify-between font-bold pt-3 border-t border-[#1C1917]/8 text-lg">
                <span>Σύνολο</span>
                <span>{total + 80}€</span>
              </div>
            </div>

            <motion.button data-hover whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-[#1C1917] text-white py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-[#CA8A04] transition-colors duration-500 flex items-center justify-center gap-2">
              ΚΡΑΤΗΣΗ ΤΩΡΑ
              <ArrowUpRight size={18} />
            </motion.button>

            <p className="text-center text-xs text-[#44403C] mt-4">Δεν χρεώνεστε ακόμα</p>

            <div className="mt-6 pt-4 border-t border-[#1C1917]/8 flex items-center gap-2">
              <Check size={14} className="text-[#CA8A04]" />
              <span className="text-xs text-[#44403C]">Δωρεάν ακύρωση έως 24ω πριν</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DARK CTA FOOTER */}
      <section className="bg-[#1C1917] text-white py-32 px-8 mt-16">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <Reveal>
            <h2 className="font-['Bodoni_Moda'] text-5xl md:text-7xl font-bold leading-[1.0]">
              Η Αθήνα<br />σας περιμένει.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="text-center">
              <div className="text-[#CA8A04] text-sm tracking-[0.3em] uppercase mb-2">από μόνο</div>
              <div className="font-['Bodoni_Moda'] text-6xl font-bold mb-6">290€</div>
              <motion.button data-hover whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1C1917] px-12 py-5 rounded-full font-bold tracking-widest text-sm hover:bg-[#CA8A04] hover:text-white transition-colors duration-500">
                ΚΑΝΕ ΚΡΑΤΗΣΗ
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && (
          <Lightbox photos={PHOTOS} idx={lightbox.idx} onClose={() => setLightbox({ open: false, idx: 0 })}
            onPrev={() => setLightbox(l => ({ ...l, idx: (l.idx - 1 + PHOTOS.length) % PHOTOS.length }))}
            onNext={() => setLightbox(l => ({ ...l, idx: (l.idx + 1) % PHOTOS.length }))} />
        )}
      </AnimatePresence>
    </div>
  );
}
