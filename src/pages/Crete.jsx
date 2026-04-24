import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, MapPin, Wifi, Wind, Waves, ChevronLeft, ChevronRight, X, Plus, Minus, ArrowUpRight, Check, Users, Bed, Bath, Sun, Mountain, Coffee } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const PHOTOS = [
  "/assets/crete_hero.png",
  "/assets/crete_living.png",
  "/assets/crete_bed.png",
  "/assets/greek_luxury_terrace_sunset_view_1776942676038.png",
  "/assets/greek_luxury_marble_bathroom_1776942694181.png",
  "/assets/greek_luxury_kitchen_detail_1776942713984.png",
];

const SCENES = [
  { img: "/assets/crete_hero.png", num: "01", tag: "THE ESTATE", line1: "KRHTH", line2: "ΑΝWΘΕΝ", sub: "Χανιά — Παραλιακή Βίλα" },
  { img: "/assets/crete_living.png", num: "02", tag: "LIVING", line1: "RAW", line2: "LUXURY", sub: "Stone & wood — hand-crafted" },
  { img: "/assets/crete_bed.png", num: "03", tag: "RETREAT", line1: "SLEEP", line2: "DEEP", sub: "Total silence. Total comfort." },
];

// Char-by-char scramble reveal (editorial brutalist style)
const ScrambleText = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    if (!isInView) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(text.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < iteration) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      iteration += 0.5;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className={className}>{display}</span>;
};

const LineReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div initial={{ y: '105%' }} animate={isInView ? { y: 0 } : {}} transition={{ duration: 1, ease: EASE, delay }}>
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
      setLabel(el?.dataset.cursor || '');
    };
    window.addEventListener('mousemove', m);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', over); };
  }, []);
  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        animate={{ x: pos.x - 24, y: pos.y - 24, scale: label ? 1 : hov ? 2 : 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        style={{ width: 48, height: 48, borderRadius: 0 }}>
        <div className={`w-full h-full border border-[#C2410C] flex items-center justify-center transition-all duration-300 ${label ? 'bg-[#C2410C]' : 'bg-transparent'}`} style={{ borderRadius: 0 }}>
          {label && <span className="text-white text-[9px] font-black tracking-widest uppercase">{label}</span>}
        </div>
      </motion.div>
      <motion.div className="fixed top-0 left-0 w-2 h-2 bg-[#C2410C] pointer-events-none z-[9998] hidden lg:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }} transition={{ type: 'spring', stiffness: 700, damping: 32 }} />
    </>
  );
};

// Full-screen cinematic scene — brutalist style
const Scene = ({ scene, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center">
      <motion.div style={{ y: bgY, scale: 1.08 }} className="absolute inset-0">
        <img src={scene.img} alt={scene.tag} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#271C19]/90 via-[#271C19]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity }} className="relative z-10 px-8 lg:px-20 max-w-[900px]">
        <div className="flex items-center gap-6 mb-8">
          <span className="font-mono text-[#C2410C] text-xs tracking-[0.4em]">{scene.num}</span>
          <div className="h-[1px] w-16 bg-[#C2410C]" />
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">{scene.tag}</span>
        </div>

        {[scene.line1, scene.line2].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.1 }}
              className="font-black uppercase leading-[0.85]"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(72px, 11vw, 150px)',
                color: i === 0 ? 'white' : 'transparent',
                WebkitTextStroke: i === 1 ? '2px rgba(255,255,255,0.25)' : 'none',
                letterSpacing: '-0.02em',
              }}
            >
              {line}
            </motion.div>
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center gap-4 mt-10"
        >
          <div className="h-[1px] w-8 bg-white/30" />
          <span className="text-white/40 text-sm tracking-widest">{scene.sub}</span>
        </motion.div>
      </motion.div>

      {index === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-10 right-10 flex flex-col items-center gap-4 text-white/30">
          <span className="text-[10px] tracking-[0.5em] uppercase -rotate-90 mb-4">Scroll</span>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      )}
    </section>
  );
};

