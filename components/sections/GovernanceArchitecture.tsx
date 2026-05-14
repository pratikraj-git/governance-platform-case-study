'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GovernanceDiagram } from '@/components/ui/GovernanceDiagram';
import { PrincipleRow, type Principle } from '@/components/ui/PrincipleRow';
import { IN_VIEW, ease, revealStagger, revealUp } from '@/lib/motion';

/**
 * GovernanceArchitecture — section 02.
 *
 * The architectural centerpiece. Three movements:
 *
 *   1. The map itself — full-width, light surface, faithful to the
 *      project's actual architecture.
 *   2. Four planes — Administration, Governance, Identity & Lifecycle,
 *      Workspaces — broken down with the responsibilities of each.
 *   3. Five principles — the systems-level commitments that hold the
 *      layer together.
 *
 * This section is the "thesis statement" of the case study: every later
 * section grounds itself in one of these planes.
 */
export function GovernanceArchitecture() {
  return (
    <SectionContainer id="governance-architecture" width="wide" spacing="default" topRule>
      <div className="flex flex-col gap-20 lg:gap-28">
        {/* ── Movement 1: the map ────────────────────────────────────── */}
        <div className="flex flex-col gap-12 lg:gap-14">
          <SectionHeader
            eyebrow="02 · Governance Architecture"
            title="One layer between identity, policy, and the workspaces they govern."
            description="The redesign promotes governance from a feature shipped per workspace to a layer that sits above all of them — federated to every identity provider, projected down to every tenant, and instrumented for operational visibility end to end."
            descriptionWidth="narrow"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.8, ease: ease.standard }}
          >
            <GovernanceDiagram tone="light" />
          </motion.div>

          {/* Caption row: directional language */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-6 border-t border-line-soft pt-8 md:grid-cols-3"
          >
            <CaptionCell
              eyebrow="Inbound"
              title="Identity federation"
              description="One IdP application per enterprise — many workspaces. SAML and SCIM resolve through a single architectural contract."
            />
            <CaptionCell
              eyebrow="Plane"
              title="Unified policy authority"
              description="SSO, SCIM, RBAC, audit, and API tokens treated as facets of one governance object, not five disconnected screens."
            />
            <CaptionCell
              eyebrow="Outbound"
              title="Multi-tenant projection"
              description="Policy applied per workspace; telemetry and exceptions roll back up to a single operational view."
            />
          </motion.div>
        </div>

        {/* ── Movement 2: the four planes ───────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              Architecture · Four Planes
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              What lives where — and why the separation matters.
            </motion.h3>
          </motion.header>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {PLANES.map((p) => (
              <motion.article
                key={p.index}
                variants={revealUp}
                className="group flex h-full flex-col gap-5 rounded-md border border-line bg-surface p-6 transition-colors hover:border-line-strong md:p-7"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">
                    {p.index}
                  </span>
                  <span className="text-eyebrow uppercase text-ink-4">
                    {p.kind}
                  </span>
                </header>

                <div className="space-y-3">
                  <h4 className="text-h3 text-ink-1 text-balance">{p.title}</h4>
                  <p className="text-body-sm text-ink-2 text-pretty">{p.summary}</p>
                </div>

                <ul className="mt-auto flex flex-col gap-2 border-t border-line-soft pt-4">
                  {p.contains.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-[12px] text-ink-3">
                      <span aria-hidden className="h-px w-3 bg-line-strong" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* ── Movement 3: orchestration — the directional model ─────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={IN_VIEW}
          variants={revealStagger}
          className="grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-16"
        >
          <motion.div variants={revealUp} className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-ink-3">Orchestration model</p>
            <h3 className="mt-4 text-h2 text-ink-1 text-balance">
              Policy flows down. Telemetry flows up. One contract in the middle.
            </h3>
            <p className="mt-5 max-w-[52ch] text-body text-ink-2 text-pretty">
              Administrators author policy once at the governance layer. The layer projects that policy
              into every workspace it governs and emits a normalized audit trail back the other way.
              Workspaces stay autonomous in execution — never in definition.
            </p>
          </motion.div>

          <motion.dl variants={revealUp} className="lg:col-span-7 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            {ORCHESTRATION.map((row) => (
              <div key={row.label} className="space-y-2 border-t border-line-soft pt-5">
                <dt className="flex items-center gap-3 text-eyebrow uppercase text-ink-3">
                  <span className="font-mono text-[10px] text-ink-4">{row.direction}</span>
                  <span>{row.label}</span>
                </dt>
                <dd className="text-body-sm text-ink-1 text-pretty">{row.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Movement 4: the five principles ────────────────────────── */}
        <div className="flex flex-col gap-10">
          <motion.header
            initial="hidden"
            whileInView="show"
            viewport={IN_VIEW}
            variants={revealStagger}
            className="flex flex-col gap-4 lg:max-w-[var(--container-narrow)]"
          >
            <motion.p variants={revealUp} className="text-eyebrow uppercase text-ink-3">
              The systems-level commitments
            </motion.p>
            <motion.h3 variants={revealUp} className="text-h2 text-ink-1 text-balance">
              Five principles the layer is engineered to uphold.
            </motion.h3>
          </motion.header>

          <PrincipleRow principles={PRINCIPLES} />
        </div>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 * Content
 * ──────────────────────────────────────────────────────────────────── */

const PLANES: Array<{
  index: string;
  kind: string;
  title: string;
  summary: string;
  contains: string[];
}> = [
  {
    index: '01',
    kind: 'Plane',
    title: 'Administration',
    summary:
      'Where authority is declared. Org-level roles, delegation, and ownership of policy itself live here.',
    contains: ['Org Admin', 'Delegated administration', 'Workspace switching'],
  },
  {
    index: '02',
    kind: 'Plane',
    title: 'Governance Layer',
    summary:
      'The unified policy plane. SSO, SCIM, RBAC, audit, and API tokens converge into one architectural contract.',
    contains: ['Policy authority', 'One source of truth', 'Versioned, attestable'],
  },
  {
    index: '03',
    kind: 'Plane',
    title: 'Identity & Lifecycle',
    summary:
      'How identity actually moves through the system: federation, provisioning, role mapping, fallback access.',
    contains: ['SSO / SCIM', 'Role mapping', 'Break-Glass access'],
  },
  {
    index: '04',
    kind: 'Plane',
    title: 'Workspaces',
    summary:
      'Where policy lands. Workspaces stay autonomous operationally; identity and access are inherited, not duplicated.',
    contains: ['Multi-tenant projection', 'Inherited policy', 'Per-tenant overrides'],
  },
];

const ORCHESTRATION: Array<{ direction: string; label: string; value: string }> = [
  {
    direction: '↓',
    label: 'Policy',
    value: 'Defined once at the governance layer; projected into every workspace it governs.',
  },
  {
    direction: '↓',
    label: 'Provisioning',
    value: 'One SCIM contract, federated tokens, identification resolved per workspace via attributes — not duplicated apps.',
  },
  {
    direction: '↑',
    label: 'Telemetry',
    value: 'Activity, drift, and exceptions roll back up to a single operational view.',
  },
  {
    direction: '↑',
    label: 'Audit',
    value: 'A normalized audit trail across workspaces — actor, resource, risk — available to compliance without per-tenant export.',
  },
];

const PRINCIPLES: Principle[] = [
  {
    index: '01',
    title: 'Enterprise Ready',
    description: 'Secure, attestable, and scalable by default — every layer survives a security and compliance review.',
  },
  {
    index: '02',
    title: 'Unified Governance',
    description: 'One policy plane; delegated administration without forking the source of truth.',
  },
  {
    index: '03',
    title: 'Operational Intelligence',
    description: 'A single operational view across users, content, and deployments — anchored in the same telemetry.',
  },
  {
    index: '04',
    title: 'Resilient by Design',
    description: 'Break-glass access and fail-safe paths are first-class primitives, not retrofitted recoveries.',
  },
  {
    index: '05',
    title: 'Future Proof',
    description: 'A foundation that absorbs new modules, tenants, and identity patterns without re-architecting the plane.',
  },
];

/* ──────────────────────────────────────────────────────────────────── *
 * Helpers
 * ──────────────────────────────────────────────────────────────────── */

function CaptionCell({
  eyebrow, title, description,
}: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div variants={revealUp} className="space-y-2">
      <p className="text-eyebrow uppercase text-ink-4">{eyebrow}</p>
      <p className="text-body font-medium text-ink-1">{title}</p>
      <p className="text-body-sm text-ink-2 text-pretty">{description}</p>
    </motion.div>
  );
}
