import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarCheck, ImageIcon, MapPin, Star } from 'lucide-react';

const EASE = [0.23, 1, 0.32, 1];

export default function BeforeAfterTransformation({ brand, copy }) {
  const reduced = useReducedMotion();
  const beforeFeatures = copy.beforeAfter.before.features;
  const afterFeatures = copy.beforeAfter.after.features;

  return (
    <section className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.stone }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.aegeanBlue }}>
              {copy.beforeAfter.label}
            </p>
            <h2
              className="mt-5 text-4xl font-light leading-tight md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.deepInk }}
            >
              {copy.beforeAfter.title}
            </h2>
          </div>
          <p className="text-base leading-8" style={{ color: brand.taupe }}>
            {copy.beforeAfter.body}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <motion.article
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="rounded-lg border p-5 md:p-7"
            style={{ backgroundColor: '#ECE6DA', borderColor: 'rgba(26,22,18,0.12)' }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.taupe }}>
                {copy.beforeAfter.before.label}
              </span>
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ borderColor: 'rgba(26,22,18,0.16)', color: brand.taupe }}
              >
                Platform template
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border bg-white" style={{ borderColor: 'rgba(26,22,18,0.1)' }}>
              <img src="/assets/cyclades_pool.png" alt="Generic listing preview" className="h-48 w-full object-cover grayscale md:h-64" />
              <div className="space-y-4 p-5">
                <div>
                  <div className="h-4 w-3/4 rounded bg-neutral-300" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-neutral-200" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {beforeFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="rounded border px-3 py-2 text-center text-[10px] uppercase tracking-[0.12em]"
                      style={{ borderColor: 'rgba(26,22,18,0.1)', color: brand.taupe }}
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            className="rounded-lg border p-5 md:p-7"
            style={{ backgroundColor: brand.espresso, borderColor: 'rgba(235,199,119,0.22)', color: brand.stone }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.bronzeLight }}>
                {copy.beforeAfter.after.label}
              </span>
              <span
                className="rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md"
                style={{ borderColor: 'rgba(247,243,234,0.18)', backgroundColor: 'rgba(255,255,255,0.08)', color: brand.bronzeLight }}
              >
                Stayfolio experience
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'rgba(247,243,234,0.14)', backgroundColor: '#201B16' }}>
              <div className="relative">
                <img src="/assets/cyclades_pool.png" alt="Stayfolio branded property preview" className="h-48 w-full object-cover md:h-64" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: brand.bronzeLight }}>
                    Cyclades · Island villa
                  </p>
                  <h3 className="mt-2 text-3xl font-light leading-none text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Villa Aether
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
                {[
                  { icon: ImageIcon, label: afterFeatures[0] },
                  { icon: MapPin, label: afterFeatures[1] },
                  { icon: CalendarCheck, label: afterFeatures[2] },
                  { icon: Star, label: afterFeatures[3] },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-lg border p-3"
                      style={{ borderColor: 'rgba(247,243,234,0.12)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <Icon size={16} style={{ color: brand.bronzeLight }} />
                      <p className="mt-3 text-xs leading-5 text-white/70">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#examples"
            className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.18em]"
            style={{ backgroundColor: brand.deepInk, color: brand.stone }}
          >
            {copy.beforeAfter.cta}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
