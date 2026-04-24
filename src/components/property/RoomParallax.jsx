import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionReveal from '../shared/SectionReveal';

function RoomItem({ room, index, theme }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const reduced = useReducedMotion();
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const isEven = index % 2 === 0;

  return (
    <SectionReveal delay={0.1}>
      <div
        ref={ref}
        className={`max-w-[1280px] mx-auto px-4 md:px-8 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-16 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
      >
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
          <motion.div
            className="w-full h-[120%] -mt-[10%]"
            style={{ y: reduced ? 0 : imgY }}
          >
            <img
              src={room.imageUrl} alt={room.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute top-4 left-4">
            <span
              className="text-xs tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ backgroundColor: `${theme.accent}22`, color: theme.accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="w-10 h-px" style={{ backgroundColor: theme.accent }} />
          <h3
            className="text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {room.title}
          </h3>
          <p className="text-base leading-relaxed" style={{ color: theme.muted }}>
            {room.description}
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function RoomParallax({ rooms, theme, sectionTitle = 'The Rooms' }) {
  return (
    <section style={{ backgroundColor: theme.bg }}>
      <SectionReveal>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16 md:pt-24">
          <div className="flex items-center gap-6">
            <div className="w-12 h-px" style={{ backgroundColor: theme.accent }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: theme.accent }}>
              {sectionTitle}
            </span>
          </div>
        </div>
      </SectionReveal>
      {rooms.map((room, i) => (
        <RoomItem key={room.title} room={room} index={i} theme={theme} />
      ))}
    </section>
  );
}
