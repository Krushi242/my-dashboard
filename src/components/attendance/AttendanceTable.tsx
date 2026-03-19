import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AttendanceTable.css';

export type AttendanceRowStatus = 'present' | 'absent';

export interface AttendanceTableRow {
  id: string;
  dateLabel: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceRowStatus;
  break: string;
  late: string;
  overtime: string;
  productionHour: string;
}

function StatusPill({ status }: { status: AttendanceRowStatus }) {
  const isPresent = status === 'present';
  return (
    <span className={`att-status ${isPresent ? 'att-status--present' : 'att-status--absent'}`}>
      <span className="att-status__dot" />
      {isPresent ? 'Present' : 'Absent'}
    </span>
  );
}

export default function AttendanceTable(props: {
  title: string;
  rows: AttendanceTableRow[];
  statusFilter: 'all' | AttendanceRowStatus;
  onStatusFilterChange: (v: 'all' | AttendanceRowStatus) => void;
  sortBy: 'last7' | 'last30' | 'last90';
  onSortByChange: (v: 'last7' | 'last30' | 'last90') => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
  searchAdornment?: React.ReactNode;
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(props.rows.length / rowsPerPage));

  const paginated = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * rowsPerPage;
    return props.rows.slice(start, start + rowsPerPage);
  }, [page, props.rows, rowsPerPage, totalPages]);

  const safePage = Math.min(page, totalPages);

  return (
    <div className="att-table-card">
      <div className="att-table__header">
        <h2 className="att-table__title">{props.title}</h2>
        <div className="att-table__filters">
          <select
            className="att-filter"
            value={props.statusFilter}
            onChange={(e) => {
              props.onStatusFilterChange(e.target.value as typeof props.statusFilter);
              setPage(1);
            }}
          >
            <option value="all">Select Status ▾</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <select
            className="att-filter"
            value={props.sortBy}
            onChange={(e) => props.onSortByChange(e.target.value as typeof props.sortBy)}
          >
            <option value="last7">Sort By : Last 7 Days ▾</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 3 Months</option>
          </select>
        </div>
      </div>

      <div className="att-table__meta">
        <div className="att-table__rows-ctrl">
          Row Per Page
          <select
            className="att-table__rows-select"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          Entries
        </div>
        <div className="att-table__search">
          <input
            placeholder="Search"
            value={props.searchValue}
            onChange={(e) => {
              props.onSearchChange(e.target.value);
              setPage(1);
            }}
          />
          <button type="button" aria-label="Search">
            {props.searchAdornment}
          </button>
        </div>
      </div>

      <div className="att-table__wrap">
        <table className="att-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Break</th>
              <th>Late</th>
              <th>Overtime</th>
              <th>Production Hour</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="att-table__empty">
                  No records found
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr key={row.id}>
                  <td className="att-table__primary">{row.dateLabel}</td>
                  <td>{row.checkIn}</td>
                  <td>{row.checkOut}</td>
                  <td>
                    <StatusPill status={row.status} />
                  </td>
                  <td>{row.break}</td>
                  <td>{row.late}</td>
                  <td>{row.overtime}</td>
                  <td>
                    <span className={`att-pill ${row.status === 'present' ? 'att-pill--present' : 'att-pill--absent'}`}>
                      {row.productionHour}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="att-table__footer">
        <span className="att-table__showing">
          Showing {props.rows.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1}–{Math.min(safePage * rowsPerPage, props.rows.length)} of{' '}
          {props.rows.length} entries
        </span>
        <div className="att-table__pagination">
          <button
            className="att-table__page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            type="button"
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`att-table__page-btn ${p === safePage ? 'att-table__page-btn--active' : ''}`}
              onClick={() => setPage(p)}
              type="button"
            >
              {String(p).padStart(2, '0')}
            </button>
          ))}
          <button
            className="att-table__page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            type="button"
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

