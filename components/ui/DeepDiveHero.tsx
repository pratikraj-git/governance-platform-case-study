import Link from 'next/link';

/**
 * DeepDiveHero — shared opening for every "design deep dive" page.
 *
 * Replaces the previous per-page "Preview · …" banners with one calm,
 * public-facing hero. The shape is fixed (eyebrow / heading / body /
 * chips), so every deep-dive route reads as part of the same portfolio.
 *
 *   • Eyebrow is always the brand-level line — never a preview tag.
 *   • Heading is short and operational; one line of meaning.
 *   • Body explains, in plain language, what the reader will find on
 *     the page. Two paragraphs, never more.
 *   • Chips are jump links to the named sections below.
 *   • A small "Back to case study" link sits beside the chips.
 *
 * The component is intentionally markup-only — no motion, no chrome.
 * The page sections below it carry the visual texture.
 */

export interface DeepDiveHeroChip {
  href: string;
  label: string;
}

export interface DeepDiveHeroProps {
  /** Short operational heading. One line of meaning. */
  heading: React.ReactNode;
  /** First body paragraph — what this page is about. */
  intro: React.ReactNode;
  /** Second body paragraph — what the reader will find. */
  expandsOn: React.ReactNode;
  /** Jump links to the named sections on this page. */
  chips: DeepDiveHeroChip[];
}

export function DeepDiveHero({
  heading,
  intro,
  expandsOn,
  chips,
}: DeepDiveHeroProps) {
  return (
    <section className="relative w-full border-b border-line-soft bg-surface-warm">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Governance Platform · Design deep dives
          </p>
          <h1 className="max-w-[26ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            {heading}
          </h1>

          <div className="flex max-w-[64ch] flex-col gap-4 text-body-lg text-ink-2 text-pretty">
            <p>{intro}</p>
            <p className="text-body text-ink-3">{expandsOn}</p>
          </div>

          {/* Section chips + back-to-case-study link.
              Renders as a single calm row that wraps cleanly on mobile. */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-3 text-[12.5px]">
            {chips.map((chip, i) => (
              <span key={chip.href} className="inline-flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="font-mono text-ink-4">·</span>
                )}
                <a
                  href={chip.href}
                  className="text-ink-2 underline-offset-4 transition-colors hover:text-ink-1 hover:underline"
                >
                  {chip.label}
                </a>
              </span>
            ))}
            <span aria-hidden className="font-mono text-ink-4">·</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-ink-3 transition-colors hover:text-ink-1"
            >
              <span aria-hidden>←</span>
              Back to case study
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  DeepDiveFooter — quiet end-of-page link back to the case study.
 *  Replaces the old "End of preview" footer used on every artifact page.
 * ──────────────────────────────────────────────────────────────────── */

export function DeepDiveFooter() {
  return (
    <section className="relative w-full border-t border-line-soft">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3 px-6 py-12 sm:px-10 md:py-16 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          End of deep dive
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body text-ink-1 transition-colors hover:text-ink-2"
        >
          <span aria-hidden>←</span>
          Back to the case study
        </Link>
      </div>
    </section>
  );
}
