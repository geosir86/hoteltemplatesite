import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SmoothScroll from '../../components/SmoothScroll';
import HeroCinematic from '../../components/Immersive/HeroCinematic';
import ScrollSequence from '../../components/Immersive/ScrollSequence';
import RoomShowcaseParallax from '../../components/Immersive/RoomShowcaseParallax';
import Amenities from '../../components/Immersive/Amenities';
import EnhancedCTA from '../../components/Immersive/EnhancedCTA';
import MagneticCursor from '../../components/Immersive/MagneticCursor';

const MARQUEE_WORDS = ['ATHENS', 'CYCLADES', 'IONIAN', 'CRETE', 'ΝΗΣΙ', 'GREECE', 'LUXURY STAYS', 'EXPERIENCES'];

function MarqueeStrip({ theme = {} }) {
  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  return (
    <div 
      className="overflow-hidden py-5 border-y border-white/[0.07]"
      style={{ backgroundColor: theme.secondary || 'transparent' }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {words.map((w, i) => (
          <span 
            key={i} 
            className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/25 flex items-center gap-8"
            style={bodyStyle}
          >
            {w}
            <span className="text-white/10 text-base ml-[-16px]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function IntroSection({ introText, theme = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.3'] });
  const y = useTransform(scrollYProgress, [0, 1], ['50px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};

  return (
    <section 
      ref={ref} 
      className="relative py-24 md:py-40 px-6 md:px-20 overflow-hidden"
      style={{ backgroundColor: theme.secondary || '#000000' }}
    >
      <div 
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-[8rem] md:text-[20rem] font-bold text-white/[0.015] leading-none select-none pointer-events-none"
        style={headingStyle}
      >
        01
      </div>
      <div className="max-w-4xl md:max-w-5xl mx-auto">
        <motion.div style={{ y, opacity }}>
          <p 
            className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-6 md:mb-8"
            style={bodyStyle}
          >
            — The Experience
          </p>
          <h2 
            className="text-2xl md:text-5xl lg:text-[3.5rem] leading-[1.35] text-white/90"
            style={headingStyle}
          >
            {introText}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

export default function ImmersiveLayout({
  title, subtitle, heroImage, introText,
  sequenceImages, rooms, amenities, lang, theme = {}
}) {
  return (
    <SmoothScroll>
      {/* Only show custom cursor on desktop */}
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      <div 
        className="min-h-screen text-white font-inter selection:bg-white selection:text-black md:cursor-none"
        style={{ backgroundColor: theme.secondary || '#000000' }}
      >

        <HeroCinematic title={title} subtitle={subtitle} imageUrl={heroImage} theme={theme} />

        <MarqueeStrip theme={theme} />

        <IntroSection introText={introText} theme={theme} />

        <div className="h-px bg-white/[0.07] mx-6 md:mx-20" />

        {sequenceImages && sequenceImages.length >= 2 && (
          <ScrollSequence
            image1={sequenceImages[0]}
            image2={sequenceImages[1]}
            image3={sequenceImages[2] || rooms?.[0]?.imageUrl}
            theme={theme}
          />
        )}

        {rooms && rooms.map((room, index) => (
          <RoomShowcaseParallax
            key={index}
            title={room.title}
            description={room.description}
            imageUrl={room.imageUrl}
            reverse={index % 2 !== 0}
            index={index}
            theme={theme}
          />
        ))}

        <Amenities amenities={amenities} theme={theme} />

        <EnhancedCTA lang={lang} theme={theme} />
      </div>
    </SmoothScroll>
  );
}


