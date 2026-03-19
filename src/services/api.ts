import type {
  User, Attendance, Leave, LeaveBalance,
  Holiday, Project, Task, Notification, Performance, TeamMember, TeamProfile
} from '../types';

// ===== MOCK DATA =====

const MOCK_USER: User = {
  id: 'emp-001',
  name: 'Jemit Patel',
  email: 'loremipsum@gmail.com',
  role: 'employee',
  position: 'UX/UI Designer',
  department: 'Design',
  phone: '+1 324 3453 545',
  joiningDate: '01/02/2025',
  employeeId: 'EMP-2025-001',
};

const MOCK_ADMIN: User = {
  id: 'adm-001',
  name: 'Moin Khan',
  email: 'admin@rewatechno.com',
  role: 'admin',
  position: 'HR Manager',
  department: 'Human Resources',
  phone: '+1 234 567 890',
  joiningDate: '01/01/2023',
  employeeId: 'ADM-2023-001',
};

export const MOCK_CREDENTIALS = [
  { email: 'employee@demo.com', password: 'demo123', user: MOCK_USER },
  { email: 'admin@demo.com',    password: 'admin123', user: MOCK_ADMIN },
];

const MOCK_ATTENDANCE: Attendance = {
  id: 'att-001',
  date: new Date().toISOString(),
  punchIn: '09:30 AM',
  punchOut: '06:30 PM',
  breakIn: '01:00 PM',
  breakOut: '02:00 PM',
  productiveHours: '08h 36m',
  breakHours: '01h 15s',
  overtime: '01h 12m',
  totalWorkingHours: '12h 36m',
  status: 'present',
};

const MOCK_LEAVE_BALANCE: LeaveBalance = {
  totalLeaves: 10,
  leavesTaken: 6.5,
  leavesAbsent: 6,
  pendingApproval: 1,
  workingDays: 2,
  lossOfPay: 192,
};

const MOCK_LEAVES: Leave[] = [
  {
    id: 'lv-001',
    type: 'Sick Leave',
    fromDate: '2025-01-10',
    toDate: '2025-01-11',
    reason: 'Not feeling well',
    status: 'approved',
    appliedOn: '2025-01-09',
    totalDays: 2,
  },
  {
    id: 'lv-002',
    type: 'Casual Leave',
    fromDate: '2025-02-14',
    toDate: '2025-02-14',
    reason: 'Personal work',
    status: 'pending',
    appliedOn: '2025-02-10',
    totalDays: 1,
  },
  {
    id: 'lv-003',
    type: 'Earned Leave',
    fromDate: '2025-03-01',
    toDate: '2025-03-03',
    reason: 'Family trip',
    status: 'rejected',
    appliedOn: '2025-02-20',
    totalDays: 3,
  },
];

