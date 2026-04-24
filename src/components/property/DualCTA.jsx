import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.23, 1, 0.32, 1];

export default function DualCTA({ theme, price, currency, lang }) {
  const reduced = useReducedMotion();
  const bookLabel = lang === 'gr' ? 'Κάνε Κράτηση' : 'Book This Stay';
  const b2bLine = lang === 'gr'
    ? 'Θέλεις τέτοιο site για το property σου;'
    : 'Impressed by this site? We build them for your property.';
  const b2bCta = lang === 'gr' ? 'Μάθε περισσότερα →' : 'Get your site →';

  return (
    <section
      className="py-24 md:py-32 text-center px-6"
      style={{ backgroundColor: theme.bg }}
    >
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 40 }}
        whileInView={reduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
        className="flex flex-col items-center gap-8 max-w-xl mx-auto"
      >
        <div className="w-12 h-px mx-auto" style={{ backgroundColor: theme.accent }} />

        <p className="text-sm tracking-widest uppercase" style={{ color: theme.accent }}>
          {currency}{price} / night
        </p>

        <motion.a
          href="#"
          data-hover
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase cursor-pointer transition-opacity"
          style={{ backgroundColor: theme.accent, color: theme.bg }}
        >
          {bookLabel}
        </motion.a>

        <div className="w-full h-px mt-4" style={{ backgroundColor: theme.border }} />

        <p className="text-sm" style={{ color: theme.muted }}>{b2bLine}</p>

        <Link to="/">
          <motion.button
            data-hover
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-full border cursor-pointer"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            {b2bCta}
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
