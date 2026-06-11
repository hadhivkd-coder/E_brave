import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { generateEOSResponse, generateEOSGreeting, EOS_QUICK_ACTIONS } from '../components/eos/EOSEngine';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import './EosAI.css';

// ─────────────────────────────────────────────────────────
// MESSAGE RENDERER — supports markdown-lite formatting
// ─────────────────────────────────────────────────────────
function MessageRenderer({ text }) {
  const lines = (text || '').split('\n');
  let inCodeBlock = false;
  const codeLines = [];
  const elements = [];
  let key = 0;

  const renderInline = (line) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // Italic: _text_
      const italicParts = part.split(/(_[^_]+_)/g);
      return italicParts.map((ip, j) => {
        if (ip.startsWith('_') && ip.endsWith('_') && ip.length > 2) {
          return <em key={j}>{ip.slice(1, -1)}</em>;
        }
        return <span key={j}>{ip}</span>;
      });
    });
  };

  lines.forEach((line, idx) => {
    // Code block toggle
    if (line.trim() === '```') {
      if (inCodeBlock) {
        elements.push(
          <pre key={key++} className="eos-code-block">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines.length = 0;
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // Horizontal rule
    if (/^━+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="eos-msg-divider" />);
      return;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={key++} className="eos-msg-spacer" />);
      return;
    }

    // Heading lines (start with #)
    if (line.startsWith('# ')) {
      elements.push(<h2 key={key++} className="eos-msg-h2">{renderInline(line.slice(2))}</h2>);
      return;
    }

    // Bullet points
    if (line.trimStart().startsWith('• ') || line.trimStart().startsWith('* ')) {
      const indent = line.match(/^(\s*)/)[1].length;
      elements.push(
        <div key={key++} className="eos-msg-bullet" style={{ paddingLeft: `${indent * 8 + 8}px` }}>
          <span className="eos-bullet-dot">•</span>
          <span>{renderInline(line.trimStart().slice(2))}</span>
        </div>
      );
      return;
    }

    // Numbered lists (e.g. "  1. text" or "1. text")
    const numberedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      const [, spaces, num, rest] = numberedMatch;
      elements.push(
        <div key={key++} className="eos-msg-numbered" style={{ paddingLeft: `${spaces.length * 8 + 4}px` }}>
          <span className="eos-num-badge">{num}</span>
          <span>{renderInline(rest)}</span>
        </div>
      );
      return;
    }

    // Default paragraph
    elements.push(
      <p key={key++} className="eos-msg-para">
        {renderInline(line)}
      </p>
    );
  });

  // Flush any remaining open code block
  if (inCodeBlock && codeLines.length) {
    elements.push(
      <pre key={key++} className="eos-code-block">
        <code>{codeLines.join('\n')}</code>
      </pre>
    );
  }

  return <div className="eos-msg-content">{elements}</div>;
}

// ─────────────────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="eos-typing-indicator">
      <div className="eos-typing-avatar">
        <EOSAvatar size={28} />
      </div>
      <div className="eos-typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="eos-typing-label">EOS is analyzing...</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// EOS AVATAR — animated glowing shield
