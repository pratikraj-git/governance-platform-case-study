# Whatfix Admin Dashboard — AI Agent Recreation Prompt

> This document is a **complete, self-contained brief** designed to be handed to another AI coding agent so it can recreate the Whatfix Admin Dashboard exploration *exactly* — same architecture, same 4 options, same mock data, same design language. Read it top to bottom and follow it as a build plan.

---

## 0. Role & Mandate

You are a senior staff product designer + frontend engineer building a **highly polished interactive enterprise admin dashboard prototype** for the **Whatfix Admin Platform** inside a Vite + React + TypeScript workspace.

You will deliver:
- One unified React application
- Shared shell (sidebar + global header)
- A single `Dashboard` page
- 4 visually distinct dashboard explorations (Option 1, Option 2, Option 3, Option 4)
- Each option contains the **same modules and same functional coverage**; they differ only in layout strategy, hierarchy, orchestration, and interaction philosophy

This is **not** a Figma-only task. It is a **working interactive prototype** running locally in the browser.

---

## 1. Hard Constraints (Non-Negotiable)

### 1.1 Dashboard purpose

The dashboard is **NOT** a navigation shortcut page. It is:
- Admin command center
- Operational intelligence layer
- Governance overview
- Enterprise health center

### 1.2 Do NOT duplicate the sidebar inside dashboard cards

| ❌ Forbidden card titles | ✅ Required card titles |
| --- | --- |
| "Security & Access" | "Security Health" |
| "Users & Workspaces" | "Workspace Operations" |
| "Content" | "Content Governance" |
| "AI Agents" | "AI Readiness" |
| "Deployments" | "Deployment Pipeline" |
| "Integrations" | "Integration Health" |

The sidebar contains destination workflows. The dashboard surfaces operational visibility, health, and actions.

### 1.3 Identical functionality across options

ALL 4 options MUST contain:
- Same modules
- Same capabilities
- Same operational depth
- Same admin ecosystem
- Same functional coverage

The ONLY differences:
- UX strategy
- Layout orchestration
- Hierarchy
- Grouping methodology
- Dashboard composition
- Operational emphasis
- Visual density
- Interaction philosophy
- Information presentation

### 1.4 Option naming in UI

The dashboard switcher MUST simply show:
- `Option 1`
- `Option 2`
- `Option 3`
- `Option 4`

(No descriptive names in the segmented control. Internal component names can be descriptive.)

### 1.5 Strict Whatfix design language

- Restrained enterprise SaaS — Whatfix tokens only
- **No** dribbble aesthetics, glassmorphism, gradients, excessive shadows, futuristic visuals
- **No** trendy / colorful gradients or oversized spacing
- Sophistication comes from hierarchy, spacing, orchestration, and operational clarity
- Inter font, 12–16px, enterprise density

### 1.6 Information depth

Every module/card/widget must have realistic drill-down. Not surface-level.
- Drawers / modals / accordions for detail
- Tables with realistic enterprise data
- Empty / loading / hover / focus states
- Realistic workflows (e.g., SSO config drawer, deployment diagnostics)

### 1.7 Design Info modal per option

VERY IMPORTANT — must be preserved. Each option must include an info icon/button in the dashboard switcher area. On click → polished modal with 7 design rationale bullet points: philosophy, hierarchy strategy, operational focus, layout thinking, best-suited workflow, what differentiates this option.

---

## 2. Tech Stack (Required Versions)

```json
{
  "name": "whatfix-dashboard-boilerplate",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tabler/icons-react": "^3.36.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.38.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0",
    "recharts": "^3.8.1",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@vitejs/plugin-react": "^5.1.1",
    "tailwindcss": "^4.1.18",
    "typescript": "~5.9.3",
    "vite": "^7.2.4"
  }
}
```

Use **inline `style={{}}` for all dashboard option components and shell components**. Do not introduce Tailwind utility classes inside the options — every color and dimension must be inline using the exact tokens listed below. (Existing Tailwind v4 boilerplate `globals.css` remains for the base Inter font and reset only.)

---

## 3. Design Tokens (Use These Hex Values Exactly)

```
Brand orange (primary CTA):   #C74900 / #E45913
Sidebar background:            #252539
Sidebar active item:           #3D3D52
Sidebar secondary (muted):     #A8A8BF
Surface (page bg):             #FCFCFD
Card background:               #FFFFFF
Border / divider:              #ECECF3
Light hover / chip bg:         #F6F6F9
Text heading:                  #1F1F32
Text body:                     #3D3C52
Text secondary:                #6B697B
Text muted:                    #8C899F

Success:  #198558 on #F1FEF9  (Healthy / Active / Connected / Success / Production / Approved)
Warning:  #AD7900 on #FEFBEB  (Warning / Degraded / Rolled back)
Info:     #0975D7 on #F0F9FF  (Staging / Rolling out / In Review)
Critical: #B3141D on #FFF0F3  (Critical / Failed / Down)
Beta:     #7B4EC2 on #F5F0FF  (Beta state)
```

Typography: Inter, weights 400/500/600/700, sizes 12 / 13 / 14 / 16 px.
Border radius: 6–8 px. Borders: 1 px solid `#ECECF3`. No box shadows except subtle hover (`0 2px 6px rgba(0,0,0,0.10)`).

---

## 4. Project File Map

```
src/
├── App.tsx                              # Single route → AdminDashboard
├── main.tsx                             # BrowserRouter entry
├── pages/
│   ├── AdminDashboard.tsx               # Shell + segmented control + Suspense + Design Info modal
│   └── dashboards/
│       ├── Option1.tsx                  # Executive Command Center
│       ├── Option2.tsx                  # Dense Operations Workbench
│       ├── Option3.tsx                  # Intelligent Orchestration
│       └── Option4.tsx                  # Compact Operational Summary
├── components/admin/
│   ├── Shell.tsx                        # Sidebar + global header
│   ├── Drawer.tsx                       # Reusable right-side slide-over
│   ├── InfoModal.tsx                    # Design Info modal
│   └── StatusChip.tsx                   # Status pill with dot
└── data/
    └── mockData.ts                      # All mock data
```

