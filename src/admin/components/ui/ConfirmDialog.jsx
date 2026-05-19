import React, { useState } from 'react';

/**
 * ConfirmDialog component for critical operations
 * @param {boolean} isOpen - Control visibility
 * @param {string} title - Dialog header
 * @param {string} message - Warning text
 * @param {string} requireWord - Word to type for confirmation (optional, e.g. "CONFIRM")
 * @param {function} onConfirm - Confirm action handler
 * @param {function} onCancel - Cancel action handler
 */
export default function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this critical action? This cannot be undone.',
  requireWord = '',
  onConfirm,
  onCancel
}) {
  const [inputWord, setInputWord] = useState('');

  if (!isOpen) return null;

  const isConfirmedDisabled = requireWord && inputWord.toUpperCase() !== requireWord.toUpperCase();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#18181b',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        <h2 style={{
          margin: '0 0 12px',
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--adm-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚠️ {title}
        </h2>
        
        <p style={{
          margin: '0 0 20px',
          fontSize: '14px',
          lineHeight: '1.5',
          color: 'var(--adm-text-secondary)'
        }}>
          {message}
        </p>

        {requireWord && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--adm-text-secondary)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Type <strong style={{ color: 'var(--adm-red)' }}>{requireWord}</strong> to confirm:
            </label>
            <input
              type="text"
              value={inputWord}
              onChange={e => setInputWord(e.target.value)}
              placeholder={`Type ${requireWord}`}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onCancel}
            className="adm-btn adm-btn-ghost"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              setInputWord('');
            }}
            disabled={isConfirmedDisabled}
            className="adm-btn"
            style={{
              background: 'var(--adm-red)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: isConfirmedDisabled ? 'not-allowed' : 'pointer',
              opacity: isConfirmedDisabled ? 0.4 : 1
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
