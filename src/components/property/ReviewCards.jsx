import { Star } from 'lucide-react';
import SectionReveal from '../shared/SectionReveal';

export default function ReviewCards({ reviews, theme, title = 'What Guests Say' }) {
  return (
    <SectionReveal>
      <section className="py-16 md:py-24" style={{ backgroundColor: theme.bg }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-10 tracking-tight"
            style={{ fontFamily: theme.fontHeading, color: theme.fg }}
          >
            {title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl border"
                style={{ borderColor: theme.border, backgroundColor: `${theme.fg}05` }}
              >
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={theme.accent} color={theme.accent} />)}
                </div>
                <p className="text-sm md:text-base leading-relaxed flex-1" style={{ color: theme.muted }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <img src={r.avatar} alt={r.name} loading="lazy" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.fg }}>{r.name}</div>
                    <div className="text-xs" style={{ color: theme.muted }}>{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