Approximate sizes when complete:
- `Option1.tsx` — ~1000 lines
- `Option2.tsx` — ~1250 lines
- `Option3.tsx` — ~980 lines
- `Option4.tsx` — ~850 lines
- `Shell.tsx` — ~270 lines
- `mockData.ts` — ~220 lines

---

## 5. App Routing

`src/App.tsx`:

```tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

`index.html` title: `Whatfix Admin Dashboard`.

---

## 6. Shared Shell — Spec

### 6.1 Left sidebar (`Shell.tsx`)

- **Width:** 248 px expanded, 64 px collapsed. Toggle button on the right seam (28 × 28 circle, `#2B2B40` bg, `#3D3D52` border, chevron icon).
- **Background:** `#252539`
- **Logo row:** 56 px tall. Whatfix diamond SVG (`#E45913`/`#FF7A3D`) + "Whatfix" wordmark when expanded.
- **Divider:** 1 px `#3D3D52`, 12 px horizontal margins.
- **Nav items:** 38 px tall, 6 px radius. Inactive: white text, `#A8A8BF` icon. Active or child-active: `#3D3D52` bg with 1 px `#3D3D52` border, `#E45913` icon. Hover (non-active): `#2F2F45`.
- **Expandable nav:** Parents with children have a chevron that rotates 180° when expanded. Child rows are 32 px tall, 13 px font, `#A8A8BF` text → white on hover.
- **Bottom user row:** Avatar (26 × 26, white bg with `#E45913` border) + "Sarah Anderson" name.
- **Brand footer:** Whatfix logo image, centered.

### 6.2 Sidebar IA (exact structure)

```
Home (no children)

Content System (icon: IconFileText)
  ├── Content Library (IconFileText)
  ├── Widget Library (IconComponents)
  ├── Global Assets (IconWorld)
  ├── Deployments (IconRocket)
  └── Templates (IconTemplate)

Users & Workspaces (IconUsers)
  ├── Workspaces (IconUsers)
  ├── Roles & Permissions (IconShieldLock)
  └── Audit Logs (IconReport)

Setup & Security (IconShieldLock)
  ├── SSO (IconKey)
  ├── SCIM (IconUsers)
  ├── Integrations (IconLink)
  └── API Tokens (IconTicket)

Branding & Experience (IconPalette)
  ├── Themes (IconPalette)
  ├── Localization (IconLanguage)
  └── Tags (IconTag)

AI & Automation (IconSparkles)
  ├── AI Agents (IconSparkles)
  ├── Sandbox (IconFlask)
  └── Analytics (IconChartBar)

Reports (IconReport, no children)
```

State: `expandedSections: Set<string>`, `activeItem: string`. Default active: `'home'`.

### 6.3 Global header (52 px)

Left side:
1. **Workspace switcher** — 5 × 10 px padding, `#F6F6F9` bg, `#ECECF3` border, 6 px radius. Square 18 × 18 `#E45913` avatar showing "A", "Acme Corp" label, `IconChevronDown`. Dropdown lists: Acme Corp, Acme Corp EU, Acme Corp Dev.
2. **Environment indicator** — `IconCircleFilled` (6 px) + "Production" label, `#198558` text on `#F1FEF9` bg, 3 × 8 px padding.

Right side:
3. **Search input** — `#F6F6F9` bg, `#ECECF3` border, `IconSearch` (15 px) + "Search..." placeholder, min-width 200 px.
4. **Create button** — `#C74900` orange bg, white text, `IconPlus` + "Create" + `IconChevronDown`. Dropdown items (240 px wide):
   - Global Flow — Cross-workspace flow
   - Workspace Flow — Scoped to workspace
   - Global Widget — Cross-workspace widget
   - Workspace Widget — Scoped to workspace
   - Template — Reusable template
   - AI Agent — Configure AI agent
5. **Notifications** — 34 × 34 button with `IconBell`, red dot (8 px) in top-right when unread.
6. **Settings** — 34 × 34 button with `IconSettings`.
7. **Avatar** — 30 × 30 circle with `IconUserCircle`.

All popovers (workspace switcher, Create) close on outside click.

### 6.4 Switcher bar (below header, above option content)

```
[Dashboard]  [Option 1 | Option 2 | Option 3 | Option 4]         [(i) Design Info]
```

- 10 × 24 px padding, white bg, 1 px bottom border `#ECECF3`.
- Segmented control: `#F6F6F9` bg, 2 px padding, 6 px radius, 1 px `#ECECF3` border. Active tab: white bg, `#1F1F32` text, 0 1 3 rgba shadow. Inactive: transparent, `#6B697B`.
- Design Info button: `IconInfoCircle` (15 px) + "Design Info" label. Hover changes border + text to `#0975D7`.

---

## 7. Shared Components

### 7.1 `StatusChip`

Inline-flex pill: 5 px gap, 2 × 8 px padding, 4 px radius, 12 px font, 500 weight. 6 px dot on the left in the same color as the text. Statuses map:

```
healthy / active / connected / good / success / production / approved → success
warning / degraded → warning
staging / rolling-out / review → info
critical / failed / down → critical
draft / disabled → muted (#6B697B / #F6F6F9)
beta → #7B4EC2 / #F5F0FF
rolled-back → warning
```

### 7.2 `Drawer`

Right-side slide-over.
- Fixed full-viewport overlay, z-index 100. Backdrop `rgba(31,31,50,0.3)` with blur.
- Panel: 520 px default width (configurable), white bg, `-4px 0 20px rgba(0,0,0,0.14)` shadow, `slideIn 200ms ease-out` animation.
- Header: 20 × 24 padding, 1 px bottom border. Title (16 px, 600) + optional subtitle (13 px, `#6B697B`) + close button.
- Body: scrollable, 20 × 24 padding.

### 7.3 `InfoModal`

Center-screen modal.
- Backdrop `rgba(31,31,50,0.4)`, 540 px wide, 80vh max, 12 px radius, large soft shadow.
- Header: orange icon chip + title + close button.
- Body: small instruction line ("Design philosophy and UX rationale...") then numbered list (1–7) of points. Each point: numbered chip (20 × 20, `#F6F6F9` bg) + bullet text (14 px, 22 line-height, `#3D3C52`).

---

## 8. Page Orchestrator (`AdminDashboard.tsx`)

