'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

interface TeammatesTableProps {
  className?: string;
}

type RowKind = 'active' | 'disabled' | 'temp-active' | 'temp-expired';

interface TeammateRow {
  kind: RowKind;
  email: string;
  role: string;
  /** Authority owner — IdP or admin. */
  source: 'IdP · SCIM' | 'Admin · Manual';
  /** State chip label. */
  state: string;
  /** Lifecycle markers. */
  status: string;
  /** Allowed administrative actions surfaced as chips. */
  actions: readonly string[];
}

const ROWS: TeammateRow[] = [
  {
    kind: 'active',
    email: 'a.lakshmi@acme.com',
    role: 'Account Manager',
    source: 'IdP · SCIM',
    state: 'Active',
    status: 'Permanent',
    actions: ['Edit role (IdP)', 'View activity'],
  },
  {
    kind: 'active',
    email: 'p.morton@acme.com',
    role: 'Content Manager',
    source: 'Admin · Manual',
    state: 'Active',
    status: 'Permanent',
    actions: ['Edit role', 'Disable', 'Transfer ownership'],
  },
  {
    kind: 'disabled',
    email: 'r.ito@acme.com',
    role: 'Translator',
    source: 'IdP · SCIM',
    state: 'Disabled',
    status: 'Permanent · Inactive',
    actions: ['Activate (IdP)', 'Delete · reassign content'],
  },
  {
    kind: 'temp-active',
    email: 'd.fernandez@contractor.io',
    role: 'Editor',
    source: 'Admin · Manual',
    state: 'Temp',
    status: 'Expires T+7 days',
    actions: ['Make permanent', 'Extend (max 90d)', 'Edit', 'Delete'],
  },
  {
    kind: 'temp-expired',
    email: 'k.olsson@partner.eu',
    role: 'Translator',
    source: 'Admin · Manual',
    state: 'Temp · Expired',
    status: 'Deactivated · 00:00 T+90',
    actions: ['Re-invite', 'Delete'],
  },
];

const STATE_STYLE: Record<RowKind, { dot: string; ring: string; chipBorder: string; chipText: string }> = {
  active:        { dot: 'bg-signal-positive',  ring: 'ring-signal-positive/30',  chipBorder: 'border-line',     chipText: 'text-ink-1' },
  disabled:      { dot: 'bg-ink-3',            ring: 'ring-ink-3/20',            chipBorder: 'border-line',     chipText: 'text-ink-2' },
  'temp-active': { dot: 'bg-signal-attention', ring: 'ring-signal-attention/30', chipBorder: 'border-line',     chipText: 'text-ink-1' },
  'temp-expired':{ dot: 'bg-signal-critical',  ring: 'ring-signal-critical/30',  chipBorder: 'border-dashed border-line-strong', chipText: 'text-ink-2' },
};

/**
 * TeammatesTable — the steady-state Teammates surface, in five canonical rows.
 *
 * One row per user type the platform actually distinguishes: Active permanent,
 * Disabled, Temporary active, and Temporary expired. A "Source" column makes
 * the authority model legible at a glance — which records the admin can
 * change in the dashboard, and which the IdP controls via SCIM.
 *
 * The point is the matrix, not the data. Email addresses, roles, and
 * dates are stand-ins; the structural information is in the columns.
 */
export function TeammatesTable({ className }: TeammatesTableProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'overflow-hidden rounded-md border border-line bg-surface',
        className,
      )}
    >
      <motion.header
        variants={revealUp}
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line-soft bg-canvas px-5 py-3"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Teammates · Workspace W₂
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          5 of 1,248 · filtered by state
        </span>
      </motion.header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-line-soft text-[11px] uppercase tracking-[0.14em] text-ink-3">
              <th className="px-5 py-3 font-medium">Member</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Source</th>
              <th className="px-5 py-3 font-medium">State</th>
              <th className="px-5 py-3 font-medium">Lifecycle</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const s = STATE_STYLE[r.kind];
              return (
                <motion.tr
                  key={r.email}
                  variants={revealUp}
                  className={cn(
                    'border-b border-line-soft last:border-b-0 transition-colors',
                    i % 2 === 1 && 'bg-canvas/40',
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-[12px] text-ink-1">{r.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-1">{r.role}</td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'rounded-sm border bg-surface px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em]',
                        r.source === 'IdP · SCIM' ? 'border-ink-1 text-ink-1' : 'border-line text-ink-2',
                      )}
                    >
                      {r.source}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-ink-1">
                      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full ring-2', s.dot, s.ring)} />
                      <span>{r.state}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink-2 text-[12px]">{r.status}</td>
                  <td className="px-5 py-4">
                    <ul className="flex flex-wrap gap-1.5">
                      {r.actions.map((a) => (
                        <li
                          key={a}
                          className={cn(
                            'rounded-sm border bg-surface px-2 py-0.5 text-[11px]',
                            s.chipBorder,
                            s.chipText,
                          )}
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <motion.footer
        variants={revealUp}
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft bg-canvas px-5 py-3 text-[12px] text-ink-2"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          Authority model
        </span>
        <span className="text-pretty">
          When SCIM is active, role and lifecycle controls fall to the IdP. The dashboard surfaces — but
          does not duplicate — that authority.
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 sm:ml-auto">
          Source of truth · IdP / Admin
        </span>
      </motion.footer>
    </motion.div>
  );
}
