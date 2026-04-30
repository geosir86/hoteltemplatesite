import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Wifi, Wind, Coffee, Tv, ChevronLeft, ChevronRight,
  ArrowRight, Users, BedDouble, Bath, X, Home
} from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];
const GOLD = '#CA8A04';
const DARK = '#0A0A0A';

const COPY = {
  en: {
    eyebrow: 'Monastiraki · Athens',
    title: 'The Athens Flat',
    subtitle: 'Where the city breathes.',
    tagline: 'A 45m² studio that feels like a sanctuary in the heart of Athens. Designed. Curated. Yours.',
    acropolis: 'Acropolis view from the window',
    guests: '2 guests', beds: '1 bed', bath: '1 bath', sqm: '45 m²',
    descHead: 'Small space.\nBig soul.',
    desc: 'Not every unforgettable stay happens in a villa. Sometimes it\'s the narrow staircase, the espresso machine humming at 7am, and the Acropolis catching the first light from your window. The Athens Flat is 45 square metres of pure intention — stripped of excess, rich in feeling.',
    amenitiesHead: 'Everything\nyou need.',
    amenities: [
      { icon: Wifi, label: 'High-speed WiFi' },
      { icon: Wind, label: 'A/C & Heating' },
      { icon: Coffee, label: 'Nespresso machine' },
      { icon: Tv, label: 'Smart TV + Netflix' },
      { icon: Home, label: 'Self check-in' },
      { icon: MapPin, label: 'Central location' },
    ],
    ratingHead: 'Guests say',
    reviews: [
      { name: 'Maëlle R.', loc: 'Lyon', date: 'Oct 2024', text: 'I have stayed in 5-star hotels that had less soul than this flat. The light, the view, the details — perfect.', avatar: 'https://i.pravatar.cc/100?img=5' },
      { name: 'Daniel K.', loc: 'Berlin', date: 'Aug 2024', text: 'Exactly what Athens should feel like. Woke up to the Acropolis every morning. Can\'t believe it\'s only 45sqm.', avatar: 'https://i.pravatar.cc/100?img=18' },
      { name: 'Elena P.', loc: 'Rome', date: 'Sep 2024', text: 'Small but flawlessly designed. Every corner is intentional. The neighbourhood is electric. I will be back.', avatar: 'https://i.pravatar.cc/100?img=44' },
    ],
    ctaHead: 'Your property,\ncinematized.',
    ctaSub: 'Stop blending in with generic listings. Get a premium, editorial showcase for your rental today.',
    cta: 'Get this design',
    from: 'Starting from',
    night: 'per project',
    backLabel: 'Back to Portfolio',
  },
  gr: {
    eyebrow: 'Μοναστηράκι · Αθήνα',
    title: 'The Athens Flat',
    subtitle: 'Εκεί που η πόλη αναπνέει.',
    tagline: 'Ένα studio 45τμ που νιώθεις σαν καταφύγιο στην καρδιά της Αθήνας. Σχεδιασμένο. Επιμελημένο. Δικό σου.',
    acropolis: 'Θέα στην Ακρόπολη από το παράθυρο',
    guests: '2 επισκέπτες', beds: '1 κρεβάτι', bath: '1 μπάνιο', sqm: '45 τ.μ.',
    descHead: 'Μικρός χώρος.\nΜεγάλη ψυχή.',
    desc: 'Δεν περνάνε όλες οι αξέχαστες διαμονές σε βίλα. Μερικές φορές είναι η στενή σκάλα, η μηχανή espresso που σιγοβράζει στις 7 το πρωί, και η Ακρόπολη που πιάνει το πρώτο φως από το παράθυρό σου. The Athens Flat είναι 45 τ.μ. καθαρής πρόθεσης.',
    amenitiesHead: 'Ό,τι\nχρειάζεσαι.',
    amenities: [
      { icon: Wifi, label: 'Γρήγορο WiFi' },
      { icon: Wind, label: 'A/C & Θέρμανση' },
      { icon: Coffee, label: 'Nespresso' },
      { icon: Tv, label: 'Smart TV + Netflix' },
      { icon: Home, label: 'Self check-in' },
      { icon: MapPin, label: 'Κεντρική τοποθεσία' },
    ],
    ratingHead: 'Λένε οι επισκέπτες',
    reviews: [
      { name: 'Maëlle R.', loc: 'Λυών', date: 'Οκτ 2024', text: 'Έχω μείνει σε ξενοδοχεία 5 αστέρων με λιγότερη ψυχή από αυτό το διαμέρισμα. Το φως, η θέα, οι λεπτομέρειες — τέλεια.', avatar: 'https://i.pravatar.cc/100?img=5' },
      { name: 'Daniel K.', loc: 'Βερολίνο', date: 'Αύγ 2024', text: 'Ακριβώς αυτό που πρέπει να νιώθεις στην Αθήνα. Ξυπνούσα με την Ακρόπολη κάθε πρωί. Απίστευτο για 45 τ.μ.', avatar: 'https://i.pravatar.cc/100?img=18' },
      { name: 'Elena P.', loc: 'Ρώμη', date: 'Σεπτ 2024', text: 'Μικρό αλλά άψογα σχεδιασμένο. Κάθε γωνιά έχει νόημα. Η γειτονιά είναι μαγευτική. Θα επιστρέψω.', avatar: 'https://i.pravatar.cc/100?img=44' },
    ],
    ctaHead: 'Το ακίνητό σας,\nσε σινεμά.',
    ctaSub: 'Σταματήστε να χάνεστε στις κοινές πλατφόρμες. Αποκτήστε ένα premium, editorial showcase για το ενοικιαζόμενό σας σήμερα.',
    cta: 'Αποκτήστε αυτό το design',
    from: 'Ξεκινώντας από',
    night: 'ανά project',
    backLabel: 'Πίσω στο Portfolio',
  },
};