```tsx
import { useState, lazy, Suspense } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Shell } from '../components/admin/Shell';
import { InfoModal } from '../components/admin/InfoModal';
import { dashboardInfoContent } from '../data/mockData';

const Option1 = lazy(() => import('./dashboards/Option1').then(m => ({ default: m.Option1 })));
const Option2 = lazy(() => import('./dashboards/Option2').then(m => ({ default: m.Option2 })));
const Option3 = lazy(() => import('./dashboards/Option3').then(m => ({ default: m.Option3 })));
const Option4 = lazy(() => import('./dashboards/Option4').then(m => ({ default: m.Option4 })));

type DashboardOption = 'option1' | 'option2' | 'option3' | 'option4';
```

State: `active: DashboardOption` (default `'option1'`), `infoOpen: boolean`.
Render: Shell → switcher bar → Suspense + conditional render → InfoModal (driven by `dashboardInfoContent[active]`).

Skeleton fallback during lazy load: 5 KPI strip placeholders + 6 module placeholders with `pulse` keyframes.

---

## 9. Mock Data — `src/data/mockData.ts`

### 9.1 `orgHealth` (5 KPIs)

```ts
[
  { id: 'users', label: 'Active Users', value: '1,847', trend: '+156 this month', status: 'good' },
  { id: 'workspaces', label: 'Workspaces', value: '6', trend: '4 healthy · 1 warning · 1 degraded', status: 'warning' },
  { id: 'deployments', label: 'Deploy Success', value: '94.2%', trend: '1 failed · 1 rolled back', status: 'warning' },
  { id: 'ai', label: 'AI Readiness', value: '72%', trend: '4 of 6 agents active', status: 'good' },
  { id: 'integrations', label: 'Integration Health', value: '83%', trend: '5 connected · 1 down', status: 'warning' },
]
```

### 9.2 `priorityAlerts` (5 alerts)

```ts
[
  { id: 'al-1', severity: 'critical', title: 'SSO certificate expires in 12 days',
    description: 'Okta SAML certificate for production SSO will expire on May 26. Users may lose access if not renewed.',
    module: 'Security', cta: 'Renew Certificate', time: '2 hours ago' },
  { id: 'al-2', severity: 'critical', title: 'Deployment failed: Holiday Notice',
    description: 'Push to All Workspaces failed due to content validation error. 1,847 users affected.',
    module: 'Deployment', cta: 'View Diagnostics', time: '1 day ago' },
  { id: 'al-3', severity: 'warning', title: '2 API tokens expiring in 14 days',
    description: 'Analytics Integration and Webhook Relay tokens expire soon. Rotate to maintain service continuity.',
    module: 'Security', cta: 'Rotate Tokens', time: '3 days ago' },
  { id: 'al-4', severity: 'warning', title: 'HR Operations workspace degraded',
    description: 'No deployment in 2 weeks. 3 stale draft items. SCIM sync delayed by 4 hours.',
    module: 'Workspace', cta: 'Review Workspace', time: '5 days ago' },
  { id: 'al-5', severity: 'info', title: 'Deep Think agent available for beta',
    description: 'New AI agent ready for sandbox testing. Enable to evaluate intelligence capabilities.',
    module: 'AI', cta: 'Start Beta Setup', time: '1 week ago' },
]
```

### 9.3 `securityHealth`

```ts
{
  ssoCoverage: '100%', ssoProvider: 'Okta SAML 2.0', ssoStatus: 'active',
  certExpiry: '12 days', certStatus: 'critical',
  scimStatus: 'active', scimLastSync: '12 min ago',
  scimUsersProvisioned: 1847, scimGroupsSynced: 24, scimFailures: 0,
  mfaEnrollment: '94%', mfaStatus: 'good',
  apiTokens: { active: 8, expiring: 2, total: 10 },
  breakGlassUsers: { configured: 3, lastUsed: 'Never' },
  auditEvents: 342, lastAuditReview: '3 days ago',
}
```

### 9.4 `workspaceOps` (6 workspaces)

```ts
[
  { id: 'ws-1', name: 'Enterprise US',   users: 842, status: 'healthy',  aiEnabled: true,  env: 'production', lastDeploy: '2 hours ago',  staleItems: 0, pendingInvites: 5 },
  { id: 'ws-2', name: 'Enterprise EU',   users: 634, status: 'healthy',  aiEnabled: true,  env: 'production', lastDeploy: '5 hours ago',  staleItems: 1, pendingInvites: 2 },
  { id: 'ws-3', name: 'Sales Team',      users: 156, status: 'warning',  aiEnabled: true,  env: 'staging',    lastDeploy: '1 day ago',    staleItems: 3, pendingInvites: 0 },
  { id: 'ws-4', name: 'Analytics',       users:  89, status: 'healthy',  aiEnabled: true,  env: 'production', lastDeploy: '3 days ago',   staleItems: 0, pendingInvites: 1 },
  { id: 'ws-5', name: 'Finance',         users:  67, status: 'healthy',  aiEnabled: false, env: 'production', lastDeploy: '1 week ago',   staleItems: 2, pendingInvites: 0 },
  { id: 'ws-6', name: 'HR Operations',   users:  45, status: 'degraded', aiEnabled: false, env: 'staging',    lastDeploy: '2 weeks ago',  staleItems: 3, pendingInvites: 0 },
]
```

### 9.5 `contentGovernance` + `contentItems`

```ts
contentGovernance = {
  globalAssets: 12, workspaceAssets: 186, totalItems: 198,
  staleContent: 8, pendingApprovals: 6,
  activeDeployments: 2, failedDeployments: 1,
  localizationCoverage: '4 locales · 82% translated',
  lifecycleSummary: { draft: 14, review: 6, approved: 8, production: 170 },
}

contentItems = [
  { id: 'c-1', name: 'Onboarding Flow v3.2',         type: 'Flow',      scope: 'Global',    status: 'review',     author: 'Sarah Chen',   modified: '2 hours ago', workspace: 'Enterprise US' },
  { id: 'c-2', name: 'Feature Announcement — Q2',    type: 'Pop-up',    scope: 'Workspace', status: 'draft',      author: 'Mark Johnson', modified: '4 hours ago', workspace: 'Enterprise EU' },
  { id: 'c-3', name: 'Password Reset Guide',         type: 'Flow',      scope: 'Global',    status: 'approved',   author: 'Emily Davis',  modified: '1 day ago',   workspace: 'All' },
  { id: 'c-4', name: 'CRM Dashboard Tutorial',       type: 'Flow',      scope: 'Workspace', status: 'production', author: 'Alex Rivera',  modified: '2 days ago',  workspace: 'Sales Team' },
  { id: 'c-5', name: 'Holiday Shutdown Notice',      type: 'Pop-up',    scope: 'Global',    status: 'draft',      author: 'Lisa Park',    modified: '3 days ago',  workspace: 'All' },
  { id: 'c-6', name: 'New Report Builder Guide',     type: 'Smart Tip', scope: 'Workspace', status: 'review',     author: 'James Wilson', modified: '4 days ago',  workspace: 'Analytics' },
]
```

