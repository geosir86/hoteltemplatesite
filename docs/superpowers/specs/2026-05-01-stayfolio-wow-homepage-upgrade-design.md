# Stayfolio Wow Homepage Upgrade Spec
**Date:** 2026-05-01
**Goal:** Upgrade the Stayfolio homepage from a clear premium landing page into a more cinematic, capability-led experience that immediately shows what Stayfolio can build for Greek stays.

## 1. Context

The current Stayfolio homepage has the right positioning: a solo specialist building premium bilingual websites for Greek villas, Airbnb hosts, and boutique stays. The issue is that the first screen still feels too simple for the promise. A property owner should understand within the first few seconds that Stayfolio can create an elevated online experience, not just a standard website.

The provided reference, `C:\Users\geosi\Downloads\https_hoteltemplatesite-vercel.vercel.app\heroes\HeroAegean.jsx`, uses a strong split cinematic hero: media on the left, editorial copy on the right, film UI details, rotating frames, and kinetic text. That direction fits this upgrade, but the copy and positioning must be adapted away from agency language.

## 2. Design Principle

The homepage should show the product before explaining it.

Primary impression:

> This person can make my property look like a premium hospitality brand online.

The page should combine:

- Luxury hotel film energy.
- Clear solo-specialist positioning.
- Product-demo proof of what gets built.
- Before/after transformation.
- Mobile readability and conversion clarity.

## 3. UI/UX Pro Max Guidance Used

The local `ui-ux-pro-max` skill was run with portable Python using this query:

> premium hospitality landing cinematic Greek stays video first before after transformation luxury editorial

The recommended design system was:

- Primary pattern: `Before-After Transformation`
- Style: `Liquid Glass`
- Color direction: luxury navy / blue + gold service accents
- Typography: `Playfair Display / Inter`, adapted to the existing `Cormorant Garamond / Plus Jakarta Sans` stack for consistency

Additional targeted searches confirmed this task as a hybrid of:

- `Video-First Hero`: hero media should lead, with muted autoplay or frame-based fallback.
- `Product Demo + Features`: show the website capabilities visually, not only as text.
- `Before-After Transformation`: compare generic listing presence with branded Stayfolio presence.
- `Classic Elegant` / `Luxury Serif`: use refined serif headings with clean sans UI text.
- `Parallax Storytelling` only sparingly: use cinematic motion, but avoid heavy scroll effects that hurt performance or accessibility.
- `Liquid Glass` only as a restrained overlay/detail style, not as a full-page visual gimmick.

Important constraints from the skill:

- Animate only 1-2 key elements per view.
- Respect reduced motion.
- Use video captions/labels or image fallback.
- Maintain strong contrast.
- Avoid hover-only important interactions.
- Make mobile touch targets at least 44px.
- Avoid content hidden behind fixed nav.
- Avoid heavy autoplay video loops. Use compressed media, `playsInline`, `muted`, a poster/fallback, and pause or avoid motion when off-screen if implemented.
- Liquid/glass elements must preserve text contrast; no low-opacity glass behind important copy.

## 4. Visual Direction

The previous warm editorial palette remains, but the hero should introduce a more Aegean cinematic accent.

Palette:

| Role | Hex | Use |
|---|---:|---|
| Warm marble | `#F5EFE6` | Hero copy panel background |
| Stone | `#F7F3EA` | General light background |
| Deep ink | `#1A1612` | Main text and dark UI |
| Aegean blue | `#0E5FA8` | Hero kinetic word, frame indicators, Greek identity accent |
| Luxury navy | `#1E3A8A` | Optional deeper blue accent for CTA/focus details |
| Bronze light | `#EBC777` | Film details, divider lines, premium highlight |
| Espresso | `#14110E` | Dark sections and video overlays |
| Taupe | `#6F685F` | Muted body text |

Liquid Glass usage:

- Use only for small overlays: `REC` pill, timecode, frame metadata, mini capability previews, or before/after labels.
- Keep blur moderate: 10-16px.
- Use dark translucent glass over media and light translucent glass over light panels.
- Do not place body paragraphs on weak transparent surfaces.
- No iridescent rainbow treatment; Stayfolio should feel Greek-hospitality premium, not tech demo.

Typography:

