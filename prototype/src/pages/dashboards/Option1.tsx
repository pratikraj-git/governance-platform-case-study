import { orgHealth, priorityAlerts } from '../../data/mockData';
import { StatusChip } from '../../components/admin/StatusChip';

// PLACEHOLDER — to be built out to ~1000 lines per docs/RECREATION_PROMPT.md §10.1.
// Renders a minimal preview so the app boots and the segmented control works end-to-end.

export function Option1() {
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PreviewBanner
        title="Option 1 — Executive Command Center"
        subtitle="Placeholder preview. Full build per docs/RECREATION_PROMPT.md §10.1 is pending in upcoming commands."
      />
      <KpiStrip />
      <AlertsPreview />
      <ModuleGridStub />
    </div>
  );
}

function PreviewBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: '#FFF4ED',
        border: '1px solid #FFD9C2',
        borderLeft: '3px solid #E45913',
        borderRadius: 6,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>{title}</div>
      <div style={{ marginTop: 2, fontSize: 13, color: '#6B697B' }}>{subtitle}</div>
    </div>
  );
}

function KpiStrip() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
      {orgHealth.map((kpi) => (
        <div
          key={kpi.id}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #ECECF3',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 12, color: '#6B697B', fontWeight: 500 }}>{kpi.label}</div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#1F1F32' }}>{kpi.value}</span>
            <StatusChip status={kpi.status} />
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: '#6B697B' }}>{kpi.trend}</div>
        </div>
      ))}
    </div>
  );
}

function AlertsPreview() {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #ECECF3',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32', marginBottom: 12 }}>
        Priority Alerts ({priorityAlerts.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {priorityAlerts.slice(0, 3).map((a) => (
          <div
            key={a.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: 12,
              borderRadius: 6,
              backgroundColor: '#FCFCFD',
              border: '1px solid #ECECF3',
            }}
          >
            <StatusChip status={a.severity === 'info' ? 'review' : a.severity} label={a.severity.toUpperCase()} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>{a.title}</div>
              <div style={{ marginTop: 2, fontSize: 13, color: '#3D3C52' }}>{a.description}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: '#6B697B' }}>
                {a.module} · {a.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleGridStub() {
  const modules = [
    'Security Health',
    'Workspace Operations',
    'Content Governance',
    'AI Readiness',
    'Deployment Pipeline',
    'Integration Health',
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {modules.map((m) => (
        <div
          key={m}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #ECECF3',
            borderRadius: 8,
            padding: 16,
            minHeight: 160,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>{m}</div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#6B697B' }}>
            Module placeholder — drill-down drawer and inline metrics to be implemented.
          </div>
        </div>
      ))}
    </div>
  );
}
