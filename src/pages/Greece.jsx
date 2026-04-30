import React from 'react';
import { motion } from 'framer-motion';
import DemoSwitcher from '../components/DemoSwitcher';

export default function Greece({ lang }) {
  const content = {
    en: {
      title: 'The Pindus Retreat',
      subtitle: 'Luxury Timber Cabins',
      description: 'A sanctuary of glass and timber designed to disappear into the ancient forest.'
    },
    gr: {
      title: 'Καταφύγιο Πίνδου',
      subtitle: 'Πολυτελείς Ξύλινες Κατοικίες',
      description: 'Ένα καταφύγιο από γυαλί και ξύλο, σχεδιασμένο να χάνεται μέσα στο αρχαίο δάσος.'
    }
  }[lang];

  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="/assets/greece_hutstuf_hero_day.png" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.4em] uppercase mb-4 text-white/60"
          >
            {content.subtitle}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            {content.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl text-lg text-white/80 font-light leading-relaxed"
          >
            {content.description}
          </motion.p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-4xl font-serif mb-4">The Spaces</h2>
          <p className="text-white/40 max-w-md">Discover the meticulously designed interiors of the Pindus Retreat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Timber Sanctuary', img: '/assets/greece_hutstuf_bedroom_cozy_1777537491728.png' },
            { title: 'The Forest Bath', img: '/assets/greece_hutstuf_bathroom_1777537456078.png' },
            { title: 'Organic Kitchen', img: '/assets/greece_hutstuf_kitchen_1777537473337.png' },
            { title: 'The Twilight Deck', img: '/assets/greece_hutstuf_hero_night.png' },
          ].map((room, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <img src={room.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <h3 className="text-lg font-serif">{room.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
