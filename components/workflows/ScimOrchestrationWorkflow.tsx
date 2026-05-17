'use client';

import {
  WorkflowSection,
  Layer,
  NodeCard,
  VerticalConnector,
  Stagger,
} from './_primitives';

/**
 * SCIM Orchestration Workflow
 * ─────────────────────────────
 *
 * Three-layer architecture artifact for enterprise provisioning.
 *
 *   01 · Source      → the Identity Provider as canonical truth
 *   02 · Orchestration → the platform's SCIM module: tokens, sync,
 *                       role mapping, retry, lifecycle, audit
 *   03 · Tenants     → workspaces / enterprise tenants receiving sync
 *
 * The two channels between layers are named (SCIM 2.0 / outbound sync)
 * to make the directionality and the contract explicit. The right-hand
 * column carries a single sentence per layer — designer commentary,
 * not API copy.
 *
 * Intent: this should read like the architecture diagrams Stripe and
 * Vercel use in their engineering editorials — structural, not
 * decorative.
 */
export function ScimOrchestrationWorkflow() {
  return (
    <WorkflowSection
      id="scim-orchestration"
      eyebrow="Workflow · Provisioning"
      title="How provisioning actually moves between systems."
      description="Identity is owned by the customer's identity provider. The platform's job is to listen to it accurately, apply the result deterministically across every workspace, and keep that loop legible to the admin — through token rotation, role mapping, and sync failures."
      insight="The platform doesn't own identity. It listens to identity that lives somewhere else — and the design has to make that asymmetry obvious at every step, not just on the day setup happens."
    >
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        {/* DIAGRAM */}
        <div className="lg:col-span-8">
          <Stagger className="flex flex-col">
            {/* 01 · Source */}
            <Layer
              ordinal="01 · Source"
              caption="Identity provider"
              hint="Source of truth"
              surface="surface"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <NodeCard
                  kind="source"
                  label="IdP directory"
                  sublabel="Users, groups, attributes — owned by the enterprise's identity team."
                />
                <NodeCard
                  kind="source"
                  label="Group membership"
                  sublabel="Reflects organisational structure; downstream role mapping reads from here."
                />
                <NodeCard
                  kind="source"
                  label="Identity audit"
                  sublabel="Joiner / mover / leaver events originate at the IdP; the platform observes."
                />
              </div>
            </Layer>

            <VerticalConnector
              label="SCIM 2.0"
              sublabel="Token-authenticated, push-mode"
            />

            {/* 02 · Orchestration */}
            <Layer
              ordinal="02 · Orchestration"
              caption="SCIM module"
              hint="Platform-managed"
              surface="mute"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <NodeCard
                  kind="service"
                  label="Token issuance"
                  sublabel="Bearer tokens scoped per tenant. Rotation is visible — never hidden behind a regenerate button alone."
                  meta="Tenant-scoped"
                />
                <NodeCard
                  kind="service"
                  label="Sync engine"
                  sublabel="Reconciles incoming SCIM operations against tenant state; back-pressure on bursts."
                  meta="Idempotent · ordered"
                />
                <NodeCard
                  kind="service"
                  label="Role mapping rules"
                  sublabel="IdP groups → platform roles, with explicit precedence so two rules never silently disagree."
                  emphasis
                />
                <NodeCard
                  kind="service"
                  label="Retry & reconcile"
                  sublabel="Failed operations queue with a bounded retry window; reconciliation runs on a quiet schedule."
                  meta="Bounded retries"
                />
                <NodeCard
                  kind="state"
                  label="Lifecycle states"
                  sublabel="Managed · Unmanaged · Guest · Temporary. Each row knows which one applies."
                />
                <NodeCard
                  kind="observer"
                  label="Audit trail"
                  sublabel="Every reconcile, mapping change, and token event becomes a row in the audit log."
                />
              </div>
            </Layer>

            <VerticalConnector
              label="Outbound sync"
              sublabel="Tenant-scoped, observable"
            />

            {/* 03 · Tenants */}
            <Layer
              ordinal="03 · Tenants"
              caption="Workspaces"
              hint="Enterprise destinations"
              surface="surface"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <NodeCard kind="tenant" label="Workspace · A" sublabel="Region: NA · SCIM on" />
                <NodeCard kind="tenant" label="Workspace · B" sublabel="Region: EU · SCIM on" />
                <NodeCard kind="tenant" label="Workspace · C" sublabel="Region: APAC · SCIM on" />
                <NodeCard
                  kind="tenant"
                  label="+ N tenants"
                  sublabel="Each workspace inherits the orchestration contract above."
                />
              </div>
            </Layer>
          </Stagger>
        </div>

        {/* RIGHT COLUMN — editorial commentary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start flex flex-col gap-7">
          <CommentaryRow
            ordinal="01"
            title="Where truth lives"
            body="The IdP is the system of record. The platform's job is to listen accurately and apply the result deterministically."
          />
          <CommentaryRow
            ordinal="02"
            title="Where the design happens"
            body="The orchestration tier is the part the admin actually interacts with. Token rotation, mapping precedence, retry behaviour — all of it has to read cleanly months after setup."
          />
          <CommentaryRow
            ordinal="03"
            title="Where the contract lands"
            body="Tenants don't configure SCIM themselves. They inherit a single orchestration contract that the platform owns and can evolve."
          />
        </aside>
      </div>
    </WorkflowSection>
  );
}

function CommentaryRow({
  ordinal,
  title,
  body,
}: {
  ordinal: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-line-strong pl-5">
      <p className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-4">— {ordinal}</span>
        <span className="text-eyebrow uppercase text-ink-3">{title}</span>
      </p>
      <p className="text-body-sm text-ink-2 text-pretty">{body}</p>
    </div>
  );
}
