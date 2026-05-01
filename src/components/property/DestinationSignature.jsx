import { motion } from 'framer-motion';
import SectionReveal from '../shared/SectionReveal';

const variantCopy = {
  athens: {
    eyebrow: 'Urban Residence',
    title: 'A composed city stay with the Acropolis always in frame.',
    stats: ['Private rooftop', 'Museum walk', 'Evening skyline'],
  },
  cyclades: {
    eyebrow: 'Island Geometry',
    title: 'White volumes, blue horizon, and outdoor living arranged around light.',
    stats: ['Caldera pool', 'Sea-facing suites', 'Wind-sheltered dining'],
  },
  ionian: {
    eyebrow: 'Green Retreat',
    title: 'A slower house shaped by olive shade, stone paths, and emerald water.',
    stats: ['Olive grove', 'Private cove', 'Stone terrace'],
  },
  nisi: {
    eyebrow: 'Boutique Hideaway',
    title: 'One room treated like a small private world, built for quiet mornings.',
    stats: ['Plunge pool', 'Breakfast ritual', 'Full privacy'],
  },
};

function FramedImage({ src, alt, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`overflow-hidden ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </motion.div>
  );
}

export default function DestinationSignature({ variant, destination, content, theme }) {
  const copy = variantCopy[variant] || variantCopy.athens;
  const photos = destination.gallery;

  if (variant === 'cyclades') {
    return (
      <SectionReveal>
        <section className="px-4 md:px-8 py-16 md:py-24" style={{ backgroundColor: theme.bg }}>
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                {copy.eyebrow}
              </p>
              <h2 className="text-4xl font-light leading-tight md:text-6xl" style={{ color: theme.fg, fontFamily: theme.fontHeading }}>
                {copy.title}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <FramedImage src={photos[1]} alt="" className="col-span-2 aspect-[5/4] rounded-sm" />
              <FramedImage src={photos[2]} alt="" className="aspect-[3/4] rounded-sm" delay={0.08} />
              {copy.stats.map((item) => (
                <div key={item} className="border px-4 py-5 text-xs font-bold uppercase tracking-[0.18em]" style={{ borderColor: theme.border, color: theme.fg }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>
    );
  }

  if (variant === 'ionian') {
    return (
      <SectionReveal>
        <section className="px-4 md:px-8 py-16 md:py-24" style={{ backgroundColor: theme.fg, color: theme.bg }}>
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <FramedImage src={photos[3] || photos[1]} alt="" className="aspect-[16/10] rounded-none" />
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                {copy.eyebrow}
              </p>
              <h2 className="text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: theme.fontHeading }}>
                {copy.title}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed opacity-70">{content.description}</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {copy.stats.map((item) => (
                  <span key={item} className="border-t pt-3 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: `${theme.bg}33` }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    );
  }

  if (variant === 'nisi') {
    return (
      <SectionReveal>
        <section className="px-4 md:px-8 py-16 md:py-24" style={{ backgroundColor: theme.bg }}>
          <div className="mx-auto grid max-w-[1080px] gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="space-y-4">
              <FramedImage src={photos[3]} alt="" className="aspect-[4/5] rounded-[2rem]" />
            </div>
            <div className="md:-ml-16">
              <div className="rounded-[2rem] border p-8 md:p-12 backdrop-blur" style={{ borderColor: theme.border, backgroundColor: `${theme.fg}08` }}>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
                  {copy.eyebrow}
                </p>
                <h2 className="text-4xl font-light leading-tight md:text-6xl" style={{ color: theme.fg, fontFamily: theme.fontHeading }}>
                  {copy.title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: theme.muted }}>{content.description}</p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>
    );
  }

  return (
    <SectionReveal>
      <section className="px-4 md:px-8 py-16 md:py-24" style={{ backgroundColor: theme.bg }}>
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
              {copy.eyebrow}
            </p>
            <h2 className="text-4xl font-light leading-tight md:text-6xl" style={{ color: theme.fg, fontFamily: theme.fontHeading }}>
              {copy.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: theme.muted }}>{content.description}</p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {copy.stats.map((item) => (
                <span key={item} className="border-l pl-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: theme.accent, color: theme.fg }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FramedImage src={photos[1]} alt="" className="aspect-[3/4] rounded-xl" />
            <FramedImage src={photos[3]} alt="" className="mt-12 aspect-[3/4] rounded-xl" delay={0.08} />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
