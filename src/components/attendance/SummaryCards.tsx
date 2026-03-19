import { TrendingDown, TrendingUp } from 'lucide-react';
import './SummaryCards.css';

export type SummaryTone = 'teal' | 'green' | 'blue' | 'orange';

export interface AttendanceSummaryCard {
  title: string;
  value: string;
  target: string;
  deltaValue: string;
  deltaLabel: string;
  deltaDirection: 'up' | 'down';
  tone: SummaryTone;
}

function ToneClass(tone: SummaryTone) {
  switch (tone) {
    case 'teal':
      return 'summary-card--teal';
    case 'green':
      return 'summary-card--green';
    case 'blue':
      return 'summary-card--blue';
    case 'orange':
      return 'summary-card--orange';
    default: {
      const exhaustive: never = tone;
      return exhaustive;
    }
  }
}

export default function SummaryCards({ cards }: { cards: AttendanceSummaryCard[] }) {
  return (
    <div className="summary-grid">
      {cards.map((c) => {
        const TrendIcon = c.deltaDirection === 'up' ? TrendingUp : TrendingDown;
        return (
          <div key={c.title} className={`summary-card ${ToneClass(c.tone)}`}>
            <div className="summary-card__title">{c.title}</div>
            <div className="summary-card__value">
              <span className="summary-card__value-main">{c.value}</span>
              <span className="summary-card__value-sep">/</span>
              <span className="summary-card__value-target">{c.target}</span>
            </div>
            <div className="summary-card__delta">
              <span className="summary-card__delta-icon">
                <TrendIcon size={14} />
              </span>
              <span className="summary-card__delta-text">
                <span className="summary-card__delta-value">{c.deltaValue}</span>
                <span className="summary-card__delta-label">{c.deltaLabel}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

