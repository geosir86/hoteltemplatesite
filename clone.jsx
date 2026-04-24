import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Phone, 
  Menu, 
  Star, 
  MapPin, 
  Plus, 
  Minus,
  ArrowUpRight,
  Wifi,
  Wind,
  Coffee,
  Tv,
  Car,
  Waves,
  Heart,
  Home,
  ShieldCheck,
  UserCheck,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

// --- Configuration ---
const EASE = [0.23, 1, 0.32, 1];

// --- Data ---
const AMENITY_TAGS = [
  "ΕΞΑΙΡΕΤΙΚΟ CHECK-IN", "ΥΠΕΡΟΧΗ ΔΙΑΚΟΣΜΗΣΗ", "SUPERHOST", "ΚΑΘΑΡΙΟΤΗΤΑ & ΤΑΞΗ", 
  "ΤΕΛΕΙΑ ΤΟΠΟΘΕΣΙΑ", "ΓΡΗΓΟΡΟ WIFI", "ΜΟΝΤΕΡΝΑ ΚΟΥΖΙΝΑ", "ΗΣΥΧΗ ΓΕΙΤΟΝΙΑ",
  "ΠΟΛΥΤΕΛΗΣ ΔΙΑΜΟΝΗ", "ΘΕΑ ΣΤΗΝ ΑΚΡΟΠΟΛΗ", "HIGH-END ΣΧΕΔΙΑΣΜΟΣ", "ΕΥΡΥΧΩΡΟ LAYOUT"
];

const AMENITIES = [
  { icon: <Wifi size={22} />, label: "WIFI ΥΨΗΛΗΣ ΤΑΧΥΤΗΤΑΣ", desc: "Αποκλειστική οπτική ίνα 1Gbps." },
  { icon: <Wind size={22} />, label: "ΕΛΕΓΧΟΣ ΚΛΙΜΑΤΟΣ", desc: "Έξυπνοι θερμοστάτες Nest." },
  { icon: <Coffee size={22} />, label: "GOURMET ΚΑΦΕΣ", desc: "Premium επιλογή Nespresso." },
  { icon: <Tv size={22} />, label: "ΨΥΧΑΓΩΓΙΑ", desc: "85\" 8K OLED Smart TV." },
  { icon: <Car size={22} />, label: "ΙΔΙΩΤΙΚΟ PARKING", desc: "Ασφαλές γκαράζ με valet." },
  { icon: <Waves size={22} />, label: "ΙΔΙΩΤΙΚΟ SPA", desc: "Marble bath & steam shower." },
];

const PHOTOS = [
  { img: "/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png", label: "ΘΕΑ ΑΚΡΟΠΟΛΗΣ", id: "01", size: "large" },
  { img: "/assets/greek_luxury_interior_master_bedroom_1776942408192.png", label: "ΚΥΡΙΑ ΚΡΕΒΑΤΟΚΑΜΑΡΑ", id: "02", size: "small" },
  { img: "/assets/greek_luxury_living_room_dining_1776942426126.png", label: "ΣΑΛΟΝΙ & ΤΡΑΠΕΖΑΡΙΑ", id: "03", size: "small" },
  { img: "/assets/greek_luxury_terrace_sunset_view_1776942676038.png", label: "ΗΛΙΟΒΑΣΙΛΕΜΑ ΣΤΗ ΒΕΡΑΝΤΑ", id: "04", size: "large" },
  { img: "/assets/greek_luxury_marble_bathroom_1776942694181.png", label: "ΙΔΙΩΤΙΚΟ SPA", id: "05", size: "small" },
  { img: "/assets/greek_luxury_kitchen_detail_1776942713984.png", label: "GOURMET ΚΟΥΖΙΝΑ", id: "06", size: "small" },
  { img: "/assets/greek_luxury_decor_olive_tree_1776942733057.png", label: "ΛΕΠΤΟΜΕΡΕΙΕΣ ΔΙΑΚΟΣΜΗΣΗΣ", id: "07", size: "large" },
];

