import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import type { Performance, LeaveBalance } from '../../types';
import './StatsCards.css';

// ─── Performance Card ──────────────────────────────────────────────────────────
interface PerformanceCardProps {
  data: Performance;
}

export function PerformanceCard({ data }: PerformanceCardProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.percentage / 100) * circumference;

  return (
    <div className="stats-card stats-card--performance">
      <h3 className="stats-card__title">Performance</h3>
      <div className="performance__content">
        <div className="performance__trend">
          <div className="performance__trend-row">
            <TrendingUp size={14} />
            <span>+{data.trend}% Inc</span>
          </div>
          <div className="performance__trend-sub">Than Last Month</div>
        </div>
        <div className="performance__ring">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
            <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="Syne, sans-serif">
              {data.percentage}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Work & Leave Card ─────────────────────────────────────────────────────────
interface WorkLeaveCardProps {
  balance: LeaveBalance;
}

export function WorkLeaveCard({ balance }: WorkLeaveCardProps) {
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month'>('Month');

  return (
    <div className="stats-card stats-card--workleave">
      <div className="stats-card__header">
        <h3 className="stats-card__title">Work &amp; Leaves</h3>
        <select
          className="stats-card__period-select"
          value={period}
          onChange={e => setPeriod(e.target.value as typeof period)}
        >
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>
      <div className="workleave__grid">
        <div className="workleave__item">
          <span className="workleave__label">Total Leaves</span>
          <span className="workleave__value">{balance.totalLeaves}</span>
        </div>
        <div className="workleave__item workleave__item--right">
          <span className="workleave__label">Leaves Taken</span>
          <span className="workleave__value workleave__value--orange">{balance.leavesTaken}</span>
        </div>
        <div className="workleave__item">
          <span className="workleave__label">Leaves Absent</span>
          <span className="workleave__value workleave__value--red">{String(balance.leavesAbsent).padStart(2,'0')}</span>
        </div>
        <div className="workleave__item workleave__item--right">
          <span className="workleave__label">Pending Approval</span>
          <span className="workleave__value">{String(balance.pendingApproval).padStart(2,'0')}</span>
        </div>
        <div className="workleave__item">
          <span className="workleave__label">Working Days</span>
          <span className="workleave__value">{String(balance.workingDays).padStart(2,'0')} Days</span>
        </div>
        <div className="workleave__item workleave__item--right">
          <span className="workleave__label">Loss of Pay</span>
          <span className="workleave__value workleave__value--red">{balance.lossOfPay} hrs</span>
        </div>
      </div>
    </div>
  );
}
