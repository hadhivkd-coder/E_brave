import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import AdminLayout from '../components/layout/AdminLayout';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { BarChart, DonutChart } from '../components/ui/Chart';
import { useNotifications } from '../context/NotificationContext';

export default function Finance() {
  const { finances, addTransaction } = useData();
  const { showToast } = useNotifications();
  const [showAdd, setShowAdd] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [form, setForm] = useState({ description: '', type: 'Revenue', amount: '', category: 'Counseling Revenue', date: new Date().toISOString().split('T')[0] });

  const filteredTransactions = finances.filter(t => {
    if (typeFilter === 'All') return true;
    return t.type === typeFilter;
  });

  const totalRev = finances.filter(f => f.type === 'Revenue').reduce((sum, f) => sum + f.amount, 0);
  const totalExp = finances.filter(f => f.type === 'Expense').reduce((sum, f) => sum + f.amount, 0);
  const netProfit = totalRev - totalExp;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    addTransaction({
      description: form.description,
      type: form.type,
      amount: +form.amount,
      category: form.category,
      date: form.date,
      linkedId: ''
    });
    setForm({ description: '', type: 'Revenue', amount: '', category: 'Counseling Revenue', date: new Date().toISOString().split('T')[0] });
    setShowAdd(false);
    showToast('Transaction added successfully', 'success');
  };

  // Prepare monthly data for revenue bar chart (6 months mock)
  const monthlyData = [
    { label: 'Dec', value: 85000 },
    { label: 'Jan', value: 104000 },
    { label: 'Feb', value: 92000 },
    { label: 'Mar', value: 125000 },
    { label: 'Apr', value: 110000 },
    { label: 'May', value: totalRev }
  ];

  // Donut chart data categories for expenses
  const expenseCategories = finances
    .filter(f => f.type === 'Expense')
    .reduce((acc, current) => {
      const existing = acc.find(x => x.label === current.category);
      if (existing) {
        existing.value += current.amount;
      } else {
        acc.push({ label: current.category || 'Other', value: current.amount });
      }
      return acc;
    }, []);

  return (
    <AdminLayout title="Financial Tracking">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Financial Operational Panel</h1>
          <p className="adm-page-subtitle">Monitor educational revenue streams, ad costs, and subscription expenses</p>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={() => setShowAdd(true)}>+ Add Transaction</button>
      </div>

      {/* Summary Row */}
      <div className="adm-metrics-grid adm-metrics-grid-4">
        {[
          { label: 'Total Revenue', value: `₹${totalRev.toLocaleString()}`, change: 12.4, color: '#10b981', icon: '📈' },
          { label: 'Operational Expenses', value: `₹${totalExp.toLocaleString()}`, change: -4.2, color: '#ef4444', icon: '📉' },
          { label: 'Net Profit Margin', value: `₹${netProfit.toLocaleString()}`, change: 8.9, color: '#6366f1', icon: '💰' },
          { label: 'CAC / Ad Return ROI', value: '2.8x', change: 15, color: '#3b82f6', icon: '🎯' }
        ].map(s => (
          <div key={s.label} className="adm-card adm-stat-mini">
            <div className="adm-stat-mini-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="adm-stat-mini-value" style={{ color: s.color }}>{s.value}</div>
            <div className="adm-stat-mini-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="adm-funnel-container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="adm-card">
          <h3 className="adm-card-title" style={{ marginBottom: 16 }}>Revenue Performance Trend</h3>
          <div style={{ height: 260 }}>
            <BarChart data={monthlyData} height={200} title="Monthly Intake Revenue (INR)" />
          </div>
        </div>
        <div className="adm-card">
          <h3 className="adm-card-title" style={{ marginBottom: 16 }}>Expense Category Share</h3>
          <div style={{ height: 260, display: 'flex', justifyContent: 'center' }}>
            {expenseCategories.length > 0 ? (
              <DonutChart data={expenseCategories} size={180} />
            ) : (
              <p className="adm-empty-state" style={{ marginTop: 80 }}>No expense records logged yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="adm-filters-bar">
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Revenue', 'Expense'].map(type => (
            <button
              key={type}
              className={`adm-filter-chip ${typeFilter === type ? 'active' : ''}`}
              onClick={() => setTypeFilter(type)}
            >
              {type}s
            </button>
          ))}
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(trans => (
                <tr key={trans.id}>
                  <td className="adm-td-sub">{trans.date}</td>
                  <td className="adm-td-name">{trans.description}</td>
                  <td><Badge variant="indigo" size="sm">{trans.category}</Badge></td>
                  <td><Badge variant={trans.type === 'Revenue' ? 'green' : 'red'} size="sm">{trans.type}</Badge></td>
                  <td className={trans.type === 'Revenue' ? 'adm-text-green' : 'adm-text-red'} style={{ fontWeight: 'bold' }}>
                    {trans.type === 'Revenue' ? '+' : '-'} ₹{trans.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr><td colSpan={5} className="adm-table-empty">No transactions found matching filter parameters</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Record Operational Transaction" size="md">
        <form onSubmit={handleAdd} className="adm-form-stack">
          <div className="adm-form-group">
            <label>Transaction Description *</label>
            <input className="adm-input" required value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} placeholder="e.g. Meta ad spends invoice" />
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Flow Type *</label>
              <select className="adm-select" value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value, category: e.target.value === 'Revenue' ? 'Counseling Revenue' : 'Ad Spend' }))}>
                <option>Revenue</option>
                <option>Expense</option>
              </select>
            </div>
            <div className="adm-form-group">
              <label>Amount (₹) *</label>
              <input type="number" className="adm-input" required value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} />
            </div>
          </div>
          <div className="adm-input-row">
            <div className="adm-form-group">
              <label>Accounting Category</label>
              <select className="adm-select" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}>
                {form.type === 'Revenue' ? (
                  <>
                    <option>Counseling Revenue</option>
                    <option>Webinar Revenue</option>
                    <option>Other Revenue</option>
                  </>
                ) : (
                  <>
                    <option>Ad Spend</option>
                    <option>Subscription</option>
                    <option>Freelancer Payment</option>
                    <option>Operational</option>
                  </>
                )}
              </select>
            </div>
            <div className="adm-form-group">
              <label>Date *</label>
              <input type="date" className="adm-input" required value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
            <button type="submit" className="adm-btn adm-btn-primary">Record Transaction</button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
