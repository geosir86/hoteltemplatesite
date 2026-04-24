import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Star, MapPin, Wifi, Wind, Waves, ChevronLeft, ChevronRight, X, Plus, Minus, ArrowUpRight, Check, Users, Bed, Bath, TreePine, Flame, Coffee } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.0, 0.0, 0.2, 1.0];

const PHOTOS = [
  "/assets/ionian_hero.png",
  "/assets/ionian_terrace.png",
  "/assets/ionian_bed.png",
  "/assets/greek_luxury_living_room_dining_1776942426126.png",
  "/assets/greek_luxury_marble_bathroom_1776942694181.png",
  "/assets/greek_luxury_kitchen_detail_1776942713984.png",
];

const SCENES = [
  {
    img: "/assets/ionian_hero.png",
    label: "THE ESTATE",
    headline: ["IONIAN", "DREAMS"],
    sub: "Κέρκυρα — Ιδιωτική Βίλα",
  },
  {
    img: "/assets/ionian_terrace.png",
    label: "THE TERRACE",
    headline: ["ENDLESS", "HORIZONS"],
    sub: "180° θέα Ιόνιο Πέλαγος",
  },
  {
    img: "/assets/ionian_bed.png",
    label: "THE SUITE",
    headline: ["ABSOLUTE", "SILENCE"],
    sub: "Luxury master suite",
  },
];

// Word-by-word animated reveal (wearebrand style)
const SplitReveal = ({ text, className, delay = 0, stagger = 0.06 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <div ref={ref} className={className} aria-label={text} style={{ overflow: 'hidden' }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.25em' }}
      >
        {text.split(' ').map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } }
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Line reveal (one whole line at a time)
const LineReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const [label, setLabel] = useState('');
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const el = e.target.closest('[data-cursor]');
      setHov(!!e.target.closest('button,a,[data-hover]'));
      setLabel(el ? el.dataset.cursor : '');
    };
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', over); };
  }, []);
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        animate={{ x: pos.x - 24, y: pos.y - 24, scale: label ? 1 : hov ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ width: 48, height: 48 }}
      >
        <div className={`w-full h-full rounded-full border border-[#15803D] flex items-center justify-center transition-all duration-300 ${label ? 'bg-[#15803D]' : 'bg-transparent'}`}>
          {label && <span className="text-white text-[9px] font-bold tracking-widest uppercase">{label}</span>}
        </div>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#15803D] rounded-full pointer-events-none z-[9998] hidden lg:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  );
};

// Cinematic full-height scene with multi-layer parallax
const CinematicScene = ({ scene, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background layer — slowest */}
      <motion.div style={{ y: bgY, scale: 1.1 }} className="absolute inset-0">
        <img src={scene.img} alt={scene.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0F172A]/90" />
      </motion.div>

      {/* Middle layer — overlay texture */}
      <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.6], [0, 0.4]) }}
        className="absolute inset-0 bg-[#0F172A] pointer-events-none" />

      {/* Foreground text — fastest */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center px-8">
        <LineReveal delay={0.1}>
          <span className="text-[#15803D] text-xs tracking-[0.5em] uppercase font-semibold mb-6 block">
            {String(index + 1).padStart(2, '0')} — {scene.label}
          </span>
        </LineReveal>

        {scene.headline.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.12 }}
              className="text-white leading-[0.9] font-black uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px, 12vw, 160px)',
                letterSpacing: '-0.02em',
                color: i === 1 ? 'transparent' : 'white',
                WebkitTextStroke: i === 1 ? '2px rgba(255,255,255,0.4)' : 'none',
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        <LineReveal delay={0.6}>
          <p className="text-white/50 text-lg mt-8 font-light tracking-wide">{scene.sub}</p>
        </LineReveal>
      </motion.div>

      {/* Scroll hint on first scene */}
      {index === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        </motion.div>
      )}
    </section>
  );
};

const Lightbox = ({ photos, idx, onClose, onPrev, onNext }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center">
    <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-10"><X size={32} /></button>
    <button onClick={onPrev} className="absolute left-6 text-white/30 hover:text-white"><ChevronLeft size={48} /></button>
    <button onClick={onNext} className="absolute right-6 text-white/30 hover:text-white"><ChevronRight size={48} /></button>
    <AnimatePresence mode="wait">
      <motion.img key={idx} src={photos[idx]} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }} className="max-h-[88vh] max-w-[88vw] object-contain" />
    </AnimatePresence>
    <div className="absolute bottom-6 text-white/30 text-xs tracking-widest">{idx + 1} / {photos.length}</div>
  </motion.div>
);

