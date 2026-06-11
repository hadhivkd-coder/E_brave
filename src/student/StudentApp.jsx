import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../admin/context/AuthContext';
import { DataProvider } from '../admin/context/DataContext';
import { NotificationProvider } from '../admin/context/NotificationContext';
import Toast from '../admin/components/ui/Toast';

// Lazy load pages
const AssessmentLanding = lazy(() => import('./pages/AssessmentLanding'));
const AssessmentInfo = lazy(() => import('./pages/AssessmentInfo'));
const AssessmentEngine = lazy(() => import('./pages/AssessmentEngine'));
const AssessmentComplete = lazy(() => import('./pages/AssessmentComplete'));

import '../admin/admin.css'; // Reuse the premium admin design language

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#16161a' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'adm-spin 0.8s linear infinite' }} />
    </div>
  );
}

// The assessment flow does not require authentication in the same way,
// but it is gated by the School Code in AssessmentInfo.
function AssessmentRoutes() {
  const { user } = useAuth();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/student/assessment" replace />} />
        
        {/* Public / Semi-Public Assessment Flow */}
        <Route path="/assessment" element={<AssessmentLanding />} />
        <Route path="/assessment/info" element={<AssessmentInfo />} />
        <Route path="/assessment/run" element={<AssessmentEngine />} />
        <Route path="/assessment/complete" element={<AssessmentComplete />} />
      </Routes>
    </Suspense>
  );
}

export default function StudentApp() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <DataProvider>
          <AssessmentRoutes />
          <Toast />
        </DataProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
