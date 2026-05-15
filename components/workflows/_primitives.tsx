'use client';

/**
 * Workflow primitives — shared building blocks for the three architecture
 * artifacts in this folder. Each artifact composes these, so the visual
 * language stays consistent across them.
 *
 * Design commitments:
 *
 *   • CSS-only structure (no SVG paths). Connectors are 1px divs.
 *   • Monochrome ink. The only color allowed is the desaturated signal
 *     palette already present in tokens.css, used sparingly for state.
 *   • Stripe / Vercel / Linear register: hairline frames, lots of
 *     whitespace, typography-led, no decorative chrome.
 *   • Responsive: every diagram collapses to a single column on mobile.
 *
 * Nothing here is exported from a barrel — workflow files import what
 * they need directly. Keeps surface area honest.
 */

import { motion, type Variants } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────── *
 *  WorkflowSection
 *  ────────────────
 *  The outer shell each artifact uses. Heading + one-sentence
 *  description + the diagram. Width capped at `wide` for legibility.
 * ──────────────────────────────────────────────────────────────────── */

interface WorkflowSectionProps {
  /** Section anchor id — handy for deep-linking on the preview page. */
  id?: string;
  /** Small monospace label above the title. */
  eyebrow: React.ReactNode;
  /** The artifact's title — h2 by default. */
  title: React.ReactNode;
  /** One-sentence contextual description. Keep it short. */
  description: React.ReactNode;
  /** Optional fine print under the diagram — a single designer insight. */
  insight?: React.ReactNode;
  /** Optional surface tone. Defaults to canvas. */
  surface?: 'canvas' | 'warm';
  className?: string;
  children: React.ReactNode;
}

export function WorkflowSection({
  id,
  eyebrow,
  title,
  description,
  insight,
  surface = 'canvas',
  className,
  children,
}: WorkflowSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        surface === 'warm' && 'bg-surface-warm',
        className,
      )}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-24 sm:px-10 md:py-28 lg:px-16 lg:py-32">
        <motion.header
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={revealUp}
            className="text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] tracking-[-0.022em] font-semibold text-ink-1 text-balance max-w-[28ch]"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="text-body-lg text-ink-2 text-pretty max-w-[60ch]"
          >
            {description}
          </motion.p>
        </motion.header>

        <div className="mt-16 lg:mt-20">{children}</div>

        {insight && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.7, ease: ease.standard }}
            className="mt-14 max-w-[62ch] text-body-sm italic leading-[1.65] text-ink-2 text-pretty"
          >
            {insight}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Layer
 *  ─────
 *  A horizontal band of the architecture. Hosts a small ordinal label,
 *  a short caption, and a row/grid of NodeCards. Surrounded by a
 *  hairline frame to read as a "tier" of the system.
 * ──────────────────────────────────────────────────────────────────── */

interface LayerProps {
  /** Ordinal label — e.g. "01 · Source". Rendered top-left, mono. */
  ordinal: string;
  /** One-line caption for the layer — e.g. "Identity provider". */
  caption?: string;
  /** Optional fine-print under the caption — single short phrase. */
  hint?: string;
  /** Surface tone — `mute` is the slightly-warm grey from tokens. */
  surface?: 'surface' | 'mute' | 'canvas';
  className?: string;
  children: React.ReactNode;
}

const layerSurfaceMap: Record<NonNullable<LayerProps['surface']>, string> = {
  surface: 'bg-surface',
  mute:    'bg-surface-mute',
  canvas:  'bg-canvas',
};

export function Layer({
  ordinal,
  caption,
  hint,
  surface = 'surface',
  className,
  children,
}: LayerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'relative rounded-md border border-line-soft',
        layerSurfaceMap[surface],
        'p-5 sm:p-6 lg:p-8',
        className,
      )}
    >
      <motion.div variants={revealUp} className="mb-5 flex items-baseline justify-between gap-4 sm:mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">{ordinal}</p>
        {caption && (
          <p className="text-eyebrow uppercase text-ink-3 text-right">
            {caption}
            {hint && <span className="ml-2 normal-case tracking-normal font-normal text-ink-4">· {hint}</span>}
          </p>
        )}
      </motion.div>
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  NodeCard
 *  ────────
 *  A single architectural block — a service, a state, a surface. Hosts
 *  a small mono kind-indicator, a primary label, and an optional
 *  one-line description. Keep these tight; this is not a card surface
 *  for paragraphs.
 * ──────────────────────────────────────────────────────────────────── */

export type NodeKind =
  | 'source'       // a system that originates truth (e.g. IdP)
  | 'service'      // an internal orchestration module
  | 'state'        // a lifecycle state
  | 'tenant'       // a workspace / customer-facing destination
  | 'fallback'     // an emergency / contingency surface
  | 'observer';    // an audit / observability surface

const kindLabelMap: Record<NodeKind, string> = {
  source:   'Source',
  service:  'Service',
  state:    'State',
  tenant:   'Tenant',
  fallback: 'Fallback',
  observer: 'Audit',
};

interface NodeCardProps {
  kind?: NodeKind;
  /** Title — one short phrase, ≤ 4 words. */
  label: string;
  /** Optional secondary line — one short clarifier. */
  sublabel?: string;
  /** Tiny meta line printed below the sublabel — e.g. signal/severity. */
  meta?: string;
  /** Visually emphasise the node (eg. the centerpiece). */
  emphasis?: boolean;
  className?: string;
}

