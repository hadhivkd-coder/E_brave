import React, { useState, useEffect, useCallback } from 'react';
import { useData } from '../../context/DataContext';
import { useNotifications } from '../../context/NotificationContext';
import '../../admin.css';

const EDUCATION_LEVELS = [
  '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'Post-Graduate', 'Other',
];

const SOURCES = [
  'Facebook Ad', 'Google Ad', 'Instagram', 'YouTube', 'Referral',
  'Website', 'WhatsApp', 'Walk-in', 'Cold Call', 'Other',
];

const STATUSES = [
  'New Lead', 'Contacted', 'Interested', 'Webinar Registered', 'Webinar Attended',
  'Counseling Booked', 'Counseling Completed', 'Converted', 'Not Interested', 'Closed',
];

const STATES_IN = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Other',
];

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  educationLevel: '',
  city: '',
  state: '',
  parentContact: '',
  source: '',
  assignedCounselor: '',
  leadScore: 5,
  tags: [],
  followUpDate: '',
  notes: '',
  status: 'New Lead',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit Indian phone number';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.source) errors.source = 'Source is required';
  return errors;
}

export default function LeadForm({ lead, onSuccess, onCancel }) {
  const { addLead, updateLead, team = [] } = useData();
  const { showToast } = useNotifications();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(lead);

  // Pre-fill for edit mode
  useEffect(() => {
    if (lead) {
      setForm({
        name:              lead.name || '',
        phone:             lead.phone || '',
        email:             lead.email || '',
        educationLevel:    lead.educationLevel || '',
        city:              lead.city || '',
        state:             lead.state || '',
        parentContact:     lead.parentContact || '',
        source:            lead.source || '',
        assignedCounselor: lead.assignedCounselor || '',
        leadScore:         lead.leadScore ?? 5,
        tags:              Array.isArray(lead.tags) ? lead.tags : [],
        followUpDate:      lead.followUpDate ? lead.followUpDate.slice(0, 10) : '',
        notes:             lead.notes || '',
        status:            lead.status || 'New Lead',
      });
    }
  }, [lead]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handleScoreChange = (e) => {
    setForm(prev => ({ ...prev, leadScore: Number(e.target.value) }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,/g, '');
      if (tag && !form.tags.includes(tag)) {
        setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, phone: form.phone.trim() };
      if (isEdit) {
        await updateLead(lead.id, payload);
        showToast({ variant: 'success', title: 'Lead Updated', message: `${form.name} has been updated.` });
      } else {
        await addLead(payload);
        showToast({ variant: 'success', title: 'Lead Added', message: `${form.name} was added successfully.` });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      showToast({ variant: 'error', title: 'Error', message: err.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = form.leadScore >= 8
    ? 'var(--adm-green)'
    : form.leadScore >= 5
    ? 'var(--adm-amber)'
    : 'var(--adm-red)';

  const counselors = team.filter(m => m.role === 'Counselor' || m.department === 'Counseling' || m.type === 'counselor');

  return (
    <form className="adm-lead-form" onSubmit={handleSubmit} noValidate>
      {/* Row 1: Name, Phone */}
      <div className="adm-form-row">
        <div className="adm-form-group">
          <label className="adm-form-label">Full Name <span className="adm-required">*</span></label>
          <input
            className={`adm-form-input${errors.name ? ' adm-form-input--error' : ''}`}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Student full name"
            autoComplete="off"
          />
          {errors.name && <span className="adm-form-error">{errors.name}</span>}
        </div>
        <div className="adm-form-group">
          <label className="adm-form-label">Phone <span className="adm-required">*</span></label>
          <input
            className={`adm-form-input${errors.phone ? ' adm-form-input--error' : ''}`}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            inputMode="numeric"
          />
          {errors.phone && <span className="adm-form-error">{errors.phone}</span>}
        </div>
      </div>

      {/* Row 2: Email, Parent Contact */}
      <div className="adm-form-row">
        <div className="adm-form-group">
          <label className="adm-form-label">Email</label>
          <input
            className={`adm-form-input${errors.email ? ' adm-form-input--error' : ''}`}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@email.com"
          />
          {errors.email && <span className="adm-form-error">{errors.email}</span>}
        </div>
        <div className="adm-form-group">
          <label className="adm-form-label">Parent Contact</label>
          <input
            className="adm-form-input"
            name="parentContact"
            value={form.parentContact}
            onChange={handleChange}
            placeholder="Parent phone number"
            maxLength={10}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Row 3: Education Level, Source */}
      <div className="adm-form-row">
        <div className="adm-form-group">
          <label className="adm-form-label">Education Level</label>
          <select
            className="adm-form-select"
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
          >
            <option value="">Select education level</option>
            {EDUCATION_LEVELS.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="adm-form-group">
          <label className="adm-form-label">Lead Source <span className="adm-required">*</span></label>
          <select
            className={`adm-form-select${errors.source ? ' adm-form-input--error' : ''}`}
            name="source"
            value={form.source}
            onChange={handleChange}
          >
            <option value="">Select source</option>
            {SOURCES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.source && <span className="adm-form-error">{errors.source}</span>}
        </div>
      </div>

      {/* Row 4: City, State */}
      <div className="adm-form-row">
        <div className="adm-form-group">
          <label className="adm-form-label">City</label>
          <input
            className="adm-form-input"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
        <div className="adm-form-group">
          <label className="adm-form-label">State</label>
          <select
            className="adm-form-select"
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option value="">Select state</option>
            {STATES_IN.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Assigned Counselor, Status */}
      <div className="adm-form-row">
        <div className="adm-form-group">
          <label className="adm-form-label">Assigned Counselor</label>
          <select
            className="adm-form-select"
            name="assignedCounselor"
            value={form.assignedCounselor}
            onChange={handleChange}
          >
            <option value="">Unassigned</option>
            {counselors.length > 0
              ? counselors.map(m => (
                <option key={m.id} value={m.name || m.id}>{m.name}</option>
              ))
              : (
                <option value="" disabled>No counselors found</option>
              )
            }
          </select>
        </div>
        <div className="adm-form-group">
          <label className="adm-form-label">Status</label>
          <select
            className="adm-form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lead Score slider */}
      <div className="adm-form-group">
        <label className="adm-form-label">
          Lead Score&nbsp;
          <span
            className="adm-score-badge"
            style={{ color: scoreColor, border: `1px solid ${scoreColor}` }}
          >
            {form.leadScore}/10
          </span>
        </label>
        <input
          className="adm-form-range"
          type="range"
          name="leadScore"
          min={1}
          max={10}
          value={form.leadScore}
          onChange={handleScoreChange}
          style={{ accentColor: scoreColor }}
        />
        <div className="adm-range-labels">
          <span>Cold (1)</span>
          <span>Warm (5)</span>
          <span>Hot (10)</span>
        </div>
      </div>

      {/* Follow-up Date */}
      <div className="adm-form-group">
        <label className="adm-form-label">Follow-up Date</label>
        <input
          className="adm-form-input"
          type="date"
          name="followUpDate"
          value={form.followUpDate}
          onChange={handleChange}
        />
      </div>

      {/* Tags */}
      <div className="adm-form-group">
        <label className="adm-form-label">Tags</label>
        <div className="adm-tags-input-wrap">
          {form.tags.map(tag => (
            <span key={tag} className="adm-tag">
              {tag}
              <button type="button" className="adm-tag-remove" onClick={() => handleRemoveTag(tag)}>×</button>
            </span>
          ))}
          <input
            className="adm-tags-input"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder={form.tags.length === 0 ? 'Type tag and press Enter…' : ''}
          />
        </div>
        <span className="adm-form-hint">Press Enter or comma to add a tag</span>
      </div>

      {/* Notes */}
      <div className="adm-form-group">
        <label className="adm-form-label">Notes</label>
        <textarea
          className="adm-form-textarea"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Additional notes about this lead…"
        />
      </div>

      {/* Actions */}
      <div className="adm-form-actions">
        <button
          type="button"
          className="adm-btn adm-btn--ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="adm-btn adm-btn--primary"
          disabled={loading}
        >
          {loading ? 'Saving…' : isEdit ? 'Update Lead' : 'Add Lead'}
        </button>
      </div>
    </form>
  );
}
