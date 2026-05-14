'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * Hero — section 00.
 *
 * Editorial open: confident display title, a single supporting line,
 * and a quiet meta-strip beneath. No CTAs in the foundation; the case
 * study is the destination, not a funnel.
 */
export function Hero() {
  return (
    <SectionContainer id="hero" width="wide" spacing="default" as="header">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        variants={revealStagger}
        className="flex flex-col gap-12"
      >
        <SectionHeader
          eyebrow="Case Study / Governance Platform"
          title="Designing governance infrastructure for enterprise scale."
          description="An end-to-end case study spanning identity, lifecycle, fallback access, and the operational intelligence layer that unifies them."
          as="h1"
          descriptionWidth="narrow"
        />

        <motion.div
          variants={revealUp}
          className="grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4"
        >
          <MetaCell label="Role"      value="Lead Product Designer" />
          <MetaCell label="Scope"     value="5 enterprise surfaces" />
          <MetaCell label="Surface"   value="Admin · Identity · Access" />
          <MetaCell label="Discipline"value="Systems · Governance · UX" />
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-eyebrow uppercase text-ink-4">{label}</p>
      <p className="text-body-sm text-ink-1">{value}</p>
    </div>
  );
}
