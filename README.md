# Governance Platform — Case Study

> An end-to-end enterprise governance case study: SSO orchestration, SCIM lifecycle, break-glass access, teammate governance, and the operational intelligence layer that unifies them.

This repository is the source for an editorial case-study website (Next.js) that will be hyperlinked from my portfolio. It contains:

- the **case-study website** at the repo root (Next.js · App Router · Tailwind v4 · Framer Motion),
- a separate **interactive Admin Dashboard prototype** (Vite · React 19) under `dashboard-prototype/` that the site embeds or links to,
- the project **context**, all **design artifacts**, and the **PRDs / business documents** that drove the work.

---

## 1. Repository Layout

```
governance-platform-case-study/
├── README.md                       ← you are here
│
├── app/                            ← Next.js App Router (the case-study website)
│   ├── layout.tsx                  ← root layout: fonts, metadata, SiteShell
│   ├── page.tsx                    ← single editorial page composing the 9 sections
│   └── globals.css                 ← Tailwind import + tokens import + base styles
│
├── components/
│   ├── layout/                     ← shell, container, split, sticky rail
│   ├── ui/                         ← header, cards, diagram, workflow frame
│   └── sections/                   ← one file per site section (Hero → Outcomes)
│
├── lib/                            ← cn(), motion primitives, constants
├── styles/                         ← design tokens (Tailwind v4 @theme)
├── public/                         ← static images, fonts (none yet)
│
├── context/                        ← project intent + operating principles
│   ├── project.md                  ← what this case study IS / IS NOT, tone, themes
│   ├── design-principles.md        ← visual & UX rules of engagement
│   └── site-structure.md           ← the 9-section site outline
│
├── assets/                         ← all visual artifacts (organized by module)
│   ├── dashboard/  sso/  scim/  bgu/  teammates/
│
├── docs/                           ← written context (see docs/README.md)
│   ├── README.md                   ← index of every PRD/business doc
│   ├── RECREATION_PROMPT.md        ← interactive dashboard build spec
│   ├── prd/                        ← Product Requirements Documents and design specs
│   └── business-context/           ← business cases, baseline existing-state, explorations
│
└── dashboard-prototype/            ← separate Vite + React 19 + TS app
                                      (the interactive Admin Dashboard — 4 UX options)
```

Excluded from git (kept locally): the original Google-Drive bundle (`Work files/`, `Work files-…zip`) and two PDFs over GitHub's 100 MB per-file limit — see [`docs/README.md`](./docs/README.md).

---

## 2. Tech Stack — Case-Study Website

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript 5.9** |
| UI | **React 19** |
| Styling | **Tailwind v4** via `@tailwindcss/postcss` |
| Design tokens | CSS `@theme` block in [`styles/tokens.css`](./styles/tokens.css) |
| Motion | **Framer Motion 12** — minimal: `revealUp`, `revealStagger`, `fade` |
| Fonts | Inter + JetBrains Mono via `next/font/google` |
| Utility | `clsx` + `tailwind-merge` for `cn()` |

---

## 3. Visual System

Restrained enterprise SaaS. Editorial systems storytelling. Architecture-first.

Hierarchy lives in type and rhythm, not in color or shadow:

| Token group | Where it lives | Examples |
| --- | --- | --- |
| Color | `styles/tokens.css` → `@theme` | `canvas` (warm paper), `surface`, `surface-warm`, `ink-1 … ink-4`, `line-soft / line / line-strong` |
| Type ramp | `styles/tokens.css` | `text-display` (64 / -0.035em), `text-h1` (44), `text-h2` (32), `text-h3` (22), `text-body-lg / body / body-sm`, `text-caption`, `text-eyebrow` (uppercase 12 / 0.16em) |
| Spacing rhythm | `SectionContainer` only | `default = py-24 / md:py-28 / lg:py-36`, `tight`, `flush` |
| Container widths | `SectionContainer` only | `wide = 1240px`, `narrow = 880px`, `prose = 680px` |
| Motion | `lib/motion.ts` only | `revealUp` (8px / 0.6s), `revealStagger` (60ms), `fade` (0.35s); easing `[0.16, 1, 0.3, 1]` |
| Radii | `--radius-sm/--radius/--radius-md/--radius-lg` | `4 / 6 / 8 / 12` px — no rounded-3xl |

