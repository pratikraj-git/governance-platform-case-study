'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

interface GovernanceDiagramProps {
  className?: string;
  /** Whether to animate strokes on viewport entry. Defaults to true. */
  animate?: boolean;
}

/**
 * GovernanceDiagram — abstract architectural visualization of the
 * unified governance layer. Pure SVG, monochrome, no branding.
 *
 * Composition:
 *   - Top row:    Admin Orchestration (single anchor)
 *   - Middle:     Governance Layer (centerpiece) flanked by
 *                 SSO, SCIM, RBAC, Audit Logs
 *   - Bottom row: Workspaces (W₁, W₂, W₃)
 *
 * All connectors are dashed 1px lines. The center block uses a
 * solid 1.5px border to anchor the eye.
 *
 * Scales via SVG viewBox; the host controls width.
 */
export function GovernanceDiagram({ className, animate = true }: GovernanceDiagramProps) {
  const drawTransition = { duration: 1.1, ease: ease.standard };
  const fadeTransition = { duration: 0.6, ease: ease.quiet };

  const Line = ({ d, delay = 0 }: { d: string; delay?: number }) =>
    animate ? (
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...drawTransition, delay }}
      />
    ) : (
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" opacity={0.55} />
    );

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-md border border-line bg-surface',
        'text-ink-3',
        className,
      )}
    >
      {/* Subtle grid backdrop — establishes architectural feel without dominating */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative aspect-[16/10] w-full">
        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Unified governance layer architecture"
          role="img"
        >
          {/* ── Connectors ───────────────────────────────────────── */}
          {/* Admin → Governance */}
          <Line d="M400 90 L400 180" delay={0.05} />
          {/* Governance ↔ SSO (left) */}
          <Line d="M310 250 L180 250" delay={0.1} />
          {/* Governance ↔ SCIM (right) */}
          <Line d="M490 250 L620 250" delay={0.15} />
          {/* Governance ↔ RBAC (lower-left diagonal) */}
          <Line d="M340 305 L210 360" delay={0.2} />
          {/* Governance ↔ Audit Logs (lower-right diagonal) */}
          <Line d="M460 305 L590 360" delay={0.25} />
          {/* Governance → Workspace strip */}
          <Line d="M400 320 L400 410" delay={0.3} />
          <Line d="M280 410 L520 410" delay={0.35} />
          <Line d="M280 410 L280 440" delay={0.4} />
          <Line d="M400 410 L400 440" delay={0.4} />
          <Line d="M520 410 L520 440" delay={0.4} />

          {/* ── Admin orchestration node (top) ──────────────────── */}
          <Node x={310} y={50} w={180} label="Admin Orchestration" delay={0} animate={animate} fadeTransition={fadeTransition} />

          {/* ── Center: Governance Layer ────────────────────────── */}
          <Node
            x={300}
            y={180}
            w={200}
            h={140}
            label="Governance Layer"
            sublabel="Unified policy plane"
            emphasis
            delay={0.1}
            animate={animate}
            fadeTransition={fadeTransition}
          />

          {/* ── Module nodes around center ──────────────────────── */}
          <Node x={50}  y={220} w={130} label="SSO"        delay={0.2} animate={animate} fadeTransition={fadeTransition} />
          <Node x={620} y={220} w={130} label="SCIM"       delay={0.25} animate={animate} fadeTransition={fadeTransition} />
          <Node x={70}  y={335} w={140} label="RBAC"       delay={0.3} animate={animate} fadeTransition={fadeTransition} />
          <Node x={580} y={335} w={170} label="Audit Logs" delay={0.35} animate={animate} fadeTransition={fadeTransition} />

          {/* ── Workspaces row (bottom) ─────────────────────────── */}
          <Node x={230} y={440} w={100} h={42} label="Workspace 1" small delay={0.45} animate={animate} fadeTransition={fadeTransition} />
          <Node x={350} y={440} w={100} h={42} label="Workspace 2" small delay={0.5}  animate={animate} fadeTransition={fadeTransition} />
          <Node x={470} y={440} w={100} h={42} label="Workspace 3" small delay={0.55} animate={animate} fadeTransition={fadeTransition} />
        </svg>
      </div>
    </div>
  );
}

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sublabel?: string;
  emphasis?: boolean;
  small?: boolean;
  delay: number;
  animate: boolean;
  fadeTransition: { duration: number; ease: readonly [number, number, number, number] };
}

function Node({ x, y, w, h = 60, label, sublabel, emphasis, small, delay, animate, fadeTransition }: NodeProps) {
  const Wrapper = animate ? motion.g : 'g';
  const props = animate
    ? {
        initial: { opacity: 0, y: 4 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { ...fadeTransition, delay },
      }
    : {};

  return (
    <Wrapper {...(props as object)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill="var(--color-surface)"
        stroke="var(--color-ink-1)"
        strokeWidth={emphasis ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={emphasis && sublabel ? y + h / 2 - 6 : y + h / 2 + (small ? 4 : 5)}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={emphasis ? 600 : 500}
        fontSize={small ? 11 : emphasis ? 15 : 13}
        fill="var(--color-ink-1)"
        letterSpacing={emphasis ? -0.3 : 0}
      >
        {label}
      </text>
      {emphasis && sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={400}
          fontSize={11}
          fill="var(--color-ink-3)"
        >
          {sublabel}
        </text>
      )}
    </Wrapper>
  );
}
