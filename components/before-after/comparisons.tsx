'use client';

/**
 * Before / After comparisons — three named comparison artifacts, each
 * a thin wrapper around `BeforeAfterArtifact` with the finished
 * editorial copy baked in. Import them by name into the case study,
 * or render the combined `BeforeAfterComparisons` to drop the whole
 * chapter in one move.
 *
 * Copy register:
 *   • Title — a single arc, sentence-case, ending with a period.
 *   • Description — one paragraph, 35–55 words. Frame the shift, not
 *     the features.
 *   • Items — short operational phrases, sentence-case, 3–6 words.
 *     Asymmetry between before/after lists is allowed and often
 *     useful.
 *   • Insight — one sentence, italic, designer voice. The line that
 *     ties the comparison to the larger systems argument.
 */

import { BeforeAfterArtifact } from './_primitives';

/* ──────────────────────────────────────────────────────────────────── *
 *  01 · Fragmented governance → Centralised governance
 * ──────────────────────────────────────────────────────────────────── */

export function FragmentedToCentralisedGovernance() {
  return (
    <BeforeAfterArtifact
      id="fragmented-to-centralised"
      eyebrow="Comparison · Governance evolution"
      title="Fragmented governance → Centralised governance."
      description="How enterprise administration shifted from a set of separately managed workspaces into a single governance plane — without removing the workspace-level control each ENT already trusted."
      before={{
        state: 'Fragmented governance',
        items: [
          'Isolated ENT administration',
          'Scattered configuration',
          'Repeated setup overhead',
          'No org-level visibility',
        ],
      }}
      after={{
        state: 'Centralised governance',
        items: [
          'Centralised visibility',
          'Orchestration oversight',
          'Unified governance layer',
          'Workspace autonomy preserved',
        ],
      }}
      insight="Centralisation wasn't a consolidation of authority. It was a consolidation of visibility — so the question ‘how is the enterprise doing right now’ finally has somewhere to live."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  02 · Manual provisioning → Orchestrated lifecycle management
 * ──────────────────────────────────────────────────────────────────── */

export function ManualToOrchestratedProvisioning() {
  return (
    <BeforeAfterArtifact
      id="manual-to-orchestrated"
      eyebrow="Comparison · Provisioning evolution"
      title="Manual provisioning → Orchestrated lifecycle management."
      description="How identity setup moved from a repeated configuration exercise inside each workspace into a single orchestration surface — provisioning, role mapping, and sync state reasoned about together."
      surface="warm"
      before={{
        state: 'Manual provisioning',
        items: [
          'Repetitive provisioning setup',
          'Disconnected role mapping',
          'Sync ambiguity',
          'Drift discovered in support tickets',
        ],
      }}
      after={{
        state: 'Orchestrated lifecycle management',
        items: [
          'Guided orchestration',
          'Role-aware provisioning',
          'Operational visibility',
          'Drift surfaced inline',
        ],
      }}
      insight="Provisioning stopped being a setup task and started being a lifecycle one. The page that configured it is now the page that tells you what it's doing."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  03 · Settings navigation → Operational governance
 * ──────────────────────────────────────────────────────────────────── */

export function SettingsToOperationalGovernance() {
  return (
    <BeforeAfterArtifact
      id="settings-to-operational"
      eyebrow="Comparison · Navigation evolution"
      title="Settings navigation → Operational governance."
      description="How the admin home shifted from a configuration page that opened to nothing operational into a governance surface that leads with posture, attention, and signal."
      before={{
        state: 'Settings navigation',
        items: [
          'Buried configuration flows',
          'Setup-centric navigation',
          'Operational state hidden behind clicks',
        ],
      }}
      after={{
        state: 'Operational governance',
        items: [
          'Governance health visibility',
          'Operational intelligence',
          'Centralised oversight',
          'Configuration one click away',
        ],
      }}
      insight="Configuration didn't go away — it moved one click further from the centre of the screen. The page now answers the operational question first, the configuration question second."
    />
  );
}

/* ──────────────────────────────────────────────────────────────────── *
 *  BeforeAfterComparisons — the full chapter
 *
 *  Renders the three comparisons in narrative order, separated by
 *  hairline rules. Use this when you want the whole arc; otherwise
 *  import the named comparisons individually.
 * ──────────────────────────────────────────────────────────────────── */

export function BeforeAfterComparisons() {
  return (
    <>
      <FragmentedToCentralisedGovernance />
      <div className="border-t border-line-soft" aria-hidden />
      <ManualToOrchestratedProvisioning />
      <div className="border-t border-line-soft" aria-hidden />
      <SettingsToOperationalGovernance />
    </>
  );
}
