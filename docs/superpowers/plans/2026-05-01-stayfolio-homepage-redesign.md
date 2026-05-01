# Stayfolio Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage from agency-style Stayscape GR into Stayfolio, a warm premium solo-specialist service for Greek hospitality websites.

**Architecture:** Keep the existing Vite React app and route structure. Replace the homepage presentation inside `src/pages/Landing.jsx`, restyle/rewrite the package section in `src/components/landing/PricingSection.jsx`, and keep destination demo pages unchanged. Use local constants inside the two affected components so this redesign remains isolated from the property demo data layer.

**Tech Stack:** React 18, React Router, Framer Motion, Tailwind CSS utility classes, Lucide React icons, Vite.

---

## File Structure

- Modify: `src/pages/Landing.jsx`
  - Owns Stayfolio homepage copy, navigation, hero, problem section, example cards, one-specialist section, process section, final CTA, and footer.
  - Imports `PricingSection`, `DESTINATIONS`, and `DESTINATION_LIST`.

- Modify: `src/components/landing/PricingSection.jsx`
  - Owns Stayfolio package definitions and package card UI.
  - Keeps package prices and core inclusions but changes naming and presentation to match the new positioning.

- No changes: `src/App.jsx`
  - The existing `/` route already renders `Landing`.

- No changes: `src/data/destinations.js`
  - Existing demo data remains the source for project cards.

## Implementation Notes

- Preserve bilingual support through the existing `lang` prop.
- Replace all visible `STAYSCAPE.GR` homepage branding with `STAYFOLIO`.
- Replace agency copy such as `We`, `Our Work`, and `Talk to us` with solo-specialist copy.
- Use the palette from the spec:
  - Stone: `#F7F3EA`
  - Ink: `#171512`
  - Taupe: `#6F685F`
  - Bronze: `#B8894A`
  - Espresso: `#14110E`
  - Linen: `#E9DFCF`
  - Olive: `#566B5A`
- Keep card radius at `8px` where practical.
- Use `useReducedMotion()` before motion-heavy animations.

---

### Task 1: Replace Landing Constants And Navigation

**Files:**
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Replace imports with the reduced homepage import set**

Replace the current import block in `src/pages/Landing.jsx` with:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import PricingSection from '../components/landing/PricingSection';
import { DESTINATIONS, DESTINATION_LIST } from '../data/destinations';
```

- [ ] **Step 2: Replace top-level constants**

After imports, define:

```jsx
const EASE = [0.23, 1, 0.32, 1];

const BRAND = {
  stone: '#F7F3EA',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  espresso: '#14110E',
  linen: '#E9DFCF',
  olive: '#566B5A',
};

