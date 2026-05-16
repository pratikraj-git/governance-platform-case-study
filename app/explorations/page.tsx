import type { Metadata } from 'next';
import Link from 'next/link';
import { ScimRoleMappingExploration } from '@/components/explorations/ScimRoleMappingExploration';
import { GovernanceNavigationEvolution } from '@/components/explorations/GovernanceNavigationEvolution';
import { AdminDashboardDirections } from '@/components/explorations/AdminDashboardDirections';
import { AdminDashboardScreens } from '@/components/explorations/AdminDashboardScreens';

/**
 * /explorations — preview page for the standalone design-exploration
 * artifacts in `components/explorations/`.
 *
 * Where /workflows hosts architecture diagrams (what the system is),
 * this page hosts wireframe explorations (how the design got there).
 *
 * Intentionally unlisted: not in `lib/constants.SECTIONS`, not linked
 * from the main page, and marked `noindex` so it stays out of search
 * results until an artifact moves into the published case study.
 */

export const metadata: Metadata = {
  title: 'Design explorations',
  description:
    'Three standalone exploration artifacts — SCIM role mapping, governance navigation evolution, and admin dashboard direction. Wireframe-level reasoning about how each surface earned its final shape.',
  robots: { index: false, follow: false },
};

export default function ExplorationsPreviewPage() {
  return (
    <>
      <PreviewBanner />

      <ScimRoleMappingExploration />

      <div className="border-t border-line-soft" aria-hidden />

      <GovernanceNavigationEvolution />

      <div className="border-t border-line-soft" aria-hidden />

      <AdminDashboardDirections />
      <AdminDashboardScreens />

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
            Preview · Design explorations
          </p>
          <h1 className="max-w-[30ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            Three exploration artifacts.
          </h1>
          <p className="max-w-[64ch] text-body-lg text-ink-2 text-pretty">
            Wireframe-level reasoning behind three governance surfaces — role mapping, navigation,
            and the admin dashboard. Each artifact shows the directions that were explored, what
            each one taught the system, and which one earned the place it ships in.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12.5px] text-ink-3">
            <li>
              <a
                href="#scim-role-mapping"
                className="transition-colors hover:text-ink-1"
              >
                SCIM role mapping ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#governance-navigation"
                className="transition-colors hover:text-ink-1"
              >
                Governance navigation ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a
                href="#admin-dashboard"
                className="transition-colors hover:text-ink-1"
              >
                Admin dashboard ↓
              </a>
            </li>
          </ul>
          <p className="mt-2 max-w-[58ch] text-body-sm text-ink-3 text-pretty">
            Not part of the published case study. This page is unindexed; once an exploration
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
