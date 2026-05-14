'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

interface CommandCenterMockProps {
  className?: string;
}

/**
 * CommandCenterMock — the governance command center, as a static surface.
 *
 *  [admin.platform · Org Admin]
 *  ┌────────┬────────────────────────────────────────────────────────┐
 *  │ Acme   │ KPI strip · 4 cells                                    │
 *  │ Org    ├────────────────────────────────────────────────────────┤
 *  │ ▣ Org A│ Workspace health table (5 rows × 5 cols)                │
 *  │ ▢ Org B│                                                        │
 *  │ ▢ Org C├─────────────────┬──────────────────────────────────────┤
 *  │        │ Recent admin    │ Governance signal — drift / expiry   │
 *  └────────┴─────────────────┴──────────────────────────────────────┘
 *
 * This is a representational mock. No numbers — only structure and
 * state. The intent is to show what an "operational view" of the
 * governance layer looks like, not to ship a polished BI product.
 */
export function CommandCenterMock({ className }: CommandCenterMockProps) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('w-full', className)}
    >
      {/* Browser-style chrome */}
      <motion.div
        variants={revealUp}
        className="flex items-center justify-between gap-3 rounded-t-md border border-b-0 border-line bg-canvas px-4 py-2.5"
      >
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
          </span>
          <span className="font-mono text-[11px] text-ink-3">
            admin.platform · Org Admin
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          Q4 · Org-level
        </span>
      </motion.div>

      <div className="grid grid-cols-1 rounded-b-md border border-line bg-surface lg:grid-cols-[220px_1fr]">
        {/* ── Left nav · Org switcher ─────────────────────────────── */}
        <motion.aside
          variants={revealUp}
          className="border-b border-line-soft px-5 py-5 lg:border-b-0 lg:border-r"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-eyebrow uppercase text-ink-3">Org Switcher</p>
            <span aria-hidden className="font-mono text-[10px] text-ink-4">3</span>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5">
            <OrgRow name="Acme · Industrial"  active />
            <OrgRow name="Acme · Life Sciences" />
            <OrgRow name="Acme · BFSI" />
          </ul>

          <div className="mt-8 hidden lg:block">
            <p className="text-eyebrow uppercase text-ink-3">In view</p>
            <ul className="mt-4 flex flex-col gap-3 text-[12px] text-ink-2">
              <NavItem label="Overview"   active />
              <NavItem label="Workspaces" />
              <NavItem label="Identity"   />
              <NavItem label="Members"    />
              <NavItem label="Audit"      />
              <NavItem label="Settings"   />
            </ul>
          </div>
        </motion.aside>

        {/* ── Main: KPI + Table + Activity ────────────────────────── */}
        <div className="flex flex-col">
          {/* Page header */}
          <motion.div variants={revealUp} className="flex items-baseline justify-between gap-4 border-b border-line-soft px-6 py-4">
            <div>
              <p className="text-eyebrow uppercase text-ink-3">Org · Overview</p>
              <p className="mt-1.5 text-h3 text-ink-1">Acme · Industrial</p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
              5 workspaces · 4 modules
            </span>
          </motion.div>

          {/* KPI strip */}
          <motion.div
            variants={revealUp}
            className="grid grid-cols-2 gap-px border-b border-line-soft bg-line-soft sm:grid-cols-4"
          >
            <KPI label="Workspaces"      value="5"      sub="all healthy" tone="positive" />
            <KPI label="SSO coverage"    value="5 / 5"  sub="1 cert expires soon" tone="attention" />
            <KPI label="SCIM coverage"   value="4 / 5"  sub="1 manual workspace"  tone="neutral" />
            <KPI label="BGU configured"  value="5 / 5"  sub="all within ceiling"  tone="positive" />
          </motion.div>

          {/* Workspace health table */}
          <motion.div variants={revealUp} className="border-b border-line-soft">
            <div className="flex items-baseline justify-between gap-4 px-6 pb-2 pt-5">
              <p className="text-eyebrow uppercase text-ink-3">Workspace health</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
                last sync · 2m ago
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-line-soft text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    <th className="px-6 py-2.5 font-medium">Workspace</th>
                    <th className="px-3 py-2.5 font-medium">SSO</th>
                    <th className="px-3 py-2.5 font-medium">SCIM</th>
                    <th className="px-3 py-2.5 font-medium">RBAC</th>
                    <th className="px-3 py-2.5 font-medium">Audit</th>
                    <th className="px-6 py-2.5 font-medium">Last activity</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKSPACE_HEALTH.map((w) => (
                    <tr key={w.name} className="border-b border-line-soft last:border-b-0">
                      <td className="px-6 py-2.5 font-mono text-ink-1">{w.name}</td>
                      <td className="px-3 py-2.5"><Pill tone={w.sso} /></td>
                      <td className="px-3 py-2.5"><Pill tone={w.scim} /></td>
                      <td className="px-3 py-2.5"><Pill tone={w.rbac} /></td>
                      <td className="px-3 py-2.5"><Pill tone={w.audit} /></td>
                      <td className="px-6 py-2.5 text-ink-2">{w.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bottom split: Activity stream + Governance signal */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
            <motion.div variants={revealUp} className="border-b border-line-soft px-6 py-5 lg:border-b-0 lg:border-r">
              <p className="text-eyebrow uppercase text-ink-3">Recent administrative activity</p>
              <ul className="mt-4 flex flex-col gap-3 text-[12px]">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="flex items-baseline gap-3">
                    <span aria-hidden className={cn(
                      'mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ring-2',
                      ACTIVITY_TONE[a.tone].dot,
                      ACTIVITY_TONE[a.tone].ring,
                    )} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">
                      {a.time}
                    </span>
                    <span className="text-ink-1 text-balance">{a.event}</span>
                    <span className="ml-auto font-mono text-[11px] text-ink-3">{a.actor}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={revealUp} className="px-6 py-5">
              <p className="text-eyebrow uppercase text-ink-3">Governance signal</p>
              <ul className="mt-4 flex flex-col gap-3 text-[12px] text-ink-1">
                <Signal kind="attention" label="Cert · W₃" body="Expires in 19 days" />
                <Signal kind="critical"  label="SCIM · W₅" body="No payload received in 6 hours" />
                <Signal kind="neutral"   label="BGU · W₂" body="Emergency login · 3 hours ago" />
                <Signal kind="positive"  label="Audit · org" body="14 lifecycle events normalized" />
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="max-w-[60ch] text-body-sm text-ink-3 text-pretty">
          A representational mock — every module from prior sections, collapsed into a single
          operational view at the org level. Healthy by default, named by exception.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Org admin · governance signal layer
        </p>
      </figcaption>
    </motion.figure>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Subcomponents
 * ──────────────────────────────────────────────────────────────────── */

type Tone = 'positive' | 'attention' | 'critical' | 'neutral' | 'inactive';

const TONE_CLASS: Record<Tone, string> = {
  positive:  'bg-signal-positive',
  attention: 'bg-signal-attention',
  critical:  'bg-signal-critical',
  neutral:   'bg-ink-1',
  inactive:  'bg-line-strong',
};

const ACTIVITY_TONE: Record<Exclude<Tone, 'inactive'>, { dot: string; ring: string }> = {
  positive:  { dot: 'bg-signal-positive',  ring: 'ring-signal-positive/30'  },
  attention: { dot: 'bg-signal-attention', ring: 'ring-signal-attention/30' },
  critical:  { dot: 'bg-signal-critical',  ring: 'ring-signal-critical/30'  },
  neutral:   { dot: 'bg-ink-1',            ring: 'ring-ink-1/20'            },
};

function OrgRow({ name, active }: { name: string; active?: boolean }) {
  return (
    <li
      className={cn(
        'flex items-center gap-2.5 rounded-sm border px-2.5 py-1.5 text-[12px] transition-colors',
        active ? 'border-line-strong bg-surface text-ink-1' : 'border-transparent text-ink-2 hover:bg-canvas/60',
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-sm', active ? 'bg-ink-1' : 'bg-line-strong')} />
      <span className="truncate font-mono text-[11px]">{name}</span>
    </li>
  );
}

function NavItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <li className={cn('flex items-center gap-2', active && 'text-ink-1 font-medium')}>
      <span aria-hidden className={cn('h-1 w-1 rounded-full', active ? 'bg-ink-1' : 'bg-transparent')} />
      <span>{label}</span>
    </li>
  );
}

function KPI({
  label, value, sub, tone,
}: { label: string; value: string; sub: string; tone: Tone }) {
  return (
    <div className="bg-surface px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-eyebrow uppercase text-ink-3">{label}</p>
        <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', TONE_CLASS[tone])} />
      </div>
      <p
        className="mt-2 text-ink-1 tabular-nums"
        style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-ink-3">{sub}</p>
    </div>
  );
}

function Pill({ tone }: { tone: Tone }) {
  if (tone === 'inactive') {
    return <span className="inline-flex items-center gap-2 text-[11px] text-ink-3">
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', TONE_CLASS[tone])} />
      manual
    </span>;
  }
  const label = tone === 'positive' ? 'healthy' : tone === 'attention' ? 'attention' : tone === 'critical' ? 'critical' : 'active';
  return (
    <span className="inline-flex items-center gap-2 text-[11px] text-ink-1">
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', TONE_CLASS[tone])} />
      {label}
    </span>
  );
}

function Signal({ kind, label, body }: { kind: Exclude<Tone, 'inactive'>; label: string; body: string }) {
  return (
    <li className="flex items-start gap-3 text-pretty">
      <span aria-hidden className={cn(
        'mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ring-2',
        ACTIVITY_TONE[kind].dot,
        ACTIVITY_TONE[kind].ring,
      )} />
      <span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{label}</span>
        <span className="ml-2 text-ink-1">{body}</span>
      </span>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Static, representational data
 * ──────────────────────────────────────────────────────────────────── */

const WORKSPACE_HEALTH: Array<{
  name: string;
  sso: Tone; scim: Tone; rbac: Tone; audit: Tone;
  activity: string;
}> = [
  { name: 'Workspace A', sso: 'positive',  scim: 'positive', rbac: 'positive', audit: 'positive',  activity: 'role mapping updated · 3h ago' },
  { name: 'Workspace B', sso: 'positive',  scim: 'positive', rbac: 'positive', audit: 'positive',  activity: 'BGU login · 3h ago' },
  { name: 'Workspace C', sso: 'attention', scim: 'positive', rbac: 'positive', audit: 'positive',  activity: 'cert expiring · 19d remaining' },
  { name: 'Workspace D', sso: 'positive',  scim: 'positive', rbac: 'positive', audit: 'positive',  activity: '12 users provisioned · today' },
  { name: 'Workspace E', sso: 'positive',  scim: 'critical', rbac: 'positive', audit: 'attention', activity: 'SCIM stalled · 6h ago' },
];

const ACTIVITY: Array<{ time: string; event: string; actor: string; tone: Exclude<Tone, 'inactive'> }> = [
  { time: '14:42', event: 'Role mapping rule added on Workspace A',                       actor: 'p.morton',  tone: 'neutral'   },
  { time: '13:08', event: 'Break-Glass login · Workspace B',                              actor: 'system',    tone: 'attention' },
  { time: '12:55', event: 'SCIM payload received without mapped attribute · Workspace E', actor: 'system',    tone: 'critical'  },
  { time: '11:20', event: 'Temp user re-invited · 90-day expiry · Workspace D',           actor: 'a.lakshmi', tone: 'neutral'   },
  { time: '09:14', event: 'Audit export · all workspaces · last 7 days',                  actor: 'p.morton',  tone: 'positive'  },
];
