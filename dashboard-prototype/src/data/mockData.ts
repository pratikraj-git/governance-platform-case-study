// Enterprise mock data — single source of truth for all 4 dashboard options.
// Every option imports from this file. Do not duplicate or fork.

export type KpiStatus = 'good' | 'warning' | 'critical';

export const orgHealth = [
  { id: 'users',        label: 'Active Users',       value: '1,847', trend: '+156 this month',                       status: 'good'    as KpiStatus },
  { id: 'workspaces',   label: 'Workspaces',         value: '6',     trend: '4 healthy · 1 warning · 1 degraded',    status: 'warning' as KpiStatus },
  { id: 'deployments',  label: 'Deploy Success',     value: '94.2%', trend: '1 failed · 1 rolled back',              status: 'warning' as KpiStatus },
  { id: 'ai',           label: 'AI Readiness',       value: '72%',   trend: '4 of 6 agents active',                  status: 'good'    as KpiStatus },
  { id: 'integrations', label: 'Integration Health', value: '83%',   trend: '5 connected · 1 down',                  status: 'warning' as KpiStatus },
];

export type AlertSeverity = 'critical' | 'warning' | 'info';

export const priorityAlerts = [
  {
    id: 'al-1', severity: 'critical' as AlertSeverity,
    title: 'SSO certificate expires in 12 days',
    description: 'Okta SAML certificate for production SSO will expire on May 26. Users may lose access if not renewed.',
    module: 'Security', cta: 'Renew Certificate', time: '2 hours ago',
  },
  {
    id: 'al-2', severity: 'critical' as AlertSeverity,
    title: 'Deployment failed: Holiday Notice',
    description: 'Push to All Workspaces failed due to content validation error. 1,847 users affected.',
    module: 'Deployment', cta: 'View Diagnostics', time: '1 day ago',
  },
  {
    id: 'al-3', severity: 'warning' as AlertSeverity,
    title: '2 API tokens expiring in 14 days',
    description: 'Analytics Integration and Webhook Relay tokens expire soon. Rotate to maintain service continuity.',
    module: 'Security', cta: 'Rotate Tokens', time: '3 days ago',
  },
  {
    id: 'al-4', severity: 'warning' as AlertSeverity,
    title: 'HR Operations workspace degraded',
    description: 'No deployment in 2 weeks. 3 stale draft items. SCIM sync delayed by 4 hours.',
    module: 'Workspace', cta: 'Review Workspace', time: '5 days ago',
  },
  {
    id: 'al-5', severity: 'info' as AlertSeverity,
    title: 'Deep Think agent available for beta',
    description: 'New AI agent ready for sandbox testing. Enable to evaluate intelligence capabilities.',
    module: 'AI', cta: 'Start Beta Setup', time: '1 week ago',
  },
];

export const securityHealth = {
  ssoCoverage: '100%',
  ssoProvider: 'Okta SAML 2.0',
  ssoStatus: 'active' as const,
  certExpiry: '12 days',
  certStatus: 'critical' as const,
  scimStatus: 'active' as const,
  scimLastSync: '12 min ago',
  scimUsersProvisioned: 1847,
  scimGroupsSynced: 24,
  scimFailures: 0,
  mfaEnrollment: '94%',
  mfaStatus: 'good' as const,
  apiTokens: { active: 8, expiring: 2, total: 10 },
  breakGlassUsers: { configured: 3, lastUsed: 'Never' },
  auditEvents: 342,
  lastAuditReview: '3 days ago',
};

export type WorkspaceStatus = 'healthy' | 'warning' | 'degraded';
export type Environment = 'production' | 'staging' | 'draft';

export const workspaceOps = [
  { id: 'ws-1', name: 'Enterprise US', users: 842, status: 'healthy'  as WorkspaceStatus, aiEnabled: true,  env: 'production' as Environment, lastDeploy: '2 hours ago',  staleItems: 0, pendingInvites: 5 },
  { id: 'ws-2', name: 'Enterprise EU', users: 634, status: 'healthy'  as WorkspaceStatus, aiEnabled: true,  env: 'production' as Environment, lastDeploy: '5 hours ago',  staleItems: 1, pendingInvites: 2 },
  { id: 'ws-3', name: 'Sales Team',    users: 156, status: 'warning'  as WorkspaceStatus, aiEnabled: true,  env: 'staging'    as Environment, lastDeploy: '1 day ago',    staleItems: 3, pendingInvites: 0 },
  { id: 'ws-4', name: 'Analytics',     users:  89, status: 'healthy'  as WorkspaceStatus, aiEnabled: true,  env: 'production' as Environment, lastDeploy: '3 days ago',   staleItems: 0, pendingInvites: 1 },
  { id: 'ws-5', name: 'Finance',       users:  67, status: 'healthy'  as WorkspaceStatus, aiEnabled: false, env: 'production' as Environment, lastDeploy: '1 week ago',   staleItems: 2, pendingInvites: 0 },
  { id: 'ws-6', name: 'HR Operations', users:  45, status: 'degraded' as WorkspaceStatus, aiEnabled: false, env: 'staging'    as Environment, lastDeploy: '2 weeks ago',  staleItems: 3, pendingInvites: 0 },
];

