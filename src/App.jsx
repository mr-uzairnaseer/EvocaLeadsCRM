import React, { useState } from 'react';
import { 
  Users, LayoutDashboard, Target, Building2, UserCircle, 
  Calendar, ChevronRight, LogOut, Bell, User,
  PanelLeft, Search, Moon, BarChart3, RefreshCw, 
  TrendingUp, Phone, ArrowRight, Activity, 
  Upload, Plus, Filter, MoreHorizontal, Copy, Grid, List, ChevronDown, Check, ChevronLeft, X, FileText, Download, Building,
  MessageSquare, Eye, PlayCircle, Clock, Mail, Edit3, UserX, Key, Trash2
} from 'lucide-react';
import './index.css';

const SEARCH_DATA = [
  // Opportunities
  { id: 'o1', type: 'Opportunity', title: 'Berkeley Heath Auto Centre', subtitle: 'Paul • GL13 9ET', icon: 'Target' },
  { id: 'o2', type: 'Opportunity', title: 'Martin Richings Motor Repairs', subtitle: 'Martin • BS37 6AA', icon: 'Target' },
  { id: 'o3', type: 'Opportunity', title: 'Motortech', subtitle: 'Steve • GL7 1YG', icon: 'Target' },
  { id: 'o4', type: 'Opportunity', title: 'Circuit Motors Ltd', subtitle: 'SN14 7HB', icon: 'Target' },
  { id: 'o5', type: 'Opportunity', title: 'Purley Road Garage', subtitle: 'GL7 1ER', icon: 'Target' },
  { id: 'o6', type: 'Opportunity', title: 'OPD Auto Services Ltd', subtitle: 'GL6 7AS', icon: 'Target' },
  { id: 'o7', type: 'Opportunity', title: 'Holbrook Garage', subtitle: 'Fam • GL6 7BX', icon: 'Target' },
  { id: 'o8', type: 'Opportunity', title: 'Gloucester Centre for MG\'s', subtitle: 'GL10 2LA', icon: 'Target' },
  
  // Accounts
  { id: 'a1', type: 'Account', title: 'Frankham Motor Services', subtitle: 'Drena • SN15 4NX', icon: 'Building2' },
  { id: 'a2', type: 'Account', title: 'Ian Paull Car Repairs', subtitle: 'Cornwall', icon: 'Building2' },
  
  // Users
  { id: 'u1', type: 'User', title: 'Vandan Popat', subtitle: '@vandan.p • ADMIN', icon: 'UserCircle' },
  { id: 'u2', type: 'User', title: 'Oleksiy Radchenko', subtitle: '@oleksiy.r • ADMIN', icon: 'UserCircle' },
  { id: 'u3', type: 'User', title: 'Janey Chudasama', subtitle: '@janey.c • ADMIN', icon: 'UserCircle' },
  { id: 'u4', type: 'User', title: 'James King', subtitle: '@jimmybigburgers • ADMIN', icon: 'UserCircle' },
  { id: 'u5', type: 'User', title: 'Aivi Verousi', subtitle: '@aivi.v • ADMIN', icon: 'UserCircle' },
  { id: 'u6', type: 'User', title: 'Aaron wake', subtitle: '@aaron • BDM', icon: 'UserCircle' },
  { id: 'u7', type: 'User', title: 'Umair', subtitle: '@mr.umairnaseer • ADMIN', icon: 'UserCircle' },

  // Appointments
  { id: 'ap1', type: 'Appointment', title: '7a Coffee Shop', subtitle: 'Callback • 9:00 AM', icon: 'Calendar' },
  { id: 'ap2', type: 'Appointment', title: 'Nile Valley Cafe', subtitle: 'Appointment', icon: 'Calendar' },
  { id: 'ap3', type: 'Appointment', title: 'Hush Hair & Beauty', subtitle: 'Appointment', icon: 'Calendar' },
  { id: 'ap4', type: 'Appointment', title: 'Sarah\'s Cake Shop', subtitle: 'Appointment', icon: 'Calendar' },
];

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalMode, setUserModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchPopup(true);
      }
      if (e.key === 'Escape') {
        setShowSearchPopup(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`app-container ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
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
            <div 
              className={`nav-item ${activeTab === 'Accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('Accounts')}
            >
              <div className="nav-item-icon"><Building2 size={18} /></div>
              <span>Accounts</span>
              {activeTab === 'Accounts' && <ChevronRight size={14} className="nav-item-arrow" />}
            </div>
            <div 
              className={`nav-item ${activeTab === 'Contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('Contact')}
            >
              <div className="nav-item-icon"><UserCircle size={18} /></div>
              <span>Contact</span>
              {activeTab === 'Contact' && <ChevronRight size={14} className="nav-item-arrow" />}
            </div>
            <div 
              className={`nav-item ${activeTab === 'Calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('Calendar')}
            >
              <div className="nav-item-icon"><Calendar size={18} /></div>
              <span>Calendar</span>
              {activeTab === 'Calendar' && <ChevronRight size={14} className="nav-item-arrow" />}
            </div>
          </nav>

          <div className="nav-section-label">Admin</div>
          <nav className="nav-menu">
            <div 
              className={`nav-item ${activeTab === 'Users' ? 'active' : ''}`}
              onClick={() => setActiveTab('Users')}
            >
              <div className="nav-item-icon"><Users size={18} /></div>
              <span>Users</span>
              {activeTab === 'Users' && <ChevronRight size={14} className="nav-item-arrow" />}
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
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <PanelLeft size={18} />
          </button>
          <div className="search-bar-trigger" onClick={() => setShowSearchPopup(true)}>
            <Search size={16} color="#9ca3af" />
            <span>Search everything...</span>
            <div className="kb-hint">⌘ K</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="nav-action-btn"><Bell size={18} /></button>
          </div>
        </header>

        {activeTab === 'Dashboard' && <DashboardView />}
        {activeTab === 'Opportunities' && <OpportunitiesView onAdd={() => setShowAddModal(true)} onImport={() => setShowImportModal(true)} />}
        {activeTab === 'Accounts' && <AccountsView onImport={() => setShowImportModal(true)} />}
        {activeTab === 'Contact' && <ContactView />}
        {activeTab === 'Calendar' && <CalendarView />}
        {activeTab === 'Users' && (
          <UsersView 
            onImport={() => setShowImportModal(true)} 
            onAdd={() => {
              setUserModalMode('add');
              setSelectedUser(null);
              setShowUserModal(true);
            }} 
            onEdit={(user) => {
              setUserModalMode('edit');
              setSelectedUser(user);
              setShowUserModal(true);
            }}
            onResetPassword={(name) => {
              setResetTargetUser(name);
              setShowResetPasswordModal(true);
            }}
          />
        )}
      </main>

      {/* Modals */}
      {showAddModal && <AddOpportunityModal onClose={() => setShowAddModal(false)} />}
      {showImportModal && <ImportLeadsModal onClose={() => setShowImportModal(false)} />}
      {showUserModal && <UserModal mode={userModalMode} user={selectedUser} onClose={() => setShowUserModal(false)} />}
      {showResetPasswordModal && <ResetPasswordModal user={resetTargetUser} onClose={() => setShowResetPasswordModal(false)} />}
      
      {/* Search Popup */}
      {showSearchPopup && <SearchPopup onClose={() => setShowSearchPopup(false)} />}
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
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="card-title" style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Opportunities</div>
          <div className="card-link" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>View All</div>
        </div>
        <div className="opportunity-list-clean">
          <OpportunityItem name="Berkeley Heath Auto Centre" contact="Paul" />
          <OpportunityItem name="Martin Richings Motor Repairs" contact="Martin" />
          <OpportunityItem name="Motortech" contact="Steve" />
          <OpportunityItem name="Circuit Motors Ltd" contact="" />
          <OpportunityItem name="Purley Road Garage" contact="" />
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

const OpportunitiesView = ({ onAdd, onImport }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <div className="page-content">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Opportunities</h1>
          <p>Manage your payment opportunities pipeline</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={onImport}><Upload size={16} /> Import CSV</button>
          <button className="btn-primary" onClick={onAdd}><Plus size={16} /> Add Opportunity</button>
        </div>
      </header>

      <div className="filters-bar">
        <div className="filter-search">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search or use PL + BS + BA for postcodes..." />
        </div>
        
        <div className="dropdown-container">
          <button className="filter-dropdown" onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <Filter size={16} />
            <span>All Status</span>
            <ChevronDown size={14} />
          </button>
          {showStatusDropdown && (
            <div className="custom-dropdown">
              <div className="dropdown-item active"><Check size={16} /> All Status</div>
              <div className="dropdown-item">New</div>
              <div className="dropdown-item">Contacted</div>
              <div className="dropdown-item">Qualified</div>
              <div className="dropdown-item">Converted</div>
              <div className="dropdown-item">Lost</div>
            </div>
          )}
        </div>

        <div className="dropdown-container">
          <button className="filter-dropdown" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <UserCircle size={16} />
            <span>All Users</span>
            <ChevronDown size={14} />
          </button>
          {showUserDropdown && (
            <div className="custom-dropdown">
              <div className="dropdown-item active"><Check size={16} /> All Users</div>
              <div className="dropdown-item">Vandan Popat</div>
              <div className="dropdown-item">Oleksiy Radchenko</div>
              <div className="dropdown-item">Janey Chudasama</div>
              <div className="dropdown-item">James King</div>
              <div className="dropdown-item">Aivi Verousi</div>
              <div className="dropdown-item">Aaron wake</div>
              <div className="dropdown-item">Umair</div>
            </div>
          )}
        </div>

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

      <div className="pagination-bar">
        <div className="pagination-info">Showing 1 to 8 of 21354 results</div>
        <div className="pagination-controls">
          <button className="page-nav-btn"><ChevronLeft size={16} /> Previous</button>
          <div className="page-numbers">
            <button className="page-num-btn active">1</button>
            <button className="page-num-btn">2</button>
            <button className="page-num-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-num-btn">2669</button>
          </div>
          <button className="page-nav-btn">Next <ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

const AccountsView = ({ onImport }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="page-content">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Accounts</h1>
          <p>0 transacting, 2 approved, 0 delivered, 0 non-transacting</p>
        </div>
        <button className="btn-secondary" onClick={onImport}><Upload size={16} /> Import CSV</button>
      </header>

      <div className="filters-bar">
        <div className="filter-search">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search accounts..." />
        </div>

        <div className="tab-toggle">
          {['All', 'Approved', 'Delivered', 'Transacting', 'Non-Trans.'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="dropdown-container">
          <button className="filter-dropdown" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <Filter size={16} />
            <span>All Users</span>
            <ChevronDown size={14} />
          </button>
          {showUserDropdown && (
            <div className="custom-dropdown">
              <div className="dropdown-item active"><Check size={16} /> All Users</div>
              <div className="dropdown-item">Vandan Popat</div>
              <div className="dropdown-item">Oleksiy Radchenko</div>
              <div className="dropdown-item">Janey Chudasama</div>
            </div>
          )}
        </div>

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
              <th>Business</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Postcode</th>
              <th>Status</th>
              <th>Volume</th>
              <th>MID</th>
            </tr>
          </thead>
          <tbody>
            <AccountRow business="Frankham Motor Services" contact="Drena" phone="1249890809" postcode="SN15 4NX" status="Approved" volume="20000" mid="123456" />
            <AccountRow business="Ian Paull Car Repairs" contact="Mo / Matt / Ian" phone="01326 341123" postcode="—" status="Approved" volume="—" mid="—" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ContactView = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="page-content">
      <header className="page-header">
        <h1>Contact</h1>
        <p>20822 contacts across opportunities and accounts</p>
      </header>

      <div className="filters-bar">
        <div className="filter-search">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search contacts..." />
        </div>

        <div className="tab-toggle">
          {['All', 'Opportunities', 'Accounts'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="contact-list">
        <ContactCard initial="P" name="Paul" business="Berkeley Heath Auto Centre" phone="01453 511533" type="Opportunity" />
        <ContactCard initial="M" name="Martin" business="Martin Richings Motor Repairs" phone="01454 311663" type="Opportunity" />
        <ContactCard initial="S" name="Steve" business="Motortech" phone="" type="Opportunity" />
        <ContactCard initial="" name="" business="Circuit Motors Ltd" phone="01249 782596" type="Opportunity" />
        <ContactCard initial="" name="" business="Purley Road Garage" phone="01285 652365" type="Opportunity" />
        <ContactCard initial="" name="" business="OPD Auto Services Ltd" phone="01452 771009" type="Opportunity" />
        <ContactCard initial="F" name="Fam" business="Holbrook Garage" phone="01452 770272" type="Opportunity" />
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [calendarMode, setCalendarMode] = useState('Month');

  return (
    <div className="page-content">
      {/* Alert Banner */}
      <div className="calendar-alert-banner">
        <Bell size={18} />
        <div className="alert-content">
          <div className="alert-title">You have 1 callback today</div>
          <div className="alert-item"><Phone size={14} /> 7a Coffee Shop</div>
        </div>
      </div>

      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Calendar</h1>
          <p>Manage scheduled appointments and callbacks</p>
        </div>
        <div className="tab-toggle">
          {['Month', 'Day', 'List'].map(mode => (
            <button 
              key={mode} 
              className={`tab-btn ${calendarMode === mode ? 'active' : ''}`}
              onClick={() => setCalendarMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </header>

      {calendarMode === 'Month' && <CalendarMonthView />}
      {calendarMode === 'Day' && <CalendarDayView />}
      {calendarMode === 'List' && <CalendarListView />}
    </div>
  );
};

const UsersView = ({ onImport, onAdd, onEdit, onResetPassword }) => {
  return (
    <div className="page-content">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Users</h1>
          <p>Manage your team members and their roles</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={onImport}><Upload size={16} /> Import CSV</button>
          <button className="btn-primary" onClick={onAdd}><Plus size={16} /> Add User</button>
        </div>
      </header>

      <div className="filters-bar">
        <div className="filter-search">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="dropdown-container">
          <button className="filter-dropdown">
            <span>All Roles</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="users-grid">
        <UserCard initials="VP" name="Vandan Popat" handle="@vandan.p" email="vandan.p@mypaymentzen.co.uk" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("Vandan Popat")} />
        <UserCard initials="OR" name="Oleksiy Radchenko" handle="@oleksiy.r" email="oleksiy.r@mypaymentzen.co.uk" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("Oleksiy Radchenko")} />
        <UserCard initials="JC" name="Janey Chudasama" handle="@janey.c" email="janey.c@mypaymentzen.co.uk" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("Janey Chudasama")} />
        <UserCard initials="JK" name="James King" handle="@jimmybigburgers" email="jimmybigburgers@gmail.com" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("James King")} />
        <UserCard initials="AV" name="Aivi Verousi" handle="@aivi.v" email="aivi.v@mypaymentzen.co.uk" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("Aivi Verousi")} />
        <UserCard initials="AW" name="Aaron wake" handle="@aaron" email="aaron@paymetryx.com" role="BDM" onEdit={onEdit} onReset={() => onResetPassword("Aaron wake")} />
        <UserCard initials="U" name="Umair" handle="@mr.umairnaseer" email="mr.umairnaseer@gmail.com" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("Umair")} />
        <UserCard initials="JK" name="James King" handle="@James King" email="james.k@mypaymentzen.co.uk" phone="07568263874" role="ADMIN" onEdit={onEdit} onReset={() => onResetPassword("James King")} />
      </div>
    </div>
  );
};

const UserCard = ({ initials, name, handle, email, phone, role, onEdit, onReset }) => (
  <div className="user-card">
    <div className="user-card-header">
      <div className="user-card-avatar">{initials}</div>
      <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>
    </div>
    <div className="user-card-body">
      <div className="user-card-name">{name}</div>
      <div className="user-card-handle">{handle}</div>
      <div className="user-card-contact">
        <div className="contact-item"><Mail size={14} /> {email}</div>
        {phone && <div className="contact-item"><Phone size={14} /> {phone}</div>}
      </div>
    </div>
    <div className="user-card-footer">
      <button className="user-action-btn" onClick={() => onEdit({ initials, name, handle, email, phone, role })}><Edit3 size={16} /></button>
      <button className="user-action-btn"><UserX size={16} /></button>
      <button className="user-action-btn" onClick={onReset}><Key size={16} /></button>
      <button className="user-action-btn delete"><Trash2 size={16} /></button>
    </div>
  </div>
);

const CalendarMonthView = () => (
  <div className="calendar-container">
    <div className="calendar-nav-header">
      <button className="cal-nav-btn"><ChevronLeft size={20} /></button>
      <h2>May 2026</h2>
      <button className="cal-nav-btn"><ChevronRight size={20} /></button>
    </div>
    <div className="calendar-grid">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
        <div key={day} className="cal-weekday">{day}</div>
      ))}
      {[...Array(31)].map((_, i) => (
        <div key={i} className={`cal-day-cell ${i === 11 ? 'today' : ''}`}>
          <span className="day-num">{i + 1}</span>
          {i === 0 && <CalendarPill color="mint" label="Nile Valley Cafe" />}
          {i === 1 && (
            <>
              <CalendarPill color="mint" label="Hush Hair & Beauty" />
              <CalendarPill color="mint" label="PLC Media" />
              <div className="more-pills">+1 more</div>
            </>
          )}
          {i === 3 && (
            <>
              <CalendarPill color="mint" label="Sarah's Cake Shop" />
              <CalendarPill color="mint" label="Launceston Tyre Co" />
            </>
          )}
          {i === 4 && (
            <>
              <CalendarPill color="mint" label="Belgrave road garage" />
              <CalendarPill color="mint" label="Brunel Tyres & Autocare" />
              <div className="more-pills">+3 more</div>
            </>
          )}
          {i === 11 && <CalendarPill color="mint" label="7a Coffee Shop" />}
        </div>
      ))}
    </div>
  </div>
);

const CalendarDayView = () => (
  <div className="calendar-container">
    <div className="calendar-nav-header">
      <button className="cal-nav-btn"><ChevronLeft size={20} /></button>
      <h2>Tuesday, May 12, 2026</h2>
      <button className="cal-nav-btn"><ChevronRight size={20} /></button>
    </div>
    <div className="day-schedule-list">
      <div className="day-event-card">
        <div className="event-accent"></div>
        <div className="event-info">
          <div className="event-header">
            <Phone size={18} color="#10b981" />
            <span className="event-title">7a Coffee Shop</span>
            <span className="status-badge approved" style={{ background: '#dcfce7', color: '#059669' }}>Callback</span>
            <span className="new-badge">new</span>
          </div>
          <div className="event-meta">
            <div className="meta-item"><Clock size={14} /> 9:00 AM</div>
            <div className="meta-item"><Phone size={14} /> 441285712918</div>
          </div>
        </div>
        <button className="btn-secondary"><Eye size={16} /> View</button>
      </div>
    </div>
  </div>
);

const CalendarListView = () => (
  <div className="calendar-list-workspace">
    <div className="filters-bar">
      <div className="filter-search">
        <Search size={16} color="#94a3b8" />
        <input type="text" placeholder="Search entries..." />
      </div>
      <div className="dropdown-container">
        <button className="filter-dropdown">
          <Filter size={16} />
          <span>All Status</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="appointment-list">
      <AppointmentCard name="Mister Ernest" type="Appointment" contact="Sandra" bdm="James King" time="May 7, 9:00 PM" />
      <AppointmentCard name="Ashley House Printing Company Ltd" type="Appointment" contact="No contact" bdm="James King" time="Apr 16, 4:35 PM" />
      <AppointmentCard name="Sky Tyres Bristol" type="Appointment" contact="Daud" bdm="James King" time="Apr 10, 6:00 PM" />
      <AppointmentCard name="Mike Knight Tyres Ltd" type="Appointment" contact="Adam/Mark" bdm="James King" time="Apr 10, 4:00 PM" />
    </div>
  </div>
);

const CalendarPill = ({ color, label }) => (
  <div className={`cal-pill ${color}`}>{label}</div>
);

const AppointmentCard = ({ name, type, contact, bdm, time }) => (
  <div className="appointment-card">
    <div className="app-accent"></div>
    <div className="app-main">
      <div className="app-header">
        <span className="app-title">{name}</span>
        <span className="app-type">{type}</span>
      </div>
      <div className="app-details">
        <div>{contact}</div>
        <div className="bdm-label">BDM: {bdm}</div>
      </div>
    </div>
    <div className="app-right">
      <div className="app-time"><Clock size={14} /> {time}</div>
      <span className="app-status">scheduled</span>
      <button className="btn-secondary"><Eye size={16} /> View Lead</button>
      <button className="btn-primary"><Target size={16} /> Convert</button>
    </div>
  </div>
);

const ContactCard = ({ initial, name, business, phone, type }) => (
  <div className="contact-card">
    <div className="contact-avatar">{initial}</div>
    <div className="contact-main">
      <div className="contact-name">{name || business}</div>
      <div className="contact-business">
        <Building size={14} color="#94a3b8" />
        <span>{business}</span>
      </div>
    </div>
    <div className="contact-right">
      {phone && (
        <div className="contact-phone">
          <Phone size={14} />
          <span>{phone}</span>
        </div>
      )}
      <span className="status-badge approved">{type}</span>
    </div>
  </div>
);

const AccountRow = ({ business, contact, phone, postcode, status, volume, mid }) => (
  <tr>
    <td className="business-cell">{business}</td>
    <td className="contact-cell">{contact}</td>
    <td className="phone-cell">
      {phone} <Copy size={12} className="copy-icon" />
    </td>
    <td>{postcode}</td>
    <td><span className="status-badge approved">{status}</span></td>
    <td>{volume}</td>
    <td>{mid}</td>
  </tr>
);

const AddOpportunityModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-card">
      <div className="modal-header">
        <h2>Add New Opportunity</h2>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
      </div>
      <div className="modal-body-scrollable">
        <div className="form-grid">
          <div className="form-field">
            <label>Business Name *</label>
            <input type="text" />
          </div>
          <div className="form-field">
            <label>Contact Name</label>
            <input type="text" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input type="text" />
          </div>
          <div className="form-field full-width">
            <label>Full Address</label>
            <input type="text" />
          </div>
          <div className="form-field">
            <label>Town / City</label>
            <input type="text" />
          </div>
          <div className="form-field">
            <label>Postcode</label>
            <input type="text" />
          </div>
          <div className="form-field">
            <label>Business Type</label>
            <select className="form-select">
              <option>Select business type</option>
            </select>
          </div>
          <div className="form-field">
            <label>Est. Monthly Volume</label>
            <input type="text" placeholder="e.g. $50,000" />
          </div>
          <div className="form-field">
            <label>Current Provider</label>
            <input type="text" placeholder="e.g. WorldPay" />
          </div>
          <div className="form-field">
            <label>Rates</label>
            <input type="text" placeholder="e.g. 1.5%" />
          </div>
          <div className="form-field full-width">
            <label>Time Left in Contract</label>
            <input type="text" placeholder="e.g. 6 months" />
          </div>
          <div className="form-field checkbox-field">
            <input type="checkbox" id="epos" />
            <label htmlFor="epos">EPOS / Integrated</label>
          </div>
          <div className="form-field checkbox-field">
            <input type="checkbox" id="email-sent" />
            <label htmlFor="email-sent">Email Sent</label>
          </div>
          <div className="form-field">
            <label>Assign BDA</label>
            <select className="form-select">
              <option>Unassigned</option>
              <option>Oleksiy Radchenko</option>
            </select>
          </div>
          <div className="form-field">
            <label>Assign BDM</label>
            <select className="form-select">
              <option>Unassigned</option>
              <option>James King</option>
            </select>
          </div>
          <div className="form-field full-width">
            <label>Notes</label>
            <textarea rows="4" placeholder="Add internal notes..."></textarea>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={onClose}>Create Opportunity</button>
      </div>
    </div>
  </div>
);

const SearchPopup = ({ onClose }) => {
  const [query, setQuery] = useState('');

  const results = query.length >= 2 
    ? SEARCH_DATA.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="search-popup-overlay" onClick={onClose}>
      <div className="search-popup-card" onClick={e => e.stopPropagation()}>
        <div className="search-popup-header">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search opportunities, accounts, users..." 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="search-popup-body">
          {query.length < 2 ? (
            <div className="search-empty-state">
              <p>Type at least 2 characters to search...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              {results.map(result => (
                <div key={result.id} className="search-result-item" onClick={onClose}>
                  <div className="result-icon">
                    {result.icon === 'Target' && <Target size={18} />}
                    {result.icon === 'Building2' && <Building2 size={18} />}
                    {result.icon === 'UserCircle' && <UserCircle size={18} />}
                    {result.icon === 'Calendar' && <Calendar size={18} />}
                  </div>
                  <div className="result-info">
                    <div className="result-title">{result.title}</div>
                    <div className="result-subtitle">{result.subtitle}</div>
                  </div>
                  <div className="result-type">{result.type}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-empty-state">
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
        {query.length >= 2 && results.length > 0 && (
          <div className="search-popup-footer">
            Showing {results.length} results
          </div>
        )}
      </div>
    </div>
  );
};

const UserModal = ({ mode, user, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-card" style={{ maxWidth: '500px' }}>
      <div className="modal-header">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
          {mode === 'add' ? 'Add Team Member' : 'Edit Team Member'}
        </h2>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="modal-body">
        <div className="form-grid">
          <div className="form-field">
            <label>Full Name *</label>
            <input type="text" defaultValue={user?.name || ''} placeholder="e.g. John Doe" />
          </div>
          <div className="form-field">
            <label>Username *</label>
            <input type="text" defaultValue={user?.handle || 'mr.umairnaseer@gmail.com'} />
          </div>
          {mode === 'add' && (
            <div className="form-field">
              <label>Password *</label>
              <input type="password" defaultValue=".........." />
            </div>
          )}
          <div className="form-field">
            <label>Role *</label>
            <select className="form-select" defaultValue={user?.role || 'BDA'}>
              <option>BDA</option>
              <option>ADMIN</option>
              <option>BDM</option>
            </select>
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" defaultValue={user?.email || ''} />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input type="text" defaultValue={user?.phone || ''} />
          </div>
        </div>
      </div>
      <div className="modal-footer" style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem' }}>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }} onClick={onClose}>
          {mode === 'add' ? 'Create User' : 'Save Changes'}
        </button>
      </div>
    </div>
  </div>
);

const ResetPasswordModal = ({ user, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Reset Password</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ paddingTop: '0.5rem' }}>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Setting a new password for <span style={{ color: '#1e293b', fontWeight: 700 }}>{user}</span>.
          </p>
          
          <div className="form-field">
            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Min. 6 characters" 
                style={{ paddingRight: '4rem' }}
              />
              <button 
                className="show-password-btn" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#2563eb', fontSize: '0.8125rem',
                  fontWeight: 700, cursor: 'pointer'
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{ borderTop: 'none', gap: '1rem', padding: '0 1.5rem 1.5rem' }}>
          <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#60a5fa' }} onClick={onClose}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

const ImportLeadsModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-card">
      <div className="modal-header">
        <h2>Import Leads</h2>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
      </div>
      <div className="modal-body">
        <div className="import-dropzone">
          <Upload size={32} color="#2563eb" />
          <h3>Click or drag CSV file here</h3>
          <p>Support for .csv, .xls, .xlsx</p>
        </div>
        <div className="template-box">
          <div className="template-info">
            <FileText size={20} color="#64748b" />
            <div>
              <h4>CSV Template</h4>
              <p>Download our template to ensure correct mapping.</p>
            </div>
          </div>
          <button className="btn-download">
            <Download size={16} /> Download
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={onClose}>Start Import</button>
      </div>
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
  <div className="opportunity-item-clean">
    <div className="opp-info">
      <div className="opp-business-name">{name}</div>
      <div className="opp-contact-name">{contact}</div>
    </div>
    <div className="new-badge-filled">new</div>
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