export function NodeCard({
  kind,
  label,
  sublabel,
  meta,
  emphasis = false,
  className,
}: NodeCardProps) {
  return (
    <motion.article
      variants={revealUp}
      className={cn(
        'group relative flex flex-col gap-2 rounded-[5px] border bg-canvas p-4 lg:p-5',
        emphasis
          ? 'border-ink-1 bg-surface shadow-[0_1px_0_0_rgba(14,15,14,0.04),0_12px_30px_-20px_rgba(14,15,14,0.08)]'
          : 'border-line-soft',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2">
        {kind && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
            {kindLabelMap[kind]}
          </span>
        )}
        <span
          aria-hidden
          className={cn(
            'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
            emphasis ? 'bg-ink-1' : 'bg-line-strong',
          )}
        />
      </header>
      <p className="text-[14px] font-medium leading-[1.35] text-ink-1 text-balance">
        {label}
      </p>
      {sublabel && (
        <p className="text-[12.5px] leading-[1.5] text-ink-3 text-pretty">
          {sublabel}
        </p>
      )}
      {meta && (
        <p className="mt-1 border-t border-line-soft pt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-4">
          {meta}
        </p>
      )}
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Connectors
 *  ──────────
 *  Hairline elements that visually link layers. They are decorative
 *  CSS, not SVG paths — a deliberate constraint that keeps the artifact
 *  reading as editorial structure rather than infographic plumbing.
 *
 *  ⇣  VerticalConnector — a short vertical hairline used between layers.
 *  •  Junction        — a small filled dot at a connector terminus.
 *  ⇢  LabeledConnector — a vertical hairline with a short rotated label
 *                       (e.g. "SCIM token", "session"). Used between
 *                       layers when the channel deserves a name.
 * ──────────────────────────────────────────────────────────────────── */

interface VerticalConnectorProps {
  /** Optional channel label rendered to the right of the line. */
  label?: string;
  /** Optional sub-label rendered below the channel label. */
  sublabel?: string;
  /** Connector height in rem; defaults to 2.5rem. */
  height?: string;
  className?: string;
}

export function VerticalConnector({
  label,
  sublabel,
  height = 'h-10',
  className,
}: VerticalConnectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.5, ease: ease.quiet }}
      className={cn('relative flex w-full justify-center', height, className)}
    >
      <span aria-hidden className="h-full w-px bg-line-strong" />
      {label && (
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-3 whitespace-nowrap">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">{label}</p>
          {sublabel && (
            <p className="text-[11px] leading-[1.35] text-ink-4">{sublabel}</p>
          )}
        </div>
      )}
      <Junction position="top" />
      <Junction position="bottom" />
    </motion.div>
  );
}

function Junction({ position }: { position: 'top' | 'bottom' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute left-1/2 -translate-x-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1',
        position === 'top' ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2',
      )}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  BranchConnector
 *  ───────────────
 *  Two-armed connector for "fork" moments (e.g. SSO healthy vs SSO
 *  unavailable). Renders a horizontal hairline with vertical drops at
 *  each branch position. Used between a single parent and two children.
 *
 *  Children render their own labels (NodeCard or text).
 * ──────────────────────────────────────────────────────────────────── */

interface BranchConnectorProps {
  /** Optional label printed above the spreader — e.g. "Auth state". */
  label?: string;
  /** Branch labels printed at each child column, one per arm. */
  arms: string[];
  className?: string;
}

export function BranchConnector({ label, arms, className }: BranchConnectorProps) {
  const N = arms.length;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.5, ease: ease.quiet }}
      className={cn('relative w-full', className)}
    >
      {label && (
        <p className="mb-3 text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
          {label}
        </p>
      )}
      {/* Vertical drop into the spreader. */}
      <div className="relative mx-auto h-6 w-px bg-line-strong">
        <span aria-hidden className="absolute -top-[3px] left-1/2 -translate-x-1/2 inline-block h-1.5 w-1.5 rounded-full bg-ink-1" />
      </div>
      {/* Horizontal spreader between first and last arm centers. */}
      <div
        className="relative mx-auto h-px bg-line-strong"
        style={{ width: `calc(100% - 100% / ${N})` }}
      />
      {/* Vertical drops to each arm, one per column. */}
      <div
        className="grid gap-x-6"
        style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
      >
        {arms.map((arm, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span aria-hidden className="h-6 w-px bg-line-strong" />
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-ink-1" />
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3 text-center">
              {arm}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Sidebar
 *  ───────
 *  Two-column wrapper used to pin a short editorial column next to the
 *  diagram. Sticky on lg+ so the prose follows the scroll. Useful when
 *  the diagram has structural meaning that benefits from a single
 *  paragraph of designer commentary alongside it.
 * ──────────────────────────────────────────────────────────────────── */

interface SidebarProps {
  /** Sidebar content. */
  aside: React.ReactNode;
  /** Diagram content. */
  children: React.ReactNode;
  /** Aside on which side. Defaults to right. */
  side?: 'left' | 'right';
  className?: string;
}

export function Sidebar({ aside, children, side = 'right', className }: SidebarProps) {
  const asideFirst = side === 'left';
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12',
        className,
      )}
    >
      {asideFirst && (
        <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          {aside}
        </aside>
      )}
      <div className={cn(asideFirst ? 'lg:col-span-8' : 'lg:col-span-8')}>
        {children}
      </div>
      {!asideFirst && (
        <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          {aside}
        </aside>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Stagger
 *  ───────
 *  Tiny helper: wrap children that should reveal in a stagger using the
 *  shared `revealStagger` variants. Saves repeating the motion.div
 *  boilerplate in each workflow.
 * ──────────────────────────────────────────────────────────────────── */

interface StaggerProps {
  className?: string;
  variants?: Variants;
  children: React.ReactNode;
}

export function Stagger({ className, variants = revealStagger, children }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
