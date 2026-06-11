import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext(null);

const PERMISSIONS = {
  'Super Admin': ['*'],
  'Operations Manager': [
    'dashboard', 'leads', 'students', 'counseling', 'webinars', 'tasks', 'analytics', 'workflow', 'notifications', 'team'
  ],
  'Sales': [
    'dashboard', 'leads', 'finance', 'tasks', 'funnels', 'notifications'
  ],
  'Counselor': [
    'dashboard', 'students', 'counseling', 'tasks', 'notifications'
  ],
  'Content Manager': [
    'dashboard', 'content', 'campaigns', 'webinars', 'funnels', 'tasks', 'notifications'
  ]
};

const isSupabaseConfigured = () => {
  return true;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync session state on startup
  useEffect(() => {
    // Supabase auth subscription
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfileAndSetUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfileAndSetUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfileAndSetUser = async (authUser) => {
    try {
      let { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileErr || !profile) {
        // EMERGENCY FALLBACK: Account exists in auth.users but has no profile row.
        // We auto-heal the database by inserting a default profile.
        console.warn('Profile missing. Attempting emergency profile generation for:', authUser.email);
        
        const fallbackName = authUser.user_metadata?.name || authUser.email.split('@')[0];
        const { data: newProfile, error: insertErr } = await supabase
          .from('profiles')
          .insert([{
            id: authUser.id,
            name: fallbackName,
            email: authUser.email,
            role: 'Counselor',
            status: 'Active'
          }])
          .select()
          .single();

        if (insertErr || !newProfile) {
          console.error('CRITICAL: Emergency profile creation failed:', insertErr);
          await supabase.auth.signOut();
          setUser(null);
          return;
        }
        
        profile = newProfile; // Use the newly created profile
      }

      if (profile.status === 'Offline' || profile.status === 'Suspended') {
        console.warn(`User status is ${profile.status}, logging out user`);
        await supabase.auth.signOut();
        setUser(null);
      } else {
        setUser({
          id: authUser.id,
          email: authUser.email,
          name: profile.name,
          role: profile.role,
          status: profile.status
        });
      }
    } catch (err) {
      console.error('Error fetching user profile metadata:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const [failedLoginAttempts, setFailedLoginAttempts] = useState({});

  const login = useCallback(async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    const currentAttempts = failedLoginAttempts[normalizedEmail] || 0;

    // Retrieve browser client agent details
    const mockIp = '192.168.1.114';
    const userAgent = navigator.userAgent;

    if (currentAttempts >= 3) {
      console.warn(`[SECURITY AUDIT] Blocked auth request: ${normalizedEmail} is temporarily locked out. Origin IP: ${mockIp}, User Agent: ${userAgent}`);
      return { 
        success: false, 
        error: 'Security Warning: This account has been locked temporarily due to too many failed login attempts.' 
      };
    }

    // Real Supabase Authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error) throw error;
      
      // Fetch profile details
      let { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileErr || !profile) {
        // EMERGENCY FALLBACK FOR LOGIN
        console.warn('Profile missing on login. Auto-healing...');
        const fallbackName = data.user.user_metadata?.name || normalizedEmail.split('@')[0];
        
        const { data: newProfile, error: insertErr } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            name: fallbackName,
            email: normalizedEmail,
            role: 'Counselor',
            status: 'Active'
          }])
          .select()
          .single();

        if (insertErr || !newProfile) {
          await supabase.auth.signOut();
          return { success: false, error: 'Access Denied: Your account profile could not be generated. Contact Admin.' };
        }
        
        profile = newProfile;
      }

      if (profile.status === 'Offline' || profile.status === 'Suspended') {
        await supabase.auth.signOut();
        return { success: false, error: 'Access Denied: Your account is currently disabled or offline.' };
      }

      const sessionUser = {
        id: data.user.id,
        email: data.user.email,
        name: profile.name,
        role: profile.role,
        status: profile.status
      };

      setUser(sessionUser);

      // Reset count
      setFailedLoginAttempts(prev => {
        const next = { ...prev };
        delete next[normalizedEmail];
        return next;
      });

      return { success: true, user: sessionUser };
    } catch (error) {
      // Increment failures
      setFailedLoginAttempts(prev => {
        const nextAttempts = (prev[normalizedEmail] || 0) + 1;
        if (nextAttempts >= 3) {
          console.warn(`[SECURITY AUDIT] LOCKOUT TRIGGERED for account: ${normalizedEmail}. Origin IP: ${mockIp}, User Agent: ${userAgent}`);
        } else {
          console.warn(`[SECURITY MONITOR] Failed auth attempt: ${normalizedEmail}. Attempt ${nextAttempts}/3. Origin IP: ${mockIp}`);
        }
        return { ...prev, [normalizedEmail]: nextAttempts };
      });

      return { success: false, error: error.message };
    }
  }, [failedLoginAttempts]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    const userPermissions = PERMISSIONS[user.role] || [];
    if (userPermissions.includes('*')) return true;
    return userPermissions.includes(permission);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role: user?.role, login, logout, hasPermission, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
