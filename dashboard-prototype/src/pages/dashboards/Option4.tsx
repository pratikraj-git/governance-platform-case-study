import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { orgHealth, priorityAlerts, auditEvents } from '../../data/mockData';

// PLACEHOLDER — to be built out to ~850 lines per docs/RECREATION_PROMPT.md §10.4.
// Shows the status-page strip shape so the differentiator is recognizable.
// NOTE: Option 4 must remain drawer-free; everything expands inline.

const STRIPS = [
  { id: 'security',     label: 'Security Health',        bar: '#B3141D', summary: 'SSO Active · Cert 12 days · SCIM Synced · MFA 94%' },
  { id: 'workspaces',   label: 'Workspace Operations',   bar: '#AD7900', summary: '6 workspaces · 4 healthy · 1 warning · 1 degraded' },
  { id: 'content',      label: 'Content Governance',     bar: '#198558', summary: '198 items · 14 draft · 6 review · 8 stale' },
  { id: 'ai',           label: 'AI Readiness',           bar: '#198558', summary: 'Score 72% · 4/6 agents active · Sandbox on' },
  { id: 'deploy',       label: 'Deployment Pipeline',    bar: '#AD7900', summary: '94.2% success · 17 this week · 1 failed' },
  { id: 'integrations', label: 'Integration Health',     bar: '#AD7900', summary: '5/6 connected · Zendesk down' },
];

export function Option4() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleStrip = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          Option 4 — Compact Operational Summary
        </div>
        <div style={{ fontSize: 13, color: '#6B697B', marginTop: 2 }}>
          Placeholder preview. Full build per docs/RECREATION_PROMPT.md §10.4 is pending. No drawers; all detail expands inline.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '10px 16px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #ECECF3',
          borderRadius: 8,
        }}
      >
        {orgHealth.map((kpi, idx) => (
          <div key={kpi.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor:
                  kpi.status === 'good' ? '#198558' : kpi.status === 'warning' ? '#AD7900' : '#B3141D',
              }}
            />
            <span
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#8C899F',
                fontWeight: 500,
              }}
            >
              {kpi.label}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>{kpi.value}</span>
            {idx < orgHealth.length - 1 && (
              <span style={{ width: 1, height: 14, backgroundColor: '#ECECF3' }} />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '10px 14px',
          backgroundColor: '#FFF0F3',
          border: '1px solid rgba(179,20,29,0.18)',
          borderLeft: '3px solid #B3141D',
          borderRadius: 6,
          fontSize: 13,
          color: '#1F1F32',
        }}
      >
        <strong>{priorityAlerts.filter((a) => a.severity === 'critical').length} critical alerts</strong> require attention.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {STRIPS.map((s) => {
          const isOpen = expanded.has(s.id);
          return (
            <div
              key={s.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #ECECF3',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggleStrip(s.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px 10px 0',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F6F6F9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ width: 8, alignSelf: 'stretch', backgroundColor: s.bar }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32', minWidth: 200 }}>
                  {s.label}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: '#6B697B' }}>{s.summary}</span>
                <IconChevronRight
                  size={16}
                  color="#8C899F"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 160ms' }}
                />
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '12px 16px 16px 28px',
                    backgroundColor: '#FCFCFD',
                    borderTop: '1px solid #ECECF3',
                    fontSize: 13,
                    color: '#3D3C52',
                  }}
                >
                  Detailed inline content for <strong>{s.label}</strong> will appear here — see RECREATION_PROMPT §10.4.
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #ECECF3',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32', marginBottom: 12 }}>
          Compliance Audit Trail ({auditEvents.length} events)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {auditEvents.slice(0, 4).map((e) => (
            <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span style={{ minWidth: 100, color: '#6B697B' }}>{e.time}</span>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: 4,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  backgroundColor:
                    e.risk === 'high' ? '#FFF0F3' : e.risk === 'medium' ? '#FEFBEB' : '#F1FEF9',
                  color: e.risk === 'high' ? '#B3141D' : e.risk === 'medium' ? '#AD7900' : '#198558',
                  minWidth: 38,
                  textAlign: 'center',
                }}
              >
                {e.risk.toUpperCase()}
              </span>
              <span style={{ flex: 1, color: '#1F1F32' }}>{e.action}</span>
              <span style={{ color: '#6B697B' }}>{e.actor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
