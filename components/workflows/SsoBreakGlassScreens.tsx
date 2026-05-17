'use client';

/**
 * SSO + Break-glass — execution proof.
 *
 * Sibling companion to `SsoBreakGlassWorkflow.tsx`. Walks the
 * authentication surface in narrative order — from the canonical
 * sign-in, through the domain identifier that decides the path,
 * into the two fallbacks, and out to setup + summary state.
 *
 *   01 · Canonical sign-in       — what the admin sees first
 *   02 · Path selection          — the domain identifier
 *   03 · The two fallbacks       — emergency vs temporary teammate
 *   04 · Setup configuration     — metadata handling
 *   05 · Summary states          — what the admin returns to
 *
 * The flow stays linear and calm. No tabbed comparisons, no
 * floating call-outs — the page just walks you through the
 * sequence the system already runs.
 */

import { Figure } from '@/components/ui/Figure';
import { ScreenSection, ScreenGroup } from './_screens';

export function SsoBreakGlassScreens() {
  return (
    <ScreenSection
      id="sso-break-glass-screens"
      eyebrow="Screens · SSO and fallback access"
      title="The sign-in path, walked end to end."
      description="Six screens, in the order the system uses them — the canonical SSO sign-in, the domain identifier that routes the request, the two fallback paths, the metadata-aware setup surface, and the configuration summary the admin returns to."
      surface="warm"
    >
      {/* ── 01 · Canonical SSO sign-in */}
      <ScreenGroup
        ordinal="01"
        label="Direct SSO sign-in"
        intent="The happy path. The default surface every admin sees first — the system assumes the identity provider is available."
      >
        <Figure
          src="/assets/screens/sso/direct-sign-in.png"
          alt="Direct SSO sign-in — the canonical authentication surface."
          width={2203}
          height={1093}
          scale="hero"
          caption="Direct SSO sign-in. The default state of the page when the identity provider is reachable."
        />
      </ScreenGroup>

      {/* ── 02 · Domain identified — SSO path */}
      <ScreenGroup
        ordinal="02"
        label="Path selection"
        intent="The domain identifier — the small surface that decides whether the request continues on SSO or routes to a fallback path."
      >
        <Figure
          src="/assets/screens/sso/domain-identified-sso.png"
          alt="Domain identified — SSO path. The system recognises the domain and continues on the SSO route."
          width={1742}
          height={650}
          scale="support"
          caption="When the domain is identified and SSO is healthy, the system continues without surfacing the fallback at all."
        />
      </ScreenGroup>

      {/* ── 03 · Two fallback paths, side by side */}
      <ScreenGroup
        ordinal="03"
        label="The two fallbacks"
        intent="When SSO can't complete, the surface routes the request along one of two narrowly-scoped paths. Both stay available without being advertised."
        pair
      >
        <Figure
          src="/assets/screens/sso/domain-identified-bgu-emergency.png"
          alt="Domain identified — break-glass user (emergency access). The fallback for when the identity provider is unavailable."
          width={1194}
          height={859}
          scale="support"
          caption="Emergency break-glass. Bounded, audited, surfaced only when the IdP is unreachable."
        />
        <Figure
          src="/assets/screens/sso/domain-identified-bgu-active-temp.png"
          alt="Domain identified — break-glass user (active temporary teammate). The fallback for active temporary access continuity."
          width={1295}
          height={859}
          scale="support"
          caption="Active temporary teammate. A second, narrower fallback that handles in-flight temporary access without forcing a full SSO trip."
        />
      </ScreenGroup>

      {/* ── 04 · Setup — metadata handling */}
      <ScreenGroup
        ordinal="04"
        label="Setup · Metadata handling"
        intent="The setup page treats the IdP metadata as parseable input — not as a blob the admin has to translate. Errors are named, not generic."
      >
        <Figure
          src="/assets/screens/sso/metadata-handling.png"
          alt="SSO metadata handling — parsed IdP metadata with the relevant fields surfaced inline."
          width={4525}
          height={985}
          scale="hero"
          caption="Metadata is parsed and the relevant fields are surfaced inline. The admin reviews their IdP rather than translating it."
        />
      </ScreenGroup>

      {/* ── 05 · Configuration summary */}
      <ScreenGroup
        ordinal="05"
        label="Configuration summary"
        intent="The page the admin returns to after setup. The same surface that configured the integration now reports on its own state."
      >
        <Figure
          src="/assets/screens/sso/configuration-summary-states.png"
          alt="SSO configuration summary — the four observable conditions of an SSO connection surfaced inline on the setup page."
          width={4728}
          height={1065}
          scale="hero"
          caption="The four observable conditions of an SSO connection are surfaced on the same page that configured them. Setup completion isn't pretended to be the end of the work."
        />
      </ScreenGroup>
    </ScreenSection>
  );
}
