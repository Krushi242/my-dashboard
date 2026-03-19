import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { TeamMember } from '../../types';
import './TeamPage.css';

type RoleFilter = 'all' | 'uiux' | 'frontend' | 'wordpress' | 'management' | 'engineering';
type SortFilter = 'newest' | 'name';

function roleBucket(member: TeamMember): RoleFilter {
  const p = member.position.toLowerCase();
  const d = member.department.toLowerCase();
  if (p.includes('ui') || p.includes('ux')) return 'uiux';
  if (p.includes('frontend')) return 'frontend';
  if (p.includes('wordpress')) return 'wordpress';
  if (d.includes('management')) return 'management';
  if (d.includes('engineering')) return 'engineering';
  return 'all';
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? 'U';
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';
  return (a + b).toUpperCase();
}

export default function TeamPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortFilter>('newest');
  const [role, setRole] = useState<RoleFilter>('all');

  useEffect(() => {
    let alive = true;
    api.team.getAll().then((data) => {
      if (!alive) return;
      setMembers(data);
    });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byRole = members.filter((m) => (role === 'all' ? true : roleBucket(m) === role));
    const bySearch = byRole.filter((m) => {
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.position.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q)
      );
    });

    const sorted = [...bySearch].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // "newest" fallback to id ordering for now (backend will provide joining date)
      return b.id.localeCompare(a.id);
    });

    return sorted;
  }, [members, role, search, sortBy]);

  return (
    <div className="team-page">
      <div className="team-page__topbar">
        <div>
          <h1 className="team-page__title">Team</h1>
          <nav className="breadcrumb">
            <span>🏠</span>
            <span className="breadcrumb__sep"> / </span>
            <span>Employee Dashboard</span>
            <span className="breadcrumb__sep"> / </span>
            <span style={{ color: 'var(--text-secondary)' }}>Team</span>
          </nav>
        </div>
      </div>

      <div className="team-toolbar">
        <div className="team-search">
          <input
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" aria-label="Search">
            <Search size={14} />
          </button>
        </div>

        <div className="team-toolbar__filters">
          <select className="team-filter" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortFilter)}>
            <option value="newest">Newest Joinee ▾</option>
            <option value="name">Name A–Z</option>
          </select>
          <select className="team-filter" value={role} onChange={(e) => setRole(e.target.value as RoleFilter)}>
            <option value="all">All Roles ▾</option>
            <option value="uiux">UI/UX Designer</option>
            <option value="frontend">Frontend Developer</option>
            <option value="wordpress">WordPress Developer</option>
            <option value="management">Management</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>
      </div>

      <div className="team-grid">
        {filtered.map((m) => (
          <div key={m.id} className="team-card">
            <div className="team-card__top">
              <div className="team-avatar" aria-hidden="true">
                {m.avatar ? (
                  <img src={m.avatar} alt="" />
                ) : (
                  <span className="team-avatar__initials">{initials(m.name)}</span>
                )}
              </div>
              <div className="team-card__meta">
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.position}</div>
              </div>
            </div>

            <div className="team-card__actions">
              <button
                type="button"
                className="team-card__btn"
                onClick={() => navigate(`/team/${encodeURIComponent(m.id)}`)}
              >
                View Profile
              </button>
              <button type="button" className="team-card__chat" aria-label="Chat">
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

