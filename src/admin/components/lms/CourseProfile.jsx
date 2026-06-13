import React from 'react';
import Badge from '../ui/Badge';

export default function CourseProfile({ course, onClose }) {
  if (!course) return null;

  // Simulate parsing the config_json of the engagement
  const syllabus = course.config_json?.syllabus || [];
  const instructor = course.config_json?.instructor || 'TBD';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--adm-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--adm-border)' }}>
      {/* Header */}
      <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid var(--adm-border)', background: 'linear-gradient(to bottom, rgba(99, 102, 241, 0.05), transparent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Badge variant="indigo" size="sm">Cohort: {course.cohort}</Badge>
              <Badge variant={course.status === 'Active' ? 'green' : 'blue'} size="sm">{course.status}</Badge>
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700 }}>{course.title}</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
              <span>👨‍🏫 Lead Instructor: {instructor}</span>
              <span>📅 Starts: {new Date(course.start_date).toLocaleDateString()}</span>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--adm-text-secondary)', transition: 'color 0.2s' }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Course Analytics Snippet */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Active Enrollments</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{course.enrollments}</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Completion Rate</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>14%</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>At Risk Students</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--adm-red)' }}>2</div>
          </div>
        </div>

        {/* Curriculum Map */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Curriculum Map (Syllabus)</span>
            <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>Edit Syllabus</button>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {syllabus.map((mod, index) => (
              <div key={index} style={{ padding: '16px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ background: 'var(--adm-surface)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px', color: 'var(--adm-accent)', border: '1px solid var(--adm-border)' }}>
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{mod.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--adm-text-secondary)' }}>{mod.lessons} Lessons • {mod.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Roster */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Enrollment Roster</span>
            <button className="adm-btn adm-btn-sm" style={{ padding: '4px 8px', fontSize: '12px' }}>View All</button>
          </h3>
          <div style={{ background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '8px', padding: '16px', textAlign: 'center', color: 'var(--adm-text-secondary)', fontSize: '13px' }}>
            Querying `person_engagements` table to load roster...
            <div style={{ marginTop: '8px' }}>
               <span className="adm-spinner" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
