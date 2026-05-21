import React, { createContext, useContext, useState, useEffect } from 'react';
import mockData from '../data/mockData';
import { supabase } from '../../supabaseClient';

const DataContext = createContext(null);

const isSupabaseConfigured = () => {
  return true;
};

// ────────────────────────────────────────────────────────
// MAPPING HELPERS (Database snake_case <=> Frontend camelCase)
// ────────────────────────────────────────────────────────

const mapLeadFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    name: db.name,
    phone: db.phone,
    email: db.email,
    education: db.education,
    city: db.city,
    state: db.state,
    parentContact: db.parent_contact,
    source: db.source,
    counselorId: db.counselor_id,
    leadScore: db.lead_score,
    notes: db.notes,
    tags: db.tags || [],
    followUpDate: db.follow_up_date,
    status: db.status,
    createdAt: db.created_at,
    activityHistory: db.activity_history || []
  };
};

const mapLeadToDB = (fe) => {
  if (!fe) return null;
  return {
    name: fe.name,
    phone: fe.phone,
    email: fe.email,
    education: fe.education,
    city: fe.city,
    state: fe.state,
    parent_contact: fe.parentContact,
    source: fe.source || 'Google',
    counselor_id: fe.counselorId || null,
    lead_score: Number(fe.leadScore) || 1,
    notes: fe.notes,
    tags: fe.tags || [],
    follow_up_date: fe.followUpDate || null,
    status: fe.status || 'New Lead'
  };
};

const mapStudentFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    leadId: db.lead_id,
    name: db.name,
    phone: db.phone,
    email: db.email,
    education: db.education,
    city: db.city,
    counselorId: db.counselor_id,
    enrolledDate: db.enrolled_date,
    status: db.status,
    recommendedPaths: db.recommended_paths || [],
    counselorNotes: db.counselor_notes,
    progressScore: db.progress_score,
    parentNotes: db.parent_notes,
    createdAt: db.created_at,
    paymentHistory: db.payment_history || [],
    documents: db.documents || []
  };
};

const mapStudentToDB = (fe) => {
  if (!fe) return null;
  return {
    lead_id: fe.leadId || null,
    name: fe.name,
    phone: fe.phone,
    email: fe.email,
    education: fe.education,
    city: fe.city,
    counselor_id: fe.counselorId || null,
    enrolled_date: fe.enrolledDate || new Date().toISOString().split('T')[0],
    status: fe.status || 'Active',
    recommended_paths: fe.recommendedPaths || [],
    counselor_notes: fe.counselorNotes || '',
    progress_score: Number(fe.progressScore) || 10,
    parent_notes: fe.parentNotes || ''
  };
};

const mapSessionFromDB = (db, studentsList = [], teamList = []) => {
  if (!db) return null;
  const stud = studentsList.find(s => s.id === db.student_id);
  const coun = teamList.find(t => t.id === db.counselor_id);
  return {
    id: db.id,
    studentId: db.student_id,
    studentName: stud?.name || 'Unknown Student',
    counselorId: db.counselor_id,
    counselorName: coun?.name || 'Unassigned',
    scheduledAt: db.scheduled_at,
    duration: db.duration,
    status: db.status,
    sessionType: db.session_type,
    notes: db.notes || {},
    followUpDate: db.follow_up_date,
    createdAt: db.created_at
  };
};

const mapSessionToDB = (fe) => {
  if (!fe) return null;
  return {
    student_id: fe.studentId,
    counselor_id: fe.counselorId || null,
    scheduled_at: fe.scheduledAt,
    duration: Number(fe.duration) || 30,
    status: fe.status || 'Scheduled',
    session_type: fe.sessionType || 'Initial',
    notes: fe.notes || {},
    follow_up_date: fe.followUpDate || null
  };
};

const mapWebinarFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    title: db.title,
    topic: db.topic,
    scheduledAt: db.scheduled_at,
    duration: db.duration,
    price: db.price,
    hostId: db.host_id,
    status: db.status,
    platform: db.platform,
    revenue: db.revenue,
    conversionCount: db.conversion_count,
    replayViews: db.replay_views,
    engagementScore: db.engagement_score,
    createdAt: db.created_at,
    registrations: db.registrations || [],
    attendees: db.attendees || []
  };
};

