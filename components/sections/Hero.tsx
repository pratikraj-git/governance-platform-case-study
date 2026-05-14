'use client';

import { motion } from 'framer-motion';
import { IN_VIEW, revealStagger, revealUp } from '@/lib/motion';

/**
 * Hero — section 00.
 *
 * Light editorial spread. Type-led, no dark surfaces, no diagram on the
 * right. The visual restraint is the statement: this is a designer’s
 * case study, not a SaaS marketing landing page.
 *
 * Hierarchy: small project label → editorial title → one short paragraph
 * → a quiet metadata strip → continue cue.
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
            A case study by Pratik Raj · Enterprise platform design · 2025–26
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="max-w-[18ch] text-balance font-semibold text-ink-1"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
            }}
          >
            Designing a calmer way to govern an enterprise SaaS.
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="max-w-[60ch] text-pretty text-[1.125rem] leading-[1.6] text-ink-2"
          >
            Over a year, I led the design of the governance surfaces that enterprise customers
            depend on — identity, access, lifecycle, and operational visibility — and slowly
            stitched them into a single, coherent administrative layer.
          </motion.p>

          <motion.p
            variants={revealUp}
            className="max-w-[60ch] text-pretty text-[1.0625rem] leading-[1.65] text-ink-3"
          >
            This is the design story behind that work — what the problem actually looked like,
            what I chose to simplify, and how a fragmented surface area began to behave like a platform.
          </motion.p>
        </motion.div>

        <motion.dl
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-soft pt-10 sm:grid-cols-4"
        >
          <MetaCell label="Role"      value="Lead Product Designer" />
          <MetaCell label="Scope"     value="SSO · SCIM · RBAC · Admin" />
          <MetaCell label="Audience"  value="Enterprise admins, IT, security" />
          <MetaCell label="Read time" value="≈ 8 minutes" />
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