- Hero headings: `Cormorant Garamond`, light weight, large but readable.
- Body/UI: `Plus Jakarta Sans`.
- Film metadata: Plus Jakarta Sans, uppercase, small, wide tracking.

## 5. New Homepage Flow

### 5.1 Cinematic Split Hero

Replace the current simple hero with a split hero inspired by the Aegean reference.

Desktop layout:

- Left 58-60%: cinematic media panel.
- Right 40-42%: brand, headline, subcopy, CTA, proof stats.
- Hero should fill most of the first viewport, but must not hide the next section entirely on common desktop screens.

Mobile layout:

- Brand/nav remains at top.
- Cinematic media frame appears first or directly after a short brand line.
- Copy follows immediately below.
- Avoid a giant headline that pushes all explanation below the fold.

Media panel:

- Use a video loop when available.
- Until video is ready, use rotating image frames from existing assets:
  - `/assets/santorini_hero_day.png`
  - `/assets/cyclades_pool.png`
  - `/assets/greek_luxury_terrace_sunset_view_1776942676038.png`
  - `/assets/nisi_hero.png`
- Frame changes every 4.5-5.5 seconds.
- Use opacity and scale only for animation.
- If `useReducedMotion()` is true, do not auto-cycle; show the first frame.

Film details:

- `REC`
- Timecode such as `06:42`, `07:18`, `19:54`, `08:03`
- Location caption such as `Oia · Santorini`, `Caldera · Cyclades`, `Terrace · Athens`, `Cave Suite · Milos`
- Frame counter strip.
- Label: `Listing → Stayfolio`

Hero copy:

Headline EN:

> Your stay deserves more than a listing.

Headline GR:

> Το κατάλυμά σου αξίζει κάτι περισσότερο από ένα listing.

Subcopy EN:

> I build cinematic, bilingual websites for Greek villas, Airbnb hosts, and boutique stays, so their online presence feels as considered as the real stay.

Subcopy GR:

> Φτιάχνω cinematic, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online παρουσία τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.

Primary CTA:

- EN: `See the experiences`
- GR: `Δες εμπειρίες`

Secondary CTA:

- EN: `Send your listing`
- GR: `Στείλε μου το listing`

Kinetic text:

Use a restrained kinetic word module near the headline, not an overactive typewriter effect.

Words:

- `listing`
- `story`
- `atmosphere`
- `experience`
- `brand`

Greek equivalents:

- `listing`
- `ιστορία`
- `ατμόσφαιρα`
- `εμπειρία`
- `brand`

The kinetic word should change slowly every 2.5-3.2 seconds. It must be disabled under reduced motion.

Proof stats:

Use honest capability stats, not fake social proof:

- `2 languages`
- `14-day build cycle`
- `1 specialist`

Greek:

- `2 γλώσσες`
- `14 ημέρες build`
- `1 specialist`

## 6. Before / After Transformation Section

This section should immediately follow the hero.

Purpose:

Show the transformation from generic platform presence to branded Stayfolio experience.

This is the main conversion pattern from `ui-ux-pro-max`, so it should be treated as a major proof section, not a small supporting block.

Structure:

- Section label: `Before / After`
- Headline EN:
  > From another listing to a branded stay experience.
- Headline GR:
  > Από ακόμα ένα listing σε branded εμπειρία καταλύματος.

Visual layout:

- Two side-by-side panels on desktop.
- Stacked panels on mobile.
- Left panel: `Before: another listing`
- Right panel: `After: a Stayfolio experience`

Left panel visual:

- Muted, platform-like card.
- Small generic image strip.
- Plain listing-style metadata.
- Desaturated colors.

Right panel visual:

- Cinematic property preview.
- Branded title, location, gallery detail, inquiry CTA.
- Richer contrast and color.
- Use the same property image so the difference is presentation, not property quality.

Interaction:

- Desktop can have subtle hover reveal.
- Mobile should not depend on hover.
- Optional later enhancement: draggable before/after slider. Do not require it for the first implementation.
- CTA should appear after the transformation reveal:
  - EN: `See what this could become`
  - GR: `Δες πώς μπορεί να γίνει`

## 7. Capability Strip / Bento

Add a “What I can build for you” section after before/after and before examples.

Purpose:

