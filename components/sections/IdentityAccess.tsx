'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Figure } from '@/components/ui/Figure';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
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
        title="Simplifying identity and access — without simplifying it away."
        description={
          <>
            SSO and SCIM had each been built as separate features, by separate teams, at separate
            times. The redesign treated them as one identity surface, and asked a quieter
            question: what does an admin actually need to know, and when?
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
            Make the setup the truth — not a translation of it.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            The old SSO form asked admins to translate their identity provider into a series of
            inputs, then guess whether the translation was correct. The redesign reads the
            metadata, parses the certificate, names the state, and only then asks for input.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            The screen looks calmer because it does more before it asks anything.
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
            src="/assets/sso/sso-setup.jpg"
            alt="SSO setup — identity provider configuration with metadata parsed and certificate state surfaced inline."
            width={8302}
            height={10855}
            aspect="16/10"
            objectPosition="center top"
            caption="The settled SSO setup state. Metadata is parsed, the certificate is read, and the four observable states are surfaced inline — so admins review their IdP rather than translate it."
          />
        </motion.div>
      </div>

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
            B · Provisioning, as a lifecycle
          </motion.p>
          <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
            Design the years after setup, not just the afternoon of it.
          </motion.h3>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            SCIM is rarely a single moment. It’s a token that has to be regenerated, a workspace
            list that grows, a role mapping that drifts, and a sync that can quietly fail at
            three in the morning. The design had to be legible at every one of those moments.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-3 text-pretty">
            The decision underneath all of it: keep one source of truth at a time. Manual paths
            close cleanly when SCIM is active. They reopen, just as cleanly, when it’s not.
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
            src="/assets/scim/setup-group-and-role-attributes.jpg"
            alt="SCIM role and group attribute mapping — precedence and validation against the configured identity provider."
            width={20215}
            height={4287}
            aspect="16/10"
            objectPosition="left center"
            caption="The role-mapping surface. Precedence is explicit, validation runs against the configured IdP groups, and two rules can never silently disagree — the highest-stakes screen in the SCIM lifecycle."
          />
        </motion.div>
      </div>

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
