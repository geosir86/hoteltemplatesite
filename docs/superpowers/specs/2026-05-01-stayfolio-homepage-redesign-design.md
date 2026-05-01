# Stayfolio Homepage Redesign Spec
**Date:** 2026-05-01
**Goal:** Reposition the homepage from an agency-style Stayscape GR site into Stayfolio: a premium, specialist service by one person building websites for Greek villas, Airbnb hosts, and boutique stays.

## 1. Positioning

Stayfolio is not presented as an agency. It is a small premium brand with a clear personal signature.

Core message:

> Premium websites for Greek stays.

Greek positioning:

> Φτιάχνω premium, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online εικόνα τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.

The homepage should make the solo-specialist model feel like an advantage:

- The owner speaks directly with the person designing and building the site.
- The scope is clear, fast, and personal.
- The service is specialized in hospitality, not generic web design.
- The value is perceived quality and direct-inquiry readiness, not unrealistic booking promises.

## 2. Audience

Primary audience:

- Greek villa owners.
- Airbnb hosts with premium or well-designed properties.
- Boutique suites, guesthouses, and small hospitality businesses.
- Owners who feel their property is better than how it appears on Airbnb, Booking.com, or social media.

The homepage should not primarily target large hotels, generic local businesses, or agencies.

## 3. Sales Angle

Primary pain:

> Το κατάλυμα φαίνεται premium από κοντά, αλλά online μοιάζει σαν άλλο ένα listing.

The page should sell a stronger independent online presence. It can mention direct inquiries, but it should not lead with aggressive “avoid commission” messaging.

Tone:

- Warm.
- Editorial.
- Premium but human.
- Confident without pretending to be a large team.
- Clear and practical, not abstract luxury language.

## 4. Visual Identity

The current black-and-gold agency look should shift toward warm editorial hospitality. The page should feel like stone, linen, bronze, olive, and Greek light, with darker cinematic sections used selectively.

Palette:

| Role | Hex | Use |
|---|---:|---|
| Stone background | `#F7F3EA` | Main page background |
| Main text | `#171512` | Primary headings and body |
| Muted text | `#6F685F` | Secondary copy |
| Bronze accent | `#B8894A` | CTAs, dividers, highlights |
| Dark contrast | `#14110E` | Portfolio and final CTA sections |
| Linen panel | `#E9DFCF` | Soft panels, process blocks |
| Olive detail | `#566B5A` | Sparse supporting accents |

Design constraints:

- Avoid a one-note beige page. Use dark contrast sections and property imagery to create rhythm.
- Avoid fake agency polish: no “we are a studio” language, no oversized generic claims.
- Keep cards restrained: 8px radius or less where possible, except where existing component patterns require otherwise.
- Use Lucide icons for concrete features and actions.
- Make the page readable on mobile before adding dramatic motion.

## 5. Homepage Structure

### 5.1 Navigation

Brand changes from `STAYSCAPE.GR` to `STAYFOLIO`.

Desktop links:

- Examples
- Why Stayfolio
- Packages
- Process
- Contact

CTA:

- EN: `Send your listing`
- GR: `Στείλε το listing σου`

Language toggle remains EN / GR.

The navbar should use a light editorial treatment over light sections and switch to dark/transparent over dark sections only if the implementation can keep contrast reliable. A simpler sticky light navbar is acceptable.

### 5.2 Hero

Goal: Immediately explain what Stayfolio does, who it is for, and why the solo-specialist model is intentional.

Recommended Greek hero copy:

Headline:

> Το κατάλυμά σου αξίζει site αντάξιο της εμπειρίας που προσφέρει.

Subcopy:

> Φτιάχνω premium, δίγλωσσα websites για villas, Airbnb και boutique stays στην Ελλάδα, ώστε η online εικόνα τους να δείχνει όσο προσεγμένη είναι και η πραγματική εμπειρία.

Supporting trust line:

> Ένα καθαρό, προσωπικό process από τον άνθρωπο που σχεδιάζει και χτίζει το site σου.

Primary CTA:

> Δες παραδείγματα

Secondary CTA:

> Στείλε μου το listing σου

English equivalent:

Headline:

> Your stay deserves a site that matches the experience.

Subcopy:

> I build premium bilingual websites for villas, Airbnb hosts, and boutique stays in Greece, so their online presence feels as considered as the real experience.

Supporting trust line:

> A clear, personal process with the person designing and building your site.

Hero layout:

- Editorial two-column layout on desktop.
- Left: brand line, headline, copy, CTA row.
- Right: stacked preview frames or one large property image with two small detail overlays.
- On mobile: copy first, image below.

### 5.3 Problem Section

Headline:

> Από κοντά δείχνει premium. Online όμως χάνεται μέσα στα listings.

Purpose:

Explain that Airbnb/Booking templates make many properties look similar, even when the actual experience is much better.

Content should cover:

