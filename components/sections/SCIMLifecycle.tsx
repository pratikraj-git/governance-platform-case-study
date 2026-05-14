'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { TokenPortabilityDiagram } from '@/components/ui/TokenPortabilityDiagram';
import { RoleMappingRules } from '@/components/ui/RoleMappingRules';
import { SCIMSyncFlow } from '@/components/ui/SCIMSyncFlow';
import { OrchestrationFlow, type OrchestrationStage } from '@/components/ui/OrchestrationFlow';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * SCIMLifecycle — section 04. The case study's centerpiece on
 * provisioning orchestration.
 *
 * Six movements:
 *  A. The architectural shift — token portability (one IdP app, N tenants)
 *  B. The three-step setup flow (shared step 1 · per-tenant steps 2 + 3)
 *  C. Role mapping as a deterministic, dynamic contract
 *  D. The synchronization loop — IdP is the sole source of truth
 *  E. Edge state handling — token regeneration, deprecation, drift
 *  F. Closing principle — operational maturity
 *
 * This section is intentionally dense: the substance is the substance.
 * Visuals carry the architecture; the prose names the why.
 */
export function SCIMLifecycle() {
  return (
    <SectionContainer id="scim-lifecycle" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="04 · SCIM Lifecycle Management"
          title="Provisioning, scaled to the architecture enterprises actually use."
          description="v1.0 automated lifecycle one workspace at a time. v2.0 reorganizes the contract: one IdP application governs many workspaces, identification and role assignment resolved per-tenant. The IdP becomes the source of truth; the platform orchestrates it."
          descriptionWidth="narrow"
        />

        {/* ── Movement A: Token Portability ───────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              A · Token Portability
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              One bearer token. One IdP application. N workspaces under governance.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              The shift is at the token layer. A source workspace generates a bearer token; others with
              matching SSO can <span className="font-medium text-ink-1">fetch</span> it or have it <span className="font-medium text-ink-1">pushed</span> to them.
              Identification and role rules stay per-workspace — every tenant answers to one IdP application.
            </motion.p>
          </motion.header>

          <TokenPortabilityDiagram />

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-line-soft pt-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TOKEN_FACTS.map((f) => (
              <motion.div key={f.label} variants={revealUp}>
                <dt className="text-eyebrow uppercase text-ink-3">{f.label}</dt>
                <dd className="mt-3 text-body-sm text-ink-1 text-pretty">{f.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* ── Movement B: 3-step orchestration ─────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · Setup orchestration
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              One shared step, two per-tenant steps — the right scope at each layer.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              The flow encodes the contract directly. Token and base URL are authored once.
              Identification and role mapping stay per-workspace — local where local matters.
            </motion.p>
          </motion.header>

          <OrchestrationFlow
            stages={SCIM_STAGES}
            caption="Step 3 is skippable — unmapped users default to Translator, surfaced explicitly. Admins can configure mapping later without disabling SCIM."
          />
        </div>

        {/* ── Movement C: Role mapping logic ───────────────────────── */}
        <EditorialSplitSection
          ratio="balanced"
          visualSide="left"
          text={
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={IN_VIEW}
              variants={revealStagger}
              className="flex flex-col gap-6"
            >
              <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
                C · Role mapping logic
              </motion.p>
              <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
                Attribute-driven. Deterministic. Re-evaluated every sync.
              </motion.h3>
              <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
                Mapping is authored as rules — IdP attribute, case-sensitive value, target role.
                Every sync re-evaluates every rule. Highest-privilege wins on multi-match; Translator
                is the documented fallback, persistently surfaced so the floor is never a surprise.
              </motion.p>
              <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
                No per-rule precedence. No bulk re-evaluation toggle. No manual role editing on
                SCIM-managed users. The IdP is the source of truth — the platform refuses to fork it.
              </motion.p>
              <motion.ul
                variants={revealUp}
                className="mt-2 space-y-3 border-t border-line-soft pt-5 text-body-sm text-ink-2"
              >
                {ROLE_NOTES.map((n) => (
                  <li key={n.title} className="flex items-baseline gap-3">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                    <span className="text-pretty">
                      <span className="font-medium text-ink-1">{n.title}.</span> <span>{n.body}</span>
                    </span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          }
          visual={<RoleMappingRules />}
        />

        {/* ── Movement D: Sync loop ────────────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              D · Synchronization loop
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              One contract in, audit out — IdP authority enforced through the orchestration.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              SCIM events arrive once at the governance endpoint, route per-workspace through
              identification and role-mapping rules, and emit a normalized audit stream. Manual
              changes on SCIM-managed users are disabled — the tooltip points back at the IdP attribute.
            </motion.p>
          </motion.header>

          <SCIMSyncFlow />
        </div>

        {/* ── Movement E: Edge state handling ──────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              E · Edge states
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Where shared infrastructure breaks, name it before it breaks — and recover without escalation.
            </motion.h3>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {EDGE_STATES.map((e) => (
              <motion.article
                key={e.index}
                variants={revealUp}
                className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {e.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-3">
                    {e.kind}
                  </span>
                </header>
                <h4 className="text-h3 text-ink-1 text-balance">{e.title}</h4>
                <p className="text-body-sm text-ink-2 text-pretty">{e.body}</p>
                <p className="mt-auto border-t border-line-soft pt-4 text-[12px] text-ink-3">
                  <span className="font-mono uppercase tracking-[0.14em] text-ink-4">Recovery</span>
                  <span className="ml-2">{e.recovery}</span>
                </p>
              </motion.article>
            ))}
          </motion.div>
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
            Provisioning maturity isn’t how many features the setup screen has. It’s how few
            decisions an admin re-makes when an enterprise adds its 16th workspace.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Provisioning maturity · Scale measured in constants, not features
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const SCIM_STAGES: OrchestrationStage[] = [
  {
    index: '01',
    label: 'Token & Base URL',
    body: 'Generate a new bearer token, push it to other workspaces, or fetch from the source. The base URL is shared by every workspace on this token.',
    chips: ['Generate', 'Push', 'Fetch'],
    scope: 'shared',
    tone: 'emphasis',
  },
  {
    index: '02',
    label: 'User Provisioning',
    body: 'Per-workspace identification criteria — by user attribute, group name, or group attribute. SCIM activation toggle lives here.',
    chips: ['User attribute', 'Group name', 'Group attribute'],
    scope: 'per-workspace',
  },
  {
    index: '03',
    label: 'Role Provisioning',
    body: 'Attribute-to-role rules with case-sensitive matching. Optional — skipping defaults all users to Translator. Returnable.',
    chips: ['Rule builder', 'Highest-privilege wins', 'Fallback shown'],
    scope: 'per-workspace · optional',
  },
];

const TOKEN_FACTS: Array<{ label: string; value: React.ReactNode }> = [
  {
    label: 'Token ownership',
    value: <>Workspace-level credential. Persists if the generating admin is deprovisioned.</>,
  },
  {
    label: 'Sharing scope',
    value: <>Same SSO configuration required (matching Issuer + signing cert). Account Manager on both sides.</>,
  },
  {
    label: 'Regeneration',
    value: <>Blocking confirmation modal lists every affected workspace before the token rotates.</>,
  },
  {
    label: 'Deprecation handling',
    value: <>If the source workspace is deleted, the most recently updated tenant on that token becomes the new source.</>,
  },
];

const ROLE_NOTES: Array<{ title: string; body: string }> = [
  { title: 'Privilege order',      body: 'Account Manager > Content Manager > Editor > Translator. Documented in-product alongside the rule builder.' },
  { title: 'Dynamic re-evaluation', body: 'A SCIM PATCH or PUT on profile change re-evaluates rules; the in-product role updates within the same sync cycle.' },
  { title: 'No manual override',   body: 'Role-change controls are disabled in the dashboard for SCIM-managed users — the IdP is the contract.' },
];

const EDGE_STATES: Array<{
  index: string; kind: string; title: string; body: string; recovery: string;
}> = [
  {
    index: '01',
    kind: 'Token regeneration',
    title: 'Rotating a shared token breaks every workspace using it — until each fetches the new one.',
    body: 'The blocking modal names every affected workspace before the rotation. Targets enter a broken state with a directional banner.',
    recovery: 'Any Account Manager on an affected workspace can re-fetch the new token to restore provisioning.',
  },
  {
    index: '02',
    kind: 'Source deprecation',
    title: 'The source workspace gets deleted. Tokens survive; ownership re-anchors automatically.',
    body: 'Tokens are workspace-level, not user-level. If the original source is deprecated, the most recently updated workspace on that token becomes the next selectable source.',
    recovery: 'Future Fetch operations resolve to the new source — no manual intervention required.',
  },
  {
    index: '03',
    kind: 'Identification drift',
    title: 'A workspace’s identification rule diverges from the payload. The provisioner stops — quietly.',
    body: 'Step 2 is what makes a user belong to this workspace at all. If the attribute the rule keys on stops appearing in the payload, no users are provisioned for that tenant.',
    recovery: 'The audit stream surfaces the empty result. Admin updates Step 2; the next sync picks up.',
  },
];
