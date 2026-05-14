'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * 06 · Reflection & Outcomes
 *
 * Designer-led close. Avoids manufactured metrics. Four short outcomes
 * grounded in the actual work, plus a final reflection in plain voice.
 */
export function Reflection() {
  return (
    <SectionContainer id="reflection" width="wide">
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="06 · Reflection"
            title="What the work changed — and what I learned."
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
            The most useful outcomes weren’t the screens. They were the shifts underneath — in
            how the team described governance, what we considered a design surface, and what we
            were willing to leave alone.
          </motion.p>
          <motion.p variants={revealUp} className="text-body text-ink-2 text-pretty">
            What follows isn’t a metrics page. Numbers in this space are usually proxies for
            comfort. The honest signal is whether enterprise customers stopped having to ask the
            same questions every quarter — and increasingly, they did.
          </motion.p>
        </motion.div>
      </div>

      {/* Outcomes — four short, real, non-marketing statements */}
      <motion.dl
        initial="hidden"
        whileInView="show"
        viewport={IN_VIEW}
        variants={revealStagger}
        className="mt-20 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-line-soft pt-12 md:grid-cols-2"
      >
        {OUTCOMES.map((o) => (
          <motion.div key={o.index} variants={revealUp} className="flex flex-col gap-3">
            <dt className="flex items-baseline gap-3 text-eyebrow uppercase text-ink-3">
              <span className="font-mono text-[11px] text-ink-4">— {o.index}</span>
              <span>{o.title}</span>
            </dt>
            <dd className="text-body text-ink-2 text-pretty">{o.body}</dd>
          </motion.div>
        ))}
      </motion.dl>

      {/* Closing reflection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={IN_VIEW}
        transition={{ duration: 0.8 }}
        className="mt-24 max-w-[var(--container-narrow)] border-l-2 border-ink-1 pl-6"
      >
        <p className="text-eyebrow uppercase text-ink-3">In closing</p>
        <p className="mt-4 text-[1.0625rem] leading-[1.7] text-ink-1 text-pretty">
          Enterprise governance design rarely rewards velocity. It rewards patience — the
          willingness to wait for a coherent system to be possible before drawing the screen
          that depends on it. The work I’m proudest of in this project isn’t any single
          surface; it’s that, by the end, the surfaces had started behaving like a platform.
        </p>
        <p className="mt-6 text-eyebrow uppercase text-ink-3">— Pratik Raj</p>
      </motion.div>
    </SectionContainer>
  );
}

const OUTCOMES = [
  {
    index: '01',
    title: 'A shared language for governance.',
    body: 'Identity, access, lifecycle, and audit stopped being four roadmaps and started being one set of nouns the team — design, engineering, security — agreed on.',
  },
  {
    index: '02',
    title: 'Setup that survives the rest of the year.',
    body: 'SSO and SCIM stopped requiring re-implementation across every new workspace. Onboarding a new enterprise stopped feeling bespoke.',
  },
  {
    index: '03',
    title: 'Operational visibility, not analytics.',
    body: 'The dashboard isn’t a charts page; it’s where admins start their morning. The signal in it is operational — what needs attention, what changed, what’s safe to ignore.',
  },
  {
    index: '04',
    title: 'Resilience as a design constraint.',
    body: 'Break-glass access, SCIM-immune flags, audit notifications, and time-bounded sessions stopped being features and started being part of the platform’s default posture.',
  },
];