### 9.6 `aiReadiness` + `aiAgents`

```ts
aiReadiness = { overallScore: 72, setupCompletion: { done: 8, total: 12 }, sandboxStatus: 'active', ratingsEnabled: true, workspaceCoverage: '4 of 6 workspaces' }

aiAgents = [
  { id: 'flow',       name: 'Flow',       enabled: true,  adoption: 87, rating: 4.6, workspaces: '22/24', status: 'active',       category: 'Guidance',      configHealth: 95 },
  { id: 'popup',      name: 'Pop-up',     enabled: true,  adoption: 73, rating: 4.2, workspaces: '18/24', status: 'active',       category: 'Communication', configHealth: 88 },
  { id: 'seek',       name: 'Seek',       enabled: true,  adoption: 65, rating: 4.4, workspaces: '15/24', status: 'active',       category: 'Discovery',     configHealth: 92 },
  { id: 'quick-read', name: 'Quick Read', enabled: false, adoption:  0, rating: 0,   workspaces: '0/24',  status: 'disabled',     category: 'Productivity',  configHealth:  0 },
  { id: 'ask-ai',     name: 'Ask AI',     enabled: true,  adoption: 52, rating: 4.1, workspaces: '12/24', status: 'rolling-out',  category: 'Support',       configHealth: 78 },
  { id: 'deep-think', name: 'Deep Think', enabled: false, adoption:  0, rating: 0,   workspaces: '0/24',  status: 'beta',         category: 'Intelligence',  configHealth:  0 },
]
```

### 9.7 `deploymentPipeline` + `recentDeployments`

```ts
deploymentPipeline = { successRate: '94.2%', totalThisWeek: 17, failed: 1, rolledBack: 1, avgDuration: '2m 34s', environments: { production: 4, staging: 2, draft: 2 } }

recentDeployments = [
  { id: 'd-1', name: 'Onboarding Flow v3.1', workspace: 'Enterprise US',  status: 'success',     time: '2 hours ago', env: 'production', duration: '1m 45s' },
  { id: 'd-2', name: 'CRM Tutorial Update',  workspace: 'Sales Team',     status: 'success',     time: '5 hours ago', env: 'staging',    duration: '2m 12s' },
  { id: 'd-3', name: 'Holiday Notice',       workspace: 'All Workspaces', status: 'failed',      time: '1 day ago',   env: 'production', duration: '0m 34s' },
  { id: 'd-4', name: 'Report Builder Guide', workspace: 'Analytics',      status: 'success',     time: '2 days ago',  env: 'production', duration: '3m 08s' },
  { id: 'd-5', name: 'Expense Module v2',    workspace: 'Finance',        status: 'rolled-back', time: '4 days ago',  env: 'production', duration: '1m 22s' },
]
```

### 9.8 `integrationHealth` (6 integrations)

```ts
[
  { id: 'int-1', name: 'Okta',       type: 'Identity',      status: 'connected', lastSync: '12 min ago', health: 100 },
  { id: 'int-2', name: 'Salesforce', type: 'CRM',           status: 'connected', lastSync: '30 min ago', health: 98 },
  { id: 'int-3', name: 'Slack',      type: 'Communication', status: 'connected', lastSync: '1 hour ago', health: 100 },
  { id: 'int-4', name: 'Jira',       type: 'Project Mgmt',  status: 'connected', lastSync: '2 hours ago', health: 95 },
  { id: 'int-5', name: 'Zendesk',    type: 'Support',       status: 'down',      lastSync: '3 days ago', health: 0 },
  { id: 'int-6', name: 'Confluence', type: 'Knowledge',     status: 'connected', lastSync: '5 hours ago', health: 92 },
]
```

### 9.9 `recentActivity` (8 events)

```ts
[
  { id: 'a-1', action: 'Enabled AI Agent "Deep Think"',                 user: 'Sarah Anderson', time: '12 min ago', type: 'ai' },
  { id: 'a-2', action: 'Updated SSO certificate configuration',          user: 'Mark Johnson',   time: '1 hour ago', type: 'security' },
  { id: 'a-3', action: 'Provisioned 15 users via SCIM',                  user: 'System',          time: '2 hours ago', type: 'user' },
  { id: 'a-4', action: 'Approved deployment: Onboarding Flow v3.1',      user: 'Emily Davis',     time: '3 hours ago', type: 'deployment' },
  { id: 'a-5', action: 'Regenerated API token: Analytics',               user: 'Alex Rivera',     time: '5 hours ago', type: 'security' },
  { id: 'a-6', action: 'Modified role: Content Editor → Reviewer',       user: 'Lisa Park',       time: '6 hours ago', type: 'user' },
  { id: 'a-7', action: 'Published branding update to EU workspace',      user: 'Rachel Kim',      time: '1 day ago',   type: 'branding' },
  { id: 'a-8', action: 'Rolled back deployment: Expense Module v2',      user: 'David Brown',     time: '4 days ago',  type: 'deployment' },
]
```

### 9.10 `pendingApprovals` (4 items)

```ts
[
  { id: 'pa-1', item: 'Onboarding Flow v3.2',  type: 'Content', requestedBy: 'Sarah Chen',    time: '2 hours ago' },
  { id: 'pa-2', item: 'Security Policy Update', type: 'Content', requestedBy: 'Rachel Kim',    time: '5 hours ago' },
  { id: 'pa-3', item: 'New Report Builder Guide', type: 'Content', requestedBy: 'James Wilson', time: '4 days ago' },
  { id: 'pa-4', item: 'Role: Analytics Admin',  type: 'Role',    requestedBy: 'Alex Rivera',   time: '1 week ago' },
]
```

