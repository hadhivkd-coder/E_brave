import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import { FileText, Video, Mail, Megaphone } from 'lucide-react';
import '../premium-dashboard.css';

export default function ContentPanel() {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Content Studio">
      <div className="adm-bento-grid">
        
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 3', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/admin/courses')}>
          <Video size={32} color="var(--adm-blue)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px' }}>LMS & Courses</h3>
          <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>Upload video modules</p>
        </div>

        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 3', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/admin/events')}>
          <Megaphone size={32} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px' }}>Webinars</h3>
          <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>Schedule live events</p>
        </div>

        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 3', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/admin/knowledge-base')}>
          <FileText size={32} color="var(--adm-green)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px' }}>Knowledge Base</h3>
          <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>Write articles</p>
        </div>

        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 3', textAlign: 'center', cursor: 'pointer' }}>
          <Mail size={32} color="var(--adm-purple)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ margin: '0 0 8px' }}>Email Sequences</h3>
          <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>Manage active drip campaigns</p>
        </div>

        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 12', marginTop: '24px' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '1.25rem' }}>Active Campaign Performance</h2>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--adm-border)', borderRadius: '12px', color: 'var(--adm-text-secondary)' }}>
            Connect Google Analytics or Meta Pixel to view campaign ROI here.
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
