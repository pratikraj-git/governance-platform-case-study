import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  IconHome, IconFileText, IconComponents, IconWorld, IconRocket, IconTemplate,
  IconUsers, IconShieldLock, IconReport, IconKey, IconLink, IconTicket,
  IconPalette, IconLanguage, IconTag, IconSparkles, IconFlask, IconChartBar,
  IconChevronDown, IconChevronRight, IconSearch, IconPlus, IconBell, IconSettings,
  IconUserCircle, IconCircleFilled, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand,
} from '@tabler/icons-react';

type NavChild = { id: string; label: string; icon: typeof IconHome };
type NavSection = { id: string; label: string; icon: typeof IconHome; children?: NavChild[] };

const NAV: NavSection[] = [
  { id: 'home', label: 'Home', icon: IconHome },
  {
    id: 'content-system', label: 'Content System', icon: IconFileText,
    children: [
      { id: 'content-library', label: 'Content Library', icon: IconFileText },
      { id: 'widget-library',  label: 'Widget Library',  icon: IconComponents },
      { id: 'global-assets',   label: 'Global Assets',   icon: IconWorld },
      { id: 'deployments',     label: 'Deployments',     icon: IconRocket },
      { id: 'templates',       label: 'Templates',       icon: IconTemplate },
    ],
  },
  {
    id: 'users-workspaces', label: 'Users & Workspaces', icon: IconUsers,
    children: [
      { id: 'workspaces',       label: 'Workspaces',       icon: IconUsers },
      { id: 'roles-permissions',label: 'Roles & Permissions', icon: IconShieldLock },
      { id: 'audit-logs',       label: 'Audit Logs',       icon: IconReport },
    ],
  },
  {
    id: 'setup-security', label: 'Setup & Security', icon: IconShieldLock,
    children: [
      { id: 'sso',          label: 'SSO',          icon: IconKey },
      { id: 'scim',         label: 'SCIM',         icon: IconUsers },
      { id: 'integrations', label: 'Integrations', icon: IconLink },
      { id: 'api-tokens',   label: 'API Tokens',   icon: IconTicket },
    ],
  },
  {
    id: 'branding', label: 'Branding & Experience', icon: IconPalette,
    children: [
      { id: 'themes',       label: 'Themes',       icon: IconPalette },
      { id: 'localization', label: 'Localization', icon: IconLanguage },
      { id: 'tags',         label: 'Tags',         icon: IconTag },
    ],
  },
  {
    id: 'ai-automation', label: 'AI & Automation', icon: IconSparkles,
    children: [
      { id: 'ai-agents', label: 'AI Agents', icon: IconSparkles },
      { id: 'sandbox',   label: 'Sandbox',   icon: IconFlask },
      { id: 'analytics', label: 'Analytics', icon: IconChartBar },
    ],
  },
  { id: 'reports', label: 'Reports', icon: IconReport },
];

const WORKSPACES = ['Acme Corp', 'Acme Corp EU', 'Acme Corp Dev'];

const CREATE_ITEMS = [
  { id: 'global-flow',    label: 'Global Flow',    sub: 'Cross-workspace flow' },
  { id: 'workspace-flow', label: 'Workspace Flow', sub: 'Scoped to workspace' },
  { id: 'global-widget',  label: 'Global Widget',  sub: 'Cross-workspace widget' },
  { id: 'workspace-widget', label: 'Workspace Widget', sub: 'Scoped to workspace' },
  { id: 'template',       label: 'Template',       sub: 'Reusable template' },
  { id: 'ai-agent',       label: 'AI Agent',       sub: 'Configure AI agent' },
];

export interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['setup-security']));
  const [active, setActive] = useState('home');
  const [workspace, setWorkspace] = useState(WORKSPACES[0]);
  const [wsOpen, setWsOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const wsRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wsRef.current && !wsRef.current.contains(e.target as Node)) setWsOpen(false);
      if (createRef.current && !createRef.current.contains(e.target as Node)) setCreateOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const sidebarWidth = collapsed ? 64 : 248;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FCFCFD' }}>
      <aside
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          backgroundColor: '#252539',
          color: '#FFFFFF',
          position: 'relative',
          transition: 'width 180ms ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            position: 'absolute',
            top: 24,
            right: -14,
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: '#2B2B40',
            border: '1px solid #3D3D52',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {collapsed ? <IconLayoutSidebarLeftExpand size={14} /> : <IconLayoutSidebarLeftCollapse size={14} />}
        </button>

        <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#E45913" />
            <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="#FF7A3D" />
          </svg>
          {!collapsed && (
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.2 }}>Whatfix</span>
          )}
        </div>
        <div style={{ borderTop: '1px solid #3D3D52', margin: '0 12px' }} />

        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 16px' }}>
          {NAV.map((section) => {
            const Icon = section.icon;
            const childIds = new Set(section.children?.map((c) => c.id) ?? []);
            const isActive = active === section.id || childIds.has(active);
            const isOpen = expanded.has(section.id);
            return (
              <div key={section.id} style={{ marginBottom: 2 }}>
                <button
                  type="button"
                  onClick={() => {
                    if (section.children) {
                      setExpanded((prev) => {
                        const next = new Set(prev);
                        if (next.has(section.id)) next.delete(section.id);
                        else next.add(section.id);
                        return next;
                      });
                    } else {
                      setActive(section.id);
                    }
                  }}
                  style={{
                    width: '100%',
                    height: 38,
                    padding: '0 10px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#FFFFFF',
                    backgroundColor: isActive ? '#3D3D52' : 'transparent',
                    border: isActive ? '1px solid #3D3D52' : '1px solid transparent',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#2F2F45';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon size={18} color={isActive ? '#E45913' : '#A8A8BF'} />
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1, textAlign: 'left' }}>{section.label}</span>
                      {section.children && (
                        <IconChevronDown
                          size={14}
                          color="#A8A8BF"
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 160ms ease',
                          }}
                        />
                      )}
                    </>
                  )}
                </button>

                {!collapsed && section.children && isOpen && (
                  <div style={{ marginTop: 2, paddingLeft: 30 }}>
                    {section.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = active === child.id;
                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => setActive(child.id)}
                          style={{
                            width: '100%',
                            height: 32,
                            padding: '0 10px',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            color: childActive ? '#FFFFFF' : '#A8A8BF',
                            backgroundColor: childActive ? '#3D3D52' : 'transparent',
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => {
                            if (!childActive) e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            if (!childActive) e.currentTarget.style.color = '#A8A8BF';
                          }}
                        >
                          <ChildIcon size={14} color={childActive ? '#E45913' : '#A8A8BF'} />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #3D3D52', margin: '0 12px' }} />
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E45913',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E45913',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            SA
          </div>
          {!collapsed && (
            <span style={{ fontSize: 13, fontWeight: 500 }}>Sarah Anderson</span>
          )}
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header
          style={{
            height: 52,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #ECECF3',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: 12,
          }}
        >
          <div ref={wsRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setWsOpen((o) => !o)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 10px',
                backgroundColor: '#F6F6F9',
                border: '1px solid #ECECF3',
                borderRadius: 6,
                color: '#1F1F32',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  backgroundColor: '#E45913',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {workspace.charAt(0)}
              </span>
              {workspace}
              <IconChevronDown size={14} color="#6B697B" />
            </button>
            {wsOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  minWidth: 200,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ECECF3',
                  borderRadius: 8,
                  boxShadow: '0 6px 20px rgba(31,31,50,0.10)',
                  padding: 4,
                  zIndex: 50,
                }}
              >
                {WORKSPACES.map((ws) => (
                  <button
                    key={ws}
                    type="button"
                    onClick={() => {
                      setWorkspace(ws);
                      setWsOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: 6,
                      fontSize: 13,
                      color: '#1F1F32',
                      backgroundColor: ws === workspace ? '#F6F6F9' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (ws !== workspace) e.currentTarget.style.backgroundColor = '#F6F6F9';
                    }}
                    onMouseLeave={(e) => {
                      if (ws !== workspace) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {ws}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '3px 8px',
              backgroundColor: '#F1FEF9',
              borderRadius: 4,
              color: '#198558',
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            <IconCircleFilled size={6} />
            Production
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              backgroundColor: '#F6F6F9',
              border: '1px solid #ECECF3',
              borderRadius: 6,
              minWidth: 220,
              color: '#6B697B',
            }}
          >
            <IconSearch size={15} />
            <input
              placeholder="Search..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#1F1F32',
                fontSize: 13,
              }}
            />
          </div>

          <div ref={createRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setCreateOpen((o) => !o)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                backgroundColor: '#C74900',
                color: '#FFFFFF',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <IconPlus size={14} />
              Create
              <IconChevronDown size={14} />
            </button>
            {createOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: 240,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ECECF3',
                  borderRadius: 8,
                  boxShadow: '0 6px 20px rgba(31,31,50,0.10)',
                  padding: 4,
                  zIndex: 50,
                }}
              >
                {CREATE_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCreateOpen(false)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderRadius: 6,
                      fontSize: 13,
                      color: '#1F1F32',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F6F6F9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#6B697B', marginTop: 2 }}>{item.sub}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Notifications"
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3D3C52',
              position: 'relative',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F6F6F9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <IconBell size={18} />
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 7,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#B3141D',
                border: '1.5px solid #FFFFFF',
              }}
            />
          </button>

          <button
            type="button"
            aria-label="Settings"
            style={{
              width: 34,
              height: 34,
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3D3C52',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F6F6F9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <IconSettings size={18} />
          </button>

          <button
            type="button"
            aria-label="Account"
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3D3C52',
            }}
          >
            <IconUserCircle size={26} />
          </button>
        </header>

        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export { IconChevronRight };
