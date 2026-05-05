import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMMERSIVE_DATA } from '../../data/immersiveContent';
import IntroGoogleFlow from '../../components/Immersive/IntroGoogleFlow';
import { ArrowRight, Moon, Sun, Waves, Shield, Coffee, Wifi, Key, Users, Maximize, BedDouble, Bath } from 'lucide-react';
import HutBooking from '../../components/Immersive/HutBooking';

const VerticalLabel = ({ children }) => (
  <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:block z-50">
    <span className="vertical-text text-[10px] tracking-[0.4em] uppercase text-foreground/30 font-bold">
      {children}
    </span>
  </div>
);

const HutStufHero = ({ title, subtitle, image, isNight, videoUrl, nightVideoUrl, nightVideoStart = 0 }) => {
  const videoRef = useRef(null);
  const activeVideoUrl = isNight ? nightVideoUrl : videoUrl;
  const shouldStartOffset = isNight && nightVideoStart > 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeVideoUrl) return;

    if (shouldStartOffset) {
      video.currentTime = nightVideoStart;
    }

    video.play().catch(() => {});
  }, [activeVideoUrl, nightVideoStart, shouldStartOffset]);

  return (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6">
    <motion.div
      key={isNight ? 'night' : 'day'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0"
    >
      {activeVideoUrl ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onLoadedMetadata={(event) => {
            if (shouldStartOffset) {
              event.currentTarget.currentTime = nightVideoStart;
            }
          }}
        >
          <source src={activeVideoUrl} type="video/mp4" />
        </video>
      ) : (
        <img src={image} className="w-full h-full object-cover" alt={title} />
      )}
      <div className="absolute inset-0 bg-black/10" />
    </motion.div>

    <div className="relative z-10 text-center text-white">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xs tracking-[0.5em] uppercase mb-8 font-bold text-white/60"
      >
        {subtitle}
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-[12vw] leading-[0.85] font-hutstuf uppercase tracking-tighter"
      >
        {title}
      </motion.h1>
    </div>
  </section>
  );
};

const InfoGrid = ({ details }) => (
  <section className="py-20 px-6 border-b border-foreground/5">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="flex flex-col items-center gap-3">
        <Users className="w-5 h-5 opacity-40" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Capacity</span>
        <span className="text-sm font-medium">{details.capacity}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Maximize className="w-5 h-5 opacity-40" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Size</span>
        <span className="text-sm font-medium">{details.size}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <BedDouble className="w-5 h-5 opacity-40" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Beds</span>
        <span className="text-sm font-medium">{details.beds}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Bath className="w-5 h-5 opacity-40" />
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Baths</span>
        <span className="text-sm font-medium">{details.baths}</span>
      </div>
    </div>
  </section>
);

const VolcanoSection = ({ title, text, image }) => (
  <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <motion.div 
      initial={{ scale: 1.2 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0"
    >
      <img src={image} className="w-full h-full object-cover" alt={title} />
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
    
    <div className="relative z-10 max-w-3xl text-center px-6 text-white">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
      >
        {title}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl opacity-80 leading-relaxed font-light"
      >
        {text}
      </motion.p>
    </div>
  </section>
);

const EditorialSection = ({ title, text, image, reverse = false }) => (
  <section className="py-32 px-6 md:px-24 lg:px-48 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    <div className={reverse ? 'lg:order-2' : ''}>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img src={image} className="w-full h-full object-cover" alt={title} />
      </motion.div>
    </div>
    <div className={reverse ? 'lg:order-1' : ''}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
          {text}
        </p>
        <button className="mt-12 group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase">
          Explore the Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </button>
      </motion.div>
    </div>
  </section>
);

export default function ImmersiveSantorini({ lang = 'en' }) {
  const [isNight, setIsNight] = useState(false);
  const data = IMMERSIVE_DATA.santorini;
  const content = data.content[lang];

  const videoUrl = data.heroVideo;

  return (
    <div className="theme-santorini bg-background text-foreground min-h-screen selection:bg-accent/30 selection:text-foreground overflow-x-hidden">
      <VerticalLabel>
        {lang === 'gr' ? 'Το Κτήμα της Σαντορίνης — Ελλάδα' : 'The Santorini Estate — Greece'}
      </VerticalLabel>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
          {/* Day/Night Toggle Bespoke */}
          <button 
            onClick={() => setIsNight(!isNight)}
            className="fixed top-24 right-10 z-[100] w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 border border-white/10"
          >
            {isNight ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <HutStufHero 
            title={content.title}
            subtitle={content.subtitle}
            image={isNight ? data.heroImageNight : data.heroImage}
            videoUrl={videoUrl}
            nightVideoUrl={data.heroNightVideo}
            nightVideoStart={4}
            isNight={isNight}
          />

          <InfoGrid details={data.details} />

          <EditorialSection 
            title={lang === 'gr' ? 'Αρχιτεκτονική Ποίηση' : 'Architectural Poetry'}
            text={content.introText}
            image="/assets/santorini_interior.png"
          />

          <VolcanoSection 
            title={content.volcanoTitle}
            text={content.volcanoText}
            image={isNight ? data.volcanoSunset : data.volcanoImage}
          />

          <div className="py-20 text-center px-6">
            <h3 className="text-[15vw] font-hutstuf uppercase leading-none opacity-[0.03] select-none pointer-events-none">
              Sanctuary
            </h3>
          </div>

          <EditorialSection 
            reverse
            title={content.rooms[0].title}
            text={content.rooms[0].description}
            image={content.rooms[0].imageUrl}
          />

          <section className="py-32 px-6 bg-foreground/5">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-20 opacity-40">Amenities & Services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {content.amenities.map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">{item.label}</span>
                    </div>
                    <p className="text-sm text-foreground/50 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-60 px-6 text-center bg-foreground text-background">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-xs tracking-[0.5em] uppercase mb-12 opacity-50">Reservations</p>
              <h2 className="text-5xl md:text-8xl font-serif mb-16 italic">
                {lang === 'gr' ? 'Ξεκινήστε το ταξίδι σας' : 'Begin your journey'}
              </h2>
              <button className="px-12 py-6 bg-accent text-foreground rounded-full text-xs font-bold tracking-[0.4em] uppercase transition-all hover:scale-110 hover:bg-white">
                Check Availability
              </button>
            </motion.div>
          </section>

          <HutBooking price="€1,250" lang={lang} />
        </motion.div>
    </div>
  );
}
