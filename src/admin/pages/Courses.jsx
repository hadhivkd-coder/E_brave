import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import CourseProfile from '../components/lms/CourseProfile';
import Badge from '../components/ui/Badge';

// Mocking the Universal Engagements Data
const MOCK_COURSES = [
  { 
    id: '1', 
    title: 'Ivy League Application Masterclass', 
    type: 'Course', 
    status: 'Active', 
    cohort: 'Fall 2026',
    enrollments: 142,
    start_date: new Date(Date.now() - 864000000).toISOString(),
    config_json: {
      instructor: 'Dr. Emily Chen',
      syllabus: [
        { title: 'Module 1: Crafting the Narrative', lessons: 4, duration: '2h 15m' },
        { title: 'Module 2: The Personal Statement', lessons: 6, duration: '3h 45m' },
        { title: 'Module 3: Recommendation Letters', lessons: 3, duration: '1h 30m' },
      ]
    }
  },
  { 
    id: '2', 
    title: 'Future Tech & AI Readiness', 
    type: 'Course', 
    status: 'Upcoming', 
    cohort: 'Winter 2026',
    enrollments: 89,
    start_date: new Date(Date.now() + 2592000000).toISOString(),
    config_json: {
      instructor: 'Alex Mercer',
      syllabus: [
        { title: 'Module 1: Intro to AI Concepts', lessons: 5, duration: '3h 00m' },
        { title: 'Module 2: Ethical AI Use in College', lessons: 3, duration: '1h 45m' },
      ]
    }
  },
  { 
    id: '3', 
    title: 'SAT Excellence Prep', 
    type: 'Course', 
    status: 'Active', 
    cohort: 'Summer 2026',
    enrollments: 210,
    start_date: new Date(Date.now() - 4320000000).toISOString(),
    config_json: {
      instructor: 'Marcus Johnson',
      syllabus: [
        { title: 'Math: Advanced Algebra', lessons: 8, duration: '4h 00m' },
        { title: 'Reading: Comprehension Speed', lessons: 6, duration: '3h 20m' },
      ]
    }
  },
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this queries the `engagements` table where `type = 'Course'`
    setLoading(true);
    setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 400);
  }, []);

  return (
    <AdminLayout title="Courses & LMS">
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        
        {/* Left Pane: Course Catalog */}
        <div style={{ width: '420px', flexShrink: 0, borderRight: '1px solid var(--adm-border)', display: 'flex', flexDirection: 'column', background: 'var(--adm-bg)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--adm-border)' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0' }}>Course Catalog</h1>
            <input 
              type="text" 
              placeholder="Search active engagements..." 
              className="adm-input" 
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {loading ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--adm-text-secondary)' }}>Loading catalog...</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {courses.map(course => {
                  const isSelected = selectedCourse?.id === course.id;
                  return (
                    <div 
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      style={{
                        padding: '16px',
                        background: isSelected ? 'var(--adm-surface)' : 'transparent',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--adm-accent)' : 'var(--adm-border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600, fontSize: '15px', lineHeight: 1.3 }}>{course.title}</div>
                        <Badge variant={course.status === 'Active' ? 'green' : 'blue'} size="sm">
                          {course.status}
                        </Badge>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <div style={{ fontSize: '13px', color: 'var(--adm-text-secondary)' }}>
                          Cohort: {course.cohort}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--adm-text)', background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--adm-border)' }}>
                          {course.enrollments} Enrolled
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Course Master Profile */}
        <div style={{ flex: 1, background: 'var(--adm-bg)', overflow: 'hidden', padding: '16px' }}>
          {selectedCourse ? (
            <CourseProfile 
              course={selectedCourse} 
              onClose={() => setSelectedCourse(null)} 
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-text-secondary)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--adm-text)' }}>No Course Selected</div>
              <p style={{ marginTop: '8px' }}>Select a learning program from the catalog to manage curriculums and rosters.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
