# Governance Platform Case Study — v2 AI Review Brief

**Purpose:** Single markdown document to hand to an AI agent (or human reviewer) for structured feedback on the **current shipped direction** of the case study website.

**Repository:** `https://github.com/pratikraj-git/governance-platform-case-study`  
**Author:** Pratik Raj  
**Portfolio:** `https://www.pratikrdesign.com/` (default back-link target when env is unset)

---

## 1. What this version is

- A **Next.js 15** single-page editorial case study (App Router, TypeScript, Tailwind v4, Framer Motion).
- **Seven sections**, one narrative arc — designed to read as a **design-led** story, not an architecture wiki or PRD.
- **Real product screenshots only** — no synthetic SVG dashboards or wireframe mocks. Images live under `public/assets/` and render through `next/image` (AVIF/WebP, responsive sizes).
- **Unified light editorial tone** — warm canvas (`#FAFAF7`), ink hierarchy via typography; no dark hero, no nav theme switching between dark/light.
- **Designer visibility** — first-person framing in the hero; short “A note from the designer” asides after major visual sections; reflection closes with a personal sign-off.
- **Enterprise validation without marketing** — section 02 uses **three anonymized customer-pattern cards** (industry + role attribution on quotes), not logos or testimonials.

---

## 2. What this version is not

- Not a feature checklist or implementation log.
- Not a metrics / ROI story (reflection explicitly avoids fake numbers).
- Not a separate SaaS marketing site aesthetic (no gradients, glass, flashy motion).

---

## 3. Information architecture (7 sections)

| `#` | DOM `id`     | Nav label   | Editorial title |
|-----|--------------|-------------|-----------------|
| 00  | `hero`       | Overview    | *(hero headline, not in SECTIONS title field)* |
| 01  | `problem`    | Problem     | The Growing Governance Problem |
| 02  | `signals`    | Signals     | Enterprise Signals |
| 03  | `identity`   | Identity    | Simplifying Identity & Access |
| 04  | `resilience` | Resilience  | Operational Resilience & Lifecycle |
| 05  | `governance` | Governance  | Toward Centralized Governance |
| 06  | `reflection` | Reflection  | Reflection & Outcomes |

**Source of truth:** `lib/constants.ts` (`SECTIONS` array).

**Page composition:** `app/page.tsx` imports seven section components in order.

---

## 4. Narrative arc (one paragraph)

Enterprise governance **accumulated** across disconnected admin surfaces. **Enterprise signals** (identity at scale, lifecycle not setup, operational visibility) showed the real pressure. **Identity & access** (SSO + SCIM) were reframed as one coherent layer — read metadata, name states, design token and mapping flows for the long term. **Resilience & lifecycle** (break-glass + teammates) addressed failure modes and day-to-day administration. **Centralized governance** (dashboard) is the consequence when underlying surfaces share a model. **Reflection** closes with outcomes framed as organizational and product shifts, not vanity metrics.

---

## 5. Section-by-section content map

### 00 · Hero (`components/sections/Hero.tsx`, `id="hero"`)

- **Headline:** “Designing a calmer way to govern an enterprise SaaS.”
- **Voice:** First person (“I led…”, “This is the design story…”).
- **Meta strip:** Role, scope, audience, read time (~8 min).
- **Visual:** None (type-led opener).
- **CTA:** “Begin reading” → `#problem`.

### 01 · Problem (`components/sections/ProblemSpace.tsx`, `id="problem"`)

- **Eyebrow:** `01 · The problem`
- **Title:** “The growing governance problem.”
- **Body:** Short paragraphs — governance accumulates; identity / provisioning / roles / audit fragmented; coordination vs UI framing.
- **Pull quote:** Settings page that “grew up.”
- **Three pattern cards:** (1) owned by no one in particular, (2) designed for setup not for living with it, (3) no single operational view.

### 02 · Signals (`components/sections/EnterpriseSignals.tsx`, `id="signals"`)

- **Surface:** `bg-surface-warm`, top/bottom rules for rhythm vs body sections.
- **Title:** “What enterprise customers were actually asking for.”
- **Three signal cards:** A Identity at scale, B Lifecycle not setup, C Operational visibility — each with anonymized quote + attribution (e.g. pharma IT director).
- **Closing paragraph:** Governance as product surface, not a settings page.

### 03 · Identity & Access (`components/sections/IdentityAccess.tsx`, `id="identity"`)

- **Title:** “Simplifying identity and access — without simplifying it away.”
- **Movement A — SSO:** Sticky left column copy; right column **screenshot** `public/assets/sso/sso-setup.jpg` — metadata/cert states, inline legibility.
- **Movement B — SCIM:** Two figures: `public/assets/scim/setup-group-and-role-attributes.jpg`, `public/assets/scim/token-generate-fetch-and-push.jpg`.
- **Designer aside:** “A note from the designer” — patience, read metadata, name state, lifecycle as object, write less.

### 04 · Resilience & Lifecycle (`components/sections/OperationalResilience.tsx`, `id="resilience"`)

- **Title:** “Designing for the day SSO doesn’t work — and the years after it does.”
- **Movement A — Break-glass:** `public/assets/bgu/bgu-setup.jpg` — constraints, SCIM-immune concept, audit notifications.
- **Movement B — Teammates:** `public/assets/teammates/handling-of-different-members.jpg` — lifecycle table, source-of-truth per row.
- **Designer aside:** Resilience + lifecycle as longest-lived admin work.