export const contentGovernance = {
  globalAssets: 12,
  workspaceAssets: 186,
  totalItems: 198,
  staleContent: 8,
  pendingApprovals: 6,
  activeDeployments: 2,
  failedDeployments: 1,
  localizationCoverage: '4 locales · 82% translated',
  lifecycleSummary: { draft: 14, review: 6, approved: 8, production: 170 },
};

export type ContentStatus = 'draft' | 'review' | 'approved' | 'production';

export const contentItems = [
  { id: 'c-1', name: 'Onboarding Flow v3.2',       type: 'Flow',      scope: 'Global',    status: 'review'     as ContentStatus, author: 'Sarah Chen',   modified: '2 hours ago', workspace: 'Enterprise US' },
  { id: 'c-2', name: 'Feature Announcement — Q2',  type: 'Pop-up',    scope: 'Workspace', status: 'draft'      as ContentStatus, author: 'Mark Johnson', modified: '4 hours ago', workspace: 'Enterprise EU' },
  { id: 'c-3', name: 'Password Reset Guide',       type: 'Flow',      scope: 'Global',    status: 'approved'   as ContentStatus, author: 'Emily Davis',  modified: '1 day ago',   workspace: 'All' },
  { id: 'c-4', name: 'CRM Dashboard Tutorial',     type: 'Flow',      scope: 'Workspace', status: 'production' as ContentStatus, author: 'Alex Rivera',  modified: '2 days ago',  workspace: 'Sales Team' },
  { id: 'c-5', name: 'Holiday Shutdown Notice',    type: 'Pop-up',    scope: 'Global',    status: 'draft'      as ContentStatus, author: 'Lisa Park',    modified: '3 days ago',  workspace: 'All' },
  { id: 'c-6', name: 'New Report Builder Guide',   type: 'Smart Tip', scope: 'Workspace', status: 'review'     as ContentStatus, author: 'James Wilson', modified: '4 days ago',  workspace: 'Analytics' },
];

export const aiReadiness = {
  overallScore: 72,
  setupCompletion: { done: 8, total: 12 },
  sandboxStatus: 'active' as const,
  ratingsEnabled: true,
  workspaceCoverage: '4 of 6 workspaces',
};

export type AgentStatus = 'active' | 'rolling-out' | 'disabled' | 'beta';

export const aiAgents = [
  { id: 'flow',       name: 'Flow',       enabled: true,  adoption: 87, rating: 4.6, workspaces: '22/24', status: 'active'      as AgentStatus, category: 'Guidance',      configHealth: 95 },
  { id: 'popup',      name: 'Pop-up',     enabled: true,  adoption: 73, rating: 4.2, workspaces: '18/24', status: 'active'      as AgentStatus, category: 'Communication', configHealth: 88 },
  { id: 'seek',       name: 'Seek',       enabled: true,  adoption: 65, rating: 4.4, workspaces: '15/24', status: 'active'      as AgentStatus, category: 'Discovery',     configHealth: 92 },
  { id: 'quick-read', name: 'Quick Read', enabled: false, adoption:  0, rating: 0,   workspaces: '0/24',  status: 'disabled'    as AgentStatus, category: 'Productivity',  configHealth:  0 },
  { id: 'ask-ai',     name: 'Ask AI',     enabled: true,  adoption: 52, rating: 4.1, workspaces: '12/24', status: 'rolling-out' as AgentStatus, category: 'Support',       configHealth: 78 },
  { id: 'deep-think', name: 'Deep Think', enabled: false, adoption:  0, rating: 0,   workspaces: '0/24',  status: 'beta'        as AgentStatus, category: 'Intelligence',  configHealth:  0 },
];

export const deploymentPipeline = {
  successRate: '94.2%',
  totalThisWeek: 17,
  failed: 1,
  rolledBack: 1,
  avgDuration: '2m 34s',
  environments: { production: 4, staging: 2, draft: 2 },
};

export type DeploymentStatus = 'success' | 'failed' | 'rolled-back';

