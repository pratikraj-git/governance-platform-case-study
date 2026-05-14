# Customer / industry logos

Place customer brand SVGs in this directory, one per file.

## Naming convention

`{slug}.svg` — lowercase, hyphenated, no spaces.

Examples:

```
acme-pharmaceuticals.svg
globalbank.svg
nordic-retail.svg
enterprise-software-co.svg
```

## SVG requirements

- **Single-color, monochrome** if possible. The `LogoStrip` component applies a `grayscale(1) brightness(0.55)` CSS filter to colored SVGs, but a true monochrome source always reads cleaner.
- **No fixed `fill="..."`** on the root `<svg>` — let CSS or the wordmark color cascade through. If the source SVG has hardcoded brand color, that's fine; the filter handles it.
- **Cropped tight** — no whitespace padding around the mark. The strip's row height controls the rendered size.
- **Height 24–32 px** native is plenty. The component renders at `h-6 sm:h-7` (24px → 28px).

## Wiring

In `components/sections/EnterpriseSignals.tsx`, find `CUSTOMER_LOGOS` and update the relevant entry:

```ts
const CUSTOMER_LOGOS: LogoEntry[] = [
  { name: 'Acme Pharmaceuticals', src: '/assets/logos/acme-pharmaceuticals.svg' },
  // …
];
```

Until you add `src`, the entry falls back to a typographic wordmark using the `name`. This means the strip always renders — incremental upgrades work file-by-file.

## Permission reminder

Before pushing real customer logos to a public URL, confirm:

- [ ] You have explicit permission to use the logo publicly (employer / customer / agency).
- [ ] The logo is current — not a deprecated brand mark.
- [ ] Use does not imply a relationship, endorsement, or testimonial.
- [ ] No NDA covering the customer's identity is in force.

If any of the above is uncertain, fall back to the typographic wordmark (omit `src`) — it preserves the editorial signal without naming a brand.
