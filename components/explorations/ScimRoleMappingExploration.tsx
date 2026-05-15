'use client';

/**
 * SCIM Role Mapping Exploration
 * ─────────────────────────────
 * Three directions explored before the final role-mapping surface
 * earned its place. The progression isn't UX cosmetics — it's a real
 * data-model conversation:
 *
 *   01 · Flat list
 *        One row per IdP group, one role per dropdown. Cheap to build.
 *        Falls over the moment two rules can disagree.
 *
 *   02 · Rule-based with precedence
 *        Numbered rules evaluated in order. Solves precedence, but
 *        users have to read a procedural list to predict the outcome.
 *
 *   03 · Source-of-truth, layered  ← shipped
 *        IdP groups read directly. Rules sit between groups and roles
 *        with explicit precedence. The IdP is visibly upstream.
 *
 * The wireframes are structural mocks, not images: every block is a
 * div, every text-line is a small grey bar. The shipped direction
 * carries a deeper border so it reads as "the one that earned this".
 */

import {
  ExplorationSection,
  ExplorationGrid,
  ExplorationCard,
  Bar,
  Chip,
  Region,
} from './_primitives';

export function ScimRoleMappingExploration() {
  return (
    <ExplorationSection
      id="scim-role-mapping"
      eyebrow="Exploration · SCIM role mapping"
      title="Three directions for mapping enterprise groups to platform roles."
      description="Each direction solved a different fragment of the same problem — precedence, scale, and where the source of truth lives. The shipped surface is the one that finally admitted the IdP is upstream."
      insight="The system didn't become simpler by hiding complexity — it became simpler by naming where complexity already lives, and refusing to pretend otherwise."
    >
      <ExplorationGrid>
        <ExplorationCard
          ordinal="01"
          name="Flat list"
          verdict="rejected"
          verdictReason="no precedence"
          rationale="One IdP group per row, one role per dropdown. Cheap to build, but two rows can silently disagree — and the admin has no way to predict which one wins."
        >
          <FlatListWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="02"
          name="Rule-based with precedence"
          verdict="bridged"
          verdictReason="taught us order matters"
          rationale="Numbered rules evaluated top to bottom. Precedence becomes explicit, but the admin has to mentally run the list to know what any one teammate ends up with."
        >
          <RuleListWireframe />
        </ExplorationCard>

        <ExplorationCard
          ordinal="03"
          name="Source-of-truth, layered"
          verdict="shipped"
          verdictReason="IdP held upstream"
          rationale="IdP groups are read directly, mapping rules carry precedence, and roles + workspaces sit downstream. The data model finally agrees with how enterprises already think about identity."
        >
          <LayeredWireframe />
        </ExplorationCard>
      </ExplorationGrid>
    </ExplorationSection>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 01 · Flat list
 *  Six rows of (group → role) with a small "Add row" affordance.
 * ──────────────────────────────────────────────────────────────────── */

function FlatListWireframe() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Tiny header bar with two column labels */}
      <div className="flex items-center justify-between">
        <Bar width="w-16" height="h-1.5" tone="strong" />
        <Bar width="w-12" height="h-1.5" tone="strong" />
      </div>

      {/* Rows */}
      <div className="flex flex-1 flex-col gap-2">
        {[
          'w-24',
          'w-20',
          'w-28',
          'w-24',
          'w-20',
        ].map((w, i) => (
          <Region key={i} tone="surface" className="flex items-center justify-between px-3 py-2">
            <Bar width={w} height="h-2" />
            <Chip width="w-14" tone="line" />
          </Region>
        ))}
      </div>

      {/* "+ Add row" footer */}
      <div className="flex items-center gap-2 pt-1">
        <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-line-strong" />
        <Bar width="w-14" height="h-1.5" tone="strong" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 02 · Rule list with precedence
 *  Numbered rows. A tiny "rules evaluated top → bottom" hint at top.
 * ──────────────────────────────────────────────────────────────────── */

function RuleListWireframe() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Top hint */}
      <div className="flex items-center gap-2">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3" />
        <Bar width="w-32" height="h-1.5" tone="strong" />
      </div>

      {/* Rule rows */}
      <div className="flex flex-1 flex-col gap-2">
        {['01', '02', '03', '04', '05'].map((n, i) => (
          <Region key={n} tone="surface" className="flex items-center gap-3 px-3 py-2">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-4">
              {n}
            </span>
            <Bar width={i % 2 === 0 ? 'w-20' : 'w-24'} height="h-2" />
            <span
              aria-hidden
              className="ml-auto inline-block h-px w-6 bg-line-strong"
            />
            <Chip width="w-10" tone="line" />
          </Region>
        ))}
      </div>

      {/* Validation footer */}
      <div className="flex items-center justify-between border-t border-line-soft pt-2">
        <Bar width="w-20" height="h-1.5" />
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink-3" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Wireframe — 03 · Layered source-of-truth
 *  Three horizontal bands: IdP groups · mapping rules · roles+workspaces.
 *  Hairline connectors between bands suggest data flow.
 * ──────────────────────────────────────────────────────────────────── */

function LayeredWireframe() {
  return (
    <div className="flex h-full flex-col gap-2">
      {/* Tier 01 — IdP groups */}
      <Tier label="IdP groups" sublabel="read from IdP">
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Region key={i} tone="mute" className="flex items-center justify-center py-2">
              <Bar width="w-8" height="h-1.5" />
            </Region>
          ))}
        </div>
      </Tier>

      {/* Connector */}
      <Connector />

      {/* Tier 02 — Mapping rules with precedence */}
      <Tier label="Mapping rules" sublabel="precedence is explicit">
        <div className="flex flex-col gap-1">
          {['01', '02', '03'].map((n) => (
            <Region key={n} tone="surface" className="flex items-center gap-2 px-2.5 py-1.5">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink-4">
                {n}
              </span>
              <Bar width="w-12" height="h-1.5" />
              <span aria-hidden className="ml-auto inline-block h-px w-3 bg-line-strong" />
              <Chip width="w-6" tone="line" />
            </Region>
          ))}
        </div>
      </Tier>

      {/* Connector */}
      <Connector />

      {/* Tier 03 — Roles + workspaces */}
      <Tier label="Roles · workspaces" sublabel="downstream of mapping">
        <div className="grid grid-cols-2 gap-1.5">
          <Region tone="surface" className="flex items-center justify-center py-2">
            <Bar width="w-10" height="h-1.5" tone="strong" />
          </Region>
          <Region tone="surface" className="flex items-center justify-center py-2">
            <Bar width="w-10" height="h-1.5" tone="strong" />
          </Region>
        </div>
      </Tier>
    </div>
  );
}

function Tier({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-4">
          {label}
        </p>
        {sublabel && (
          <p className="text-[9.5px] leading-[1.2] text-ink-4">{sublabel}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex h-3 w-full items-center justify-center">
      <span aria-hidden className="inline-block h-full w-px bg-line-strong" />
    </div>
  );
}
