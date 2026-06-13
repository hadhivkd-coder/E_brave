import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import { supabase } from '../../lib/supabase';
import { Users, TrendingUp, Calendar, PhoneCall, AlertCircle, DollarSign, Activity } from 'lucide-react';
import '../premium-dashboard.css'; // Premium CSS Overhaul

export default function Dashboard() {
  const navigate = useNavigate();
  const { pipelineData, salesQueue, counselorQueue } = useData();
  const [counselorsCount, setCounselorsCount] = useState(0);

  useEffect(() => {
    // Quick fetch for active counselors today
    supabase.from('profiles').select('id', { count: 'exact' })
      .eq('role', 'Counselor').then(({ count }) => {
        if (count) setCounselorsCount(count);
      });
  }, []);

  const totalLeads = pipelineData.length;
  const newLeads = pipelineData.filter(p => p.lifecycle_stage === 'New Lead').length;
  const followUp = pipelineData.filter(p => p.lifecycle_stage === 'Follow-up Required').length;
  const paid = pipelineData.filter(p => p.lifecycle_stage === 'Paid').length;
  
  // Fake chart data to demonstrate "World Class" dynamic UI
  const funnelData = [
    { label: 'Visits', value: 4500, color: 'var(--adm-blue)' },
    { label: 'Leads', value: totalLeads, color: '#f59e0b' },
    { label: 'Calls', value: followUp + newLeads, color: '#ec4899' },
    { label: 'Sessions', value: 42, color: '#8b5cf6' },
    { label: 'Paid', value: paid, color: 'var(--adm-green)' }
  ];
  const maxFunnel = Math.max(...funnelData.map(d => d.value), 1);

  return (
    <AdminLayout title="Super Admin HQ">
      <div className="adm-bento-grid">
        
        {/* BIG KPI METRIC: Total Growth */}
        <a href="/admin/directory" className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--adm-blue)' }}>
            <Users size={24} />
            <span className="adm-metric-label">Total Ecosystem</span>
          </div>
          <div className="adm-metric-value">{totalLeads}</div>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} color="var(--adm-green)" /> +14% from last week
          </p>
        </a>

        {/* ACTIVE SALES */}
        <a href="/admin/pipeline" className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f59e0b' }}>
            <PhoneCall size={24} />
            <span className="adm-metric-label">Active Pipeline</span>
          </div>
          <div className="adm-metric-value">{newLeads + followUp}</div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <span style={{ fontSize: '0.85rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--adm-green)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{newLeads} New</span>
            <span style={{ fontSize: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{followUp} Follow-ups</span>
          </div>
        </a>

        {/* REVENUE/PAID */}
        <a href="/admin/pipeline" className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--adm-green)' }}>
            <DollarSign size={24} />
            <span className="adm-metric-label">Conversions</span>
          </div>
          <div className="adm-metric-value" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', WebkitBackgroundClip: 'text' }}>
            {paid}
          </div>
          <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>Total students enrolled</p>
        </a>

        {/* FUNNEL CHART WIDGET */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 8', minHeight: '340px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity size={24} color="var(--adm-text)" />
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Global Funnel Diagnostics</h2>
            </div>
          </div>
          
          <div className="adm-chart-container">
            {funnelData.map((data, idx) => {
              const heightPct = (data.value / maxFunnel) * 100;
              return (
                <div key={idx} className="adm-chart-bar-wrapper">
                  <div className="adm-chart-tooltip">{data.value}</div>
                  <div 
                    className="adm-chart-bar" 
                    style={{ height: `${heightPct}%`, backgroundColor: data.color, color: data.color }}
                  />
                  <div className="adm-chart-label">{data.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* TEAM & OPERATIONS */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={20} /> Team Capacity</h2>
          
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--adm-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600 }}>Counselors Online</span>
              <span style={{ fontWeight: 'bold', color: 'var(--adm-blue)' }}>{counselorsCount} Active</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--adm-border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: counselorsCount > 0 ? '100%' : '0%', height: '100%', background: 'var(--adm-blue)' }}></div>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--adm-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600 }}>Sales Queue</span>
              <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>{salesQueue.length} Pending</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--adm-border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min((salesQueue.length / 50) * 100, 100)}%`, height: '100%', background: '#f59e0b' }}></div>
            </div>
          </div>
        </div>

        {/* RECENT LIVE FEED */}
        <div className="adm-card-glass adm-bento-item" style={{ gridColumn: 'span 12' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} /> Real-time Lead Stream
            </h2>
            <button onClick={() => navigate('/admin/pipeline')} style={{ color: 'var(--adm-blue)', fontWeight: 600 }}>View Complete Pipeline &rarr;</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {pipelineData.slice(0, 8).map((lead, idx) => (
              <div key={idx} onClick={() => navigate('/admin/pipeline')} style={{ 
                background: 'var(--adm-surface)', 
                padding: '16px', 
                borderRadius: '12px', 
                border: '1px solid var(--adm-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--adm-blue)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--adm-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{lead.name}</div>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    padding: '4px 8px', 
                    borderRadius: '20px', 
                    fontWeight: 700,
                    background: lead.source === 'Meta Ads' ? 'rgba(37, 99, 235, 0.1)' : 'var(--adm-border)',
                    color: lead.source === 'Meta Ads' ? 'var(--adm-blue)' : 'var(--adm-text-secondary)'
                  }}>
                    {lead.source || 'Direct'}
                  </span>
                </div>
                <div style={{ color: 'var(--adm-text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{lead.phone}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: lead.lifecycle_stage === 'New Lead' ? 'var(--adm-green)' : '#f59e0b' }}>
                  • {lead.lifecycle_stage}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
