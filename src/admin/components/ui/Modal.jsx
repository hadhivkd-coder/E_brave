import React, { useEffect, useRef, useCallback } from 'react';
import '../../admin.css';

const SIZE_WIDTHS = {
  sm: 400,
  md: 560,
  lg: 720,
  xl: 920,
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const maxWidth = SIZE_WIDTHS[size] || SIZE_WIDTHS.md;

  // ESC key to close
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  // Focus the dialog only when it opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (dialogRef.current && !dialogRef.current.contains(document.activeElement)) {
          dialogRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="adm-modal-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="adm-modal"
        ref={dialogRef}
        tabIndex={-1}
        style={{ maxWidth }}
      >
        {/* Header */}
        <div className="adm-modal-header">
          <h2 className="adm-modal-title">{title}</h2>
          <button
            className="adm-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="adm-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
