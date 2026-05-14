'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

interface GovernanceDiagramProps {
  /** Visual mode. */
  tone?: 'light' | 'dark';
  /** Animate strokes & nodes on viewport entry. */
  animate?: boolean;
  /** Show the architectural label inside the surface. */
  showLabel?: boolean;
  className?: string;
}

/**
 * GovernanceDiagram — full-width architecture map.
 *
 *  ┌──────────┐       ┌────────── A UNIFIED GOVERNANCE LAYER ─────────┐       ┌───────────┐
 *  │ IDENTITY │       │         GOVERNANCE PLATFORM                    │       │ WORKSPACES│
 *  │PROVIDERS │ ←→    │  [SSO]  [SCIM]  [RBAC]  [AUDIT]  [API TOKENS]  │  ←→   │  (ENTs)   │
 *  │ Okta     │       └────────────────────────────────────────────────┘       │ Tenant A  │
 *  │ Azure AD │                          │                                     │ Tenant B  │
 *  │ OneLogin │                          ↓                                     │ Tenant C  │
 *  │ Google   │                ┌─────────────────────┐                         │  ...      │
 *  │   ...    │                │ BREAK-GLASS ACCESS  │                         │           │
 *  └──────────┘                │ Emergency · Continuity                        └───────────┘
 *                              └─────────────────────┘
 *
 * Faithful to the actual project architecture. No branded colors —
 * monochrome with hairline rules. The diagram is the section's
 * editorial centerpiece, so it scales gracefully via SVG viewBox.
 */
