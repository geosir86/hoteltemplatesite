import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { IMMERSIVE_DATA } from '../../data/immersiveContent';
import { 
  ArrowRight, MapPin, Wind, Leaf, Waves, Shield, 
  Calendar, Users, ChevronRight, Menu, X, Globe 
} from 'lucide-react';
import HeritageBooking from '../../components/Immersive/HeritageBooking';

export default function ImmersiveCrete({ lang: initialLang = 'en' }) {
  const [lang, setLang] = useState(initialLang);
  const data = IMMERSIVE_DATA.crete;
  const content = data.content[lang];
  const [activeRoom, setActiveRoom] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const iconMap = {
    leaf: <Leaf size={24} />,
    waves: <Waves size={24} />,
    wind: <Wind size={24} />,
    shield: <Shield size={24} />,
  };

  // Sync lang prop
  useEffect(() => {
    setLang(initialLang);
  }, [initialLang]);

  return (
    <div className="theme-crete bg-background text-foreground min-h-screen font-sans selection:bg-foreground/10 pb-32 transition-colors duration-1000">
      {/* Custom Header for Crete */}
      <nav className="fixed top-0 left-0 w-full z-[250] flex justify-between items-center p-8 lg:p-12 mix-blend-difference text-white pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif italic tracking-tighter pointer-events-auto"
        >
          Creta Heritage
        </motion.div>
        
        <div className="flex items-center gap-12 pointer-events-auto">
          <div className="hidden md:flex gap-8 text-[10px] tracking-[0.3em] uppercase font-bold">
            <a href="#philosophy" className="hover:opacity-50 transition-opacity">Philosophy</a>
            <a href="#rooms" className="hover:opacity-50 transition-opacity">Rooms</a>
            <a href="#amenities" className="hover:opacity-50 transition-opacity">Experience</a>
          </div>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
          >
            <Globe size={14} />
            <span className="text-[10px] font-bold uppercase">{lang === 'en' ? 'GR' : 'EN'}</span>
          </button>
        </div>
      </nav>

      {/* Booking Bar */}
      <HeritageBooking 
        lang={lang} 
        price="€1,800" 
        externalIsOpen={bookingOpen} 
        setExternalIsOpen={setBookingOpen} 
      />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-end p-12 lg:p-24 overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img 
            src={data.heroImage} 
            className="w-full h-full object-cover" 
            alt="Crete Estate" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-white max-w-5xl"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.5em] uppercase font-bold mb-8 opacity-60"
          >
            {content.subtitle}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[15vw] lg:text-[10vw] font-serif leading-[0.85] italic tracking-tighter mb-12"
          >
            {content.title}
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl font-light opacity-80 leading-relaxed"
            >
              {content.introText}
            </motion.p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-bounce">
                <ChevronRight className="rotate-90" size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy - Rustic Backdrop */}
      <section id="philosophy" className="py-64 px-12 lg:px-48 text-center relative overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center"
        >
          <Leaf size={600} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic leading-tight mb-16 text-foreground">
            {content.philosophy}
          </h2>
          <div className="w-12 h-[1px] bg-foreground/20 mx-auto mb-16" />
          <p className="text-xs tracking-[0.4em] uppercase opacity-40 font-bold">
            {lang === 'en' ? 'The Heritage Philosophy' : 'Η Φιλοσοφία της Κληρονομιάς'}
          </p>
        </motion.div>
      </section>

      {/* Rooms - Horizontal Scroll / Cinematic Cards */}
      <section id="rooms" className="py-32 bg-foreground text-background rounded-[5rem]">
        <div className="px-12 lg:px-24 mb-32 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-xs tracking-[0.5em] uppercase font-bold opacity-40 mb-6">
              {lang === 'en' ? 'Private Sanctuaries' : 'Ιδιωτικά Καταφύγια'}
            </h2>
            <p className="text-6xl md:text-8xl font-serif italic leading-none">{lang === 'en' ? 'Rest in Stone' : 'Ξεκούραση στην Πέτρα'}</p>
          </div>
          <p className="max-w-sm text-sm opacity-60 leading-relaxed font-light">
            {lang === 'en' 
              ? 'Our rooms are designed to grounding the soul, using only natural materials found on the estate.' 
              : 'Τα δωμάτιά μας είναι σχεδιασμένα για να γαληνεύουν την ψυχή, χρησιμοποιώντας μόνο φυσικά υλικά.'}
          </p>
        </div>

        <div className="px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-24">
          {content.rooms.map((room, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-none"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-12 relative">
                <img 
                  src={room.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                  alt={room.title} 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest">
                    View Room
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-serif italic mb-4">{room.title}</h3>
              <p className="text-sm opacity-50 max-w-sm font-light leading-relaxed">{room.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Amenities Grid */}
      <section id="amenities" className="py-48 px-12 lg:px-24 bg-background">
        <div className="text-center mb-32">
          <h2 className="text-xs tracking-[0.5em] uppercase font-bold opacity-40 mb-8">Included Benefits</h2>
          <p className="text-5xl font-serif italic">Curated for Wellness</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {content.amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-12 rounded-[2rem] border border-foreground/5 hover:border-foreground/20 transition-colors"
            >
              <div className="text-foreground mb-8 opacity-40">{iconMap[item.icon]}</div>
              <h4 className="text-xl font-serif mb-4 italic">{item.label}</h4>
              <p className="text-xs opacity-60 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Split Features with Parallax */}
      {content.sections.map((section, index) => (
        <section key={index} className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
          <div className={`p-12 lg:p-32 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 !== 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <h3 className="text-6xl md:text-8xl font-serif mb-12 italic leading-none">{section.title}</h3>
              <p className="text-xl opacity-70 leading-relaxed font-light mb-16">
                {section.text}
              </p>
              <button className="flex items-center gap-6 group">
                <span className="text-xs font-bold tracking-[0.4em] uppercase">The Story</span>
                <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                  <ArrowRight size={20} />
                </div>
              </button>
            </motion.div>
          </div>
          <div className={`h-[80vh] lg:h-full relative overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
            <motion.img 
              initial={{ scale: 1.3 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2 }}
              src={section.image} 
              className="w-full h-full object-cover" 
              alt={section.title} 
            />
          </div>
        </section>
      ))}

      {/* Final Aerial Section */}
      <section className="py-32 px-12 lg:px-24">
        <div className="relative rounded-[4rem] overflow-hidden group h-[80vh]">
          <img src={data.aerialImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]" alt="Aerial" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white text-center"
            >
              <h3 className="text-[12vw] font-serif italic tracking-tighter mb-4">Heritage</h3>
              <p className="text-xs tracking-[1em] uppercase opacity-60 font-bold">40,000 m² of Pure Estate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking / Footer CTA */}
      <section className="py-64 px-12 text-center bg-foreground text-background rounded-t-[6rem] -mt-24 relative z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-16 opacity-50 font-bold">Ready to experience?</p>
          <h2 className="text-6xl md:text-[10rem] font-serif mb-24 italic leading-none tracking-tighter">
            {lang === 'en' ? 'Start your stay.' : 'Ξεκινήστε τη διαμονή σας.'}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <button 
              onClick={() => setBookingOpen(true)}
              className="bg-background text-foreground px-20 py-10 rounded-full text-xs font-bold tracking-[0.5em] uppercase transition-all hover:scale-110 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {lang === 'en' ? 'Check Availability' : 'Έλεγχος Διαθεσιμότητας'}
            </button>
            <button className="border border-background/20 px-20 py-10 rounded-full text-xs font-bold tracking-[0.5em] uppercase transition-all hover:bg-white/10">
              {lang === 'en' ? 'Contact Host' : 'Επικοινωνία'}
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
