'use client';

/**
 * Exploration primitives — shared building blocks for the three design-
 * exploration artifacts in this folder. Each artifact composes these
 * pieces so the visual language stays consistent: grayscale wireframes,
 * verdict tags, ordinal progression, editorial framing.
 *
 * Design commitments:
 *
 *   • Pure CSS structure. No SVG paths, no decorative chrome. A wireframe
 *     is a grid of grey blocks with hairline borders.
 *   • Grayscale only. The "color story" here is structure, not state.
 *     Verdicts are communicated through type weight and ink steps, not
 *     red/green badges.
 *   • Editorial register. Each card has an ordinal, a one-line name,
 *     a verdict tag, a wireframe, and a single-sentence rationale.
 *   • Mobile-honest. The comparison grid stacks one-per-row on small
 *     viewports; the wireframes themselves stay readable because they
 *     are structure, not pixel art.
 *
 * Nothing here is exported from a barrel — each artifact imports what
 * it needs directly.
 */

import { motion, type Variants } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────── *
 *  ExplorationSection
 *  ──────────────────
 *  Outer shell for each exploration artifact. Mirrors WorkflowSection
 *  in spacing/typography so the two preview pages feel like siblings,
 *  but uses a different eyebrow register ("Exploration · …") to signal
 *  that what follows is process, not architecture.
 * ──────────────────────────────────────────────────────────────────── */

interface ExplorationSectionProps {
  id?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Optional single-sentence designer insight, rendered below the grid. */
  insight?: React.ReactNode;
  surface?: 'canvas' | 'warm';
  className?: string;
  children: React.ReactNode;
}

