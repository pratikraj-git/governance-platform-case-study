'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease } from '@/lib/motion';

interface SCIMSyncFlowProps {
  className?: string;
}

/**
 * SCIMSyncFlow — the orchestration loop, end to end.
 *
 *  IdP → Governance Layer → Per-Workspace Resolution → Workspace Effect
 *                                ↑                              │
 *                                └──── Audit & Telemetry ◀──────┘
 *
 * Five planes, two directional flows. Pure SVG so it scales gracefully.
 * The point is to read top-to-bottom as policy/identity, and bottom-up
 * as telemetry — making the IdP-as-source-of-truth contract visible.
 */
export function SCIMSyncFlow({ className }: SCIMSyncFlowProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-md border border-line bg-surface',
        className,
      )}
    >
      {/* grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-line-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line-soft) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative aspect-[16/9] w-full">
        <svg
          viewBox="0 0 1200 680"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="SCIM synchronization flow — IdP, governance layer, per-workspace resolution, workspaces, audit"
        >
          {/* ── 1. IdP source ─────────────────────────────────────── */}
          <Plane x={80} y={80} w={1040} h={84} title="IDENTITY PROVIDER" subtitle="Okta · Azure AD · OneLogin · Google" delay={0.05}>
            <Tag x={420} y={132} text="Push New Users" />
            <Tag x={580} y={132} text="Push Profile Updates" />
            <Tag x={780} y={132} text="Push Groups" />
          </Plane>

          {/* ↓ */}
          <DownArrow x={600} y1={172} y2={216} label="SCIM 2.0" delay={0.18} />

          {/* ── 2. Governance Layer ───────────────────────────────── */}
          <Plane
            x={80} y={220} w={1040} h={88}
            title="GOVERNANCE LAYER · SCIM ENDPOINT"
            subtitle="Bearer-authenticated · One contract · One audit stream"
            delay={0.2}
            emphasized
          >
            <Tag x={420} y={276} text="Token resolved" />
            <Tag x={580} y={276} text="Routing decided" />
            <Tag x={780} y={276} text="Telemetry captured" />
          </Plane>

          {/* ↓ */}
          <DownArrow x={600} y1={316} y2={360} label="route per workspace" delay={0.35} />

          {/* ── 3. Per-workspace resolution ────────────────────────── */}
          <Plane
            x={80} y={364} w={1040} h={120}
            title="PER-WORKSPACE RESOLUTION"
            subtitle="Step 2: identification · Step 3: role mapping · Re-evaluated on every sync"
            delay={0.4}
          >
            {/* 3 per-workspace cells */}
            {(['W₂', 'W₃', 'W₄'] as const).map((w, i) => (
              <ResolutionCell key={w} x={120 + i * 340} y={420} label={w} delay={0.5 + i * 0.06} />
            ))}
          </Plane>

          {/* ↓ */}
          <DownArrow x={600} y1={492} y2={536} label="project policy" delay={0.65} />

          {/* ── 4. Workspaces (terminal effects) ──────────────────── */}
          <Plane x={80} y={540} w={1040} h={80} title="WORKSPACES" subtitle="Users provisioned · roles applied · access granted" delay={0.7}>
            <Tag x={420} y={592} text="Provisioned" />
            <Tag x={580} y={592} text="Deprovisioned" />
            <Tag x={780} y={592} text="Role updated" />
          </Plane>

          {/* ── Return path: audit/telemetry ──────────────────────── */}
          {/* Curve from workspaces back to governance layer on the right side */}
          <ReturnPath
            d="M1100 580 L1160 580 L1160 264 L1120 264"
            label="audit & telemetry"
            delay={0.85}
          />
        </svg>
      </div>

      {/* Caption row */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink-3">
        <span>IdP is the sole source of truth — manual role changes are disabled on managed users.</span>
        <span className="font-mono text-[10px] tracking-[0.2em]">≤ 400ms · 15-min provisioning latency</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * SVG primitives — colocated to keep the diagram readable.
 * ──────────────────────────────────────────────────────────────────── */

function Plane({
  x, y, w, h, title, subtitle, delay, emphasized, children,
}: {
  x: number; y: number; w: number; h: number;
  title: string; subtitle?: string;
  delay: number;
  emphasized?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.55, delay, ease: ease.quiet }}
    >
      <rect
        x={x} y={y} width={w} height={h} rx={8}
        fill="var(--color-surface)"
        stroke={emphasized ? 'var(--color-ink-1)' : 'var(--color-line)'}
        strokeWidth={emphasized ? 1.5 : 1}
      />
      <text
        x={x + 24} y={y + 28}
        fontFamily="var(--font-sans)" fontWeight={600} fontSize={11}
        letterSpacing={2.4} fill="var(--color-ink-3)"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + 24} y={y + 50}
          fontFamily="var(--font-sans)" fontWeight={400} fontSize={12}
          fill="var(--color-ink-2)"
        >
          {subtitle}
        </text>
      )}
      {children}
    </motion.g>
  );
}