### 9.11 `recommendations` (7 items)

```ts
[
  { id: 'rec-1', title: 'Complete SSO certificate renewal',            impact: 'Prevents access disruption for 1,847 users',         priority: 'critical', category: 'Security' },
  { id: 'rec-2', title: 'Enable Quick Read agent',                     impact: '+34% productivity in Enterprise US workspace',       priority: 'high',     category: 'AI' },
  { id: 'rec-3', title: 'Rotate expiring API tokens',                  impact: 'Maintains Analytics and Webhook integrations',       priority: 'high',     category: 'Security' },
  { id: 'rec-4', title: 'Publish 8 stale draft items',                 impact: 'Reduces content debt across 3 workspaces',           priority: 'medium',   category: 'Content' },
  { id: 'rec-5', title: 'Review HR Operations workspace health',       impact: 'Resolves degraded state affecting 45 users',         priority: 'medium',   category: 'Workspace' },
  { id: 'rec-6', title: 'Configure SCIM group mapping for Finance',    impact: 'Enables automatic provisioning for 67 users',        priority: 'low',      category: 'Setup' },
  { id: 'rec-7', title: 'Schedule Deep Think beta rollout',            impact: 'Unlocks new intelligence capabilities',              priority: 'low',      category: 'AI' },
]
```

### 9.12 `approvalPipeline` (5 items — Option 4 only)

```ts
[
  { id: 'ap-1', item: 'Onboarding Flow v3.2',     stage: 'review',   assignees: ['Sarah Chen', 'Mark Johnson'],            approved: 1, total: 2, requestedBy: 'Emily Davis',   time: '2 hours ago', workspace: 'Enterprise US' },
  { id: 'ap-2', item: 'Security Policy Update',   stage: 'review',   assignees: ['Rachel Kim'],                            approved: 0, total: 1, requestedBy: 'Alex Rivera',   time: '5 hours ago', workspace: 'Enterprise EU' },
  { id: 'ap-3', item: 'New Report Builder Guide', stage: 'approval', assignees: ['James Wilson', 'Lisa Park', 'David Brown'], approved: 2, total: 3, requestedBy: 'Sarah Anderson', time: '1 day ago',   workspace: 'Analytics' },
  { id: 'ap-4', item: 'CRM Quick Tips v2',        stage: 'approval', assignees: ['Emily Davis'],                           approved: 0, total: 1, requestedBy: 'Mark Johnson',  time: '2 days ago',  workspace: 'Sales Team' },
  { id: 'ap-5', item: 'Q2 Feature Announcement',  stage: 'draft',    assignees: [],                                        approved: 0, total: 0, requestedBy: 'Lisa Park',     time: '3 days ago',  workspace: 'All' },
]
```

### 9.13 `auditEvents` (8 events — Option 4 only)

```ts
[
  { id: 'ae-1', action: 'SSO certificate configuration updated',                actor: 'Mark Johnson',     resource: 'Okta SAML',           category: 'security',   time: '1 hour ago',  risk: 'high' },
  { id: 'ae-2', action: 'Content "Onboarding Flow v3.1" published to production', actor: 'Emily Davis',      resource: 'Enterprise US',       category: 'content',    time: '2 hours ago', risk: 'medium' },
  { id: 'ae-3', action: 'SCIM provisioned 15 users',                            actor: 'System (Okta)',    resource: 'All Workspaces',      category: 'identity',   time: '2 hours ago', risk: 'low' },
  { id: 'ae-4', action: 'API token "Analytics Integration" regenerated',        actor: 'Alex Rivera',      resource: 'API Tokens',          category: 'security',   time: '5 hours ago', risk: 'medium' },
  { id: 'ae-5', action: 'Role "Content Editor" permissions modified',           actor: 'Lisa Park',        resource: 'Roles & Permissions', category: 'access',     time: '6 hours ago', risk: 'high' },
  { id: 'ae-6', action: 'AI Agent "Ask AI" enabled for Sales Team workspace',   actor: 'Sarah Anderson',   resource: 'AI Agents',           category: 'ai',         time: '8 hours ago', risk: 'low' },
  { id: 'ae-7', action: 'Deployment "Expense Module v2" rolled back',           actor: 'David Brown',      resource: 'Finance',             category: 'deployment', time: '4 days ago',  risk: 'high' },
  { id: 'ae-8', action: 'Branding update published to EU workspace',            actor: 'Rachel Kim',       resource: 'Enterprise EU',       category: 'branding',   time: '5 days ago',  risk: 'low' },
]
```

### 9.14 `dashboardInfoContent` (full text — must be verbatim)

```ts
{
  option1: {
    title: 'Option 1 — Executive Command Center',
    points: [
      'KPI health strip provides instant organizational awareness at the top of every session',
      'Priority alerts surface high-signal operational issues requiring immediate attention',
      'Operational module grid uses governance cards — NOT navigation shortcuts — each surfacing health metrics, trends, and CTAs',
      'Modular card hierarchy enables quick scanning: Security Health → Workspace Ops → Content → AI → Deployments → Integrations',
      'Governance & activity feed maintains operational awareness without leaving the dashboard',
      'Recommendations section provides enterprise-smart guided actions at the bottom',
      'Best for: Executive administrators and governance leads who need periodic operational oversight',
    ],
  },
  option2: {
    title: 'Option 2 — Dense Operations Workbench',
    points: [
      'Section navigation panel enables deep-dive into any operational domain without page navigation',
      'Table and panel-heavy layout maximizes data density per viewport for power users',
      'Overview section consolidates alerts, KPIs, and deployment health into a single operational surface',
      'Each domain section (Security, Workspaces, Content, AI, Deployments, Integrations) provides full operational detail inline',
      'Designed for daily-use admin workflows — minimal clicks, maximum information density',
      'Activity and audit feeds are always one section-click away',
      'Best for: Daily-use admin operations, hands-on infrastructure management, and power-user productivity',
    ],
  },
  option3: {
    title: 'Option 3 — Intelligent Operational Orchestration',
    points: [
      'Contextual intelligence sidebar delivers recommendations, alerts, and AI insights alongside operational content',
      'Insight banners woven between sections guide administrators toward next-best-actions',
      'AI readiness surfaced naturally as part of operational narrative rather than isolated module',
      'Main content flows vertically through all domains; right sidebar adapts contextually',
      'Guided governance approach reduces cognitive load by surfacing what matters most',
      'Recommendations and alerts are persistently visible, not buried in separate sections',
      'Best for: Organizations prioritizing AI governance, continuous optimization, and guided enterprise administration',
    ],
  },
  option4: {
    title: 'Option 4 — Compact Operational Summary',
    points: [
      'Status-page inspired layout: every operational domain visible as a compact horizontal strip, scannable in seconds',
      'Inline expandable panels — click any module strip to reveal full operational detail without leaving the page or opening drawers',
      'Top alert banner consolidates critical items; approval pipeline tracker shows multi-approver workflow progress',
      'Audit trail as a running chronological feed with risk-level indicators and actor attribution',
      'Zero secondary panels or sidebars — the entire operational surface flows as a single vertical page',
      'Maximum scanability: administrators can assess full organizational health in one scroll without clicks',
      'Best for: Compliance-oriented organizations, audit-heavy environments, and admins who need fast full-picture assessments',
    ],
  },
}
```