export function GovernanceDiagram({
  tone = 'light',
  animate = true,
  showLabel = true,
  className,
}: GovernanceDiagramProps) {
  const isDark = tone === 'dark';

  // Token references resolved via CSS variables. Defining them up-front so
  // the SVG body stays declarative.
  const c = {
    surface: isDark ? 'var(--color-surface-ink)' : 'var(--color-surface)',
    surfaceInner: isDark ? '#16171A' : 'var(--color-surface)',
    line: isDark ? 'rgba(250,250,247,0.18)' : 'var(--color-line)',
    lineSoft: isDark ? 'rgba(250,250,247,0.08)' : 'var(--color-line-soft)',
    inkPrimary: isDark ? 'var(--color-ink-inverse)' : 'var(--color-ink-1)',
    inkSecondary: isDark ? 'rgba(250,250,247,0.65)' : 'var(--color-ink-2)',
    inkMuted: isDark ? 'rgba(250,250,247,0.40)' : 'var(--color-ink-3)',
  };

  const connectorDraw = (delay: number) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 0.7 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 1.0, ease: ease.standard, delay },
        }
      : {
          initial: false as const,
          animate: { pathLength: 1, opacity: 0.7 },
        };

  const nodeFade = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 4 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.55, ease: ease.quiet, delay },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } };

  const idps = ['Okta', 'Azure AD', 'OneLogin', 'Google IdP'];
  const modules: { id: string; label: string }[] = [
    { id: 'sso',   label: 'SSO' },
    { id: 'scim',  label: 'SCIM' },
    { id: 'rbac',  label: 'RBAC' },
    { id: 'audit', label: 'Audit Logs' },
    { id: 'tokens',label: 'API Tokens' },
  ];
  const workspaces = ['Workspace A', 'Workspace B', 'Workspace C', 'Workspace D'];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-md border',
        isDark ? 'border-[rgba(250,250,247,0.10)] bg-surface-ink' : 'border-line bg-surface',
        className,
      )}
    >
      {/* Faint architectural grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isDark ? 0.12 : 0.35,
          backgroundImage: `linear-gradient(to right, ${c.lineSoft} 1px, transparent 1px), linear-gradient(to bottom, ${c.lineSoft} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative aspect-[16/9] w-full">
        <svg
          viewBox="0 0 1200 680"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Unified governance layer architecture — identity providers, governance platform, workspaces, break-glass access"
        >
          {/* ── Section label ──────────────────────────────────────────── */}
          {showLabel && (
            <motion.text
              {...nodeFade(0.05)}
              x={600}
              y={70}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={12}
              letterSpacing={3.5}
              fill={c.inkMuted}
            >
              A UNIFIED GOVERNANCE LAYER
            </motion.text>
          )}

          {/* ── Identity Providers column (left) ────────────────────────── */}
          <ColumnFrame
            x={40} y={120} w={220} h={420}
            title="IDENTITY PROVIDERS"
            tone={tone}
            delay={0.1}
            animate={animate}
          >
            {idps.map((label, i) => (
              <ListItem key={label} index={i} label={label} tone={tone} delay={0.15 + i * 0.04} animate={animate} />
            ))}
            <ListItem index={idps.length} label="…" tone={tone} muted delay={0.15 + idps.length * 0.04} animate={animate} />
          </ColumnFrame>

          {/* ── Governance Platform (center, top) ───────────────────────── */}
          <motion.g {...nodeFade(0.2)}>
            <rect
              x={300} y={140} width={620} height={180}
              rx={8}
              fill={c.surfaceInner}
              stroke={c.inkPrimary}
              strokeWidth={1.5}
            />
            <text
              x={610} y={172}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={11}
              letterSpacing={2.6}
              fill={c.inkMuted}
            >
              GOVERNANCE PLATFORM
            </text>
            {/* divider beneath title */}
            <line x1={330} x2={890} y1={188} y2={188} stroke={c.line} strokeWidth={1} />

            {modules.map((m, i) => {
              const cellW = 110;
              const startX = 340 + i * (cellW + 5);
              const cellY = 210;
              const cellH = 90;
              return (
                <motion.g key={m.id} {...nodeFade(0.3 + i * 0.05)}>
                  <rect
                    x={startX} y={cellY} width={cellW} height={cellH} rx={6}
                    fill={c.surface}
                    stroke={c.line}
                    strokeWidth={1}
                  />
                  {/* abstract typographic glyph: module index */}
                  <text
                    x={startX + 14} y={cellY + 22}
                    fontFamily="var(--font-mono, ui-monospace)"
                    fontSize={10}
                    fill={c.inkMuted}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </text>
                  <text
                    x={startX + cellW / 2} y={cellY + cellH / 2 + 8}
                    textAnchor="middle"
                    fontFamily="var(--font-sans)"
                    fontWeight={600}
                    fontSize={15}
                    letterSpacing={-0.3}
                    fill={c.inkPrimary}
                  >
                    {m.label}
                  </text>
                </motion.g>
              );
            })}
          </motion.g>

          {/* ── Break-Glass Access (center, bottom) ─────────────────────── */}
          <motion.g {...nodeFade(0.65)}>
            <rect
              x={400} y={420} width={420} height={100}
              rx={8}
              fill={c.surfaceInner}
              stroke={c.line}
              strokeWidth={1}
              strokeDasharray="6 4"
            />
            <text
              x={610} y={452}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={600}
              fontSize={11}
              letterSpacing={2.6}
              fill={c.inkMuted}
            >
              BREAK-GLASS ACCESS
            </text>
            <text
              x={610} y={488}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontWeight={500}
              fontSize={14}
              letterSpacing={-0.2}
              fill={c.inkPrimary}
            >
              Emergency Access  ·  Operational Continuity
            </text>
          </motion.g>

          {/* ── Workspaces column (right) ───────────────────────────────── */}
          <ColumnFrame
            x={940} y={120} w={220} h={420}
            title="WORKSPACES"
            subtitle="ENTERPRISE TENANTS"
            tone={tone}
            delay={0.45}
            animate={animate}
          >
            {workspaces.map((label, i) => (
              <ListItem key={label} index={i} label={label} tone={tone} delay={0.5 + i * 0.04} animate={animate} />
            ))}
            <ListItem index={workspaces.length} label="…" tone={tone} muted delay={0.5 + workspaces.length * 0.04} animate={animate} />
          </ColumnFrame>

          {/* ── Connectors ──────────────────────────────────────────────── */}
          {/* IdPs ↔ Governance */}
          <motion.path {...connectorDraw(0.25)}
            d="M260 230 L300 230" fill="none" stroke={c.inkPrimary} strokeWidth={1.25}
          />
          <motion.path {...connectorDraw(0.27)}
            d="M260 250 L300 250" fill="none" stroke={c.inkPrimary} strokeWidth={1.25}
          />
          <ArrowHead x={300} y={230} dir="right" color={c.inkPrimary} delay={0.5} animate={animate} />
          <ArrowHead x={260} y={250} dir="left"  color={c.inkPrimary} delay={0.55} animate={animate} />

          {/* Governance ↔ Workspaces */}
          <motion.path {...connectorDraw(0.5)}
            d="M920 230 L940 230" fill="none" stroke={c.inkPrimary} strokeWidth={1.25}
          />
          <motion.path {...connectorDraw(0.52)}
            d="M920 250 L940 250" fill="none" stroke={c.inkPrimary} strokeWidth={1.25}
          />
          <ArrowHead x={940} y={230} dir="right" color={c.inkPrimary} delay={0.7} animate={animate} />
          <ArrowHead x={920} y={250} dir="left"  color={c.inkPrimary} delay={0.75} animate={animate} />

          {/* Governance → BGU */}
          <motion.path {...connectorDraw(0.7)}
            d="M610 320 L610 420" fill="none" stroke={c.line} strokeWidth={1} strokeDasharray="4 4"
          />

          {/* ── Flow labels (subtle) ────────────────────────────────────── */}
          <motion.text {...nodeFade(0.85)}
            x={280} y={216} textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace)" fontSize={9}
            letterSpacing={1.2} fill={c.inkMuted}
          >
            FEDERATE
          </motion.text>
          <motion.text {...nodeFade(0.88)}
            x={930} y={216} textAnchor="middle"
            fontFamily="var(--font-mono, ui-monospace)" fontSize={9}
            letterSpacing={1.2} fill={c.inkMuted}
          >
            PROVISION
          </motion.text>
          <motion.text {...nodeFade(0.9)}
            x={622} y={372} textAnchor="start"
            fontFamily="var(--font-mono, ui-monospace)" fontSize={9}
            letterSpacing={1.2} fill={c.inkMuted}
          >
            FALLBACK
          </motion.text>
        </svg>
      </div>

      {/* Architectural caption row — outside the SVG, on the surface */}
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-t px-6 py-3 text-[11px] uppercase tracking-[0.16em]',
          isDark
            ? 'border-[rgba(250,250,247,0.10)] text-[rgba(250,250,247,0.45)]'
            : 'border-line-soft text-ink-3',
        )}
      >
        <span>Identity ⟶ Policy ⟶ Workspaces</span>
        <span className="font-mono text-[10px] tracking-[0.2em]">v2.0 · architecture</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Internal helpers — kept colocated to avoid leaking primitives.
 * ──────────────────────────────────────────────────────────────────── */

