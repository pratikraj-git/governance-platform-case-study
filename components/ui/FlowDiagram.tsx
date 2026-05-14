'use client';

import { motion } from 'framer-motion';
import { IN_VIEW, ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

export interface FlowNode {
  /** Primary node label — one short phrase, ≤ 4 words. */
  label: string;
  /** Optional secondary line — one short clarifier. */
  sublabel?: string;
}

interface FlowDiagramProps {
  /** 3–6 nodes recommended. The component lays them out evenly. */
  nodes: FlowNode[];
  /** Eyebrow rendered above the flow (e.g. "Flow · Governance evolution"). */
  eyebrow?: React.ReactNode;
  /** A short designer insight rendered beneath the diagram. One sentence. */
  insight?: React.ReactNode;
  className?: string;
}

/**
 * FlowDiagram — minimal editorial flow visual.
 *
 * Monochrome. Dot + label per node, with a single hairline connector
 * running through the dot row. Stacks vertically on mobile (connector
 * becomes vertical), runs horizontally on desktop.
 *
 * Intentionally simple: this is a visual pause that helps the reader
 * see the shape of a sequence — not a system architecture diagram.
 */
export function FlowDiagram({ nodes, eyebrow, insight, className }: FlowDiagramProps) {
  const N = nodes.length;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.7, ease: ease.standard }}
      className={cn('w-full max-w-[var(--container-max)]', className)}
      aria-label="Flow diagram"
    >
      {eyebrow && (
        <p className="mb-6 text-eyebrow uppercase text-ink-3">{eyebrow}</p>
      )}

      {/* Mobile — vertical flow */}
      <ol className="flex flex-col md:hidden">
        {nodes.map((node, i) => (
          <li key={`m-${i}`} className="flex items-stretch gap-4">
            <div className="flex flex-col items-center">
              <span
                aria-hidden
                className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full bg-ink-1"
              />
              {i < N - 1 && (
                <span aria-hidden className="my-1 inline-block w-px flex-1 bg-line-strong" />
              )}
            </div>
            <div className={cn('flex flex-col gap-1', i < N - 1 && 'pb-6')}>
              <p className="text-[14px] font-medium leading-[1.4] text-ink-1 text-balance">
                {node.label}
              </p>
              {node.sublabel && (
                <p className="text-[12px] leading-[1.5] text-ink-3 text-pretty">
                  {node.sublabel}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop — horizontal flow */}
      <div className="relative hidden md:block">
        {/* Single hairline running under the dot row.
            Left edge: 6px (right side of first dot, which sits at left:0 of its column).
            Right edge: calc(100% / N) − 6px (left side of the last dot in its column).
            Dots are filled ink-1 and z-10, so they visually "cover" the line passing through them. */}
        <span
          aria-hidden
          className="absolute top-[5.5px] left-[6px] h-px bg-line-strong"
          style={{ right: `calc(100% / ${N} - 6px)` }}
        />

        <ol
          className="relative grid gap-x-6 lg:gap-x-8"
          style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
        >
          {nodes.map((node, i) => (
            <li key={`d-${i}`} className="flex flex-col gap-3">
              <span
                aria-hidden
                className="relative z-10 inline-block h-3 w-3 rounded-full bg-ink-1"
              />
              <div className="pr-2">
                <p className="text-[14px] font-medium leading-[1.4] text-ink-1 text-balance">
                  {node.label}
                </p>
                {node.sublabel && (
                  <p className="mt-1.5 text-[12px] leading-[1.5] text-ink-3 text-pretty">
                    {node.sublabel}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {insight && (
        <figcaption className="mt-10 max-w-[60ch] text-body-sm italic leading-[1.6] text-ink-2 text-pretty">
          {insight}
        </figcaption>
      )}
    </motion.figure>
  );
}