---

## 10. Option Specs

All options use `useState` for drawer/expand/toggle/tab state. All styles inline. All icons from `@tabler/icons-react`. Every option **must** import the same data from `../../data/mockData`. Every option must include at least 4 working drill-down experiences (drawers for Options 1/2/3, inline expansions for Option 4).

### 10.1 Option 1 — Executive Command Center

**References:** Atlassian Admin, Datadog, Slack Enterprise.

**Layout (top to bottom):**

1. **Organization Health Strip** — 5 KPI cards in a single row. Each card: white bg, icon top-left, value (24 px bold) + label (12 px muted), trend line, status dot (6 px). 16 px gap.
2. **Priority Alerts section** — Collapsible. Header shows total count + "Show all" toggle. Visible-by-default: 3 alerts. Each alert row: severity icon (red/amber/blue), title (14 px 600), description (13 px body), module chip, CTA button (small orange outline), timestamp. CTA opens an alert-specific Drawer with diagnostic table (Module, Severity, Detected, Impact, Status) + action button.
3. **Operational Module Grid (3 × 2)** — 6 module cards: Security Health, Workspace Operations, Content Governance, AI Readiness, Deployment Pipeline, Integration Health.
   - Each card: 16 px padding, white bg, 1 px `#ECECF3` border, 8 px radius. Hover shadow `0 2px 6px rgba(0,0,0,0.10)`.
   - Header: module icon + module title + small status indicator.
   - Body: 3–5 inline metrics in a grid.
   - Footer: full-width CTA button (e.g., "Review Security", "Manage Workspaces", "Open Content Center", "Continue AI Setup", "Open Deployment Center", "Manage Integrations"). Click opens module-specific Drawer.
4. **Governance & Activity Surface (2-column)** — Left: Recent Activity (8 rows, type icon + text + user + time). Right: Pending Approvals (4 items with item / type / requester / time + Approve & Reject buttons with visual approved/rejected state).
5. **Recommendations & Insights** — Horizontal cards. Each: priority pill (critical/high/medium/low color), title, impact description, category chip.

**Drawers (open on CTA click):**
- **Security Drawer** — SSO config table (provider/status/expiry), SCIM provisioning details, MFA enrollment bar, API tokens inventory table, BGU status.
- **Workspace Drawer** — Full workspace table + summary grid.
- **Content Drawer** — Lifecycle tab bar + content items table.
- **AI Drawer** — Setup progress + agent cards with toggles, adoption progress bars, config health bars, 5-star ratings.
- **Deployment Drawer** — Stats cards + full deployments table with failure diagnostics.
- **Integration Drawer** — Integration cards with health bars + sync details.

Lines target: ~1000.

### 10.2 Option 2 — Dense Operations Workbench

**References:** GitHub Enterprise, Jira Admin, Okta, AWS Console.

**Layout:** Two-column inside the option's content area:

- **Left section panel (200 px fixed)** — `#fff` bg, 1 px right border. Section heading "SECTIONS" (10 px uppercase, muted). Then 8 stacked section buttons (icon + label + count/status badge):
  - Overview (count: number of active alerts)
  - Security Health (status indicator "!" if expiring cert)
  - Workspace Ops (count: workspaces)
  - Content Gov. (count: total items)
  - AI Readiness (percentage)
  - Deploy Pipeline (count: weekly)
  - Integrations (count: connected/total)
  - Activity & Audit (count: recent events)
- Active section: left 3 px border accent `#E45913`, `#F6F6F9` bg.
- **Right main panel** — Renders the active section. Top bar: section title (16 px 600) + small subtitle ("Dense Operations Workbench — real-time operational intelligence") + "Updated just now" + Refresh button.

**Section contents:**

1. **Overview** — Compact 5-column KPI grid, then full **Priority Alerts table** (severity / alert / module / time / action columns), then quick stats badge bar (Pending Approvals, Stale Content, Expiring Tokens, Failed Deploys, Active Integrations).
2. **Security Health** — Identity & Access table (rows: SSO row, SCIM row, MFA row, each with status + key metrics + last sync); API Tokens table (5 mock tokens — Name, Status, Expiry, Last Used, actions Rotate/Remove); Break-Glass Users table.
3. **Workspace Ops** — Summary bar (Total Users, Total Workspaces, Environment breakdown), then full workspace table (Name, Users, Health, AI Enabled, Environment, Last Deploy, Stale Items, Pending Invites). Row click opens Workspace Detail Drawer.
4. **Content Gov.** — Summary badges (Global Assets, Workspace Assets, Stale, Approvals, Localization), tab bar (All / Draft / In Review / Approved / Production), then filtered content items table. Row click opens Content Detail Drawer.
5. **AI Readiness** — Readiness summary bar, AI Agents table with:
   - Name + category
   - Status (StatusChip)
   - Adoption progress bar (animated width, 0–100)
   - 5-star rating
   - Workspace coverage (e.g., "12/24")
   - Config health bar
   - Enable/Disable toggle switch (visual + state, no real backend)
