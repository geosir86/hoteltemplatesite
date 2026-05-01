import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

const HERO_VARIANTS = {
  athens: {
    imageClass: 'bg-center',
    overlay: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.12) 100%)',
    contentClass: 'left-6 right-6 bottom-24 items-start text-left md:left-12 lg:left-20 md:right-auto md:max-w-3xl',
    titleClass: 'text-5xl md:text-7xl lg:text-[7.5rem]',
    subtitleClass: 'border-l pl-5',
    label: 'Skyline Residence',
  },
  cyclades: {
    imageClass: 'bg-center',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,29,54,0.12) 38%, rgba(0,0,0,0.65) 100%)',
    contentClass: 'left-6 right-6 bottom-24 items-start text-left md:left-12 lg:left-20 md:max-w-3xl',
    titleClass: 'text-5xl md:text-7xl lg:text-[8rem]',
    subtitleClass: '',
    label: 'Aegean Minimalism',
  },
  ionian: {
    imageClass: 'bg-center',
    overlay: 'linear-gradient(90deg, rgba(7,22,11,0.9) 0%, rgba(7,22,11,0.58) 38%, rgba(7,22,11,0.18) 72%, rgba(7,22,11,0.62) 100%)',
    contentClass: 'left-6 right-6 bottom-28 items-start text-left md:left-12 lg:left-24 md:max-w-3xl',
    titleClass: 'text-5xl md:text-7xl lg:text-[7.8rem]',
    subtitleClass: '',
    label: 'Emerald Shore Retreat',
  },
  nisi: {
    imageClass: 'bg-center',
    overlay: 'radial-gradient(circle at 48% 44%, rgba(28,21,35,0.08) 0%, rgba(28,21,35,0.56) 54%, rgba(8,5,12,0.88) 100%)',
    contentClass: 'left-6 right-6 top-[28%] items-center text-center md:left-20 md:right-20 lg:left-48 lg:right-48',
    titleClass: 'text-6xl md:text-8xl lg:text-[9rem]',
    subtitleClass: '',
    label: 'Private Island Room',
  },
  crete: {
    imageClass: 'bg-center',
    overlay: 'linear-gradient(180deg, rgba(26,15,8,0.2) 0%, rgba(26,15,8,0.8) 100%)',
    contentClass: 'left-6 right-6 bottom-24 items-start text-left md:left-12 lg:left-20 md:max-w-3xl',
    titleClass: 'text-5xl md:text-7xl lg:text-[8rem]',
    subtitleClass: 'border-l-2 pl-6 border-[#D4892A]',
    label: 'Heritage Estate',
  },
  default: {
    imageClass: 'bg-center',
    overlay: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)',
    contentClass: 'left-6 right-6 top-1/2 -translate-y-1/2 items-center text-center',
    titleClass: 'text-5xl md:text-7xl lg:text-[8rem]',
    subtitleClass: '',
    label: 'Stayfolio',
  },
};

function WordReveal({ text, className, style }) {
  const reduced = useReducedMotion();
  if (reduced) return <h1 className={className} style={style}>{text}</h1>;
  return (
    <motion.h1
      className={className} style={style}
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 1.1, ease: EASE } } }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

