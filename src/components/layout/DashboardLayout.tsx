import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  role: 'employee' | 'admin';
}

export default function DashboardLayout({ role }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 64 : 220;

  return (
    <div className="dashboard-layout">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(prev => !prev)}
        role={role}
      />
      <div
        className="dashboard-layout__main"
        style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <Header sidebarWidth={sidebarWidth} />
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
        <footer className="dashboard-layout__footer">
          <p>Copyright © 2025 <span className="text-green">Rewa Techno</span>. All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
