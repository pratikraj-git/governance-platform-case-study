import { useState } from 'react';
import { orgHealth, priorityAlerts, workspaceOps } from '../../data/mockData';
import { StatusChip } from '../../components/admin/StatusChip';

// PLACEHOLDER — to be built out to ~1250 lines per docs/RECREATION_PROMPT.md §10.2.
// Demonstrates the two-pane shape (left section panel, right detail) so the
// layout is recognizable and upcoming commands can flesh out each section.

const SECTIONS = [
  { id: 'overview',     label: 'Overview',         badge: String(priorityAlerts.length) },
  { id: 'security',     label: 'Security Health',  badge: '!' },
  { id: 'workspaces',   label: 'Workspace Ops',    badge: String(workspaceOps.length) },
  { id: 'content',      label: 'Content Gov.',     badge: '198' },
  { id: 'ai',           label: 'AI Readiness',     badge: '72%' },
  { id: 'deploy',       label: 'Deploy Pipeline',  badge: '17' },
  { id: 'integrations', label: 'Integrations',     badge: '5/6' },
  { id: 'activity',     label: 'Activity & Audit', badge: '8' },
];

export function Option2() {
  const [active, setActive] = useState('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      <aside
        style={{
          width: 200,
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #ECECF3',
          padding: '16px 0',
        }}
      >
        <div
          style={{
            padding: '0 16px 8px',
            fontSize: 10,
            fontWeight: 600,
            color: '#8C899F',
            letterSpacing: 0.6,
            textTransform: 'uppercase',
          }}
        >
          Sections
        </div>
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '8px 16px 8px 13px',
                borderLeft: `3px solid ${isActive ? '#E45913' : 'transparent'}`,
                backgroundColor: isActive ? '#F6F6F9' : 'transparent',
                fontSize: 13,
                fontWeight: 500,
                color: '#1F1F32',
                textAlign: 'left',
              }}
            >
              <span style={{ flex: 1 }}>{s.label}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#6B697B',
                  backgroundColor: '#F6F6F9',
                  padding: '1px 6px',
                  borderRadius: 4,
                }}
              >
                {s.badge}
              </span>
            </button>
          );
        })}
      </aside>

      <div style={{ flex: 1, minWidth: 0, padding: '20px 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1F1F32' }}>
              {SECTIONS.find((s) => s.id === active)?.label}
            </div>
            <div style={{ fontSize: 13, color: '#6B697B', marginTop: 2 }}>
              Dense Operations Workbench — real-time operational intelligence
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6B697B' }}>Updated just now</div>
        </div>

        <div
          style={{
            padding: '12px 16px',
            backgroundColor: '#FFF4ED',
            border: '1px solid #FFD9C2',
            borderLeft: '3px solid #E45913',
            borderRadius: 6,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 13, color: '#3D3C52' }}>
            Option 2 placeholder — full section content to be built per docs/RECREATION_PROMPT.md §10.2.
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
                padding: 14,
              }}
            >
              <div style={{ fontSize: 12, color: '#6B697B' }}>{kpi.label}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#1F1F32' }}>{kpi.value}</span>
                <StatusChip status={kpi.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
