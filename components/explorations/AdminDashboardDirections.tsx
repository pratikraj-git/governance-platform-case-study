'use client';

/**
 * Admin Dashboard Direction Exploration
 * ─────────────────────────────────────
 * Three early directions for what the governance "home" should be.
 * The question wasn't visual — it was: which question should the
 * surface answer first, before the admin asks anything else.
 *
 *   01 · Analytics-first
 *        KPI tiles + charts. Looked competent in screenshots, but
 *        admins don't open a governance surface to read a chart —
 *        they open it to find what needs attention.
 *
 *   02 · Operational workspace list
 *        Attention items + workspaces grouped by posture + activity
 *        feed. Solved the operational question, but the surface was
 *        very horizontal — it could grow into a flat dumping ground.
 *
 *   03 · Health-first command surface  ← shipped
 *        Posture summary at the top, attention immediately below, and
 *        workspaces + activity as supporting regions. The surface has
 *        a centre of gravity, and configuration is a sibling, not a
 *        priority.
 */

import {
  ExplorationSection,
  ExplorationGrid,
  ExplorationCard,
  Bar,
  Chip,
  Region,
} from './_primitives';

export function AdminDashboardDirections() {
  return (
    <ExplorationSection
      id="admin-dashboard"
      eyebrow="Exploration · Admin dashboard"
      title="Three early directions for the governance dashboard."
      description="Each direction picked a different first question the surface should answer: how is the system performing, what is on my plate, or what is the posture right now."
      insight="A dashboard is a question, not a layout. The decision that mattered was choosing which question deserved the centre of the screen."
    >
      <ExplorationGrid>
        <ExplorationCard
          ordinal="01"
          name="Analytics-first"
          verdict="rejected"
          verdictReason="answers a question admins don't ask"
          rationale="KPI tiles and charts above the fold. Looked competent in screenshots, but it answered a reporting question — not the operational one admins open this page to find."
        >
          <AnalyticsFirstWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="02"
          name="Operational workspace list"
          verdict="bridged"
          verdictReason="informed the attention region"
          rationale="Attention at the top, workspaces grouped by posture, activity below. Solved the operational question, but the layout was horizontal — it threatened to grow into a flat dumping ground."
        >
          <OperationalListWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="03"
          name="Health-first command surface"
          verdict="shipped"
          verdictReason="a centre of gravity"
          rationale="Posture summary frames the page, attention sits immediately below, and workspaces + activity support — not compete. Configuration is a sibling, not a priority."
        >
          <CommandSurfaceWireframe />
        </ExplorationCard>
      </ExplorationGrid>
    </ExplorationSection>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 01 · Analytics-first
 *  Top header, row of KPI tiles, two charts side by side, one wide
 *  chart at the bottom. The "BI tool" tell.
 * ──────────────────────────────────────────────────────────────────── */

function AnalyticsFirstWireframe() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Bar width="w-20" height="h-2" tone="strong" />
        <div className="flex items-center gap-2">
          <Chip width="w-10" tone="line" />
          <Chip width="w-3" tone="line" />
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <Region key={i} tone="surface" className="flex flex-col gap-1.5 px-2 py-2">
            <Bar width="w-8" height="h-1" tone="line" />
            <Bar width="w-10" height="h-3" tone="strong" />
            <Bar width="w-6" height="h-1" tone="soft" />
          </Region>
        ))}
      </div>

      {/* Two charts side-by-side */}
      <div className="grid grid-cols-2 gap-1.5">
        <ChartCard />
        <ChartCard />
      </div>

      {/* One wide chart */}
      <div className="flex-1">
        <ChartCard wide />
      </div>
    </div>
  );
}

