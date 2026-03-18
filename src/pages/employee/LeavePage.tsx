import { useState } from 'react';
import { Download, UserPlus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './LeavePage.css';

// ─── Types ────────────────────────────────────────────────────────────────────
type LeaveStatus = 'Approved' | 'Pending' | 'Declined';
type LeaveType = 'Medical Leave' | 'Casual Leave' | 'Annual Leave';

interface LeaveRecord {
  id: string;
  type: LeaveType;
  from: string;
  to: string;
  days: string;
  approvedBy: string;
  status: LeaveStatus;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_LEAVES: LeaveRecord[] = [
  { id: '1', type: 'Medical Leave', from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Ketan Patel',   status: 'Approved' },
  { id: '2', type: 'Casual Leave',  from: '14 Jan 2025', to: '14 Jan 2025', days: '01 Days', approvedBy: 'Jaydeep Patel', status: 'Pending'  },
  { id: '3', type: 'Annual Leave',  from: '14 Jan 2025', to: '14 Jan 2025', days: '01 Days', approvedBy: 'Jaydeep Patel', status: 'Declined' },
  { id: '4', type: 'Medical Leave', from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Ketan Patel',   status: 'Approved' },
  { id: '5', type: 'Casual Leave',  from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Ketan Patel',   status: 'Approved' },
  { id: '6', type: 'Annual Leave',  from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Jaydeep Patel', status: 'Pending'  },
  { id: '7', type: 'Medical Leave', from: '14 Jan 2025', to: '16 Jan 2025', days: '03 Days', approvedBy: 'Ketan Patel',   status: 'Declined' },
  { id: '8', type: 'Casual Leave',  from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Jaydeep Patel', status: 'Approved' },
  { id: '9', type: 'Annual Leave',  from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Ketan Patel',   status: 'Approved' },
  { id: '10',type: 'Medical Leave', from: '14 Jan 2025', to: '15 Jan 2025', days: '02 Days', approvedBy: 'Jaydeep Patel', status: 'Pending'  },
];

const LEAVE_SUMMARY = [
  { label: 'Annual Leaves',  total: 12, remaining: 7,  color: '#2ECC71' },
  { label: 'Medical Leaves', total: 11, remaining: 1,  color: '#3DB9FF' },
  { label: 'Casual Leaves',  total: 10, remaining: 5,  color: '#5B8DEF' },
  { label: 'Other Leaves',   total: 7,  remaining: 5,  color: '#FF6B4A' },
];

const STATUS_STYLE: Record<LeaveStatus, { color: string; bg: string }> = {
  Approved: { color: '#2ECC71', bg: 'rgba(46,204,113,0.1)'  },
  Pending:  { color: '#FFB31F', bg: 'rgba(255,179,31,0.1)'  },
  Declined: { color: '#FF5B5B', bg: 'rgba(255,91,91,0.1)'   },
};

// ─── Apply Leave Modal ────────────────────────────────────────────────────────
function ApplyLeaveModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Leave applied successfully!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Apply Leave</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__field">
            <label>Leave Type</label>
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} required>
              <option value="">Select type</option>
              <option>Annual Leave</option>
              <option>Medical Leave</option>
              <option>Casual Leave</option>
              <option>Other</option>
            </select>
          </div>
          <div className="modal__row">
            <div className="modal__field">
              <label>From Date</label>
              <input type="date" value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} required />
            </div>
            <div className="modal__field">
              <label>To Date</label>
              <input type="date" value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} required />
            </div>
          </div>
          <div className="modal__field">
            <label>Reason</label>
            <textarea rows={3} placeholder="Enter reason..." value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} required />
          </div>
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="modal__btn modal__btn--submit">Apply Leave</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LeavePage() {
  const [showModal, setShowModal]     = useState(false);
  const [search, setSearch]           = useState('');
  const [filterType, setFilterType]   = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage]               = useState(1);
  const [selected, setSelected]       = useState<string[]>([]);

  // Filter
  const filtered = MOCK_LEAVES.filter(l => {
    const matchSearch = l.type.toLowerCase().includes(search.toLowerCase()) ||
      l.approvedBy.toLowerCase().includes(search.toLowerCase());
    const matchType   = filterType   ? l.type === filterType   : true;
    const matchStatus = filterStatus ? l.status === filterStatus : true;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated  = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () =>
    setSelected(selected.length === paginated.length ? [] : paginated.map(l => l.id));

  return (
    <div className="leave-page">
      {/* Header */}
      <div className="leave-page__topbar">
        <div>
          <h1 className="leave-page__title">Annual Leaves</h1>
          <nav className="breadcrumb">
            <span>🏠</span>
            <span className="breadcrumb__sep"> / </span>
            <span>Employee Dashboard</span>
            <span className="breadcrumb__sep"> / </span>
            <span style={{ color: 'var(--text-secondary)' }}>Leave</span>
          </nav>
        </div>
        <div className="leave-page__actions">
          <button className="leave-page__export-btn">
            <Download size={15} /> Export
          </button>
          <button className="leave-page__apply-btn" onClick={() => setShowModal(true)}>
            <UserPlus size={15} /> Apply Leave
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="leave-summary">
        {LEAVE_SUMMARY.map(s => (
          <div key={s.label} className="leave-summary__card" style={{ background: s.color }}>
            <h3 className="leave-summary__label">{s.label}</h3>
            <div className="leave-summary__total">{s.total}</div>
            <div className="leave-summary__remaining">Remaining Leaves : {String(s.remaining).padStart(2,'0')}</div>
          </div>
        ))}
      </div>

      {/* Leave List Table */}
      <div className="leave-table-card">
        {/* Table Header */}
        <div className="leave-table__header">
          <h2 className="leave-table__title">Leave List</h2>
          <div className="leave-table__filters">
            <select className="leave-filter" value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }}>
              <option value="">Leave Type ▾</option>
              <option>Medical Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
            </select>
            <select className="leave-filter">
              <option>Approved By ▾</option>
              <option>Ketan Patel</option>
              <option>Jaydeep Patel</option>
            </select>
            <select className="leave-filter" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
              <option value="">Select Status ▾</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>
            <select className="leave-filter">
              <option>Sort By : Last 7 Days ▾</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>
        </div>

        {/* Meta row */}
        <div className="leave-table__meta">
          <div className="leave-table__rows-ctrl">
            Row Per Page
            <select
              className="leave-table__rows-select"
              value={rowsPerPage}
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            Entries
          </div>
          <div className="leave-table__stats">
            <span><span className="dot dot--green" /> Total Leaves : {filtered.length}</span>
            <span><span className="dot dot--orange" /> Total Conduct Leaves : {filtered.filter(l => l.status !== 'Declined').length}</span>
            <span><span className="dot dot--blue" /> Total Remaining Leaves : {filtered.filter(l => l.status === 'Approved').length}</span>
          </div>
          <div className="leave-table__search">
            <input
              placeholder="Search"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <button><Search size={14} /></button>
          </div>
        </div>

        {/* Table */}
        <div className="leave-table__wrap">
          <table className="leave-table">
            <thead>
              <tr>
                <th><input type="checkbox" checked={selected.length === paginated.length && paginated.length > 0} onChange={toggleAll} /></th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>No Of Days</th>
                <th>Approved by</th>
                <th>Status</th>
                <th><Edit2 size={13} /></th>
                <th><Trash2 size={13} /></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="leave-table__empty">No records found</td></tr>
              ) : paginated.map(leave => {
                const s = STATUS_STYLE[leave.status];
                return (
                  <tr key={leave.id} className={selected.includes(leave.id) ? 'leave-table__row--selected' : ''}>
                    <td><input type="checkbox" checked={selected.includes(leave.id)} onChange={() => toggleSelect(leave.id)} /></td>
                    <td className="leave-table__type">{leave.type}</td>
                    <td>{leave.from}</td>
                    <td>{leave.to}</td>
                    <td>{leave.days}</td>
                    <td>
                      <div className="leave-table__approver">
                        <div className="leave-table__approver-avatar">{leave.approvedBy.charAt(0)}</div>
                        {leave.approvedBy}
                      </div>
                    </td>
                    <td>
                      <span className="leave-table__status" style={{ color: s.color, background: s.bg }}>
                        <span className="dot" style={{ background: s.color }} />
                        {leave.status}
                      </span>
                    </td>
                    <td><button className="leave-table__icon-btn"><Edit2 size={13} /></button></td>
                    <td><button className="leave-table__icon-btn leave-table__icon-btn--del"><Trash2 size={13} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="leave-table__footer">
          <span className="leave-table__showing">
            Showing {filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}–{Math.min(page * rowsPerPage, filtered.length)} of {filtered.length} entries
          </span>
          <div className="leave-table__pagination">
            <button className="leave-table__page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`leave-table__page-btn ${p === page ? 'leave-table__page-btn--active' : ''}`}
                onClick={() => setPage(p)}
              >
                {String(p).padStart(2, '0')}
              </button>
            ))}
            <button className="leave-table__page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <ApplyLeaveModal onClose={() => setShowModal(false)} />}
    </div>
  );
}