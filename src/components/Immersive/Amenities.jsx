import { motion } from 'framer-motion';
import { Wifi, Coffee, Wind, Tv, Shield, Key, Car, Bath, Waves, Utensils, Leaf, Star, Mountain, Flame } from 'lucide-react';

const iconMap = {
  wifi: Wifi,
  coffee: Coffee,
  ac: Wind,
  tv: Tv,
  shield: Shield,
  key: Key,
  parking: Car,
  car: Car,
  bath: Bath,
  pool: Waves,
  kitchen: Utensils,
  garden: Leaf,
  premium: Star,
  mountain: Mountain,
  fireplace: Flame
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function Amenities({ amenities, theme = {} }) {
  if (!amenities || amenities.length === 0) return null;

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const accentColor = theme.primary || '#ffffff';

  return (
    <section 
      className="py-32 px-6 md:px-20 relative overflow-hidden"
      style={{ backgroundColor: theme.secondary || '#000000' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none" 
        style={{ backgroundColor: `${accentColor}05` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4" style={bodyStyle}>— Every Detail</p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter" style={headingStyle}>
              Uncompromised Luxury
            </h2>
          </div>
          <p className="text-white/50 text-sm md:text-base max-w-sm leading-relaxed" style={bodyStyle}>
            Thoughtfully curated amenities that transform your stay from exceptional to unforgettable.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {amenities.map((item, index) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                data-magnetic
                className="group flex flex-col items-start p-6 md:p-8 border border-white/[0.07] bg-white/[0.02] rounded-2xl hover:bg-white/[0.05] transition-all duration-500 cursor-none"
                style={{ borderColor: `${accentColor}11` }}
              >
                <div 
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-500"
                  style={{ borderColor: `${accentColor}33` }}
                >
                  <Icon size={20} className="text-white/60 group-hover:text-black transition-colors duration-500" />
                </div>
                <h3 className="text-base md:text-lg text-white/80 group-hover:text-white transition-colors duration-300" style={headingStyle}>
                  {item.label}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


