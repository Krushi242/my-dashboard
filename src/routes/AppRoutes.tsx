import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/auth/Login';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import LeavePage from '../pages/employee/LeavePage';
import DashboardLayout from '../components/layout/DashboardLayout';

// Loading screen
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent-green)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading...</p>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'employee' | 'admin' }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return <>{children}</>;
}

// Public route (redirect if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

      {/* Employee Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="employee">
            <DashboardLayout role="employee" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        {/* Future pages: */}
        <Route path="leave" element={<LeavePage />} />
        {/* <Route path="attendance" element={<AttendancePage />} /> */}
        {/* <Route path="projects" element={<ProjectsPage />} /> */}
        {/* <Route path="team" element={<TeamPage />} /> */}
        {/* <Route path="chat" element={<ChatPage />} /> */}
      </Route>

      {/* Admin Routes (placeholder for Phase 2) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDashboard />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