### 05 · Centralized governance (`components/sections/CentralizedGovernance.tsx`, `id="governance"`)

- **Warm surface** (same pattern as Signals).
- **Title:** “What started as separate features became one operational surface.”
- **Figures:** `public/assets/dashboard/landing-page.jpg`, `public/assets/dashboard/governance-layer-overview.png`.
- **Positioning:** “Monday-morning view” — operational, not analytics BI.
- **Closing blockquote:** Dashboard as surfaces that “finally know about each other.”

### 06 · Reflection (`components/sections/Reflection.tsx`, `id="reflection"`)

- **Title:** “What the work changed — and what I learned.”
- **Four outcome blocks (no fake metrics):** shared language; setup that survives the year; operational visibility not analytics; resilience as constraint.
- **Sign-off:** “In closing” + “— Pratik Raj”.

---

## 6. Screenshot inventory

**Used on the page (7 figures across 3 sections):**

| Public URL path | Section |
|-----------------|---------|
| `/assets/sso/sso-setup.jpg` | Identity |
| `/assets/scim/setup-group-and-role-attributes.jpg` | Identity |
| `/assets/scim/token-generate-fetch-and-push.jpg` | Identity |
| `/assets/bgu/bgu-setup.jpg` | Resilience |
| `/assets/teammates/handling-of-different-members.jpg` | Resilience |
| `/assets/dashboard/landing-page.jpg` | Governance |
| `/assets/dashboard/governance-layer-overview.png` | Governance |

**In repo but not yet wired into the page (candidates for iteration):**

- `/assets/scim/scim-v2-overview.png`
- `/assets/scim/edge-cases-and-error-scenarios.jpg`
- `/assets/teammates/adding-new-when-scim-enabled.jpg`
- `/assets/teammates/adding-new-when-scim-disabled.jpg`

**Implementation:** `components/ui/Figure.tsx` wraps `next/image` with optional frame chrome (label, meta, caption).

**Note:** Source JPGs can be large on disk; `next/image` serves optimized formats to browsers. Optional repo-size step: compress originals (see `REVIEW_NOTES.md`).

---

## 7. Layout & design system (for reviewer context)

- **Tokens:** `styles/tokens.css` — `@theme` (canvas, surface, surface-warm, ink scale, lines, type scale, radii, easing).
- **Section wrapper:** `components/layout/SectionContainer.tsx` — horizontal padding, vertical rhythm (`default` / `tight` / `flush`), max widths (`wide` 1240px, `narrow` 880px, `prose` 680px).
- **Shell:** `components/layout/SiteShell.tsx` — sticky header, scroll progress, footer; nav driven by `SECTIONS`.
- **Motion:** `lib/motion.ts` — `revealUp`, `revealStagger`, `IN_VIEW`; restrained easing.

---

## 8. Tech stack (short)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) |
| Motion | Framer Motion 12 |
| Images | `next/image` |
| Deploy | Vercel (`vercel.json`) |

---

## 9. Environment & local run

```bash
npm install
npm run dev
# → http://localhost:3000
```

- **Optional:** `NEXT_PUBLIC_PORTFOLIO_URL` — portfolio back-link in header/footer (see `.env.example`).
- **Dev-only:** `components/dev/DevReviewTools.tsx` — section outlines, grid overlay, figure zoom (`Shift+O/G/I/R`, `Esc`). Stripped from production via `NODE_ENV`.

---

## 10. Suggested prompts for your AI reviewer

Copy any of these into your agent chat along with this file:

1. **Narrative:** “Does the 7-section arc read as one story? Where does momentum drop?”
2. **Voice:** “Where does copy still sound generic, PRD-like, or over-claimed? Propose shorter replacements.”
3. **Credibility:** “Are the anonymized signals believable without feeling like fake marketing? What would you tighten?”
4. **Visual pacing:** “Is section 03 too image-heavy? Which figure would you demote or merge?”
5. **Portfolio fit:** “Does this feel like a natural extension of a calm personal portfolio site? What one visual or typographic tweak would strengthen that?”
6. **Hiring signal:** “For a Senior+ enterprise product design role, what’s missing in one paragraph — without adding length?”
7. **Accessibility / SEO:** “Review heading hierarchy and image `alt` strategy from the map above; list concrete fixes.”

---

## 11. Key source files (for code-aware review)

| Path | Role |
|------|------|
| `app/page.tsx` | Section order |
| `app/layout.tsx` | Metadata, fonts, `SiteShell`, dev tools mount |
| `lib/constants.ts` | `SITE`, `SECTIONS` |
| `components/layout/SiteShell.tsx` | Nav, footer, scroll progress |
| `components/ui/Figure.tsx` | Screenshot framing |
| `components/ui/SectionHeader.tsx` | Section titles |
| `components/sections/*.tsx` | All copy and composition |
| `styles/tokens.css` | Visual tokens |
| `REVIEW_NOTES.md` | Maintainer notes, optional image compression |

---

## 12. Document version

This brief describes the **v2 editorial direction**: real screenshots, seven sections, unified light tone, designer-led copy. Regenerate or update this file if the IA or section files change materially.

---

*End of AI review brief.*
