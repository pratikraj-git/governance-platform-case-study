'use client';

/**
 * Key decisions — five named components, one per strategic call the
 * governance platform asked the design to make. Each component is a
 * thin wrapper around `KeyDecision` with the finished editorial copy
 * baked in, so the case study can compose them by name:
 *
 *   import { CentralizedGovernanceDecision } from '@/components/decisions/decisions';
 *
 *   <CentralizedGovernanceDecision />
 *
 * The combined `KeyDecisions` section renders the full set in
 * narrative order — use it as a "Key decisions" chapter, or pick
 * individual decisions to insert as sidebars within existing sections.
 *
 * Copy register:
 *
 *   • Why this mattered — 25–45 words. Strategic context, business
 *     reality, the friction that forced the call.
 *   • Tradeoff · Impact — 25–55 words. What was given up, what was
 *     gained, what the system can now reason about that it couldn't
 *     before.
 *
 * Tone is intelligent, calm, interview-friendly. No marketing
 * language, no exaggerated impact claims, no buzzwords.
 */

import {
  KeyDecision,
  KeyDecisionsList,
  KeyDecisionsSection,
} from './_primitives';
import { Figure } from '@/components/ui/Figure';

/* ──────────────────────────────────────────────────────────────────── *
 *  01 · Centralised governance without removing ENT autonomy
 * ──────────────────────────────────────────────────────────────────── */

export function CentralizedGovernanceDecision() {
  return (
    <KeyDecision
      id="centralised-governance-vs-ent-autonomy"
      ordinal="01"
      title="Centralised governance without removing ENT autonomy."
      why="Enterprise customers needed organisation-level visibility — posture, drift, audit — across workspaces they had spent years configuring independently. The asks for visibility kept colliding with the operational control each ENT already held."
      tradeoff="Visibility had to be aggregated; control had to stay distributed. The governance surface separated the two — global reporting flows up to the enterprise tier, day-to-day administration stays with each workspace — so org-wide oversight could scale without touching the boundaries that ENT teams already trusted."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  02 · Treating the identity provider as the source of truth
 * ──────────────────────────────────────────────────────────────────── */

export function IdpSourceOfTruthDecision() {
  return (
    <KeyDecision
      id="idp-source-of-truth"
      ordinal="02"
      title="Treating the identity provider as the source of truth."
      why="Provisioning conflicts and lifecycle drift compounded the moment an enterprise had more than a handful of workspaces. The platform was trying to model identity it didn't own — and every divergence between platform state and IdP state produced a support ticket."
      tradeoff="We gave up the ability to edit identity locally and gained the ability to reason about it correctly. The IdP became upstream — explicitly, in the data model and on the surface — and every downstream conflict picked up a single, predictable resolution. Read-only states stopped feeling restrictive and started reading as truth."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  03 · Surfacing operational state inside the setup flow
 * ──────────────────────────────────────────────────────────────────── */

export function OperationalStatesInSetupDecision() {
  return (
    <KeyDecision
      id="operational-state-in-setup"
      ordinal="03"
      title="Surfacing operational state inside the setup flow."
      why="Setup completion didn't mean the system was healthy. Certificate drift, provisioning failures, and sync errors arrived after the configuration screen was closed — and admins were the last to know, often hearing about it from their support contact."
      tradeoff="The setup surface stopped pretending to be a one-time wizard. It now reports its own ongoing state — the four observable conditions of an SSO connection, the validation outcome of a SCIM mapping — so the page that configured the integration is also the page that tells you it is still working."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  04 · Governance beyond authentication
 * ──────────────────────────────────────────────────────────────────── */

export function GovernanceBeyondAuthenticationDecision() {
  return (
    <KeyDecision
      id="governance-beyond-authentication"
      ordinal="04"
      title="Governance beyond authentication."
      why="Most of the operational risk in an enterprise account lives in the years after a teammate is invited — guest access that lingers past the project, temporary roles that never expire, inactive accounts that retain permissions long after a team has moved on."
      tradeoff="We modelled the lifecycle as a state machine instead of a setting. Six explicit states, named transitions, and three cross-cutting concerns — so the interface answers questions the configuration page never asked, and the data model finally agrees with how enterprises already think about membership."
      evidenceLabel="Evidence · Invitation constraints"
      evidence={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Figure
            src="/assets/screens/teammates/invite-error-outside-domain.png"
            alt="Teammate invitation error — an outside-domain address blocked at the invite step, with the constraint named explicitly."
            width={1448}
            height={908}
            scale="detail"
            caption="Outside-domain block. The constraint is named, not generic."
          />
          <Figure
            src="/assets/screens/teammates/invite-error-non-whitelisted.png"
            alt="Teammate invitation error — a non-whitelisted domain blocked at the invite step, distinct from the outside-domain case."
            width={1448}
            height={908}
            scale="detail"
            caption="Non-whitelisted-domain block. A distinct constraint, on purpose."
          />
        </div>
      }
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  05 · Operational intelligence over settings navigation
 * ──────────────────────────────────────────────────────────────────── */

export function OperationalIntelligenceOverSettingsDecision() {
  return (
    <KeyDecision
      id="operational-intelligence-over-settings"
      ordinal="05"
      title="Operational intelligence over settings navigation."
      why="A governance surface that opens to a configuration page answers the wrong question first. The page admins actually open it for is operational: what changed, what needs attention, what is healthy across the workspaces they oversee."
      tradeoff="We made the dashboard the home. Configuration moved one click away, but the surface now leads with posture — workspaces grouped by health, attention items pinned to the top, an activity feed grounded in real operational signal. The shape of the page now matches the shape of the question."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  KeyDecisions — full section
 *
 *  The combined chapter. Use this when you want the entire strategic
 *  arc as a self-contained section of the case study. Otherwise,
 *  import the named decisions individually and embed them where they
 *  reinforce a surrounding argument.
 * ──────────────────────────────────────────────────────────────────── */

export function KeyDecisions() {
  return (
    <KeyDecisionsSection
      id="key-decisions"
      eyebrow="Key decisions · Strategic tradeoffs"
      title="Five decisions that shaped the governance surface."
      description="Each one chose between a feature reading and a systems reading of the same problem. The systems reading won — and the design got simpler because the data model finally agreed with itself."
      insight="The interface gets smaller as the decisions get sharper. Every block below is a place where a layer of the configuration page was removed, not by hiding it, but by naming what it was always trying to say."
    >
      <KeyDecisionsList>
        <CentralizedGovernanceDecision />
        <IdpSourceOfTruthDecision />
        <OperationalStatesInSetupDecision />
        <GovernanceBeyondAuthenticationDecision />
        <OperationalIntelligenceOverSettingsDecision />
      </KeyDecisionsList>
    </KeyDecisionsSection>
  );
}
