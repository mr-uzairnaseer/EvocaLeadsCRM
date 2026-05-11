import React, { useState } from 'react';
import { 
  Users, LayoutDashboard, Target, Building2, UserCircle, 
  Calendar, ChevronRight, LogOut, Bell, User,
  PanelLeft, Search, Moon, BarChart3, RefreshCw, 
  TrendingUp, Phone, ArrowRight, Activity, 
  Upload, Plus, Filter, MoreHorizontal, Copy, Grid, List, ChevronDown
} from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

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
            <div 
              className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('Dashboard')}
            >
              <div className="nav-item-icon"><LayoutDashboard size={18} /></div>
              <span>Dashboard</span>
              {activeTab === 'Dashboard' && <ChevronRight size={14} className="nav-item-arrow" />}
            </div>
            <div 
              className={`nav-item ${activeTab === 'Opportunities' ? 'active' : ''}`}
              onClick={() => setActiveTab('Opportunities')}
            >
              <div className="nav-item-icon"><Target size={18} /></div>
              <span>Opportunities</span>
              {activeTab === 'Opportunities' && <ChevronRight size={14} className="nav-item-arrow" />}
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><Building2 size={18} /></div>
              <span>Accounts</span>
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><UserCircle size={18} /></div>
              <span>Contact</span>
            </div>
            <div className="nav-item">
              <div className="nav-item-icon"><Calendar size={18} /></div>
              <span>Calendar</span>
            </div>
          </nav>

          <div className="nav-section-label">Admin</div>
          <nav className="nav-menu">
            <div className="nav-item">
              <div className="nav-item-icon"><Users size={18} /></div>
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
            <div className="user-avatar">U</div>
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

      {/* Main Wrapper */}
      <main className="main-wrapper">
        <header className="top-nav">
          <button className="sidebar-toggle-btn"><PanelLeft size={18} /></button>
          <div className="search-bar">
            <Search size={16} color="#9ca3af" />
            <input type="text" placeholder="Search everything..." />
            <div className="kb-hint">⌘ K</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="nav-action-btn"><Bell size={18} /></button>
            <button className="nav-action-btn"><Moon size={18} /></button>
          </div>
        </header>

        {activeTab === 'Dashboard' ? <DashboardView /> : <OpportunitiesView />}
      </main>
    </div>
  );
}

const DashboardView = () => (
  <div className="page-content">
    <header className="page-header">
      <h1>Dashboard</h1>
      <p>Your payments pipeline at a glance</p>
    </header>

    <section className="stats-grid">
      <StatCard label="Opportunities" value="21354" sub="Active in pipeline" icon={<Target size={16} />} />
      <StatCard label="Appointments" value="87" sub="Total" icon={<Calendar size={16} />} />
      <StatCard label="Sold" value="2" sub="Total accounts" icon={<TrendingUp size={16} />} />
      <StatCard label="Conversion" value="0%" sub="Opp to account" icon={<BarChart3 size={16} />} />
      <StatCard label="CC:Sale" value="10721:1" sub="Calls to sale" icon={<Phone size={16} />} />
    </section>

    <section className="pipeline-section">
      <div className="pipeline-top">
        <div className="pipeline-title">Pipeline</div>
        <div style={{ color: '#9ca3af' }}><BarChart3 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Lead to Transacting</div>
      </div>
      <div className="pipeline-stepper">
        <PipelineStep num="21269" label="New" />
        <PipelineStep num="83" label="Contacted" />
        <PipelineStep num="2" label="Qualified" />
        <PipelineStep num="87" label="Booked" />
        <PipelineStep num="2" label="Approved" />
        <PipelineStep num="0" label="Delivered" />
        <PipelineStep num="0" label="Transacting" />
        <PipelineStep num="0" label="Non-Trans." />
      </div>
    </section>

    <div className="dashboard-bottom-grid">
      <div className="bottom-card">
        <div className="card-header">
          <div className="card-title">Recent Opportunities</div>
          <div className="card-link">View All</div>
        </div>
        <div className="opportunity-list">
          <OpportunityItem name="Berkeley Heath Auto Centre" contact="Paul" />
          <OpportunityItem name="Martin Richings Motor Repairs" contact="Martin" />
          <OpportunityItem name="Motortech" contact="Steve" />
          <OpportunityItem name="Circuit Motors Ltd" contact="Circuit" />
          <OpportunityItem name="Purley Road Garage" contact="Purley" />
        </div>
      </div>

      <div className="bottom-card">
        <div className="card-header">
          <div className="card-title">Recent Activity</div>
          <Activity size={16} color="#9ca3af" />
        </div>
        <div className="activity-list">
          <ActivityItem user="Oleksiy Radchenko" text="owner not in, callbacks cheduled" time="May 11, 8:36 PM" />
          <ActivityItem user="System" text="New lead created: Berkeley Heath Auto Centre" time="May 11, 8:36 PM" />
          <ActivityItem user="Oleksiy Radchenko" text="call back arranged" time="May 11, 8:24 PM" />
          <ActivityItem user="System" text="New lead created: Martin Richings Motor Repairs" time="May 11, 8:23 PM" />
          <ActivityItem user="Vandan Popat" text="ring out, no answer" time="May 11, 8:22 PM" />
        </div>
      </div>
    </div>
  </div>
);