const Lightbox = ({ photos, idx, onClose, onPrev, onNext }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-[#1C1917]/99 flex items-center justify-center">
    <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white z-10"><X size={32} /></button>
    <button onClick={onPrev} className="absolute left-6 text-white/25 hover:text-white"><ChevronLeft size={48} /></button>
    <button onClick={onNext} className="absolute right-6 text-white/25 hover:text-white"><ChevronRight size={48} /></button>
    <AnimatePresence mode="wait">
      <motion.img key={idx} src={photos[idx]} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }} className="max-h-[88vh] max-w-[88vw] object-contain" />
    </AnimatePresence>
    <div className="absolute bottom-6 text-white/25 text-xs font-mono tracking-widest">{String(idx + 1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')}</div>
  </motion.div>
);

export default function Crete() {
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [guests, setGuests] = useState(6);
  const [nights, setNights] = useState(7);
  const [reviewIdx, setReviewIdx] = useState(0);

  const REVIEWS = [
    { name: "Andreas V.", loc: "Βιέννη", text: "Raw beauty. Stone walls, linen curtains, the sound of the sea. Nothing is superfluous — everything is perfect.", avatar: "https://i.pravatar.cc/100?img=19" },
    { name: "Yuki T.", loc: "Οσάκα", text: "Αυτή η βίλα κατάφερε να με κάνει να νιώσω σαν στο σπίτι μου, αλλά 1000 φορές καλύτερα.", avatar: "https://i.pravatar.cc/100?img=56" },
  ];

  const { scrollYProgress } = useScroll();
  const total = 460 * nights;

  return (
    <div className="min-h-screen bg-[#1C1917] text-white antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", cursor: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Cursor />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#C2410C] origin-left z-[100]" style={{ scaleX: scrollYProgress }} />

      {/* BRUTAL NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex justify-between items-center border-b border-white/5 bg-[#1C1917]/80 backdrop-blur-xl">
        <div style={{ fontFamily: "'Oswald'", fontSize: 18, letterSpacing: '0.15em' }} className="uppercase">Κρήτη<span className="text-[#C2410C]">.</span>Estate</div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-1">{[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#C2410C" color="#C2410C" />)}</div>
          <motion.button data-hover whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="border border-white/20 text-white px-6 py-3 text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#C2410C] hover:border-[#C2410C] transition-all duration-400"
            style={{ borderRadius: 0 }}>
            ΚΡΑΤΗΣΗ
          </motion.button>
        </div>
      </motion.nav>

      {/* CINEMATIC SCENES */}
      {SCENES.map((scene, i) => <Scene key={i} scene={scene} index={i} />)}

      {/* CONTENT SECTION — terracotta brutalist */}
      <section className="bg-[#1C1917] py-32 px-8">
        <div className="max-w-[1200px] mx-auto">

          {/* INTRO */}
          <div className="grid md:grid-cols-2 gap-16 mb-24 border-t border-white/10 pt-16">
            <div>
              <div className="font-mono text-[#C2410C] text-xs tracking-[0.4em] mb-8">04 — PROPERTY</div>
              <LineReveal>
                <h2 style={{ fontFamily: "'Oswald'", fontSize: 'clamp(48px, 7vw, 90px)', lineHeight: 0.9 }} className="uppercase mb-8">
                  Κρητική Βίλα<br /><span className="text-white/20">5 Υπνοδωμ.</span>
                </h2>
              </LineReveal>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}
                className="text-white/40 text-lg leading-relaxed">
                Πέτρα και θάλασσα. Μια βίλα χτισμένη από τοπικούς μαστόρους, σχεδιασμένη για οικογένειες που θέλουν απόλυτη ιδιωτικότητα στην Κρήτη.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 gap-[1px] bg-white/5">
              {[
                { n: '460€', l: 'ανά νύχτα' }, { n: '4.96', l: 'Βαθμολογία' },
                { n: '5', l: 'Υπνοδωμάτια' }, { n: '12', l: 'Max Επισκέπτες' },
              ].map(({ n, l }) => (
                <div key={l} className="bg-[#1C1917] p-8 hover:bg-[#271C19] transition-colors">
                  <div style={{ fontFamily: "'Oswald'", fontSize: 40 }} className="text-white mb-1">{n}</div>
                  <div className="text-white/30 text-xs tracking-widest uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PHOTO GRID — editorial layout */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="grid grid-cols-12 gap-2 mb-24">
            {PHOTOS.map((src, i) => {
              const spans = [
                'col-span-8 h-[500px]', 'col-span-4 h-[500px]',
                'col-span-4 h-[320px]', 'col-span-4 h-[320px]', 'col-span-4 h-[320px]',
                'col-span-12 h-[280px]',
              ];
              return (
                <motion.div key={i} data-cursor="VIEW" data-hover onClick={() => setLightbox({ open: true, idx: i })}
                  className={`relative overflow-hidden group cursor-pointer ${spans[i]}`}
                  whileHover={{ scale: 0.99 }} transition={{ duration: 0.3 }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 saturate-75 group-hover:saturate-100" />
                  <div className="absolute inset-0 bg-[#1C1917]/40 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute bottom-4 left-4 font-mono text-white/30 text-xs group-hover:text-white/60 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* AMENITIES — table style */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
            className="mb-24 border-t border-white/10">
            <div className="font-mono text-[#C2410C] text-xs tracking-[0.4em] py-8">05 — ΠΑΡΟΧΕΣ</div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {[
                { icon: Waves, l: "Ιδ. Πισίνα 12m" },
                { icon: Mountain, l: "Θέα Λευκά Όρη" },
                { icon: Wind, l: "A/C All Rooms" },
                { icon: Wifi, l: "Fiber WiFi" },
                { icon: Sun, l: "Private Beach" },
                { icon: Coffee, l: "Outdoor Kitchen" },
              ].map(({ icon: Icon, l }, i) => (
                <motion.div key={l} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                  className="flex items-center gap-4 py-5 border-b border-white/5 hover:border-[#C2410C]/30 transition-colors group cursor-pointer">
                  <Icon size={18} className="text-[#C2410C] flex-shrink-0" />
                  <span className="text-white/60 group-hover:text-white transition-colors text-sm font-medium tracking-wide">{l}</span>
                  <ArrowUpRight size={14} className="text-white/10 group-hover:text-[#C2410C] transition-colors ml-auto" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* REVIEWS */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
            className="mb-24">
            <div className="flex items-center justify-between border-t border-white/10 pt-8 mb-8">
              <div className="font-mono text-[#C2410C] text-xs tracking-[0.4em]">06 — ΚΡΙΤΙΚΕΣ</div>
              <div className="flex gap-1">
                {[ChevronLeft, ChevronRight].map((Icon, d) => (
                  <button key={d} data-hover onClick={() => setReviewIdx(i => d === 0 ? Math.max(0, i - 1) : Math.min(REVIEWS.length - 1, i + 1))}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#C2410C] transition-colors"
                    style={{ borderRadius: 0 }}>
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={reviewIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: EASE }} className="border border-white/10 p-10">
                <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C2410C" color="#C2410C" />)}</div>
                <p className="text-white/60 text-xl leading-relaxed mb-8 font-light">"{REVIEWS[reviewIdx].text}"</p>
                <div className="flex items-center gap-4">
                  <img src={REVIEWS[reviewIdx].avatar} className="w-12 h-12 object-cover grayscale" alt="" />
                  <div>
                    <div className="font-semibold tracking-wide">{REVIEWS[reviewIdx].name}</div>
                    <div className="text-white/30 text-sm">{REVIEWS[reviewIdx].loc}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* BOOKING — full width brutal */}
      <section className="border-t border-white/10 py-24 px-8">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          <div>
            <div className="font-mono text-[#C2410C] text-xs tracking-[0.4em] mb-8">07 — ΚΡΑΤΗΣΗ</div>
            <LineReveal>
              <h2 style={{ fontFamily: "'Oswald'", fontSize: 'clamp(56px, 8vw, 110px)', lineHeight: 0.88 }} className="uppercase mb-10">
                Κρήτη<br /><span className="text-white/15">Σας Περιμένει</span>
              </h2>
            </LineReveal>
            <div className="space-y-3 text-white/30 text-sm">
              {['Δωρεάν ακύρωση έως 48ω πριν', 'Απευθείας επικοινωνία με τον ιδιοκτήτη', 'Secure payment — no hidden fees'].map(t => (
                <div key={t} className="flex items-center gap-3"><Check size={14} className="text-[#C2410C]" />{t}</div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }}
            className="border border-white/15 p-8">
            <div className="border-b border-white/10 pb-6 mb-6">
              <div style={{ fontFamily: "'Oswald'", fontSize: 40 }} className="mb-1">460€ <span className="text-base font-normal text-white/30" style={{ fontFamily: 'Inter' }}>/ νύχτα</span></div>
              <div className="flex gap-1 mt-2">{[1,2,3,4,5].map(s => <Star key={s} size={11} fill="#C2410C" color="#C2410C" />)}</div>
            </div>

            {[
              { label: 'Επισκέπτες', val: guests, set: setGuests, min: 1, max: 12 },
              { label: 'Νύχτες', val: nights, set: setNights, min: 1, max: 30 },
            ].map(({ label, val, set, min, max }) => (
              <div key={label} className="mb-4">
                <label className="font-mono text-xs tracking-[0.3em] text-white/25 uppercase mb-2 block">{label}</label>
                <div className="flex items-center justify-between border border-white/10 p-4 hover:border-white/20 transition-colors" style={{ borderRadius: 0 }}>
                  <button data-hover onClick={() => set(v => Math.max(min, v - 1))} className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#C2410C] transition-colors" style={{ borderRadius: 0 }}><Minus size={14} /></button>
                  <span className="font-medium text-sm">{val} {label.toLowerCase()}</span>
                  <button data-hover onClick={() => set(v => Math.min(max, v + 1))} className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-[#C2410C] transition-colors" style={{ borderRadius: 0 }}><Plus size={14} /></button>
                </div>
              </div>
            ))}

            <div className="space-y-3 py-5 border-t border-white/10 mb-6 text-sm">
              <div className="flex justify-between text-white/40"><span>460€ × {nights} νύχτες</span><span className="text-white">{total}€</span></div>
              <div className="flex justify-between text-white/40"><span>Τέλη καθαρισμού</span><span className="text-white">140€</span></div>
              <div className="flex justify-between font-black text-lg pt-4 border-t border-white/10" style={{ fontFamily: "'Oswald'" }}><span>ΣΥΝΟΛΟ</span><span>{total + 140}€</span></div>
            </div>

            <motion.button data-hover whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full bg-[#C2410C] text-white py-5 font-black text-xs tracking-[0.3em] uppercase hover:bg-[#9A3412] transition-colors duration-300 flex items-center justify-center gap-2"
              style={{ borderRadius: 0, fontFamily: "'Oswald'", fontSize: 14 }}>
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
