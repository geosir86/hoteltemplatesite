import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Send } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];
// Keep empty until public/assets/stayfolio-hero-loop.mp4 exists, then set that path here.
const HERO_VIDEO_SRC = '';

const HERO_FRAMES = [
  {
    image: '/assets/athens_flat_hero.png',
    typeLabel: { en: 'Studios', gr: 'Studios' },
    detail: { en: '45m² · Monastiraki, Athens', gr: '45τμ · Μοναστηράκι, Αθήνα' },
    path: '/airbnb',
    timecode: '07:14',
  },
  {
    image: '/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png',
    typeLabel: { en: 'Apartments', gr: 'Διαμερίσματα' },
    detail: { en: 'Penthouse · Acropolis view', gr: 'Penthouse · Θέα Ακρόπολης' },
    path: '/athens',
    timecode: '06:42',
  },
  {
    image: '/assets/cyclades_pool.png',
    typeLabel: { en: 'Island Villas', gr: 'Island Villas' },
    detail: { en: 'Clifftop pool · Cyclades', gr: 'Πισίνα με θέα · Κυκλάδες' },
    path: '/cyclades',
    timecode: '08:30',
  },
  {
    image: '/assets/ionian_hero.png',
    typeLabel: { en: 'Nature Retreats', gr: 'Καταφύγια φύσης' },
    detail: { en: 'Forest & sea · Ionian coast', gr: 'Δάσος & θάλασσα · Ιόνιο' },
    path: '/ionian',
    timecode: '09:05',
  },
  {
    image: '/assets/crete_hero.png',
    typeLabel: { en: 'Heritage Estates', gr: 'Παραδοσιακές επαύλεις' },
    detail: { en: 'Stone manor · Crete', gr: 'Πέτρινη έπαυλη · Κρήτη' },
    path: '/crete',
    timecode: '19:21',
  },
  {
    image: '/assets/nisi_hero.png',
    typeLabel: { en: 'Boutique Suites', gr: 'Boutique Suites' },
    detail: { en: 'Cave pool · Milos', gr: 'Cave pool · Μήλος' },
    path: '/nisi',
    timecode: '08:03',
  },
  {
    image: '/assets/santorini_hero_day.png',
    typeLabel: { en: 'Signature Stays', gr: 'Signature Stays' },
    detail: { en: 'Caldera view · Oia', gr: 'Θέα Καλντέρας · Οία' },
    path: '/santorini',
    timecode: '06:15',
  },
];

const KINETIC_WORDS = {
  en: ['listing', 'story', 'atmosphere', 'experience', 'brand'],
  gr: ['listing', 'ιστορία', 'ατμόσφαιρα', 'εμπειρία', 'brand'],
};

