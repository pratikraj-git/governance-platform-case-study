# Governance Platform — Case Study

> Designing a unified governance layer for an enterprise SaaS platform: a single command-center admin dashboard plus the underlying identity, access, and account-lifecycle flows (SSO, SCIM v2.0, Break-Glass User, and Teammates).

This repository is the source for a **case-study website** that will be hyperlinked from my portfolio. It contains both the **narrative case study** (problem framing, design artifacts, decisions) and a **working interactive prototype** of the central deliverable — an enterprise Admin Dashboard with four parallel UX explorations.

---

## 1. The Case Study at a Glance

**Problem.** Enterprise customers needed a single governance surface for the platform: identity (SSO), provisioning (SCIM v2.0), administrative oversight (Admin Dashboard), emergency access (Break-Glass User), and account-lifecycle handling (Teammates). The existing experience scattered these across disconnected screens, leaving admins without a unified operational view.

**Outcome.** A unified governance layer designed end-to-end, anchored by an Admin Dashboard prototype shipped as **four parallel UX explorations** — each containing the same operational coverage but differing in layout, hierarchy, and interaction philosophy, so leadership can compare strategies side-by-side.

**Surfaces designed:**

| Module | What it does | Artifacts |
| --- | --- | --- |
| **Admin Dashboard** | Operational intelligence layer — security health, workspace ops, content governance, AI readiness, deployment pipeline, integration health, recommendations | `design-artifacts/admin-dashboard/`, `prototype/` (interactive, 4 options) |
| **SSO** | Self-serve SSO and End-User Auth setup with provider config, certificate management, and rollout controls | `design-artifacts/sso/` |
| **SCIM v2.0** | Multi-ENT orchestration, token portability, role-mapping, edge cases & error scenarios | `design-artifacts/scim/` |
| **Break-Glass User (BGU)** | Temporary fallback access for emergency administrative recovery when SSO/SCIM is misconfigured | `design-artifacts/bgu/` |
| **Teammates** | Account-lifecycle flows for adding/removing members under both SCIM-enabled and SCIM-disabled regimes | `design-artifacts/teammates/` |

---

## 2. Repository Layout

```
governance-platform-case-study/
├── README.md                          ← you are here
├── docs/
│   └── RECREATION_PROMPT.md           ← full build spec for the dashboard prototype (901 lines, source of truth)
├── design-artifacts/                  ← Figma exports, organized by module
│   ├── admin-dashboard/
│   ├── sso/
│   ├── scim/
│   ├── bgu/
│   └── teammates/
└── prototype/                         ← Vite + React + TypeScript interactive prototype
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig*.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── styles/globals.css
        ├── data/mockData.ts           ← all enterprise mock data
        ├── components/admin/          ← Shell, Drawer, InfoModal, StatusChip
        └── pages/
            ├── AdminDashboard.tsx     ← orchestrator: shell + segmented control + Suspense
            └── dashboards/            ← Option1 / Option2 / Option3 / Option4
```

The original Google-Drive export bundle (`Work files/`, `Work files-...zip`) is preserved on disk but **not committed** — see `.gitignore`. The canonical, deploy-ready images live under `design-artifacts/`.

---

## 3. Interactive Prototype — What It Is

A single-page React app that loads a **shared shell** (sidebar + global header + workspace switcher + Create dropdown) and lets the viewer switch instantly between **four dashboard explorations**:

1. **Option 1 — Executive Command Center**
   KPI strip → priority alerts → 3×2 module grid → governance & activity → recommendations. Drawers for drill-down. *For executive admins.*
2. **Option 2 — Dense Operations Workbench**
   Left section panel (200 px) + right table-heavy detail. *For daily-use power admins.*
3. **Option 3 — Intelligent Operational Orchestration**
   Main vertical flow + sticky 300 px intelligence sidebar with recommendations, alerts, AI insights, quick actions. Insight banners woven between sections. *For AI-governance-led organizations.*
4. **Option 4 — Compact Operational Summary**
   Statuspage-inspired: every domain as a collapsible horizontal strip with inline expansion. Includes approval pipeline tracker + compliance audit trail. **No drawers — everything expands inline.** *For audit-heavy / compliance orgs.*

All four options share the same data, the same modules, and the same operational depth — they differ only in layout strategy, hierarchy, density, and interaction philosophy. Each ships with a **Design Info** modal explaining its 7-point rationale.

