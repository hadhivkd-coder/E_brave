import React from 'react';
import '../../admin.css';

const VARIANT_STYLES = {
  green:  { bg: 'var(--adm-green-dim)',   color: 'var(--adm-green)',   dot: '#10b981' },
  red:    { bg: 'var(--adm-red-dim)',     color: 'var(--adm-red)',     dot: '#ef4444' },
  amber:  { bg: 'var(--adm-amber-dim)',   color: 'var(--adm-amber)',   dot: '#f59e0b' },
  blue:   { bg: 'var(--adm-blue-dim)',    color: 'var(--adm-blue)',    dot: '#3b82f6' },
  indigo: { bg: 'var(--adm-accent-dim)', color: 'var(--adm-accent)',  dot: '#6366f1' },
  purple: { bg: 'rgba(168,85,247,0.15)', color: '#a855f7',            dot: '#a855f7' },
  gray:   { bg: 'rgba(82,82,91,0.3)',    color: 'var(--adm-text-secondary)', dot: '#71717a' },
};

const SIZE_STYLES = {
  sm: { fontSize: '11px', padding: '2px 8px', dotSize: 6 },
  md: { fontSize: '12px', padding: '3px 10px', dotSize: 7 },
};

export function Badge({ children, variant = 'gray', size = 'md' }) {
  const style = VARIANT_STYLES[variant] || VARIANT_STYLES.gray;
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <span
      className="adm-badge"
      style={{
        background: style.bg,
        color: style.color,
        fontSize: sizeStyle.fontSize,
        padding: sizeStyle.padding,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        borderRadius: 999,
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: sizeStyle.dotSize,
          height: sizeStyle.dotSize,
          borderRadius: '50%',
          background: style.dot,
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
      {children}
    </span>
  );
}

// Map lead statuses → badge variants
export function leadStatusBadge(status) {
  if (!status) return { variant: 'gray', label: 'Unknown' };
  const s = status.toLowerCase().replace(/\s+/g, '_');
  const map = {
    new_lead:              { variant: 'blue',   label: 'New Lead' },
    new:                   { variant: 'blue',   label: 'New Lead' },
    contacted:             { variant: 'indigo', label: 'Contacted' },
    interested:            { variant: 'purple', label: 'Interested' },
    webinar_registered:    { variant: 'amber',  label: 'Webinar Reg.' },
    webinar_attended:      { variant: 'amber',  label: 'Webinar Attended' },
    counseling_booked:     { variant: 'blue',   label: 'Counseling Booked' },
    counseling_completed:  { variant: 'indigo', label: 'Counseling Done' },
    converted:             { variant: 'green',  label: 'Converted' },
    not_interested:        { variant: 'gray',   label: 'Not Interested' },
    closed:                { variant: 'red',    label: 'Closed' },
  };
  return map[s] || { variant: 'gray', label: status };
}

export default Badge;