const OpportunitiesView = () => (
  <div className="page-content">
    <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1>Opportunities</h1>
        <p>Manage your payment opportunities pipeline</p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="btn-secondary"><Upload size={16} /> Import CSV</button>
        <button className="btn-primary"><Plus size={16} /> Add Opportunity</button>
      </div>
    </header>

    <div className="filters-bar">
      <div className="filter-search">
        <Search size={16} color="#94a3b8" />
        <input type="text" placeholder="Search or use PL + BS + BA for postcodes..." />
      </div>
      <button className="filter-dropdown">
        <Filter size={16} />
        <span>All Status</span>
        <ChevronDown size={14} />
      </button>
      <button className="filter-dropdown">
        <UserCircle size={16} />
        <span>All Users</span>
        <ChevronDown size={14} />
      </button>
      <button className="btn-secondary" style={{ padding: '0 1rem' }}>My Items</button>
      <div className="view-toggle">
        <button className="view-btn"><Grid size={16} /></button>
        <button className="view-btn active"><List size={16} /></button>
      </div>
    </div>

    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Business <BarChart3 size={12} className="sort-icon" /></th>
            <th>Contact <BarChart3 size={12} className="sort-icon" /></th>
            <th>Phone <BarChart3 size={12} className="sort-icon" /></th>
            <th>Postcode <BarChart3 size={12} className="sort-icon" /></th>
            <th>Status <BarChart3 size={12} className="sort-icon" /></th>
            <th>BDA</th>
            <th>BDM</th>
            <th>Callback <BarChart3 size={12} className="sort-icon" /></th>
            <th>Provider <BarChart3 size={12} className="sort-icon" /></th>
          </tr>
        </thead>
        <tbody>
          <TableRow business="Berkeley Heath Auto Centre" contact="Paul" phone="01453 511533" postcode="GL13 9ET" bda="Oleksiy Radchenko" bdm="James King" callback="18/05/26" provider="—" />
          <TableRow business="Martin Richings Motor Repairs" contact="Martin" phone="01454 311663" postcode="BS37 6AA" bda="Oleksiy Radchenko" bdm="James King" callback="18/05/26" provider="WorldPay" />
          <TableRow business="Motortech" contact="Steve" phone="—" postcode="GL7 1YG" bda="Oleksiy Radchenko" bdm="James King" callback="12/05/26" provider="—" />
          <TableRow business="Circuit Motors Ltd" contact="—" phone="01249 782596" postcode="SN14 7HB" bda="Oleksiy Radchenko" bdm="James King" callback="27/05/26" provider="iZettle" />
          <TableRow business="Purley Road Garage" contact="—" phone="01285 652365" postcode="GL7 1ER" bda="Oleksiy Radchenko" bdm="James King" callback="12/05/26" provider="—" />
          <TableRow business="OPD Auto Services Ltd" contact="—" phone="01452 771009" postcode="GL6 7AS" bda="Oleksiy Radchenko" bdm="James King" callback="28/05/26" provider="WorldPay" />
          <TableRow business="Holbrook Garage" contact="Fam" phone="01452 770272" postcode="GL6 7BX" bda="Oleksiy Radchenko" bdm="James King" callback="11/11/26" provider="HandyPay" />
          <TableRow business="Gloucester Centre for MG's" contact="—" phone="01453 825164" postcode="GL10 2LA" bda="Oleksiy Radchenko" bdm="James King" callback="19/05/26" provider="—" />
        </tbody>
      </table>
    </div>
  </div>
);

const TableRow = ({ business, contact, phone, postcode, bda, bdm, callback, provider }) => (
  <tr>
    <td><input type="checkbox" /></td>
    <td className="business-cell">{business}</td>
    <td className="contact-cell">{contact}</td>
    <td className="phone-cell">
      {phone} {phone !== '—' && <Copy size={12} className="copy-icon" />}
    </td>
    <td>{postcode}</td>
    <td><span className="new-badge">new</span></td>
    <td className="team-cell">{bda}</td>
    <td className="team-cell">{bdm}</td>
    <td>{callback}</td>
    <td className="provider-cell">{provider}</td>
  </tr>
);

const TeamMember = ({ name }) => (
  <div className="team-member">
    <div className="status-dot"></div>
    <span>{name}</span>
  </div>
);

const StatCard = ({ label, value, sub, icon }) => (
  <div className="stat-card">
    <div className="stat-header">
      <span className="stat-label">{label}</span>
      <div className="stat-icon-box">{icon}</div>
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-subtext">{sub}</div>
    <div className="stat-link">View <ArrowRight size={12} /></div>
  </div>
);

const PipelineStep = ({ num, label }) => (
  <div className="pipeline-step">
    <div className="pipeline-num">{num}</div>
    <div className="pipeline-label">{label}</div>
  </div>
);

const OpportunityItem = ({ name, contact }) => (
  <div className="opportunity-item">
    <div>
      <div className="opp-name">{name}</div>
      <div className="opp-contact">{contact}</div>
    </div>
    <div className="new-badge">new</div>
  </div>
);

const ActivityItem = ({ user, text, time }) => (
  <div className="activity-item">
    <div className="activity-dot"></div>
    <div className="activity-info">
      <div className="activity-text"><span style={{ fontWeight: 800 }}>{user}</span>: {text}</div>
      <div className="activity-time">{time}</div>
    </div>
  </div>
);

export default App;
