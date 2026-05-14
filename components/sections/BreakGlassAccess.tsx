'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FallbackLoginMock } from '@/components/ui/FallbackLoginMock';
import { TempAccessTimeline } from '@/components/ui/TempAccessTimeline';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * BreakGlassAccess — section 05.
 *
 * Four movements:
 *  A. The single point of failure — three real failure modes, named.
 *  B. Two access types — Break-Glass (BGU) and Temporary, with the
 *     constraints that make each safe.
 *  C. Fallback entry — the dual-path login pattern.
 *  D. Temporary access lifecycle — T-7 / T-2 / T-1 / hard expiry.
 *
 * Tone: calm, operational, security-aware. The point is not to celebrate
 * the recovery — it's to show that the recovery existed in the design
 * before the failure made it necessary.
 */
export function BreakGlassAccess() {
  return (
    <SectionContainer id="break-glass-access" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="05 · Break-Glass Access"
          title="Designing for failure scenarios and operational continuity."
          description="Federated identity is the right default for the 99% — and the wrong dependency for the moment it fails. Break-Glass and temporary access decouple emergency administration from IdP availability so that the platform stays administrable when SSO does not."
          descriptionWidth="narrow"
        />

        {/* ── Movement A: Single point of failure ──────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              A · The single point of failure
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Three ways the IdP becomes the platform's failure surface.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              An enterprise admin's access to the platform is 100% dependent on the identity
              provider. Three independent events can sever that path — and any one of them
              leaves the workspace without an active administrator.
            </motion.p>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {FAILURE_MODES.map((m) => (
              <motion.article
                key={m.index}
                variants={revealUp}
                className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6 transition-colors hover:border-line-strong"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {m.index}
                  </span>
                  <span aria-hidden className="inline-flex h-1.5 w-1.5 rounded-full bg-signal-critical ring-2 ring-signal-critical/30" />
                </header>
                <h4 className="text-h3 text-ink-1 text-balance">{m.title}</h4>
                <p className="text-body-sm text-ink-2 text-pretty">{m.body}</p>
                <p className="mt-auto border-t border-line-soft pt-4 text-[12px] text-ink-3">
                  <span className="font-mono uppercase tracking-[0.14em] text-ink-4">Effect</span>
                  <span className="ml-2">{m.effect}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* ── Movement B: Two access types ─────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · Two access types · One fallback layer
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Break-Glass for emergencies. Temporary access for everything that isn't.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              Both bypass SSO. Both use local passwords. The constraints are what make them
              safe: a hard ceiling on Break-Glass users, a hard expiry on temporary ones, and
              an audit notification on every emergency login.
            </motion.p>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
          >
            {ACCESS_TYPES.map((t) => (
              <motion.article
                key={t.kind}
                variants={revealUp}
                className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6 sm:p-7"
              >
                <header className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {t.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-3">{t.purpose}</span>
                </header>

                <h4 className="text-h3 text-ink-1 text-balance">{t.kind}</h4>
                <p className="text-body-sm text-ink-2 text-pretty">{t.summary}</p>

                <dl className="grid grid-cols-1 gap-x-6 gap-y-4 border-t border-line-soft pt-5 sm:grid-cols-2">
                  {t.constraints.map((c) => (
                    <div key={c.label}>
                      <dt className="text-eyebrow uppercase text-ink-4">{c.label}</dt>
                      <dd className="mt-1.5 text-body-sm text-ink-1 text-pretty">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* ── Movement C: Fallback entry ───────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              C · Fallback entry
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              The bypass is discoverable — never marketed.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              On SSO-enabled workspaces, the fallback is a single neutral link beneath the
              SSO button. Standard users who shouldn't see it are told why. SSO-disabled
              workspaces don't render the fallback at all — passwords already work; there is
              no glass to break.
            </motion.p>
          </motion.header>

          <FallbackLoginMock />

          {/* SCIM immunity callout */}
          <motion.aside
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.55, ease: ease.standard }}
            className="flex items-start gap-4 rounded-md border border-dashed border-line-strong bg-surface-mute p-5 sm:p-6"
          >
            <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-ink-1 ring-2 ring-ink-1/20" />
            <div className="space-y-2">
              <p className="text-eyebrow uppercase text-ink-3">SCIM immunity</p>
              <p className="text-body text-ink-1 text-pretty">
                Break-Glass and temporary users are flagged{' '}
                <code className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[12px] text-ink-1">is_scim_managed: false</code>.
                They are never moved to Disabled by a SCIM payload — including the 72-hour grace-period
                edge case where misconfiguration has historically deprovisioned every admin in a workspace.
                The door survives the sync.
              </p>
              <p className="text-body-sm text-ink-3 text-pretty">
                Every Break-Glass login fires an automated security notification to all administrators
                in the workspace — emergency access never happens silently.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* ── Movement D: Temporary access lifecycle ───────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              D · Temporary access lifecycle
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Time-bounded by design — the access knows when it ends.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              Temporary users carry a hard-coded expiry at invite time. The platform sends
              reminders at T-7, T-2, and T-1 days so the deadline is never a surprise. At
              T+90 (00:00), the session is killed and the user transitions to Deactivated.
              Admins can re-invite, convert to permanent, or delete — but they can't extend
              past the ceiling.
            </motion.p>
          </motion.header>

          <TempAccessTimeline />
        </div>

        {/* ── Closing observation ───────────────────────────────── */}
        <motion.blockquote
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7, ease: ease.standard }}
          className="max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty"
        >
          <p>
            Resilience isn't a feature added after an outage. It's a design constraint that
            shows up in five subtle places: a quiet link below the SSO button, a flag on a
            user record, a notification to every other admin, a countdown on a calendar, and
            a session that knows how to end on its own.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Operational continuity · Principle
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const FAILURE_MODES: Array<{ index: string; title: string; body: string; effect: string }> = [
  {
    index: '01',
    title: 'The IdP goes down.',
    body: 'Federated authentication is unreachable. Every admin in every workspace using that IdP loses access in the same instant.',
    effect: 'Total administrative blackout — no path back to fix the configuration.',
  },
  {
    index: '02',
    title: 'A signing certificate expires.',
    body: 'The SSO certificate quietly ages out. The next login attempt returns a SAML validation failure with no inline remediation path.',
    effect: 'Workspace is administrable only by someone outside the broken trust chain.',
  },
  {
    index: '03',
    title: 'A SCIM sync deprovisions all admins.',
    body: 'A configuration error in the IdP — or the 72-hour grace-period edge case — issues SCIM payloads that disable every Account Manager.',
    effect: 'Zero active administrators. No way to restore SCIM from inside the workspace.',
  },
];

