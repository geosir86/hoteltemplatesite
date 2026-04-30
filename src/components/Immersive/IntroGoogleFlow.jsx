import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroGoogleFlow({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800), // Start zoom 1
      setTimeout(() => setStep(2), 1800), // Start zoom 2
      setTimeout(() => setStep(3), 2800), // Final transition
      setTimeout(() => onComplete(), 3200), // Done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-black overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Step 0: Earth/Space View */}
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="earth"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, ease: "easeIn" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"
          />
        )}

        {/* Step 1: Continental View (Greece/Europe) */}
        {step === 1 && (
          <motion.div
            key="europe"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1954&auto=format&fit=crop')] bg-cover bg-center"
          />
        )}

        {/* Step 2: Santorini View (Local) */}
        {step === 2 && (
          <motion.div
            key="local"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('/assets/santorini_drone.png')] bg-cover bg-center"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: step < 2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-50">Locating Haven</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter">Oia, Santorini</h2>
        </motion.div>
      </div>

      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
    </motion.div>
  );
}
