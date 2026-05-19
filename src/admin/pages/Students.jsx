import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

function StudentProfile({ student, sessions, onClose }) {
  const [tab, setTab] = useState('overview');
  if (!student) return null;
  const studentSessions = sessions.filter(s => s.studentId === student.id || s.leadId === student.leadId);

  return (
    <div className="adm-slide-panel-overlay" onClick={onClose}>
      <div className="adm-slide-panel adm-slide-panel-wide" onClick={e => e.stopPropagation()}>
        <div className="adm-slide-panel-header">
          <div className="adm-slide-panel-title">
            <div className="adm-avatar adm-avatar-lg" style={{ background: '#10b98120', color: '#10b981', fontSize: '1.2rem' }}>
              {student.name?.charAt(0)}
            </div>
            <div>
              <h3>{student.name}</h3>
              <p>{student.email} · {student.city}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Badge variant={student.status === 'Active' ? 'green' : 'gray'}>{student.status}</Badge>
            <button className="adm-icon-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="adm-panel-tabs">
          {['overview', 'counseling', 'payments', 'documents', 'notes'].map(t => (
            <button key={t} className={`adm-panel-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="adm-panel-content">
            <div className="adm-detail-grid">
              <div className="adm-detail-item"><span className="adm-detail-label">Phone</span><span>{student.phone}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Education</span><span>{student.education}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Enrolled</span><span>{new Date(student.enrolledDate).toLocaleDateString('en-IN')}</span></div>
              <div className="adm-detail-item"><span className="adm-detail-label">Progress</span>
                <div className="adm-progress-wrap">
                  <div className="adm-progress-bar" style={{ width: `${student.progressScore || 0}%` }} />
                  <span>{student.progressScore || 0}%</span>
                </div>
              </div>
            </div>
            <div className="adm-detail-section">
              <label className="adm-detail-label">Recommended Career Paths</label>
              <div className="adm-tag-list">
                {(student.recommendedPaths || []).map(p => <span key={p} className="adm-tag">{p}</span>)}
              </div>
            </div>
            <div className="adm-detail-section">
              <label className="adm-detail-label">Parent Notes</label>
              <p className="adm-note-text">{student.parentNotes || 'No parent notes recorded'}</p>
            </div>
          </div>
        )}

        {tab === 'counseling' && (
          <div className="adm-panel-content">
            <div className="adm-sessions-timeline">
              {studentSessions.length === 0 ? (
                <p className="adm-empty-state">No counseling sessions yet</p>
              ) : studentSessions.map(s => (
                <div key={s.id} className="adm-session-record">
                  <div className="adm-session-record-header">
                    <Badge variant={s.status === 'Completed' ? 'green' : s.status === 'Scheduled' ? 'blue' : 'gray'} size="sm">{s.status}</Badge>
                    <Badge variant="purple" size="sm">{s.sessionType}</Badge>
                    <span className="adm-session-record-date">{new Date(s.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  {s.notes && (
                    <div className="adm-session-notes">
                      {s.notes.careerPaths?.length > 0 && <p><strong>Career Paths:</strong> {s.notes.careerPaths.join(', ')}</p>}
                      {s.notes.actionPlan && <p><strong>Action Plan:</strong> {s.notes.actionPlan}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'payments' && (
          <div className="adm-panel-content">
            <div className="adm-payment-list">
              {(student.paymentHistory || []).length === 0 ? (
                <p className="adm-empty-state">No payment records</p>
              ) : student.paymentHistory.map((p, i) => (
                <div key={i} className="adm-payment-item">
                  <div>
                    <div className="adm-payment-desc">{p.description}</div>
                    <div className="adm-payment-date">{new Date(p.date).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div className="adm-payment-amount adm-text-green">₹{p.amount?.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div className="adm-panel-content">
            <div className="adm-doc-list">
              {(student.documents || []).length === 0 ? (
                <p className="adm-empty-state">No documents uploaded</p>
              ) : student.documents.map((doc, i) => (
                <div key={i} className="adm-doc-item">
                  <span>📄</span>
                  <span>{doc.name}</span>
                  <Badge variant="gray" size="sm">{doc.type}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'notes' && (
          <div className="adm-panel-content">
            <div className="adm-notes-section">
              <label className="adm-detail-label">Counselor Notes</label>
              <p className="adm-note-text">{student.counselorNotes || 'No counselor notes yet'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';

export default function Students() {
  const { students, sessions } = useData();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = students.filter(s => {
    if (user?.role === 'Counselor' && s.counselorId !== user.id) {
      return false;
    }
    const q = search.toLowerCase();
    const matchSearch = !search || s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.city?.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Students">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Student Management</h1>
          <p className="adm-page-subtitle">{students.length} enrolled students</p>
        </div>
        <button className="adm-btn adm-btn-primary">+ Add Student</button>
      </div>

      <div className="adm-filters-bar">
        <div className="adm-search-wrap">
          <svg className="adm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="adm-search-input" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="adm-select adm-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="adm-students-grid">
        {filtered.map(student => {
          const studentSessions = sessions.filter(s => s.studentId === student.id).length;
          const lastSession = sessions.filter(s => s.studentId === student.id && s.status === 'Completed').sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt))[0];
          return (
            <div key={student.id} className="adm-student-card" onClick={() => setSelectedStudent(student)}>
              <div className="adm-student-card-header">
                <div className="adm-avatar adm-avatar-lg" style={{ background: '#6366f120', color: '#6366f1', fontSize: '1.1rem' }}>
                  {student.name?.charAt(0)}
                </div>
                <div className="adm-student-card-info">
                  <div className="adm-student-name">{student.name}</div>
                  <div className="adm-student-meta">{student.city} · {student.education}</div>
                  <Badge variant={student.status === 'Active' ? 'green' : 'gray'} size="sm">{student.status}</Badge>
                </div>
              </div>

              <div className="adm-student-progress">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="adm-td-sub">Progress</span>
                  <span className="adm-td-sub">{student.progressScore || 0}%</span>
                </div>
                <div className="adm-progress-track">
                  <div className="adm-progress-bar" style={{ width: `${student.progressScore || 0}%` }} />
                </div>
              </div>

              <div className="adm-student-stats">
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val">{studentSessions}</span>
                  <span className="adm-student-stat-label">Sessions</span>
                </div>
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val">{(student.recommendedPaths || []).length}</span>
                  <span className="adm-student-stat-label">Paths</span>
                </div>
                <div className="adm-student-stat">
                  <span className="adm-student-stat-val">
                    {lastSession ? new Date(lastSession.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </span>
                  <span className="adm-student-stat-label">Last Session</span>
                </div>
              </div>

              <div className="adm-student-paths">
                {(student.recommendedPaths || []).slice(0, 2).map(p => <span key={p} className="adm-tag">{p}</span>)}
                {(student.recommendedPaths || []).length > 2 && <span className="adm-tag">+{(student.recommendedPaths || []).length - 2}</span>}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="adm-empty-state-full">No students found</div>
        )}
      </div>

      {selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          sessions={sessions}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </AdminLayout>
  );
}
