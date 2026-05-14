import { orgHealth, recommendations, priorityAlerts, aiReadiness } from '../../data/mockData';
import { StatusChip } from '../../components/admin/StatusChip';

// PLACEHOLDER — to be built out to ~980 lines per docs/RECREATION_PROMPT.md §10.3.
// Shows the two-column shape (main flow + sticky intelligence sidebar) and
// one InsightBanner so the orchestration intent is visible.

export function Option3() {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '20px 24px' }}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#FFF4ED',
            border: '1px solid #FFD9C2',
            borderLeft: '3px solid #E45913',
            borderRadius: 6,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>
            Option 3 — Intelligent Operational Orchestration
          </div>
          <div style={{ fontSize: 13, color: '#6B697B', marginTop: 2 }}>
            Placeholder preview. Full build per docs/RECREATION_PROMPT.md §10.3 is pending.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {orgHealth.map((kpi) => (
            <div
              key={kpi.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECECF3',
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ fontSize: 12, color: '#6B697B' }}>{kpi.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1F1F32', marginTop: 2 }}>{kpi.value}</div>
            </div>
          ))}
        </div>

        <InsightBanner
          severity="critical"
          message="SSO certificate expires in 12 days — Renew now to prevent access disruption for 1,847 users"
          cta="Renew Certificate"
        />

        <ModuleCardStub title="Security Health" />
        <ModuleCardStub title="Workspace Operations" />

        <InsightBanner
          severity="info"
          message="Enable Quick Read agent to boost productivity by 34% in Enterprise US"
          cta="Enable"
        />

        <ModuleCardStub title="Content Governance" />
        <ModuleCardStub title="AI Readiness" />
      </div>

      <aside
        style={{
          width: 300,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          alignSelf: 'flex-start',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <SidebarCard title="Recommendations">
          {recommendations.slice(0, 4).map((r) => (
            <div key={r.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 0' }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  marginTop: 7,
                  flexShrink: 0,
                  backgroundColor:
                    r.priority === 'critical'
                      ? '#B3141D'
                      : r.priority === 'high'
                      ? '#AD7900'
                      : r.priority === 'medium'
                      ? '#0975D7'
                      : '#6B697B',
                }}
              />
              <div style={{ fontSize: 13, color: '#1F1F32', lineHeight: 1.4 }}>{r.title}</div>
            </div>
          ))}
        </SidebarCard>

        <SidebarCard title="Active Alerts">
          {priorityAlerts.slice(0, 3).map((a) => (
            <div key={a.id} style={{ padding: '6px 0' }}>
              <StatusChip status={a.severity === 'info' ? 'review' : a.severity} label={a.severity.toUpperCase()} />
              <div style={{ marginTop: 4, fontSize: 13, color: '#1F1F32' }}>{a.title}</div>
            </div>
          ))}
        </SidebarCard>

        <SidebarCard title="AI Insights">
          <div style={{ fontSize: 13, color: '#3D3C52' }}>
            Readiness: <strong>{aiReadiness.overallScore}%</strong> · {aiReadiness.workspaceCoverage}
          </div>
        </SidebarCard>
      </aside>
    </div>
  );
}

function InsightBanner({
  severity,
  message,
  cta,
}: {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  cta: string;
}) {
  const palette = {
    critical: { bg: '#FFF0F3', accent: '#B3141D' },
    warning:  { bg: '#FEFBEB', accent: '#AD7900' },
    info:     { bg: '#F0F9FF', accent: '#0975D7' },
  }[severity];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        backgroundColor: palette.bg,
        borderLeft: `2px solid ${palette.accent}`,
        borderRadius: 6,
      }}
    >
      <div style={{ flex: 1, fontSize: 13, color: '#1F1F32' }}>{message}</div>
      <button
        type="button"
        style={{
          padding: '5px 10px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          color: palette.accent,
          border: `1px solid ${palette.accent}`,
          backgroundColor: 'transparent',
        }}
      >
        {cta}
      </button>
    </div>
  );
}

function ModuleCardStub({ title }: { title: string }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #ECECF3',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 13, color: '#6B697B' }}>
        Module placeholder — detailed contents pending.
      </div>
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #ECECF3',
        borderRadius: 8,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: '#8C899F', letterSpacing: 0.5, textTransform: 'uppercase' }}>
        {title}
      </div>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}