export default function Ionian() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [guests, setGuests] = useState(4);
  const [nights, setNights] = useState(5);
  const [reviewIdx, setReviewIdx] = useState(0);

  const REVIEWS = [
    { name: "Thomas B.", loc: "Βερολίνο", text: "The most immersive stay I've ever had. Waking up to the Ionian Sea from the master suite is transformative.", avatar: "https://i.pravatar.cc/100?img=15" },
    { name: "Hana M.", loc: "Τόκιο", text: "Απόλυτη ηρεμία. Η πισίνα με θέα στη θάλασσα είναι κάτι που δεν έχουμε ξαναδεί.", avatar: "https://i.pravatar.cc/100?img=9" },
  ];

  const total = 520 * nights;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", cursor: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Cursor />

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#15803D] origin-left z-[100]"
        style={{ scaleX: useScroll().scrollYProgress }} />

      {/* MINIMAL NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.1em', color: 'white' }}>IONIAN ESTATES</div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#15803D" color="#15803D" />)}</div>
          <motion.button data-hover whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#15803D] hover:text-white transition-colors duration-500"
            style={{ borderRadius: 0 }}>
            ΚΡΑΤΗΣΗ
          </motion.button>
        </div>
      </motion.nav>

      {/* CINEMATIC SCENES (wearebrand style) */}
      {SCENES.map((scene, i) => <CinematicScene key={i} scene={scene} index={i} />)}

      {/* TRANSITION — dark panel with stats */}
      <section className="bg-[#0F172A] py-32 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <SplitReveal text="Βίλα 4 Υπνοδωματίων" className="text-[#15803D] text-sm tracking-[0.3em] uppercase mb-6" />
              <SplitReveal text="Η Ιόνια Εμπειρία που Δεν Ξεχνάς"
                className="leading-[1.0] font-black uppercase mb-8"
                style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(48px, 6vw, 80px)' }} />
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                className="text-white/50 text-lg leading-relaxed">
                Μια βίλα που αγκαλιάζει τον χρόνο. Πέτρα, ξύλο, νερό — υλικά που δένουν με το ιόνιο τοπίο. Ιδιωτική πισίνα, κήπος ελιών και θέα που δεν έχει σύνορα.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: '520€', l: 'ανά νύχτα', icon: Flame },
                { n: '4.97', l: 'Βαθμολογία', icon: Star },
                { n: '150+', l: 'Κριτικές', icon: Users },
                { n: '280m²', l: 'Βίλα', icon: TreePine },
              ].map(({ n, l, icon: Icon }) => (
                <motion.div key={l} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}
                  className="border border-white/10 p-6 hover:border-[#15803D]/50 transition-colors group cursor-pointer">
                  <Icon size={20} className="text-[#15803D] mb-4" />
                  <div className="text-3xl font-black mb-1">{n}</div>
                  <div className="text-white/40 text-sm">{l}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PHOTO GALLERY */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="grid grid-cols-3 gap-2 mb-24">
            {PHOTOS.map((src, i) => (
              <motion.div key={i} data-cursor="VIEW" data-hover onClick={() => setLightbox({ open: true, idx: i })}
                className={`relative overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 h-[480px]' : i === 3 ? 'col-span-2 h-[300px]' : 'h-[300px]'}`}
                whileHover={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
                <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.85] group-hover:saturate-100" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-700" />
              </motion.div>
            ))}
          </motion.div>

          {/* AMENITIES */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
            className="mb-24">
            <div className="text-[#15803D] text-xs tracking-[0.4em] uppercase mb-8">Παροχές</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Waves, l: "Ιδ. Πισίνα Infinity" },
                { icon: Wind, l: "A/C Smart Nest" },
                { icon: Wifi, l: "WiFi Fiber 1Gbps" },
                { icon: Coffee, l: "Espresso Bar" },
                { icon: TreePine, l: "Κήπος Ελιών" },
                { icon: Bath, l: "Outdoor Shower" },
              ].map(({ icon: Icon, l }) => (
                <motion.div key={l} whileHover={{ x: 8, borderColor: 'rgba(21,128,61,0.5)' }} transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-5 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <Icon size={18} className="text-[#15803D] flex-shrink-0" />
                  <span className="text-sm font-medium">{l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* REVIEWS */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}>
            <div className="flex items-center justify-between mb-8">
              <div className="text-[#15803D] text-xs tracking-[0.4em] uppercase">Κριτικές</div>
              <div className="flex gap-2">
                {[ChevronLeft, ChevronRight].map((Icon, d) => (
                  <button key={d} data-hover onClick={() => setReviewIdx(i => d === 0 ? Math.max(0, i - 1) : Math.min(REVIEWS.length - 1, i + 1))}
                    className="w-10 h-10 border border-white/15 flex items-center justify-center hover:border-[#15803D] transition-colors">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={reviewIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: EASE }} className="border border-white/10 p-10">
                <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#15803D" color="#15803D" />)}</div>
                <p className="text-white/70 text-xl leading-relaxed mb-8 font-light">"{REVIEWS[reviewIdx].text}"</p>
                <div className="flex items-center gap-4">
                  <img src={REVIEWS[reviewIdx].avatar} className="w-12 h-12 rounded-full object-cover grayscale" alt="" />
                  <div>
                    <div className="font-semibold">{REVIEWS[reviewIdx].name}</div>
                    <div className="text-white/40 text-sm">{REVIEWS[reviewIdx].loc}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="bg-[#0A0F1E] py-24 px-8">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}>
            <div className="text-[#15803D] text-xs tracking-[0.4em] uppercase mb-6">Κρατήστε τώρα</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(60px, 8vw, 100px)', lineHeight: 0.9 }}
              className="uppercase mb-8">
              Ιόνια<br />
              <span className="text-white/20">Φύση</span><br />
              Σας Περιμένει
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8">
              Κάθε εποχή αποκαλύπτει ένα νέο πρόσωπο της Κέρκυρας. Κλείστε τη βίλα σας σήμερα.
            </p>
            <div className="flex items-center gap-3">
              <Check size={16} className="text-[#15803D]" />
              <span className="text-white/40 text-sm">Δωρεάν ακύρωση έως 48ω πριν</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="border border-white/10 p-8">
            <div className="mb-8">
              <div className="text-4xl font-black mb-1">520€ <span className="text-lg font-normal text-white/40">/ νύχτα</span></div>
              <div className="flex gap-1 mt-2">{[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#15803D" color="#15803D" />)}</div>
            </div>

            {[
              { label: 'Επισκέπτες', val: guests, set: setGuests, min: 1, max: 10 },
              { label: 'Νύχτες', val: nights, set: setNights, min: 1, max: 30 },
            ].map(({ label, val, set, min, max }) => (
              <div key={label} className="mb-4">
                <label className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2 block">{label}</label>
                <div className="flex items-center justify-between border border-white/10 p-4 hover:border-white/20 transition-colors">
                  <button data-hover onClick={() => set(v => Math.max(min, v - 1))} className="w-8 h-8 border border-white/15 flex items-center justify-center hover:border-[#15803D] transition-colors"><Minus size={14} /></button>
                  <span className="font-bold">{val} {label.toLowerCase()}</span>
                  <button data-hover onClick={() => set(v => Math.min(max, v + 1))} className="w-8 h-8 border border-white/15 flex items-center justify-center hover:border-[#15803D] transition-colors"><Plus size={14} /></button>
                </div>
              </div>
            ))}

            <div className="space-y-3 py-6 border-t border-white/10 mb-6">
              <div className="flex justify-between text-sm text-white/50"><span>520€ × {nights} νύχτες</span><span className="text-white">{total}€</span></div>
              <div className="flex justify-between text-sm text-white/50"><span>Τέλη καθαρισμού</span><span className="text-white">120€</span></div>
              <div className="flex justify-between font-black text-lg pt-4 border-t border-white/10"><span>Σύνολο</span><span>{total + 120}€</span></div>
            </div>

            <motion.button data-hover whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full bg-[#15803D] text-white py-5 font-bold text-xs tracking-[0.3em] uppercase hover:bg-[#166534] transition-colors duration-300 flex items-center justify-center gap-2">
              ΚΡΑΤΗΣΗ ΤΩΡΑ <ArrowUpRight size={16} />
            </motion.button>
          </motion.div>
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
