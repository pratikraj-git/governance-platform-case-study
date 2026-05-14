import { useEffect, type ReactNode } from 'react';
import { IconX } from '@tabler/icons-react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  width?: number;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, subtitle, width = 520, children }: DrawerProps) {
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
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(31, 31, 50, 0.3)',
          backdropFilter: 'blur(2px)',
          animation: 'fadeIn 160ms ease-out',
        }}
      />
      <div
        role="dialog"
        aria-label={title}
        style={{
          position: 'relative',
          width,
          maxWidth: '100vw',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 200ms ease-out',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #ECECF3',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1F1F32', lineHeight: 1.3 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, color: '#6B697B', lineHeight: 1.4 }}>
                {subtitle}
              </div>
            )}
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
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
