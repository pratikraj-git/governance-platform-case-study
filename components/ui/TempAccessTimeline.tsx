'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

interface TempAccessTimelineProps {
  className?: string;
}

interface TimelineEvent {
  /** Day relative to start (T+0) or expiry (T-7, T-2, T-1, T+0=expiry). */
  marker: string;
  /** Short label. */
  label: string;
  /** Body description. */
  body: string;
  /** Event kind for the dot tone. */
  kind: 'start' | 'reminder' | 'expiry' | 'recovery';
}

/**
 * TempAccessTimeline — the temporary-user lifecycle, T+0 through T+90.
 *
 * Horizontal timeline on lg+, stacked on smaller. Each event is anchored
 * to a marker on the axis. The expiry event is emphasized; reminders use
 * a subtle dot. Recovery (re-invite) is shown as an alternate terminal.
 */
export function TempAccessTimeline({ className }: TempAccessTimelineProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn(
        'relative w-full overflow-hidden rounded-md border border-line bg-surface p-6 sm:p-8',
        className,
      )}
    >
      {/* Header */}
      <motion.header
        variants={revealUp}
        className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-soft pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3">
            Temporary Access · Lifecycle
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-4">
          T+0 → T+90 (max)
        </span>
      </motion.header>

      {/* Timeline */}
      <div className="relative">
        {/* Axis line (lg+) */}
        <div aria-hidden className="absolute left-3 right-3 top-[26px] hidden h-px bg-line lg:block" />

        <ol className="grid grid-cols-1 gap-y-8 lg:grid-cols-6 lg:gap-x-4">
          {EVENTS.map((e, i) => (
            <motion.li
              key={e.marker}
              variants={revealUp}
              className="relative flex flex-col gap-3 lg:items-center lg:text-center"
            >
              {/* Marker dot anchored to axis */}
              <div className="flex items-center gap-3 lg:flex-col lg:gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'h-3 w-3 rounded-full border bg-surface ring-2',
                    e.kind === 'expiry'   && 'border-ink-1 ring-ink-1/20',
                    e.kind === 'start'    && 'border-signal-positive ring-signal-positive/30',
                    e.kind === 'reminder' && 'border-line-strong ring-transparent',
                    e.kind === 'recovery' && 'border-dashed border-line-strong ring-transparent',
                  )}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                  {e.marker}
                </span>
              </div>

              <div className="lg:px-2">
                <p className="text-body font-medium text-ink-1 text-balance">{e.label}</p>
                <p className="mt-2 text-body-sm text-ink-2 text-pretty">{e.body}</p>
              </div>

              {/* Connector to next on lg+ */}
              {i < EVENTS.length - 1 && (
                <svg
                  aria-hidden
                  viewBox="0 0 32 12"
                  width="32" height="12"
                  className="absolute right-0 top-[16px] hidden lg:block"
                  style={{ transform: 'translateX(50%)' }}
                >
                  <motion.line
                    x1={0} y1={6} x2={26} y2={6}
                    stroke="var(--color-line)" strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={IN_VIEW}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: ease.standard }}
                  />
                  <path
                    d="M26 2 L32 6 L26 10"
                    fill="none" stroke="var(--color-line)" strokeWidth={1}
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              )}
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <motion.footer
        variants={revealUp}
        className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line-soft pt-5"
      >
        <p className="max-w-[60ch] text-body-sm text-ink-2 text-pretty">
          Notifications are non-interactive — they exist to remove the surprise from the expiry.
          At <span className="font-mono text-ink-1">00:00</span> on T+90, the session is terminated and any
          refresh/API call returns a 401.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Hard expiry · automatic deactivation
        </p>
      </motion.footer>
    </motion.div>
  );
}

const EVENTS: TimelineEvent[] = [
  { marker: 'T+0',  label: 'Invite issued',
    body: 'Admin invites by email with a role and an expiry (max 90 days). New users land on Set Password; existing ones on Accept Invite.',
    kind: 'start' },
  { marker: 'T+0',  label: 'Active session',
    body: 'On accept, the user lands on the workspace homepage. Their record is created with is_scim_managed: false.',
    kind: 'start' },
  { marker: 'T+83', label: 'T-7 reminder',
    body: '"Your access expires in 7 days." Sent via email and in-product notification.',
    kind: 'reminder' },
  { marker: 'T+88', label: 'T-2 reminder',
    body: '"Reminder: your access expires in 48 hours."',
    kind: 'reminder' },
  { marker: 'T+89', label: 'T-1 reminder',
    body: '"Final notice: your access expires in 24 hours."',
    kind: 'reminder' },
  { marker: 'T+90', label: 'Hard expiry',
    body: 'At 00:00 the session is killed. Status flips to Deactivated. Admin can Re-invite or Delete.',
    kind: 'expiry' },
];
