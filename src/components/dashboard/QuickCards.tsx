import { useState } from 'react';
import type { Holiday } from '../../types';
import './QuickCards.css';

interface LeaveCardProps {
  paidLeaveCount: number;
  onApply: () => void;
}

interface HolidayCardProps {
  nextHoliday: Holiday;
  onViewAll: () => void;
}

interface BirthdayCardProps {
  name: string;
  position: string;
  onSendWishes: () => void;
}

export function LeaveCard({ paidLeaveCount, onApply }: LeaveCardProps) {
  return (
    <div className="quick-card quick-card--leave">
      <div className="quick-card__top">
        <div>
          <h3 className="quick-card__title">Apply for Leave</h3>
          <p className="quick-card__sub">{String(paidLeaveCount).padStart(2, '0')} Paid Leave</p>
        </div>
        <button className="quick-card__action-btn" onClick={onApply}>Apply</button>
      </div>
    </div>
  );
}

export function HolidayCard({ nextHoliday, onViewAll }: HolidayCardProps) {
  return (
    <div className="quick-card quick-card--holiday">
      <div className="quick-card__top">
        <h3 className="quick-card__title">Next Holiday</h3>
        <button className="quick-card__link-btn" onClick={onViewAll}>View All</button>
      </div>
      <div className="quick-card__holiday-info">
        <div className="quick-card__holiday-icon">🪔</div>
        <div>
          <div className="quick-card__holiday-name">{nextHoliday.name}</div>
          <div className="quick-card__holiday-date">{nextHoliday.date}</div>
        </div>
      </div>
    </div>
  );
}

export function BirthdayCard({ name, position, onSendWishes }: BirthdayCardProps) {
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    onSendWishes();
  };

  return (
    <div className="quick-card quick-card--birthday">
      <div className="quick-card__top">
        <h3 className="quick-card__title">Today Birthday</h3>
        <button
          className={`quick-card__action-btn ${sent ? 'quick-card__action-btn--sent' : ''}`}
          onClick={handleSend}
        >
          {sent ? '🎉 Sent!' : 'Send Wishes'}
        </button>
      </div>
      <div className="quick-card__birthday-info">
        <div className="quick-card__birthday-avatar">{name.charAt(0)}</div>
        <div>
          <div className="quick-card__birthday-name">{name}</div>
          <div className="quick-card__birthday-pos">{position}</div>
        </div>
      </div>
    </div>
  );
}