function ColumnFrame({
  x, y, w, h, title, subtitle, tone, delay, animate, children,
}: {
  x: number; y: number; w: number; h: number;
  title: string; subtitle?: string;
  tone: 'light' | 'dark';
  delay: number;
  animate: boolean;
  children: React.ReactNode;
}) {
  const isDark = tone === 'dark';
  const surface = isDark ? '#16171A' : 'var(--color-surface)';
  const line = isDark ? 'rgba(250,250,247,0.18)' : 'var(--color-line)';
  const muted = isDark ? 'rgba(250,250,247,0.45)' : 'var(--color-ink-3)';

  const Wrapper = animate ? motion.g : 'g';
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, y: 4 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.55, ease: ease.quiet, delay },
      }
    : {};

  return (
    <Wrapper {...(wrapperProps as object)}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={surface} stroke={line} strokeWidth={1} />
      <text
        x={x + w / 2} y={y + 28}
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontWeight={600}
        fontSize={11}
        letterSpacing={2.6}
        fill={muted}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2} y={y + 46}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight={500}
          fontSize={10}
          letterSpacing={1.4}
          fill={muted}
        >
          {subtitle}
        </text>
      )}
      <line x1={x + 24} x2={x + w - 24} y1={y + 64} y2={y + 64} stroke={line} strokeWidth={1} />
      {/* Children (list items) are positioned absolutely within this group */}
      <g transform={`translate(${x + 24}, ${y + 92})`}>{children}</g>
    </Wrapper>
  );
}

function ListItem({
  index, label, tone, muted, delay, animate,
}: {
  index: number; label: string; tone: 'light' | 'dark'; muted?: boolean; delay: number; animate: boolean;
}) {
  const isDark = tone === 'dark';
  const ink = isDark
    ? muted ? 'rgba(250,250,247,0.40)' : 'var(--color-ink-inverse)'
    : muted ? 'var(--color-ink-3)' : 'var(--color-ink-1)';

  const Wrapper = animate ? motion.g : 'g';
  const props = animate
    ? {
        initial: { opacity: 0, x: -4 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.45, ease: ease.quiet, delay },
      }
    : {};

  return (
    <Wrapper {...(props as object)}>
      <text
        x={0} y={index * 42}
        fontFamily="var(--font-mono, ui-monospace)"
        fontSize={9}
        fill={isDark ? 'rgba(250,250,247,0.40)' : 'var(--color-ink-4)'}
      >
        {String(index + 1).padStart(2, '0')}
      </text>
      <text
        x={28} y={index * 42}
        fontFamily="var(--font-sans)"
        fontWeight={500}
        fontSize={13}
        fill={ink}
      >
        {label}
      </text>
    </Wrapper>
  );
}

function ArrowHead({
  x, y, dir, color, delay, animate,
}: {
  x: number; y: number; dir: 'left' | 'right'; color: string; delay: number; animate: boolean;
}) {
  const path = dir === 'right' ? `M${x - 6} ${y - 4} L${x} ${y} L${x - 6} ${y + 4}` : `M${x + 6} ${y - 4} L${x} ${y} L${x + 6} ${y + 4}`;
  const Wrapper = animate ? motion.path : 'path';
  const props = animate
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 0.8 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.4, ease: ease.quiet, delay },
      }
    : {};
  return <Wrapper {...(props as object)} d={path} fill="none" stroke={color} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />;
}
