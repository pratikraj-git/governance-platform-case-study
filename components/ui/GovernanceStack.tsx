'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

interface GovernanceStackProps {
  tone?: 'light' | 'dark';
  animate?: boolean;
  className?: string;
}

/**
 * GovernanceStack — vertical, editorial layered view of the governance
 * platform. Built specifically for the Hero's right column.
 *
 * Four stacked planes (top → bottom):
 *   1. Administration              (orchestration plane)
 *   2. Governance Layer            (unified policy plane — emphasized)
 *   3. Identity & Lifecycle        (5 modules: SSO, SCIM, RBAC, Audit, BGU)
 *   4. Workspaces                  (multi-tenant fan-out)
 *
 * Reads top-down. Dashed connectors mark the directional language
 * between planes — policy flowing down, telemetry flowing back up.
 * Pure SVG; scales via viewBox.
 */
export function GovernanceStack({ tone = 'dark', animate = true, className }: GovernanceStackProps) {
  const isDark = tone === 'dark';

  const c = {
    surface:    isDark ? '#16171A' : 'var(--color-surface)',
    surfaceLow: isDark ? '#0E0F0E' : 'var(--color-surface)',
    inkPrimary: isDark ? 'var(--color-ink-inverse)' : 'var(--color-ink-1)',
    inkSecondary: isDark ? 'rgba(250,250,247,0.65)' : 'var(--color-ink-2)',
    inkMuted:   isDark ? 'rgba(250,250,247,0.40)' : 'var(--color-ink-3)',
    inkFaint:   isDark ? 'rgba(250,250,247,0.22)' : 'var(--color-ink-4)',
    line:       isDark ? 'rgba(250,250,247,0.18)' : 'var(--color-line)',
    lineSoft:   isDark ? 'rgba(250,250,247,0.10)' : 'var(--color-line-soft)',
  };

  const node = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 4 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.55, ease: ease.quiet, delay },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } };

  const conn = (delay: number) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 0.6 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.9, ease: ease.standard, delay },
        }
      : { initial: false as const, animate: { pathLength: 1, opacity: 0.6 } };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-md border',
        isDark ? 'border-[rgba(250,250,247,0.10)] bg-surface-ink' : 'border-line bg-surface',
        className,
      )}
    >
      {/* Subtle architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isDark ? 0.10 : 0.30,
          backgroundImage: `linear-gradient(to right, ${c.lineSoft} 1px, transparent 1px), linear-gradient(to bottom, ${c.lineSoft} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative aspect-[5/7] w-full sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[5/7]">
        <svg
          viewBox="0 0 500 700"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Governance stack — administration, governance layer, identity & lifecycle modules, workspaces"
        >
          {/* ── 1. Administration plane ──────────────────────────────── */}
          <motion.g {...node(0.05)}>
            <rect
              x={60} y={50} width={380} height={64}
              rx={6}
              fill={c.surface}
              stroke={c.line}
              strokeWidth={1}
            />
            <text x={78} y={76} fontFamily="var(--font-mono, ui-monospace)" fontSize={9} fill={c.inkMuted}>
              01
            </text>
            <text
              x={78} y={98}
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={14}
              fill={c.inkPrimary}
            >
              Administration
            </text>
            <text
              x={422} y={98}
              textAnchor="end"
              fontFamily="var(--font-sans)"
              fontWeight={500}
              fontSize={11}
              fill={c.inkMuted}
            >
              Org · Roles · Delegation
            </text>
          </motion.g>

          {/* connector 1 → 2 */}
          <motion.path
            {...conn(0.2)}
            d="M250 114 L250 168"
            fill="none"
            stroke={c.line}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <FlowLabel x={262} y={148} label="policy" color={c.inkFaint} animate={animate} delay={0.3} />

          {/* ── 2. Governance Layer (emphasized) ─────────────────────── */}
          <motion.g {...node(0.25)}>
            <rect
              x={40} y={180} width={420} height={100}
              rx={8}
              fill={c.surfaceLow}
              stroke={c.inkPrimary}
              strokeWidth={1.5}
            />
            <text
              x={58} y={210}
              fontFamily="var(--font-mono, ui-monospace)"
              fontSize={9}
              letterSpacing={1.4}
              fill={c.inkMuted}
            >
              02 · UNIFIED PLANE
            </text>
            <text
              x={58} y={244}
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={20}
              letterSpacing={-0.4}
              fill={c.inkPrimary}
            >
              Governance Layer
            </text>
            <text
              x={58} y={264}
              fontFamily="var(--font-sans)"
              fontWeight={400}
              fontSize={12}
              fill={c.inkSecondary}
            >
              Centralized policy authority — one source of governance truth.
            </text>
          </motion.g>

          {/* connector 2 → 3 */}
          <motion.path
            {...conn(0.5)}
            d="M250 280 L250 334"
            fill="none"
            stroke={c.line}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <FlowLabel x={262} y={314} label="controls" color={c.inkFaint} animate={animate} delay={0.6} />

          {/* ── 3. Identity & Lifecycle modules (5 cells) ────────────── */}
          <motion.g {...node(0.55)}>
            <rect
              x={40} y={346} width={420} height={120}
              rx={8}
              fill={c.surface}
              stroke={c.line}
              strokeWidth={1}
            />
            <text
              x={58} y={372}
              fontFamily="var(--font-mono, ui-monospace)"
              fontSize={9}
              letterSpacing={1.4}
              fill={c.inkMuted}
            >
              03 · IDENTITY & LIFECYCLE
            </text>

            {(['SSO', 'SCIM', 'RBAC', 'AUDIT', 'BGU'] as const).map((m, i) => {
              const cellW = 70;
              const cellH = 60;
              const startX = 56 + i * (cellW + 8);
              const cellY = 388;
              return (
                <motion.g key={m} {...node(0.65 + i * 0.05)}>
                  <rect
                    x={startX} y={cellY} width={cellW} height={cellH} rx={5}
                    fill={c.surfaceLow}
                    stroke={c.line}
                    strokeWidth={1}
                  />
                  <text
                    x={startX + cellW / 2} y={cellY + 34}
                    textAnchor="middle"
                    fontFamily="var(--font-sans)"
                    fontWeight={600}
                    fontSize={13}
                    letterSpacing={-0.2}
                    fill={c.inkPrimary}
                  >
                    {m}
                  </text>
                  <text
                    x={startX + cellW / 2} y={cellY + 50}
                    textAnchor="middle"
                    fontFamily="var(--font-mono, ui-monospace)"
                    fontSize={8}
                    letterSpacing={1.2}
                    fill={c.inkMuted}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </text>
                </motion.g>
              );
            })}
          </motion.g>

          {/* connector 3 → 4 */}
          <motion.path
            {...conn(0.85)}
            d="M250 466 L250 520"
            fill="none"
            stroke={c.line}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <FlowLabel x={262} y={500} label="provision" color={c.inkFaint} animate={animate} delay={0.95} />

          {/* ── 4. Workspaces (multi-tenant fan-out) ─────────────────── */}
          <motion.g {...node(0.95)}>
            <rect
              x={40} y={532} width={420} height={120}
              rx={8}
              fill={c.surface}
              stroke={c.line}
              strokeWidth={1}
            />
            <text
              x={58} y={558}
              fontFamily="var(--font-mono, ui-monospace)"
              fontSize={9}
              letterSpacing={1.4}
              fill={c.inkMuted}
            >
              04 · WORKSPACES
            </text>

            {(['W₁', 'W₂', 'W₃', 'W₄', '…'] as const).map((w, i) => {
              const cellW = 70;
              const cellH = 60;
              const startX = 56 + i * (cellW + 8);
              const cellY = 574;
              return (
                <motion.g key={w} {...node(1.05 + i * 0.04)}>
                  <rect
                    x={startX} y={cellY} width={cellW} height={cellH} rx={5}
                    fill={c.surfaceLow}
                    stroke={c.line}
                    strokeWidth={1}
                  />
                  <text
                    x={startX + cellW / 2} y={cellY + cellH / 2 + 5}
                    textAnchor="middle"
                    fontFamily="var(--font-sans)"
                    fontWeight={600}
                    fontSize={15}
                    letterSpacing={-0.3}
                    fill={c.inkPrimary}
                  >
                    {w}
                  </text>
                </motion.g>
              );
            })}
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

function FlowLabel({
  x, y, label, color, animate, delay,
}: { x: number; y: number; label: string; color: string; animate: boolean; delay: number }) {
  const Wrapper = animate ? motion.text : 'text';
  const props = animate
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.4, delay, ease: ease.quiet },
      }
    : {};
  return (
    <Wrapper
      {...(props as object)}
      x={x}
      y={y}
      fontFamily="var(--font-mono, ui-monospace)"
      fontSize={9}
      letterSpacing={1.2}
      fill={color}
    >
      {label}
    </Wrapper>
  );
}
