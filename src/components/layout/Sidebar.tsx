import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Clock, CalendarDays, FolderKanban,
  Users, MessageSquare, Bell, Settings, Shield, LogOut, ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const EMPLOYEE_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Leave', icon: CalendarDays, path: '/leave' },
  { label: 'Attendance', icon: Clock, path: '/attendance' },
  { label: 'Projects', icon: FolderKanban, path: '/projects', hasArrow: true },
  { label: 'Team', icon: Users, path: '/team' },
  { label: 'Chat', icon: MessageSquare, path: '/chat' },
];

const BOTTOM_NAV = [
  { label: 'Notifications', icon: Bell, path: '/notifications' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Privacy Policy', icon: Shield, path: '/privacy' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  role: 'employee' | 'admin';
}

export default function Sidebar({ isCollapsed, onToggle, role }: SidebarProps) {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navItems = role === 'employee' ? EMPLOYEE_NAV : EMPLOYEE_NAV;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        {!isCollapsed && (
          <div className="sidebar__brand">
            <span className="sidebar__brand-name">REWA</span>
            <span className="sidebar__brand-sub">TECHNO</span>
          </div>
        )}
        <button className="sidebar__collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
          <ChevronLeft size={16} style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} className="sidebar__nav-icon" />
              {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
              {!isCollapsed && item.hasArrow && (
                <ChevronLeft size={14} style={{ transform: 'rotate(180deg)', marginLeft: 'auto', color: 'var(--text-muted)' }} />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="sidebar__divider" />

      {/* Bottom Nav */}
      <nav className="sidebar__nav sidebar__nav--bottom">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="sidebar__nav-item sidebar__nav-item--bottom"
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} className="sidebar__nav-icon" />
              {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar__footer">
        <button className="sidebar__logout-btn" onClick={handleLogout} title={isCollapsed ? 'Log Out' : undefined}>
          <LogOut size={18} />
          {!isCollapsed && <span>Log Out</span>}
        </button>
        {!isCollapsed && user && (
          <p className="sidebar__user-role">{user.role === 'admin' ? '🔑 Admin' : '👤 Employee'}</p>
        )}
      </div>
    </aside>
  );
}
