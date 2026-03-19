import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/useAuth';
import { api } from '../../services/api';
import type {
  Attendance, LeaveBalance, Holiday,
  Project, Task, Notification, Performance
} from '../../types';

import AttendanceCard from '../../components/dashboard/AttendanceCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import { LeaveCard, HolidayCard, BirthdayCard } from '../../components/dashboard/QuickCards';
import { PerformanceCard, WorkLeaveCard } from '../../components/dashboard/StatsCards';
import TimelineChart from '../../components/dashboard/TimelineChart';
import ProjectsSection from '../../components/dashboard/ProjectsSection';
import TasksSection from '../../components/dashboard/TasksSection';
import NotificationsSection from '../../components/dashboard/NotificationsSection';
import './EmployeeDashboard.css';

// ─── Welcome Banner ───────────────────────────────────────────────────────────
function WelcomeBanner({ name, onDismiss }: { name: string; onDismiss: () => void }) {
  return (
    <div className="welcome-banner">
      <div>
        <h1 className="welcome-banner__heading">
          Welcome back <span className="text-green">{name}</span>
        </h1>
        <p className="welcome-banner__sub">
          Here's what's happening with your work today. Stay productive!
        </p>
      </div>
      <button className="welcome-banner__close" onClick={onDismiss} aria-label="Dismiss">✕</button>
    </div>
  );
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb() {
  return (
    <nav className="breadcrumb">
      <span className="breadcrumb__home">🏠</span>
      <span className="breadcrumb__sep"> / </span>
      <span className="breadcrumb__current">Employee Dashboard</span>
    </nav>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ w = '100%', h = '20px', r = '8px' }: { w?: string; h?: string; r?: string }) {
  return (
    <div style={{ width: w, height: h, borderRadius: r, background: 'linear-gradient(90deg, #1a1d24 25%, #22262f 50%, #1a1d24 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Data state
  const [attendance, setAttendance]       = useState<Attendance | null>(null);
  const [leaveBalance, setLeaveBalance]   = useState<LeaveBalance | null>(null);
  const [nextHoliday, setNextHoliday]     = useState<Holiday | null>(null);
  const [projects, setProjects]           = useState<Project[]>([]);
  const [tasks, setTasks]                 = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [performance, setPerformance]     = useState<Performance | null>(null);

  // Fetch all dashboard data in parallel
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [att, lb, holiday, projs, tsk, notifs, perf] = await Promise.all([
          api.attendance.getToday(),
          api.leaves.getBalance(),
          api.holidays.getNext(),
          api.projects.getAll(),
          api.tasks.getAll(),
          api.notifications.getAll(),
          api.performance.get(),
        ]);
        setAttendance(att);
        setLeaveBalance(lb);
        setNextHoliday(holiday);
        setProjects(projs);
        setTasks(tsk);
        setNotifications(notifs);
        setPerformance(perf);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleToggleTask = useCallback(async (id: string) => {
    const updated = await api.tasks.toggle(id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: updated.isCompleted } : t));
  }, []);

  const handleApplyLeave = useCallback(() => {
    alert('Apply Leave modal – will be implemented in Phase 2');
  }, []);

  if (isLoading) {
    return (
      <div className="emp-dashboard emp-dashboard--loading">
        <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>
        <Breadcrumb />
        <div className="emp-dashboard__skeleton">
          <Skeleton h="80px" r="16px" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 16 }}>
            {[...Array(4)].map((_, i) => <Skeleton key={i} h="180px" r="16px" />)}
          </div>
          <Skeleton h="100px" r="16px" />
        </div>
      </div>
    );
  }

  return (
    <div className="emp-dashboard">
      <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>

      <Breadcrumb />

      {/* Welcome Banner */}
      {showBanner && user && (
        <WelcomeBanner name={user.name} onDismiss={() => setShowBanner(false)} />
      )}

      {/* ── Row 1: Main cards ────────────────────────────────── */}
      <div className="emp-dashboard__row1">
        {/* Attendance + Break */}
        <div className="emp-dashboard__col-attendance">
          <AttendanceCard
            officeTime={attendance?.punchIn ? `${attendance.punchIn} to ${attendance.punchOut}` : '09:30AM to 06:30PM'}
            breakTime={attendance?.breakHours ?? '01:00 Hour'}
            breakRemaining="01:00 Hour"
          />
        </div>

        {/* Profile */}
        <div className="emp-dashboard__col-profile">
          {user && <ProfileCard user={user} workedDays="1 Year 2 Month" />}
        </div>

        {/* Leave / Holiday / Birthday stack */}
        <div className="emp-dashboard__col-quick">
          {leaveBalance && (
            <LeaveCard paidLeaveCount={leaveBalance.totalLeaves - leaveBalance.leavesTaken} onApply={handleApplyLeave} />
          )}
          {nextHoliday && (
            <HolidayCard nextHoliday={nextHoliday} onViewAll={() => {}} />
          )}
          {user && (
            <BirthdayCard name={user.name} position={user.position} onSendWishes={() => {}} />
          )}
        </div>

        {/* Performance + Work & Leave stack */}
        <div className="emp-dashboard__col-stats">
          {performance && <PerformanceCard data={performance} />}
          {leaveBalance && <WorkLeaveCard balance={leaveBalance} />}
        </div>
      </div>

      {/* ── Row 2: Timeline ──────────────────────────────────── */}
      {attendance && (
        <TimelineChart
          data={{
            productiveHours: attendance.productiveHours,
            breakHours: attendance.breakHours,
            overtime: attendance.overtime,
            totalWorkingHours: attendance.totalWorkingHours,
          }}
        />
      )}

      {/* ── Row 3: Projects ──────────────────────────────────── */}
      <ProjectsSection projects={projects} />

      {/* ── Row 4: Tasks + Notifications ─────────────────────── */}
      <div className="emp-dashboard__row4">
        <TasksSection tasks={tasks} onToggleTask={handleToggleTask} />
        <NotificationsSection notifications={notifications} />
      </div>
    </div>
  );
}
