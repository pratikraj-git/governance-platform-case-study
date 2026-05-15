'use client';

/**
 * Governance Navigation Evolution
 * ───────────────────────────────
 * Three navigation models considered as the surface evolved from a
 * settings configuration page into a governance command surface:
 *
 *   01 · Settings-first
 *        Long flat sidebar. Every feature gets a row. Discovery is
 *        alphabetical, and the page that opens on Monday morning is
 *        "General settings" — which is the least operational page
 *        in the system.
 *
 *   02 · Operationally grouped
 *        Sidebar grouped by domain — Identity, Lifecycle, Workspaces,
 *        Audit. Better mental model, but the homepage is still a
 *        configuration page; the surface still optimises for setup,
 *        not for the running system.
 *
 *   03 · Health/intelligence-oriented  ← shipped
 *        The homepage is a governance overview. Configuration is one
 *        click away, but the surface answers the operational question
 *        first: what needs attention, what shifted, what is healthy.
 *
 * Each wireframe is a CSS-only structural mock; the `ExplorationCard`
 * provides the bordered frame.
 */

import {
  ExplorationSection,
  ExplorationGrid,
  ExplorationCard,
  Bar,
  Chip,
  Region,
} from './_primitives';

export function GovernanceNavigationEvolution() {
  return (
    <ExplorationSection
      id="governance-navigation"
      eyebrow="Exploration · Governance navigation"
      title="From a settings page to a governance command surface."
      description="Each direction shifted the centre of gravity of the admin experience — from configuration, to operational domains, to the running state of the system itself."
      surface="warm"
      insight="Navigation isn't a list of features. It's a promise about which question the surface is built to answer first."
    >
      <ExplorationGrid>
        <ExplorationCard
          ordinal="01"
          name="Settings-first"
          verdict="rejected"
          verdictReason="opens to the least operational page"
          rationale="A long, flat list of settings. Every feature is equally visible. The default landing page is configuration — the page no admin opens deliberately."
        >
          <SettingsFirstWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="02"
          name="Operationally grouped"
          verdict="bridged"
          verdictReason="domain model, wrong homepage"
          rationale="Sidebar grouped by governance domain. The mental model improved, but the surface still landed on configuration — operational state lived one click deep, never first."
        >
          <OperationalWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="03"
          name="Health-first command surface"
          verdict="shipped"
          verdictReason="opens to the running system"
          rationale="The homepage is a governance overview. Configuration is one click away, but it answers the operational question first — what changed, what needs attention, what is healthy."
        >
          <HealthFirstWireframe />
        </ExplorationCard>
      </ExplorationGrid>
    </ExplorationSection>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 01 · Settings-first
 *  Left sidebar with ~10 flat rows. One row is "active" (filled).
 *  Right pane shows a generic settings form skeleton.
 * ──────────────────────────────────────────────────────────────────── */

function SettingsFirstWireframe() {
  return (
    <div className="flex h-full gap-3">
      {/* Sidebar */}
      <Region tone="surface" className="flex w-[42%] flex-col gap-1.5 px-2 py-2">
        <Bar width="w-14" height="h-1.5" tone="strong" className="mb-1" />
        {[
          { w: 'w-20', active: false },
          { w: 'w-16', active: false },
          { w: 'w-24', active: false },
          { w: 'w-20', active: true },
          { w: 'w-16', active: false },
          { w: 'w-24', active: false },
          { w: 'w-20', active: false },
          { w: 'w-16', active: false },
          { w: 'w-24', active: false },
          { w: 'w-20', active: false },
        ].map((row, i) => (
          <div
            key={i}
            className={
              row.active
                ? 'rounded-[2px] bg-line px-1.5 py-1'
                : 'rounded-[2px] px-1.5 py-1'
            }
          >
            <Bar
              width={row.w}
              height="h-1.5"
              tone={row.active ? 'strong' : 'line'}
            />
          </div>
        ))}
      </Region>

      {/* Right pane — generic form */}
      <div className="flex flex-1 flex-col gap-3">
        <Bar width="w-24" height="h-2" tone="strong" />
        <Bar width="w-40" height="h-1.5" />
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <Region key={i} tone="surface" className="px-3 py-3">
              <div className="flex flex-col gap-1.5">
                <Bar width="w-12" height="h-1.5" />
                <Bar width="w-2/3" height="h-2" tone="line" />
              </div>
            </Region>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2">
          <Chip width="w-12" tone="ink" />
          <Chip width="w-10" tone="soft" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 02 · Operationally grouped
 *  Sidebar with grouped sections (Identity / Lifecycle / Workspaces /
 *  Audit). Right pane is still a configuration screen — that's the
 *  point of why this direction was "bridged", not "shipped".
 * ──────────────────────────────────────────────────────────────────── */

function OperationalWireframe() {
  return (
    <div className="flex h-full gap-3">
      <Region tone="surface" className="flex w-[42%] flex-col gap-2 px-2 py-2">
        <SidebarGroup
          label="Identity"
          items={[
            { w: 'w-14', active: false },
            { w: 'w-16', active: true },
            { w: 'w-12', active: false },
          ]}
        />
        <SidebarGroup
          label="Lifecycle"
          items={[
            { w: 'w-14', active: false },
            { w: 'w-12', active: false },
          ]}
        />
        <SidebarGroup
          label="Workspaces"
          items={[
            { w: 'w-16', active: false },
            { w: 'w-12', active: false },
          ]}
        />
        <SidebarGroup label="Audit" items={[{ w: 'w-14', active: false }]} />
      </Region>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <Bar width="w-24" height="h-2" tone="strong" />
          <Bar width="w-12" height="h-1.5" />
        </div>
        <Bar width="w-3/4" height="h-1.5" />

        <div className="flex items-center gap-3 border-b border-line-soft pb-2">
          <Bar width="w-10" height="h-1.5" tone="strong" />
          <Bar width="w-12" height="h-1.5" />
          <Bar width="w-10" height="h-1.5" />
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <Region
              key={i}
              tone="surface"
              className="flex items-center justify-between px-3 py-2.5"
            >
              <div className="flex flex-col gap-1">
                <Bar width="w-16" height="h-1.5" tone="strong" />
                <Bar width="w-24" height="h-1.5" />
              </div>
              <Chip width="w-10" tone="line" />
            </Region>
          ))}
        </div>
      </div>
    </div>
  );
}

function SidebarGroup({
  label,
  items,
}: {
  label: string;
  items: { w: string; active?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-4">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {items.map((row, i) => (
          <div
            key={i}
            className={
              row.active
                ? 'rounded-[2px] bg-line px-1.5 py-1'
                : 'rounded-[2px] px-1.5 py-1'
            }
          >
            <Bar
              width={row.w}
              height="h-1.5"
              tone={row.active ? 'strong' : 'line'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 03 · Health-first command surface
 *  Top: posture summary (4 quadrants). Centre: attention strip. Bottom:
 *  small grid of governance domains as drill-in cards. Sidebar is gone
 *  on the home view — replaced by a top-level navigation strip.
 * ──────────────────────────────────────────────────────────────────── */

function HealthFirstWireframe() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-ink-1" />
          <Bar width="w-14" height="h-1.5" tone="strong" />
        </div>
        <div className="flex items-center gap-3">
          <Bar width="w-10" height="h-1.5" />
          <Bar width="w-10" height="h-1.5" />
          <Bar width="w-10" height="h-1.5" />
          <Chip width="w-3" tone="line" />
        </div>
      </div>

      {/* Posture card — 2×2 */}
      <Region tone="surface" className="grid grid-cols-2 gap-1.5 px-2 py-2">
        {['Identity', 'Lifecycle', 'Audit', 'Resilience'].map((label) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-[2px] bg-line-soft px-2 py-1.5"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-4">
              {label}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3"
            />
          </div>
        ))}
      </Region>

      {/* Attention strip */}
      <Region tone="surface" className="flex flex-col gap-1.5 px-2 py-2">
        <div className="flex items-center justify-between">
          <Bar width="w-16" height="h-1.5" tone="strong" />
          <Bar width="w-6" height="h-1.5" />
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-[2px] bg-canvas px-1.5 py-1"
          >
            <span
              aria-hidden
              className="inline-block h-1 w-1 rounded-full bg-ink-3"
            />
            <Bar width="w-24" height="h-1.5" />
            <Bar width="w-10" height="h-1.5" className="ml-auto" tone="soft" />
          </div>
        ))}
      </Region>

      {/* Domain grid */}
      <div className="grid flex-1 grid-cols-3 gap-1.5">
        {['Identity', 'Lifecycle', 'Workspaces'].map((label) => (
          <Region
            key={label}
            tone="surface"
            className="flex flex-col justify-between px-2 py-1.5"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-4">
              {label}
            </p>
            <Bar width="w-3/4" height="h-1.5" tone="strong" />
          </Region>
        ))}
      </div>
    </div>
  );
}
