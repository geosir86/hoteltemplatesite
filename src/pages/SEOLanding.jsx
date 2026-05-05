import { useEffect } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import BeforeAfterTransformation from '../components/landing/BeforeAfterTransformation';
import CinematicHero from '../components/landing/CinematicHero';
import FAQSection from '../components/landing/FAQSection';
import PricingSection from '../components/landing/PricingSection';

const BRAND = {
  warmMarble: '#F5EFE6',
  stone: '#F7F3EA',
  deepInk: '#1A1612',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  bronzeLight: '#D8B16E',
  aegeanBlue: '#466E7F',
  espresso: '#14110E',
  linen: '#E9DFCF',
};

const CONTACT_INFO = {
  secondaryCta: 'Ξεκινήστε τώρα',
  email: 'stayfolio.gr@gmail.com',
  finalTitle: 'Έτοιμοι για τη δική σας ιστοσελίδα;',
  finalBody: 'Αφήστε τις προμήθειες. Χτίστε το δικό σας brand. Επικοινωνήστε μαζί μας σήμερα.',
};

function getHeroCopy(heroProps = {}) {
  return {
    brandLine: 'Ιστοσελίδες για καταλύματα στην Ελλάδα',
    heroEyebrow: 'Direct booking website',
    heroTitle: heroProps.title || 'Η ιστοσελίδα του καταλύματός σας.',
    heroSub:
      heroProps.subtitle ||
      'Premium παρουσίαση για Airbnb, villas και boutique καταλύματα που χρειάζονται καλύτερη εικόνα, περισσότερη εμπιστοσύνη και απευθείας inquiries.',
    primaryCta: 'Δείτε παραδείγματα',
    secondaryCta: 'Μιλήστε μαζί μας',
    heroStats: [
      { value: '0%', label: 'προμήθειες' },
      { value: '24/7', label: 'online παρουσία' },
      { value: 'SEO', label: 'έτοιμο' },
    ],
  };
}

export default function SEOLanding({ title, description, h1Keyword, heroProps, seoText }) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    window.scrollTo(0, 0);

    return () => {
      document.title = 'Stayfolio | Ιστοσελίδες για Airbnb & Βραχυχρόνια Μίσθωση στην Ελλάδα';
    };
  }, [title, description]);

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-sans selection:bg-[#B8894A]/30">
      <main>
        <CinematicHero lang="gr" brand={BRAND} copy={getHeroCopy(heroProps)} />

        <BeforeAfterTransformation lang="gr" brand={BRAND} />

        {seoText && (
          <section className="px-5 py-16 text-center md:px-10" style={{ backgroundColor: BRAND.warmMarble, color: BRAND.taupe }}>
            <div className="mx-auto max-w-[900px]">
              <p className="text-lg leading-relaxed md:text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: BRAND.deepInk }}>
                {seoText}
              </p>
            </div>
          </section>
        )}

        <PricingSection lang="gr" brand={BRAND} />

        <FAQSection brand={BRAND} />

        <section id="contact" className="px-5 py-24 md:px-10" style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}>
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <h2 className="text-4xl font-light leading-tight md:text-7xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <span className="sr-only">{h1Keyword} - </span>
              {CONTACT_INFO.finalTitle}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/60">{CONTACT_INFO.finalBody}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/306972417067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-black uppercase tracking-[0.18em]"
                style={{ backgroundColor: BRAND.bronze, color: BRAND.espresso }}
              >
                <MessageCircle size={16} />
                {CONTACT_INFO.secondaryCta}
              </a>
              <a
                href="mailto:stayfolio.gr@gmail.com"
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-8 py-4 text-xs font-black uppercase tracking-[0.18em]"
                style={{ borderColor: 'rgba(247,243,234,0.22)', color: BRAND.stone }}
              >
                <Mail size={16} />
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
