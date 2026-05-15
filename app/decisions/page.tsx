import type { Metadata } from 'next';
import Link from 'next/link';
import { KeyDecisions } from '@/components/decisions/decisions';

/**
 * /decisions — preview page for the standalone "Key decisions"
 * artifact in `components/decisions/`.
 *
 * Where /workflows hosts architecture diagrams (what the system is)
 * and /explorations hosts wireframe explorations (how the design got
 * there), this page hosts strategic reasoning (why the calls were
 * made). Three sibling preview surfaces, three editorial registers.
 *
 * Intentionally unlisted: not in `lib/constants.SECTIONS`, not linked
 * from the main page, and marked `noindex` so it stays out of search
 * results until the chapter (or individual decisions) move into the
 * published case study.
 */

export const metadata: Metadata = {
  title: 'Key decisions',
  description:
    'Five strategic decisions that shaped the governance surface — written as a self-contained chapter, designed to drop into the case study or to be cited individually inside existing sections.',
  robots: { index: false, follow: false },
};

export default function DecisionsPreviewPage() {
  return (
    <>
      <PreviewBanner />

      <KeyDecisions />

      <BackToCaseStudy />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function PreviewBanner() {
  return (
    <section className="relative w-full border-b border-line-soft bg-surface-warm">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 sm:px-10 md:py-16 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Preview · Key decisions
          </p>
          <h1 className="max-w-[30ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            A working chapter of strategic decisions.
          </h1>
          <p className="max-w-[64ch] text-body-lg text-ink-2 text-pretty">
            Five reusable decision blocks that surface the tradeoffs behind the governance
            platform — centralisation vs. ENT autonomy, identity ownership, operational state,
            lifecycle modelling, and the shape of the admin home. Use the whole chapter, or
            embed individual blocks where they reinforce a surrounding argument.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12.5px] text-ink-3">
            <li>
              <a
                href="#centralised-governance-vs-ent-autonomy"
                className="transition-colors hover:text-ink-1"
              >
                Centralised governance ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#idp-source-of-truth"
                className="transition-colors hover:text-ink-1"
              >
                IdP as source of truth ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#operational-state-in-setup"
                className="transition-colors hover:text-ink-1"
              >
                Operational state in setup ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#governance-beyond-authentication"
                className="transition-colors hover:text-ink-1"
              >
                Beyond authentication ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#operational-intelligence-over-settings"
                className="transition-colors hover:text-ink-1"
              >
                Operational intelligence ↓
              </a>
            </li>
          </ul>
          <p className="mt-2 max-w-[58ch] text-body-sm text-ink-3 text-pretty">
            Not part of the published case study. This page is unindexed; once a decision
            moves into the main narrative, it will be removed from here.
          </p>
        </div>
      </div>
    </section>
  );
}

function BackToCaseStudy() {
  return (
    <section className="relative w-full border-t border-line-soft">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3 px-6 py-12 sm:px-10 md:py-16 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          End of preview
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
