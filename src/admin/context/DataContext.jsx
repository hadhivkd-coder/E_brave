import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../lib/supabase';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Core Operational Data
  const [leads, setLeads] = useState([]);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [tasks, setTasks] = useState([]);
  
  // Secondary Data
  const [team, setTeam] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [finances, setFinances] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Deprecated/Removed modules (kept for UI backwards compatibility)
  const [content, setContent] = useState([]);
  const [analytics, setAnalytics] = useState({});
  
  const [loading, setLoading] = useState(true);

  const fetchRealData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch all tables in parallel
      const [
        { data: leadsData },
        { data: studentsData },
        { data: sessionsData },
        { data: tasksData },
        { data: profilesData },
        { data: webinarsData }
      ] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('enrolled_at', { ascending: false }),
        supabase.from('counseling_sessions').select('*').order('scheduled_at', { ascending: true }),
        supabase.from('tasks').select('*').order('due_date', { ascending: true }),
        supabase.from('profiles').select('*'),
        supabase.from('webinars').select('*')
      ]);

      // Mappings (snake_case -> camelCase) to avoid breaking existing UI
      setLeads((leadsData || []).map(l => ({
        id: l.id,
        name: l.name,
        phone: l.phone,
        email: l.email,
        education: l.education,
        city: l.city,
        source: l.source,
        status: l.status,
        leadScore: l.lead_score,
        counselorId: l.counselor_id,
        followUpDate: l.follow_up_date,
        parentContact: l.parent_contact,
        paymentStatus: l.payment_status || 'Pending',
        createdAt: l.created_at
      })));

      setStudents((studentsData || []).map(s => ({
        id: s.id,
        leadId: s.lead_id,
        name: s.name,
        phone: s.phone,
        email: s.email,
        education: s.education,
        city: s.city,
        status: s.status,
        paymentStatus: s.payment_status || 'Pending',
        counselorId: s.counselor_id,
        enrolledDate: s.enrolled_at
      })));

      setSessions((sessionsData || []).map(s => ({
        id: s.id,
        leadId: s.lead_id,
        studentId: s.student_id,
        counselorId: s.counselor_id,
        sessionType: s.session_type,
        status: s.status,
        scheduledAt: s.scheduled_at,
        duration: s.duration,
        notes: s.notes
      })));

      setTasks((tasksData || []).map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        assignedTo: t.assigned_to,
        dueDate: t.due_date,
        createdAt: t.created_at
      })));

      setTeam((profilesData || []).map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        role: p.role,
        department: p.department,
        status: p.status,
        joinedDate: p.created_at
      })));

      setWebinars((webinarsData || []).map(w => ({
        id: w.id,
        title: w.title,
        topic: w.topic,
        scheduledAt: w.scheduled_at,
        duration: w.duration,
        price: w.price,
        hostId: w.host_id,
        platform: w.platform,
        status: w.status
      })));

    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealData();
  }, [fetchRealData]);

  // Activity Log Writer
  const logActivity = async (action, entity_type, entity_id, details = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;
    
    await supabase.from('activity_logs').insert([{
      user_id: userId,
      action,
      entity_type,
      entity_id,
      details
    }]);
  };

  // CRUD Helpers
  const addLead = async (leadData) => {
    const dbPayload = {
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || null,
      education: leadData.education || null,
      city: leadData.city || null,
      source: leadData.source || 'Manual',
      status: leadData.status || 'New Lead',
      counselor_id: leadData.counselorId || null,
      follow_up_date: leadData.followUpDate || null,
      parent_contact: leadData.parentContact || null,
      payment_status: leadData.paymentStatus || 'Pending'
    };

    const { data, error } = await supabase.from('leads').insert([dbPayload]).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Created', 'lead', data.id);
      setLeads(prev => [{
        id: data.id, name: data.name, phone: data.phone, email: data.email,
        education: data.education, city: data.city, source: data.source,
        status: data.status, leadScore: data.lead_score, counselorId: data.counselor_id,
        followUpDate: data.follow_up_date, parentContact: data.parent_contact, 
        paymentStatus: data.payment_status, createdAt: data.created_at
      }, ...prev]);
    }
  };

  const updateLead = async (id, updates) => {
    const dbPayload = {
      name: updates.name,
      phone: updates.phone,
      email: updates.email,
      education: updates.education,
      city: updates.city,
      source: updates.source,
      status: updates.status,
      counselor_id: updates.counselorId,
      follow_up_date: updates.followUpDate,
      parent_contact: updates.parentContact,
      payment_status: updates.paymentStatus
    };
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('leads').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Updated', 'lead', id);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates, status: data.status, counselorId: data.counselor_id, paymentStatus: data.payment_status } : l));
    }
  };

  const deleteLead = async (id) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    logActivity('Deleted', 'lead', id);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const addTask = async (taskData) => {
    const { data: { session } } = await supabase.auth.getSession();
    const dbPayload = {
      title: taskData.title,
      description: taskData.description || null,
      status: taskData.status || 'Todo',
      priority: taskData.priority || 'Medium',
      assigned_to: taskData.assignedTo || null,
      due_date: taskData.dueDate || null,
      created_by: session?.user?.id || null
    };
    const { data, error } = await supabase.from('tasks').insert([dbPayload]).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Created', 'task', data.id);
      setTasks(prev => [...prev, {
        id: data.id, title: data.title, description: data.description, status: data.status,
        priority: data.priority, assignedTo: data.assigned_to, dueDate: data.due_date, createdAt: data.created_at
      }]);
    }
  };

  const updateTask = async (id, updates) => {
    const dbPayload = {
      title: updates.title,
      description: updates.description,
      status: updates.status,
      priority: updates.priority,
      assigned_to: updates.assignedTo,
      due_date: updates.dueDate
    };
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('tasks').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Updated', 'task', id);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, status: data.status, assignedTo: data.assigned_to } : t));
    }
  };

  const addSession = async (sessionData) => {
    const dbPayload = {
      lead_id: sessionData.leadId || null,
      student_id: sessionData.studentId || null,
      counselor_id: sessionData.counselorId || null,
      session_type: sessionData.sessionType || 'Initial',
      status: sessionData.status || 'Scheduled',
      scheduled_at: sessionData.scheduledAt,
      duration: sessionData.duration || 30,
      notes: sessionData.notes || {}
    };
    const { data, error } = await supabase.from('counseling_sessions').insert([dbPayload]).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Created', 'session', data.id);
      setSessions(prev => [...prev, {
        id: data.id, leadId: data.lead_id, studentId: data.student_id, counselorId: data.counselor_id,
        sessionType: data.session_type, status: data.status, scheduledAt: data.scheduled_at,
        duration: data.duration, notes: data.notes
      }]);
    }
  };

  const updateSession = async (id, updates) => {
    const dbPayload = {
      status: updates.status,
      scheduled_at: updates.scheduledAt,
      duration: updates.duration,
      notes: updates.notes
    };
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('counseling_sessions').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Updated', 'session', id);
      setSessions(prev => prev.map(s => s.id === id ? { ...s, ...updates, status: data.status } : s));
    }
  };

  const updateStudent = async (id, updates) => {
    const dbPayload = {
      status: updates.status,
      payment_status: updates.paymentStatus,
      progress_score: updates.progressScore
    };
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('students').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    if (data) {
      logActivity('Updated', 'student', id);
      setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates, status: data.status, paymentStatus: data.payment_status } : s));
    }
  };

  const addWebinar = async (data) => {}; // Placeholder for now
  const updateWebinar = async (id, data) => {};
  const addContent = async (data) => {};
  const updateContent = async (id, data) => {};
  const addTransaction = async (data) => {};
  const addTeamMember = async (memberData) => {
    // SECURITY WORKAROUND: To create a user without logging the admin out, 
    // we instantiate a temporary Supabase client just for signup.
    const tempClient = (await import('@supabase/supabase-js')).createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    const tempPassword = memberData.tempPassword || Math.random().toString(36).slice(-8) + 'A1!';
    
    const { data, error } = await tempClient.auth.signUp({
      email: memberData.email,
      password: tempPassword,
      options: {
        data: {
          name: memberData.name,
          role: memberData.role || 'Counselor',
          department: memberData.department || ''
        }
      }
    });

    if (error) {
      console.error('Error creating auth user:', error);
      throw error;
    }
    
    await tempClient.auth.signOut(); // immediately sign out the temp client
    
    logActivity('Created', 'team_member', data.user.id);
    fetchRealData();
    return { success: true, tempPassword };
  };

  const updateTeamMember = async (id, updates) => {
    const dbPayload = {
      name: updates.name,
      role: updates.role,
      department: updates.department,
      status: updates.status
    };
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('profiles').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    
    logActivity('Updated', 'team_member', id);
    setTeam(prev => prev.map(t => t.id === id ? { ...t, ...updates, status: data.status, role: data.role } : t));
  };

  const deleteTeamMember = async (id) => {
    const { error } = await supabase.from('profiles').update({ status: 'Suspended' }).eq('id', id);
    if (error) throw error;
    
    logActivity('Suspended', 'team_member', id);
    setTeam(prev => prev.map(t => t.id === id ? { ...t, status: 'Suspended' } : t));
  };

  const resetTeamMemberPassword = async (id, email) => {
    // Send password reset email directly via Supabase Auth
    if (!email) {
      // If email isn't provided directly, look it up from team state
      const targetUser = team.find(t => t.id === id);
      email = targetUser?.email;
    }
    if (!email) throw new Error("Email is required to send password reset.");

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    
    logActivity('Password Reset Requested', 'team_member', id);
    return { success: true };
  };

  const getMetrics = () => {
    const newLeads = leads.filter(l => l.status === 'New Lead').length;
    const activeStudents = students.filter(s => s.status === 'Enrolled').length;
    const pendingFollowUps = leads.filter(l => l.status === 'Follow-up Required').length;
    const todayStr = new Date().toISOString().split('T')[0];
    const todaysSessions = sessions.filter(s => s.scheduledAt && s.scheduledAt.startsWith(todayStr)).length;
    const urgentTasks = tasks.filter(t => t.priority === 'Urgent' && t.status !== 'Done').length;

    return {
      totalLeads: leads.length,
      newLeadsToday: newLeads,
      activeStudents,
      pendingFollowUps,
      todaysSessions,
      urgentTasks
    };
  };

  const contextValue = useMemo(() => ({
    leads, students, sessions, webinars, content, finances, tasks, team, activityLog, analytics, notifications,
    metrics: getMetrics(),
    loading,
    logActivity,
    addLead, updateLead, deleteLead,
    addSession, updateSession, updateStudent,
    addTask, updateTask,
    addWebinar, updateWebinar,
    addContent, updateContent,
    addTransaction,
    addTeamMember, updateTeamMember, deleteTeamMember, resetTeamMemberPassword,
    refreshData: fetchRealData
  }), [
    leads, students, sessions, webinars, content, finances, tasks, team, activityLog, analytics, notifications,
    loading, fetchRealData
  ]);

  return (
    <DataContext.Provider value={contextValue}>
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