6. **Deploy Pipeline** — Stats summary + full deployments table (Name, Workspace, Status [StatusChip], Time, Environment, Duration).
7. **Integrations** — Integration table (Name, Type, Status, Last Sync, Health). Health column is a colored progress bar.
8. **Activity & Audit** — 2-column: Recent Activity feed + Pending Approvals (with Approve/Reject). Below: Recommendations table.

Lines target: ~1250.

### 10.3 Option 3 — Intelligent Operational Orchestration

**References:** Microsoft Copilot Admin, Salesforce Einstein, Linear, Notion AI.

**Layout:** Two-column inside the option's content area:

- **Main content (~72% / flex: 1)** — vertical scroll, paddings 20 × 24:
  1. Compact KPI strip (5 KPIs, single line)
  2. **InsightBanner #1 (critical)** — "SSO certificate expires in 12 days — Renew now to prevent access disruption for 1,847 users" with "Renew Certificate" CTA. Banner styling: left 2 px accent bar, severity icon, message text, CTA on the right. Background: `#FFF0F3`.
  3. Security Health card (compact, key metrics inline)
  4. Workspace Operations card (mini-table of top 4 workspaces)
  5. **InsightBanner #2 (info)** — "Enable Quick Read agent to boost productivity by 34% in Enterprise US" — background `#F0F9FF`.
  6. Content Governance card (lifecycle summary pills, stale count, localization)
  7. AI Readiness card (72% progress + 6-agent grid with status dots, sandbox/ratings/coverage)
  8. **InsightBanner #3 (warning)** — "3 stale deployments in HR Operations — Consider cleanup or rollback" — background `#FEFBEB`.
  9. Deployment Pipeline card (success rate + 3-row mini-table)
  10. Integration Health card (connected count + integration list with health dots)
  11. Governance & Activity side-by-side (Recent Activity feed of 6 items | Pending Approvals)

- **Intelligence Sidebar (300 px sticky, top: 0)** — scrolls independently:
  - **Recommendations** — All 7 items, priority dots, hover highlight, "Take action" reveal on hover
  - **Active Alerts** — Top 3 critical alerts with severity-tinted backgrounds, "View all alerts →" link
  - **AI Insights** — Readiness progress bar (72%), agent summary ("4 of 6 agents active"), "2 agents pending setup" callout, "Deep Think beta available" highlight
  - **Quick Actions** — 5 buttons (Renew SSO Certificate, Rotate API Tokens, Review Stale Content, Enable Quick Read, Continue AI Setup) — each opens a relevant Drawer

**Drawers:** Same 6 module drawers as Option 1 (Security, Workspace, Content, AI, Deployment, Integration).

Lines target: ~980.

### 10.4 Option 4 — Compact Operational Summary

**References:** Statuspage, PagerDuty, Vercel.

**Layout:** Single vertical flow. **NO drawers**. Everything expands inline.

1. **Compact KPI Bar** — All 5 KPIs in a single dense row. Each: status dot (6 px colored) + label (11 px uppercase muted) + value (14 px 600) + trend (11 px muted). Separated by subtle dividers.
2. **Critical Alert Banner** — Thin red-tinted bar (`#FFF0F3` bg, `#B3141D` accent). Shows "2 critical alerts require attention" + count when collapsed. Expand toggle reveals individual alerts inline below with severity dot, title, description, time, action button.
3. **Approval Pipeline Tracker** — 3-column kanban-style. Column headers: "Draft" / "In Review" / "Pending Approval" with counts. Each item card: title, workspace tag, approval progress ("1/2 approved"), assignee names, time. Drives from `approvalPipeline` data.
4. **Operational Module Strips** (6 strips, collapsible). Above strips: "Expand all / Collapse all" toggle button.

   **Strip when collapsed (~44 px tall):**
   ```
   [8 px colored bar] [icon] [Module name] | metric1 | metric2 | metric3 | metric4 [chevron]
   ```
   - Left 8 px colored status bar (green/amber/red)
   - Inline metric separators: 1 px vertical lines OR " · " characters
   - Chevron rotates on expand
   - Hover: `#F6F6F9` bg
   - Click toggles expansion (multiple strips can be open)

   **Strip when expanded:** Detail content below header, indented 28 px from left (under the colored bar), background `#FCFCFD`.

   **Strip contents:**
   - **Security Health** — Collapsed: `SSO: Active ● | Cert: 12 days ⚠ | SCIM: Synced ● | MFA: 94% ● | Tokens: 8/10 | BGU: 3`. Expanded: SSO config detail card, cert expiry detail, SCIM sync history, API token table, BGU list.
   - **Workspace Operations** — Collapsed: `6 workspaces | 4 healthy · 1 warning · 1 degraded | 8 pending invites | 5 stale items`. Expanded: Full workspace table.
   - **Content Governance** — Collapsed: `198 items | 14 draft · 6 review · 8 approved · 170 production | 8 stale | 6 pending approvals`. Expanded: Tab filter bar + content items table.
   - **AI Readiness** — Collapsed: `Score: 72% | 4/6 agents active | Sandbox: Active | Ratings: On | Coverage: 4/6 workspaces`. Expanded: AI agents table with toggles, adoption bars, config health bars.
   - **Deployment Pipeline** — Collapsed: `94.2% success | 17 this week | 1 failed | 1 rolled back | Avg: 2m 34s`. Expanded: Full deployment table.
   - **Integration Health** — Collapsed: `5/6 connected | Okta: 100% | Salesforce: 98% | Zendesk: Down ⚠`. Expanded: Integration detail cards with health bars + sync times.

5. **Compliance Audit Trail** — Header: "Compliance Audit Trail (8 events)" + Export button. Chronological table feed:
   ```
   [timestamp] [risk badge: HIGH/MED/LOW colored] [action description] [actor] [resource] [category chip]
   ```
   Risk badges: HIGH red, MED amber, LOW green. All 8 events visible.
6. **Bottom Bar (2-column)** — Left: Pending Actions (priority-sorted approvals + recommendations merged into a single action list with priority chips). Right: Recent Activity feed (6 most recent).

State management: `expandedStrips: Set<string>`, `alertsExpanded: boolean`, `contentTab: string`, `aiToggles: Record<string, boolean>`.

Lines target: ~850.

---

## 11. Build Plan (Execute in This Order)

