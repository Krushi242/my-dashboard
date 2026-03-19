import { useState } from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import './Header.css';

interface HeaderProps {
  sidebarWidth: number;
}

export default function Header({ sidebarWidth }: HeaderProps) {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="header" style={{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }}>
      <div className="header__search">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search by anything"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <button className="header__search-btn" aria-label="Search">
          <Search size={16} />
        </button>
      </div>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="Messages">
          <MessageSquare size={18} />
        </button>
        <button className="header__icon-btn header__icon-btn--badge" aria-label="Notifications">
          <Bell size={18} />
          <span className="header__badge">3</span>
        </button>
        <div className="header__avatar">
          <div className="header__avatar-img">
            {user?.name?.charAt(0) ?? 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
