# Review Notes

Working audit for local review + iteration. Not part of the published case study.

## How to run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. The dev review toolkit is mounted only in development — `next build` strips it from the production bundle.

## Dev review toolkit

| Shortcut    | Effect                                                              |
| ----------- | ------------------------------------------------------------------- |
| `Shift + O` | Toggle section outlines + labels                                    |
| `Shift + G` | Toggle 12-column layout grid overlay                                |
| `Shift + I` | Toggle visual boundaries; click any figure to inspect enlarged      |
| `Shift + R` | Show / hide the floating review panel                               |
| `Esc`       | Close the visual inspector                                          |

---

## What changed in this refinement pass

**Visual storytelling**

- New `FlowDiagram` primitive — monochrome, editorial, mobile-responsive. Four flow diagrams now sit in Problem, Identity, Resilience, and Governance.
- `Figure` refactored with a three-scale system (`hero` / `support` / `detail`) and the Figma-style frame chrome removed. Captions remain; the dot-and-label header did not.
- Each flow diagram carries a short designer insight beneath it.

**Screenshot curation (7 → 5, −29%)**

| Removed | Reason |
|---|---|
| `dashboard/governance-layer-overview.png` | The dead-end "click-to-view" image you flagged. Replaced functionally by Flow D (Governance Command Surface). |
| `scim/token-generate-fetch-and-push.jpg` | Dense Figma board. The insight it carried (blocking modal, cost of regeneration) is already in the SCIM movement copy and the Flow B node ("SCIM provisioning — Tokens, sync, edge states"). |

Five figures remain — one per major design surface — at the smaller, more curated `support` scale by default. None are bigger than necessary.

---

## What changed in the precision refinement pass (v2.2)

**Hero rewritten**

The hero no longer carries autobiographical narration or duration framing ("over a year", "I led"). It is now a calm editorial title page:

- Eyebrow: `Enterprise platform design · Case study`
- H1: `Governance Infrastructure for Enterprise-Scale SaaS Administration`
- Subtext: discipline-led description of governance systems across enterprise-scale SaaS
- Meta strip: Discipline · Scope · Audience · Read time (no personal role attribution)

**Editorial crops on every figure**

`Figure` now accepts two new optional props — `aspect` and `objectPosition` — that turn the frame into a CSS-level crop window over the source image. This solves the central visual problem: the source files in `public/assets/` are large Figma boards (the SSO file is 8302 × 10855; the SCIM role-mapping file is 20215 × 4287), and rendering them at native aspect dumped the whole board.

| Figure | Source aspect | Frame aspect | Anchor | What's shown |
|---|---|---|---|---|
| `sso-setup.jpg` | 0.76 (vertical board) | `16/10` | `center top` | The canonical SSO setup state at the top of the board |
| `setup-group-and-role-attributes.jpg` | 4.72 (horizontal board) | `16/10` | `left center` | The leftmost role-mapping state |
| `bgu-setup.jpg` | 3.50 (horizontal board) | `16/10` | `left center` | The leftmost BGU configuration state |
| `handling-of-different-members.jpg` | 2.20 (multi-state board) | `16/10` | `left center` | The canonical teammates lifecycle table |
| `dashboard/landing-page.jpg` | 1.55 (near single screen) | `16/10` | `center top` | The dashboard, anchored to the top |

The result: every figure now renders as a tight editorial crop, not a Figma board dump. Source files don't need re-exporting to ship.

### Fine-tuning a crop

Open the section file (e.g. `components/sections/IdentityAccess.tsx`) and adjust the props on the `<Figure>`:

```tsx
<Figure
  src="/assets/sso/sso-setup.jpg"
  aspect="16/10"               // or "16/9", "4/3", "3/2", "auto"
  objectPosition="center top"  // or "left center", "50% 18%", etc.
  ...
/>
```

`objectPosition` accepts any CSS object-position value — percentages, keywords, or pixel values — so you can dial each crop precisely.

### When real single-screen exports drop in

When you re-export single screens from Figma and replace the board files at the same paths, just remove `aspect` and `objectPosition` from the corresponding `<Figure>` to let the image render at native aspect. Update `width` / `height` if the new export has different dimensions.

**Logo strip caption removed**

The implementation-facing caption beneath the logo strip is gone. The strip now stands on its eyebrow + wordmarks alone.

---

## Internal-info redaction checklist (do before public deploy)

The screenshots in `public/assets/` are raw Figma exports. Before pushing this site to a public URL, apply the following per-image edits (any image editor — Pixelmator / Photopea / Figma export). Each item lists the **likely sensitive elements** you should crop, blur, or replace with generic placeholders.

### `public/assets/sso/sso-setup.jpg`

- [ ] Replace any **real IdP names** (Okta, Azure AD, OneLogin) in dropdowns with generic "Identity provider".
- [ ] Replace **real domain names** (e.g. `*.whatfix.com`, `*.acme.com`) in metadata URLs with `app.example.com` or similar.
- [ ] Blur **certificate Common Names / SANs** if they reference internal CAs.
- [ ] Blur **entity IDs / ACS URLs** that contain product hostnames.
- [ ] Strip any visible **admin email** in user menus.