What's not in this system: gradients, glassmorphism, drop shadows, dribbble flourishes, scroll-jacked storytelling, fake personas, sticky-note UX-process visuals.

---

## 4. Foundational Components

| Component | Path | Purpose |
| --- | --- | --- |
| `SiteShell` | `components/layout/SiteShell.tsx` | Sticky top nav (brand + section anchors + Source link) + minimal footer |
| `SectionContainer` | `components/layout/SectionContainer.tsx` | The only spacing/width primitive — `wide / narrow / prose` × `default / tight / flush` |
| `EditorialSplitSection` | `components/layout/EditorialSplitSection.tsx` | Left/right storytelling grid; `balanced / text-heavy / visual-heavy`; reversible |
| `StickyInsightRail` | `components/layout/StickyInsightRail.tsx` | Quiet right-side rail with section-level facts; stays sticky on `lg+`, stacks below |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | `eyebrow` · `title` · `description`; animates in via `revealStagger` |
| `ArchitectureCard` | `components/ui/ArchitectureCard.tsx` | Governance modules, operational blocks; variants `default / emphasis / ghost / inverse` |
| `MetricCard` | `components/ui/MetricCard.tsx` | Operational metric; signal dot only when `tone` is set |
| `GovernanceDiagram` | `components/ui/GovernanceDiagram.tsx` | SVG: Admin Orchestration → Governance Layer ↔ SSO/SCIM/RBAC/Audit Logs → Workspaces; dashed connectors animate on viewport entry |
| `WorkflowFrame` (+ `…Placeholder`) | `components/ui/WorkflowFrame.tsx` | Figma-frame-like image container with caption; placeholder variant for the foundation |

---

## 5. Site Structure (9 Sections)

Lives in `components/sections/` and is composed in [`app/page.tsx`](./app/page.tsx):

1. **Hero** — display title, supporting line, 4-up meta strip
2. **Problem Space** — editorial split: header + 4 ghost cards
3. **Governance Architecture** — full-bleed `GovernanceDiagram` + 4-up anchor row
4. **SSO Orchestration** — workflow frame (left) + sticky insight rail (right)
5. **SCIM Lifecycle** — two stacked workflow frames + sticky insight rail
6. **Break-Glass Access** — sticky rail (left) + workflow frame (right)
7. **Teammate Governance** — three stacked workflow frames + sticky insight rail
8. **Operational Intelligence** — dashboard frame + 5-up KPI rail + 6 module cards
9. **Outcomes** — 3-up outcome cards (one `inverse` variant for editorial close)

All copy in the foundation is **working draft** — placeholders that establish rhythm and hierarchy. Final narrative arrives in subsequent phases.

---

## 6. Running the Site

```bash
npm install
npm run dev          # http://localhost:3000
```

Type-check / lint / production build:

```bash
npm run typecheck
npm run lint
npm run build && npm start
```

---

## 7. Running the Interactive Dashboard Prototype

The Vite app under [`dashboard-prototype/`](./dashboard-prototype) is independent:

```bash
cd dashboard-prototype
npm install
npm run dev          # http://localhost:5173
```

It will eventually be embedded in (or linked from) section 07 — Operational Intelligence — once both surfaces are detailed in the next phase.

---

## 8. Operating Principles

Anyone (human or AI) extending this project must read the three files in [`context/`](./context):

- [`context/project.md`](./context/project.md) — what this case study **is** and **is not**
- [`context/design-principles.md`](./context/design-principles.md) — visual & UX rules
- [`context/site-structure.md`](./context/site-structure.md) — the 9-section outline

These are binding.

---

## 9. Status

**Done — foundation phase**

- Repository restructured (Next.js at root; Vite prototype isolated under `dashboard-prototype/`).
- Tailwind v4 design tokens, motion primitives, and layout primitives established.
- All 9 sections scaffolded with reusable components and working-draft placeholders.
- Sticky navigation, anchor scrolling, viewport-triggered reveals working.
- TypeScript strict, ESLint configured, type-check passes.

**Not built yet**

- Final per-section narrative copy.
- Real screenshots placed into each `WorkflowFrame`.
- Live or embedded dashboard prototype inside section 07.
- Deployment + portfolio hyperlink.
