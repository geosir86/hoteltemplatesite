import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function HutStufToggle({ isNight, setIsNight }) {
  return (
    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl">
      <button
        onClick={() => setIsNight(false)}
        className={`relative p-2 rounded-full transition-all duration-500 ${!isNight ? 'text-black' : 'text-white/40'}`}
      >
        {!isNight && (
          <motion.div
            layoutId="toggle-pill"
            className="absolute inset-0 bg-white rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Sun size={14} className="relative z-10" />
      </button>
      
      <button
        onClick={() => setIsNight(true)}
        className={`relative p-2 rounded-full transition-all duration-500 ${isNight ? 'text-black' : 'text-white/40'}`}
      >
        {isNight && (
          <motion.div
            layoutId="toggle-pill"
            className="absolute inset-0 bg-white rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Moon size={14} className="relative z-10" />
      </button>
    </div>
  );
}
