'use client';

/**
 * Admin dashboard — exploratory wireframes.
 *
 * Sibling companion to `AdminDashboardDirections.tsx`. Three early
 * grayscale wireframes that informed the directions the dashboard
 * could go. Deliberately rendered small — they are *exploratory*,
 * not shipped surfaces, and should read that way on the page.
 *
 * No hero scale. No long captions. Three figures in a single calm
 * row that supports the exploration narrative without overpowering
 * the wireframes already on the page.
 */

import { Figure } from '@/components/ui/Figure';
import { ScreenSection, ScreenGroup } from '@/components/workflows/_screens';

export function AdminDashboardScreens() {
  return (
    <ScreenSection
      id="admin-dashboard-screens"
      eyebrow="Wireframes · Direction studies"
      title="Three early directions for the governance dashboard."
      description="Each one tested a different first question the surface could answer — KPI summary, sectioned workbench, or insight-driven flow. Only the third one shipped, but the first two earned their place in the reasoning."
      surface="warm"
    >
      <ScreenGroup
        ordinal="01"
        label="Direction set"
        intent="Three direction studies, in the same scale, with one short note each. The shipped surface inherited its shape from the third — but the first two are kept here because the call only reads as a call when the rejected directions are visible alongside it."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <Figure
            src="/assets/screens/dashboard/wireframe-kpi-card-grid.png"
            alt="Direction 01 — KPI card grid. A summary-tiles approach to the governance home, rejected as too reporting-led."
            width={1536}
            height={1024}
            scale="detail"
            caption="01 · KPI card grid — summary-first. Did not ship."
          />
          <Figure
            src="/assets/screens/dashboard/wireframe-section-workbench.png"
            alt="Direction 02 — sectioned workbench. A domain-grouped approach to the governance home, considered as an alternate."
            width={1536}
            height={1024}
            scale="detail"
            caption="02 · Sectioned workbench — domain-grouped. Considered, did not ship."
          />
          <Figure
            src="/assets/screens/dashboard/wireframe-insight-driven-flow.png"
            alt="Direction 03 — insight-driven flow. The exploration that shaped the shipped governance dashboard."
            width={1536}
            height={1024}
            scale="detail"
            caption="03 · Insight-driven flow — posture-first. Shipped direction."
          />
        </div>
      </ScreenGroup>
    </ScreenSection>
  );
}
