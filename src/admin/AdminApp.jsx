import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import Toast from './components/ui/Toast';

// Lazy load all pages for performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Leads = lazy(() => import('./pages/Leads'));
const Students = lazy(() => import('./pages/Students'));
const Counseling = lazy(() => import('./pages/Counseling'));
const Webinars = lazy(() => import('./pages/Webinars'));
const Content = lazy(() => import('./pages/Content'));
const Finance = lazy(() => import('./pages/Finance'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Campaigns = lazy(() => import('./pages/Campaigns'));
const Funnels = lazy(() => import('./pages/Funnels'));
const Team = lazy(() => import('./pages/Team'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Workflow = lazy(() => import('./pages/Workflow'));
const Notifications = lazy(() => import('./pages/Notifications'));
const EosAI = lazy(() => import('./pages/EosAI'));
const Automation = lazy(() => import('./pages/Automation'));
const AIInsights = lazy(() => import('./pages/AIInsights'));
const AIReports = lazy(() => import('./pages/AIReports'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const Settings = lazy(() => import('./pages/Settings'));
const Integrations = lazy(() => import('./pages/Integrations'));
const Permissions = lazy(() => import('./pages/Permissions'));
const APIConfig = lazy(() => import('./pages/APIConfig'));
const AssessmentConfig = lazy(() => import('./pages/AssessmentConfig'));

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
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/admin/dashboard" replace />;
  }
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

  if (dataLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="login" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="leads" element={<ProtectedRoute requiredPermission="leads"><Leads /></ProtectedRoute>} />
        <Route path="students" element={<ProtectedRoute requiredPermission="students"><Students /></ProtectedRoute>} />
        <Route path="counseling" element={<ProtectedRoute requiredPermission="counseling"><Counseling /></ProtectedRoute>} />
        <Route path="webinars" element={<ProtectedRoute requiredPermission="webinars"><Webinars /></ProtectedRoute>} />
        <Route path="content" element={<ProtectedRoute requiredPermission="content"><Content /></ProtectedRoute>} />
        <Route path="finance" element={<ProtectedRoute requiredPermission="finance"><Finance /></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute requiredPermission="analytics"><Analytics /></ProtectedRoute>} />
        <Route path="campaigns" element={<ProtectedRoute requiredPermission="campaigns"><Campaigns /></ProtectedRoute>} />
        <Route path="funnels" element={<ProtectedRoute requiredPermission="funnels"><Funnels /></ProtectedRoute>} />
        <Route path="team" element={<ProtectedRoute requiredPermission="team"><Team /></ProtectedRoute>} />
        <Route path="tasks" element={<ProtectedRoute requiredPermission="tasks"><Tasks /></ProtectedRoute>} />
        <Route path="workflow" element={<ProtectedRoute requiredPermission="workflow"><Workflow /></ProtectedRoute>} />
        <Route path="notifications" element={<ProtectedRoute requiredPermission="notifications"><Notifications /></ProtectedRoute>} />
        <Route path="eos-ai" element={<ProtectedRoute requiredPermission="eos_ai"><EosAI /></ProtectedRoute>} />
        <Route path="automation" element={<ProtectedRoute requiredPermission="automation"><Automation /></ProtectedRoute>} />
        <Route path="ai-insights" element={<ProtectedRoute requiredPermission="ai_insights"><AIInsights /></ProtectedRoute>} />
        <Route path="ai-reports" element={<ProtectedRoute requiredPermission="ai_reports"><AIReports /></ProtectedRoute>} />
        <Route path="knowledge-base" element={<ProtectedRoute requiredPermission="knowledge_base"><KnowledgeBase /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute requiredPermission="settings"><Settings /></ProtectedRoute>} />
        <Route path="integrations" element={<ProtectedRoute requiredPermission="integrations"><Integrations /></ProtectedRoute>} />
        <Route path="permissions" element={<ProtectedRoute requiredPermission="permissions"><Permissions /></ProtectedRoute>} />
        <Route path="api-config" element={<ProtectedRoute requiredPermission="api_config"><APIConfig /></ProtectedRoute>} />
        <Route path="assessment-config" element={<ProtectedRoute requiredPermission="assessment_config"><AssessmentConfig /></ProtectedRoute>} />
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