1. Initialize Vite + React + TypeScript project. Install all dependencies from §2.
2. Set up `index.html` (title = "Whatfix Admin Dashboard"), Tailwind v4 via `@tailwindcss/postcss`, Inter font via Google Fonts in `globals.css`.
3. Write `src/main.tsx` and `src/App.tsx` per §5.
4. Write `src/data/mockData.ts` per §9 (all 14 exports including `dashboardInfoContent`).
5. Write `src/components/admin/StatusChip.tsx`, `Drawer.tsx`, `InfoModal.tsx` per §7.
6. Write `src/components/admin/Shell.tsx` per §6.
7. Write `src/pages/AdminDashboard.tsx` per §8.
8. Write `src/pages/dashboards/Option1.tsx` per §10.1.
9. Write `src/pages/dashboards/Option2.tsx` per §10.2.
10. Write `src/pages/dashboards/Option3.tsx` per §10.3.
11. Write `src/pages/dashboards/Option4.tsx` per §10.4.
12. Verify: `npx tsc --noEmit` (must be 0 errors), then `npm run dev`, open in browser, click through all 4 options + Design Info modal + at least one drawer/inline expansion per option.

---

## 12. Verification Checklist

The prototype is complete only when ALL of the following are TRUE:

**Shell:**
- [ ] Sidebar starts at 248 px, collapses to 64 px via the seam chevron button
- [ ] All 7 top-level nav sections appear with correct icons
- [ ] Each expandable section reveals its children with chevron rotation
- [ ] Global header shows workspace switcher with dropdown, "Production" env indicator, search input, orange Create button with 6-item dropdown, notification bell with red dot, settings, avatar
- [ ] Switcher bar shows "Dashboard" + 4-tab segmented control + "Design Info" button

**Routing & loading:**
- [ ] Single route `/` renders the dashboard; any other path redirects to `/`
- [ ] Each option lazy-loads via `React.lazy` with a skeleton fallback
- [ ] Switching between options is instant

**Option 1:**
- [ ] 5 KPI cards in a single row
- [ ] Collapsible Priority Alerts section (3 visible by default, "Show all" expands)
- [ ] 3 × 2 module grid with 6 modules
- [ ] Each module CTA opens a distinct drawer with realistic content
- [ ] Bottom: Recent Activity + Pending Approvals side by side
- [ ] Bottom: Recommendations as horizontal cards

**Option 2:**
- [ ] Left section panel (200 px) with 8 sections and active state styling
- [ ] Each section renders its own table-heavy content in the right panel
- [ ] Content section tab filtering works (All / Draft / In Review / Approved / Production)
- [ ] AI agent toggles flip visual state on click
- [ ] Workspace and Content rows are clickable and open drawers

**Option 3:**
- [ ] Two-column layout: main + sticky 300 px sidebar
- [ ] Sidebar scrolls independently of main content
- [ ] At least 3 InsightBanner components are woven between main sections
- [ ] Recommendations, Active Alerts, AI Insights, Quick Actions all visible in sidebar
- [ ] Quick Actions buttons open relevant drawers

**Option 4:**
- [ ] Compact single-row KPI bar
- [ ] Critical Alert Banner expands inline (no drawer)
- [ ] Approval Pipeline Tracker shows 3 columns with item cards
- [ ] All 6 module strips collapse/expand inline with chevron rotation
- [ ] "Expand all / Collapse all" toggle works
- [ ] Compliance Audit Trail shows all 8 events with HIGH/MED/LOW risk badges
- [ ] Bottom 2-column: Pending Actions + Recent Activity

**Design Info:**
- [ ] Design Info button opens a center modal
- [ ] Modal title reflects the active option ("Option 1 — Executive Command Center" etc.)
- [ ] Modal lists 7 numbered design rationale points (verbatim from §9.14)
- [ ] Modal closes on close button click or backdrop click

**Quality gates:**
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] No console errors in the browser
- [ ] All icons render (no missing `IconBrandOkta`-style errors)
- [ ] Hover states present on every interactive element
- [ ] All colors match the hex tokens in §3 exactly

---

## 13. Common Pitfalls to Avoid

1. **Don't import non-existent icons.** `@tabler/icons-react` does not have `IconBrandOkta`. If you need an Okta-like icon use `IconKey`, `IconShield`, or `IconBrand`-prefixed icons you've verified exist. When in doubt, run a grep for the icon name inside `node_modules/@tabler/icons-react/dist` before using it.
2. **Don't use Tailwind classes inside option components.** Every style must be inline `style={{}}` to keep the design language strictly controlled.
3. **Don't add gradients, glassmorphism, or oversized shadows.** Only the shadow tokens in §3 are allowed.
4. **Don't make cards into navigation shortcuts.** Cards = operational intelligence. Sidebar = destinations.
5. **Don't change module functionality between options.** Same data, same depth — only layout differs.
6. **Don't rename options in the switcher.** The UI must show literal "Option 1", "Option 2", "Option 3", "Option 4".
7. **Don't skip the Design Info modal.** Each option must have its 7-point rationale.
8. **Don't forget lazy-loading.** All 4 options must be code-split via `React.lazy`.
9. **Don't leave any option < 800 lines.** That signals missing detail/drill-down.
10. **Don't put a drawer in Option 4.** Option 4 is inline-only — that is its differentiator.

---

## 14. Dev Workflow Commands

```bash
# install
npm install

# run
npm run dev                # serves on first free port in 5173–5180

# type check
npx tsc --noEmit

# lint
npm run lint

# production build (also type-checks)
npm run build
```

---

## 15. Deliverable Definition

When complete, the project should:
- Run locally with `npm run dev`
- Show a single page with shared shell + dashboard switcher
- Allow instant switching across Option 1 / 2 / 3 / 4
- Each option is visibly, structurally distinct (different layout/density/orchestration)
- Each option contains the SAME functional coverage (all 6 modules + alerts + activity + recommendations)
- Each option has working drill-downs (drawers for 1/2/3, inline for 4)
- Design Info modal works per option
- 0 TypeScript errors
- 0 console errors
- Feels like *Whatfix Admin Platform 2.0 — Enterprise Governance & Operations Center*

**Hand this document to your AI agent. It contains everything needed to reproduce the exploration without further clarification.**
