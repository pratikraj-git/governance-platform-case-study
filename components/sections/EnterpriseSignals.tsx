'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * 02 · Enterprise Signals
 *
 * Grounds the case study in actual enterprise pressure without fake
 * testimonials or logo walls. Three anonymized customer-pattern cards
 * describe the operational shape of the asks — not who asked.
 */
export function EnterpriseSignals() {
  return (
    <SectionContainer
      id="signals"
      width="wide"
      className="bg-surface-warm"
      topRule
      bottomRule
    >
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="02 · Signals"
            title="What enterprise customers were actually asking for."
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <motion.p variants={revealUp} className="text-body-lg text-ink-2 text-pretty">
            The asks rarely came as design briefs. They came as questions in security reviews,
            footnotes in procurement, and increasingly urgent emails from IT admins running the
            platform inside their own organizations.
          </motion.p>

          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            Read together, the same three shapes kept appearing — across pharma, financial
            services, global retailers, and enterprise software companies with their own
            multi-region footprints. Not features. Operational expectations.
          </motion.p>
        </motion.div>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        variants={revealStagger}
        className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3"
      >
        {SIGNALS.map((s) => (
          <motion.li
            key={s.id}
            variants={revealUp}
            className="flex flex-col gap-5 bg-canvas p-7 sm:p-8"
          >
            <header className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                Signal · {s.id}
              </span>
              <span className="text-eyebrow uppercase text-ink-3">{s.context}</span>
            </header>

            <h3 className="text-h3 text-ink-1 text-balance">{s.title}</h3>

            <p className="text-body-sm text-ink-2 text-pretty">{s.body}</p>

            <p className="mt-auto border-t border-line-soft pt-4 text-[12px] leading-[1.55] italic text-ink-3 text-pretty">
              “{s.quote}”
              <span className="not-italic text-ink-4"> — {s.attribution}</span>
            </p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-12 max-w-[var(--container-prose)] text-body text-ink-2 text-pretty"
      >
        By the time we sat down to plan the next platform cycle, these weren’t edge cases. They
        were the operational reality of the customers we were already serving — and the ones
        about to land. Governance had to become a product surface, not a configuration page.
      </motion.p>
    </SectionContainer>
  );
}

const SIGNALS = [
  {
    id: 'A',
    context: 'Identity at scale',
    title: 'Federate identity across every workspace — without re-explaining the policy.',
    body: 'Customers expanded across regions and business units. They expected one identity policy to apply consistently, without re-implementing SSO per workspace or maintaining sixteen variants of the same role mapping.',
    quote: 'We can’t run the same SSO setup conversation six times in one quarter.',
    attribution: 'Director of IT, global pharma',
  },
  {
    id: 'B',
    context: 'Lifecycle, not setup',
    title: 'Treat provisioning as a living system, not a one-time form.',
    body: 'Tokens rotated, certs expired, employees left, and admins changed. The product needed to handle the months and years after setup — not just the afternoon it was first configured.',
    quote: 'Tell me what’s changing, where, and when — that’s the actual job.',
    attribution: 'Security ops lead, enterprise software',
  },
  {
    id: 'C',
    context: 'Operational visibility',
    title: 'Show me one view I can run governance from.',
    body: 'Repeatedly: the same request. Stop making admins click through fifteen screens to answer one audit question. Give them a place where access, identity, and lifecycle are visible together.',
    quote: 'I just want a page I can open on a Monday morning.',
    attribution: 'Platform administrator, financial services',
  },
];
