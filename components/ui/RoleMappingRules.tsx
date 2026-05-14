'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * RoleMappingRules — the rule builder and resolution logic from SCIM v2.
 *
 * Two parts:
 *   1. The attribute-to-role rules table (Step 3 of SCIM setup).
 *   2. A resolution panel showing how multi-rule matches resolve to the
 *      highest-privilege role.
 *
 * Both are static visualizations grounded in the PRD specification —
 * case-sensitive matching, four canonical roles, fallback to Translator.
 */
export function RoleMappingRules({ className }: { className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('flex flex-col gap-6', className)}
    >
      {/* ── Rules table ───────────────────────────────────────────── */}
      <motion.div variants={revealUp} className="overflow-hidden rounded-md border border-line bg-surface">
        <header className="flex items-center justify-between border-b border-line-soft bg-canvas px-5 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            Step 3 · Role Provisioning · Workspace W₂
          </p>
          <span className="rounded-sm border border-line bg-surface px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink-3">
            Optional
          </span>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-line-soft text-[11px] uppercase tracking-[0.14em] text-ink-3">
                <th className="px-5 py-3 font-medium">Attribute Name</th>
                <th className="px-5 py-3 font-medium">Attribute Value</th>
                <th className="px-5 py-3 font-medium">Whatfix Role</th>
                <th className="px-5 py-3 font-medium text-right">Match</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px]">
              {RULES.map((r) => (
                <tr key={r.attr} className="border-b border-line-soft last:border-b-0">
                  <td className="px-5 py-3 text-ink-1">{r.attr}</td>
                  <td className="px-5 py-3 text-ink-1">
                    <code>{r.value}</code>
                    <span className="ml-2 rounded-sm border border-line-soft bg-surface-mute px-1 py-0.5 text-[10px] text-ink-3">
                      case-sensitive
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-1">
                    <span className="font-sans">{r.role}</span>
                    <span className="ml-2 text-[10px] text-ink-4">·</span>
                    <span className="ml-1 font-sans text-[11px] text-ink-3">privilege {r.privilege}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {r.matchedInExample ? (
                      <span className="inline-flex items-center gap-1.5 text-ink-1">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal-positive" />
                        matched
                      </span>
                    ) : (
                      <span className="text-ink-4">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line-soft bg-canvas px-5 py-3 text-[12px] text-ink-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Fallback</span>
          <span>Users matching no rule receive the Translator role.</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 sm:ml-auto">
            Highest-privilege wins on overlap
          </span>
        </footer>
      </motion.div>

      {/* ── Resolution panel ─────────────────────────────────────── */}
      <motion.div variants={revealUp} className="rounded-md border border-dashed border-line-strong bg-surface-mute p-5 sm:p-6">
        <p className="text-eyebrow uppercase text-ink-3">Example Resolution</p>

        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {/* Incoming user attributes */}
          <ResolutionBox
            label="Incoming SCIM payload"
            title="user.sso.acme.com"
            rows={[
              ['wfx_role', 'content_manager'],
              ['department', 'content_ops'],
              ['group_name', 'wfx-translators'],
            ]}
          />

          <Arrow />

          {/* Matched rules */}
          <ResolutionBox
            label="Rules matched"
            title="2 of 3 rules matched"
            rows={[
              ['Rule 02', 'department=content_ops → Content Manager'],
              ['Rule 03', 'group_name=wfx-translators → Translator'],
            ]}
          />

          <Arrow />

          {/* Final role */}
          <ResolutionBox
            label="Assigned role"
            title="Content Manager"
            note="Highest-privilege wins. Privilege 2 beats privilege 4. Re-evaluated on every IdP profile update."
            emphasis
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Helpers
 * ──────────────────────────────────────────────────────────────────── */

const RULES: Array<{
  attr: string;
  value: string;
  role: string;
  privilege: number;
  matchedInExample: boolean;
}> = [
  { attr: 'wfx_role',   value: 'account_manager', role: 'Account Manager',  privilege: 1, matchedInExample: false },
  { attr: 'department', value: 'content_ops',     role: 'Content Manager',  privilege: 2, matchedInExample: true },
  { attr: 'group_name', value: 'wfx-translators', role: 'Translator',       privilege: 4, matchedInExample: true },
];

function ResolutionBox({
  label, title, rows, note, emphasis,
}: {
  label: string;
  title: string;
  rows?: Array<[string, string]>;
  note?: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-md border bg-surface p-4 transition-colors',
        emphasis ? 'border-ink-1' : 'border-line',
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{label}</p>
      <p className={cn('mt-2 text-body font-medium text-balance', emphasis ? 'text-ink-1' : 'text-ink-1')}>
        {title}
      </p>
      {rows && (
        <dl className="mt-3 space-y-1.5 font-mono text-[11px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-4">{k}</dt>
              <dd className="truncate text-ink-1">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {note && (
        <p className="mt-3 text-[11px] text-ink-2 text-pretty">{note}</p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <>
      {/* Horizontal arrow for lg+ */}
      <svg viewBox="0 0 32 12" width="32" height="12" className="hidden lg:block text-ink-3" role="presentation">
        <line x1={0} y1={6} x2={24} y2={6} stroke="currentColor" strokeWidth={1} />
        <path d="M24 2 L32 6 L24 10" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {/* Vertical arrow for stacked */}
      <svg viewBox="0 0 12 24" width="12" height="24" className="mx-auto lg:hidden text-ink-3" role="presentation">
        <line x1={6} y1={0} x2={6} y2={16} stroke="currentColor" strokeWidth={1} />
        <path d="M2 16 L6 24 L10 16" fill="none" stroke="currentColor" strokeWidth={1} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </>
  );
}