const ACCESS_TYPES: Array<{
  index: string;
  purpose: string;
  kind: string;
  summary: string;
  constraints: Array<{ label: string; value: string }>;
}> = [
  {
    index: '01',
    purpose: 'Emergency',
    kind: 'Break-Glass Users (BGU)',
    summary:
      'Up to five existing admins per workspace are designated as Break-Glass. They authenticate with a local password via the fallback link when SSO is unavailable, with full administrative authority on entry.',
    constraints: [
      { label: 'Limit',         value: 'Max 5 BGU per workspace' },
      { label: 'Visibility',    value: 'Only available when SSO is enabled' },
      { label: 'SCIM behavior', value: 'Exempt from sync — is_scim_managed: false' },
      { label: 'Audit',         value: 'Every BGU login notifies all admins' },
    ],
  },
  {
    index: '02',
    purpose: 'Just-in-Time',
    kind: 'Temporary Users',
    summary:
      'Invitation-based access for external contractors, partners, and CSMs. Admin sets an expiry (max 90 days). Time-bound by design, with automated lifecycle notifications and hard termination at midnight on the end date.',
    constraints: [
      { label: 'Expiry',         value: 'Max 90 days · prefilled to 90' },
      { label: 'Role',           value: 'Any role except Admin' },
      { label: 'Reminders',      value: 'T-7 · T-2 · T-1 day notifications' },
      { label: 'Termination',    value: '00:00 expiry · session killed · 401 thereafter' },
    ],
  },
];