- Listings are useful, but they do not build a memorable brand presence.
- A dedicated site gives owners a place to tell the full story.
- Better presentation raises perceived value and makes direct inquiry easier.

This section should be concise, with three short points rather than a long essay.

### 5.4 Demo Builds

Rename the section from “Our Work” to a phrase that avoids agency framing.

Recommended labels:

- GR: `Παραδείγματα online εμπειριών`
- EN: `Example stay experiences`

Supporting copy:

> Demo builds that show how different Greek properties can feel online when they are treated as individual experiences, not just listings.

Existing project cards can remain structurally similar, but should be restyled to fit the warmer brand. The cards should emphasize “what your property could become” rather than “our portfolio.”

Card CTA:

- EN: `View example`
- GR: `Δες παράδειγμα`

### 5.5 Why One Specialist

This section makes the solo model a selling point.

Headline:

> Δεν περνάς από ομάδα. Μιλάς με αυτόν που το φτιάχνει.

Points:

- Direct communication.
- Clear scope and fixed deliverables.
- Faster decisions.
- Hospitality-specific design thinking.
- Personal attention to the property’s photos, tone, and guest profile.

This should not sound apologetic. It should sound like a premium boutique service.

### 5.6 Packages

The existing three package model can stay, but the presentation should become less SaaS-like and more hospitality-owner friendly.

Package direction:

1. `Essential Presence`
   - For hosts who need a polished standalone page.
   - Similar to current Starter.

2. `Direct Inquiry`
   - For owners who want a stronger branded site with inquiry flow.
   - Similar to current Direct Booking.
   - Recommended package.

3. `Signature Stay`
   - For premium villas or boutique stays that need a more cinematic presentation.
   - Similar to current Premium Visual.

Pricing can stay if the user confirms the business model. If pricing remains, write it as clear one-time setup pricing with hosting included for year one.

Avoid overloading cards with long feature lists. Use grouped feature rows and expandable detail only if needed.

### 5.7 Process

Headline:

> Από listing σε live site, χωρίς περίπλοκο agency process.

Steps:

1. `Στέλνεις το υλικό`
   - Listing link, photos, location, basic details.

2. `Σχεδιάζω την online εμπειρία`
   - Structure, copy, visuals, bilingual presentation.

3. `Βγαίνει live`
   - Hosted site, contact buttons, basic tracking, final handoff.

The process should feel low-friction and reassuring.

### 5.8 Final CTA

Headline:

> Θες να δούμε πώς μπορεί να δείχνει το δικό σου κατάλυμα online;

Subcopy:

> Στείλε μου το Airbnb ή Booking listing σου και θα σου πω ποιο πακέτο ταιριάζει, χωρίς πίεση και χωρίς agency sales call.

CTA:

- GR: `Στείλε μου το listing σου`
- EN: `Send your listing`

Contact channels:

- WhatsApp.
- Email.

## 6. Copy Rules

Replace agency language:

- `We build` -> `I build` / `Φτιάχνω`
- `Our work` -> `Examples` / `Παραδείγματα`
- `Talk to us` -> `Talk to me` / `Μίλα μαζί μου`
- `Digital Studio` -> `Premium websites for Greek stays`
- `Trusted by hosts` should be removed unless there is real proof.

Use “Stayfolio” as the brand. Do not use “Stayscape GR” in the homepage UI after the redesign.

## 7. Interaction And UX

Motion:

- Keep motion elegant and subtle.
- Use reveal-on-scroll sparingly.
- Respect `useReducedMotion`.
- Avoid animations that delay reading the hero copy.

CTAs:

- Primary CTA should always lead toward examples or contact.
- The most commercially useful CTA is “Send your listing,” because it creates an easy first action for owners.

Mobile:

- The homepage must be readable and convincing on a phone.
- Avoid oversized hero typography that pushes the explanation too far below the fold.
- Pricing cards should be scannable, not dense.

Accessibility:

- Maintain strong contrast on light and dark sections.
- Keep focus states visible.
- Use real text, not text baked into images.

## 8. Implementation Scope

Primary files likely affected:

- `src/pages/Landing.jsx`
- `src/components/landing/PricingSection.jsx`
- Shared data/constants if brand names are duplicated there.

Do not redesign the destination demo pages in this pass unless required for brand consistency. The current task is the homepage positioning and presentation.

## 9. Acceptance Criteria

- Homepage brand reads as `Stayfolio`, not `Stayscape GR`.
- The page no longer claims or implies a large agency.
- Hero explains the service in one screen on desktop and early on mobile.
- Main visual direction uses the warm editorial palette, with selective dark contrast.
- Sections appear in this order: hero, problem, examples, one-specialist value, packages, process, final CTA.
- CTAs use “Send your listing” / “Στείλε μου το listing σου” as the main contact action.
- Pricing remains understandable, but feels less like generic SaaS cards.
- Existing demo project links remain available.
- Bilingual EN/GR support remains intact.
