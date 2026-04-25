import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const scenes = [
  {
    headline: 'Architecture redefined.',
    body: 'Every angle is considered. The interplay of light and stone creates an environment that feels both grounded and ethereal.',
    tag: '01 — Space'
  },
  {
    headline: 'Seamless integration.',
    body: 'The boundaries between indoor and outdoor living dissolve, bringing the horizon directly into your living space.',
    tag: '02 — Harmony'
  },
  {
    headline: 'Curated for you.',
    body: 'Every detail, from the thread count to the sunset timing, is selected to create a flawless experience.',
    tag: '03 — Detail'
  }
];

export default function ScrollSequence({ image1, image2, image3, theme = {} }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const images = [image1, image2, image3 || image2];

  const o1 = useTransform(scrollYProgress, [0, 0.05, 0.3, 0.45], [0, 1, 1, 0]);
  const s1 = useTransform(scrollYProgress, [0, 0.45], [1.15, 1.0]);
  const ty1 = useTransform(scrollYProgress, [0.15, 0.35], ['40px', '0px']);

  const o2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.35, 0.75], [1.15, 1.0]);
  const ty2 = useTransform(scrollYProgress, [0.5, 0.65], ['40px', '0px']);

  const o3 = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const s3 = useTransform(scrollYProgress, [0.65, 1.0], [1.15, 1.0]);
  const ty3 = useTransform(scrollYProgress, [0.75, 0.9], ['40px', '0px']);

  const sceneData = [
    { o: o1, s: s1, ty: ty1 },
    { o: o2, s: s2, ty: ty2 },
    { o: o3, s: s3, ty: ty3 },
  ];

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};

  return (
    <section ref={containerRef} className="relative h-[400vh]" style={{ backgroundColor: theme.secondary || '#000000' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sceneData.map((scene, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-end"
            style={{ opacity: scene.o, zIndex: i + 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${images[i]})`,
                scale: scene.s
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

            <motion.div
              className="relative z-10 p-10 md:p-20 pb-16 md:pb-24 max-w-2xl"
              style={{ y: scene.ty }}
            >
              <motion.p 
                className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4"
                style={bodyStyle}
              >
                {scenes[i].tag}
              </motion.p>
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-light mb-5 leading-[1.1]"
                style={headingStyle}
              >
                {scenes[i].headline}
              </h2>
              <p 
                className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg"
                style={bodyStyle}
              >
                {scenes[i].body}
              </p>
            </motion.div>

            <div className="absolute right-8 md:right-12 bottom-12 flex flex-col items-center gap-3 z-10">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className={`w-[1px] transition-all duration-500 ${dot === i ? 'h-8 bg-white' : 'h-3 bg-white/30'}`}
                  style={dot === i ? { backgroundColor: theme.primary || '#ffffff' } : {}}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