function ChartCard({ wide = false }: { wide?: boolean }) {
  return (
    <Region tone="surface" className="relative h-full overflow-hidden px-2 py-2">
      <div className="flex items-center justify-between">
        <Bar width="w-12" height="h-1.5" tone="strong" />
        <Bar width="w-6" height="h-1" />
      </div>
      {/* Faux line chart: a few diagonal bars at varying heights */}
      <div className="mt-2 flex h-full items-end gap-1 pb-3">
        {(wide
          ? ['h-3', 'h-4', 'h-5', 'h-3', 'h-6', 'h-4', 'h-7', 'h-5', 'h-8', 'h-6', 'h-9', 'h-7', 'h-10', 'h-8']
          : ['h-3', 'h-4', 'h-5', 'h-4', 'h-6', 'h-5', 'h-7', 'h-6']
        ).map((h, i) => (
          <span
            key={i}
            aria-hidden
            className={`inline-block w-1 rounded-sm bg-line ${h}`}
          />
        ))}
      </div>
    </Region>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 02 · Operational workspace list
 *  Attention strip at top, workspaces grid in middle, activity feed
 *  at bottom. Horizontal stacking, no centre of gravity.
 * ──────────────────────────────────────────────────────────────────── */

function OperationalListWireframe() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Header */}
      <Bar width="w-24" height="h-2" tone="strong" />

      {/* Attention strip — 3 rows */}
      <Region tone="surface" className="flex flex-col gap-1.5 px-2 py-2">
        <div className="flex items-baseline justify-between">
          <Bar width="w-16" height="h-1.5" tone="strong" />
          <Bar width="w-4" height="h-1.5" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-[2px] bg-line-soft px-1.5 py-1"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3"
            />
            <Bar width="w-24" height="h-1.5" />
            <Bar width="w-10" height="h-1.5" className="ml-auto" tone="soft" />
          </div>
        ))}
      </Region>

      {/* Workspaces grid (no posture grouping yet) */}
      <div>
        <Bar width="w-20" height="h-1.5" tone="strong" className="mb-1.5" />
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Region
              key={i}
              tone="surface"
              className="flex flex-col items-start justify-between px-1.5 py-1.5"
            >
              <Bar width="w-8" height="h-1" tone="strong" />
              <span
                aria-hidden
                className="mt-1 inline-block h-1 w-1 rounded-full bg-line-strong"
              />
            </Region>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <Region tone="surface" className="flex flex-1 flex-col gap-1 px-2 py-2">
        <Bar width="w-14" height="h-1.5" tone="strong" className="mb-0.5" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1 w-1 rounded-full bg-ink-4"
            />
            <Bar width={i % 2 === 0 ? 'w-28' : 'w-24'} height="h-1" />
            <Bar width="w-6" height="h-1" className="ml-auto" tone="soft" />
          </div>
        ))}
      </Region>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 03 · Health-first command surface  (shipped)
 *  Posture summary as a header card (the centrepiece). Attention sits
 *  immediately below — operationally relevant, not decorative. Below
 *  that, workspaces by posture, then a small activity feed.
 * ──────────────────────────────────────────────────────────────────── */

function CommandSurfaceWireframe() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-ink-1" />
          <Bar width="w-20" height="h-2" tone="strong" />
        </div>
        <Bar width="w-10" height="h-1.5" />
      </div>

      {/* Posture summary — emphasised */}
      <div
        className="rounded-[3px] border border-ink-1/15 bg-surface p-2"
      >
        <Bar width="w-14" height="h-1.5" tone="strong" className="mb-2" />
        <div className="grid grid-cols-4 gap-1.5">
          {['Identity', 'Lifecycle', 'Audit', 'Resilience'].map((label, i) => (
            <div
              key={label}
              className="flex flex-col items-start gap-1 rounded-[2px] bg-line-soft px-1.5 py-1.5"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-4">
                {label}
              </span>
              <span
                aria-hidden
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  i === 1 ? 'bg-ink-3' : 'bg-line-strong'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Attention region */}
      <Region tone="surface" className="flex flex-col gap-1 px-2 py-2">
        <div className="flex items-baseline justify-between">
          <Bar width="w-16" height="h-1.5" tone="strong" />
          <Bar width="w-4" height="h-1.5" />
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-[2px] bg-line-soft px-1.5 py-1"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3"
            />
            <Bar width="w-24" height="h-1.5" />
            <Bar width="w-10" height="h-1.5" className="ml-auto" tone="soft" />
          </div>
        ))}
      </Region>

      {/* Workspaces by posture */}
      <div className="flex flex-1 gap-1.5">
        <PostureColumn label="Healthy" count={5} />
        <PostureColumn label="Attention" count={2} emphasis />
        <PostureColumn label="Drifted" count={1} />
      </div>
    </div>
  );
}

function PostureColumn({
  label,
  count,
  emphasis = false,
}: {
  label: string;
  count: number;
  emphasis?: boolean;
}) {
  return (
    <Region tone="surface" className="flex flex-1 flex-col gap-1.5 px-1.5 py-1.5">
      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-[8px] uppercase tracking-[0.18em] ${
            emphasis ? 'text-ink-1' : 'text-ink-4'
          }`}
        >
          {label}
        </span>
        <span className="font-mono text-[8px] text-ink-4">{count}</span>
      </div>
      <div className="flex flex-col gap-1">
        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
          <Bar
            key={i}
            width={i === 0 ? 'w-full' : i === 1 ? 'w-3/4' : 'w-2/3'}
            height="h-1.5"
            tone={emphasis ? 'strong' : 'line'}
          />
        ))}
      </div>
    </Region>
  );
}
