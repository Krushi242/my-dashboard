import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';
import TimelineChart from '../../components/dashboard/TimelineChart';
import SummaryCards, { type AttendanceSummaryCard } from '../../components/attendance/SummaryCards';
import AttendanceTable, { type AttendanceTableRow } from '../../components/attendance/AttendanceTable';
import './AttendancePage.css';

const SUMMARY_CARDS: AttendanceSummaryCard[] = [
  {
    title: 'Total Hours Today',
    value: '8.36',
    target: '9',
    deltaLabel: 'This Week',
    deltaValue: '5%',
    deltaDirection: 'down',
    tone: 'teal',
  },
  {
    title: 'Total Hours Week',
    value: '10',
    target: '40',
    deltaLabel: 'Last Week',
    deltaValue: '7%',
    deltaDirection: 'down',
    tone: 'green',
  },
  {
    title: 'Total Hours Month',
    value: '75',
    target: '98',
    deltaLabel: 'Last Month',
    deltaValue: '8%',
    deltaDirection: 'down',
    tone: 'blue',
  },
  {
    title: 'Overtime this Month',
    value: '16',
    target: '28',
    deltaLabel: 'Last Month',
    deltaValue: '6%',
    deltaDirection: 'down',
    tone: 'orange',
  },
];

const MOCK_ROWS: AttendanceTableRow[] = [
  {
    id: 'att-row-001',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '08:20 Hrs',
  },
  {
    id: 'att-row-002',
    dateLabel: '21 Jan 2024',
    checkIn: '-',
    checkOut: '-',
    status: 'absent',
    break: '-',
    late: '-',
    overtime: '-',
    productionHour: '00:00 Hrs',
  },
  {
    id: 'att-row-003',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '08:04 Hrs',
  },
  {
    id: 'att-row-004',
    dateLabel: '21 Jan 2024',
    checkIn: '09:44 AM',
    checkOut: '07:04 PM',
    status: 'present',
    break: '06:12 PM',
    late: '14 Mints',
    overtime: '0:20 Hrs',
    productionHour: '08:20 Hrs',
  },
  {
    id: 'att-row-005',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '07:54 Hrs',
  },
  {
    id: 'att-row-006',
    dateLabel: '21 Jan 2024',
    checkIn: '-',
    checkOut: '-',
    status: 'absent',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '00:00 Hrs',
  },
  {
    id: 'att-row-007',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '07:54 Hrs',
  },
  {
    id: 'att-row-008',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '07:54 Hrs',
  },
  {
    id: 'att-row-009',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '07:54 Hrs',
  },
  {
    id: 'att-row-010',
    dateLabel: '21 Jan 2024',
    checkIn: '09:30 AM',
    checkOut: '06:30 PM',
    status: 'present',
    break: '06:12 PM',
    late: '-',
    overtime: '-',
    productionHour: '07:54 Hrs',
  },
];

export default function AttendancePage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'present' | 'absent'>('all');
  const [sortBy, setSortBy] = useState<'last7' | 'last30' | 'last90'>('last7');

  const filteredRows = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return MOCK_ROWS.filter((row) => {
      const matchStatus = statusFilter === 'all' ? true : row.status === statusFilter;
      const matchSearch =
        !normalized ||
        row.dateLabel.toLowerCase().includes(normalized) ||
        row.checkIn.toLowerCase().includes(normalized) ||
        row.checkOut.toLowerCase().includes(normalized) ||
        row.productionHour.toLowerCase().includes(normalized);
      return matchStatus && matchSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="attendance-page">
      <div className="attendance-page__topbar">
        <div>
          <h1 className="attendance-page__title">Attendance</h1>
          <nav className="breadcrumb">
            <span>🏠</span>
            <span className="breadcrumb__sep"> / </span>
            <span>Employee Dashboard</span>
            <span className="breadcrumb__sep"> / </span>
            <span style={{ color: 'var(--text-secondary)' }}>Attendance</span>
          </nav>
        </div>
        <div className="attendance-page__actions">
          <button className="attendance-page__export-btn" type="button">
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <SummaryCards cards={SUMMARY_CARDS} />

      <TimelineChart
        data={{
          productiveHours: '08h 36m',
          breakHours: '01h 00s',
          overtime: '01h 12m',
          totalWorkingHours: '12h 36m',
        }}
      />

      <AttendanceTable
        title="Employee Attendance"
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        searchValue={search}
        onSearchChange={setSearch}
        searchAdornment={<Search size={14} />}
        rows={filteredRows}
      />
    </div>
  );
}