The user should not have to infer capabilities from portfolio cards. The page should name and show the pieces Stayfolio can build.

Section title EN:

> What your property can get online.

Section title GR:

> Τι μπορεί να αποκτήσει online το κατάλυμά σου.

Tiles:

1. `Cinematic homepage`
   - Visual: mini hero frame.
   - Explains first-impression impact.

2. `Premium gallery`
   - Visual: small masonry/image grid.
   - Explains photo presentation and perceived value.

3. `Bilingual story`
   - Visual: EN/GR split text preview.
   - Explains Greek and English presentation.

4. `Direct inquiry flow`
   - Visual: contact/inquiry card.
   - Explains WhatsApp/email/form path.

5. `Mobile-first experience`
   - Visual: phone-like frame.
   - Explains most owners’ guests view on mobile.

Layout:

- Desktop: bento grid with one large tile and four smaller tiles.
- Mobile: stacked cards.
- Cards should be visual, not dense text.
- Use icons from Lucide where needed, but do not make the section icon-only.

## 8. Examples Section Upgrade

Keep existing demo links, but make the section feel more like an immersive atlas than a generic portfolio grid.

Changes:

- Section label: `Stay experiences`
- Headline EN:
  > Different properties. Different moods. One premium standard.
- Headline GR:
  > Διαφορετικά καταλύματα. Διαφορετικά moods. Ένα premium επίπεδο.

Card treatment:

- More poster-like.
- Add type labels:
  - Athens: `Urban stay`
  - Cyclades: `Island villa`
  - Ionian: `Nature retreat`
  - Crete: `Heritage estate`
  - Nisi: `Boutique suite`
  - Greece/Santorini: `Signature escape`
- CTA:
  - EN: `See the experience`
  - GR: `Δες την εμπειρία`

The section should still avoid agency language like “Our Work”.

## 9. Existing Sections

Keep these sections, but adjust visual rhythm if needed:

- One-specialist trust section.
- Packages.
- Process.
- Final CTA.

They should come after the cinematic proof sections. The user must see the “wow” and transformation before pricing.

Recommended order:

1. Cinematic split hero.
2. Before/after transformation.
3. Capability bento.
4. Stay experiences/examples.
5. One specialist.
6. Packages.
7. Process.
8. Final CTA.

## 10. Video Strategy

The implementation must support two media modes:

1. Current fallback: rotating frames from existing assets.
2. Future mode: a locally stored generated video loop.

Expected video path when ready:

- `/assets/stayfolio-hero-loop.mp4`

Implementation should make it easy to switch by defining a hero media configuration object. Do not hardcode video logic across multiple JSX sections.

Video rules:

- Prefer compressed muted loop only when the file is ready and small enough.
- Use `playsInline`, `muted`, `loop`, and a poster image.
- Avoid eager high-resolution autoplay video. Load responsibly.
- Poster image required.
- Dark overlay for text/metadata readability.
- If video fails, fallback to first image frame.
- Respect reduced motion by preferring still poster/frame.
- If practical, pause video when the hero is off-screen.
- Rotating fallback frames should stop under reduced motion.

## 11. Implementation Scope

Primary file:

- `src/pages/Landing.jsx`

Possible helper component split if the file becomes too large:

- `src/components/landing/CinematicHero.jsx`
- `src/components/landing/BeforeAfterTransformation.jsx`
- `src/components/landing/CapabilityBento.jsx`

Preferred approach:

Create focused components if implementation is more than a small patch. The current `Landing.jsx` is already large, so extracting the new hero and proof sections is acceptable and likely cleaner.

Do not modify destination demo pages for this upgrade.

## 12. Acceptance Criteria

- First viewport feels cinematic and materially more impressive than the current simple hero.
- Hero uses split media/copy layout on desktop.
- Hero has rotating frames now and can accept a future video loop.
- Hero copy remains Stayfolio/solo-specialist, not agency.
- Kinetic word is restrained and disabled/reduced under reduced motion.
- Before/after section appears immediately after hero.
- Before/after is visually prominent enough to communicate the core transformation.
- Capability bento appears before examples.
- Examples read as `Stay experiences`, not `Our Work`.
- Page still supports EN/GR.
- No fake social proof is added.
- Mobile layout is readable at 375px with no horizontal scroll.
- Build passes after implementation.
