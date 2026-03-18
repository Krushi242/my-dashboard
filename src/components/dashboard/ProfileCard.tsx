import { Edit2 } from 'lucide-react';
import type { User } from '../../types';
import './ProfileCard.css';

interface ProfileCardProps {
  user: User;
  workedDays: string;
}

export default function ProfileCard({ user, workedDays }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <button className="profile-card__edit" aria-label="Edit profile">
        <Edit2 size={14} />
      </button>

      <div className="profile-card__header">
        <div className="profile-card__avatar">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="profile-card__name">{user.name}</div>
          <div className="profile-card__position">{user.position}</div>
        </div>
      </div>

      <div className="profile-card__details">
        <div className="profile-card__field">
          <span className="profile-card__label">Phone Number</span>
          <span className="profile-card__value">{user.phone}</span>
        </div>
        <div className="profile-card__field">
          <span className="profile-card__label">Email Address</span>
          <span className="profile-card__value profile-card__value--green">{user.email}</span>
        </div>
        <div className="profile-card__field">
          <span className="profile-card__label">Joining Date</span>
          <span className="profile-card__value">{user.joiningDate}</span>
        </div>
        <div className="profile-card__field">
          <span className="profile-card__label">Overall Worked Days</span>
          <span className="profile-card__value profile-card__value--bold">{workedDays}</span>
        </div>
      </div>
    </div>
  );
}
