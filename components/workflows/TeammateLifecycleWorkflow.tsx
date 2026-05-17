'use client';

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { WorkflowSection } from './_primitives';

/**
 * Teammate Lifecycle Governance Workflow
 * ────────────────────────────────────────
 *
 * A lifecycle state diagram: invite → active → (guest | temporary |
 * inactive) → archived, with ownership transfer as a lateral
 * transition between active states.
 *
 * Visual register: a Stripe-style state machine. Calm filled
 * monochrome states, hairline transitions, no arrowheads. Each
 * transition is labeled with its trigger (e.g. "Expiry", "Ownership
 * transfer") so the diagram reads as a contract, not a flowchart.
 *
 * The layout collapses to a single column on mobile by stacking the
 * states and labeling each transition as a row separator.
 */

interface LifecycleState {
  id: string;
  /** Display label. */
  label: string;
  /** Short clarifier. */
  sublabel: string;
  /** Optional kind affecting visual weight. */
  kind?: 'entry' | 'steady' | 'transient' | 'terminal';
}

const STATES: LifecycleState[] = [
  { id: 'invite',    label: 'Invited',     sublabel: 'Pending acceptance, scoped to a tenant.', kind: 'entry' },
  { id: 'active',    label: 'Active',      sublabel: 'Full member. Managed or unmanaged is decided by source of truth.', kind: 'steady' },
  { id: 'guest',     label: 'Guest',       sublabel: 'External collaborator. Reduced surface, named owner inside the tenant.', kind: 'transient' },
  { id: 'temporary', label: 'Temporary',   sublabel: 'Time-bounded session with an explicit expiry surfaced to the admin.', kind: 'transient' },
  { id: 'inactive',  label: 'Inactive',    sublabel: 'No recent sign-in. Visible in the operational table, not deleted.', kind: 'transient' },
  { id: 'archived',  label: 'Archived',    sublabel: 'Retained for audit. Access removed; identity preserved for accountability.', kind: 'terminal' },
];

/*
 * Transitions are rendered inline by the desktop graph below
 * (TransitionRow / TransitionLeg / ThreeWaySpread). They are not kept
 * in a separate config because their geometry is grid-coupled — the
 * code-and-data split was less readable than the literal layout.
 *
 * Reference (semantic only):
 *
 *   invite    → active     · Accepted
 *   active    → guest      · Scoped down
 *   active    → temporary  · Time-bound grant
 *   active    → inactive   · No recent sign-in
 *   guest     → archived   · Off-boarded
 *   temporary → archived   · Expiry
 *   inactive  → archived   · Off-boarded
 */

const CROSS_CUTTING = [
  {
    title: 'Ownership transfer',
    body: 'A teammate\'s assets — workspaces, automations, integrations — can be reassigned without changing their identity. The transition lives outside the lifecycle states.',
  },
  {
    title: 'Source of truth',
    body: 'When SCIM is on, the IdP decides who is Active; manual paths are read-only. When it is off, manual paths reopen.',
  },
  {
    title: 'Always visible',
    body: 'Every state above is a first-class row in the teammates table — including Archived. Governance starts with being able to see what exists.',
  },
];

