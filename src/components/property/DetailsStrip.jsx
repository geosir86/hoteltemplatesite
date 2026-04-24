import { Users, Bed, Bath, Star } from 'lucide-react';
import SectionReveal from '../shared/SectionReveal';

export default function DetailsStrip({ details, theme }) {
  const items = [
    { icon: Users, value: details.guests, label: 'guests' },
    { icon: Bed, value: details.beds, label: 'bedrooms' },
    { icon: Bath, value: details.baths, label: 'bathrooms' },
    { icon: null, value: details.sqm, label: 'area' },
  ];

  return (
    <SectionReveal>
      <div
        className="max-w-[1280px] mx-auto px-4 md:px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-b"
        style={{ borderColor: theme.border }}
      >
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {Icon && <Icon size={16} style={{ color: theme.accent }} />}
              <span className="text-2xl font-light" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>{value}</span>
            </div>
            <span className="text-xs tracking-widest uppercase" style={{ color: theme.muted }}>{label}</span>
          </div>
        ))}

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Star size={14} fill={theme.accent} color={theme.accent} />
            <span className="text-2xl font-light" style={{ fontFamily: theme.fontHeading, color: theme.fg }}>{details.rating}</span>
          </div>
          <span className="text-xs tracking-widest uppercase" style={{ color: theme.muted }}>{details.reviews}+ reviews</span>
        </div>
      </div>
    </SectionReveal>
  );
}
