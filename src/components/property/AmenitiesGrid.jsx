import SectionReveal from '../shared/SectionReveal';
import { motion } from 'framer-motion';

export default function AmenitiesGrid({ amenities, theme, title = "What's Included" }) {
  return (
    <SectionReveal>
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-10 tracking-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {amenities.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                data-hover
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-4 py-4 rounded-xl border cursor-default"
                style={{ borderColor: theme.border, backgroundColor: `${theme.fg}06` }}
              >
                <Icon size={18} style={{ color: theme.accent }} />
                <span className="text-sm font-medium" style={{ color: theme.fg }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
