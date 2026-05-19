import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import '../../admin.css';

const VARIANT_STYLES = {
  success: {
    bg: 'var(--adm-green-dim)',
    border: 'var(--adm-green)',
    color: 'var(--adm-green)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#10b981" strokeWidth="1.4" />
        <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    bg: 'var(--adm-red-dim)',
    border: 'var(--adm-red)',
    color: 'var(--adm-red)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#ef4444" strokeWidth="1.4" />
        <path d="M6 6l6 6M12 6l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  warning: {
    bg: 'var(--adm-amber-dim)',
    border: 'var(--adm-amber)',
    color: 'var(--adm-amber)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L1.5 15.5h15L9 2z" stroke="#f59e0b" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 7v4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="13" r="0.8" fill="#f59e0b" />
      </svg>
    ),
  },
  info: {
    bg: 'var(--adm-blue-dim)',
    border: 'var(--adm-blue)',
    color: 'var(--adm-blue)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke="#3b82f6" strokeWidth="1.4" />
        <path d="M9 8v5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="5.5" r="0.8" fill="#3b82f6" />
      </svg>
    ),
  },
};

const AUTO_DISMISS_MS = 4000;

function ToastItem({ toast, onDismiss }) {
  const timerRef = useRef(null);
  const style = VARIANT_STYLES[toast.variant] || VARIANT_STYLES.info;

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, onDismiss]);

  return (
    <div
      className="adm-toast"
      style={{
        background: 'var(--adm-card)',
        borderLeft: `3px solid ${style.border}`,
      }}
      role="alert"
    >
      <div className="adm-toast-icon">{style.icon}</div>
      <div className="adm-toast-body">
        {toast.title && <div className="adm-toast-title" style={{ color: style.color }}>{toast.title}</div>}
        <div className="adm-toast-msg">{toast.message}</div>
      </div>
      <button
        className="adm-toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="var(--adm-text-secondary)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {/* Progress bar */}
      <div className="adm-toast-progress" style={{ background: style.border }} />
    </div>
  );
}

export default function Toast() {
  const { toasts, dismissToast } = useNotifications();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="adm-toast-container" aria-live="polite">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