const FAQS = [
  { q: "Ποια είναι η ώρα check-in;", a: "Το check-in είναι από τις 3:00 μ.μ. και το check-out έως τις 11:00 π.μ." },
  { q: "Υπάρχει διαθέσιμο πάρκινγκ;", a: "Ναι, παρέχουμε μία δωρεάν αποκλειστική θέση στάθμευσης." },
  { q: "Επιτρέπονται τα κατοικίδια;", a: "Δυστυχώς, δεν επιτρέπουμε κατοικίδια για τη διατήρηση υποαλλεργικού περιβάλλοντος." },
  { q: "Πόσο κοντά είναι το κέντρο;", a: "Μόλις 5 λεπτά με τα πόδια από την Πλάκα." },
];

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);
    document.querySelectorAll('button, a, .group').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-foreground mix-blend-difference rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{
        x: mousePos.x - 8,
        y: mousePos.y - 8,
        scale: isHovering ? 4 : 1,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
    />
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-8 flex justify-between items-center pointer-events-none">
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE }}
      className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.05)] flex items-center gap-3 pointer-events-auto border border-white/50"
    >
      <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
        <Home className="text-white" size={18} />
      </div>
      <span className="font-bold tracking-tighter text-xl uppercase">STAYSCAPE GR</span>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      className="flex gap-3 pointer-events-auto"
    >
      <button className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-sm flex items-center justify-center border border-white/50 hover:bg-white transition-all hover:scale-105 active:scale-95">
        <Phone size={22} />
      </button>
      <button className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-sm flex items-center justify-center border border-white/50 hover:bg-white transition-all hover:scale-105 active:scale-95">
        <Menu size={22} />
      </button>
    </motion.div>
  </nav>
);

const SectionReveal = ({ children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: EASE, delay }}
  >
    {children}
  </motion.section>
);

