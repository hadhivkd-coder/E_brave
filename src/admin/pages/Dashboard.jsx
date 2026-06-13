import React from 'react';
import { useAuth } from '../context/AuthContext';
import FounderDashboard from '../roles/FounderDashboard';
import OperationsPanel from '../roles/OperationsPanel';
import SalesPanel from '../roles/SalesPanel';
import CounselorPanel from '../roles/CounselorPanel';
import ContentPanel from '../roles/ContentPanel';

export default function Dashboard() {
  const { user } = useAuth();

  // If user context hasn't loaded yet, show empty or loading
  if (!user) return null;

  switch (user.role) {
    case 'Super Admin':
      return <FounderDashboard />;
    case 'Operations Manager':
      return <OperationsPanel />;
    case 'Sales':
      return <SalesPanel />;
    case 'Counselor':
      return <CounselorPanel />;
    case 'Content Manager':
      return <ContentPanel />;
    default:
      // Fallback for anyone else
      return <SalesPanel />;
  }
}
