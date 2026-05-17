import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * /review — Design deep dives index.
 *
 * A single calm index that lists every deep-dive companion to the main
 * case study. Each entry describes what the page covers and links
 * straight in. The route stays available for anyone who wants to read
 * the deep dives as a set rather than linked from inside the case study.
 */

export const metadata: Metadata = {
  title: 'Design deep dives · Index',
  description:
    'An index of the design deep dives that accompany the governance platform case study — workflows, strategic decisions, design explorations, and governance evolution.',
};

interface DeepDive {
  ordinal: string;
  eyebrow: string;
  title: string;
  href: string;
  description: string;
  sections: string[];
}

const DEEP_DIVES: DeepDive[] = [
  {
    ordinal: '01',
    eyebrow: 'Workflows',
    title: 'Operational workflows behind the platform.',
    href: '/workflows',
    description:
      'Detailed walkthroughs of provisioning, SSO with fallback access, and teammate lifecycle — the workflows that shape day-to-day admin work, with the screens that ship them.',
    sections: [
      'SCIM provisioning across enterprise environments',
      'SSO with fallback access',
      'Teammate lifecycle',
    ],
  },
  {
    ordinal: '02',
    eyebrow: 'Decisions',
    title: 'Strategic decisions behind the platform.',
    href: '/decisions',
    description:
      'Five choices that shaped how the platform behaves — what it models, where control lives, and what the dashboard leads with. The friction that forced each call, what it gave up, and what it made possible.',
    sections: [
      'Organisation-wide visibility, without taking control away',
      'The identity provider as source of truth',
      'System state inside the setup screen',
      'Designing for the years after someone is invited',
      'Opening to posture, not to a settings page',
    ],
  },
  {
    ordinal: '03',
    eyebrow: 'Explorations',
    title: 'How three surfaces earned their shape.',
    href: '/explorations',
    description:
      'Wireframe-level direction studies for role mapping, navigation, and the admin dashboard. Each one shows the alternatives that were considered alongside the direction that shipped.',
    sections: [
      'Role mapping directions',
      'Navigation evolution',
      'Dashboard directions',
    ],
  },
  {
    ordinal: '04',
    eyebrow: 'Evolution',
    title: 'How governance evolved on the platform.',
    href: '/before-after',
    description:
      'Three before / after comparisons of what changed at the platform level — fragmented to organisation-wide visibility, manual to orchestrated provisioning, settings navigation to operational posture.',
    sections: [
      'Fragmented → Organisation-wide visibility',
      'Manual → Orchestrated provisioning',
      'Settings → Operational posture',
    ],
  },
];

export default function DeepDivesIndexPage() {
  return (
    <>
      <IndexHero />
      <DeepDivesList />
      <Footer />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function IndexHero() {
  return (
    <section className="relative w-full border-b border-line-soft bg-surface-warm">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Governance Platform · Design deep dives
          </p>
          <h1 className="max-w-[28ch] text-[clamp(1.875rem,3.6vw,2.5rem)] leading-[1.08] tracking-[-0.025em] font-semibold text-ink-1 text-balance">
            Four deep dives behind the case study.
          </h1>
          <p className="max-w-[64ch] text-body-lg text-ink-2 text-pretty">
            The main case study tells the story. These pages expand on it — the workflows the
            platform runs, the decisions that shaped it, the directions that were explored, and
            how the surfaces evolved.
          </p>
          <div className="mt-2 inline-flex items-baseline gap-3 text-[12.5px]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-ink-2 transition-colors hover:text-ink-1"
            >
              <span aria-hidden>←</span>
              Back to the main case study
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeepDivesList() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-20 sm:px-10 md:py-24 lg:px-16 lg:py-28">
        <ul className="flex flex-col divide-y divide-line-soft">
          {DEEP_DIVES.map((dive) => (
            <li key={dive.href}>
              <DeepDiveRow dive={dive} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DeepDiveRow({ dive }: { dive: DeepDive }) {
  return (
    <Link
      href={dive.href}
      className="group grid grid-cols-1 gap-x-12 gap-y-7 py-12 transition-colors lg:grid-cols-12 lg:gap-y-0 lg:py-16 hover:bg-canvas/40"
    >
      {/* Title column */}
      <header className="flex flex-col gap-4 lg:col-span-5">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            {dive.ordinal}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.20em] text-ink-3">
            {dive.eyebrow}
          </span>
        </div>
        <h2 className="max-w-[22ch] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12] tracking-[-0.018em] font-semibold text-ink-1 text-balance">
          {dive.title}
        </h2>
        <p className="font-mono text-[12px] text-ink-3 transition-colors group-hover:text-ink-1">
          {dive.href}
        </p>
      </header>

      {/* Description + section list column */}
      <div className="flex flex-col gap-6 lg:col-span-6 lg:max-w-[58ch]">
        <p className="text-[15px] leading-[1.65] text-ink-2 text-pretty">
          {dive.description}
        </p>
        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.20em] text-ink-3">
            Inside this page
          </p>
          <ul className="flex flex-col gap-2">
            {dive.sections.map((section) => (
              <li
                key={section}
                className="flex items-baseline gap-3 text-[14px] leading-[1.55] text-ink-3 text-pretty"
              >
                <span
                  aria-hidden
                  className="relative top-[5px] inline-block h-1 w-1 shrink-0 rounded-full bg-line-strong"
                />
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* "Open →" affordance */}
      <div className="flex items-end justify-start lg:col-span-1 lg:items-start lg:justify-end">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3 transition-colors group-hover:text-ink-1">
          Open
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <section className="relative w-full border-t border-line-soft">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3 px-6 py-12 sm:px-10 md:py-14 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          End of index
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-body text-ink-1 transition-colors hover:text-ink-2"
        >
          <span aria-hidden>←</span>
          Back to the main case study
        </Link>
      </div>
    </section>
  );
}
