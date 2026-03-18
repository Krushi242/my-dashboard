import { useState } from 'react';
import './AttendanceCard.css';

interface AttendanceCardProps {
  officeTime: string;
  breakTime: string;
  breakRemaining: string;
}

export default function AttendanceCard({ officeTime, breakTime, breakRemaining }: AttendanceCardProps) {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  return (
    <div className="attendance-cards">
      {/* Mark Attendance */}
      <div className="attendance-card attendance-card--green">
        <h3 className="attendance-card__title">Mark Attendance</h3>
        <div className="attendance-card__time-label">Office Time</div>
        <div className="attendance-card__time">{officeTime}</div>
        <button
          className={`attendance-card__btn ${isPunchedIn ? 'attendance-card__btn--out' : ''}`}
          onClick={() => setIsPunchedIn(prev => !prev)}
        >
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </button>
      </div>

      {/* Break Time */}
      <div className="attendance-card attendance-card--dark">
        <h3 className="attendance-card__title">Break Time</h3>
        <div className="attendance-card__break-row">
          <div>
            <div className="attendance-card__time-label">Break Time</div>
            <div className="attendance-card__time">{breakTime}</div>
          </div>
          <div>
            <div className="attendance-card__time-label">Remaining</div>
            <div className="attendance-card__time">{breakRemaining}</div>
          </div>
        </div>
        <div className="attendance-card__break-btns">
          <button
            className={`attendance-card__btn attendance-card__btn--outline ${isOnBreak ? 'attendance-card__btn--active' : ''}`}
            onClick={() => setIsOnBreak(true)}
          >
            Break In
          </button>
          <button
            className="attendance-card__btn attendance-card__btn--outline"
            onClick={() => setIsOnBreak(false)}
          >
            Break Out
          </button>
        </div>
      </div>
    </div>
  );
}