const NAV_LINKS = {
  en: [
    { label: 'Examples', href: '#examples' },
    { label: 'Why Stayfolio', href: '#why' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  gr: [
    { label: 'Παραδείγματα', href: '#examples' },
    { label: 'Γιατί Stayfolio', href: '#why' },
    { label: 'Πακέτα', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Επικοινωνία', href: '#contact' },
  ],
};

const PROJECTS = DESTINATION_LIST
  .filter((id) => id !== 'airbnb')
  .map((id) => ({ id, ...DESTINATIONS[id] }));
```

- [ ] **Step 3: Add bilingual homepage copy**

Add this `COPY` object below `PROJECTS`:

```jsx
const COPY = {
  en: {
    brandLine: 'Premium websites for Greek stays',
    heroTitle: 'Your stay deserves a site that matches the experience.',
    heroSub:
      'I build premium bilingual websites for villas, Airbnb hosts, and boutique stays in Greece, so their online presence feels as considered as the real experience.',
    heroTrust:
      'A clear, personal process with the person designing and building your site.',
    primaryCta: 'View examples',
    secondaryCta: 'Send your listing',
    problemLabel: 'The online gap',
    problemTitle: 'Premium in person. Lost inside another listing online.',
    problemBody:
      'Airbnb and Booking pages are useful, but they make many properties feel the same. A dedicated site gives your stay a place to show its atmosphere, story, and value.',
    problemPoints: [
      'Raise perceived value before the first message.',
      'Give guests a branded place to understand the experience.',
      'Make direct inquiry easier without overpromising bookings.',
    ],
    examplesLabel: 'Example stay experiences',
    examplesTitle: 'Demo builds for properties that deserve more than a listing.',
    examplesBody:
      'Each example shows how a Greek stay can feel online when it is treated as an individual experience.',
    viewExample: 'View example',
    whyLabel: 'One specialist',
    whyTitle: 'No agency layers. You speak with the person building it.',
    whyBody:
      'Stayfolio is intentionally small. That means clearer decisions, tighter taste, and a site shaped around your actual property instead of a generic web-design package.',
    whyPoints: [
      'Direct communication from first message to launch.',
      'A clear scope, fixed deliverables, and fast decisions.',
      'Hospitality-specific design, copy, and guest-flow thinking.',
      'Personal attention to your photos, location, and guest profile.',
    ],
    processLabel: 'Process',
    processTitle: 'From listing to live site without a heavy agency process.',
    processSteps: [
      {
        title: 'Send the material',
        body: 'Share your listing link, photos, location, and the basics of the stay.',
      },
      {
        title: 'I shape the experience',
        body: 'Structure, copy, visuals, bilingual content, and inquiry flow are designed together.',
      },
      {
        title: 'The site goes live',
        body: 'You get a hosted site with contact actions, basic tracking, and a clean handoff.',
      },
    ],
    finalTitle: 'Want to see how your stay could look online?',
    finalBody:
      'Send me your Airbnb or Booking listing and I will tell you honestly which package fits.',
    whatsapp: 'WhatsApp',
    email: 'Email',
  },
  gr: {
    brandLine: 'Premium websites για καταλύματα στην Ελλάδα',
    heroTitle: 'Το κατάλυμά σου αξίζει site αντάξιο της εμπειρίας που προσφέρει.',
    heroSub:
      'Φτιάχνω premium, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online εικόνα τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.',
    heroTrust:
      'Ένα καθαρό, προσωπικό process από τον άνθρωπο που σχεδιάζει και χτίζει το site σου.',
    primaryCta: 'Δες παραδείγματα',
    secondaryCta: 'Στείλε μου το listing σου',
    problemLabel: 'Το online κενό',
    problemTitle: 'Από κοντά δείχνει premium. Online όμως χάνεται μέσα στα listings.',
    problemBody:
      'Airbnb και Booking είναι χρήσιμα, αλλά κάνουν πολλά καταλύματα να μοιάζουν ίδια. Ένα δικό σου site δίνει στο property χώρο να δείξει ατμόσφαιρα, ιστορία και αξία.',
    problemPoints: [
      'Ανεβάζει την αντιληπτή αξία πριν το πρώτο μήνυμα.',
      'Δίνει στον επισκέπτη branded χώρο να καταλάβει την εμπειρία.',
      'Κάνει πιο εύκολο το direct inquiry χωρίς υπερβολικές υποσχέσεις.',
    ],
    examplesLabel: 'Παραδείγματα online εμπειριών',
    examplesTitle: 'Demo builds για καταλύματα που αξίζουν κάτι περισσότερο από ένα listing.',
    examplesBody:
      'Κάθε παράδειγμα δείχνει πώς μπορεί να σταθεί online ένα ελληνικό stay όταν αντιμετωπίζεται σαν ξεχωριστή εμπειρία.',
    viewExample: 'Δες παράδειγμα',
    whyLabel: 'Ένας specialist',
    whyTitle: 'Δεν περνάς από ομάδα. Μιλάς με αυτόν που το φτιάχνει.',
    whyBody:
      'Το Stayfolio είναι συνειδητά μικρό. Αυτό σημαίνει πιο καθαρές αποφάσεις, πιο συγκεκριμένο taste και site χτισμένο γύρω από το πραγματικό σου κατάλυμα.',
    whyPoints: [
      'Άμεση συνεννόηση από το πρώτο μήνυμα μέχρι το launch.',
      'Καθαρό scope, συγκεκριμένα deliverables και γρήγορες αποφάσεις.',
      'Hospitality-specific design, copy και guest-flow thinking.',
      'Προσωπική προσοχή στις φωτογραφίες, την τοποθεσία και το κοινό σου.',
    ],
    processLabel: 'Process',
    processTitle: 'Από listing σε live site, χωρίς περίπλοκο agency process.',
    processSteps: [
      {
        title: 'Στέλνεις το υλικό',
        body: 'Listing link, φωτογραφίες, τοποθεσία και τα βασικά στοιχεία του καταλύματος.',
      },
      {
        title: 'Σχεδιάζω την εμπειρία',
        body: 'Δομή, κείμενο, visuals, δίγλωσσο περιεχόμενο και inquiry flow χτίζονται μαζί.',
      },
      {
        title: 'Βγαίνει live',
        body: 'Παραλαμβάνεις hosted site με contact actions, basic tracking και καθαρό handoff.',
      },
    ],
    finalTitle: 'Θες να δούμε πώς μπορεί να δείχνει το δικό σου κατάλυμα online;',
    finalBody:
      'Στείλε μου το Airbnb ή Booking listing σου και θα σου πω ειλικρινά ποιο πακέτο ταιριάζει.',
    whatsapp: 'WhatsApp',
    email: 'Email',
  },
};
```

- [ ] **Step 4: Replace the navigation component**

Replace `AgencyNav` with `StayfolioNav`:

```jsx
function StayfolioNav({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = NAV_LINKS[lang];
  const cta = COPY[lang].secondaryCta;

  return (
    <>
      <nav
        className="fixed left-0 top-0 z-[500] flex w-full items-center justify-between border-b px-5 py-4 backdrop-blur-md md:px-10"
        style={{
          backgroundColor: 'rgba(247,243,234,0.88)',
          borderColor: 'rgba(23,21,18,0.08)',
          color: BRAND.ink,
        }}
      >
        <a href="/" className="text-sm font-black uppercase tracking-[0.22em]">
          STAYFOLIO
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[#B8894A]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'gr' : 'en')}
            className="flex cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <Globe size={14} />
            {lang === 'en' ? 'GR' : 'EN'}
          </button>
          <a
            href="#contact"
            className="cursor-pointer rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND.ink, color: BRAND.stone }}
          >
            {cta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[600] flex flex-col px-7 py-8"
            style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}
          >
            <div className="mb-14 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-[0.22em]">STAYFOLIO</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-7">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: 'rgba(247,243,234,0.16)' }}>
              <button type="button" onClick={() => setLang(lang === 'en' ? 'gr' : 'en')} className="cursor-pointer text-sm uppercase tracking-[0.2em]">
                {lang === 'en' ? 'Greek' : 'English'}
              </button>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.bronze }}>
                {cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 5: Run build to catch syntax errors**

Run: `npm run build`

Expected: build completes and Vite outputs generated files in `dist`.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/pages/Landing.jsx
git commit -m "feat: add stayfolio homepage foundation"
```

---

### Task 2: Rebuild Landing Page Sections

**Files:**
- Modify: `src/pages/Landing.jsx`

- [ ] **Step 1: Replace `ProjectCard` with a warmer example card**

Use this component:

```jsx
function ExampleCard({ project, lang, index }) {
  const reduced = useReducedMotion();
  const content = project.content[lang];
  const accent = project.theme?.accent || BRAND.bronze;

  return (
    <Link to={project.path} className="group block cursor-pointer">
      <motion.article
        initial={reduced ? {} : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
        className="overflow-hidden rounded-lg border"
        style={{ backgroundColor: '#201B16', borderColor: 'rgba(247,243,234,0.12)' }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.heroImage}
            alt={content.title}
            loading={index < 2 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="absolute left-5 top-5 font-mono text-[11px] text-white/55">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5" style={{ backgroundColor: accent }}>
            <ArrowUpRight size={15} color="#14110E" strokeWidth={2.5} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accent }}>
              {content.location}
            </p>
            <h3 className="text-3xl font-light leading-none text-white" style={{ fontFamily: project.theme?.fontHeading || "'Cormorant Garamond', serif" }}>
              {content.title}
            </h3>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
```

- [ ] **Step 2: Replace the `Landing` component body**

Use this component:

```jsx
export default function Landing({ lang = 'en', setLang }) {
  const c = COPY[lang];
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen overflow-x-hidden antialiased" style={{ backgroundColor: BRAND.stone, color: BRAND.ink, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <StayfolioNav lang={lang} setLang={setLang} />

      <main>
        <section className="px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <motion.div initial={reduced ? {} : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-9" style={{ backgroundColor: BRAND.bronze }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.brandLine}</span>
              </div>
              <h1 className="max-w-4xl text-[clamp(3rem,8vw,7.6rem)] font-light leading-[0.92]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {c.heroTitle}
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 md:text-lg" style={{ color: BRAND.taupe }}>
                {c.heroSub}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7" style={{ color: BRAND.olive }}>
                {c.heroTrust}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#examples" className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: BRAND.ink, color: BRAND.stone }}>
                  {c.primaryCta} <ArrowRight size={15} />
                </a>
                <a href="#contact" className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-7 py-4 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-[#E9DFCF]" style={{ borderColor: 'rgba(23,21,18,0.18)', color: BRAND.ink }}>
                  {c.secondaryCta} <Send size={15} />
                </a>
              </div>
            </motion.div>

            <motion.div initial={reduced ? {} : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <img src="/assets/greek_luxury_terrace_sunset_view_1776942676038.png" alt="Greek villa terrace at sunset" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 rounded-lg border p-5 shadow-2xl md:-left-8 md:right-auto md:w-72" style={{ backgroundColor: BRAND.linen, borderColor: 'rgba(23,21,18,0.1)' }}>
                <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: BRAND.bronze }}>Solo specialist</p>
                <p className="mt-2 text-sm leading-6" style={{ color: BRAND.taupe }}>{c.heroTrust}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-10">
          <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.problemLabel}</p>
              <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.problemTitle}</h2>
            </div>
            <div>
              <p className="text-base leading-8" style={{ color: BRAND.taupe }}>{c.problemBody}</p>
              <div className="mt-8 grid gap-4">
                {c.problemPoints.map((point) => (
                  <div key={point} className="flex gap-3 rounded-lg p-4" style={{ backgroundColor: BRAND.linen }}>
                    <CheckCircle2 size={18} className="mt-1 shrink-0" style={{ color: BRAND.olive }} />
                    <p className="text-sm leading-6" style={{ color: BRAND.ink }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="examples" className="px-5 py-24 md:px-10" style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}>
          <div className="mx-auto max-w-[1220px]">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.examplesLabel}</p>
                <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.examplesTitle}</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/58">{c.examplesBody}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project, index) => (
                <ExampleCard key={project.id} project={project} lang={lang} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="px-5 py-24 md:px-10">
          <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.whyLabel}</p>
              <h2 className="mt-5 text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.whyTitle}</h2>
              <p className="mt-7 text-base leading-8" style={{ color: BRAND.taupe }}>{c.whyBody}</p>
            </div>
            <div className="grid gap-3">
              {c.whyPoints.map((point, index) => (
                <div key={point} className="flex items-start gap-4 border-t py-5" style={{ borderColor: 'rgba(23,21,18,0.12)' }}>
                  <span className="font-mono text-xs" style={{ color: BRAND.bronze }}>{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm leading-7" style={{ color: BRAND.ink }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection lang={lang} brand={BRAND} />

        <section id="process" className="px-5 py-24 md:px-10">
          <div className="mx-auto max-w-[1120px]">
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: BRAND.bronze }}>{c.processLabel}</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.processTitle}</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {c.processSteps.map((step, index) => (
                <div key={step.title} className="rounded-lg p-7" style={{ backgroundColor: BRAND.linen }}>
                  <span className="font-mono text-xs" style={{ color: BRAND.bronze }}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-8 text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                  <p className="mt-4 text-sm leading-7" style={{ color: BRAND.taupe }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 py-24 md:px-10" style={{ backgroundColor: BRAND.espresso, color: BRAND.stone }}>
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <h2 className="text-4xl font-light leading-tight md:text-7xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{c.finalTitle}</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/60">{c.finalBody}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="https://wa.me/306900000000" target="_blank" rel="noopener noreferrer" className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-black uppercase tracking-[0.18em]" style={{ backgroundColor: BRAND.bronze, color: BRAND.espresso }}>
                <MessageCircle size={16} /> {c.whatsapp}
              </a>
              <a href="mailto:hello@stayfolio.gr" className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full border px-8 py-4 text-xs font-black uppercase tracking-[0.18em]" style={{ borderColor: 'rgba(247,243,234,0.22)', color: BRAND.stone }}>
                <Mail size={16} /> {c.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 px-5 py-7 text-xs md:flex-row md:px-10" style={{ backgroundColor: BRAND.espresso, color: 'rgba(247,243,234,0.42)', borderTop: '1px solid rgba(247,243,234,0.1)' }}>
        <span className="font-black uppercase tracking-[0.22em]">STAYFOLIO</span>
        <span>2026 · Premium websites for Greek stays</span>
        <div className="flex gap-3">
          <button type="button" onClick={() => setLang('en')} className="cursor-pointer" style={{ color: lang === 'en' ? BRAND.bronze : 'rgba(247,243,234,0.42)' }}>EN</button>
          <button type="button" onClick={() => setLang('gr')} className="cursor-pointer" style={{ color: lang === 'gr' ? BRAND.bronze : 'rgba(247,243,234,0.42)' }}>GR</button>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Remove old unused homepage components**

Delete the old `AgencyNav`, old `ProjectCard`, and old `Landing` body from `src/pages/Landing.jsx`. The final file should export only the new `Landing` and contain only `StayfolioNav`, `ExampleCard`, constants, and helper data.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: build completes without React import or undefined component errors.

- [ ] **Step 5: Commit Task 2**

```bash
git add src/pages/Landing.jsx
git commit -m "feat: redesign stayfolio landing page"
```

---

### Task 3: Rewrite Pricing For Stayfolio Packages

**Files:**
- Modify: `src/components/landing/PricingSection.jsx`

- [ ] **Step 1: Replace imports**

Use:

```jsx
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  Check,
  Film,
  Globe2,
  ImageIcon,
  Layout,
  Mail,
  MessageCircle,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
```

- [ ] **Step 2: Replace feature and package constants**

Use:

```jsx
const EASE = [0.23, 1, 0.32, 1];

const FALLBACK_BRAND = {
  stone: '#F7F3EA',
  ink: '#171512',
  taupe: '#6F685F',
  bronze: '#B8894A',
  espresso: '#14110E',
  linen: '#E9DFCF',
  olive: '#566B5A',
};

const FEATURES = {
  page: { icon: Layout, en: 'Premium one-page website', gr: 'Premium μονοσέλιδο website' },
  mobile: { icon: ShieldCheck, en: 'Mobile-first responsive design', gr: 'Mobile-first responsive design' },
  gallery: { icon: ImageIcon, en: 'Photo gallery and property story', gr: 'Gallery φωτογραφιών και ιστορία καταλύματος' },
  contact: { icon: MessageCircle, en: 'WhatsApp, phone, and email actions', gr: 'WhatsApp, τηλέφωνο και email actions' },
  hosting: { icon: Server, en: 'Hosting and SSL for year one', gr: 'Hosting και SSL για τον πρώτο χρόνο' },
  bilingual: { icon: Globe2, en: 'Greek and English copy', gr: 'Ελληνικά και Αγγλικά κείμενα' },
  inquiry: { icon: Mail, en: 'Direct inquiry form and owner alert', gr: 'Direct inquiry φόρμα και ειδοποίηση ιδιοκτήτη' },
  seo: { icon: Search, en: 'Improved SEO structure', gr: 'Βελτιωμένη SEO δομή' },
  tracking: { icon: BarChart2, en: 'Contact and inquiry tracking setup', gr: 'Contact και inquiry tracking setup' },
  video: { icon: Film, en: 'Cinematic hero or AI video section', gr: 'Cinematic hero ή AI video section' },
  signature: { icon: Sparkles, en: 'Signature visual direction', gr: 'Signature visual direction' },
};

const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Presence',
    price: 249,
    recommended: false,
    desc: {
      en: 'For hosts who need a polished standalone page for a strong first impression.',
      gr: 'Για hosts που χρειάζονται μια προσεγμένη ανεξάρτητη σελίδα για καλύτερη πρώτη εντύπωση.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting'],
  },
  {
    id: 'direct',
    name: 'Direct Inquiry',
    price: 399,
    recommended: true,
    desc: {
      en: 'For owners who want a branded site that makes direct inquiry easy.',
      gr: 'Για ιδιοκτήτες που θέλουν branded site που κάνει εύκολο το direct inquiry.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting', 'bilingual', 'inquiry', 'seo', 'tracking'],
  },
  {
    id: 'signature',
    name: 'Signature Stay',
    price: 699,
    recommended: false,
    desc: {
      en: 'For villas and boutique stays that need a more cinematic presentation.',
      gr: 'Για villas και boutique stays που χρειάζονται πιο cinematic παρουσίαση.',
    },
    features: ['page', 'mobile', 'gallery', 'contact', 'hosting', 'bilingual', 'inquiry', 'seo', 'tracking', 'video', 'signature'],
  },
];
```

- [ ] **Step 3: Replace the pricing components**

Use:

```jsx
function FeatureRow({ id, lang, brand }) {
  const feature = FEATURES[id];
  return (
    <li className="flex items-start gap-3 py-1.5">
      <Check size={14} className="mt-0.5 shrink-0" style={{ color: brand.olive }} />
      <span className="text-sm leading-6" style={{ color: brand.taupe }}>
        {feature[lang]}
      </span>
    </li>
  );
}

function PricingCard({ pkg, lang, index, reduced, brand }) {
  return (
    <motion.article
      initial={reduced ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
      className="relative flex flex-col rounded-lg border p-7 md:p-8"
      style={{
        backgroundColor: pkg.recommended ? brand.ink : brand.linen,
        borderColor: pkg.recommended ? brand.ink : 'rgba(23,21,18,0.1)',
        color: pkg.recommended ? brand.stone : brand.ink,
      }}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 left-6 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-[0.18em]" style={{ backgroundColor: brand.bronze, color: brand.espresso }}>
          {lang === 'en' ? 'Recommended' : 'Προτεινόμενο'}
        </div>
      )}
      <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: pkg.recommended ? brand.bronze : brand.olive }}>
        {lang === 'en' ? 'Package' : 'Πακέτο'}
      </p>
      <h3 className="mt-4 text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{pkg.name}</h3>
      <p className="mt-4 min-h-[72px] text-sm leading-6" style={{ color: pkg.recommended ? 'rgba(247,243,234,0.68)' : brand.taupe }}>
        {pkg.desc[lang]}
      </p>
      <div className="my-7 border-t pt-7" style={{ borderColor: pkg.recommended ? 'rgba(247,243,234,0.16)' : 'rgba(23,21,18,0.12)' }}>
        <p className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: pkg.recommended ? 'rgba(247,243,234,0.45)' : brand.taupe }}>
          {lang === 'en' ? 'from' : 'από'}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€</span>
          <span className="text-6xl font-light leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{pkg.price}</span>
        </div>
        <p className="mt-2 text-xs" style={{ color: pkg.recommended ? 'rgba(247,243,234,0.45)' : brand.taupe }}>
          {lang === 'en' ? 'one-time setup · year-one hosting included' : 'εφάπαξ setup · hosting πρώτου χρόνου included'}
        </p>
      </div>
      <ul className="flex flex-1 flex-col">
        {pkg.features.map((id) => (
          <FeatureRow key={id} id={id} lang={lang} brand={pkg.recommended ? { ...brand, taupe: 'rgba(247,243,234,0.68)' } : brand} />
        ))}
      </ul>
      <a
        href="#contact"
        className="mt-8 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-black uppercase tracking-[0.18em]"
        style={{
          backgroundColor: pkg.recommended ? brand.bronze : brand.ink,
          color: pkg.recommended ? brand.espresso : brand.stone,
        }}
      >
        {lang === 'en' ? 'Send your listing' : 'Στείλε listing'} <ArrowRight size={15} />
      </a>
    </motion.article>
  );
}
```

- [ ] **Step 4: Replace the exported `PricingSection`**

Use:

```jsx
export default function PricingSection({ lang, brand = FALLBACK_BRAND }) {
  const reduced = useReducedMotion();

  return (
    <section id="pricing" className="px-5 py-24 md:px-10" style={{ backgroundColor: brand.stone }}>
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em]" style={{ color: brand.bronze }}>
              {lang === 'en' ? 'Packages' : 'Πακέτα'}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-light leading-tight md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: brand.ink }}>
              {lang === 'en' ? 'Clear options for a stronger property presence.' : 'Καθαρές επιλογές για πιο δυνατή παρουσία καταλύματος.'}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7" style={{ color: brand.taupe }}>
            {lang === 'en'
              ? 'No hidden agency process. Pick the level that fits your property and we keep the scope clear from the start.'
              : 'Χωρίς κρυφό agency process. Διαλέγουμε το επίπεδο που ταιριάζει στο κατάλυμά σου και κρατάμε το scope καθαρό από την αρχή.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <PricingCard key={pkg.id} pkg={pkg} lang={lang} index={index} reduced={reduced} brand={brand} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-6" style={{ color: brand.taupe }}>
          {lang === 'en'
            ? 'Not sure which fits? Send the listing and I will recommend the practical option.'
            : 'Δεν ξέρεις ποιο ταιριάζει; Στείλε το listing και θα σου προτείνω την πρακτική επιλογή.'}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Remove old add-ons and old package copy**

Delete old `F`, `ADD_ONS`, `PrevTierBadge`, and any unused imports from `src/components/landing/PricingSection.jsx`.

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: build completes with no unused import failures.

- [ ] **Step 7: Commit Task 3**

```bash
git add src/components/landing/PricingSection.jsx
git commit -m "feat: update stayfolio packages"
```

---

### Task 4: Verify UX, Responsive Behavior, And Brand Cleanup

**Files:**
- Modify only if verification finds issues:
  - `src/pages/Landing.jsx`
  - `src/components/landing/PricingSection.jsx`

- [ ] **Step 1: Search for old homepage brand strings**

Run:

```bash
rg "STAYSCAPE|Stayscape|Digital Studio|Our Work|Talk to us|Talk to us first|We Build|Trusted by hosts" src/pages/Landing.jsx src/components/landing/PricingSection.jsx
```

Expected: no matches in the homepage files.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: no errors. If lint reports unrelated existing project issues, record them and still fix any issues from `Landing.jsx` or `PricingSection.jsx`.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: Vite production build completes successfully.

- [ ] **Step 4: Start local dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 5: Browser-check the homepage**

Open the local URL and verify:

- Desktop hero shows `STAYFOLIO`, the headline, subcopy, and both CTAs without overlap.
- Mobile width around 375px shows the hero copy before the page feels visually heavy.
- Navigation menu opens and closes on mobile.
- Language toggle changes EN/GR text.
- Example cards link to existing demo routes.
- Pricing cards are readable and do not overflow.
- Final CTA shows WhatsApp and email actions.

- [ ] **Step 6: Fix any visual issues found**

For common issues, apply these fixes:

```jsx
// If hero headline is too tall on mobile, change the h1 class to:
className="max-w-4xl text-[clamp(2.65rem,15vw,7.6rem)] font-light leading-[0.94]"

// If pricing descriptions create uneven cards, change the package description paragraph to:
className="mt-4 text-sm leading-6 lg:min-h-[96px]"

// If project card text is hard to read, strengthen the overlay:
<div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/25 to-transparent" />
```

- [ ] **Step 7: Final build after fixes**

Run:

```bash
npm run build
```

Expected: build completes successfully.

- [ ] **Step 8: Commit verification fixes**

If files changed during Task 4:

```bash
git add src/pages/Landing.jsx src/components/landing/PricingSection.jsx
git commit -m "fix: polish stayfolio homepage responsiveness"
```

If no files changed, do not create an empty commit.

---

## Self-Review Checklist

- Spec coverage: Tasks cover brand rename, solo-specialist positioning, warm editorial palette, hero, problem, examples, one-specialist value, packages, process, final CTA, bilingual support, and verification.
- Scope: Only homepage and pricing component are changed. Demo property pages remain untouched.
- Placeholder scan: This plan has no TBD/TODO placeholders.
- Type consistency: `PricingSection` receives `brand` from `Landing`; it also has `FALLBACK_BRAND` so it remains usable independently.
- Risk: Existing Greek text in the repo appears mojibake in some files. New code should be entered as UTF-8 and verified in browser after implementation.