/* ── Parallax Hero ── */
function Hero({ c }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-end">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src="/assets/athens_flat_hero.png" alt={c.title}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.1) 100%)'
        }} />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <MapPin size={13} color={GOLD} />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>{c.eyebrow}</span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="text-white leading-none mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            {c.title}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-xl md:text-2xl font-light italic mb-8"
          style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Playfair Display', serif" }}
        >
          {c.subtitle}
        </motion.p>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-wrap items-center gap-6 text-xs tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {[c.guests, c.beds, c.bath, c.sqm].map((s, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span style={{ color: GOLD }}>·</span>}
              {s}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <Star size={13} fill={GOLD} color={GOLD} />
            <span className="text-white font-semibold">4.96</span>
            <span>· 87 reviews</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        <span className="text-[9px] tracking-[0.5em] uppercase rotate-90 origin-center">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── Section Reveal wrapper ── */
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Photo gallery ── */
function Gallery({ c }) {
  const [lightbox, setLightbox] = useState(null);
  const photos = [
    { src: '/assets/athens_flat_hero.png', label: c.acropolis },
    { src: '/assets/athens_flat_bedroom.png', label: 'The sleeping nook' },
    { src: '/assets/athens_flat_kitchen.png', label: 'Morning ritual' },
  ];

  return (
    <section className="py-4 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'col-span-2 md:col-span-2 row-span-1' : ''}`}
            style={{ aspectRatio: i === 0 ? '16/7' : '4/5' }}
            onClick={() => setLightbox(i)}
          >
            <img src={p.src} alt={p.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            <span className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase text-white/60">{p.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[800] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-6 right-6 text-white/60 hover:text-white cursor-pointer"><X size={26} /></button>
            <button className="absolute left-6 text-white/60 hover:text-white cursor-pointer"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}>
              <ChevronLeft size={36} />
            </button>
            <img src={photos[lightbox].src} alt="" className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl"
              onClick={e => e.stopPropagation()} />
            <button className="absolute right-6 text-white/60 hover:text-white cursor-pointer"
              onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}>
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Main Page ── */
export default function AirbnbListing({ lang = 'en' }) {
  const c = COPY[lang];

  return (
    <div className="min-h-screen antialiased overflow-x-hidden" style={{ backgroundColor: DARK }}>
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-[400] px-6 md:px-16 py-5 flex items-center justify-between pointer-events-none">
        <Link to="/"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ChevronLeft size={13} /> {c.backLabel}
        </Link>
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{ backgroundColor: GOLD, color: '#0A0A0A' }}>
          {lang === 'en' ? 'Get this site' : 'Αποκτήστε το site'}
        </div>
      </div>

      {/* Hero */}
      <Hero c={c} />

      {/* Tagline intro */}
      <section className="py-24 md:py-36 px-6 md:px-16">
        <Reveal>
          <div className="max-w-[900px] mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-12 h-px" style={{ backgroundColor: GOLD }} />
              <span className="text-[10px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>Studio · Athens</span>
              <div className="w-12 h-px" style={{ backgroundColor: GOLD }} />
            </div>
            <p className="text-xl md:text-3xl font-light leading-relaxed italic"
              style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Playfair Display', serif" }}>
              "{c.tagline}"
            </p>
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      <Gallery c={c} />

      {/* Description — editorial split layout */}
      <section className="py-24 md:py-36 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <Reveal>
            <h2
              className="text-4xl md:text-6xl font-light leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif", whiteSpace: 'pre-line' }}
            >
              {c.descHead}
            </h2>
            <div className="flex items-center gap-4 mt-10">
              <Star size={14} fill={GOLD} color={GOLD} />
              <span className="text-sm font-semibold text-white">4.96</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>· 87 reviews</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {c.desc}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: c.guests, Icon: Users },
                { label: c.beds, Icon: BedDouble },
                { label: c.bath, Icon: Bath },
                { label: c.sqm, Icon: Home },
              ].map(({ label, Icon }) => (
                <div key={label} className="flex items-center gap-3 py-4 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={16} color={GOLD} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Amenities — horizontal scroll on mobile, grid on desktop */}
      <section className="py-24 md:py-36 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-16"
              style={{ fontFamily: "'Playfair Display', serif", whiteSpace: 'pre-line' }}>
              {c.amenitiesHead}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {c.amenities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
                  className="flex items-center gap-5 py-8 px-6 border-t group hover:bg-white/[0.02] transition-colors duration-300 cursor-default"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <Icon size={20} color={GOLD} className="flex-shrink-0" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{a.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 md:py-36 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px" style={{ backgroundColor: GOLD }} />
              <span className="text-[11px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>{c.ratingHead}</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {c.reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: EASE }}
                className="p-8 border-t hover:bg-white/[0.02] transition-colors duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{r.loc} · {r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={11} fill={GOLD} color={GOLD} />)}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Playfair Display', serif" }}>
                  "{r.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 px-6 md:px-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <Reveal>
            <div className="w-10 h-px mx-auto mb-10" style={{ backgroundColor: GOLD }} />
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {c.ctaHead}
            </h2>
            <p className="text-base md:text-lg mb-12" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.ctaSub}</p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#B45309' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer transition-colors duration-300"
              style={{ backgroundColor: GOLD, color: '#0A0A0A' }}
            >
              {c.cta} <ArrowRight size={16} />
            </motion.button>
            <p className="mt-8 text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {c.from} €490 {c.night}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-16 border-t flex items-center justify-between text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.25)' }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
          STAYSCAPE<span style={{ color: GOLD }}>.</span>GR
        </span>
        <span>© 2026 · Demo build</span>
      </footer>
    </div>
  );
}
