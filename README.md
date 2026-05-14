# Governance Platform — Enterprise Administration & Operational Infrastructure

> A flagship enterprise platform case study. Documenting the design of a unified governance layer across SSO orchestration, SCIM lifecycle management, break-glass access, teammate governance, and operational intelligence — built for multi-workspace SaaS at enterprise scale.

**By [Pratik Raj](https://github.com/pratikraj-git)** · Senior Product Designer

---

## Overview

This is an end-to-end case study website — not a portfolio carousel, but an architectural narrative. It covers the design of a centralized governance layer that replaced per-workspace identity and access management with a single orchestration plane, federated to enterprise identity providers and projected across every tenant.

The case study is structured as an editorial sequence:

| Section | What it covers |
|---|---|
| **00 · Hero** | The architectural thesis |
| **01 · Problem Space** | Why governance became a systems problem |
| **02 · Governance Architecture** | The unified policy plane and orchestration model |
| **03 · SSO Orchestration** | Certificate lifecycle, setup orchestration, failure taxonomy |
| **04 · SCIM Lifecycle Management** | Token portability, role mapping, sync loop, edge states |
| **05 · Break-Glass Access** | Resilience design — BGU and temporary access |
| **06 · Teammate Governance** | Authority hand-off, lifecycle, ownership transfer |
| **07 · Operational Intelligence** | The governance command center |
| **08 · Outcomes** | Architectural evolution and what scales next |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript 5.9** |
| UI | **React 19** |
| Styling | **Tailwind v4** via `@tailwindcss/postcss` |
| Design tokens | CSS `@theme` in `styles/tokens.css` |
| Motion | **Framer Motion 12** — `revealUp`, `revealStagger`, scroll progress |
| Fonts | Inter + JetBrains Mono via `next/font/google` |
| Deployment | **Vercel** |

---

## Project Structure

```
governance-platform-case-study/
│
├── app/
│   ├── layout.tsx        ← Root layout: fonts, metadata, SiteShell
│   ├── page.tsx          ← Single editorial page (9 sections composed)
│   └── globals.css       ← Tailwind import + token import + base styles
│
├── components/
│   ├── layout/           ← SiteShell, SectionContainer, EditorialSplitSection
│   ├── ui/               ← SectionHeader + 14 custom diagram/visualization components
│   └── sections/         ← One file per section (Hero → Outcomes)
│
├── lib/
│   ├── constants.ts      ← SITE metadata, SECTIONS nav config
│   ├── motion.ts         ← Framer Motion primitives (revealUp, revealStagger, fade)
│   └── utils.ts          ← cn() utility (clsx + tailwind-merge)
│
├── styles/
│   └── tokens.css        ← Design tokens: color, typography, spacing, radii, easing
│
├── public/
│   └── favicon.svg       ← Architectural brand mark (SVG, renders at any size)
│
├── context/              ← Project intent, design principles, site structure (binding)
├── assets/               ← Visual artifacts (sso/, scim/, bgu/, dashboard/, teammates/)
├── docs/                 ← PRDs, business context documents
│
├── next.config.ts        ← Image optimization, security headers, package import opts
├── vercel.json           ← Vercel deployment configuration
├── .env.example          ← Environment variable reference
└── dashboard-prototype/  ← Separate Vite + React 19 interactive prototype
```

---

## Local Setup

**Requirements:** Node.js 18+

```bash
# Clone
git clone https://github.com/pratikraj-git/governance-platform-case-study.git
cd governance-platform-case-study

# Install
npm install

# (Optional) configure the portfolio back-link
cp .env.example .env.local
# Edit .env.local → set NEXT_PUBLIC_PORTFOLIO_URL=https://your-portfolio.com

# Run development server
npm run dev
# → http://localhost:3000
```

**Other commands:**

```bash
npm run build        # Production build
npm run start        # Serve production build locally
npm run typecheck    # TypeScript check (no emit)
npm run lint         # ESLint
```

---

## Deployment (Vercel)

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pratikraj-git/governance-platform-case-study)

### Manual

1. Import the repository at [vercel.com/new](https://vercel.com/new)
2. Framework: **Next.js** (auto-detected via `vercel.json`)
3. Add environment variable (optional):
   - `NEXT_PUBLIC_PORTFOLIO_URL` → your portfolio URL (activates the header back-link)
4. Deploy

The `vercel.json` at the root handles clean URLs and trailing-slash normalization. No additional config required.

---

## Design System

Restrained enterprise SaaS. Hierarchy through type, weight, and rhythm — not color or shadow.

| System | Token file | Examples |
|---|---|---|
| Color | `styles/tokens.css` | `canvas` (#FAFAF7 warm paper), `surface`, `ink-1…ink-4`, `line-soft/line/line-strong`, `signal-positive/attention/critical` |
| Type ramp | `styles/tokens.css` | `text-display` (64px / −0.035em), `text-h1` (44), `text-h2` (32), `text-h3` (22), `text-body-lg/body/body-sm`, `text-eyebrow` (12 / uppercase / 0.16em tracking) |
| Spacing | `SectionContainer` only | `default = py-24 md:py-28 lg:py-36`, `tight`, `flush` |
| Container widths | `SectionContainer` only | `wide = 1240px`, `narrow = 880px`, `prose = 680px` |
| Motion | `lib/motion.ts` only | `revealUp` (8px / 0.6s), `revealStagger` (60ms stagger), `fade` (0.35s); easing `[0.16, 1, 0.3, 1]` |
| Radii | `tokens.css` | 4 / 6 / 8 / 12 px — no rounded-3xl |

**Not in this system:** gradients, glassmorphism, drop shadows, dribbble aesthetics, scroll-jacked storytelling.

---

## Operating Principles

Anyone extending this project must read the three files in `context/`:

- `context/project.md` — what this case study is and is not
- `context/design-principles.md` — visual and UX rules
- `context/site-structure.md` — the 9-section outline

---

## Custom UI Components

All built from scratch. No component library dependencies.

| Component | What it visualizes |
|---|---|
| `GovernanceDiagram` | Full architecture map: IdP → Governance Layer → Workspaces |
| `GovernanceStack` | Vertical plane hierarchy (used in Hero) |
| `FragmentationGrid` | Per-workspace administration "before" state |
| `OrchestrationFlow` | N-stage horizontal setup flow (SSO, SCIM) |
| `CertLifecyclePanel` | Four X.509 observable states |
| `TokenPortabilityDiagram` | One-to-many SCIM token sharing |
| `RoleMappingRules` | Attribute-driven role mapping with resolution logic |
| `SCIMSyncFlow` | End-to-end provisioning orchestration loop (SVG) |
| `FallbackLoginMock` | Dual-path login entry for Break-Glass |
| `TempAccessTimeline` | T+0 → T+90 temporary access lifecycle |
| `TeammatesTable` | Canonical user types with authority source column |
| `AuthorityHandoffDiagram` | SCIM-off vs SCIM-on admin capability matrix |
| `CommandCenterMock` | Org-level governance command center |
| `EvolutionLadder` | Before → After architectural transformation |
| `PrincipleRow` | Five-up principle ribbon |

---

## Repository Notes

The following are excluded from git (kept locally only):

- `Work files/` and `Work files-…zip` — original Google Drive export (~458MB)
- Two PDFs exceeding GitHub's 100MB per-file limit (listed in `.gitignore`)

The `dashboard-prototype/` directory is a separate Vite + React 19 app and requires its own `npm install` inside that directory.

---

*Enterprise Platform Design · 2026 · Pratik Raj*
