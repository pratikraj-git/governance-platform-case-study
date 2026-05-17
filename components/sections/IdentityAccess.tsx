'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Figure } from '@/components/ui/Figure';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { ArtifactLink } from '@/components/ui/ArtifactLink';
import {
  BeforeAfterPreview,
  WorkflowsPreview,
} from '@/components/previews/previews';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * 03 · Simplifying Identity & Access
 *
 * The first major design surface: bringing SSO and SCIM into one
 * coherent identity layer. Two real screenshots carry the section;
 * the writing is the designer’s reasoning, not the spec.
 */
export function IdentityAccess() {
  return (
    <SectionContainer id="identity" width="wide">
      <SectionHeader
        eyebrow="03 · Identity & Access"
        title="Identity setup quickly became more than a login problem."
        description={
          <>
            SSO and SCIM had each been built as separate features, by separate teams, at separate
            times. The redesign treated them as one surface, and asked a quieter question — what
            does an admin actually need to know, and when?
          </>
        }
      />

      {/* SSO Movement */}
      <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            A · Single sign-on setup
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            The setup screen should know more before it asks.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The old SSO form asked admins to translate their identity provider into a series of
            inputs, then guess whether the translation was right. The new screen reads the
            metadata, parses the certificate, names the state, and only then asks for input.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            The page looks calmer because it does more before it asks anything.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <Figure
            src="/assets/screens/sso/direct-sign-in.png"
            alt="Direct SSO sign-in — the default sign-in screen when the identity provider is reachable."
            width={2203}
            height={1093}
            caption="The default sign-in. Calm by design — when the identity provider is reachable, no fallback is shown."
          />
        </motion.div>
      </div>

      {/* SSO — routing outcome below the hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-12 flex justify-center lg:mt-16"
      >
        <Figure
          src="/assets/screens/sso/domain-identified-sso.png"
          alt="Domain identified — the system recognises the enterprise domain and continues on the SSO route."
          width={1742}
          height={650}
          scale="support"
          caption="Domain identified. The system recognises the enterprise and continues on SSO without surfacing any of the recovery paths."
        />
      </motion.div>

      <ArtifactLink
        href="/workflows#sso-break-glass-screens"
        eyebrow="Read more"
        label="See the full sign-in path, end to end"
        className="mx-auto"
      />

      {/* Side note · Before vs After (inline)
          A compact interlude pointing to the /before-after artifact
          page. Visually distinct from the SSO screens above — type-
          led cards, no images — so the reader registers it as a
          systems-thinking beat between sub-movements. */}
      <BeforeAfterPreview variant="inline" />

      {/* SCIM Movement — anchor */}
      <div className="mt-28 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start flex flex-col gap-5"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            B · Provisioning as a living system
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            Provisioning failures weren’t always permanent — but admins had no way to tell.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            SCIM is rarely a single moment. It’s a token that has to be regenerated, a workspace
            list that grows, a role mapping that drifts, and a sync that can quietly fail at
            three in the morning. Some failures were temporary, some came from incorrect mappings,
            some from delayed syncs — and the surface had to read clearly for all of them.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            One decision held the rest together: keep a single source of truth at a time. Manual
            paths close cleanly when SCIM is active, and reopen — just as cleanly — when it isn’t.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <Figure
            src="/assets/screens/scim/state-wise-messages.png"
            alt="SCIM state-wise messages — the operational guidance shown for each connection state, inline on the setup page."
            width={1654}
            height={952}
            caption="Provisioning failures became visible instead of opaque. Each state has a short, specific message — no more guessing whether sync is healthy."
          />
        </motion.div>
      </div>

      {/* SCIM — full sequence below the hero: Setup → Active Sync → Failure Recovery */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-12 flex justify-center lg:mt-16"
      >
        <Figure
          src="/assets/screens/scim/operational-states.png"
          alt="SCIM operational states — the four observable conditions of a SCIM connection, surfaced as a sequence on the setup page."
          width={4528}
          height={1028}
          scale="hero"
          caption="Setup → Active sync → Failure recovery. The setup page now reports its own state, so support escalations stop being the first signal."
        />
      </motion.div>

      <ArtifactLink
        href="/workflows#scim-orchestration-screens"
        eyebrow="Read more"
        label="See how SCIM provisioning works underneath"
        className="mx-auto"
      />

      {/* Side note · Workflow artifacts (inline)
          A compact preview of the three workflow diagrams that live
          on /workflows. Reads as architecture context, not as a
          repeat of the SCIM surface above. */}
      <WorkflowsPreview variant="inline" />

      {/* Flow B — Identity lifecycle. Connects SSO → SCIM → operational lifecycle. */}
      <div className="mt-28 border-t border-line-soft pt-14">
        <FlowDiagram
          eyebrow="Flow B · Identity, end to end"
          nodes={IDENTITY_LIFECYCLE}
          insight="The challenge wasn’t setup — it was maintaining operational clarity over time. Each step in this flow has a steady state that has to read cleanly months after the initial configuration."
        />
      </div>

      {/* Designer’s note */}
      <motion.aside
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7 }}
        className="mt-24 max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6"
      >
        <p className="text-eyebrow uppercase text-ink-3">A note from the designer</p>
        <p className="mt-3 text-[1.0625rem] leading-[1.65] text-ink-1 text-pretty">
          Identity setup is one of the most consequential things a SaaS platform asks an admin
          to do — and one of the least visible parts of most products. The work here wasn’t
          dramatic; it was patient. Read the metadata. Name the state. Make the lifecycle a
          first-class object. Then write less, not more.
        </p>
      </motion.aside>
    </SectionContainer>
  );
}

const IDENTITY_LIFECYCLE = [
  { label: 'Identity provider',  sublabel: 'IdP as the source of truth' },
  { label: 'SSO setup',          sublabel: 'Metadata read, state named' },
  { label: 'SCIM provisioning',  sublabel: 'Tokens, sync, edge states' },
  { label: 'Role mapping',       sublabel: 'Explicit precedence per rule' },
  { label: 'Operational lifecycle', sublabel: 'Drift, audit, recovery' },
];
