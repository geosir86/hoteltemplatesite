import { motion, useReducedMotion } from 'framer-motion';
import { GalleryHorizontal, Globe2, Layout, MessageCircle, Smartphone, Sparkles } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

const ICONS = {
  homepage: Layout,
  gallery: GalleryHorizontal,
  story: Globe2,
  inquiry: MessageCircle,
  mobile: Smartphone,
};

function MiniVisual({ type, brand }) {
  if (type === 'homepage') {
    return (
      <div className="relative h-44 overflow-hidden rounded-lg bg-black">
        <img src="/assets/greek_luxury_terrace_sunset_view_1776942676038.png" alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-2 w-24 rounded" style={{ backgroundColor: brand.bronzeLight }} />
          <div className="mt-3 h-7 w-40 rounded bg-white/85" />
        </div>
      </div>
    );
  }

  if (type === 'gallery') {
    return (
      <div className="grid h-44 grid-cols-[2fr_1fr] grid-rows-2 gap-2 overflow-hidden rounded-lg">
        <img src="/assets/cyclades_pool.png" alt="" className="row-span-2 h-full w-full rounded-lg object-cover" />
        <img src="/assets/nisi_room.png" alt="" className="h-full w-full rounded-lg object-cover" />
        <img src="/assets/ionian_terrace.png" alt="" className="h-full w-full rounded-lg object-cover" />
      </div>
    );
  }

  if (type === 'story') {
    return (
      <div className="grid h-44 grid-cols-2 gap-3">
        {['EN', 'GR'].map((label) => (
          <div key={label} className="rounded-lg border p-4" style={{ borderColor: 'rgba(26,22,18,0.1)', backgroundColor: brand.warmMarble }}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: brand.aegeanBlue }}>{label}</p>
            <div className="mt-5 space-y-2">
              <div className="h-2 rounded bg-black/55" />
              <div className="h-2 w-2/3 rounded bg-black/25" />
              <div className="h-2 w-5/6 rounded bg-black/15" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'inquiry') {
    return (
      <div className="flex h-44 items-center justify-center rounded-lg" style={{ backgroundColor: brand.espresso }}>
        <div className="w-56 rounded-lg border p-4 text-center" style={{ borderColor: 'rgba(247,243,234,0.14)', backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <MessageCircle className="mx-auto" size={22} style={{ color: brand.bronzeLight }} />
          <div className="mx-auto mt-4 h-3 w-32 rounded bg-white/70" />
          <div className="mx-auto mt-3 h-9 w-40 rounded-full" style={{ backgroundColor: brand.bronzeLight }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-44 items-center justify-center rounded-lg" style={{ backgroundColor: brand.deepInk }}>
      <div className="h-36 w-20 rounded-[1.5rem] border p-2" style={{ borderColor: 'rgba(247,243,234,0.28)' }}>
        <div className="h-full rounded-[1rem] bg-cover bg-center" style={{ backgroundImage: "url('/assets/nisi_hero.png')" }} />
      </div>
    </div>
  );
}

export default function CapabilityBento({ brand, copy, lang }) {
  const reduced = useReducedMotion();

  return (
    <section id="capabilities" className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.warmMarble }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.aegeanBlue }}>
            {copy.capabilities.label}
          </p>
          <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
            {copy.capabilities.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {copy.capabilities.items.map((item, index) => {
            const Icon = ICONS[item.type];
            const large = index === 0;
            return (
              <motion.article
                key={item.title}
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
                className={`flex flex-col min-w-0 rounded-lg border p-5 ${large ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                style={{ backgroundColor: brand.stone, borderColor: 'rgba(26,22,18,0.1)' }}
              >
                <MiniVisual type={item.type} brand={brand} />
                <div className="mt-5 flex min-w-0 items-start gap-3">
                  <Icon size={18} className="mt-1 shrink-0" style={{ color: brand.aegeanBlue }} />
                  <div className="min-w-0">
                    <h3 className="text-[1.55rem] font-light leading-tight md:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7" style={{ color: brand.taupe }}>
                      {item.body}
                    </p>
                  </div>
                </div>
                {item.type === 'homepage' && (
                  <div className="relative mt-8 min-h-[200px] w-full flex-1 overflow-hidden rounded-lg bg-black">
                    <video
                      src="/assets/santorini_hero_night_pool.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-center gap-2 rounded-md bg-black/60 px-3 py-2 backdrop-blur-md">
                      <Sparkles size={14} className="text-white/80" />
                      <span className="text-[10px] font-medium tracking-wider text-white/90 uppercase text-center sm:text-[11px]">
                        {lang === 'en' ? 'Video creation from actual property photos available' : 'Δυνατοτητα δημιουργιας video απο πραγματικες φωτογραφιες του καταλυματος'}
                      </span>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
