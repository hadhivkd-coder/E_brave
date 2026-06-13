import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user } = useAuth();
  // Action Center Queues
  const [salesQueue, setSalesQueue] = useState([]);
  const [counselorQueue, setCounselorQueue] = useState([]);
  
  // Pipeline Data (Macro view)
  const [pipelineData, setPipelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueues = useCallback(async () => {
    // Don't fetch if no user is authenticated
    if (!user) {
      setSalesQueue([]);
      setCounselorQueue([]);
      setPipelineData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      let salesData = [];
      let counselorData = [];
      let pipeline = [];

      // If user is Counselor, they ONLY see assigned paid students
      if (user.role === 'Counselor') {
        const { data } = await supabase
          .from('persons')
          .select('*')
          .eq('assigned_counselor_id', user.id);
          
        pipeline = data || [];
        counselorData = data || [];
        // Sales queue is completely empty for Counselors
        salesData = [];
      } 
      // If user is Sales, they ONLY see their active leads
      else if (user.role === 'Sales') {
        const { data: qData } = await supabase.from('view_queue_sales').select('*').limit(50);
        salesData = qData || [];
        
        // Their pipeline is only leads they own
        const { data: pData } = await supabase
          .from('persons')
          .select('*')
          // Assuming we have an owner_id or something similar. For now, we fetch a limited set or mock it.
          // Since we don't have RLS setup for Sales owners yet in this demo, we'll fetch general leads but limit.
          .limit(100);
        pipeline = pData || [];
      }
      // Super Admin and Operations see everything
      else {
        const [
          { data: sData },
          { data: cData },
          { data: pData }
        ] = await Promise.all([
          supabase.from('view_queue_sales').select('*').limit(50),
          supabase.from('view_queue_counselor').select('*').limit(50),
          supabase.from('persons').select('*').limit(200)
        ]);
        salesData = sData || [];
        counselorData = cData || [];
        pipeline = pData || [];
      }

      setSalesQueue(salesData);
      setCounselorQueue(counselorData);
      setPipelineData(pipeline);

    } catch (error) {
      console.error("Error fetching queues from Supabase:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueues();
  }, [fetchQueues, user]);

  // Activity Log Writer
  const logActivity = async (action, person_id, details = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;
    
    await supabase.from('activity_logs').insert([{
      user_id: userId,
      action,
      entity_type: 'person',
      person_id: person_id,
      details
    }]);
  };

  // Update Person State
  const updatePerson = async (id, updates) => {
    const dbPayload = {
      name: updates.name,
      phone: updates.phone,
      email: updates.email,
      lifecycle_stage: updates.lifecycle_stage,
      assigned_sales_id: updates.assigned_sales_id,
      assigned_counselor_id: updates.assigned_counselor_id,
      next_action_due: updates.next_action_due,
      last_contacted_at: updates.last_contacted_at
    };
    
    Object.keys(dbPayload).forEach(key => dbPayload[key] === undefined && delete dbPayload[key]);

    const { data, error } = await supabase.from('persons').update(dbPayload).eq('id', id).select().single();
    if (error) throw error;
    if (data) {
      // Re-fetch queues to reflect changes immediately
      fetchQueues();
    }
  };

  const getTimeline = async (personId) => {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('person_id', personId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching timeline:", error);
      return [];
    }
    return data || [];
  };

  return (
    <DataContext.Provider value={{
      salesQueue,
      counselorQueue,
      pipelineData,
      loading,
      fetchQueues,
      logActivity,
      updatePerson,
      getTimeline
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
