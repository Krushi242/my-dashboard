import { useEffect, useState } from 'react';
import { User, Pencil } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import type { TeamProfile } from '../../types';
import './TeamDetailPage.css';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'U';
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
  return (a + b).toUpperCase();
}

export default function TeamDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ?? '';

  const [profile, setProfile] = useState<TeamProfile | null>(null);

  useEffect(() => {
    let alive = true;
    api.team
      .getById(id)
      .then((p) => {
        if (!alive) return;
        setProfile(p);
      })
      .catch(() => {
        if (!alive) return;
        setProfile(null);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  if (!profile) {
    return (
      <div className="team-detail">
        <div className="team-detail__topbar">
          <div>
            <h1 className="team-detail__title">Profile</h1>
            <nav className="breadcrumb">
              <span>🏠</span>
              <span className="breadcrumb__sep"> / </span>
              <span>Employee Dashboard</span>
              <span className="breadcrumb__sep"> / </span>
              <span>Team</span>
              <span className="breadcrumb__sep"> / </span>
              <span style={{ color: 'var(--text-secondary)' }}>—</span>
            </nav>
          </div>
          <button className="team-detail__back-btn" type="button" onClick={() => navigate('/team')}>
            <User size={16} /> View All Team
          </button>
        </div>
        <div className="team-detail__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="team-detail">
      <div className="team-detail__topbar">
        <div>
          <h1 className="team-detail__title">Profile : {profile.name}</h1>
          <nav className="breadcrumb">
            <span>🏠</span>
            <span className="breadcrumb__sep"> / </span>
            <span>Employee Dashboard</span>
            <span className="breadcrumb__sep"> / </span>
            <Link to="/team">Team</Link>
            <span className="breadcrumb__sep"> / </span>
            <span style={{ color: 'var(--text-secondary)' }}>{profile.name}</span>
          </nav>
        </div>
        <button className="team-detail__back-btn" type="button" onClick={() => navigate('/team')}>
          <User size={16} /> View All Team
        </button>
      </div>

      <div className="team-detail__grid">
        <div className="team-detail__left">
          <div className="profile-card">
            <div className="profile-card__header">
              <div className="profile-card__identity">
                <div className="profile-card__avatar" aria-hidden="true">
                  {profile.avatar ? <img src={profile.avatar} alt="" /> : <span>{initials(profile.name)}</span>}
                </div>
                <div>
                  <div className="profile-card__name">{profile.name}</div>
                  <div className="profile-card__role">{profile.position}</div>
                </div>
              </div>
              <button type="button" className="profile-card__edit">
                <Pencil size={14} /> Edit Profile
              </button>
            </div>

            <div className="profile-card__info">
              <div className="profile-kv">
                <div className="profile-kv__label">Employee ID</div>
                <div className="profile-kv__value">{profile.employeeCode}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Date of Join</div>
                <div className="profile-kv__value">{profile.dateOfJoin}</div>
              </div>

              <div className="profile-kv">
                <div className="profile-kv__label">Experience</div>
                <div className="profile-kv__value">{profile.experienceLabel}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Birthday</div>
                <div className="profile-kv__value">{profile.birthday}</div>
              </div>

              <div className="profile-kv">
                <div className="profile-kv__label">Married status</div>
                <div className="profile-kv__value">{profile.maritalStatus}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Blood Group</div>
                <div className="profile-kv__value">{profile.bloodGroup}</div>
              </div>

              <div className="profile-kv">
                <div className="profile-kv__label">Mobile Number</div>
                <div className="profile-kv__value">{profile.phone}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Emergency Contact Number</div>
                <div className="profile-kv__value">{profile.emergencyContactNumber}</div>
              </div>

              <div className="profile-kv">
                <div className="profile-kv__label">Email</div>
                <div className="profile-kv__value">{profile.email}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Emergency Contact Number</div>
                <div className="profile-kv__value">{profile.emergencyContactNumber}</div>
              </div>

              <div className="profile-kv">
                <div className="profile-kv__label">Nationality</div>
                <div className="profile-kv__value">{profile.nationality}</div>
              </div>
              <div className="profile-kv profile-kv--right">
                <div className="profile-kv__label">Religion</div>
                <div className="profile-kv__value">{profile.religion}</div>
              </div>

              <div className="profile-kv profile-kv--full">
                <div className="profile-kv__label">Address</div>
                <div className="profile-kv__value">{profile.address}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="team-detail__right">
          <section className="detail-card">
            <h2 className="detail-card__title">About {profile.name}</h2>
            <p className="detail-card__text">{profile.about}</p>
          </section>

          <section className="detail-card">
            <h2 className="detail-card__title">Family Information</h2>
            <div className="detail-table">
              <div className="detail-table__head">
                <span>Name</span>
                <span>Relationship</span>
                <span>Contact Number</span>
              </div>
              {profile.family.length === 0 ? (
                <div className="detail-table__empty">No family details</div>
              ) : (
                profile.family.map((f) => (
                  <div key={f.id} className="detail-table__row">
                    <span className="detail-table__cell">{f.name}</span>
                    <span className="detail-table__cell detail-table__cell--muted">{f.relationship}</span>
                    <span className="detail-table__cell">{f.contactNumber}</span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="detail-card">
            <h2 className="detail-card__title">Education Details</h2>
            <div className="edu-grid">
              {profile.education.length === 0 ? (
                <div className="detail-table__empty">No education details</div>
              ) : (
                profile.education.map((e) => (
                  <div key={e.id} className="edu-item">
                    <div className="edu-item__institute">{e.institute}</div>
                    <div className="edu-item__course">{e.course}</div>
                    <div className="edu-item__years">{e.years}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