// ─────────────────────────────────────────────────────────
function EOSAvatar({ size = 36 }) {
  return (
    <div className="eos-avatar-wrap" style={{ width: size, height: size }}>
      <div className="eos-avatar-glow" />
      <div className="eos-avatar-inner">
        <span className="eos-avatar-text" style={{ fontSize: size * 0.36 }}>EOS</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CAPABILITIES LIST
// ─────────────────────────────────────────────────────────
const CAPABILITIES = [
  { icon: '📊', label: 'Lead & CRM Analysis' },
  { icon: '🔀', label: 'Conversion Funnel Tracking' },
  { icon: '💰', label: 'Revenue & Financial Reports' },
  { icon: '📅', label: 'Session & Counseling Pipeline' },
  { icon: '📡', label: 'Webinar Performance Metrics' },
  { icon: '🎬', label: 'Content Engagement Analytics' },
  { icon: '🌐', label: 'Website Health Monitoring' },
  { icon: '⚙️', label: 'Task & Automation Oversight' },
  { icon: '📋', label: 'Weekly Operational Reports' },
  { icon: '🤖', label: 'AI-Powered Recommendations' },
  { icon: '🧠', label: 'Student Assessment Intelligence' },
];

// ─────────────────────────────────────────────────────────
// CONTEXT ACCESS CHIPS
// ─────────────────────────────────────────────────────────
const CONTEXT_CHIPS = [
  { label: 'Leads',     icon: '👥', key: 'leads' },
  { label: 'Students',  icon: '🎓', key: 'students' },
  { label: 'Sessions',  icon: '📅', key: 'sessions' },
  { label: 'Webinars',  icon: '📡', key: 'webinars' },
  { label: 'Content',   icon: '🎬', key: 'content' },
  { label: 'Revenue',   icon: '💰', key: 'finances' },
  { label: 'Tasks',     icon: '✅', key: 'tasks' },
  { label: 'Analytics', icon: '📊', key: 'analytics' },
  { label: 'Assessments', icon: '♟️', key: 'assessments' },
];

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// ─────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────
export default function EosAI() {
  const { leads, students, sessions, webinars, content, finances, tasks, notifications, assessmentResults } = useData();

  const context = useMemo(() => ({
    leads:     leads     || [],
    students:  students  || [],
    sessions:  sessions  || [],
    webinars:  webinars  || [],
    content:   content   || [],
    finances:  finances  || [],
    tasks:     tasks     || [],
    notifications: notifications || [],
    analytics: {},
    assessments: assessmentResults || [
      // Placeholder data until connected to Supabase
      { studentId: 'mock-1', archetype: 'The Strategist', careerMatch: 'Product Manager', flags: ['Low patience'] }
    ],
  }), [leads, students, sessions, webinars, content, finances, tasks, notifications, assessmentResults]);

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [quickAnswerMode, setQuickAnswerMode] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const chatBodyRef    = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Initial greeting on mount
  useEffect(() => {
    if (hasGreeted) return;
    setHasGreeted(true);

    setIsTyping(true);
    const triggerGreeting = async () => {
      try {
        const { response } = await generateEOSGreeting(context);
        setMessages([{
          id: Date.now(),
          role: 'ai',
          text: response,
          time: new Date(),
          type: 'greeting',
        }]);
      } catch (err) {
        console.error('Greeting error:', err);
      } finally {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(triggerGreeting, 1200);
    return () => clearTimeout(timer);
  }, [context, hasGreeted]);

  // Send a message
  const sendMessage = useCallback((text) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    const triggerResponse = async () => {
      try {
        const { response, type, data } = await generateEOSResponse(trimmed, context, quickAnswerMode);
        const aiMsg = {
          id: Date.now() + 1,
          role: 'ai',
          text: response,
          time: new Date(),
          type,
          data,
        };
        setMessages(prev => [...prev, aiMsg]);
      } catch (err) {
        console.error('[EOS] Response error:', err);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: '⚠️ EOS encountered an error. Please try again or use a Quick Action.',
          time: new Date(),
          type: 'error',
        }]);
      } finally {
        setIsTyping(false);
      }
    };

    // Simulate processing delay proportional to complexity
    const delay = 800 + Math.min(trimmed.length * 8, 1200);
    setTimeout(triggerResponse, delay);
  }, [context, quickAnswerMode]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    sendMessage(inputVal);
  }, [inputVal, sendMessage]);

  const handleQuickAction = useCallback((action) => {
    sendMessage(action.prompt);
  }, [sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputVal);
    }
  }, [inputVal, sendMessage]);

  // Data stats for context chips
  const dataStats = useMemo(() => ({
    leads:     (leads     || []).length,
    students:  (students  || []).length,
    sessions:  (sessions  || []).length,
    webinars:  (webinars  || []).length,
    content:   (content   || []).length,
    finances:  (finances  || []).length,
    tasks:     (tasks     || []).length,
    assessments: (context.assessments || []).length,
    analytics: 0,
  }), [leads, students, sessions, webinars, content, finances, tasks, context.assessments]);

  return (
    <AdminLayout>
      <div className="eos-page">
        {/* ── LEFT PANEL ── */}
        <aside className="eos-left-panel">
          {/* Status Header */}
          <div className="eos-status-card">
            <div className="eos-status-logo">
              <EOSAvatar size={52} />
              <div>
                <div className="eos-status-title">EOS</div>
                <div className="eos-status-subtitle">Operational System</div>
              </div>
            </div>
            <div className="eos-status-badge">
              <span className="eos-pulse-dot" />
              <span>Operational</span>
            </div>
          </div>

          {/* Data Context Chips */}
          <div className="eos-section">
            <div className="eos-section-title">Live Data Access</div>
            <div className="eos-chips-grid">
              {CONTEXT_CHIPS.map(chip => (
                <div key={chip.key} className="eos-chip">
                  <span className="eos-chip-icon">{chip.icon}</span>
                  <span className="eos-chip-label">{chip.label}</span>
                  <span className="eos-chip-count">{dataStats[chip.key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="eos-section">
            <div className="eos-section-title">Quick Actions</div>
            <div className="eos-actions-grid">
              {EOS_QUICK_ACTIONS.map(action => (
                <button
                  key={action.id}
                  className="eos-action-btn"
                  onClick={() => handleQuickAction(action)}
                  disabled={isTyping}
                  title={action.prompt}
                >
                  <span className="eos-action-icon">{action.icon}</span>
                  <span className="eos-action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="eos-section eos-capabilities">
            <button
              className="eos-capabilities-toggle"
              onClick={() => setCapabilitiesOpen(v => !v)}
              aria-expanded={capabilitiesOpen}
            >
              <span>Capabilities</span>
              <span className={`eos-chevron ${capabilitiesOpen ? 'open' : ''}`}>›</span>
            </button>
            {capabilitiesOpen && (
              <ul className="eos-capabilities-list">
                {CAPABILITIES.map((cap, i) => (
                  <li key={i} className="eos-capability-item">
                    <span>{cap.icon}</span>
                    <span>{cap.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* ── RIGHT PANEL: CHAT ── */}
        <main className="eos-chat-panel">
          {/* Chat Header */}
          <div className="eos-chat-header">
            <div className="eos-chat-header-left">
              <EOSAvatar size={38} />
              <div>
                <div className="eos-chat-title">EOS Intelligence</div>
                <div className="eos-chat-subtitle">
                  {isTyping ? (
                    <span className="eos-typing-status">Analyzing data...</span>
                  ) : (
                    <span>Ask anything about your operations</span>
                  )}
                </div>
              </div>
            </div>
            <div className="eos-chat-header-right">
              <button
                className="eos-header-btn"
                title="Clear conversation"
                onClick={() => {
                  setMessages([]);
                  setHasGreeted(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <path d="M3.51 15a9 9 0 1 0 .49-3.51"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="eos-messages" ref={chatBodyRef}>
            {messages.length === 0 && !isTyping && (
              <div className="eos-empty-state">
                <div className="eos-empty-avatar">
                  <EOSAvatar size={64} />
                </div>
                <h3>Welcome to EOS</h3>
                <p>Your E-Brave Operational System is ready.<br />Use Quick Actions or ask me anything.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`eos-message eos-message--${msg.role}`}
              >
                {msg.role === 'ai' && (
                  <div className="eos-msg-avatar">
                    <EOSAvatar size={30} />
                  </div>
                )}

                <div className="eos-msg-bubble-wrap">
                  <div className={`eos-msg-bubble eos-msg-bubble--${msg.role}`}>
                    {msg.role === 'ai' ? (
                      <MessageRenderer text={msg.text} />
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                  <div className="eos-msg-meta">
                    {msg.role === 'ai' && <span className="eos-msg-sender">EOS</span>}
                    <span className="eos-msg-time">{formatTime(msg.time)}</span>
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="eos-msg-user-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="eos-input-area" onSubmit={handleSubmit}>
            <div className="eos-input-row">
              <button type="button" className="eos-voice-btn" title="Voice input (coming soon)" disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </button>

              <textarea
                ref={inputRef}
                className="eos-input"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask EOS about leads, revenue, sessions, content, recommendations..."
                rows={1}
                disabled={isTyping}
                autoComplete="off"
              />

              <button
                type="submit"
                className={`eos-send-btn ${inputVal.trim() && !isTyping ? 'active' : ''}`}
                disabled={!inputVal.trim() || isTyping}
                title="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <div className="eos-input-hint" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span>Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line · EOS has access to all live admin data</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none', color: 'var(--adm-text-secondary)', fontSize: '11px', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={quickAnswerMode}
                  onChange={e => setQuickAnswerMode(e.target.checked)}
                  style={{ accentColor: 'var(--adm-accent)', cursor: 'pointer' }}
                />
                ⚡ Quick Answer Mode
              </label>
            </div>
          </form>
        </main>
      </div>
    </AdminLayout>
  );
}
