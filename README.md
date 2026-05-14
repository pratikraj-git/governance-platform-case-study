# Governance Platform — Case Study

> Designing a unified governance layer for an enterprise SaaS platform: a single command-center Admin Dashboard plus the underlying identity, access, and account-lifecycle surfaces — SSO, SCIM v2.0, Break-Glass User, and Teammates.

This repository is the source for a **case-study website** that will be hyperlinked from my portfolio. It holds the project context, all design artifacts, the PRDs/business documents that drove the work, and the front-end source for the eventual site.

---

## 1. Repository Layout

```
governance-platform-case-study/
├── README.md                       ← you are here
│
├── context/                        ← project intent + operating principles for collaborators / AI agents
│   ├── project.md                  ← what this case study IS / IS NOT, tone, themes
│   ├── design-principles.md        ← visual & UX rules of engagement
│   └── site-structure.md           ← 9-section site outline (Hero → Outcomes)
│
├── assets/                         ← all visual artifacts (Figma exports, hero diagrams)
│   ├── dashboard/                  ← Admin Dashboard screens + governance-layer overview
│   ├── sso/                        ← SSO setup screens
│   ├── scim/                       ← SCIM v2.0 setup, token flow, edge cases
│   ├── bgu/                        ← Break-Glass User setup
│   └── teammates/                  ← Teammates flows (SCIM-enabled, SCIM-disabled, member handling)
│
├── docs/                           ← written context (see docs/README.md)
│   ├── README.md                   ← index of every PRD and business document
│   ├── RECREATION_PROMPT.md        ← interactive Admin Dashboard build spec (source of truth)
│   ├── prd/                        ← Product Requirements Documents and design specs
│   └── business-context/           ← business cases, baseline existing-state, design explorations
│
└── src/                            ← Vite + React 19 + TypeScript front-end
    ├── package.json, vite.config.ts, tsconfig*.json, postcss.config.js, eslint.config.js
    ├── index.html
    └── src/
        ├── main.tsx, App.tsx, styles/globals.css
        ├── data/mockData.ts        ← all enterprise mock data for the dashboard prototype
        ├── components/admin/       ← Shell, Drawer, InfoModal, StatusChip
        └── pages/
            ├── AdminDashboard.tsx  ← orchestrator: shell + segmented control + Design Info modal
            └── dashboards/         ← Option1 / Option2 / Option3 / Option4 (placeholders)
```

Excluded from git (kept locally as backup): the original Google-Drive bundle (`Work files/`, `Work files-…zip`) and two PDFs that exceed GitHub's 100 MB per-file limit — see [`docs/README.md`](./docs/README.md) for details.

---

## 2. Project Surfaces

| Module | Surface designed | Where it lives |
| --- | --- | --- |
| **Admin Dashboard** | Operational intelligence layer — security health, workspace ops, content governance, AI readiness, deployment pipeline, integration health, recommendations | `assets/dashboard/`, `src/` (4 interactive options) |
| **SSO** | Self-serve SSO + End-User Auth setup, provider config, certificate management, rollout controls | `assets/sso/`, `docs/prd/sso-*.pdf` |
| **SCIM v2.0** | Multi-ENT orchestration, token portability, role mapping, edge cases & error scenarios | `assets/scim/`, `docs/prd/scim-v2.0-*.pdf` |
| **Break-Glass User (BGU)** | Temporary fallback access for emergency administrative recovery | `assets/bgu/`, `docs/prd/break-glass-user-*.pdf` |
| **Teammates** | Account-lifecycle flows under both SCIM-enabled and SCIM-disabled regimes | `assets/teammates/`, `docs/prd/teammates-*.pdf` |

---

## 3. Operating Context

Before extending this project, read the three files in [`context/`](./context):

- [`context/project.md`](./context/project.md) — what this case study **is** and **is not**, the tone to maintain, and what to avoid (generic UX process storytelling, fake personas, startup aesthetics).
- [`context/design-principles.md`](./context/design-principles.md) — visual style: restrained enterprise SaaS, modular layouts, governance diagrams; no gradients, no glassmorphism, no flashy motion.
- [`context/site-structure.md`](./context/site-structure.md) — the 9-section outline the website must follow: Hero → Problem Space → Governance Architecture → SSO → SCIM → Break-Glass Access → Teammate Governance → Operational Intelligence → Outcomes.

Any agent or contributor working in this repo should treat those three files as binding direction.

---

## 4. Tech Stack (`src/`)

| Layer | Choice |
| --- | --- |
| Build | Vite 7 |
| UI | React 19 + TypeScript 5.9 |
| Routing | React Router 7 |
| Icons | `@tabler/icons-react` |
| Charts | Recharts |
| Motion | Framer Motion |
| Styling | Tailwind v4 (PostCSS) for base + inline `style={{}}` for dashboard option components |

---

## 5. Running the Front-end

```bash
cd src
npm install
npm run dev          # http://localhost:5173
```

Type-check / lint / production build:

```bash
npx tsc --noEmit
npm run lint
npm run build        # outputs to src/dist/
npm run preview
```

---

## 6. Status

**Done**

- Repository structure (`/context`, `/assets`, `/docs`, `/src`) established.
- All screenshots, flows, PRDs, and governance docs organized with clean naming conventions.
- Operating principles and site structure captured in `/context`.
- Vite + React + TypeScript front-end scaffolded (`src/`), with the Admin Dashboard shell, mock data, and segmented control wired end-to-end. The four dashboard options ship as placeholders.

**Not built yet**

- The case-study website sections (Hero → Outcomes per `context/site-structure.md`).
- Full implementation of the four Admin Dashboard options per `docs/RECREATION_PROMPT.md` §10.
- Public deployment + portfolio hyperlink.

This README and `docs/README.md` are the entry points for any upcoming work.
