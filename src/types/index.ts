// ===== AUTH TYPES =====
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  avatar?: string;
  position: string;
  department: string;
  phone: string;
  joiningDate: string;
  employeeId: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ===== EMPLOYEE TYPES =====
export interface Attendance {
  id: string;
  date: string;
  punchIn: string;
  punchOut: string;
  breakIn?: string;
  breakOut?: string;
  productiveHours: string;
  breakHours: string;
  overtime: string;
  totalWorkingHours: string;
  status: 'present' | 'absent' | 'half-day' | 'on-leave';
}

export interface Leave {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  totalDays: number;
}

export interface LeaveBalance {
  totalLeaves: number;
  leavesTaken: number;
  leavesAbsent: number;
  pendingApproval: number;
  workingDays: number;
  lossOfPay: number;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  day: string;
  type: 'national' | 'optional' | 'company';
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientRole: string;
  clientAvatar?: string;
  description: string;
  deadline: string;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  team: string[];
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignees: string[];
  isCompleted: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  avatar?: string;
  type: 'project' | 'leave' | 'attendance' | 'general';
}

export interface Performance {
  percentage: number;
  trend: number;
  period: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface TeamFamilyMember {
  id: string;
  name: string;
  relationship: string;
  contactNumber: string;
}

export interface TeamEducationItem {
  id: string;
  institute: string;
  course: string;
  years: string;
}

export interface TeamProfile extends TeamMember {
  employeeCode: string;
  dateOfJoin: string;
  experienceLabel: string;
  birthday: string;
  maritalStatus: string;
  bloodGroup: string;
  emergencyContactNumber: string;
  nationality: string;
  religion: string;
  address: string;
  about: string;
  family: TeamFamilyMember[];
  education: TeamEducationItem[];
}

// ===== CHART TYPES =====
export interface TimelineBar {
  type: 'productive' | 'break' | 'overtime';
  startHour: number;
  endHour: number;
  label: string;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