const MOCK_HOLIDAYS: Holiday[] = [
  { id: 'h-001', name: 'Diwali',           date: '29-10-2025', day: 'Wednesday', type: 'national' },
  { id: 'h-002', name: 'Christmas',         date: '25-12-2025', day: 'Thursday',  type: 'national' },
  { id: 'h-003', name: 'New Year',          date: '01-01-2026', day: 'Thursday',  type: 'national' },
  { id: 'h-004', name: 'Holi',              date: '14-03-2025', day: 'Friday',    type: 'national' },
  { id: 'h-005', name: 'Independence Day',  date: '15-08-2025', day: 'Friday',    type: 'national' },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Office Management',
    clientName: 'Anthony Lewis',
    clientRole: 'Client / Project Leader',
    description: 'Lorem ipsum dolor sit amet consectetur. Viverra massa in sagittis vulputate mas...',
    deadline: '14 Jan 2024',
    status: 'active',
    progress: 65,
    team: ['emp-001', 'emp-002', 'emp-003'],
  },
  {
    id: 'proj-002',
    name: 'Office Management',
    clientName: 'Anthony Lewis',
    clientRole: 'Client / Project Leader',
    description: 'Lorem ipsum dolor sit amet consectetur. Viverra massa in sagittis vulputate mas...',
    deadline: '14 Jan 2024',
    status: 'active',
    progress: 40,
    team: ['emp-001', 'emp-004'],
  },
  {
    id: 'proj-003',
    name: 'Office Management',
    clientName: 'Anthony Lewis',
    clientRole: 'Client / Project Leader',
    description: 'Lorem ipsum dolor sit amet consectetur. Viverra massa in sagittis vulputate mas...',
    deadline: '14 Jan 2024',
    status: 'completed',
    progress: 100,
    team: ['emp-002', 'emp-003'],
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Figma Design',
    projectId: 'proj-001',
    dueDate: '25 Jan 2025',
    status: 'pending',
    priority: 'high',
    assignees: ['emp-001', 'emp-002', 'emp-003'],
    isCompleted: false,
  },
  {
    id: 'task-002',
    title: 'Squarespace Development',
    projectId: 'proj-001',
    dueDate: '25 Jan 2025',
    status: 'in-progress',
    priority: 'medium',
    assignees: ['emp-002', 'emp-003'],
    isCompleted: false,
  },
  {
    id: 'task-003',
    title: 'Wix Development',
    projectId: 'proj-002',
    dueDate: '25 Jan 2025',
    status: 'in-progress',
    priority: 'medium',
    assignees: ['emp-001', 'emp-003'],
    isCompleted: false,
  },
  {
    id: 'task-004',
    title: 'Revamp Design',
    projectId: 'proj-002',
    dueDate: '25 Jan 2025',
    status: 'completed',
    priority: 'low',
    assignees: ['emp-001', 'emp-002', 'emp-003'],
    isCompleted: true,
  },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    title: 'Zenith Capital Figma Design',
    message: 'Lorem ipsum dolor sit amet consectetur. Viverra massa in sagittis vulputate massa sed faucibus massa id. Eleifend parturient.',
    date: 'May 29, 2025',
    isRead: false,
    type: 'project',
  },
  {
    id: 'notif-002',
    title: 'Cyber Husky Design',
    message: 'Lorem ipsum dolor sit amet consectetur. Viverra massa in sagittis vulputate massa sed faucibus massa id.',
    date: 'May 28, 2025',
    isRead: true,
    type: 'project',
  },
  {
    id: 'notif-003',
    title: 'Leave Approved',
    message: 'Your leave request for Jan 10-11 has been approved by HR.',
    date: 'May 27, 2025',
    isRead: true,
    type: 'leave',
  },
];

const MOCK_PERFORMANCE: Performance = {
  percentage: 74,
  trend: 14,
  period: 'last month',
};

const MOCK_TEAM: TeamMember[] = [
  {
    id: 'emp-001',
    name: 'Jemit Patel',
    position: 'UX/UI Designer',
    department: 'Design',
    email: 'jemit@rewatechno.com',
    phone: '+1 324 3453 545',
    status: 'active',
  },
  {
    id: 'emp-002',
    name: 'Anthony Lewis',
    position: 'Project Manager',
    department: 'Management',
    email: 'anthony@rewatechno.com',
    phone: '+1 234 567 001',
    status: 'active',
  },
  {
    id: 'emp-003',
    name: 'Sarah Johnson',
    position: 'Frontend Developer',
    department: 'Engineering',
    email: 'sarah@rewatechno.com',
    phone: '+1 234 567 002',
    status: 'active',
  },
  {
    id: 'emp-004',
    name: 'Mike Chen',
    position: 'Backend Developer',
    department: 'Engineering',
    email: 'mike@rewatechno.com',
    phone: '+1 234 567 003',
    status: 'active',
  },
];

const MOCK_TEAM_PROFILES: Record<string, TeamProfile> = {
  'emp-001': {
    ...MOCK_TEAM[0],
    employeeCode: '0003',
    dateOfJoin: '24 June 2024',
    experienceLabel: '2.5+ Years',
    birthday: '16 Nov 1995',
    maritalStatus: 'No Married',
    bloodGroup: 'A+',
    emergencyContactNumber: '+91 00000XXXXX',
    nationality: 'Indian',
    religion: 'Muslim',
    address: '521, Isquare Corporate Park, Scince city. 380085',
    about:
      'Lorem ipsum dolor sit amet consectetur. Diam sed odio velit auctor fringilla velit tortor pretium purus. Aliquam pharetra vestibulum facilisis pellentesque. Massa nisl et in praesent. Nam lorem amet tristique semper turpis habitant elit scelerisque nibh. Tempor aliquet tortor tortor odio orci. Massa id a sit augue. Pretium in vel porta sit vitae gravida amet. Mi ut ultrices velit urna.',
    family: [
      { id: 'fam-001', name: 'Hendry Peralt', relationship: 'Big Brother', contactNumber: '+91 00000XXXXX' },
      { id: 'fam-002', name: 'Hendry Peralt', relationship: 'Brother', contactNumber: '+91 00000XXXXX' },
    ],
    education: [
      { id: 'edu-001', institute: 'Oxford University', course: 'Computer Science', years: '2020 - 2022' },
      { id: 'edu-002', institute: 'Cambridge University', course: 'Computer Network & Systems', years: '2016 - 2019' },
    ],
  },
};

