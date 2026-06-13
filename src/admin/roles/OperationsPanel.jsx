import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import { BarChart2, PieChart, TrendingDown, Target, Filter, ChevronRight, Activity } from 'lucide-react';
import '../premium-dashboard.css';

export default function OperationsPanel() {
  const { pipelineData } = useData();
  const [timeFilter, setTimeFilter] = useState('This Month');

  // Calculate high-level stats from pipelineData
  const totalLeads = pipelineData.length;
  const closedPaid = pipelineData.filter(p => p.lifecycle_stage === 'Paid').length;
  const lostLeads = pipelineData.filter(p => p.lifecycle_stage === 'Closed / Lost' || p.lifecycle_stage === 'Old Lead').length;
  const activeLeads = totalLeads - closedPaid - lostLeads;

  // Mock Source Analytics Data
  const sourceAnalytics = [
    { source: 'Meta Ads (Campaign A)', total: 420, converted: 12, lost: 380, conversionRate: '2.8%' },
    { source: 'Meta Ads (Campaign B)', total: 150, converted: 8, lost: 120, conversionRate: '5.3%' },
    { source: 'Website Organic', total: 85, converted: 15, lost: 40, conversionRate: '17.6%' },
    { source: 'WhatsApp Direct', total: 40, converted: 12, lost: 15, conversionRate: '30.0%' },
    { source: 'Referral', total: 25, converted: 18, lost: 2, conversionRate: '72.0%' },
  ];

  // Mock Lost Reasons Data
  const lostReasons = [
    { reason: 'Too Expensive / Can\'t Afford', count: 245, percentage: 45 },
    { reason: 'Not Reachable / Fake Number', count: 180, percentage: 33 },
    { reason: 'Not Interested (Accidental Click)', count: 95, percentage: 17 },
    { reason: 'Chose Competitor', count: 25, percentage: 5 },
  ];

  return (
    <AdminLayout title="Operations Analytics">
      <div style={{ padding: '24px', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Lead Quality & Conversion Analytics</h2>
            <p style={{ color: 'var(--adm-text-secondary)', margin: '4px 0 0 0' }}>Monitor ad performance, sales velocity, and drop-off reasons.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={timeFilter}
              onChange={e => setTimeFilter(e.target.value)}
              className="adm-input"
              style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-surface)', color: 'var(--adm-text)', fontWeight: 600 }}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        {/* Top KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
          {[
            { label: 'Total Leads Generated', value: totalLeads, color: '#3b82f6', icon: <Activity size={20} /> },
            { label: 'Active in Pipeline', value: activeLeads, color: '#f59e0b', icon: <Target size={20} /> },
            { label: 'Total Converted', value: closedPaid, color: '#10b981', icon: <BarChart2 size={20} /> },
            { label: 'Total Lost / Junk', value: lostLeads, color: '#ef4444', icon: <TrendingDown size={20} /> },
          ].map((kpi, i) => (
            <div key={i} style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ background: `${kpi.color}15`, color: kpi.color, padding: '8px', borderRadius: '8px' }}>
                  {kpi.icon}
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--adm-text)', lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginTop: '8px', fontWeight: 500 }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          {/* Lead Source Performance */}
          <div style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} color="var(--adm-blue)" /> Campaign & Source Performance
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--adm-border)', textAlign: 'left', color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '12px 0', fontWeight: 600 }}>Source / Campaign</th>
                  <th style={{ padding: '12px 0', fontWeight: 600 }}>Total Leads</th>
                  <th style={{ padding: '12px 0', fontWeight: 600 }}>Converted</th>
                  <th style={{ padding: '12px 0', fontWeight: 600 }}>Lost / Junk</th>
                  <th style={{ padding: '12px 0', fontWeight: 600 }}>Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {sourceAnalytics.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--adm-border)' }}>
                    <td style={{ padding: '16px 0', fontWeight: 600 }}>{row.source}</td>
                    <td style={{ padding: '16px 0' }}>{row.total}</td>
                    <td style={{ padding: '16px 0', color: 'var(--adm-green)', fontWeight: 600 }}>{row.converted}</td>
                    <td style={{ padding: '16px 0', color: 'var(--adm-red)' }}>{row.lost}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                        {row.conversionRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lost Reasons Breakdown */}
          <div style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={18} color="var(--adm-red)" /> Lost Reasons Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {lostReasons.map((reason, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 500 }}>{reason.reason}</span>
                    <span style={{ color: 'var(--adm-text-secondary)' }}>{reason.count} leads ({reason.percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--adm-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--adm-red)', width: `${reason.percentage}%`, borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: 'var(--adm-red)' }}>Operations Insight</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--adm-text-secondary)', lineHeight: 1.5 }}>
                45% of lost leads cited "Too Expensive". Consider introducing a lower-tier introductory product or pushing easier EMI options during the sales pitch to recover these leads.
              </p>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
