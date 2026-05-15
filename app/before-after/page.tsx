import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FragmentedToCentralisedGovernance,
  ManualToOrchestratedProvisioning,
  SettingsToOperationalGovernance,
} from '@/components/before-after/comparisons';

/**
 * /before-after — preview page for the standalone "Before vs After"
 * comparison artifacts.
 *
 * Where the sibling preview surfaces show architecture (/workflows),
 * process (/explorations), and strategy (/decisions), this page
 * shows *evolution* — what the surface used to be vs what it became.
 *
 * Intentionally unlisted: not in `lib/constants.SECTIONS`, not linked
 * from the main page, and marked `noindex` so it stays out of search
 * results until a comparison earns a place in the case study.
 */

export const metadata: Metadata = {
  title: 'Before vs After',
  description:
    'Three editorial comparisons of governance evolution — fragmented governance to centralised governance, manual provisioning to orchestrated lifecycle management, settings navigation to operational governance.',
  robots: { index: false, follow: false },
};

export default function BeforeAfterPreviewPage() {
  return (
    <>
      <PreviewBanner />

      <FragmentedToCentralisedGovernance />

      <div className="border-t border-line-soft" aria-hidden />

      <ManualToOrchestratedProvisioning />

      <div className="border-t border-line-soft" aria-hidden />

      <SettingsToOperationalGovernance />

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
            Preview · Before vs After
          </p>
          <h1 className="max-w-[30ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            Three editorial comparisons of governance evolution.
          </h1>
          <p className="max-w-[64ch] text-body-lg text-ink-2 text-pretty">
            Type-led before / after artifacts that name the shifts the governance surface made
            — fragmented to centralised, manual provisioning to orchestrated lifecycle, settings
            navigation to operational governance. Each artifact is a self-contained section,
            ready to drop into the main case study when it earns a place there.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12.5px] text-ink-3">
            <li>
              <a
                href="#fragmented-to-centralised"
                className="transition-colors hover:text-ink-1"
              >
                Fragmented → Centralised ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#manual-to-orchestrated"
                className="transition-colors hover:text-ink-1"
              >
                Manual → Orchestrated ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#settings-to-operational"
                className="transition-colors hover:text-ink-1"
              >
                Settings → Operational ↓
              </a>
            </li>
          </ul>
          <p className="mt-2 max-w-[58ch] text-body-sm text-ink-3 text-pretty">
            Not part of the published case study. This page is unindexed; once a comparison
            earns a place in the main narrative, it will be removed from here.
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
