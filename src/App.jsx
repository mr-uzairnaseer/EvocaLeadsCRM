import React from 'react';
import { 
  Users, LayoutDashboard, Target, Building2, UserCircle, 
  Calendar, ChevronRight, LogOut, Bell, User,
  PanelLeft, Search, Moon
} from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-box">Evoca</div>
        </div>

        <div className="sidebar-scrollable">
          <div className="nav-section-label">Navigation</div>
          <nav className="nav-menu">
            <div className="nav-item active">
              <div className="nav-item-icon"><LayoutDashboard size={20} /></div>
              <span>Dashboard</span>
              <ChevronRight size={16} className="nav-item-arrow" />
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><Target size={20} /></div>
              <span>Opportunities</span>
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><Building2 size={20} /></div>
              <span>Accounts</span>
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><UserCircle size={20} /></div>
              <span>Contact</span>
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><Calendar size={20} /></div>
              <span>Calendar</span>
            </div>
          </nav>

          <div className="nav-section-label">Admin</div>
          <nav className="nav-menu">
            <div className="nav-item">
              <div className="nav-item-icon"><Users size={20} /></div>
              <span>Users</span>
            </div>
          </nav>

          <div className="nav-section-label">Team</div>
          <div className="team-subtitle">ADMIN</div>
          <div className="team-list">
            <TeamMember name="Vandan Popat" />
            <TeamMember name="Oleksiy Radchenko" />
            <TeamMember name="Janey Chudasama" />
            <TeamMember name="James King" />
            <TeamMember name="Aivi Verousi" />
            <TeamMember name="Umair" />
            <TeamMember name="James King" />
          </div>

          <div className="team-subtitle" style={{ marginTop: '1.5rem' }}>BDM</div>
          <div className="team-list">
            <TeamMember name="Aaron wake" />
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar"><User size={20} /></div>
            <div className="user-info">
              <div className="user-name">Umair</div>
              <div className="user-email">mr.umairnaseer@gmai...</div>
            </div>
          </div>
          
          <div className="logout-btn">
            <LogOut size={18} />
            <span>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-wrapper">
        <header className="top-nav">
          <button className="sidebar-toggle-btn">
            <PanelLeft size={18} />
          </button>
          
          <div className="search-wrapper">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search everything..." />
              <div className="kb-hint">⌘ K</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="nav-action-btn">
              <Bell size={18} />
            </button>
            <button className="nav-action-btn">
              <Moon size={18} />
            </button>
          </div>
        </header>

        <div className="page-content">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827' }}>Dashboard Overview</h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.875rem' }}>Welcome back, Umair. Here's what's happening today.</p>
          
          <div style={{ 
            marginTop: '2rem', 
            height: '400px', 
            border: '1px solid #e5e7eb', 
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            background: '#f9fafb'
          }}>
            Page Content Area
          </div>
        </div>
      </main>
    </div>
  );
}

const TeamMember = ({ name }) => (
  <div className="team-member">
    <div className="status-dot"></div>
    <span>{name}</span>
  </div>
);

export default App;
