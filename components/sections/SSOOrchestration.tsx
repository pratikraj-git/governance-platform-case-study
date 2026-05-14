'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EditorialSplitSection } from '@/components/layout/EditorialSplitSection';
import { CertLifecyclePanel } from '@/components/ui/CertLifecyclePanel';
import { OrchestrationFlow, type OrchestrationStage } from '@/components/ui/OrchestrationFlow';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * SSOOrchestration — section 03.
 *
 * Four movements:
 *  A. Certificate as a lifecycle object (parse, surface, classify)
 *  B. Setup as an orchestration flow (3 stages with state retention)
 *  C. The failure taxonomy (proactive · mixed · reactive)
 *  D. Operational continuity principle (closing observation)
 *
 * The point is to read this as enterprise identity infrastructure, not
 * as a login screen redesign. Annotations are sparing; the diagrams do
 * the load-bearing.
 */
export function SSOOrchestration() {
  return (
    <SectionContainer id="sso-orchestration" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Section header ──────────────────────────────────────── */}
        <SectionHeader
          eyebrow="03 · SSO Orchestration"
          title="Identity setup, designed for the operational lifecycle — not just the happy path."
          description="A misconfigured certificate or a dropped session is an outage. The redesign treats SSO setup as an orchestration with observable state — not a wizard that ends at &lsquo;Test passed.&rsquo;"
          descriptionWidth="narrow"
        />

        {/* ── Movement A: Cert as a lifecycle object ─────────────── */}
        <EditorialSplitSection
          ratio="balanced"
          stickyText
          text={
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={IN_VIEW}
              variants={revealStagger}
              className="flex flex-col gap-6"
            >
              <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
                A · Certificate as a lifecycle object
              </motion.p>
              <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
                Parse the cert. Show what's in it. Name the state.
              </motion.h3>
              <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
                Certs used to be inert text — pasted PEM blobs, verified out-of-band. The redesign
                parses X.509 client-side and surfaces the five fields that matter directly under
                the input: Common Name, SANs, validity window, serial.
              </motion.p>
              <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
                Each cert resolves into one of four observable states. Active is quiet; the other
                three carry weight — named at the field rather than at test time, so the failure
                mode never travels.
              </motion.p>
              <motion.dl variants={revealUp} className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line-soft pt-5">
                <Stat label="Parse path"    value="Client-side · WebCrypto" />
                <Stat label="Persisted"     value="On save, not on test" />
                <Stat label="Read surface"  value="Setup + read-only summary" />
                <Stat label="Failure mode"  value="Named at the input field" />
              </motion.dl>
            </motion.div>
          }
          visual={
            <div className="space-y-4">
              <CertLifecyclePanel />
              <p className="text-[12px] uppercase tracking-[0.16em] text-ink-3">
                Four observable states — every cert resolves to exactly one.
              </p>
            </div>
          }
        />

        {/* ── Movement B: Setup as orchestration ─────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              B · Setup as orchestration
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Three stages, one continuous session — state retained from intake to activation.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              The old flow lost the admin between steps — back-navigation reset fields, edits defaulted
              to the upload path. The orchestration treats setup as a single contract with explicit state.
            </motion.p>
          </motion.header>

          <OrchestrationFlow
            stages={SSO_STAGES}
            caption="On edit, the original entry method, IdP, and field values are restored. Partial setups discard cleanly — only saved configurations persist."
          />
        </div>

        {/* ── Movement C: Failure taxonomy ─────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              C · Failure taxonomy
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Errors are classified by who can see them — and what the admin should check next.
            </motion.h3>
            <motion.p variants={revealUp} className="max-w-[58ch] text-body text-ink-2 text-pretty">
              Test-failure used to be a dead end. The taxonomy classifies failures by where they
              can be detected — and points at the next concrete step rather than a SAML stack trace.
            </motion.p>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {FAILURE_CATEGORIES.map((cat) => (
              <motion.article
                key={cat.kind}
                variants={revealUp}
                className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {cat.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-3">
                    {cat.detection}
                  </span>
                </header>

                <h4 className="text-h3 text-ink-1 text-balance">{cat.kind}</h4>
                <p className="text-body-sm text-ink-2 text-pretty">{cat.description}</p>

                <ul className="mt-auto space-y-2 border-t border-line-soft pt-4 text-[12px]">
                  {cat.examples.map((ex) => (
                    <li key={ex.label} className="flex items-baseline gap-3">
                      <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                      <span className="text-ink-2">
                        <span className="font-medium text-ink-1">{ex.label}</span>
                        <span className="text-ink-3"> — {ex.next}</span>
                      </span>
                    </li>
                  ))}
                </ul>
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
            Reliability in identity is a function of what's visible. The work was less about
            redesigning the setup screen and more about making cert state, error provenance,
            and session continuity legible to the admin living with the configuration.
          </p>
          <footer className="mt-4 text-eyebrow uppercase text-ink-3">
            Identity reliability · A function of what's visible
          </footer>
        </motion.blockquote>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const SSO_STAGES: OrchestrationStage[] = [
  {
    index: '01',
    label: 'Metadata Intake',
    body: 'Upload XML, paste a metadata URL, or enter manually. The chosen method is the one persisted — and the one restored on edit.',
    chips: ['Upload XML', 'Metadata URL', 'Manual entry'],
    scope: 'admin-driven',
  },
  {
    index: '02',
    label: 'Cert + Whatfix Information',
    body: 'X.509 parsed and classified at input. ACS URL, Issuer, and SAML configuration captured. Field state survives back-navigation.',
    chips: ['X.509 parse', 'ACS URL', 'NameID mapping'],
    scope: 'parsed inline',
    tone: 'emphasis',
  },
  {
    index: '03',
    label: 'Test & Activate',
    body: 'Inline retry on failure. Errors named where we know them; pointed at the IdP where we don\u2019t. No re-navigation to retry.',
    chips: ['Run test again', 'Named failures', 'Activate on pass'],
    scope: 'idempotent',
  },
];

const FAILURE_CATEGORIES: Array<{
  index: string;
  detection: string;
  kind: string;
  description: string;
  examples: Array<{ label: string; next: string }>;
}> = [
  {
    index: '01',
    detection: 'Whatfix-detected',
    kind: 'Proactive — surfaced at input',
    description:
      'Failures we can name before the admin leaves the page. Resolved by editing the form, not by re-walking the IdP.',
    examples: [
      { label: 'Certificate expired',  next: 'Upload a re-issued X.509 certificate.' },
      { label: 'Missing NameID',       next: 'Reconfigure the SAML identity location in the IdP.' },
      { label: 'Invalid metadata XML', next: 'Re-export the metadata file from the IdP.' },
    ],
  },
  {
    index: '02',
    detection: 'Mixed visibility',
    kind: 'Sometimes ours · sometimes the IdP\u2019s',
    description:
      'Cases where the platform may detect the cause, or may only see the absence of a SAML response. The error message names both possibilities.',
    examples: [
      { label: 'ACS URL mismatch',     next: 'Recheck the ACS URL configured in the IdP.' },
      { label: 'Wrong Issuer URL',     next: 'Verify the Issuer in the IdP against the platform value.' },
    ],
  },
  {
    index: '03',
    detection: 'IdP-side',
    kind: 'Reactive — surfaced after the tab closes',
    description:
      'Failures where the platform only knows that no SAML response came back. The IdP shows its own page; we surface a directional message on return.',
    examples: [
      { label: 'IdP unreachable',      next: 'Confirm SSO URL and try the test again.' },
      { label: 'Generic IdP failure',  next: 'Recheck IdP-side configuration; retry inline.' },
    ],
  },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-eyebrow uppercase text-ink-4">{label}</dt>
      <dd className="mt-1 text-body-sm text-ink-1">{value}</dd>
    </div>
  );
}
