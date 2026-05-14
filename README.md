# Governance Platform — A Design Case Study

> The design story behind a year of work on enterprise governance — identity,
> access, lifecycle, and operational visibility — and how those surfaces
> slowly began to behave like a single platform.

**By [Pratik Raj](https://www.pratikrdesign.com/)** · Lead Product Designer

---

## Overview

An editorial case study, not a portfolio carousel. The website reads as a
single long-form piece, structured around the actual narrative of the work —
the problem as it emerged, the enterprise signals that shaped it, the design
decisions that landed, and an honest reflection on what the work changed.

Built around **real product screenshots** rather than synthetic mocks, and
written in a designer's voice rather than a PRD's.

### Narrative arc — 7 sections

| # | Section | What it covers |
|---|---|---|
| **00** | Overview | A designer's introduction to the work |
| **01** | The Growing Governance Problem | How governance quietly accumulated into a systems problem |
| **02** | Enterprise Signals | What enterprise customers were actually asking for |
| **03** | Simplifying Identity & Access | SSO + SCIM, brought into one coherent surface |
| **04** | Operational Resilience & Lifecycle | Break-glass access and the teammate lifecycle |
| **05** | Toward Centralized Governance | The dashboard that emerges when surfaces agree |
| **06** | Reflection & Outcomes | What changed, and what was learned |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript 5.9** |
| UI | **React 19** |
| Styling | **Tailwind v4** via `@tailwindcss/postcss` |
| Design tokens | CSS `@theme` in `styles/tokens.css` |
| Motion | **Framer Motion 12** — restrained reveal primitives |
| Image | **`next/image`** — AVIF/WebP, responsive sizes, lazy by default |
| Fonts | Inter + JetBrains Mono via `next/font/google` |
| Deployment | **Vercel** |

---

## Project Structure

```
governance-platform-case-study/
│
├── app/
│   ├── layout.tsx        Root layout — fonts, metadata, SiteShell
│   ├── page.tsx          Single editorial page (7 sections)
│   └── globals.css       Tailwind + tokens + base styles
│
├── components/
│   ├── layout/           SiteShell, SectionContainer, EditorialSplitSection, StickyInsightRail
│   ├── ui/               SectionHeader, Figure, ArchitectureCard, MetricCard, WorkflowFrame
│   ├── sections/         Seven section files (Hero → Reflection)
│   └── dev/              DevReviewTools — dev-only toolkit, dead-stripped from prod
│
├── lib/
│   ├── constants.ts      SITE metadata, SECTIONS nav config
│   ├── motion.ts         Motion primitives (revealUp, revealStagger, fade)
│   └── utils.ts          cn() utility (clsx + tailwind-merge)
│
├── styles/
│   └── tokens.css        Design tokens — color, type, spacing, radii, easing
│
├── public/
│   ├── favicon.svg       Brand mark
│   └── assets/           Real product screenshots — SSO, SCIM, BGU, teammates, dashboard
│
├── context/              Project intent, design principles, site structure
├── docs/                 PRDs and business-context documents (reference only)
│
├── next.config.ts        Image optimization, security headers
├── vercel.json           Vercel deployment configuration
└── .env.example          Environment variable reference
```

---

## Local Setup

**Requirements:** Node.js 18+

```bash
git clone https://github.com/pratikraj-git/governance-platform-case-study.git
cd governance-platform-case-study

npm install

# Optional — portfolio back-link
cp .env.example .env.local
# Edit .env.local → set NEXT_PUBLIC_PORTFOLIO_URL=https://your-portfolio.com

npm run dev
# → http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run lint` | ESLint |

---

## Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pratikraj-git/governance-platform-case-study)

1. Import at [vercel.com/new](https://vercel.com/new)
2. Framework: **Next.js** (auto-detected via `vercel.json`)
3. Optional env var: `NEXT_PUBLIC_PORTFOLIO_URL` activates the header back-link
4. Deploy

`vercel.json` handles clean URLs and trailing-slash normalization.

---

## Design System

Restrained editorial — calm warm canvas, ink hierarchy through type and
weight, no gradients, no glassmorphism, no decorative chrome.

| System | Token file | Examples |
|---|---|---|
| Color | `styles/tokens.css` | `canvas` (#FAFAF7 warm paper), `surface`, `surface-warm`, `ink-1…ink-4`, `line-soft/line/line-strong` |
| Type ramp | `styles/tokens.css` | `text-display` 64px, `text-h1` 44, `text-h2` 32, `text-h3` 22, `text-body-lg/body/body-sm`, `text-eyebrow` 12 / 0.16em tracking |
| Spacing | `SectionContainer` | `default = py-24 md:py-28 lg:py-36` |
| Container widths | `SectionContainer` | `wide = 1240px`, `narrow = 880px`, `prose = 680px` |
| Motion | `lib/motion.ts` | `revealUp` (8px / 0.6s), `revealStagger` (60ms), easing `[0.16, 1, 0.3, 1]` |
| Radii | `tokens.css` | 4 / 6 / 8 / 12 px |

**Not in this system:** gradients, glassmorphism, drop shadows, dramatic
animation, scroll-jacked storytelling.

---

## Visuals

All section visuals are **real product screenshots** rendered through
`next/image` for responsive, AVIF/WebP-optimized delivery. No synthetic
wireframes or AI-generated dashboards.

Screenshots live under `public/assets/`:

```
public/assets/
├── sso/         SSO configuration surface
├── scim/        SCIM token, role mapping, sync states, edge cases
├── bgu/         Break-glass access setup
├── teammates/   Teammate lifecycle table
└── dashboard/   Centralized governance dashboard
```

The dev review toolkit (active in `npm run dev` only) supports
**click-to-zoom** on any figure for inspection during iteration. See
`REVIEW_NOTES.md`.

---

## Dev Review Toolkit (local only)

Mounted from `app/layout.tsx`; dead-stripped from the production bundle via
a `NODE_ENV` check. While running `npm run dev`:

| Shortcut    | Effect                                                            |
| ----------- | ----------------------------------------------------------------- |
| `Shift + O` | Section outlines + labels                                         |
| `Shift + G` | 12-column layout grid overlay                                     |
| `Shift + I` | Visual boundaries — click any figure to inspect enlarged          |
| `Shift + R` | Toggle the floating review panel                                  |
| `Esc`       | Close the visual inspector                                        |

A small jump-to-section panel lives in the bottom-right.

---

## Operating Principles

Anyone extending the project should read the three files in `context/`:

- `context/project.md` — what this case study is and is not
- `context/design-principles.md` — visual and UX rules
- `context/site-structure.md` — section outline

---

## Repository Notes

Excluded from git (kept locally only):

- `Work files/` and `Work files-…zip` — original Google Drive export (~458MB)
- Two PDFs exceeding GitHub's 100MB per-file limit (listed in `.gitignore`)
- `.tools/` — optional portable Node install for shells without npm on PATH

---

*Enterprise platform design · 2026 · Pratik Raj*