export const recentDeployments = [
  { id: 'd-1', name: 'Onboarding Flow v3.1', workspace: 'Enterprise US',  status: 'success'     as DeploymentStatus, time: '2 hours ago', env: 'production' as Environment, duration: '1m 45s' },
  { id: 'd-2', name: 'CRM Tutorial Update',  workspace: 'Sales Team',     status: 'success'     as DeploymentStatus, time: '5 hours ago', env: 'staging'    as Environment, duration: '2m 12s' },
  { id: 'd-3', name: 'Holiday Notice',       workspace: 'All Workspaces', status: 'failed'      as DeploymentStatus, time: '1 day ago',   env: 'production' as Environment, duration: '0m 34s' },
  { id: 'd-4', name: 'Report Builder Guide', workspace: 'Analytics',      status: 'success'     as DeploymentStatus, time: '2 days ago',  env: 'production' as Environment, duration: '3m 08s' },
  { id: 'd-5', name: 'Expense Module v2',    workspace: 'Finance',        status: 'rolled-back' as DeploymentStatus, time: '4 days ago',  env: 'production' as Environment, duration: '1m 22s' },
];

export type IntegrationStatus = 'connected' | 'down' | 'degraded';

export const integrationHealth = [
  { id: 'int-1', name: 'Okta',       type: 'Identity',      status: 'connected' as IntegrationStatus, lastSync: '12 min ago', health: 100 },
  { id: 'int-2', name: 'Salesforce', type: 'CRM',           status: 'connected' as IntegrationStatus, lastSync: '30 min ago', health:  98 },
  { id: 'int-3', name: 'Slack',      type: 'Communication', status: 'connected' as IntegrationStatus, lastSync: '1 hour ago', health: 100 },
  { id: 'int-4', name: 'Jira',       type: 'Project Mgmt',  status: 'connected' as IntegrationStatus, lastSync: '2 hours ago', health: 95 },
  { id: 'int-5', name: 'Zendesk',    type: 'Support',       status: 'down'      as IntegrationStatus, lastSync: '3 days ago',  health:  0 },
  { id: 'int-6', name: 'Confluence', type: 'Knowledge',     status: 'connected' as IntegrationStatus, lastSync: '5 hours ago', health: 92 },
];

export type ActivityType = 'ai' | 'security' | 'user' | 'deployment' | 'branding';

export const recentActivity = [
  { id: 'a-1', action: 'Enabled AI Agent "Deep Think"',                 user: 'Sarah Anderson', time: '12 min ago', type: 'ai'         as ActivityType },
  { id: 'a-2', action: 'Updated SSO certificate configuration',          user: 'Mark Johnson',   time: '1 hour ago', type: 'security'   as ActivityType },
  { id: 'a-3', action: 'Provisioned 15 users via SCIM',                  user: 'System',         time: '2 hours ago', type: 'user'      as ActivityType },
  { id: 'a-4', action: 'Approved deployment: Onboarding Flow v3.1',      user: 'Emily Davis',    time: '3 hours ago', type: 'deployment' as ActivityType },
  { id: 'a-5', action: 'Regenerated API token: Analytics',               user: 'Alex Rivera',    time: '5 hours ago', type: 'security'   as ActivityType },
  { id: 'a-6', action: 'Modified role: Content Editor → Reviewer',       user: 'Lisa Park',      time: '6 hours ago', type: 'user'       as ActivityType },
  { id: 'a-7', action: 'Published branding update to EU workspace',      user: 'Rachel Kim',     time: '1 day ago',   type: 'branding'   as ActivityType },
  { id: 'a-8', action: 'Rolled back deployment: Expense Module v2',      user: 'David Brown',    time: '4 days ago',  type: 'deployment' as ActivityType },
];

export const pendingApprovals = [
  { id: 'pa-1', item: 'Onboarding Flow v3.2',     type: 'Content', requestedBy: 'Sarah Chen',    time: '2 hours ago' },
  { id: 'pa-2', item: 'Security Policy Update',   type: 'Content', requestedBy: 'Rachel Kim',    time: '5 hours ago' },
  { id: 'pa-3', item: 'New Report Builder Guide', type: 'Content', requestedBy: 'James Wilson',  time: '4 days ago' },
  { id: 'pa-4', item: 'Role: Analytics Admin',    type: 'Role',    requestedBy: 'Alex Rivera',   time: '1 week ago' },
];

export type Priority = 'critical' | 'high' | 'medium' | 'low';

