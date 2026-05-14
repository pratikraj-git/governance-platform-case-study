import { useState, lazy, Suspense } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { Shell } from '../components/admin/Shell';
import { InfoModal } from '../components/admin/InfoModal';
import { dashboardInfoContent, type DashboardOption } from '../data/mockData';

const Option1 = lazy(() => import('./dashboards/Option1').then((m) => ({ default: m.Option1 })));
const Option2 = lazy(() => import('./dashboards/Option2').then((m) => ({ default: m.Option2 })));
const Option3 = lazy(() => import('./dashboards/Option3').then((m) => ({ default: m.Option3 })));
const Option4 = lazy(() => import('./dashboards/Option4').then((m) => ({ default: m.Option4 })));

const TABS: { id: DashboardOption; label: string }[] = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
  { id: 'option4', label: 'Option 4' },
];

function Skeleton() {
  const card: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #ECECF3',
    borderRadius: 8,
    height: 110,
    animation: 'pulse 1.4s ease-in-out infinite',
  };
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ ...card, height: 96 }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ ...card, height: 180 }} />
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [active, setActive] = useState<DashboardOption>('option1');
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Shell>
      <div
        style={{
          padding: '10px 24px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #ECECF3',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1F1F32' }}>Dashboard</div>

        <div
          role="tablist"
          aria-label="Dashboard options"
          style={{
            display: 'inline-flex',
            backgroundColor: '#F6F6F9',
            border: '1px solid #ECECF3',
            borderRadius: 6,
            padding: 2,
            gap: 2,
          }}
        >
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? '#1F1F32' : '#6B697B',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                  transition: 'background-color 120ms ease, color 120ms ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={() => setInfoOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 10px',
            borderRadius: 6,
            border: '1px solid #ECECF3',
            backgroundColor: '#FFFFFF',
            color: '#6B697B',
            fontSize: 13,
            fontWeight: 500,
            transition: 'color 120ms ease, border-color 120ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0975D7';
            e.currentTarget.style.borderColor = '#0975D7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B697B';
            e.currentTarget.style.borderColor = '#ECECF3';
          }}
        >
          <IconInfoCircle size={15} />
          Design Info
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Suspense fallback={<Skeleton />}>
          {active === 'option1' && <Option1 />}
          {active === 'option2' && <Option2 />}
          {active === 'option3' && <Option3 />}
          {active === 'option4' && <Option4 />}
        </Suspense>
      </div>

      <InfoModal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title={dashboardInfoContent[active].title}
        points={dashboardInfoContent[active].points}
      />
    </Shell>
  );
}
