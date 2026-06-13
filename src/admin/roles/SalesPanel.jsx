import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Phone, TrendingUp, IndianRupee, Users, Clock, Target, CheckCircle, AlertCircle, Search, ChevronRight, Filter, MessageCircle, Calendar } from 'lucide-react';
import OmniProfile from '../components/lifecycle/OmniProfile';
import '../premium-dashboard.css';

export default function SalesPanel() {
  const { salesQueue } = useData();
  const { user } = useAuth();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');

  // Payment & KPI data
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchMyStats();
  }, [user]);

  const fetchMyStats = async () => {
    if (!user) return;
    setLoadingStats(true);
    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('sales_rep_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      const total = data.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
      setTotalRevenue(total);
      setRecentPayments(data.slice(0, 5));
    }
    setLoadingStats(false);
  };

  const filteredQueue = (salesQueue || []).filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(search.toLowerCase()) || (p.phone || '').includes(search);
    const matchesSource = sourceFilter === 'All' || (p.source || 'Manual Entry') === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const newLeads = (salesQueue || []).filter(p => p.lifecycle_stage === 'New Lead').length;
  const followUpDue = (salesQueue || []).filter(p => p.lifecycle_stage === 'Follow-up Required').length;
  const paidLeads = (salesQueue || []).filter(p => p.lifecycle_stage === 'Paid').length;
  const oldLeads = (salesQueue || []).filter(p => p.lifecycle_stage === 'Old Lead' || p.lifecycle_stage === 'Closed / Lost').length;
  const totalLeads = (salesQueue || []).length;
  const conversionRate = totalLeads > 0 ? Math.round((paidLeads / totalLeads) * 100) : 0;

  const stageColor = (stage) => {
    if (stage === 'New Lead') return { bg: 'rgba(99,102,241,0.12)', color: '#818cf8' };
    if (stage === 'Follow-up Required') return { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' };
    if (stage === 'Paid') return { bg: 'rgba(16,185,129,0.12)', color: '#10b981' };
    if (stage === 'Old Lead' || stage === 'Closed / Lost') return { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' };
    return { bg: 'rgba(100,116,139,0.12)', color: '#94a3b8' };
  };

  const sources = ['All', 'Website', 'Meta Ads', 'WhatsApp', 'Referral', 'Walk-in', 'Call Center', 'Manual Entry'];

  return (
    <AdminLayout title="Sales Command Center">
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)', gap: 0 }}>

        {/* LEFT PANEL - KPI + Queue */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* KPI Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              {
                icon: <IndianRupee size={22} />,
                label: 'Revenue Collected',
                value: loadingStats ? '...' : `₹${totalRevenue.toLocaleString()}`,
                color: '#10b981',
                bg: 'rgba(16,185,129,0.08)'
              },
              {
                icon: <Target size={22} />,
                label: 'Conversion Rate',
                value: `${conversionRate}%`,
                color: '#6366f1',
                bg: 'rgba(99,102,241,0.08)'
              },
              {
                icon: <Users size={22} />,
                label: 'Active Queue',
                value: totalLeads - oldLeads,
                color: '#3b82f6',
                bg: 'rgba(59,130,246,0.08)'
              },
              {
                icon: <AlertCircle size={22} />,
                label: 'Follow-ups Due',
                value: followUpDue,
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.08)'
              }
            ].map((kpi, i) => (
              <div key={i} style={{
                background: 'var(--adm-card)',
                border: '1px solid var(--adm-border)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: kpi.bg, color: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {kpi.icon}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, background: `linear-gradient(135deg, ${kpi.color}, ${kpi.color}aa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--adm-text-secondary)', fontWeight: 500 }}>{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Pipeline Snapshot */}
          <div style={{ background: 'var(--adm-card)', border: '1px solid var(--adm-border)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--adm-text-secondary)' }}>Pipeline Snapshot</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'New Leads', value: newLeads, color: '#818cf8' },
                { label: 'Follow-up', value: followUpDue, color: '#f59e0b' },
                { label: 'Old/Closed', value: oldLeads, color: '#ef4444' },
                { label: 'Closed / Paid', value: paidLeads, color: '#10b981' },
              ].map(item => (
                <div key={item.label} style={{ flex: 1, textAlign: 'center', padding: '16px', background: 'var(--adm-bg)', borderRadius: '12px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--adm-text-secondary)', marginTop: '4px' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Queue */}
          <div style={{ background: 'var(--adm-card)', border: '1px solid var(--adm-border)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--adm-border)' }}>
              <div>
                <h2 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700 }}>Execution Queue</h2>
                <p style={{ margin: 0, color: 'var(--adm-text-secondary)', fontSize: '0.85rem' }}>{filteredQueue.length} leads assigned to you</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <Filter size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--adm-text-secondary)' }} />
                  <select 
                    value={sourceFilter}
                    onChange={e => setSourceFilter(e.target.value)}
                    style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', fontSize: '13px', appearance: 'none' }}
                  >
                    {sources.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--adm-text-secondary)' }} />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid var(--adm-border)', background: 'var(--adm-bg)', color: 'var(--adm-text)', width: '200px', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredQueue.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', color: 'var(--adm-text-secondary)' }}>
                  <CheckCircle size={40} color="var(--adm-green)" style={{ margin: '0 auto 12px', display: 'block' }} />
                  <strong>Queue Empty!</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>No leads match the current filters.</p>
                </div>
              ) : filteredQueue.map(lead => {
                const sc = stageColor(lead.lifecycle_stage);
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedPerson(lead)}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      padding: '16px 20px', cursor: 'pointer', borderBottom: '1px solid var(--adm-border)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--adm-bg)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>
                          {(lead.name || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{lead.name}</div>
                          <div style={{ color: 'var(--adm-text-secondary)', fontSize: '0.82rem' }}>{lead.phone} · {lead.source || 'Manual Entry'}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, background: sc.bg, color: sc.color }}>
                          {lead.lifecycle_stage || 'New Lead'}
                        </span>
                        <ChevronRight size={16} color="var(--adm-text-secondary)" />
                      </div>
                    </div>

                    {/* Duty Checklist inline */}
                    <div style={{ display: 'flex', gap: '8px', paddingLeft: '54px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '4px', color: 'var(--adm-text-secondary)', border: '1px solid var(--adm-border)' }}>
                        <Phone size={12} /> Call Lead
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '4px', color: 'var(--adm-text-secondary)', border: '1px solid var(--adm-border)' }}>
                        <MessageCircle size={12} /> Send WhatsApp
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '4px', color: 'var(--adm-text-secondary)', border: '1px solid var(--adm-border)' }}>
                        <Calendar size={12} /> Book Counselor
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', background: 'var(--adm-bg)', padding: '4px 8px', borderRadius: '4px', color: 'var(--adm-text-secondary)', border: '1px solid var(--adm-border)' }}>
                        <IndianRupee size={12} /> Collect Payment
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Payments */}
          <div style={{ background: 'var(--adm-card)', border: '1px solid var(--adm-border)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--adm-text-secondary)' }}>Recent Payments You Closed</h3>
            {recentPayments.length === 0 ? (
              <div style={{ color: 'var(--adm-text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '24px', border: '1px dashed var(--adm-border)', borderRadius: '10px' }}>
                No payments recorded yet. Log your first payment from a lead's profile!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentPayments.map(p => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--adm-bg)', borderRadius: '10px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.description}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>{new Date(p.created_at).toLocaleDateString()}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>+₹{parseFloat(p.amount).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT PANEL - OmniProfile Slide-out */}
        {selectedPerson && (
          <div style={{
            width: '460px', flexShrink: 0, background: 'var(--adm-surface)',
            borderLeft: '1px solid var(--adm-border)', height: '100%', overflowY: 'auto',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.3)', zIndex: 100
          }}>
            <OmniProfile personId={selectedPerson.id} personName={selectedPerson.name} onClose={() => setSelectedPerson(null)} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
