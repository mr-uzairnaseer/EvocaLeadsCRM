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
  const [showNotifications, setShowNotifications] = useState(false);
  const [opportunitiesViewMode, setOpportunitiesViewMode] = useState('list');
  const [accountsViewMode, setAccountsViewMode] = useState('list');
  const [selectedLead, setSelectedLead] = useState(null);
  const [importType, setImportType] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [leadsRes, usersRes, activityRes, statsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/users'),
        fetch('/api/activity'),
        fetch('/api/stats')
      ]);
      
      const leadsData = await leadsRes.json();
      const usersData = await usersRes.json();
      const activityData = await activityRes.json();
      const statsData = await statsRes.json();
      
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setUsersList(Array.isArray(usersData) ? usersData : []);
      setActivityList(Array.isArray(activityData) ? activityData : []);
      setDashboardStats(statsData);
      setLoading(false);
    } catch (e) {
      console.error('Error fetching data:', e);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleLeadAction = async (action, data) => {
    // Placeholder for global actions like refresh after edit/add
    await fetchData();
  };

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
            {usersList.filter(u => u.role === 'Admin').map(u => (
              <TeamMember key={u._id} name={u.name} />
            ))}
          </div>

          <div className="team-subtitle" style={{ marginTop: '1.5rem' }}>BDM / BDA</div>
          <div className="team-list">
            {usersList.filter(u => ['BDM', 'BDA'].includes(u.role)).map(u => (
              <TeamMember key={u._id} name={u.name} />
            ))}
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
          <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
            <button 
              className={`nav-action-btn ${showNotifications ? 'active' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              <div className="notification-dot"></div>
            </button>
            {showNotifications && (
              <NotificationsPopup 
                onClose={() => setShowNotifications(false)} 
                onNavigate={() => setActiveTab('Notifications')}
                activity={activityList}
              />
            )}
          </div>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <RefreshCw size={32} className="animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'Dashboard' && (
              <DashboardView 
                stats={dashboardStats} 
                leads={leads}
                activityList={activityList}
                onNavigate={setActiveTab} 
                onLeadClick={(lead) => {
                  setSelectedLead(lead);
                  setActiveTab('LeadDetails');
                }}
              />
            )}
            {activeTab === 'LeadDetails' && (
              <LeadDetailsView 
                lead={selectedLead} 
                onBack={() => setActiveTab('Dashboard')} 
                onSuccess={fetchData}
              />
            )}
            {activeTab === 'Opportunities' && (
              <OpportunitiesView 
                leads={leads.filter(l => ['New Lead', 'Contacted', 'Qualified Lead', 'Sample / Price Sent', 'Lost Lead'].includes(l.status) || !l.status)}
                onAdd={() => setShowAddModal(true)} 
                onImport={() => { setImportType('leads'); setShowImportModal(true); }} 
                viewMode={opportunitiesViewMode}
                setViewMode={setOpportunitiesViewMode}
                onLeadClick={(lead) => {
                  setSelectedLead(lead);
                  setActiveTab('LeadDetails');
                }}
              />
            )}
            {activeTab === 'Accounts' && (
              <AccountsView 
                leads={leads.filter(l => ['Order Confirmed', 'Delivery Scheduled', 'Delivered', 'Payment Pending', 'Payment Received', 'Active Customer / Repeat Order'].includes(l.status))}
                onImport={() => { setImportType('accounts'); setShowImportModal(true); }} 
                viewMode={accountsViewMode}
                setViewMode={setAccountsViewMode}
                onLeadClick={(lead) => {
                  setSelectedLead(lead);
                  setActiveTab('LeadDetails');
                }}
              />
            )}
            {activeTab === 'Contact' && <ContactView leads={leads} />}
            {activeTab === 'Calendar' && <CalendarView leads={leads} />}
            {activeTab === 'Users' && (
              <UsersView 
                users={usersList}
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
            {activeTab === 'Notifications' && <NotificationsView activity={activityList} />}
          </>
        )}
      </main>

      {/* Modals */}
      {showAddModal && <AddOpportunityModal onClose={() => setShowAddModal(false)} onSuccess={fetchData} />}
      {showImportModal && <ImportLeadsModal onClose={() => setShowImportModal(false)} type={importType} onSuccess={fetchData} />}
      {showUserModal && <UserModal mode={userModalMode} user={selectedUser} onClose={() => setShowUserModal(false)} onSuccess={fetchData} />}
      {showResetPasswordModal && <ResetPasswordModal user={resetTargetUser} onClose={() => setShowResetPasswordModal(false)} />}
      
      {/* Search Popup */}
      {showSearchPopup && <SearchPopup onClose={() => setShowSearchPopup(false)} leads={leads} users={usersList} onLeadClick={(lead) => {
        setSelectedLead(lead);
        setActiveTab('LeadDetails');
        setShowSearchPopup(false);
      }} />}
    </div>
  );
}

const DashboardView = ({ stats, leads, activityList, onNavigate, onLeadClick }) => (
  <div className="page-content">
    <header className="page-header">
      <h1>Dashboard</h1>
      <p>Your payments pipeline at a glance</p>
    </header>

    <section className="stats-grid">
      <div className="stat-card clickable" onClick={() => onNavigate('Opportunities')}>
        <div className="stat-header">
          <span className="stat-label">Total Leads</span>
          <div className="stat-icon-box"><Target size={16} /></div>
        </div>
        <div className="stat-value">{stats?.totalLeads || 0}</div>
        <div className="stat-subtext">All leads in CRM</div>
        <div className="stat-link">View <ArrowRight size={12} /></div>
      </div>
      <div className="stat-card clickable" onClick={() => onNavigate('Opportunities')}>
        <div className="stat-header">
          <span className="stat-label">New Leads</span>
          <div className="stat-icon-box"><Plus size={16} /></div>
        </div>
        <div className="stat-value">{stats?.newLeads || 0}</div>
        <div className="stat-subtext">Not contacted yet</div>
        <div className="stat-link">View <ArrowRight size={12} /></div>
      </div>
      <div className="stat-card clickable" onClick={() => onNavigate('Opportunities')}>
        <div className="stat-header">
          <span className="stat-label">Hot Leads</span>
          <div className="stat-icon-box"><TrendingUp size={16} /></div>
        </div>
        <div className="stat-value">{stats?.hotLeads || 0}</div>
        <div className="stat-subtext">Interested / Qualified</div>
        <div className="stat-link">View <ArrowRight size={12} /></div>
      </div>
      <div className="stat-card clickable" onClick={() => onNavigate('Calendar')}>
        <div className="stat-header">
          <span className="stat-label">Today's Follow-ups</span>
          <div className="stat-icon-box"><Calendar size={16} /></div>
        </div>
        <div className="stat-value">{stats?.todayFollowUps || 0}</div>
        <div className="stat-subtext">Follow-ups due today</div>
        <div className="stat-link">View <ArrowRight size={12} /></div>
      </div>
      <div className="stat-card clickable">
        <div className="stat-header">
          <span className="stat-label">Samples Sent</span>
          <div className="stat-icon-box"><Download size={16} /></div>
        </div>
        <div className="stat-value">{stats?.samplesSent || 0}</div>
        <div className="stat-subtext">Total delivered</div>
      </div>
      <div className="stat-card clickable">
        <div className="stat-header">
          <span className="stat-label">Delivered Orders</span>
          <div className="stat-icon-box"><Check size={16} /></div>
        </div>
        <div className="stat-value">{stats?.deliveredOrders || 0}</div>
        <div className="stat-subtext">Completed deliveries</div>
      </div>
      <div className="stat-card clickable">
        <div className="stat-header">
          <span className="stat-label">Monthly Sales</span>
          <div className="stat-icon-box"><BarChart3 size={16} /></div>
        </div>
        <div className="stat-value">£{stats?.monthlySalesValue?.toLocaleString() || 0}</div>
        <div className="stat-subtext">Current month</div>
      </div>
      <div className="stat-card clickable">
        <div className="stat-header">
          <span className="stat-label">Lost Leads</span>
          <div className="stat-icon-box"><X size={16} /></div>
        </div>
        <div className="stat-value">{stats?.lostLeads || 0}</div>
        <div className="stat-subtext">Closed without sale</div>
      </div>
    </section>

    <section className="pipeline-section">
      <div className="pipeline-top">
        <div className="pipeline-title">Pipeline</div>
        <div style={{ color: '#9ca3af' }}><BarChart3 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Lead to Transacting</div>
      </div>
      <div className="pipeline-stepper">
        <PipelineStep num={stats?.pipeline?.['New Lead'] || 0} label="New Lead" />
        <PipelineStep num={stats?.pipeline?.['Contacted'] || 0} label="Contacted" />
        <PipelineStep num={stats?.pipeline?.['Qualified Lead'] || 0} label="Qualified" />
        <PipelineStep num={stats?.pipeline?.['Sample / Price Sent'] || 0} label="Sample/Price" />
        <PipelineStep num={stats?.pipeline?.['Order Confirmed'] || 0} label="Order" />
        <PipelineStep num={stats?.pipeline?.['Delivery Scheduled'] || 0} label="Scheduled" />
        <PipelineStep num={stats?.pipeline?.['Delivered'] || 0} label="Delivered" />
        <PipelineStep num={stats?.pipeline?.['Payment Pending'] || 0} label="Pending" />
        <PipelineStep num={stats?.pipeline?.['Payment Received'] || 0} label="Paid" />
        <PipelineStep num={stats?.pipeline?.['Active Customer / Repeat Order'] || 0} label="Active" />
        <PipelineStep num={stats?.pipeline?.['Lost Lead'] || 0} label="Lost" />
      </div>
    </section>

    <div className="dashboard-bottom-grid">
      <div className="bottom-card">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className="card-title" style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Opportunities</div>
          <div className="card-link" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => onNavigate('Opportunities')}>View All</div>
        </div>
        <div className="opportunity-list-clean">
          {leads.slice(0, 5).map(lead => (
            <OpportunityItem 
              key={lead._id}
              name={lead.companyName} 
              contact={lead.contactPerson} 
              status={lead.status}
              onClick={() => onLeadClick(lead)} 
            />
          ))}
          {leads.length === 0 && <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No recent opportunities</p>}
        </div>
      </div>

      <div className="bottom-card">
        <div className="card-header">
          <div className="card-title">Recent Activity</div>
          <Activity size={16} color="#9ca3af" />
        </div>
        <div className="activity-list">
          {activityList.map(act => (
            <ActivityItem 
              key={act._id} 
              user={act.user} 
              text={act.text} 
              time={new Date(act.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} 
            />
          ))}
          {activityList.length === 0 && <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No recent activity</p>}
        </div>
      </div>
    </div>
  </div>
);

const OpportunitiesView = ({ leads, onAdd, onImport, viewMode, setViewMode, onLeadClick }) => {
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
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
          <button className="btn-secondary" style={{ padding: '0 1rem', height: '38px' }}>My Items</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
            <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
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
              {leads.map(opp => (
                <TableRow 
                  key={opp._id}
                  business={opp.companyName} 
                  contact={opp.contactPerson} 
                  phone={opp.phoneWhatsApp} 
                  postcode={opp.postcode || '—'} 
                  status={opp.status}
                  bda={opp.leadOwner?.name || '—'} 
                  bdm={opp.leadOwner?.role === 'BDM' ? opp.leadOwner.name : '—'} 
                  callback={opp.nextFollowUpDate ? new Date(opp.nextFollowUpDate).toLocaleDateString() : '—'} 
                  provider={opp.topCompetitorBrandName || '—'} 
                  onClick={() => onLeadClick(opp)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="opportunities-grid-container">
          {leads.map(opp => (
            <div 
              key={opp._id} 
              className="opportunity-grid-card" 
              onClick={() => onLeadClick(opp)}
              style={{ cursor: 'pointer' }}
            >
              <div className="grid-card-header">
                <div className="grid-card-main">
                  <h3 className="grid-card-title">{opp.companyName}</h3>
                  <div className="grid-card-meta">
                    <span>{opp.contactPerson}</span>
                    <span>{opp.postcode}</span>
                  </div>
                </div>
                <span className={`status-badge-${(opp.status || 'new').toLowerCase().replace(/\s+/g, '')}`}>{opp.status || 'New Lead'}</span>
              </div>
              <div className="grid-card-content">
                <div className="grid-info-row">
                  <Phone size={14} className="grid-icon" />
                  <span className="grid-phone">{opp.phoneWhatsApp}</span>
                </div>
                {opp.topCompetitorBrandName && (
                  <div className="grid-info-row">
                    <span className="grid-label">Competitor:</span>
                    <span className="grid-value">{opp.topCompetitorBrandName}</span>
                  </div>
                )}
                <div className="grid-team-box">
                  <div className="grid-team-row">
                    <span className="grid-label">Owner:</span>
                    <span className="grid-value">{opp.leadOwner?.name || '—'}</span>
                  </div>
                </div>
                <div className="grid-callback-row">
                  <span className="grid-label">Follow-up:</span>
                  <span className="grid-value">{opp.nextFollowUpDate ? new Date(opp.nextFollowUpDate).toLocaleDateString() : '—'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-bar">
        <div className="pagination-info">Showing {leads.length} of {leads.length} results</div>
      </div>
    </div>
  );
};

const AccountsView = ({ leads, onImport, viewMode, setViewMode, onLeadClick }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="page-content">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Accounts</h1>
          <p>{leads.filter(l => l.status === 'Transacting').length} transacting, {leads.filter(l => l.status === 'Approved').length} approved, {leads.length} total</p>
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
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="dropdown-container">
            <button className="filter-dropdown" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <Filter size={16} />
              <span>All Users</span>
              <ChevronDown size={14} />
            </button>
            {showUserDropdown && (
              <div className="custom-dropdown">
                <div className="dropdown-item active"><Check size={16} /> All Users</div>
              </div>
            )}
          </div>

          <button className="btn-secondary" style={{ padding: '0 1rem', height: '38px' }}>My Items</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
            <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
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
              {leads.map(acc => (
                <AccountRow 
                  key={acc._id}
                  business={acc.business} 
                  contact={acc.contactName} 
                  phone={acc.phone} 
                  postcode={acc.postcode} 
                  status={acc.status} 
                  volume={acc.volume} 
                  mid={acc.mid} 
                  onClick={() => onLeadClick(acc)}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="accounts-grid-container">
          {leads.map(acc => (
            <div key={acc._id} className="account-grid-card" onClick={() => onLeadClick(acc)} style={{ cursor: 'pointer' }}>
              <div className="account-grid-header">
                <div className="account-card-main">
                  <h3 className="account-card-title">{acc.business}</h3>
                  <div className="account-card-contact">{acc.contactName}</div>
                </div>
                <span className={`status-badge ${acc.status.toLowerCase().replace('-', '')}`}>{acc.status}</span>
              </div>
              <div className="account-card-body">
                <div className="account-info-row">
                  <Phone size={14} className="grid-icon" />
                  <span>{acc.phone}</span>
                </div>
                <div className="account-info-row">
                  <Building size={14} className="grid-icon" />
                  <span>{acc.postcode}</span>
                </div>
                <div className="account-stats-box">
                  <div className="account-stat-item">
                    <span className="account-stat-label">Volume</span>
                    <span className="account-stat-value">{acc.volume}</span>
                  </div>
                  <div className="account-stat-item">
                    <span className="account-stat-label">MID</span>
                    <span className="account-stat-value">{acc.mid}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ContactView = ({ leads }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredContacts = activeTab === 'All' 
    ? leads 
    : activeTab === 'Opportunities' 
      ? leads.filter(l => ['New Lead', 'Contacted', 'Qualified Lead', 'Sample / Price Sent', 'Lost Lead'].includes(l.status) || !l.status)
      : leads.filter(l => ['Order Confirmed', 'Delivery Scheduled', 'Delivered', 'Payment Pending', 'Payment Received', 'Active Customer / Repeat Order'].includes(l.status));

  return (
    <div className="page-content">
      <header className="page-header">
        <h1>Contact</h1>
        <p>{filteredContacts.length} contacts across {activeTab.toLowerCase()}</p>
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
        {filteredContacts.map(l => (
          <ContactCard 
            key={l._id}
            initial={l.contactName ? l.contactName[0] : '?'} 
            name={l.contactName} 
            business={l.business} 
            phone={l.phone} 
            type={['Approved', 'Delivered', 'Transacting', 'Non-Trans'].includes(l.status) ? 'Account' : 'Opportunity'} 
          />
        ))}
        {filteredContacts.length === 0 && <p style={{ color: '#9ca3af' }}>No contacts found.</p>}
      </div>
    </div>
  );
};

const CalendarView = ({ leads }) => {
  const [calendarMode, setCalendarMode] = useState('Month');
  const callbacksToday = leads.filter(l => l.callback && l.callback.includes('today')); // Simplified check

  return (
    <div className="page-content">
      {/* Alert Banner */}
      {callbacksToday.length > 0 && (
        <div className="calendar-alert-banner">
          <Bell size={18} />
          <div className="alert-content">
            <div className="alert-title">You have {callbacksToday.length} callback{callbacksToday.length > 1 ? 's' : ''} today</div>
            {callbacksToday.slice(0, 2).map(l => (
              <div key={l._id} className="alert-item"><Phone size={14} /> {l.business}</div>
            ))}
          </div>
        </div>
      )}

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

      {calendarMode === 'Month' && <CalendarMonthView leads={leads} />}
      {calendarMode === 'Day' && <CalendarDayView leads={leads} />}
      {calendarMode === 'List' && <CalendarListView leads={leads} />}
    </div>
  );
};

const UsersView = ({ users, onImport, onAdd, onEdit, onResetPassword }) => {
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = ['All Roles', 'BDA', 'BDM', 'Admin'];

  const filteredUsers = roleFilter === 'All Roles' 
    ? users 
    : users.filter(u => u.role.toUpperCase() === roleFilter.toUpperCase());

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
          <button className="filter-dropdown" onClick={() => setShowRoleDropdown(!showRoleDropdown)}>
            <Filter size={16} />
            <span>{roleFilter}</span>
            <ChevronDown size={14} />
          </button>
          {showRoleDropdown && (
            <div className="custom-dropdown">
              {roles.map(role => (
                <div 
                  key={role} 
                  className={`dropdown-item ${roleFilter === role ? 'active' : ''}`}
                  onClick={() => {
                    setRoleFilter(role);
                    setShowRoleDropdown(false);
                  }}
                >
                  {roleFilter === role && <Check size={16} />}
                  <span style={{ marginLeft: roleFilter === role ? '0' : '26px' }}>{role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map(u => (
          <UserCard 
            key={u._id}
            initials={u.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            name={u.name}
            handle={u.handle || `@${u.name.toLowerCase().replace(' ', '.')}`}
            email={u.email}
            role={u.role}
            onEdit={() => onEdit(u)}
            onReset={() => onResetPassword(u.name)}
          />
        ))}
        {filteredUsers.length === 0 && <p style={{ color: '#9ca3af', padding: '2rem' }}>No users found for this role.</p>}
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

const CalendarMonthView = ({ leads }) => {
  const leadsWithCallbacks = leads.filter(l => l.callback);
  
  return (
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
        {[...Array(31)].map((_, i) => {
          const dayLeads = leadsWithCallbacks.filter(l => l.callback.includes(`${i + 1}/05`) || (i === 11 && l.callback.toLowerCase().includes('today')));
          return (
            <div key={i} className={`cal-day-cell ${i === 11 ? 'today' : ''}`}>
              <span className="day-num">{i + 1}</span>
              {dayLeads.map(l => (
                <CalendarPill key={l._id} color="mint" label={l.business} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarDayView = ({ leads }) => {
  const dayLeads = leads.filter(l => l.callback && (l.callback.includes('12/05') || l.callback.toLowerCase().includes('today')));
  
  return (
    <div className="calendar-container">
      <div className="calendar-nav-header">
        <button className="cal-nav-btn"><ChevronLeft size={20} /></button>
        <h2>Tuesday, May 12, 2026</h2>
        <button className="cal-nav-btn"><ChevronRight size={20} /></button>
      </div>
      <div className="day-schedule-list">
        {dayLeads.map(l => (
          <div key={l._id} className="day-event-card">
            <div className="event-accent"></div>
            <div className="event-info">
              <div className="event-header">
                <Phone size={18} color="#10b981" />
                <span className="event-title">{l.business}</span>
                <span className="status-badge approved" style={{ background: '#dcfce7', color: '#059669' }}>Callback</span>
              </div>
              <div className="event-meta">
                <div className="meta-item"><Clock size={14} /> {l.callback}</div>
                <div className="meta-item"><Phone size={14} /> {l.phone}</div>
              </div>
            </div>
          </div>
        ))}
        {dayLeads.length === 0 && <p style={{ color: '#9ca3af', padding: '1rem' }}>No callbacks today.</p>}
      </div>
    </div>
  );
};

const CalendarListView = ({ leads }) => {
  const leadsWithCallbacks = leads.filter(l => l.callback);

  return (
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
        {leadsWithCallbacks.map(l => (
          <AppointmentCard 
            key={l._id}
            name={l.business} 
            type="Callback" 
            contact={l.contactName || 'No contact'} 
            bdm={l.bdm} 
            time={l.callback} 
          />
        ))}
        {leadsWithCallbacks.length === 0 && <p style={{ color: '#9ca3af' }}>No scheduled callbacks or appointments.</p>}
      </div>
    </div>
  );
};

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

const AddOpportunityModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    contactPerson: '',
    phoneWhatsApp: '',
    email: '',
    cityArea: '',
    interestedProducts: [],
    leadSource: '',
    notes: ''
  });

  const businessTypes = [
    'Retail Shop', 'Cash & Carry', 'Wholesaler', 'Distributor', 
    'Restaurant / Café', 'Supermarket', 'Online Store', 'Event Buyer', 
    'Hotel', 'Catering Company', 'Gym / Sports Club', 'Other'
  ];

  const leadSources = ['Website', 'Cold Call', 'Sales Visit', 'Referral', 'Social Media', 'Other'];

  const products = ['Evoca Cola', 'Evoca Orange', 'Evoca Lemon', 'Evoca Apple', 'Evoca Mango', 'Evoca Pomegranate'];

  const handleSave = async () => {
    if (!formData.companyName || !formData.businessType || !formData.phoneWhatsApp || !formData.cityArea) {
      alert('Please fill in all required fields: Company Name, Business Type, Phone/WhatsApp, and City/Area.');
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        await fetch('/api/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: 'System',
            text: `New lead created: ${formData.companyName}`
          })
        });
        onSuccess();
        onClose();
      } else {
        const err = await res.text();
        alert('Error: ' + err);
      }
    } catch (e) {
      console.error('Error creating lead:', e);
    }
  };

  const toggleProduct = (product) => {
    setFormData(prev => ({
      ...prev,
      interestedProducts: prev.interestedProducts.includes(product)
        ? prev.interestedProducts.filter(p => p !== product)
        : [...prev.interestedProducts, product]
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Add New Lead</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body-scrollable">
          <div className="form-grid">
            <div className="form-field">
              <label>Company / Shop Name *</label>
              <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Business Type *</label>
              <select className="form-select" value={formData.businessType} onChange={e => setFormData({...formData, businessType: e.target.value})}>
                <option value="">Select Type</option>
                {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label>Contact Person</label>
              <input type="text" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Phone / WhatsApp *</label>
              <input type="text" value={formData.phoneWhatsApp} onChange={e => setFormData({...formData, phoneWhatsApp: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-field">
              <label>City / Area *</label>
              <input type="text" value={formData.cityArea} onChange={e => setFormData({...formData, cityArea: e.target.value})} />
            </div>
            <div className="form-field full-width">
              <label>Interested Products</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {products.map(p => (
                  <button 
                    key={p} 
                    className={`btn-secondary ${formData.interestedProducts.includes(p) ? 'active' : ''}`}
                    onClick={() => toggleProduct(p)}
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: formData.interestedProducts.includes(p) ? '#dcfce7' : '' }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label>Lead Source</label>
              <select className="form-select" value={formData.leadSource} onChange={e => setFormData({...formData, leadSource: e.target.value})}>
                <option value="">Select Source</option>
                {leadSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-field full-width">
              <label>Notes</label>
              <textarea rows="4" placeholder="Additional details..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Create Lead</button>
        </div>
      </div>
    </div>
  );
};

const SearchPopup = ({ leads, users, onLeadClick, onClose }) => {
  const [query, setQuery] = useState('');

  const leadsResults = leads.filter(l => 
    (l.companyName && l.companyName.toLowerCase().includes(query.toLowerCase())) ||
    (l.contactPerson && l.contactPerson.toLowerCase().includes(query.toLowerCase())) ||
    (l.postcode && l.postcode.toLowerCase().includes(query.toLowerCase()))
  ).map(l => ({
    id: l._id,
    type: ['Order Confirmed', 'Delivery Scheduled', 'Delivered', 'Payment Pending', 'Payment Received', 'Active Customer / Repeat Order'].includes(l.status) ? 'Account' : 'Opportunity',
    title: l.companyName,
    subtitle: `${l.contactPerson || ''} • ${l.postcode || ''}`,
    icon: ['Order Confirmed', 'Delivery Scheduled', 'Delivered', 'Payment Pending', 'Payment Received', 'Active Customer / Repeat Order'].includes(l.status) ? 'Building2' : 'Target',
    original: l
  }));

  const usersResults = users.filter(u => 
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  ).map(u => ({
    id: u._id,
    type: 'User',
    title: u.name,
    subtitle: u.role,
    icon: 'UserCircle',
    original: u
  }));

  const results = query.length >= 2 ? [...leadsResults, ...usersResults] : [];

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
                <div key={result.id} className="search-result-item" onClick={() => {
                  if (result.type !== 'User') onLeadClick(result.original);
                  else onClose();
                }}>
                  <div className="result-icon">
                    {result.icon === 'Target' && <Target size={18} />}
                    {result.icon === 'Building2' && <Building2 size={18} />}
                    {result.icon === 'UserCircle' && <UserCircle size={18} />}
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

const UserModal = ({ mode, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'BDA',
    handle: user?.handle || '',
    phone: user?.phone || ''
  });

  const handleSave = async () => {
    try {
      const url = mode === 'add' ? '/api/users' : `/api/users/${user._id}`;
      const method = mode === 'add' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onSuccess();
        onClose();
      }
    } catch (e) {
      console.error('Error saving user:', e);
    }
  };

  return (
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
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
            </div>
            <div className="form-field">
              <label>Username / Handle</label>
              <input type="text" value={formData.handle} onChange={e => setFormData({...formData, handle: e.target.value})} placeholder="@username" />
            </div>
            {mode === 'add' && (
              <div className="form-field">
                <label>Password *</label>
                <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            )}
            <div className="form-field">
              <label>Role *</label>
              <select className="form-select" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="BDA">BDA</option>
                <option value="Admin">Admin</option>
                <option value="BDM">BDM</option>
              </select>
            </div>
            <div className="form-field">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
        </div>
        <div className="modal-footer" style={{ borderTop: 'none', padding: '0 1.5rem 1.5rem' }}>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px' }} onClick={handleSave}>
            {mode === 'add' ? 'Create User' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordModal = ({ user, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  
  const handleReset = async () => {
    if (newPassword.length < 6) return alert('Password must be at least 6 characters');
    setResetting(true);
    try {
      // Find user by name and update password (simplified for now)
      const res = await fetch('/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user, password: newPassword })
      });
      if (res.ok) {
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setResetting(false);
    }
  };

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
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
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
          <button 
            className="btn-primary" 
            style={{ flex: 1, justifyContent: 'center', background: '#60a5fa' }} 
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ImportLeadsModal = ({ onClose, type, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const templates = {
    leads: { name: 'Opportunities Template', file: '/leads_template.csv' },
    accounts: { name: 'Accounts Template', file: '/accounts_template.csv' },
    users: { name: 'Users Template', file: '/users_template.csv' }
  };
  const currentTemplate = templates[type] || templates.leads;

  const handleImport = async () => {
    if (!file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] ? values[i].trim() : '';
        });
        return obj;
      });

      try {
        const endpoint = type === 'users' ? '/api/users' : '/api/leads';
        for (const item of data) {
          const payload = type === 'users' ? {
            name: item.Name,
            email: item.Email,
            role: item.Role || 'BDA',
            handle: item.Handle,
            password: 'password123' // Default password for imported users
          } : {
            companyName: item.Business || item.CompanyName,
            contactPerson: item.Contact || item.ContactPerson,
            phoneWhatsApp: item.Phone || item.PhoneWhatsApp,
            email: item.Email,
            postcode: item.Postcode,
            cityArea: item.CityArea || item.Area,
            status: type === 'accounts' ? 'Active Customer / Repeat Order' : 'New Lead'
          };

          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
        
        await fetch('/api/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: 'System',
            text: `Imported ${data.length} records into ${type}`
          })
        });

        onSuccess();
        onClose();
      } catch (err) {
        console.error('Import failed:', err);
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Import {type === 'leads' ? 'Opportunities' : type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="import-dropzone" style={{ position: 'relative' }}>
            <input 
              type="file" 
              accept=".csv" 
              onChange={(e) => setFile(e.target.files[0])} 
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
            <Upload size={32} color={file ? "#10b981" : "#2563eb"} />
            <h3>{file ? file.name : "Click or drag CSV file here"}</h3>
            <p>{file ? "File ready to import" : "Support for .csv"}</p>
          </div>
          <div className="template-box">
            <div className="template-info">
              <FileText size={20} color="#64748b" />
              <div>
                <h4>{currentTemplate.name}</h4>
                <p>Download our template to ensure correct mapping.</p>
              </div>
            </div>
            <a href={currentTemplate.file} download className="btn-download" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Download size={16} /> Download
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-primary" 
            onClick={handleImport} 
            disabled={!file || importing}
          >
            {importing ? "Importing..." : "Start Import"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ business, contact, phone, postcode, status, bda, bdm, callback, provider, onClick }) => (
  <tr onClick={onClick} style={{ cursor: 'pointer' }}>
    <td><input type="checkbox" /></td>
    <td className="business-cell">{business}</td>
    <td className="contact-cell">{contact}</td>
    <td className="phone-cell">
      {phone} {phone !== '—' && <Copy size={12} className="copy-icon" />}
    </td>
    <td>{postcode}</td>
    <td><span className={`status-badge-${(status || 'new').toLowerCase().replace(/\s+/g, '')}`}>{status || 'New Lead'}</span></td>
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

const PipelineStep = ({ num, label }) => (
  <div className="pipeline-step">
    <div className="pipeline-num">{num}</div>
    <div className="pipeline-label">{label}</div>
  </div>
);

const OpportunityItem = ({ name, contact, status, onClick }) => (
  <div className="opportunity-item-clean" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="opp-info">
      <div className="opp-business-name">{name}</div>
      <div className="opp-contact-name">{contact}</div>
    </div>
    <div className={`status-badge-${(status || 'new').toLowerCase().replace(/\s+/g, '')}`}>{status || 'New Lead'}</div>
  </div>
);

const LeadDetailsView = ({ lead, onBack, onSuccess }) => {
  const [note, setNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    companyName: lead?.companyName || '',
    contactPerson: lead?.contactPerson || '',
    phoneWhatsApp: lead?.phoneWhatsApp || '',
    email: lead?.email || '',
    cityArea: lead?.cityArea || '',
    postcode: lead?.postcode || '',
    businessType: lead?.businessType || ''
  });

  if (!lead) return null;

  const handleUpdateStatus = async (newStatus, extraFields = {}) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, ...extraFields })
      });
      if (res.ok) {
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${lead.companyName}?`)) return;
    try {
      const res = await fetch(`/api/leads/${lead._id}`, { method: 'DELETE' });
      if (res.ok) {
        onSuccess();
        onBack();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveContact = async () => {
    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setIsEditingContact(false);
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;
    try {
      const res = await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'Umair',
          text: note,
          lead: lead._id
        })
      });
      if (res.ok) {
        setNote('');
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const statuses = [
    'New Lead', 'Contacted', 'Qualified Lead', 'Sample / Price Sent', 
    'Order Confirmed', 'Delivery Scheduled', 'Delivered', 'Payment Pending', 
    'Payment Received', 'Active Customer / Repeat Order', 'Lost Lead'
  ];
  const currentIndex = statuses.indexOf(lead.status || 'New Lead');

  return (
    <div className="page-content">
      <header className="lead-details-header">
        <div className="lead-header-left">
          <button className="back-btn" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0' }}>
            <ChevronLeft size={24} color="#111827" />
          </button>
          <div className="lead-title-group">
            <h2>{lead.companyName}</h2>
            <p>{lead.contactPerson} • {lead.cityArea}</p>
          </div>
        </div>
        <div className="lead-header-right">
          <span className={`status-badge-${(lead.status || 'new').toLowerCase().replace(/\s+/g, '')}`} style={{ padding: '6px 16px', borderRadius: '8px' }}>
            {lead.status || 'New Lead'}
          </span>
          <button className="trash-btn" onClick={handleDelete}><Trash2 size={20} /></button>
        </div>
      </header>

      <div className="lead-stepper-container" style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
        <div className="lead-stepper" style={{ minWidth: '1200px' }}>
          <div className="step-line"></div>
          <div className="step-line-active" style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}></div>
          {statuses.map((s, i) => (
            <div 
              key={s} 
              className={`step-item ${i <= currentIndex ? 'active' : ''}`}
              onClick={() => handleUpdateStatus(s)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-dot">{i + 1}</div>
              <span className="step-label" style={{ fontSize: '10px' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lead-grid-cols">
        <div className="details-column">
          <div className="details-card">
            <div className="card-title-row">
              <h3>Company Info</h3>
              {isEditingContact ? (
                <button className="btn-save-mini" onClick={handleSaveContact}>Save</button>
              ) : (
                <Edit3 size={18} color="#6b7280" style={{ cursor: 'pointer' }} onClick={() => setIsEditingContact(true)} />
              )}
            </div>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Building size={18} />
                {isEditingContact ? (
                  <input type="text" value={contactForm.companyName} onChange={e => setContactForm({...contactForm, companyName: e.target.value})} />
                ) : (
                  <span>{lead.companyName}</span>
                )}
              </div>
              <div className="contact-info-item">
                <Target size={18} />
                {isEditingContact ? (
                  <select className="form-select" value={contactForm.businessType} onChange={e => setContactForm({...contactForm, businessType: e.target.value})}>
                    {['Retail Shop', 'Cash & Carry', 'Wholesaler', 'Distributor', 'Restaurant / Café', 'Supermarket', 'Online Store', 'Event Buyer', 'Hotel', 'Catering Company', 'Gym / Sports Club', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                ) : (
                  <span>{lead.businessType}</span>
                )}
              </div>
              <div className="contact-info-item">
                <User size={18} />
                {isEditingContact ? (
                  <input type="text" value={contactForm.contactPerson} onChange={e => setContactForm({...contactForm, contactPerson: e.target.value})} />
                ) : (
                  <span>{lead.contactPerson || 'No contact person'}</span>
                )}
              </div>
              <div className="contact-info-item">
                <Phone size={18} />
                {isEditingContact ? (
                  <input type="text" value={contactForm.phoneWhatsApp} onChange={e => setContactForm({...contactForm, phoneWhatsApp: e.target.value})} />
                ) : (
                  <span>{lead.phoneWhatsApp}</span>
                )}
              </div>
              <div className="contact-info-item">
                <Mail size={18} />
                {isEditingContact ? (
                  <input type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                ) : (
                  <span>{lead.email || 'No email'}</span>
                )}
              </div>
              <div className="contact-info-item">
                <Building2 size={18} />
                {isEditingContact ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" placeholder="City" value={contactForm.cityArea} onChange={e => setContactForm({...contactForm, cityArea: e.target.value})} />
                    <input type="text" placeholder="Postcode" value={contactForm.postcode} onChange={e => setContactForm({...contactForm, postcode: e.target.value})} />
                  </div>
                ) : (
                  <span>{lead.cityArea} {lead.postcode ? `(${lead.postcode})` : ''}</span>
                )}
              </div>
            </div>
          </div>

          <div className="details-card" style={{ marginTop: '1.5rem' }}>
            <div className="card-title-row">
              <h3>Workflow Stages</h3>
            </div>
            
            {/* Stage: Contacted */}
            <div className="workflow-section">
              <h4>1. Contact Information</h4>
              <div className="form-grid-mini">
                <div className="form-field">
                  <label>Date Contacted</label>
                  <input type="datetime-local" value={lead.dateContacted ? new Date(lead.dateContacted).toISOString().slice(0, 16) : ''} onChange={e => handleUpdateStatus(lead.status, { dateContacted: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Method</label>
                  <select value={lead.contactMethod || ''} onChange={e => handleUpdateStatus(lead.status, { contactMethod: e.target.value })}>
                    <option value="">Select Method</option>
                    {['Call', 'WhatsApp', 'Visit', 'Email'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Response</label>
                  <select value={lead.response || ''} onChange={e => handleUpdateStatus(lead.status, { response: e.target.value })}>
                    <option value="">Select Response</option>
                    {['Interested', 'No Response', 'Not Interested'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {lead.response === 'Interested' && (
              <div className="workflow-section">
                <h4>2. Qualification</h4>
                <div className="form-grid-mini">
                  <div className="form-field">
                    <label>Sells Competitors?</label>
                    <select value={lead.sellsCompetitorBrands || ''} onChange={e => handleUpdateStatus(lead.status, { sellsCompetitorBrands: e.target.value })}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {lead.sellsCompetitorBrands === 'Yes' && (
                    <div className="form-field">
                      <label>Competitor Brand</label>
                      <input type="text" value={lead.topCompetitorBrandName || ''} onChange={e => handleUpdateStatus(lead.status, { topCompetitorBrandName: e.target.value })} />
                    </div>
                  )}
                  <div className="form-field">
                    <label>Decision Maker</label>
                    <select value={lead.decisionMaker || ''} onChange={e => handleUpdateStatus(lead.status, { decisionMaker: e.target.value })}>
                      {['POC', 'Owner', 'Manager', 'Buyer', 'Other'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {lead.response === 'Not Interested' && (
              <div className="workflow-section">
                <h4>2. Lost Reason</h4>
                <div className="form-field">
                  <label>Reason</label>
                  <select value={lead.lostReason || ''} onChange={e => handleUpdateStatus('Lost Lead', { lostReason: e.target.value })}>
                    {['Already has supplier', 'Delivery area issue', 'Low demand', 'Competitor gave better deal', 'Price issue', 'Wrong contact details', 'Not selling soft drinks', 'Not interested at the moment', 'Other'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="actions-column">
          <div className="details-card">
            <div className="card-title-row">
              <h3>Action Center</h3>
            </div>
            <div className="field-group">
              <div className="field-label">Current Status</div>
              <select 
                className="form-select" 
                value={lead.status} 
                onChange={(e) => handleUpdateStatus(e.target.value)}
                disabled={updating}
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field-group">
              <div className="field-label">Next Follow-up</div>
              <div className="filter-dropdown" style={{ width: '100%', justifyContent: 'space-between' }}>
                <span>{lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate).toLocaleString() : 'Not scheduled'}</span>
                <Calendar size={14} />
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="action-btn-white" style={{ width: '100%' }}>
                <Plus size={18} /> Create Order
              </button>
              <button className="action-btn-white" style={{ width: '100%' }}>
                <Download size={18} /> Schedule Delivery
              </button>
            </div>
          </div>

          <div className="activity-history-card" style={{ marginTop: '1.5rem' }}>
            <div className="card-title-row">
              <h3>Activity & Notes</h3>
            </div>
            <div className="note-input-container">
              <textarea 
                className="note-textarea" 
                placeholder="Add a note..." 
                value={note}
                onChange={e => setNote(e.target.value)}
              ></textarea>
              <button className="note-send-btn" onClick={handleAddNote}>
                <MessageSquare size={18} />
              </button>
            </div>
            <div className="history-timeline">
              {/* This should ideally be a filtered activity list for this lead */}
              <div className="history-item">
                <div className="history-dot"></div>
                <div className="history-content">
                  <div className="history-text">Lead status is: {lead.status}</div>
                  <div className="history-time">{new Date(lead.updatedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ user, text, time }) => (
  <div className="activity-item">
    <div className="activity-dot"></div>
    <div className="activity-info">
      <div className="activity-text"><span style={{ fontWeight: 800 }}>{user}</span>: {text}</div>
      <div className="activity-time">{time}</div>
    </div>
  </div>
);

const NotificationsPopup = ({ activity, onClose, onNavigate }) => {
  return (
    <div className="notifications-popup" onClick={e => e.stopPropagation()}>
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="mark-read-btn">Mark all as read</button>
      </div>
      <div className="notifications-list">
        {activity.slice(0, 5).map(n => (
          <div key={n._id} className="notification-item">
            <div className="notification-avatar">
              {n.user === 'System' ? <Activity size={14} /> : (n.user ? n.user[0] : '?')}
            </div>
            <div className="notification-content">
              <div className="notification-text">
                <span className="user-name">{n.user}</span> {n.text}
              </div>
              <div className="notification-time">{new Date(n.time).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        {activity.length === 0 && <p style={{ padding: '1rem', color: '#9ca3af' }}>No recent activity.</p>}
      </div>
      <div className="notifications-footer" onClick={() => {
        onNavigate();
        onClose();
      }}>
        View all notifications
      </div>
    </div>
  );
};

const NotificationsView = ({ activity }) => {
  return (
    <div className="page-content">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with the latest CRM activity</p>
        </div>
        <button className="btn-secondary">Mark all as read</button>
      </header>

      <div className="notifications-page-list">
        {activity.map(n => (
          <div key={n._id} className="notification-page-item">
            <div className="notif-left">
              <div className="notif-avatar-large">
                {n.user === 'System' ? <Activity size={20} /> : (n.user ? n.user[0] : '?')}
              </div>
              <div className="notif-info">
                <div className="notif-header">
                  <span className="notif-user">{n.user}</span>
                  <span className="notif-type-tag">Activity</span>
                </div>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{new Date(n.time).toLocaleString()}</div>
              </div>
            </div>
            <div className="notif-actions">
              <button className="btn-icon-only"><MoreHorizontal size={18} /></button>
            </div>
          </div>
        ))}
        {activity.length === 0 && <p style={{ color: '#9ca3af', padding: '2rem' }}>No notifications found.</p>}
      </div>
    </div>
  );
};

export default App;