### `public/assets/scim/setup-group-and-role-attributes.jpg`

- [ ] Replace **real role names** (e.g. internal naming like "PlatformAdmin_Tier2") with generic editorial labels — "Admin", "Editor", "Viewer".
- [ ] Replace **real IdP group names** (e.g. AD groups like `CN=...,OU=...`) with neutral placeholders — "Engineering · Senior", "Sales · APAC".
- [ ] Blur **SCIM endpoint URLs** that contain product hostnames.
- [ ] Strip the **admin avatar/email** in the top nav.

### `public/assets/bgu/bgu-setup.jpg`

- [ ] Replace any **real admin email addresses** in the Break-Glass user list with `admin-1@example.com`, `admin-2@example.com`.
- [ ] Blur any **internal customer name** in workspace pickers.
- [ ] Strip the **admin avatar** in the top nav.

### `public/assets/teammates/handling-of-different-members.jpg`

- [ ] Replace **all real names + emails** in the teammates table with editorial placeholders (`Alex Lee`, `Sam Patel`, `Robin Ito` etc.).
- [ ] Replace **real role names** with the same generic editorial labels used in the SCIM screenshot.
- [ ] Blur **last-active timestamps** if they reveal product internal cadence.
- [ ] Strip **admin avatar/email** in top nav.

### `public/assets/dashboard/landing-page.jpg`

- [ ] Replace **real workspace names** (likely internal customer slugs) with generic placeholders — "Workspace · North America", "Workspace · APAC retail", etc.
- [ ] Replace **all activity-feed actor names + emails** with editorial placeholders.
- [ ] Replace **any product copy that names features uniquely** ("Whatfix XYZ") with neutral noun phrases ("Governance · Setup", "Audit · Notification").
- [ ] Blur **counts / metrics** that could be reverse-engineered to a real customer.
- [ ] Strip **admin avatar/email** in top nav.

### Once redacted

1. Re-export each at ~2400 px wide, JPEG quality 80, strip EXIF.
2. Drop the redacted files back into `public/assets/...` at the same paths.
3. `next/image` picks them up automatically on next build — no code changes required.

If the image dimensions change materially, update the `width={}` / `height={}` props on the corresponding `<Figure>` in `components/sections/*.tsx`.

---

## Final visual inventory

| Section | Visuals | Notes |
|---|---|---|
| 00 · Hero | none | Type-led, intentional |
| 01 · Problem | **Flow A** | Governance evolution, 4 nodes |
| 02 · Signals | card grid + **logo strip** | Cards carry the substance; logo strip names the industries |
| 03 · Identity | `sso-setup` + `scim-role-mapping` + **Flow B** | Two figures (was three), one flow |
| 04 · Resilience | `bgu-setup` + `teammates` + **Flow C** | Two figures, one flow |
| 05 · Governance | `dashboard-landing` + **Flow D** | One figure (was two), one flow |
| 06 · Reflection | none | Type-led close |

Total: **5 screenshots + 4 flow diagrams + 1 logo strip** across 7 sections.

---

## Customer logo strip (section 02)

A restrained monochrome logo strip sits below the three Signal cards. It currently renders four industries as typographic wordmarks:

```
PHARMA   ·   FINANCIAL SERVICES   ·   GLOBAL RETAIL   ·   ENTERPRISE SOFTWARE
```

The strip's component (`components/ui/LogoStrip.tsx`) supports two render modes per entry:

- **Wordmark** (default) — uppercase, mono-spaced, letter-spaced, ink-3 tone.
- **SVG logo** — if `src: '/assets/logos/{slug}.svg'` is set on the entry, the strip renders the SVG with a desaturate filter to keep it monochrome.

### To swap a wordmark for a real customer logo

1. **Confirm permission.** Use only logos you have explicit rights to publish. If this case study reflects work done at an employer, confirm with that employer first. NDA-covered customer identities **must not** appear.
2. Save the brand SVG to `public/assets/logos/{slug}.svg` — single-color and tightly cropped if possible.
3. In `components/sections/EnterpriseSignals.tsx`, find `CUSTOMER_LOGOS` and update the entry:
   ```ts
   { name: 'Acme Pharmaceuticals', src: '/assets/logos/acme-pharmaceuticals.svg' },
   ```
4. The strip auto-renders the SVG. No layout changes required.

Until each entry gets a `src`, it stays a wordmark — file-by-file upgrade works fine.

See `public/assets/logos/README.md` for SVG conventions.

---

## Spacing rhythm

| Section | Vertical rhythm |
|---|---|
| Hero | self-contained, `min-h-[88svh]` |
| Problem → Reflection | `SectionContainer` default `py-24 md:py-28 lg:py-36` |
| Signals + Governance | also wrapped in `bg-surface-warm` for tonal variation |

---

## Known issues

- **None blocking.** Build passes, lint clean, no console errors expected.
- Source JPGs are still large on disk (some 9–24 MB) — `next/image` optimizes per request, but a one-time compression before public deploy is recommended (see commit notes).

---

## Iteration log

- _empty_
