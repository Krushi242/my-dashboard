import { useState } from 'react';
import './TimelineChart.css';

interface TimelineData {
  productiveHours: string;
  breakHours: string;
  overtime: string;
  totalWorkingHours: string;
}

interface TimelineChartProps {
  data: TimelineData;
}

const HOURS = ['9:00','10:00','11:00','12:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','9:00'];

// Each segment: startPct, widthPct, color
const SEGMENTS = [
  { left: '0%', width: '38%', color: '#FFB31F', label: 'Productive' },    // 9:00-12:00ish
  { left: '38%', width: '10%', color: '#4DA6FF', label: 'Break' },         // 12:00-01:00
  { left: '48%', width: '12%', color: '#FF5B5B', label: 'Overtime' },      // 01:00-02:00
  { left: '60%', width: '30%', color: '#FFB31F', label: 'Productive' },    // 02:00-06:00
  { left: '90%', width: '10%', color: '#FF5B5B', label: 'Overtime' },
];

export default function TimelineChart({ data }: TimelineChartProps) {
  const [period, setPeriod] = useState<'Day' | 'Week' | 'Month'>('Day');

  return (
    <div className="timeline-chart">
      <div className="timeline-chart__header">
        <div className="timeline-chart__stats">
          <div className="timeline-stat">
            <span className="timeline-stat__dot timeline-stat__dot--orange" />
            <div>
              <div className="timeline-stat__label">Productive Hours</div>
              <div className="timeline-stat__value">{data.productiveHours}</div>
            </div>
          </div>
          <div className="timeline-stat">
            <span className="timeline-stat__dot timeline-stat__dot--blue" />
            <div>
              <div className="timeline-stat__label">Break hours</div>
              <div className="timeline-stat__value">{data.breakHours}</div>
            </div>
          </div>
          <div className="timeline-stat">
            <span className="timeline-stat__dot timeline-stat__dot--red" />
            <div>
              <div className="timeline-stat__label">Overtime</div>
              <div className="timeline-stat__value">{data.overtime}</div>
            </div>
          </div>
          <div className="timeline-stat">
            <span className="timeline-stat__dot timeline-stat__dot--green" />
            <div>
              <div className="timeline-stat__label">Total Working hours</div>
              <div className="timeline-stat__value">{data.totalWorkingHours}</div>
            </div>
          </div>
        </div>
        <select
          className="timeline-chart__period"
          value={period}
          onChange={e => setPeriod(e.target.value as typeof period)}
        >
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>

      {/* Bar */}
      <div className="timeline-chart__bar-wrapper">
        <div className="timeline-chart__bar">
          {SEGMENTS.map((seg, i) => (
            <div
              key={i}
              className="timeline-chart__segment"
              style={{
                left: seg.left,
                width: seg.width,
                background: seg.color,
              }}
              title={seg.label}
            />
          ))}
        </div>
        {/* Hour labels */}
        <div className="timeline-chart__hours">
          {HOURS.map((h, i) => (
            <span key={i} className="timeline-chart__hour">{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
