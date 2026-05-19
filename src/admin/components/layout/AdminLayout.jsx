import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import '../../admin.css';

export default function AdminLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, clicking a nav item closes the sidebar overlay
  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(v => !v);
    } else {
      setCollapsed(v => !v);
    }
  };

  return (
    <div className="adm-layout">
      {/* Mobile overlay backdrop */}
      {isMobile && mobileOpen && (
        <div
          className="adm-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`adm-sidebar-wrapper${isMobile ? ' adm-sidebar-wrapper--mobile' : ''}${isMobile && mobileOpen ? ' adm-sidebar-wrapper--open' : ''}`}
      >
        <Sidebar
          collapsed={isMobile ? false : collapsed}
          setCollapsed={isMobile ? () => setMobileOpen(false) : setCollapsed}
        />
      </div>

      {/* Main content area */}
      <div
        className="adm-main"
        style={{
          marginLeft: isMobile
            ? 0
            : collapsed
            ? 'var(--adm-sidebar-collapsed-width, 64px)'
            : 'var(--adm-sidebar-width)',
        }}
      >
        <TopBar
          title={title}
          onToggleSidebar={handleToggleSidebar}
        />
        <main className="adm-content">
          {children}
        </main>
      </div>
    </div>
  );
}
