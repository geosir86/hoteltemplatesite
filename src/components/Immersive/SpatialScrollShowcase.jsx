import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const labels = ['Arrival', 'Interior', 'Ritual'];

function ImagePlane({ imageUrl, title, description, index, progress, theme = {} }) {
  const phase = index / 3;
  const opacity = useTransform(
    progress,
    [Math.max(0, phase - 0.16), phase + 0.04, phase + 0.26, Math.min(1, phase + 0.44)],
    [0, 1, 1, 0.35]
  );
  const y = useTransform(progress, [0, 1], [`${index * 18 - 18}%`, `${index * -20 + 18}%`]);
  const rotateY = useTransform(progress, [0, 1], [index % 2 === 0 ? -18 : 18, index % 2 === 0 ? 18 : -18]);
  const z = useTransform(progress, [0, 1], [index * -110, 180 - index * 70]);

  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};

  return (
    <motion.article
      className={`absolute left-1/2 top-1/2 w-[72vw] max-w-[860px] -translate-x-1/2 -translate-y-1/2 ${
        index === 1 ? 'md:ml-[15vw]' : index === 2 ? 'md:-ml-[12vw]' : ''
      }`}
      style={{
        opacity,
        y,
        rotateY,
        z,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border border-white/12 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.34em] text-white/55"
            style={bodyStyle}
          >
            {String(index + 1).padStart(2, '0')} / {labels[index] || 'Scene'}
          </p>
          <h3
            className="max-w-[520px] text-2xl leading-tight text-white md:text-4xl"
            style={headingStyle}
          >
            {title}
          </h3>
          <p
            className="mt-3 max-w-[460px] text-sm leading-6 text-white/62 md:text-base"
            style={bodyStyle}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function SpatialScrollShowcase({ heroImage, sequenceImages = [], rooms = [], theme = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const cameraZ = useTransform(scrollYProgress, [0, 1], [-180, 150]);
  const headlineY = useTransform(scrollYProgress, [0, 0.22], ['44px', '0px']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.16, 0.72, 0.9], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], ['12%', '-16%']);

  const headingStyle = theme.fontHeading ? { fontFamily: theme.fontHeading } : {};
  const bodyStyle = theme.fontBody ? { fontFamily: theme.fontBody } : {};
  const images = [
    heroImage,
    sequenceImages[0],
    rooms[1]?.imageUrl || sequenceImages[1],
  ].filter(Boolean);

  const scenes = images.slice(0, 3).map((imageUrl, index) => ({
    imageUrl,
    title: rooms[index]?.title || ['First impression', 'Inside the atmosphere', 'The private view'][index],
    description:
      rooms[index]?.description ||
      'A scroll-built spatial moment that frames the property like a cinematic walkthrough.'
  }));

  return (
    <section
      ref={ref}
      className="relative h-[360vh] overflow-clip"
      style={{ backgroundColor: theme.secondary || '#050505' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="pointer-events-none absolute left-6 top-24 z-20 max-w-[720px] md:left-16 lg:left-24"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.36em] text-white/45"
            style={bodyStyle}
          >
            Scroll-only spatial preview
          </p>
          <h2
            className="text-4xl leading-[1.02] text-white md:text-7xl lg:text-8xl"
            style={headingStyle}
          >
            Move through the stay before you arrive.
          </h2>
        </motion.div>

        <motion.div
          className="absolute bottom-[-22vh] left-1/2 h-[56vh] w-[140vw] -translate-x-1/2 border-t border-white/10"
          style={{
            y: gridY,
            rotateX: 72,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            transformStyle: 'preserve-3d'
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 45%'
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              rotateX,
              rotateY,
              z: cameraZ,
              transformStyle: 'preserve-3d'
            }}
          >
            {scenes.map((scene, index) => (
              <ImagePlane
                key={`${scene.imageUrl}-${index}`}
                index={index}
                progress={scrollYProgress}
                theme={theme}
                {...scene}
              />
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
    </section>
  );
}