export function TeammateLifecycleWorkflow() {
  return (
    <WorkflowSection
      id="teammate-lifecycle"
      eyebrow="Workflow · Teammate lifecycle"
      title="The years after someone is invited."
      description="Most of the operational risk in an enterprise account doesn't sit in the moment a teammate is invited — it sits in the years after. Six named states, the transitions between them, and three rules that stay true across all of them. The interface gets simpler because every row already knows what it is."
      insight="Lifecycle is the part of governance admins live with longest, and that gets the least design attention. Naming the states explicitly meant the interface could finally answer the questions the configuration page never asked."
    >
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        {/* DIAGRAM column */}
        <div className="lg:col-span-8">
          {/* Mobile: stacked lifecycle */}
          <MobileStateList />

          {/* Desktop: structured grid with hairline transitions */}
          <DesktopStateGraph />
        </div>

        {/* Cross-cutting commentary column */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start flex flex-col gap-7">
          <p className="text-eyebrow uppercase text-ink-3">Cross-cutting</p>
          {CROSS_CUTTING.map((row) => (
            <div key={row.title} className="flex flex-col gap-2 border-l-2 border-line-strong pl-5">
              <p className="text-eyebrow uppercase text-ink-2">{row.title}</p>
              <p className="text-body-sm text-ink-3 text-pretty">{row.body}</p>
            </div>
          ))}
        </aside>
      </div>
    </WorkflowSection>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function MobileStateList() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className="flex flex-col md:hidden"
    >
      {STATES.map((state, i) => (
        <motion.li
          key={state.id}
          variants={revealUp}
          className="relative flex gap-4 pb-8 last:pb-0"
        >
          <div className="flex flex-col items-center pt-2">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-ink-1" />
            {i < STATES.length - 1 && (
              <span aria-hidden className="my-1 inline-block w-px flex-1 bg-line-strong" />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-4">
              State · {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-[15px] font-medium leading-[1.35] text-ink-1 text-balance">
              {state.label}
            </p>
            <p className="text-body-sm text-ink-3 text-pretty">{state.sublabel}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

/**
 * Desktop state graph.
 *
 * Layout grid (rows × 5 columns):
 *
 *   r1:  ·  ·  Invited  ·  ·         (entry)
 *   r2:  ·  ·  Active   ·  ·         (steady state — center)
 *   r3:  Guest  Temporary  Inactive  (branches — three columns)
 *   r4:  ·  ·  Archived  ·  ·        (terminal)
 *
 * Transitions are rendered as hairline divs + a small bullet at the
 * receiving end, plus a short mono label on the line. Nothing curves
 * — every connector is a straight line so the diagram reads as
 * structure, not infographic flair.
 */
function DesktopStateGraph() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className="hidden md:block"
    >
      <motion.div
        variants={revealUp}
        className="rounded-md border border-line-soft bg-surface p-8 lg:p-10"
      >
        {/* Row 1 — Invite */}
        <div className="grid grid-cols-5 gap-x-4">
          <div className="col-start-3">
            <StateCard state={getState('invite')!} />
          </div>
        </div>

        {/* Transition · Invite → Active */}
        <TransitionRow label="Accepted" />

        {/* Row 2 — Active (center, emphasised) */}
        <div className="grid grid-cols-5 gap-x-4">
          <div className="col-start-3">
            <StateCard state={getState('active')!} emphasis />
          </div>
        </div>

        {/* Spreader — Active branches into three transient states */}
        <ThreeWaySpread />

        {/* Row 3 — Guest / Temporary / Inactive */}
        <motion.div variants={revealStagger} className="grid grid-cols-5 gap-x-4">
          <div className="col-start-1 col-end-3">
            <StateCard state={getState('guest')!} />
          </div>
          <div className="col-start-3 col-end-4">
            <StateCard state={getState('temporary')!} />
          </div>
          <div className="col-start-4 col-end-6">
            <StateCard state={getState('inactive')!} />
          </div>
        </motion.div>

        {/* Transition labels into archived (one row, three columns) */}
        <motion.div variants={revealUp} className="mt-5 grid grid-cols-5 gap-x-4">
          <div className="col-start-1 col-end-3">
            <TransitionLeg label="Off-boarded" />
          </div>
          <div className="col-start-3 col-end-4">
            <TransitionLeg label="Expiry" />
          </div>
          <div className="col-start-4 col-end-6">
            <TransitionLeg label="Off-boarded" />
          </div>
        </motion.div>

        {/* Row 4 — Archived (wide) */}
        <motion.div variants={revealUp} className="mt-1 grid grid-cols-5 gap-x-4">
          <div className="col-start-2 col-end-5">
            <StateCard state={getState('archived')!} />
          </div>
        </motion.div>

        {/* Lateral — Ownership transfer (sidebar of the diagram itself) */}
        <motion.div
          variants={revealUp}
          className="mt-10 flex items-center gap-4 border-t border-line-soft pt-6"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink-1" />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Lateral · Ownership transfer
          </p>
          <span aria-hidden className="inline-block h-px flex-1 bg-line-strong" />
          <p className="text-[12.5px] leading-[1.5] text-ink-3 max-w-[34ch] text-pretty">
            Reassigns a teammate’s assets without changing their identity. Transition lives outside the states.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function getState(id: string): LifecycleState | undefined {
  return STATES.find((s) => s.id === id);
}

interface StateCardProps {
  state: LifecycleState;
  emphasis?: boolean;
}

function StateCard({ state, emphasis = false }: StateCardProps) {
  return (
    <motion.article
      variants={revealUp}
      className={cn(
        'flex flex-col gap-2 rounded-[5px] border bg-canvas p-4 lg:p-5',
        emphasis
          ? 'border-ink-1 bg-surface shadow-[0_1px_0_0_rgba(14,15,14,0.04),0_12px_30px_-20px_rgba(14,15,14,0.08)]'
          : 'border-line-soft',
      )}
    >
      <header className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
          State
        </span>
        <span
          aria-hidden
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full',
            emphasis ? 'bg-ink-1' : 'bg-line-strong',
          )}
        />
      </header>
      <p className="text-[14px] font-medium leading-[1.35] text-ink-1 text-balance">
        {state.label}
      </p>
      <p className="text-[12.5px] leading-[1.5] text-ink-3 text-pretty">
        {state.sublabel}
      </p>
    </motion.article>
  );
}

/**
 * A vertical hairline + label, used between Invited and Active.
 */
function TransitionRow({ label }: { label: string }) {
  return (
    <motion.div
      variants={revealUp}
      className="relative flex h-10 items-center justify-center"
    >
      <span aria-hidden className="h-full w-px bg-line-strong" />
      <p className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-3 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
        {label}
      </p>
      <span
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1"
      />
      <span
        aria-hidden
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1"
      />
    </motion.div>
  );
}

/**
 * Three-way spreader: Active drops, hairline spreads horizontally, and
 * three hairlines drop down to the three transient states beneath.
 */
function ThreeWaySpread() {
  return (
    <motion.div variants={revealUp} className="relative my-2">
      {/* Drop from Active */}
      <div className="relative mx-auto h-5 w-px bg-line-strong">
        <span
          aria-hidden
          className="absolute -top-[3px] left-1/2 -translate-x-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1"
        />
      </div>
      {/* Horizontal spreader — wide enough to reach the outer columns */}
      <div className="mx-[10%] h-px bg-line-strong" />
      {/* Three drops to the row below */}
      <div className="grid grid-cols-5 gap-x-4">
        <div className="col-start-1 col-end-3 flex justify-center">
          <span aria-hidden className="h-5 w-px bg-line-strong" />
        </div>
        <div className="col-start-3 col-end-4 flex justify-center">
          <span aria-hidden className="h-5 w-px bg-line-strong" />
        </div>
        <div className="col-start-4 col-end-6 flex justify-center">
          <span aria-hidden className="h-5 w-px bg-line-strong" />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * A leg of the three transition lines into Archived: a centered
 * vertical hairline with a small label.
 */
function TransitionLeg({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.5, ease: ease.quiet }}
      className="relative flex h-12 items-center justify-center"
    >
      <span aria-hidden className="h-full w-px bg-line-strong" />
      <p className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-3 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
        {label}
      </p>
      <span
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1"
      />
    </motion.div>
  );
}