function HeroAccent({ variant, theme, gallery = [], title, labels = {} }) {
  const secondary = gallery[1] || gallery[0];

  if (variant === 'athens') {
    return (
      <>
        <div className="absolute left-8 top-28 bottom-16 z-[2] hidden w-px bg-white/20 lg:block" />
        <div className="absolute bottom-12 right-10 z-[2] hidden text-right lg:block">
          <span className="block text-[11px] font-bold uppercase text-white/45">{labels.accent || 'Acropolis view'}</span>
          <span className="mt-2 block text-6xl font-light text-white/15" style={{ fontFamily: theme.fontHeading }}>{labels.sqm || '280'}</span>
        </div>
      </>
    );
  }

  if (variant === 'cyclades') {
    return (
      <>
        <div className="absolute inset-x-6 top-28 bottom-14 z-[2] hidden border border-white/55 md:block" />
        {secondary && (
          <motion.img
            src={secondary}
            alt=""
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: EASE }}
            className="absolute right-8 top-28 z-[3] hidden h-[46vh] w-[22vw] max-w-[320px] object-cover shadow-2xl lg:block"
          />
        )}
      </>
    );
  }

  if (variant === 'ionian') {
    return (
      <>
        <div className="absolute right-8 top-24 z-[2] hidden h-[68vh] items-center lg:flex">
          <span className="vertical-text text-[6.5rem] font-light leading-none text-white/10" style={{ fontFamily: theme.fontHeading }}>
            IONIAN
          </span>
        </div>
        <div className="absolute bottom-10 right-8 z-[3] hidden w-[360px] border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl lg:block">
          <div className="mb-4 flex items-center justify-between border-b border-white/15 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">{labels.noteTitle || 'Retreat Notes'}</span>
            <span className="text-sm" style={{ color: theme.accent }}>{labels.rating || '04.99'}</span>
          </div>
          {(labels.notes || ['Olive shade at noon', 'Stone terrace dinners', 'Private emerald cove']).map((item) => (
            <div key={item} className="flex items-center justify-between py-2 text-xs uppercase tracking-[0.18em] text-white/70">
              <span>{item}</span>
              <span className="h-px w-8 bg-white/25" />
            </div>
          ))}
        </div>
        <div className="absolute left-8 top-28 z-[2] hidden h-[45vh] w-px bg-gradient-to-b from-transparent via-white/35 to-transparent lg:block" />
      </>
    );
  }

  if (variant === 'crete') {
    return (
      <>
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-[2] hidden h-[60vh] w-px bg-white/10 lg:block" />
        <div className="absolute bottom-12 right-12 z-[2] hidden text-right lg:block">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{labels.accent || 'Cretan Heritage'}</span>
          <div className="mt-4 h-px w-24 bg-[#D4892A] ml-auto" />
        </div>
      </>
    );
  }

  return (
    <div className="absolute bottom-10 left-8 z-[2] hidden text-white/30 md:block">
      <span className="text-xs uppercase">{title}</span>
    </div>
  );
}

export default function HeroCinematic({ title, subtitle, location, imageUrl, videoUrl, theme, variant = 'default', gallery = [], labels = {} }) {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const reduced = useReducedMotion();
  const config = HERO_VARIANTS[variant] || HERO_VARIANTS.default;

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, variant === 'nisi' ? 1.18 : 1.28]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.08, 0.32]);

  return (
    <section ref={ref} className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduced ? 1 : imgScale }}
      >
        {videoUrl ? (
          <motion.video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            initial={reduced ? {} : { scale: 1.08 }}
            animate={reduced ? {} : { scale: 1 }}
            transition={{ duration: 2.8, ease: EASE }}
          />
        ) : (
          <motion.div
            className={`h-full w-full bg-cover ${config.imageClass}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
            initial={reduced ? {} : { scale: 1.08 }}
            animate={reduced ? {} : { scale: 1 }}
            transition={{ duration: 2.8, ease: EASE }}
          />
        )}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: reduced ? 0.28 : overlayOpacity }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: config.overlay }}
      />

      <HeroAccent variant={variant} theme={theme} gallery={gallery} title={title} labels={labels} />

      <motion.div
        className={`absolute z-10 flex flex-col gap-5 px-0 ${config.contentClass}`}
        style={{ y: reduced ? 0 : textY }}
      >
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 18 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.5, ease: EASE }}
          className="text-xs font-bold uppercase md:text-sm"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {config.label} / {location}
        </motion.div>

        <WordReveal
          text={title}
          className={`${config.titleClass} font-light leading-[0.92] tracking-normal text-white`}
          style={{ fontFamily: theme.fontHeading }}
        />

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: EASE }}
          className={`max-w-xl text-sm uppercase leading-relaxed md:text-base ${config.subtitleClass}`}
          style={{ color: theme.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {subtitle}
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        animate={reduced ? {} : { opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        <span className="text-[10px] uppercase">Scroll</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
        />
      </motion.div>
    </section>
  );
}