export const recommendations = [
  { id: 'rec-1', title: 'Complete SSO certificate renewal',         impact: 'Prevents access disruption for 1,847 users',         priority: 'critical' as Priority, category: 'Security'  },
  { id: 'rec-2', title: 'Enable Quick Read agent',                  impact: '+34% productivity in Enterprise US workspace',       priority: 'high'     as Priority, category: 'AI'        },
  { id: 'rec-3', title: 'Rotate expiring API tokens',               impact: 'Maintains Analytics and Webhook integrations',       priority: 'high'     as Priority, category: 'Security'  },
  { id: 'rec-4', title: 'Publish 8 stale draft items',              impact: 'Reduces content debt across 3 workspaces',           priority: 'medium'   as Priority, category: 'Content'   },
  { id: 'rec-5', title: 'Review HR Operations workspace health',    impact: 'Resolves degraded state affecting 45 users',         priority: 'medium'   as Priority, category: 'Workspace' },
  { id: 'rec-6', title: 'Configure SCIM group mapping for Finance', impact: 'Enables automatic provisioning for 67 users',        priority: 'low'      as Priority, category: 'Setup'     },
  { id: 'rec-7', title: 'Schedule Deep Think beta rollout',         impact: 'Unlocks new intelligence capabilities',              priority: 'low'      as Priority, category: 'AI'        },
];

export type ApprovalStage = 'draft' | 'review' | 'approval';

export const approvalPipeline = [
  { id: 'ap-1', item: 'Onboarding Flow v3.2',     stage: 'review'   as ApprovalStage, assignees: ['Sarah Chen', 'Mark Johnson'],                approved: 1, total: 2, requestedBy: 'Emily Davis',    time: '2 hours ago', workspace: 'Enterprise US' },
  { id: 'ap-2', item: 'Security Policy Update',   stage: 'review'   as ApprovalStage, assignees: ['Rachel Kim'],                                approved: 0, total: 1, requestedBy: 'Alex Rivera',    time: '5 hours ago', workspace: 'Enterprise EU' },
  { id: 'ap-3', item: 'New Report Builder Guide', stage: 'approval' as ApprovalStage, assignees: ['James Wilson', 'Lisa Park', 'David Brown'],  approved: 2, total: 3, requestedBy: 'Sarah Anderson', time: '1 day ago',   workspace: 'Analytics' },
  { id: 'ap-4', item: 'CRM Quick Tips v2',        stage: 'approval' as ApprovalStage, assignees: ['Emily Davis'],                               approved: 0, total: 1, requestedBy: 'Mark Johnson',   time: '2 days ago',  workspace: 'Sales Team' },
  { id: 'ap-5', item: 'Q2 Feature Announcement',  stage: 'draft'    as ApprovalStage, assignees: [],                                            approved: 0, total: 0, requestedBy: 'Lisa Park',      time: '3 days ago',  workspace: 'All' },
];

export type RiskLevel = 'high' | 'medium' | 'low';
export type AuditCategory = 'security' | 'content' | 'identity' | 'access' | 'ai' | 'deployment' | 'branding';

export const auditEvents = [
  { id: 'ae-1', action: 'SSO certificate configuration updated',                  actor: 'Mark Johnson',   resource: 'Okta SAML',           category: 'security'   as AuditCategory, time: '1 hour ago',  risk: 'high'   as RiskLevel },
  { id: 'ae-2', action: 'Content "Onboarding Flow v3.1" published to production', actor: 'Emily Davis',    resource: 'Enterprise US',       category: 'content'    as AuditCategory, time: '2 hours ago', risk: 'medium' as RiskLevel },
  { id: 'ae-3', action: 'SCIM provisioned 15 users',                              actor: 'System (Okta)',  resource: 'All Workspaces',      category: 'identity'   as AuditCategory, time: '2 hours ago', risk: 'low'    as RiskLevel },
  { id: 'ae-4', action: 'API token "Analytics Integration" regenerated',          actor: 'Alex Rivera',    resource: 'API Tokens',          category: 'security'   as AuditCategory, time: '5 hours ago', risk: 'medium' as RiskLevel },
  { id: 'ae-5', action: 'Role "Content Editor" permissions modified',             actor: 'Lisa Park',      resource: 'Roles & Permissions', category: 'access'     as AuditCategory, time: '6 hours ago', risk: 'high'   as RiskLevel },
  { id: 'ae-6', action: 'AI Agent "Ask AI" enabled for Sales Team workspace',     actor: 'Sarah Anderson', resource: 'AI Agents',           category: 'ai'         as AuditCategory, time: '8 hours ago', risk: 'low'    as RiskLevel },
  { id: 'ae-7', action: 'Deployment "Expense Module v2" rolled back',             actor: 'David Brown',    resource: 'Finance',             category: 'deployment' as AuditCategory, time: '4 days ago',  risk: 'high'   as RiskLevel },
  { id: 'ae-8', action: 'Branding update published to EU workspace',              actor: 'Rachel Kim',     resource: 'Enterprise EU',       category: 'branding'   as AuditCategory, time: '5 days ago',  risk: 'low'    as RiskLevel },
];

export type DashboardOption = 'option1' | 'option2' | 'option3' | 'option4';

export const dashboardInfoContent: Record<DashboardOption, { title: string; points: string[] }> = {
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
};
