import type { Metadata } from 'next';
import Link from 'next/link';
import { ScimOrchestrationWorkflow } from '@/components/workflows/ScimOrchestrationWorkflow';
import { ScimOrchestrationScreens } from '@/components/workflows/ScimOrchestrationScreens';
import { SsoBreakGlassWorkflow } from '@/components/workflows/SsoBreakGlassWorkflow';
import { SsoBreakGlassScreens } from '@/components/workflows/SsoBreakGlassScreens';
import { TeammateLifecycleWorkflow } from '@/components/workflows/TeammateLifecycleWorkflow';
import { TeammateLifecycleScreens } from '@/components/workflows/TeammateLifecycleScreens';

/**
 * /workflows — preview page for the standalone workflow artifacts.
 *
 * The artifacts in `components/workflows/` are designed to be dropped
 * into the main case study selectively. This page is the working
 * surface for reviewing them side-by-side, off the main narrative.
 *
 * Intentionally unlisted: not in `lib/constants.SECTIONS`, not linked
 * from the main page, and marked `noindex` via metadata so it stays
 * out of search results until any of the artifacts is moved into the
 * case study proper.
 */

export const metadata: Metadata = {
  title: 'Workflow artifacts',
  description:
    'A working set of reusable architecture artifacts — SCIM orchestration, SSO + break-glass, and teammate lifecycle governance. Designed as drop-in additions to the governance case study.',
  robots: { index: false, follow: false },
};

export default function WorkflowsPreviewPage() {
  return (
    <>
      <PreviewBanner />

      <ScimOrchestrationWorkflow />
      <ScimOrchestrationScreens />

      <div className="border-t border-line-soft" aria-hidden />

      <SsoBreakGlassWorkflow />
      <SsoBreakGlassScreens />

      <div className="border-t border-line-soft" aria-hidden />

      <TeammateLifecycleWorkflow />
      <TeammateLifecycleScreens />

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
            Preview · Workflow artifacts
          </p>
          <h1 className="text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em] font-semibold text-ink-1 text-balance max-w-[30ch]">
            Three reusable architecture artifacts.
          </h1>
          <p className="max-w-[64ch] text-body-lg text-ink-2 text-pretty">
            Standalone, portfolio-grade diagrams of SCIM orchestration, SSO + break-glass access,
            and teammate lifecycle governance. Each artifact is a self-contained section ready to
            drop into the main case study when it earns a place there.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12.5px] text-ink-3">
            <li>
              <a href="#scim-orchestration" className="transition-colors hover:text-ink-1">
                SCIM orchestration ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a href="#sso-break-glass" className="transition-colors hover:text-ink-1">
                SSO + break-glass ↓
              </a>
            </li>
            <li aria-hidden className="font-mono text-ink-4">·</li>
            <li>
              <a href="#teammate-lifecycle" className="transition-colors hover:text-ink-1">
                Teammate lifecycle ↓
              </a>
            </li>
          </ul>
          <p className="mt-2 max-w-[58ch] text-body-sm text-ink-3 text-pretty">
            Not part of the published case study. This page is unindexed; once an artifact moves
            into the main narrative, it will be removed from here.
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
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">End of preview</p>
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
