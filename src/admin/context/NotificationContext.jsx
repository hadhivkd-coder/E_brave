import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ebrave_notifications');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Clear old mock notifications (they have id starting with 'notif-')
      const real = parsed.filter(n => !n.id?.startsWith('notif-'));
      return real;
    } catch { return []; }
  });

  const [toasts, setToasts] = useState([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ebrave_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Compute unread counts
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Toast Queue Systems
  const showToast = useCallback((message, type = 'success') => {
    const newToast = {
      id: `toast_${Date.now()}`,
      message,
      type // 'success', 'error', 'warning', 'info'
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const addNotification = useCallback((type, title, message, priority = 'medium', actionUrl = '') => {
    const newNotif = {
      id: `notif_${Date.now()}`,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      priority,
      actionUrl
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`${title}: ${message}`, type === 'error' ? 'error' : 'info');
  }, [showToast]);

  const markRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      toasts,
      addNotification,
      markRead,
      markAllRead,
      clearAll,
      showToast,
      dismissToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