function Tag({ x, y, text }: { x: number; y: number; text: string }) {
  // approximate width based on character count for the chip background
  const w = Math.max(110, text.length * 7 + 24);
  return (
    <g>
      <rect
        x={x - w / 2} y={y - 14} width={w} height={22} rx={4}
        fill="var(--color-surface-mute)"
        stroke="var(--color-line-soft)"
        strokeWidth={1}
      />
      <text
        x={x} y={y + 1}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace)" fontSize={10}
        letterSpacing={0.6} fill="var(--color-ink-2)"
      >
        {text}
      </text>
    </g>
  );
}

function ResolutionCell({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.45, delay, ease: ease.quiet }}
    >
      <rect
        x={x} y={y} width={300} height={48} rx={6}
        fill="var(--color-surface)"
        stroke="var(--color-line)"
        strokeWidth={1}
      />
      <text
        x={x + 16} y={y + 20}
        fontFamily="var(--font-mono, ui-monospace)" fontSize={10}
        letterSpacing={1.2} fill="var(--color-ink-3)"
      >
        WORKSPACE {label}
      </text>
      <text
        x={x + 16} y={y + 38}
        fontFamily="var(--font-sans)" fontWeight={500} fontSize={12}
        fill="var(--color-ink-1)"
      >
        identify · map · provision
      </text>
    </motion.g>
  );
}

function DownArrow({
  x, y1, y2, label, delay,
}: { x: number; y1: number; y2: number; label?: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.5, delay, ease: ease.quiet }}
    >
      <motion.line
        x1={x} y1={y1} x2={x} y2={y2 - 6}
        stroke="var(--color-ink-3)" strokeWidth={1}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.5, delay, ease: ease.standard }}
      />
      <path
        d={`M${x - 4} ${y2 - 6} L${x} ${y2} L${x + 4} ${y2 - 6}`}
        fill="none" stroke="var(--color-ink-3)" strokeWidth={1}
        strokeLinecap="round" strokeLinejoin="round"
      />
      {label && (
        <text
          x={x + 14} y={(y1 + y2) / 2 + 2}
          fontFamily="var(--font-mono, ui-monospace)" fontSize={10}
          letterSpacing={1.2} fill="var(--color-ink-4)"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

function ReturnPath({ d, label, delay }: { d: string; label: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.6, delay, ease: ease.quiet }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-ink-3)"
        strokeWidth={1}
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.9, delay, ease: ease.standard }}
      />
      {/* Terminal arrow into the governance layer */}
      <path
        d="M1126 264 L1120 260 L1120 268 Z"
        fill="var(--color-ink-3)"
      />
      <text
        x={1175} y={420}
        textAnchor="middle"
        fontFamily="var(--font-mono, ui-monospace)" fontSize={10}
        letterSpacing={1.2} fill="var(--color-ink-3)"
        transform="rotate(-90 1175 420)"
      >
        {label}
      </text>
    </motion.g>
  );
}