const mapWebinarToDB = (fe) => {
  if (!fe) return null;
  return {
    title: fe.title,
    topic: fe.topic,
    scheduled_at: fe.scheduledAt,
    duration: Number(fe.duration) || 60,
    price: Number(fe.price) || 0.00,
    host_id: fe.hostId || null,
    status: fe.status || 'Upcoming',
    platform: fe.platform || 'Zoom',
    revenue: Number(fe.revenue) || 0.00,
    conversion_count: Number(fe.conversionCount) || 0,
    replay_views: Number(fe.replayViews) || 0,
    engagement_score: Number(fe.engagementScore) || 0.0
  };
};

const mapContentFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    title: db.title,
    hook: db.hook,
    script: db.script,
    caption: db.caption,
    platform: db.platform,
    cta: db.cta,
    status: db.status,
    assignedTo: db.assigned_to,
    publishDate: db.publish_date,
    views: db.views,
    likes: db.likes,
    shares: db.shares,
    comments: db.comments,
    leadsGenerated: db.leads_generated,
    engagementRate: db.engagement_rate,
    createdAt: db.created_at
  };
};

const mapContentToDB = (fe) => {
  if (!fe) return null;
  return {
    title: fe.title,
    hook: fe.hook,
    script: fe.script,
    caption: fe.caption,
    platform: fe.platform,
    cta: fe.cta,
    status: fe.status || 'Idea',
    assigned_to: fe.assignedTo || null,
    publish_date: fe.publishDate || null,
    views: Number(fe.views) || 0,
    likes: Number(fe.likes) || 0,
    shares: Number(fe.shares) || 0,
    comments: Number(fe.comments) || 0,
    leads_generated: Number(fe.leadsGenerated) || 0,
    engagement_rate: Number(fe.engagementRate) || 0.0
  };
};

const mapTaskFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    title: db.title,
    description: db.description,
    status: db.status,
    priority: db.priority,
    assignedTo: db.assigned_to,
    dueDate: db.due_date,
    tags: db.tags || [],
    createdAt: db.created_at,
    comments: db.comments || []
  };
};

const mapTaskToDB = (fe) => {
  if (!fe) return null;
  return {
    title: fe.title,
    description: fe.description,
    status: fe.status || 'Todo',
    priority: fe.priority || 'Medium',
    assigned_to: fe.assignedTo || null,
    due_date: fe.dueDate || null,
    tags: fe.tags || []
  };
};

const mapProfileFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    name: db.name,
    role: db.role,
    phone: db.phone,
    status: db.status,
    joinedDate: db.joined_date,
    createdAt: db.created_at,
    avatar: db.name.split(' ').map(n => n[0]).join('').toUpperCase()
  };
};

const mapActivityFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    type: db.type,
    message: db.message,
    userId: db.user_id,
    relatedId: db.related_id,
    createdAt: db.created_at
  };
};

const mapNotificationFromDB = (db) => {
  if (!db) return null;
  return {
    id: db.id,
    userId: db.user_id,
    type: db.type,
    title: db.title,
    message: db.message,
    isRead: db.is_read,
    priority: db.priority,
    actionUrl: db.action_url,
    createdAt: db.created_at
  };
};