export default function CinematicHero({ lang = 'en', brand, copy }) {
  const reduced = useReducedMotion();
  const safeLang = KINETIC_WORDS[lang] ? lang : 'en';
  const [frameIndex, setFrameIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(Boolean(HERO_VIDEO_SRC));
  const [hovered, setHovered] = useState(false);
  const frame = HERO_FRAMES[frameIndex];
  const words = KINETIC_WORDS[safeLang];
  const stats = useMemo(() => copy.heroStats || [], [copy.heroStats]);

  useEffect(() => {
    if (reduced) return undefined;

    const timer = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % HERO_FRAMES.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;

    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % words.length);
    }, 2900);

    return () => window.clearInterval(timer);
  }, [reduced, words.length]);

  return (
    <section className="overflow-hidden px-4 pb-14 pt-24 md:px-6 md:pb-16" style={{ backgroundColor: brand.warmMarble }}>
      <div
        className="mx-auto grid min-h-[calc(100dvh-7rem)] w-full max-w-[calc(100vw-2rem)] rounded-lg border lg:max-w-[1440px] lg:grid-cols-[58fr_42fr]"
        style={{ borderColor: 'rgba(26,22,18,0.12)', backgroundColor: brand.warmMarble }}
      >
        <Link
          to={frame.path}
          className="relative block min-h-[420px] min-w-0 overflow-hidden bg-black md:min-h-[560px] lg:min-h-0"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {videoReady && !reduced && (
            <video
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              src={HERO_VIDEO_SRC}
              poster={HERO_FRAMES[0].image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoReady(false)}
              aria-label="Stayfolio cinematic property video"
            />
          )}
          {HERO_FRAMES.map((item, index) => (
            <motion.img
              key={item.image}
              src={item.image}
              alt={item.caption}
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              animate={{
                opacity: !videoReady && index === frameIndex ? 1 : 0,
                scale: index === frameIndex && !reduced ? 1.06 : 1.12,
              }}
              transition={{ duration: reduced ? 0 : 1.2, ease: EASE }}
            />
          ))}

          <div
            className="absolute inset-0 z-[2] transition-all duration-300"
            style={{
              background: hovered
                ? 'linear-gradient(to right, rgba(0,0,0,0.62), rgba(0,0,0,0.15), rgba(0,0,0,0.48))'
                : 'linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.10), rgba(0,0,0,0.35))',
            }}
          />

          <div className="absolute inset-x-5 top-5 z-[3] flex flex-col items-start gap-4 sm:flex-row sm:justify-between md:inset-x-8 md:top-8">
            <div className="flex flex-col gap-2">
              {HERO_FRAMES.map((item, index) => (
                <span
                  key={item.image}
                  className="h-0.5 w-8 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: index === frameIndex ? brand.bronzeLight : 'rgba(255,255,255,0.35)' }}
                />
              ))}
            </div>
            <div
              className="flex max-w-[5rem] shrink-0 items-center gap-2 overflow-hidden rounded-full border px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:max-w-none sm:text-[10px]"
              style={{ borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(0,0,0,0.34)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span className="shrink-0">REC</span>
              <span className="hidden sm:inline">· {frame.timecode}</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-5 right-5 z-[3] flex items-end justify-between gap-4 text-white md:bottom-8 md:left-8 md:right-8">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 shrink-0" style={{ backgroundColor: brand.bronzeLight }} />
                <span
                  className="text-[10px] font-black uppercase tracking-[0.32em]"
                  style={{ color: brand.bronzeLight }}
                >
                  {frame.typeLabel[safeLang] || frame.typeLabel.en}
                </span>
              </div>
              <p className="pl-9 text-[11px] font-medium tracking-[0.12em] text-white/60">
                {frame.detail[safeLang] || frame.detail.en}
              </p>
            </div>
            <span
              className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md transition-transform duration-200"
              style={{
                borderColor: 'rgba(255,255,255,0.22)',
                backgroundColor: 'rgba(20,17,14,0.54)',
                color: 'white',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {safeLang === 'gr' ? 'Δες την εμπειρία' : 'See the experience'}
              <ArrowRight size={11} />
            </span>
          </div>
        </Link>

        <div className="flex min-w-0 flex-col justify-between gap-12 px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="text-sm font-black uppercase tracking-[0.22em]">STAYFOLIO</div>
            <div className="max-w-full break-words text-[9px] font-black uppercase tracking-[0.16em] sm:text-right sm:text-[10px] sm:tracking-[0.22em]" style={{ color: brand.aegeanBlue }}>
              {copy.brandLine}
            </div>
          </div>

          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-8" style={{ backgroundColor: brand.aegeanBlue }} />
              <span className="min-w-0 break-words text-[9px] font-black uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.28em]" style={{ color: brand.aegeanBlue }}>
                {copy.heroEyebrow}
              </span>
            </div>
            <h1
              className="max-w-[9ch] text-[clamp(2.45rem,12vw,6.35rem)] font-light leading-[0.96] sm:max-w-none sm:text-[clamp(2.65rem,6.4vw,6.35rem)] sm:leading-[0.94]"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}
            >
              {copy.heroTitle}
            </h1>
            <div
              className="mt-5 min-h-[3.25rem] overflow-hidden text-[clamp(1.9rem,3.4vw,3.7rem)] font-light italic leading-[1.05] md:min-h-[4.6rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.aegeanBlue }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduced ? undefined : { opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="inline-block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <p className="max-w-[27ch] text-[15px] leading-8 sm:max-w-full sm:text-base md:max-w-xl md:text-lg" style={{ color: brand.taupe }}>
              {copy.heroSub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#examples"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-3 rounded-full px-5 py-4 text-center text-[11px] font-black uppercase tracking-[0.12em] sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.18em]"
                style={{ backgroundColor: brand.deepInk, color: brand.warmMarble }}
              >
                {copy.primaryCta}
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-3 rounded-full border px-5 py-4 text-center text-[11px] font-black uppercase tracking-[0.12em] sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.18em]"
                style={{ borderColor: 'rgba(26,22,18,0.18)', color: brand.deepInk }}
              >
                <Send size={15} />
                {copy.secondaryCta}
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 border-y" style={{ borderColor: 'rgba(26,22,18,0.12)' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="border-r py-5 last:border-r-0" style={{ borderColor: 'rgba(26,22,18,0.1)' }}>
                  <div
                    className="text-3xl font-light italic leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.aegeanBlue }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: brand.taupe }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
