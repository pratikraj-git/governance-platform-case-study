import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * /review — the local review surface.
 *
 * A single editorial index that lists every standalone artifact
 * family built outside the published case study, with a one-line
 * description and a deep link to each preview page. Use this while
 * iterating: open `/review`, click into the preview that needs
 * attention, refine, come back.
 *
 * Marked `noindex` like every other preview surface.
 */

export const metadata: Metadata = {
  title: 'Artifact review',
  description:
    'Local review index for every standalone artifact family attached to the governance case study — architecture, process, strategy, and evolution.',
  robots: { index: false, follow: false },
};

const ARTIFACT_FAMILIES: ArtifactFamily[] = [
  {
    ordinal: '01',
    eyebrow: 'Architecture',
    title: 'Workflow artifacts',
    href: '/workflows',
    description:
      'Three architecture diagrams — SCIM orchestration across enterprise tenants, SSO with a quietly-engineered fallback path, and teammate lifecycle as a governed state machine.',
    artifacts: [
      'SCIM orchestration workflow',
      'SSO + break-glass workflow',
      'Teammate lifecycle workflow',
    ],
  },
  {
    ordinal: '02',
    eyebrow: 'Process',
    title: 'Design explorations',
    href: '/explorations',
    description:
      'Three wireframe-level explorations comparing the directions considered before each surface earned its final shape — rejected, bridged, shipped.',
    artifacts: [
      'SCIM role mapping exploration',
      'Governance navigation evolution',
      'Admin dashboard direction exploration',
    ],
  },
  {
    ordinal: '03',
    eyebrow: 'Strategy',
    title: 'Key decisions',
    href: '/decisions',
    description:
      'Five reusable decision blocks that surface the strategic tradeoffs behind the governance surface — type-led, no chrome, interview-friendly copy.',
    artifacts: [
      'Centralised governance vs ENT autonomy',
      'IdP as source of truth',
      'Operational state inside setup',
      'Governance beyond authentication',
      'Operational intelligence over settings',
    ],
  },
  {
    ordinal: '04',
    eyebrow: 'Evolution',
    title: 'Before vs After',
    href: '/before-after',
    description:
      'Three editorial comparisons of governance evolution — what the surface used to be vs what it became, named in operational language.',
    artifacts: [
      'Fragmented → Centralised governance',
      'Manual provisioning → Orchestrated lifecycle',
      'Settings navigation → Operational governance',
    ],
  },
];

export default function ReviewIndexPage() {
  const totalArtifacts = ARTIFACT_FAMILIES.reduce(
    (sum, family) => sum + family.artifacts.length,
    0,
  );

  return (
    <>
      <ReviewBanner totalArtifacts={totalArtifacts} />
      <ArtifactFamiliesList />
      <Footer />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

interface ArtifactFamily {
  ordinal: string;
  eyebrow: string;
  title: string;
  href: string;
  description: string;
  artifacts: string[];
}

function ReviewBanner({ totalArtifacts }: { totalArtifacts: number }) {
  return (
    <section className="relative w-full border-b border-line-soft bg-surface-warm">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Local review · Artifact index
          </p>
          <h1 className="max-w-[32ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.08] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            Four standalone artifact families. {totalArtifacts} reusable sections.
          </h1>
          <p className="max-w-[68ch] text-body-lg text-ink-2 text-pretty">
            Every artifact lives outside the published case study at its own preview route.
            Each family is type-led, internally consistent, and ready to drop into the main
            narrative when it earns a place there. The published case study at{' '}
            <Link href="/" className="text-ink-1 underline decoration-line-strong underline-offset-[3px] transition-colors hover:decoration-ink-1">
              the home page
            </Link>{' '}
            is not modified by anything below.
          </p>
        </div>
      </div>
    </section>
  );
}

function ArtifactFamiliesList() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-20 sm:px-10 md:py-24 lg:px-16 lg:py-28">
        <ul className="flex flex-col divide-y divide-line-soft">
          {ARTIFACT_FAMILIES.map((family) => (
            <li key={family.href}>
              <ArtifactFamilyRow family={family} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArtifactFamilyRow({ family }: { family: ArtifactFamily }) {
  return (
    <Link
      href={family.href}
      className="group grid grid-cols-1 gap-x-12 gap-y-7 py-12 transition-colors lg:grid-cols-12 lg:gap-y-0 lg:py-16 hover:bg-canvas/40"
    >
      {/* Title column */}
      <header className="flex flex-col gap-4 lg:col-span-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            {family.ordinal}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.20em] text-ink-3">
            {family.eyebrow}
          </span>
        </div>
        <h2 className="max-w-[18ch] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.018em] font-semibold text-ink-1 text-balance">
          {family.title}
        </h2>
        <p className="font-mono text-[12px] text-ink-3 transition-colors group-hover:text-ink-1">
          {family.href}
        </p>
      </header>

      {/* Description + artifact list column */}
      <div className="flex flex-col gap-6 lg:col-span-6 lg:max-w-[58ch]">
        <p className="text-[15px] leading-[1.65] text-ink-2 text-pretty">
          {family.description}
        </p>
        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.20em] text-ink-3">
            Artifacts ({family.artifacts.length})
          </p>
          <ul className="flex flex-col gap-2">
            {family.artifacts.map((artifact) => (
              <li
                key={artifact}
                className="flex items-baseline gap-3 text-[14px] leading-[1.55] text-ink-3 text-pretty"
              >
                <span
                  aria-hidden
                  className="relative top-[5px] inline-block h-1 w-1 shrink-0 rounded-full bg-line-strong"
                />
                <span>{artifact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* "Review →" affordance */}
      <div className="flex items-end justify-start lg:col-span-1 lg:items-start lg:justify-end">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors group-hover:text-ink-1">
          Review
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <section className="relative w-full border-t border-line-soft">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 px-6 py-12 sm:px-10 md:py-14 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          End of review index
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-ink-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-1 transition-colors hover:text-ink-2"
          >
            <span aria-hidden>←</span>
            Back to the case study
          </Link>
          <span aria-hidden className="font-mono text-ink-4">·</span>
          <span>
            Each preview route is{' '}
            <code className="font-mono text-[12px] text-ink-2">noindex</code>; promote artifacts
            into the case study individually as they earn a place there.
          </span>
        </div>
      </div>
    </section>
  );
}
