'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

interface AuthorityHandoffDiagramProps {
  className?: string;
}

interface Capability {
  label: string;
  /** Description of what shifts. */
  body: string;
}

/**
 * AuthorityHandoffDiagram — what changes when SCIM is on.
 *
 * Two columns, three operational rows. Each row names a capability and
 * shows which authority owns it under each state. The point is that
 * the dashboard's surface stays consistent — only the editability moves.
 *
 *                SCIM off (admin-led)        SCIM on (IdP-led)
 *   Invite          add manually                disabled
 *   Role change     admin · dashboard           IdP attribute (sync)
 *   Disable         admin · dashboard           IdP deprovision
 */
export function AuthorityHandoffDiagram({ className }: AuthorityHandoffDiagramProps) {
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
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-soft bg-canvas px-5 py-3"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          Authority hand-off · By SCIM state
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-4">
          Same surface · Different control
        </span>
      </motion.header>

      <div className="grid grid-cols-1 divide-y divide-line-soft md:grid-cols-[1fr_1fr_1fr] md:divide-y-0 md:divide-x">
        {/* Capability column */}
        <div className="bg-surface-mute px-5 py-4">
          <p className="text-eyebrow uppercase text-ink-4">Capability</p>
          <ul className="mt-4 flex flex-col">
            {CAPABILITIES.map((c, i) => (
              <li key={c.label} className={cn('py-4', i < CAPABILITIES.length - 1 && 'border-b border-line-soft')}>
                <p className="text-body font-medium text-ink-1">{c.label}</p>
                <p className="mt-1.5 text-body-sm text-ink-2 text-pretty">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* SCIM off column */}
        <AuthorityColumn
          label="SCIM disabled"
          subtitle="Admin-led"
          rows={[
            { kind: 'admin', value: 'Invite via email · set role' },
            { kind: 'admin', value: 'Edit role in dashboard' },
            { kind: 'admin', value: 'Disable / re-enable user' },
            { kind: 'admin', value: 'Reassign on delete' },
          ]}
        />

        {/* SCIM on column */}
        <AuthorityColumn
          label="SCIM enabled"
          subtitle="IdP-led"
          emphasized
          rows={[
            { kind: 'locked', value: 'Manual invite disabled' },
            { kind: 'locked', value: 'Role mapped via attribute' },
            { kind: 'locked', value: 'Lifecycle via SCIM sync' },
            { kind: 'admin',  value: 'Reassign on delete (still admin)' },
          ]}
        />
      </div>

      <motion.footer
        variants={revealUp}
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft bg-canvas px-5 py-3 text-[12px] text-ink-2"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
          One source of truth at a time
        </span>
        <span className="text-pretty">
          The platform never forks authority — manual paths close cleanly when SCIM
          is active, and reopen when it isn’t.
        </span>
      </motion.footer>
    </motion.div>
  );
}

const CAPABILITIES: Capability[] = [
  { label: 'Invite',           body: 'Adding new members to the workspace.' },
  { label: 'Role assignment',  body: 'Determining what a user can do once provisioned.' },
  { label: 'Lifecycle',        body: 'Activate, disable, deprovision over time.' },
  { label: 'Ownership transfer', body: 'Reassigning content and assets on offboarding.' },
];

function AuthorityColumn({
  label, subtitle, rows, emphasized,
}: {
  label: string;
  subtitle: string;
  rows: Array<{ kind: 'admin' | 'locked'; value: string }>;
  emphasized?: boolean;
}) {
  return (
    <motion.div variants={revealUp} className={cn('px-5 py-4', emphasized && 'bg-canvas/40')}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-eyebrow uppercase text-ink-3">{label}</p>
        <span
          className={cn(
            'rounded-sm border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em]',
            emphasized ? 'border-ink-1 text-ink-1' : 'border-line text-ink-2',
          )}
        >
          {subtitle}
        </span>
      </div>

      <ul className="mt-4 flex flex-col">
        {rows.map((r, i) => (
          <li key={i} className={cn('flex items-start gap-3 py-4', i < rows.length - 1 && 'border-b border-line-soft')}>
            <span
              aria-hidden
              className={cn(
                'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ring-2',
                r.kind === 'admin'
                  ? 'bg-ink-1 ring-ink-1/15'
                  : 'bg-ink-3 ring-ink-3/15',
              )}
            />
            <span
              className={cn(
                'text-body-sm text-pretty',
                r.kind === 'admin' ? 'text-ink-1' : 'text-ink-2',
              )}
            >
              {r.value}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