export function ExplorationSection({
  id,
  eyebrow,
  title,
  description,
  insight,
  surface = 'canvas',
  className,
  children,
}: ExplorationSectionProps) {
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
          <motion.p
            variants={revealUp}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={revealUp}
            className="max-w-[28ch] text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.12] tracking-[-0.022em] font-semibold text-ink-1 text-balance"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={revealUp}
            className="max-w-[60ch] text-body-lg text-ink-2 text-pretty"
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
 *  ExplorationGrid
 *  ───────────────
 *  Side-by-side comparison of 2–3 directions. On lg+ they share a row;
 *  on mobile they stack with a hairline rule between. A subtle
 *  progression bar runs along the top of the grid to suggest "these
 *  are points along a journey" without spelling it out.
 * ──────────────────────────────────────────────────────────────────── */

interface ExplorationGridProps {
  /** 2 or 3 children — anything beyond that compresses too tightly. */
  children: React.ReactNode;
  className?: string;
}

export function ExplorationGrid({ children, className }: ExplorationGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('relative w-full', className)}
    >
      {/* Hairline progression rule above the cards (desktop only). */}
      <div aria-hidden className="relative mb-8 hidden h-px w-full bg-line-soft lg:block">
        <span className="absolute left-0 top-1/2 inline-block h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-line-strong" />
        <span className="absolute left-1/2 top-1/2 inline-block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-line-strong" />
        <span className="absolute right-0 top-1/2 inline-block h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink-1" />
      </div>

      <div
        className={cn(
          'grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0',
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Verdicts
 *  ────────
 *  Three editorial tiers — restrained, type-led, no badge backgrounds.
 *
 *    rejected → muted ink. The direction taught us something but did
 *               not earn a place in the system.
 *    bridged  → mid ink. The direction influenced the shipped design
 *               even though it wasn't the final form.
 *    shipped  → primary ink. The direction that earned the system.
 *
 *  The qualifier (e.g. "too analytics", "validated with admins") is
 *  the most useful piece of writing on the card — it's the *why*
 *  behind the verdict. Keep it ≤ 6 words.
 * ──────────────────────────────────────────────────────────────────── */

export type Verdict = 'rejected' | 'bridged' | 'shipped';

const verdictLabel: Record<Verdict, string> = {
  rejected: 'Rejected',
  bridged: 'Bridged',
  shipped: 'Shipped',
};

const verdictInk: Record<Verdict, string> = {
  rejected: 'text-ink-4',
  bridged: 'text-ink-3',
  shipped: 'text-ink-1',
};

/* ──────────────────────────────────────────────────────────────────── *
 *  ExplorationCard
 *  ───────────────
 *  One direction. Has:
 *   • ordinal label   — "01 · Direction A"
 *   • verdict tag     — REJECTED / BRIDGED / SHIPPED + short qualifier
 *   • wireframe       — caller renders the grayscale structural canvas
 *   • rationale       — one short sentence on *why* this direction
 * ──────────────────────────────────────────────────────────────────── */

interface ExplorationCardProps {
  /** Ordinal label — "01", "02", "03". Used as a small mono prefix. */
  ordinal: string;
  /** The exploration's short name — "Flat list", "Rule-based", etc. */
  name: string;
  /** Which editorial tier this direction occupies. */
  verdict: Verdict;
  /** Short post-verdict qualifier — "too analytics", "informed precedence". */
  verdictReason: string;
  /** One-sentence rationale that the wireframe alone can't carry. */
  rationale: React.ReactNode;
  /** The wireframe content — a CSS structural mock, not an image. */
  children: React.ReactNode;
  className?: string;
}

export function ExplorationCard({
  ordinal,
  name,
  verdict,
  verdictReason,
  rationale,
  children,
  className,
}: ExplorationCardProps) {
  const isShipped = verdict === 'shipped';
  return (
    <motion.article
      variants={revealUp}
      className={cn('flex flex-col gap-6', className)}
    >
      {/* Header: ordinal + verdict */}
      <header className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
            {ordinal}
          </p>
          <p
            className={cn(
              'font-mono text-[10.5px] uppercase tracking-[0.18em]',
              verdictInk[verdict],
            )}
          >
            {verdictLabel[verdict]}
            <span className="ml-2 normal-case tracking-normal text-ink-4">
              · {verdictReason}
            </span>
          </p>
        </div>
        <h3
          className={cn(
            'text-[18px] leading-[1.25] tracking-[-0.012em] font-semibold text-balance',
            isShipped ? 'text-ink-1' : 'text-ink-2',
          )}
        >
          {name}
        </h3>
      </header>

      {/* The wireframe canvas */}
      <WireframeFrame emphasis={isShipped}>{children}</WireframeFrame>

      {/* Rationale */}
      <p className="text-[13.5px] leading-[1.6] text-ink-3 text-pretty">
        {rationale}
      </p>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  WireframeFrame
 *  ──────────────
 *  Bordered, slightly-muted surface that hosts the structural mock.
 *  The shipped direction gets a deeper border + a quiet shadow to mark
 *  it visually without leaning on color.
 * ──────────────────────────────────────────────────────────────────── */

interface WireframeFrameProps {
  emphasis?: boolean;
  /** Aspect ratio for the canvas. Defaults to 4:3 — works for most
   *  layout explorations. Override for navigation explorations that
   *  want a taller frame. */
  aspect?: '4/3' | '3/2' | '1/1' | '16/10';
  className?: string;
  children: React.ReactNode;
}

const aspectMap: Record<NonNullable<WireframeFrameProps['aspect']>, string> = {
  '4/3': '4 / 3',
  '3/2': '3 / 2',
  '1/1': '1 / 1',
  '16/10': '16 / 10',
};

export function WireframeFrame({
  emphasis = false,
  aspect = '4/3',
  className,
  children,
}: WireframeFrameProps) {
  return (
    <div
      style={{ aspectRatio: aspectMap[aspect] }}
      className={cn(
        'relative w-full overflow-hidden rounded-[6px] border bg-surface-mute',
        emphasis
          ? 'border-ink-1/15 shadow-[0_1px_0_0_rgba(14,15,14,0.04),0_18px_36px_-28px_rgba(14,15,14,0.10)]'
          : 'border-line-soft',
        className,
      )}
    >
      {/* Inner padding canvas — caller composes blocks inside this region. */}
      <div className="absolute inset-0 p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Block primitives
 *  ────────────────
 *  Tiny grayscale building blocks. Compose these to make a wireframe.
 *  Everything is `bg-line-soft` / `bg-line` / `bg-line-strong` so the
 *  whole canvas reads as paper-and-pencil, never illustrated.
 * ──────────────────────────────────────────────────────────────────── */

/** A skeleton text line — a short, low-height bar. Width is `w-*` Tailwind. */
export function Bar({
  width = 'w-2/3',
  height = 'h-1.5',
  tone = 'line',
  className,
}: {
  width?: string;
  height?: string;
  tone?: 'soft' | 'line' | 'strong' | 'ink';
  className?: string;
}) {
  const toneMap: Record<NonNullable<typeof tone>, string> = {
    soft: 'bg-line-soft',
    line: 'bg-line',
    strong: 'bg-line-strong',
    ink: 'bg-ink-3',
  };
  return (
    <span
      aria-hidden
      className={cn('inline-block rounded-sm', width, height, toneMap[tone], className)}
    />
  );
}

/** A grouped stack of skeleton bars — a paragraph block, basically. */
export function BarStack({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  const widths = ['w-full', 'w-5/6', 'w-2/3', 'w-3/4', 'w-1/2'];
  return (
    <span aria-hidden className={cn('flex flex-col gap-1.5', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Bar key={i} width={widths[i % widths.length]} />
      ))}
    </span>
  );
}

/** A small region pill — used as a chip / tag / button placeholder. */
export function Chip({
  width = 'w-12',
  tone = 'soft',
  className,
}: {
  width?: string;
  tone?: 'soft' | 'line' | 'strong' | 'ink';
  className?: string;
}) {
  const toneMap: Record<NonNullable<typeof tone>, string> = {
    soft: 'bg-line-soft border-line',
    line: 'bg-line border-line-strong',
    strong: 'bg-line-strong border-line-strong',
    ink: 'bg-ink-1 border-ink-1',
  };
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block h-3 rounded-full border',
        width,
        toneMap[tone],
        className,
      )}
    />
  );
}

/** A bordered rectangle — a card / cell / panel placeholder in the
 *  wireframe. Renders as a div so it can host any block-level children. */
export function Region({
  tone = 'surface',
  className,
  children,
}: {
  /** Inner background tone. */
  tone?: 'surface' | 'mute' | 'soft' | 'strong';
  className?: string;
  children?: React.ReactNode;
}) {
  const toneMap: Record<NonNullable<typeof tone>, string> = {
    surface: 'bg-surface border-line-soft',
    mute: 'bg-surface-mute border-line-soft',
    soft: 'bg-line-soft border-line',
    strong: 'bg-line border-line-strong',
  };
  return (
    <div
      aria-hidden
      className={cn(
        'rounded-[3px] border',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  Stagger
 *  ───────
 *  Tiny helper. Same shape as the workflow primitive — duplicated here
 *  to keep the two artifact folders independent.
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
