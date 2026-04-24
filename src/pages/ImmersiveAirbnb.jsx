import React from 'react';
import SmoothScroll from '../components/SmoothScroll';
import HeroCinematic from '../components/Immersive/HeroCinematic';
import ScrollSequence from '../components/Immersive/ScrollSequence';
import RoomShowcaseParallax from '../components/Immersive/RoomShowcaseParallax';

export default function ImmersiveAirbnb() {
  return (
    <SmoothScroll>
      <div className="bg-black min-h-screen text-white font-inter selection:bg-white selection:text-black">
        
        {/* Hero Section */}
        <HeroCinematic 
          title="Villa Horizon" 
          subtitle="Experience the extraordinary"
          imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
        />

        {/* Introduction Section */}
        <section className="py-40 px-6 md:px-20 text-center max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair leading-relaxed text-white/90">
            A sanctuary where modern design meets the raw beauty of nature. Every detail is curated to provide an unforgettable stay.
          </h2>
        </section>

        {/* Scroll Sequence (Oryzo.ai style) */}
        <ScrollSequence 
          image1="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          image2="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
        />

        {/* Room Showcases */}
        <RoomShowcaseParallax 
          title="The Master Suite"
          description="Wake up to panoramic ocean views. The master suite features floor-to-ceiling windows, a private terrace, and a spa-like en-suite bathroom."
          imageUrl="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop"
        />

        <RoomShowcaseParallax 
          title="The Infinity Pool"
          description="Seamlessly blending into the horizon. Spend your days lounging by the pool with undisturbed views of the sunset."
          imageUrl="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop"
          reverse={true}
        />

        <RoomShowcaseParallax 
          title="The Dining Space"
          description="An open-concept dining area designed for entertaining, complete with a chef's kitchen and artisanal stonework."
          imageUrl="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2053&auto=format&fit=crop"
        />

        {/* Footer / CTA */}
        <footer className="py-32 px-6 text-center border-t border-white/10 mt-20">
          <h2 className="text-5xl md:text-8xl font-outfit mb-10 tracking-tighter">Ready to live it?</h2>
          <button className="px-12 py-5 bg-white text-black font-semibold text-lg uppercase tracking-widest hover:bg-white/90 transition-colors rounded-full">
            Book Your Stay
          </button>
        </footer>

      </div>
    </SmoothScroll>
  );
}
