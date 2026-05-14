'use client';

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * Hero — section 00.
 *
 * Editorial title page for a governance case study. No autobiographical
 * narration, no duration framing. The hero names the subject and the
 * scope; the sections that follow do the storytelling.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate w-full bg-canvas"
    >
      <div className="mx-auto flex min-h-[88svh] max-w-[var(--container-max)] flex-col justify-between px-6 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="flex flex-col gap-10"
        >
          <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
            Enterprise platform design · Case study
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="max-w-[22ch] text-balance font-semibold text-ink-1"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
            }}
          >
            Governance Infrastructure for Enterprise-Scale SaaS Administration.
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="max-w-[62ch] text-pretty text-[1.125rem] leading-[1.6] text-ink-2"
          >
            Designing governance systems that simplify identity, access, lifecycle management,
            and operational administration across enterprise-scale SaaS environments.
          </motion.p>

          <motion.p
            variants={revealUp}
            className="max-w-[62ch] text-pretty text-[1.0625rem] leading-[1.65] text-ink-3"
          >
            The study traces how separate administrative surfaces — single sign-on, provisioning,
            break-glass access, and teammate lifecycle — were brought into a single, coherent
            governance layer.
          </motion.p>
        </motion.div>

        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-soft pt-10 sm:grid-cols-4"
        >
          <MetaCell label="Discipline" value="Enterprise platform design" />
          <MetaCell label="Scope"      value="SSO · SCIM · Lifecycle · Governance" />
          <MetaCell label="Audience"   value="Enterprise admins, IT, security" />
          <MetaCell label="Read time"  value="≈ 8 minutes" />
        </motion.dl>

        <motion.a
          href="#problem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={IN_VIEW}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 inline-flex items-center gap-3 self-start text-[12px] uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink-1"
          aria-label="Continue to the problem"
        >
          <span>Begin reading</span>
          <span
            aria-hidden
            className="inline-block h-px w-10 bg-line-strong transition-colors group-hover:bg-ink-1"
          />
        </motion.a>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={revealUp}>
      <dt className="text-eyebrow uppercase text-ink-4">{label}</dt>
      <dd className="mt-2 text-body-sm text-ink-1 text-pretty">{value}</dd>
    </motion.div>
  );
}
