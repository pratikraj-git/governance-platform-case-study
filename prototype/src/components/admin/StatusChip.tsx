import type { CSSProperties } from 'react';

type StatusKey =
  | 'healthy' | 'active' | 'connected' | 'good' | 'success' | 'production' | 'approved'
  | 'warning' | 'degraded' | 'rolled-back'
  | 'staging' | 'rolling-out' | 'review'
  | 'critical' | 'failed' | 'down'
  | 'draft' | 'disabled'
  | 'beta';

const palette: Record<StatusKey, { fg: string; bg: string }> = {
  healthy:      { fg: '#198558', bg: '#F1FEF9' },
  active:       { fg: '#198558', bg: '#F1FEF9' },
  connected:    { fg: '#198558', bg: '#F1FEF9' },
  good:         { fg: '#198558', bg: '#F1FEF9' },
  success:      { fg: '#198558', bg: '#F1FEF9' },
  production:   { fg: '#198558', bg: '#F1FEF9' },
  approved:     { fg: '#198558', bg: '#F1FEF9' },

  warning:      { fg: '#AD7900', bg: '#FEFBEB' },
  degraded:     { fg: '#AD7900', bg: '#FEFBEB' },
  'rolled-back':{ fg: '#AD7900', bg: '#FEFBEB' },

  staging:      { fg: '#0975D7', bg: '#F0F9FF' },
  'rolling-out':{ fg: '#0975D7', bg: '#F0F9FF' },
  review:       { fg: '#0975D7', bg: '#F0F9FF' },

  critical:     { fg: '#B3141D', bg: '#FFF0F3' },
  failed:       { fg: '#B3141D', bg: '#FFF0F3' },
  down:         { fg: '#B3141D', bg: '#FFF0F3' },

  draft:        { fg: '#6B697B', bg: '#F6F6F9' },
  disabled:     { fg: '#6B697B', bg: '#F6F6F9' },

  beta:         { fg: '#7B4EC2', bg: '#F5F0FF' },
};

const labelMap: Partial<Record<StatusKey, string>> = {
  'rolled-back': 'Rolled back',
  'rolling-out': 'Rolling out',
};

export interface StatusChipProps {
  status: string;
  label?: string;
  style?: CSSProperties;
}

export function StatusChip({ status, label, style }: StatusChipProps) {
  const key = (status.toLowerCase() as StatusKey);
  const tokens = palette[key] ?? palette.draft;
  const display = label ?? labelMap[key] ?? status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
        color: tokens.fg,
        backgroundColor: tokens.bg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: tokens.fg,
          flexShrink: 0,
        }}
      />
      {display}
    </span>
  );
}
