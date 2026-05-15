'use client';

import {
  WorkflowSection,
  Layer,
  NodeCard,
  VerticalConnector,
  BranchConnector,
  Stagger,
} from './_primitives';

/**
 * SSO + Break-Glass User Workflow
 * ─────────────────────────────────
 *
 * A two-track architecture artifact: the primary SSO path on the left,
 * the break-glass (BGU) fallback on the right, joined at the top by
 * one authentication router and at the bottom by the recovery loop
 * back to SSO.
 *
 * Goal: communicate that BGU isn't a feature bolted on — it's part of
 * the same authentication surface, governed by the same lifecycle, and
 * always observable.
 *
 * Visual register intentionally evokes a redundancy diagram in a
 * distributed-systems doc (Stripe / Vercel). The eye reads "two paths,
 * one outcome" without any infographic decoration.
 */
export function SsoBreakGlassWorkflow() {
  return (
    <WorkflowSection
      id="sso-break-glass"
      eyebrow="Workflow · Authentication continuity"
      title="SSO with a quietly-engineered fallback path."
      description="A two-track authentication surface — primary single sign-on on one side, break-glass user access on the other — joined by a recovery loop that returns the system to the identity provider as soon as it can."
      insight="Resilience isn't a separate feature. It's a sequence the admin can follow without thinking, designed once and quietly available the day the identity provider isn't."
    >
      <Stagger className="flex flex-col">
        {/* 00 · Entry */}
        <Layer ordinal="00 · Entry" caption="Admin sign-in" hint="Single surface">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <NodeCard
              kind="source"
              label="Admin opens admin URL"
              sublabel="No fork in the URL itself — the same address handles both paths."
              emphasis
            />
            <NodeCard
              kind="service"
              label="Tenant lookup"
              sublabel="Tenant resolved from the email domain or workspace hint."
            />
            <NodeCard
              kind="service"
              label="Auth router"
              sublabel="Reads tenant SSO posture; decides which path to surface next."
              meta="State-driven"
            />
          </div>
        </Layer>

        {/* Fork */}
        <BranchConnector
          label="Authentication state"
          arms={['IdP available', 'IdP unavailable']}
        />

        {/* 01 · Two-track */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Primary — SSO */}
          <Layer ordinal="01a · Primary" caption="SSO" hint="Happy path" surface="surface">
            <Stagger className="flex flex-col gap-3">
              <NodeCard
                kind="service"
                label="Metadata exchange"
                sublabel="IdP metadata parsed; entity ID, ACS URL, and certificate read inline."
              />
              <NodeCard
                kind="service"
                label="SAML / OIDC handshake"
                sublabel="Assertion validated against the configured signing certificate."
              />
              <NodeCard
                kind="state"
                label="Certificate state"
                sublabel="Healthy · Near-expiry · Expired — surfaced before the admin is locked out."
                meta="Pre-emptive"
              />
              <NodeCard
                kind="state"
                label="Session issued"
                sublabel="Standard session, scoped to tenant, observed in the audit log."
              />
            </Stagger>
          </Layer>

          {/* Fallback — BGU */}
          <Layer
            ordinal="01b · Fallback"
            caption="Break-glass user"
            hint="Always discoverable"
            surface="mute"
          >
            <Stagger className="flex flex-col gap-3">
              <NodeCard
                kind="fallback"
                label="BGU credential"
                sublabel="Local credential held by a small set of named admins; never federated."
                emphasis
              />
              <NodeCard
                kind="fallback"
                label="Sync-exempt flag"
                sublabel="The BGU account is immutable by SCIM. A failed sync can't disable the door."
                meta="Immutable property"
              />
              <NodeCard
                kind="fallback"
                label="Hard ceiling"
                sublabel="A tenant cannot have more than N break-glass users at a time."
              />
              <NodeCard
                kind="observer"
                label="Audit notification"
                sublabel="Every BGU login pings the other admins — resilience without observability is just risk in a different jacket."
                meta="On every login"
              />
            </Stagger>
          </Layer>
        </div>

        <VerticalConnector
          label="Recovery"
          sublabel="Time-bounded continuity"
        />

        {/* 02 · Recovery */}
        <Layer
          ordinal="02 · Recovery"
          caption="Return to primary"
          hint="Lifecycle-bounded"
          surface="surface"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <NodeCard
              kind="state"
              label="Temporary continuity"
              sublabel="BGU session is time-bounded by policy; expiry is visible to the admin."
              meta="Time-bound"
            />
            <NodeCard
              kind="service"
              label="IdP health check"
              sublabel="Platform polls the identity provider; restoration is observed automatically."
            />
            <NodeCard
              kind="state"
              label="Return to SSO"
              sublabel="When SSO is healthy, the next sign-in goes through the primary path again — the door closes itself."
              emphasis
            />
          </div>
        </Layer>
      </Stagger>
    </WorkflowSection>
  );
}