The full build spec — exact tokens, type ramp, data shapes, drawer contents, IA, every component dimension — lives in [`docs/RECREATION_PROMPT.md`](./docs/RECREATION_PROMPT.md). That document is the source of truth: any agent extending this codebase should read it top-to-bottom first.

---

## 4. Tech Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Build | Vite 7 | Fast HMR, zero-config TS |
| UI | React 19 + TypeScript 5.9 | Type-safe component model |
| Routing | React Router 7 | Single route today, extensible to nested case-study pages |
| Icons | `@tabler/icons-react` 3 | Consistent enterprise icon set |
| Charts | Recharts 3 | Lightweight trend lines & KPI sparklines |
| Motion | Framer Motion 12 | Drawer slide-ins, modal fades |
| Styling | Tailwind v4 (via PostCSS) for base + **inline `style={{}}` for all option components** | Strict design-token control |
| Utility | `clsx`, `tailwind-merge`, `class-variance-authority` | Composition helpers |

---

## 5. Running the Prototype Locally

```bash
cd prototype
npm install
npm run dev          # serves on http://localhost:5173 (or first free port 5173–5180)
```

Type-check and lint:

```bash
npx tsc --noEmit
npm run lint
```

Production build:

```bash
npm run build        # type-checks then builds to prototype/dist/
npm run preview
```

---

## 6. Deployment Plan

The prototype builds to a static bundle (`prototype/dist/`). Target hosting: **Vercel** (zero-config for Vite) or **Netlify** — whichever the portfolio site already lives on, to keep custom-domain setup simple.

The case-study URL will be hyperlinked from the portfolio under the work-grid entry for this project. The intent is that any visitor can:
1. Read the case-study narrative on the portfolio,
2. Click through to this live prototype,
3. Toggle between the four options and explore every drill-down themselves.

Future routes (e.g., `/case-study/sso`, `/case-study/scim`) can wrap the static Figma exports under `design-artifacts/` with narrative captions, turning this single-page prototype into the full case-study site.

---

## 7. Design Language (Non-Negotiable Tokens)

Restrained enterprise SaaS. No gradients, no glassmorphism, no oversized shadows.

```
Brand orange (CTA):     #C74900 / #E45913
Sidebar background:     #252539
Sidebar active item:    #3D3D52
Surface (page bg):      #FCFCFD
Card background:        #FFFFFF
Border / divider:       #ECECF3
Text heading / body:    #1F1F32 / #3D3C52 / #6B697B / #8C899F

Success:  #198558 on #F1FEF9
Warning:  #AD7900 on #FEFBEB
Info:     #0975D7 on #F0F9FF
Critical: #B3141D on #FFF0F3
Beta:     #7B4EC2 on #F5F0FF
```

Inter, 12 / 13 / 14 / 16 px. 6–8 px radii. 1 px solid `#ECECF3` borders. Only allowed shadow: `0 2px 6px rgba(0,0,0,0.10)` for subtle hover.

Full token list and component dimensions in [`docs/RECREATION_PROMPT.md` §3 & §6–7](./docs/RECREATION_PROMPT.md).

---

## 8. Roadmap (For Upcoming Commands)

The repo is scaffolded; the prototype runs but the four option pages are placeholders. Upcoming commands will:

- [ ] Build `Option1.tsx` per [§10.1](./docs/RECREATION_PROMPT.md) — Executive Command Center (~1000 lines)
- [ ] Build `Option2.tsx` per [§10.2](./docs/RECREATION_PROMPT.md) — Dense Operations Workbench (~1250 lines)
- [ ] Build `Option3.tsx` per [§10.3](./docs/RECREATION_PROMPT.md) — Intelligent Operational Orchestration (~980 lines)
- [ ] Build `Option4.tsx` per [§10.4](./docs/RECREATION_PROMPT.md) — Compact Operational Summary (~850 lines)
- [ ] Wire all six drill-down drawers (Security, Workspace, Content, AI, Deployment, Integration)
- [ ] Add the narrative case-study pages for SSO, SCIM, BGU, Teammates using the artifacts under `design-artifacts/`
- [ ] Configure deployment (Vercel/Netlify) and add the link to the portfolio site
- [ ] Verification pass against [§12 checklist](./docs/RECREATION_PROMPT.md) — TypeScript clean, no console errors, all hover states present, hex tokens exact

---

## 9. License & Use

Personal portfolio case study. All design artifacts are original work produced in an enterprise context; product names and surfaces are illustrative. Not affiliated with or endorsed by any vendor referenced for stylistic inspiration in the spec.
