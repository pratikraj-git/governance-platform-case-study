import { useEffect } from 'react';
import { IconInfoCircle, IconX } from '@tabler/icons-react';

export interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  points: string[];
}

export function InfoModal({ open, onClose, title, points }: InfoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(31, 31, 50, 0.4)',
          animation: 'fadeIn 160ms ease-out',
        }}
      />
      <div
        role="dialog"
        aria-label={title}
        style={{
          position: 'relative',
          width: 540,
          maxWidth: '100%',
          maxHeight: '80vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          boxShadow: '0 20px 60px rgba(31, 31, 50, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #ECECF3',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: '#FFF4ED',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E45913',
              flexShrink: 0,
            }}
          >
            <IconInfoCircle size={18} />
          </div>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#1F1F32' }}>
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B697B',
              flexShrink: 0,
            }}
          >
            <IconX size={18} />
          </button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
          <div style={{ fontSize: 13, color: '#6B697B', marginBottom: 16, lineHeight: 1.5 }}>
            Design philosophy and UX rationale for this exploration. Each point is one ingredient
            that defines how this option differs from the others.
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {points.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: '#F6F6F9',
                    color: '#3D3C52',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ fontSize: 14, lineHeight: '22px', color: '#3D3C52' }}>{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
