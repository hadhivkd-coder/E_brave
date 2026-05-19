import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { supabase } from '../../supabaseClient';

const AuthContext = createContext(null);

// Permission matrix for each role
const PERMISSIONS = {
  'Super Admin': ['*'],
  'Operations Manager': [
    'dashboard', 'leads', 'students', 'counseling', 'webinars', 'tasks', 'analytics', 'workflow', 'notifications'
  ],
  'Counselor': [
    'dashboard', 'leads', 'students', 'counseling', 'tasks', 'notifications'
  ],
  'Content Manager': [
    'dashboard', 'content', 'campaigns', 'webinars', 'funnels', 'tasks', 'notifications'
  ]
};

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && !url.includes('your-project-id') && !url.includes('your-project-ref');
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync session state on startup
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Local fallback mode
      const savedSession = localStorage.getItem('ebrave_admin_session');
      if (savedSession) {
        try {
          setUser(JSON.parse(savedSession));
        } catch (e) {
          localStorage.removeItem('ebrave_admin_session');
        }
      }
      setLoading(false);
      return;
    }

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
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error || !profile) {
        console.warn('Profile fetch error, logging out user:', error);
        await supabase.auth.signOut();
        setUser(null);
      } else if (profile.status === 'Offline') {
        console.warn('User status is Offline, logging out user');
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

    if (!isSupabaseConfigured()) {
      // Local fallback mode authentication
      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === normalizedEmail && u.password === password
      );
      if (foundUser) {
        const sessionUser = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        };
        setUser(sessionUser);
        localStorage.setItem('ebrave_admin_session', JSON.stringify(sessionUser));
        
        // Reset count
        setFailedLoginAttempts(prev => {
          const next = { ...prev };
          delete next[normalizedEmail];
          return next;
        });
        
        return { success: true, user: sessionUser };
      }
      
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

      return { success: false, error: 'Invalid email or password' };
    }

    // Real Supabase Authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error) throw error;
      
      // Fetch profile details
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileErr || !profile) {
        await supabase.auth.signOut();
        return { success: false, error: 'Access Denied: Your account does not have an assigned profile.' };
      }

      if (profile.status === 'Offline') {
        await supabase.auth.signOut();
        return { success: false, error: 'Access Denied: Your account is currently disabled/offline.' };
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
    if (!isSupabaseConfigured()) {
      setUser(null);
      localStorage.removeItem('ebrave_admin_session');
      return;
    }
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