const TagMarquee = () => (
  <div className="overflow-hidden py-16 border-y border-gray-200/60 bg-white/30 backdrop-blur-sm">
    <div className="marquee gap-12">
      {[...AMENITY_TAGS, ...AMENITY_TAGS].map((tag, i) => (
        <span key={i} className="flex items-center gap-3 text-2xl font-semibold tracking-tight whitespace-nowrap text-foreground/80 uppercase">
          <div className="w-2 h-2 bg-foreground rounded-full" />
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const AmenityCard = ({ item }) => {
  return (
    <motion.div 
      className="bg-white/5 p-8 rounded-[32px] flex flex-col gap-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group cursor-default"
    >
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
        {item.icon}
      </div>
      <div>
        <span className="text-xl font-bold tracking-tight uppercase block mb-2">{item.label}</span>
        <p className="text-white/50 text-base font-medium leading-snug">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8"
  >
    <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
      <X size={48} />
    </button>
    <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img 
          key={currentIndex}
          src={images[currentIndex].img} 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-y-0 left-0 flex items-center px-6">
        <button onClick={onPrev} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all flex items-center justify-center">
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-6">
        <button onClick={onNext} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all flex items-center justify-center">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0 py-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-2xl font-bold tracking-tight group-hover:text-muted transition-colors">{faq.q}</span>
        <div className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-foreground text-white border-foreground' : 'bg-transparent text-foreground'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-muted text-xl leading-relaxed max-w-2xl font-medium">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-foreground selection:text-white font-sans antialiased overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <AnimatePresence>
        {lightbox.isOpen && (
          <Lightbox 
            images={PHOTOS} 
            currentIndex={lightbox.index} 
            onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            onPrev={() => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + PHOTOS.length) % PHOTOS.length }))}
            onNext={() => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % PHOTOS.length }))}
          />
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="pt-40 px-8 pb-24 max-w-[1200px] mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 mb-10"
        >
          <MapPin size={18} className="text-muted" />
          <span className="text-base font-bold text-muted uppercase tracking-wider">ΠΛΑΚΑ, ΑΘΗΝΑ</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="text-6xl md:text-[84px] font-bold tracking-tighter mb-12 leading-[1.05] text-foreground uppercase"
        >
          ΠΟΛΥΤΕΛΗΣ ΔΙΑΜΟΝΗ <br /> ΣΤΗΝ ΚΑΡΔΙΑ ΤΗΣ ΑΘΗΝΑΣ
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-gray-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+40}`} alt="Guest" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-lg text-muted font-bold tracking-tight">Αγαπημένο από 200+ επισκέπτες</span>
          </div>

          <button className="bg-foreground text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-foreground/20 uppercase tracking-tight">
            Κάντε Κράτηση
          </button>
        </motion.div>
      </section>

      {/* Main Hero Image */}
      <SectionReveal>
        <div className="px-8 max-w-[1200px] mx-auto">
          <motion.div 
            style={{ scale: heroScale }}
            className="relative h-[680px] rounded-[48px] overflow-hidden group shadow-2xl"
          >
            <img 
              src="/assets/greek_luxury_penthouse_acropolis_view_1776942386364.png" 
              alt="Interior" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl flex items-center gap-4 border border-white/50 z-10">
              <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
                <Star size={24} fill="currentColor" className="text-foreground" />
              </div>
              <div>
                <div className="font-bold text-lg uppercase tracking-tight">GUEST FAVORITE</div>
                <div className="text-base text-muted font-bold uppercase">ΝΟ.1 ΣΤΗΝ ΑΘΗΝΑ</div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionReveal>

      {/* Stats Section */}
      <SectionReveal>
        <div className="max-w-[1200px] mx-auto px-8 py-40 grid md:grid-cols-3 gap-16">
          <div className="group">
            <div className="text-7xl font-bold mb-4 tracking-tighter leading-none group-hover:text-muted transition-colors">67+</div>
            <div className="text-xl text-muted font-bold leading-tight tracking-tight uppercase">ΕΥΧΑΡΙΣΤΗΜΕΝΟΙ ΕΠΙΣΚΕΠΤΕΣ</div>
          </div>
          <div className="group">
            <div className="text-7xl font-bold mb-4 tracking-tighter leading-none group-hover:text-muted transition-colors">95%</div>
            <div className="text-xl text-muted font-bold leading-tight tracking-tight uppercase">ΠΟΣΟΣΤΟ ΙΚΑΝΟΠΟΙΗΣΗΣ</div>
          </div>
          <div className="group">
            <div className="text-7xl font-bold mb-4 tracking-tighter leading-none group-hover:text-muted transition-colors">24/7</div>
            <div className="text-xl text-muted font-bold leading-tight tracking-tight uppercase">ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΥΠΟΣΤΗΡΙΞΗ</div>
          </div>
        </div>
      </SectionReveal>

      <TagMarquee />

      {/* About Section */}
      <SectionReveal>
        <div className="max-w-[1200px] mx-auto px-8 py-40 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-6xl font-bold tracking-tighter leading-[1.1] uppercase">Η ΔΙΑΜΟΝΗ ΣΑΣ ΩΣ <span className="text-muted">ΕΜΠΕΙΡΙΑ</span></h2>
            <p className="text-2xl text-muted leading-relaxed font-bold tracking-tight">
              Προσφέρουμε κάτι περισσότερο από ένα μέρος για ύπνο. Παρέχουμε μια ολοκληρωμένη αισθητική εμπειρία σχεδιασμένη για όσους απαιτούν το άριστο.
            </p>
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all duration-500">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm">
                <img src="https://i.pravatar.cc/100?img=12" alt="Host" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-2xl tracking-tighter uppercase">ΑΛΕΞΑΝΔΡΟΣ ΜΕΛΑΣ</div>
                <div className="text-lg text-muted font-bold tracking-tight uppercase">EXPERIENCE HOST</div>
              </div>
              <button className="ml-auto w-16 h-16 bg-background rounded-full flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-300">
                <Phone size={24} />
              </button>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-6">
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden mt-12 shadow-xl border-4 border-white">
              <img src="/assets/greek_luxury_interior_master_bedroom_1776942408192.png" className="w-full h-full object-cover" alt="Detail 1" />
            </div>
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-xl border-4 border-white">
              <img src="/assets/greek_luxury_living_room_dining_1776942426126.png" className="w-full h-full object-cover" alt="Detail 2" />
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Enhanced Photo Journal Section */}
      <SectionReveal>
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-6xl font-bold tracking-tighter uppercase">Photo Journal</h2>
            <p className="text-xl text-muted font-bold tracking-tight hidden md:block">Μια ματιά στην πολυτέλεια που σας περιμένει.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PHOTOS.map((item, i) => (
              <motion.div 
                key={i} 
                className={`group cursor-pointer relative rounded-[32px] overflow-hidden shadow-lg ${item.size === 'large' ? 'md:col-span-2 h-[600px]' : 'h-[400px]'}`}
                onClick={() => setLightbox({ isOpen: true, index: i })}
                whileHover={{ y: -10 }}
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-1">{item.id}</div>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">{item.label}</h3>
                </div>
                <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageIcon size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Amenities Grid - Dark Section */}
      <SectionReveal>
        <div className="px-8 max-w-[1200px] mx-auto mb-40">
          <div className="bg-dark rounded-[64px] p-16 md:p-24 text-white relative overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-24 relative z-10">
              <div>
                <div className="flex items-center gap-8 mb-16">
                  <div className="text-8xl font-bold tracking-tighter leading-none text-white">4.98</div>
                  <div>
                    <div className="flex gap-1.5 text-yellow-400 mb-2">
                      {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
                    </div>
                    <div className="text-xl font-bold text-white/40 tracking-tight uppercase">ΜΕΣΟΣ ΟΡΟΣ ΒΑΘΜΟΛΟΓΙΑΣ</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                  {[
                    { l: "ΚΑΘΑΡΙΟΤΗΤΑ", v: 4.9 },
                    { l: "ΑΚΡΙΒΕΙΑ", v: 5.0 },
                    { l: "ΕΠΙΚΟΙΝΩΝΙΑ", v: 4.9 },
                    { l: "ΤΟΠΟΘΕΣΙΑ", v: 5.0 },
                    { l: "CHECK-IN", v: 5.0 },
                    { l: "ΑΞΙΑ", v: 4.8 },
                  ].map(item => (
                    <div key={item.l}>
                      <div className="flex justify-between text-lg font-bold mb-4 text-white/80 tracking-tight uppercase">
                        <span>{item.l}</span>
                        <span>{item.v}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.v / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: EASE }}
                          className="h-full bg-white rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-10 lg:pt-0">
                {AMENITIES.map((item, i) => (
                  <AmenityCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* FAQ Section */}
      <SectionReveal>
        <div className="max-w-[800px] mx-auto px-8 py-40">
          <h2 className="text-5xl font-bold tracking-tighter mb-16 text-center uppercase">ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ</h2>
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-50">
            {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </div>
      </SectionReveal>

      {/* Footer CTA */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-64px)] max-w-3xl z-50">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="bg-foreground text-white p-6 rounded-[32px] shadow-2xl flex items-center justify-between border border-white/10"
        >
          <div className="pl-6">
            <div className="text-sm text-white/40 font-bold tracking-[0.2em] uppercase mb-1">ΑΠΟ ΜΟΝΟ</div>
            <div className="text-4xl font-bold tracking-tighter flex items-baseline gap-2">
              290€ <span className="text-lg font-medium text-white/20 tracking-tight lowercase">ανά νύχτα</span>
            </div>
          </div>
          <button className="bg-white text-foreground px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all flex items-center gap-3 shadow-xl uppercase tracking-tight">
            ΚΡΑΤΗΣΗ
            <ArrowUpRight size={24} />
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
