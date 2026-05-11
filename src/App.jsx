import React from 'react';
import { 
  Users, LayoutDashboard, Target, Building2, UserCircle, 
  Calendar, ChevronRight, LogOut, Bell, User
} from 'lucide-react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar - 100% Match with Screenshot */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">Z</div>
          <span className="brand-name">Zen Hub</span>
        </div>

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

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar"><User size={24} /></div>
            <div className="user-info">
              <div className="user-name">Umair</div>
              <div className="user-email">mr.umairnaseer@gmai...</div>
            </div>
            <Bell size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
          </div>
          
          <div className="logout-btn">
            <LogOut size={20} />
            <span>Log out</span>
          </div>
        </div>
      </aside>

      {/* Main Content Placeholder */}
      <main className="main-content">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>Dashboard Overview</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Welcome back, Umair.</p>
        
        {/* Placeholder for future dashboard content */}
        <div style={{ 
          marginTop: '2rem', 
          height: '400px', 
          border: '2px dashed #e5e7eb', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af'
        }}>
          Dashboard Content Area
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
