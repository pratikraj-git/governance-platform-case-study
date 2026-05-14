'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

type CertState = 'active' | 'expiring' | 'expired' | 'unreadable';

interface CertPanelMock {
  state: CertState;
  label: string;
  /** Cert metadata fields (CN, SAN, Valid From, Valid To, Serial). */
  fields: Array<{ key: string; value: string }>;
  /** State message rendered below the fields. */
  message: string;
}

const STATE_STYLES: Record<CertState, { dot: string; ring: string; messageTone: string; cardBorder: string }> = {
  active: {
    dot: 'bg-signal-positive',
    ring: 'ring-signal-positive/30',
    messageTone: 'text-signal-positive',
    cardBorder: 'border-line',
  },
  expiring: {
    dot: 'bg-signal-attention',
    ring: 'ring-signal-attention/30',
    messageTone: 'text-signal-attention',
    cardBorder: 'border-line',
  },
  expired: {
    dot: 'bg-signal-critical',
    ring: 'ring-signal-critical/30',
    messageTone: 'text-signal-critical',
    cardBorder: 'border-line',
  },
  unreadable: {
    dot: 'bg-ink-3',
    ring: 'ring-ink-3/20',
    messageTone: 'text-ink-2',
    cardBorder: 'border-dashed border-line-strong',
  },
};

const STATE_LABEL: Record<CertState, string> = {
  active: 'Active',
  expiring: 'Expires soon',
  expired: 'Expired',
  unreadable: 'Unreadable',
};

/**
 * CertLifecyclePanel — the four observable states of an X.509 certificate
 * during the SSO setup lifecycle. Each panel renders the parsed cert
 * metadata fields (CN, SAN, Valid From, Valid To, Serial) plus a state
 * message in the appropriate signal tone.
 *
 * Restraint: the only color is a 6px dot per state. No filled cards, no
 * gradient lifts. Hierarchy comes from the message line and the dot.
 */
export function CertLifecyclePanel({ className }: { className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={revealStagger}
      className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', className)}
    >
      {DEFAULT_PANELS.map((p) => (
        <CertCard key={p.state} panel={p} />
      ))}
    </motion.div>
  );
}

function CertCard({ panel }: { panel: CertPanelMock }) {
  const s = STATE_STYLES[panel.state];

  return (
    <motion.article
      variants={revealUp}
      className={cn(
        'flex flex-col gap-4 rounded-md border bg-surface p-5 transition-colors',
        s.cardBorder,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          X.509 · {panel.label}
        </p>
        <span className="flex items-center gap-2">
          <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full ring-2', s.dot, s.ring)} />
          <span className="text-eyebrow uppercase text-ink-3">{STATE_LABEL[panel.state]}</span>
        </span>
      </header>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 border-t border-line-soft pt-4">
        {panel.fields.map((f) => (
          <div key={f.key} className="flex items-baseline justify-between gap-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-4">{f.key}</dt>
            <dd className="truncate font-mono text-[12px] text-ink-1">{f.value}</dd>
          </div>
        ))}
      </dl>

      <p className={cn('mt-2 text-body-sm text-pretty', s.messageTone)}>{panel.message}</p>
    </motion.article>
  );
}

const DEFAULT_PANELS: CertPanelMock[] = [
  {
    state: 'active',
    label: 'idp.acme.com',
    fields: [
      { key: 'CN',         value: 'idp.acme.com' },
      { key: 'SAN',        value: 'idp.acme.com, sso.acme.com' },
      { key: 'Valid from', value: '2025-11-04' },
      { key: 'Valid to',   value: '2027-11-04' },
      { key: 'Serial',     value: '03:a7:9c:14:e2' },
    ],
    message: 'Valid · 142 days of operational headroom remaining.',
  },
  {
    state: 'expiring',
    label: 'sso.contoso.local',
    fields: [
      { key: 'CN',         value: 'sso.contoso.local' },
      { key: 'SAN',        value: 'sso.contoso.local' },
      { key: 'Valid from', value: '2024-06-12' },
      { key: 'Valid to',   value: '2026-06-02' },
      { key: 'Serial',     value: '0e:42:b1:d7:91' },
    ],
    message: 'Expires in 19 days — rotation required to avoid an SSO outage.',
  },
  {
    state: 'expired',
    label: 'auth.northwind.io',
    fields: [
      { key: 'CN',         value: 'auth.northwind.io' },
      { key: 'SAN',        value: 'auth.northwind.io' },
      { key: 'Valid from', value: '2023-05-08' },
      { key: 'Valid to',   value: '2026-05-08' },
      { key: 'Serial',     value: '1b:5e:7a:8c:33' },
    ],
    message: 'Expired 6 days ago — SSO is blocked until a new certificate is uploaded.',
  },
  {
    state: 'unreadable',
    label: 'metadata.xml',
    fields: [
      { key: 'CN',         value: '—' },
      { key: 'SAN',        value: '—' },
      { key: 'Valid from', value: '—' },
      { key: 'Valid to',   value: '—' },
      { key: 'Serial',     value: '—' },
    ],
    message: 'Not a valid PEM-encoded X.509 certificate — upload or paste a re-issued cert to continue.',
  },
];