export function DataProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [content, setContent] = useState([]);
  const [finances, setFinances] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(mockData.MOCK_ANALYTICS);
  const [loading, setLoading] = useState(true);

  // Initialize and Fetch Live Data
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Local fallback mode
      setLeads(JSON.parse(localStorage.getItem('ebrave_leads')) || mockData.MOCK_LEADS);
      setStudents(JSON.parse(localStorage.getItem('ebrave_students')) || mockData.MOCK_STUDENTS);
      setSessions(JSON.parse(localStorage.getItem('ebrave_sessions')) || mockData.MOCK_SESSIONS);
      setWebinars(JSON.parse(localStorage.getItem('ebrave_webinars')) || mockData.MOCK_WEBINARS);
      setContent(JSON.parse(localStorage.getItem('ebrave_content')) || mockData.MOCK_CONTENT);
      setFinances(JSON.parse(localStorage.getItem('ebrave_finances')) || mockData.MOCK_TRANSACTIONS);
      setTasks(JSON.parse(localStorage.getItem('ebrave_tasks')) || mockData.MOCK_TASKS);
      setTeam(JSON.parse(localStorage.getItem('ebrave_team')) || mockData.MOCK_TEAM);
      setActivityLog(JSON.parse(localStorage.getItem('ebrave_activity_log')) || mockData.MOCK_ACTIVITY);
      setNotifications(JSON.parse(localStorage.getItem('ebrave_notifications')) || mockData.MOCK_NOTIFICATIONS);
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      try {
        const [
          { data: dbLeads, error: errLeads },
          { data: dbStudents, error: errStudents },
          { data: dbProfiles, error: errProfiles },
          { data: dbSessions, error: errSessions },
          { data: dbWebinars, error: errWebinars },
          { data: dbContent, error: errContent },
          { data: dbFinances, error: errFinances },
          { data: dbTasks, error: errTasks },
          { data: dbActivity, error: errActivity },
          { data: dbNotifications, error: errNotifications }
        ] = await Promise.all([
          supabase.from('leads').select('*').order('created_at', { ascending: false }),
          supabase.from('students').select('*').order('created_at', { ascending: false }),
          supabase.from('profiles').select('*').order('name'),
          supabase.from('counseling_sessions').select('*').order('scheduled_at', { ascending: false }),
          supabase.from('webinars').select('*').order('scheduled_at', { ascending: false }),
          supabase.from('content').select('*').order('created_at', { ascending: false }),
          supabase.from('transactions').select('*').order('date', { ascending: false }),
          supabase.from('tasks').select('*').order('created_at', { ascending: false }),
          supabase.from('activity_logs').select('*').order('created_at', { ascending: false }),
          supabase.from('notifications').select('*').order('created_at', { ascending: false })
        ]);

        if (errLeads) console.warn('[RLS/Auth Warning] leads fetch restricted:', errLeads.message);
        if (errStudents) console.warn('[RLS/Auth Warning] students fetch restricted:', errStudents.message);
        if (errProfiles) console.warn('[RLS/Auth Warning] profiles fetch restricted:', errProfiles.message);
        if (errSessions) console.warn('[RLS/Auth Warning] sessions fetch restricted:', errSessions.message);
        if (errWebinars) console.warn('[RLS/Auth Warning] webinars fetch restricted:', errWebinars.message);
        if (errContent) console.warn('[RLS/Auth Warning] content fetch restricted:', errContent.message);
        if (errFinances) console.warn('[RLS/Auth Warning] transactions fetch restricted:', errFinances.message);
        if (errTasks) console.warn('[RLS/Auth Warning] tasks fetch restricted:', errTasks.message);
        if (errActivity) console.warn('[RLS/Auth Warning] activity logs fetch restricted:', errActivity.message);
        if (errNotifications) console.warn('[RLS/Auth Warning] notifications fetch restricted:', errNotifications.message);

        const mappedTeam = (dbProfiles || []).map(mapProfileFromDB);
        const mappedStudents = (dbStudents || []).map(mapStudentFromDB);

        setTeam(mappedTeam);
        setStudents(mappedStudents);
        setLeads((dbLeads || []).map(mapLeadFromDB));
        setSessions((dbSessions || []).map(s => mapSessionFromDB(s, mappedStudents, mappedTeam)));
        setWebinars((dbWebinars || []).map(mapWebinarFromDB));
        setContent((dbContent || []).map(mapContentFromDB));
        setFinances(dbFinances || []);
        setTasks((dbTasks || []).map(mapTaskFromDB));
        setActivityLog((dbActivity || []).map(mapActivityFromDB));
        setNotifications((dbNotifications || []).map(mapNotificationFromDB));
      } catch (err) {
        console.error('Error fetching Supabase data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Set up real-time sync channel
    const realtimeChannel = supabase
      .channel('eos_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'counseling_sessions' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'webinars' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activity_logs' }, () => fetchAllData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => fetchAllData())
      .subscribe();

    return () => {
      supabase.removeChannel(realtimeChannel);
    };
  }, []);

  // Sync to local storage for mock fallback mode
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      localStorage.setItem('ebrave_leads', JSON.stringify(leads));
      localStorage.setItem('ebrave_students', JSON.stringify(students));
      localStorage.setItem('ebrave_sessions', JSON.stringify(sessions));
      localStorage.setItem('ebrave_webinars', JSON.stringify(webinars));
      localStorage.setItem('ebrave_content', JSON.stringify(content));
      localStorage.setItem('ebrave_finances', JSON.stringify(finances));
      localStorage.setItem('ebrave_tasks', JSON.stringify(tasks));
      localStorage.setItem('ebrave_team', JSON.stringify(team));
      localStorage.setItem('ebrave_activity_log', JSON.stringify(activityLog));
      localStorage.setItem('ebrave_notifications', JSON.stringify(notifications));
    }
  }, [leads, students, sessions, webinars, content, finances, tasks, team, activityLog, notifications]);

  // Log activity helper
  const logActivity = async (type, message, userId = null, relatedId = null, metadata = null) => {
    let formattedMessage = message;
    if (metadata) {
      const parts = [];
      if (metadata.actor) parts.push(`Actor: ${metadata.actor}`);
      if (metadata.entity) parts.push(`Entity: ${metadata.entity}`);
      if (metadata.previousValues) parts.push(`Prev: ${JSON.stringify(metadata.previousValues)}`);
      if (metadata.newValues) parts.push(`New: ${JSON.stringify(metadata.newValues)}`);
      if (parts.length > 0) {
        formattedMessage = `${message} (${parts.join(' | ')})`;
      }
    }

    const newAct = {
      type,
      message: formattedMessage,
      user_id: userId,
      related_id: relatedId
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('activity_logs').insert([newAct]);
      } catch (err) {
        console.error('Failed to log activity in DB:', err);
      }
    } else {
      const offlineAct = {
        id: `act_${Date.now()}`,
        ...newAct,
        userId: userId || 't1',
        relatedId: relatedId || '',
        createdAt: new Date().toISOString()
      };
      setActivityLog(prev => [offlineAct, ...prev]);
    }
  };

  // CRUD Leads
  const addLead = async (leadData) => {
    if (!isSupabaseConfigured()) {
      const newLead = {
        id: `l_${Date.now()}`,
        createdAt: new Date().toISOString(),
        activityHistory: [{ id: `ah_${Date.now()}`, message: 'Lead added manually', createdAt: new Date().toISOString() }],
        ...leadData
      };
      setLeads(prev => [newLead, ...prev]);
      logActivity('lead', `Added new lead: ${leadData.name}`);
      return;
    }

    try {
      const dbPayload = mapLeadToDB(leadData);
      const { data, error } = await supabase.from('leads').insert([dbPayload]).select();
      if (error) throw error;
      if (data && data[0]) {
        logActivity('lead', `Added new lead: ${leadData.name}`, null, data[0].id);
      }
    } catch (err) {
      console.error('Supabase addLead error:', err);
    }
  };

  const updateLead = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setLeads(prev => prev.map(l => {
        if (l.id === id) {
          if (updatedFields.status === 'Converted' && l.status !== 'Converted') {
            enrollStudentFromLead(l);
          }
          return {
            ...l,
            ...updatedFields,
            activityHistory: [
              ...(l.activityHistory || []),
              { id: `ah_${Date.now()}`, message: `Updated fields: ${Object.keys(updatedFields).join(', ')}`, createdAt: new Date().toISOString() }
            ]
          };
        }
        return l;
      }));
      logActivity('lead', `Updated lead details: ${id}`, 't1', id);
      return;
    }

    try {
      const dbPayload = mapLeadToDB(updatedFields);
      // Clean undefined keys
      Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);
      
      const { error } = await supabase.from('leads').update(dbPayload).eq('id', id);
      if (error) throw error;
      logActivity('lead', `Updated lead details: ${id}`, null, id);

      if (updatedFields.status === 'Converted') {
        const lead = leads.find(l => l.id === id);
        if (lead) enrollStudentFromLead({ ...lead, ...updatedFields });
      }
    } catch (err) {
      console.error('Supabase updateLead error:', err);
    }
  };

  const deleteLead = async (id, metadata = null) => {
    const lead = leads.find(l => l.id === id);
    const leadName = lead ? lead.name : id;
    
    if (!isSupabaseConfigured()) {
      setLeads(prev => prev.filter(l => l.id !== id));
      logActivity('lead', `Deleted lead: ${leadName}`, 't1', id, metadata);
      return;
    }

    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
      logActivity('lead', `Deleted lead: ${leadName}`, null, id, metadata);
    } catch (err) {
      console.error('Supabase deleteLead error:', err);
    }
  };

  // Helper: Auto-enroll student from lead
  const enrollStudentFromLead = async (lead) => {
    const isAlreadyStudent = students.some(s => s.leadId === lead.id || s.email === lead.email);
    if (isAlreadyStudent) return;

    if (!isSupabaseConfigured()) {
      const newStudent = {
        id: `s_${Date.now()}`,
        leadId: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        education: lead.education,
        city: lead.city,
        counselorId: lead.counselorId || 't3',
        enrolledDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        recommendedPaths: lead.tags || ['Career Discovery'],
        counselorNotes: lead.notes || '',
        progressScore: 10,
        paymentHistory: [],
        documents: []
      };
      setStudents(prev => [newStudent, ...prev]);
      logActivity('payment', `Student account created for converted lead: ${lead.name}`, 't1', newStudent.id);
      return;
    }

    try {
      const studentData = mapStudentToDB(lead);
      const { data, error } = await supabase.from('students').insert([studentData]).select();
      if (error) throw error;
      if (data && data[0]) {
        logActivity('payment', `Student account created for converted lead: ${lead.name}`, null, data[0].id);
      }
    } catch (err) {
      console.error('Supabase student enrollment error:', err);
    }
  };

  // CRUD Sessions
  const addSession = async (sessionData) => {
    if (!isSupabaseConfigured()) {
      const newSession = {
        id: `ses_${Date.now()}`,
        studentName: students.find(s => s.id === sessionData.studentId)?.name || 'Unknown Student',
        counselorName: team.find(t => t.id === sessionData.counselorId)?.name || 'Unassigned',
        status: 'Scheduled',
        ...sessionData
      };
      setSessions(prev => [newSession, ...prev]);
      logActivity('session', `Scheduled session for student: ${newSession.studentName}`, 't1', newSession.id);
      return;
    }

    try {
      const dbPayload = mapSessionToDB(sessionData);
      const { error } = await supabase.from('counseling_sessions').insert([dbPayload]);
      if (error) throw error;
      logActivity('session', 'Scheduled counseling session', null, sessionData.studentId);
    } catch (err) {
      console.error('Supabase addSession error:', err);
    }
  };

  const updateSession = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setSessions(prev => prev.map(s => {
        if (s.id === id) {
          if (updatedFields.status === 'Completed' && s.status !== 'Completed') {
            setStudents(studs => studs.map(st => {
              if (st.id === s.studentId) {
                return { ...st, progressScore: Math.min(100, (st.progressScore || 10) + 15) };
              }
              return st;
            }));
          }
          return { ...s, ...updatedFields };
        }
        return s;
      }));
      logActivity('session', `Updated session: ${id}`, 't1', id);
      return;
    }

    try {
      const dbPayload = mapSessionToDB(updatedFields);
      // Clean undefined keys
      Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

      const { error } = await supabase.from('counseling_sessions').update(dbPayload).eq('id', id);
      if (error) throw error;
      logActivity('session', `Updated counseling session status: ${id}`, null, id);
    } catch (err) {
      console.error('Supabase updateSession error:', err);
    }
  };

  // CRUD Tasks
  const addTask = async (taskData) => {
    if (!isSupabaseConfigured()) {
      const newTask = {
        id: `tsk_${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        comments: [],
        ...taskData
      };
      setTasks(prev => [newTask, ...prev]);
      logActivity('task', `Task created: ${taskData.title}`, 't1', newTask.id);
      return;
    }

    try {
      const dbPayload = mapTaskToDB(taskData);
      const { error } = await supabase.from('tasks').insert([dbPayload]);
      if (error) throw error;
      logActivity('task', `Task created: ${taskData.title}`);
    } catch (err) {
      console.error('Supabase addTask error:', err);
    }
  };

  const updateTask = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
      return;
    }

    try {
      const dbPayload = mapTaskToDB(updatedFields);
      // Clean undefined keys
      Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

      const { error } = await supabase.from('tasks').update(dbPayload).eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('Supabase updateTask error:', err);
    }
  };

  // CRUD Webinars
  const addWebinar = async (webinarData) => {
    if (!isSupabaseConfigured()) {
      const newWebinar = {
        id: `w_${Date.now()}`,
        registrations: [],
        attendees: [],
        revenue: 0,
        conversionCount: 0,
        replayViews: 0,
        status: 'Upcoming',
        ...webinarData
      };
      setWebinars(prev => [newWebinar, ...prev]);
      logActivity('webinar', `Created webinar: ${webinarData.title}`, 't1', newWebinar.id);
      return;
    }

    try {
      const dbPayload = mapWebinarToDB(webinarData);
      const { error } = await supabase.from('webinars').insert([dbPayload]);
      if (error) throw error;
      logActivity('webinar', `Created webinar: ${webinarData.title}`);
    } catch (err) {
      console.error('Supabase addWebinar error:', err);
    }
  };

  const updateWebinar = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setWebinars(prev => prev.map(w => w.id === id ? { ...w, ...updatedFields } : w));
      return;
    }

    try {
      const dbPayload = mapWebinarToDB(updatedFields);
      Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

      const { error } = await supabase.from('webinars').update(dbPayload).eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('Supabase updateWebinar error:', err);
    }
  };

  // CRUD Content
  const addContent = async (contentData) => {
    if (!isSupabaseConfigured()) {
      const newContent = {
        id: `c_${Date.now()}`,
        views: 0, likes: 0, shares: 0, comments: 0, leadsGenerated: 0, engagementRate: 0,
        ...contentData
      };
      setContent(prev => [newContent, ...prev]);
      logActivity('ai', `Drafted content: ${contentData.title}`, 't1', newContent.id);
      return;
    }

    try {
      const dbPayload = mapContentToDB(contentData);
      const { error } = await supabase.from('content').insert([dbPayload]);
      if (error) throw error;
      logActivity('ai', `Drafted content pipeline: ${contentData.title}`);
    } catch (err) {
      console.error('Supabase addContent error:', err);
    }
  };

  const updateContent = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setContent(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
      return;
    }

    try {
      const dbPayload = mapContentToDB(updatedFields);
      Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

      const { error } = await supabase.from('content').update(dbPayload).eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error('Supabase updateContent error:', err);
    }
  };

  // CRUD Transactions
  const addTransaction = async (transData) => {
    if (!isSupabaseConfigured()) {
      const newTrans = {
        id: `t_${Date.now()}`,
        ...transData
      };
      setFinances(prev => [newTrans, ...prev]);
      logActivity('payment', `${transData.type} transaction recorded: ${transData.description}`, 't1', newTrans.id);
      return;
    }

    try {
      const { error } = await supabase.from('transactions').insert([transData]);
      if (error) throw error;
      logActivity('payment', `${transData.type} transaction recorded: ${transData.description}`);
    } catch (err) {
      console.error('Supabase addTransaction error:', err);
    }
  };

  // Computed Dashboard Metrics
  const getMetrics = () => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => {
      const created = new Date(l.createdAt || l.created_at);
      const today = new Date();
      return created.toDateString() === today.toDateString();
    }).length;

    const completedSessionsCount = sessions.filter(s => s.status === 'Completed').length;
    const pendingSessionsCount = sessions.filter(s => s.status === 'Scheduled').length;

    const totalRev = finances.filter(f => f.type === 'Revenue').reduce((sum, f) => sum + Number(f.amount), 0);
    const totalExp = finances.filter(f => f.type === 'Expense').reduce((sum, f) => sum + Number(f.amount), 0);
    const netProfit = totalRev - totalExp;

    const conversionRate = totalLeads > 0
      ? ((leads.filter(l => l.status === 'Converted').length / totalLeads) * 100).toFixed(1)
      : '0.0';

    return {
      totalLeads,
      newLeads,
      completedSessions: completedSessionsCount,
      pendingSessions: pendingSessionsCount,
      totalRevenue: totalRev,
      totalExpense: totalExp,
      netProfit,
      conversionRate
    };
  };

  const addTeamMember = async (memberData) => {
    if (!isSupabaseConfigured()) {
      const newMember = {
        id: `t_${Date.now()}`,
        avatar: memberData.name.charAt(0).toUpperCase(),
        joinedDate: new Date().toISOString().split('T')[0],
        tasksCompleted: 0,
        activeLeads: 0,
        ...memberData
      };
      setTeam(prev => [newMember, ...prev]);
      logActivity('system', `Added team member: ${memberData.name}`);
      return;
    }
    try {
      const { data, error } = await supabase.rpc('create_new_staff_member', {
        staff_email: memberData.email,
        staff_password: memberData.tempPassword || 'EB-Start123',
        staff_name: memberData.name,
        staff_role: memberData.role,
        staff_phone: memberData.phone || ''
      });
      if (error) throw error;
      if (data && data.success) {
        const { data: newProfile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.userId)
          .single();
        if (!profileErr && newProfile) {
          setTeam(prev => [...prev, mapProfileFromDB(newProfile)]);
          logActivity('system', `Added team member: ${memberData.name}`);
        }
      }
    } catch (err) {
      console.error('Supabase addTeamMember error:', err);
      throw err;
    }
  };

  const updateTeamMember = async (id, updatedFields) => {
    if (!isSupabaseConfigured()) {
      setTeam(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
      logActivity('system', `Updated team member: ${id}`);
      return;
    }
    try {
      const { error } = await supabase.from('profiles').update({
        name: updatedFields.name,
        role: updatedFields.role,
        email: updatedFields.email,
        phone: updatedFields.phone,
        status: updatedFields.status
      }).eq('id', id);
      if (error) throw error;
      setTeam(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
      logActivity('system', `Updated team member: ${updatedFields.name}`);
    } catch (err) {
      console.error('Supabase updateTeamMember error:', err);
    }
  };

  const deleteTeamMember = async (id) => {
    if (!isSupabaseConfigured()) {
      setTeam(prev => prev.filter(t => t.id !== id));
      logActivity('system', `Removed team member: ${id}`);
      return;
    }
    try {
      const { data, error } = await supabase.rpc('delete_staff_member', {
        staff_id: id
      });
      if (error) throw error;
      if (data && data.success) {
        setTeam(prev => prev.filter(t => t.id !== id));
        logActivity('system', `Removed team member: ${id}`);
      }
    } catch (err) {
      console.error('Supabase deleteTeamMember error:', err);
      throw err;
    }
  };

  const resetTeamMemberPassword = async (id, newPassword) => {
    if (!isSupabaseConfigured()) {
      logActivity('system', `Reset password mock for team member: ${id}`);
      return { success: true };
    }
    try {
      const { data, error } = await supabase.rpc('reset_staff_password', {
        staff_id: id,
        new_password: newPassword
      });
      if (error) throw error;
      if (data && data.success) {
        logActivity('system', `Reset password for team member ID: ${id}`);
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.error('Supabase resetTeamMemberPassword error:', err);
      throw err;
    }
  };

  return (
    <DataContext.Provider value={{
      leads, students, sessions, webinars, content, finances, tasks, team, activityLog, analytics, notifications,
      metrics: getMetrics(),
      loading,
      logActivity,
      addLead, updateLead, deleteLead,
      addSession, updateSession,
      addTask, updateTask,
      addWebinar, updateWebinar,
      addContent, updateContent,
      addTransaction,
      addTeamMember, updateTeamMember, deleteTeamMember, resetTeamMemberPassword
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
