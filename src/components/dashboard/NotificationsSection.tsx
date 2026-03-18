import type { Notification } from '../../types';
import './NotificationsSection.css';

interface NotificationsSectionProps {
  notifications: Notification[];
}

function NotificationItem({ notif }: { notif: Notification }) {
  return (
    <div className={`notif-item ${!notif.isRead ? 'notif-item--unread' : ''}`}>
      <div className="notif-item__avatar">
        {notif.title.charAt(0)}
      </div>
      <div className="notif-item__content">
        <div className="notif-item__title">{notif.title}</div>
        <div className="notif-item__date">{notif.date}</div>
        <p className="notif-item__message">{notif.message}</p>
      </div>
      {!notif.isRead && <span className="notif-item__badge" />}
    </div>
  );
}

export default function NotificationsSection({ notifications }: NotificationsSectionProps) {
  return (
    <div className="notifs-section">
      <div className="notifs-section__header">
        <h2 className="notifs-section__title">Notifications</h2>
        <button className="notifs-section__view-all">View All</button>
      </div>
      <div className="notifs-section__list">
        {notifications.map(notif => (
          <NotificationItem key={notif.id} notif={notif} />
        ))}
      </div>
    </div>
  );
}
