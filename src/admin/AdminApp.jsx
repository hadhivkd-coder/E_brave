import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import Toast from './components/ui/Toast';

// Lazy load all pages for performance
const Login = lazy(() => import('./pages/Login'));
const ActionCenter = lazy(() => import('./pages/ActionCenter'));
const Pipeline = lazy(() => import('./pages/Pipeline'));
const Counseling = lazy(() => import('./pages/Counseling'));
const Finance = lazy(() => import('./pages/Finance'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Team = lazy(() => import('./pages/Team'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Workflow = lazy(() => import('./pages/Workflow'));
const Notifications = lazy(() => import('./pages/Notifications'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const Settings = lazy(() => import('./pages/Settings'));
const Integrations = lazy(() => import('./pages/Integrations'));
const Permissions = lazy(() => import('./pages/Permissions'));
const APIConfig = lazy(() => import('./pages/APIConfig'));
const AssessmentConfig = lazy(() => import('./pages/AssessmentConfig'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Phase 1 Universal Entities
const Directory = lazy(() => import('./pages/Directory'));
const B2BInstitutions = lazy(() => import('./pages/B2BInstitutions'));
const Courses = lazy(() => import('./pages/Courses'));
const Events = lazy(() => import('./pages/Events'));
const Intelligence = lazy(() => import('./pages/Intelligence'));

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#16161a', flexDirection: 'column', gap: 16
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid rgba(99,102,241,0.2)',
        borderTopColor: '#6366f1',
        animation: 'adm-spin 0.8s linear infinite'
      }} />
      <span style={{ color: '#52525b', fontSize: '0.85rem' }}>Loading EOS...</span>
    </div>
  );
}

// Route guard — redirects unauthenticated users
function ProtectedRoute({ children, requiredPermission }) {
  const { user, hasPermission } = useAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  // Relaxing permission checks temporarily for MVP while roles are refactored
  return children;
}

// Main admin routes
function AdminRoutes() {
  const { user } = useAuth();
  const { loading: dataLoading } = useData();

  if (!user) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </Suspense>
    );
  }


  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="login" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="action-center" element={<ProtectedRoute><ActionCenter /></ProtectedRoute>} />
        <Route path="pipeline" element={<ProtectedRoute><Pipeline /></ProtectedRoute>} />
        <Route path="counseling" element={<ProtectedRoute><Counseling /></ProtectedRoute>} />
        <Route path="finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="workflow" element={<ProtectedRoute><Workflow /></ProtectedRoute>} />
        <Route path="notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        
        {/* Phase 1 Master Routes */}
        <Route path="directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
        <Route path="b2b-institutions" element={<ProtectedRoute><B2BInstitutions /></ProtectedRoute>} />
        <Route path="courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="intelligence" element={<ProtectedRoute><Intelligence /></ProtectedRoute>} />

        <Route path="knowledge-base" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
        <Route path="permissions" element={<ProtectedRoute><Permissions /></ProtectedRoute>} />
        <Route path="api-config" element={<ProtectedRoute><APIConfig /></ProtectedRoute>} />
        <Route path="assessment-config" element={<ProtectedRoute><AssessmentConfig /></ProtectedRoute>} />
        <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

// Root admin app with all providers
export default function AdminApp() {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <div className="adm-root">
            <AdminRoutes />
            <Toast />
          </div>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}