// ===== SIMULATED API =====

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    async login(email: string, password: string): Promise<{ user: User; token: string }> {
      await delay(600);
      const match = MOCK_CREDENTIALS.find(
        (c) => c.email === email && c.password === password
      );
      if (!match) throw new Error('Invalid credentials');
      return { user: match.user, token: `mock-token-${match.user.id}-${Date.now()}` };
    },

    async logout(): Promise<void> {
      await delay(200);
    },

    async verifyToken(token: string): Promise<User> {
      await delay(300);
      const parts = token.split('-');
      const userId = parts[2];
      const allUsers = MOCK_CREDENTIALS.map((c) => c.user);
      const user = allUsers.find((u) => u.id === userId);
      if (!user) throw new Error('Invalid token');
      return user;
    },
  },

  attendance: {
    async getToday(): Promise<Attendance> {
      await delay(400);
      return MOCK_ATTENDANCE;
    },
    async punchIn(): Promise<Attendance> {
      await delay(500);
      return { ...MOCK_ATTENDANCE, punchIn: new Date().toLocaleTimeString() };
    },
    async punchOut(): Promise<Attendance> {
      await delay(500);
      return { ...MOCK_ATTENDANCE, punchOut: new Date().toLocaleTimeString() };
    },
  },

  leaves: {
    async getBalance(): Promise<LeaveBalance> {
      await delay(300);
      return MOCK_LEAVE_BALANCE;
    },
    async getAll(): Promise<Leave[]> {
      await delay(400);
      return MOCK_LEAVES;
    },
    async apply(data: Partial<Leave>): Promise<Leave> {
      await delay(600);
      return {
        ...data,
        id: `lv-${Date.now()}`,
        status: 'pending',
        appliedOn: new Date().toISOString(),
      } as Leave;
    },
  },

  holidays: {
    async getAll(): Promise<Holiday[]> {
      await delay(300);
      return MOCK_HOLIDAYS;
    },
    async getNext(): Promise<Holiday> {
      await delay(200);
      return MOCK_HOLIDAYS[0];
    },
  },

  projects: {
    async getAll(): Promise<Project[]> {
      await delay(400);
      return MOCK_PROJECTS;
    },
  },

  tasks: {
    async getAll(): Promise<Task[]> {
      await delay(300);
      return MOCK_TASKS;
    },
    async toggle(id: string): Promise<Task> {
      await delay(200);
      const task = MOCK_TASKS.find((t) => t.id === id);
      if (!task) throw new Error('Task not found');
      return { ...task, isCompleted: !task.isCompleted };
    },
  },

  notifications: {
    async getAll(): Promise<Notification[]> {
      await delay(300);
      return MOCK_NOTIFICATIONS;
    },
  },

  performance: {
    async get(): Promise<Performance> {
      await delay(200);
      return MOCK_PERFORMANCE;
    },
  },

  team: {
    async getAll(): Promise<TeamMember[]> {
      await delay(400);
      return MOCK_TEAM;
    },
    async getById(id: string): Promise<TeamProfile> {
      await delay(350);
      const profile = MOCK_TEAM_PROFILES[id];
      if (profile) return profile;
      const fallback = MOCK_TEAM.find((m) => m.id === id);
      if (!fallback) throw new Error('Team member not found');
      return {
        ...fallback,
        employeeCode: '----',
        dateOfJoin: '—',
        experienceLabel: '—',
        birthday: '—',
        maritalStatus: '—',
        bloodGroup: '—',
        emergencyContactNumber: '—',
        nationality: '—',
        religion: '—',
        address: '—',
        about: '—',
        family: [],
        education: [],
      };
    },
  },

  user: {
    async getProfile(): Promise<User> {
      await delay(300);
      return MOCK_USER;
    },
  },
};