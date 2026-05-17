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
      title="Organisation-wide visibility, without taking control away from teams."
      why="Enterprise customers needed to see what was happening across every workspace they owned — posture, drift, audit history — but those workspaces had been configured independently for years. Every ask for visibility kept colliding with the operational control each team already held."
      tradeoff="We separated the two. Visibility aggregates up to the enterprise tier; day-to-day administration stays with each workspace. Organisation-wide oversight could finally scale without touching the boundaries the teams running it already trusted."
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
      title="Letting the identity provider be the source of truth."
      why="Provisioning conflicts and drift compounded the moment an enterprise had more than a handful of workspaces. The platform was modelling identity it didn't actually own — and every disagreement between platform state and IdP state turned into a support ticket."
      tradeoff="We gave up the ability to edit identity locally and gained the ability to reason about it correctly. The IdP became upstream — explicitly, in the data model and on the surface — and every downstream conflict picked up one predictable resolution. Read-only states stopped feeling restrictive and started reading as truth."
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
      title="Showing system state inside the setup screen."
      why="Setup completion didn't mean the system was healthy. Certificates expired, provisioning quietly broke, syncs failed at three in the morning — and admins were the last to know, often hearing about it from their support contact instead of the product."
      tradeoff="The setup screen stopped pretending to be a one-time wizard. It reports its own state — the four observable conditions of an SSO connection, the validation outcome of a SCIM mapping — so the page that configured the integration is also the page that tells you it is still working."
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
      title="Designing for the years after someone is invited."
      why="Most of the operational risk in an enterprise account lives in the years after a teammate joins — guest access that lingers past the project, temporary roles that never expire, inactive accounts that quietly retain permissions long after the team has moved on."
      tradeoff="We modelled membership as a lifecycle instead of a setting. Six named states, the transitions between them, and three rules that stay true across all of them — so the interface could answer questions the configuration page never asked, and the data model finally matched how teams already think about who belongs."
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
      title="Opening to posture, not to a settings page."
      why="The home of a governance platform that opens to a configuration page answers the wrong question first. The reason admins actually open it on a Monday is operational — what changed, what needs attention, what's healthy across the workspaces they look after."
      tradeoff="The dashboard became the home. Configuration moved one click away, but the page now leads with posture — workspaces grouped by health, attention items pinned to the top, an activity feed grounded in real signal. The shape of the page finally matches the shape of the question."
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
      eyebrow="Strategic decisions"
      title="Five decisions that shaped the platform."
      description="Each one came from a real operational friction — admins repeating themselves, settings disagreeing with each other, support tickets explaining things the surface should have. The interface got smaller as the decisions got sharper."
      insight="Every decision below removed a layer of the settings page — not by hiding it, but by naming what it was always trying to say."
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
