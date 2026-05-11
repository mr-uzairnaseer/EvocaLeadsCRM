import React, { useState, useEffect } from 'react';
import { 
  Users, LayoutDashboard, BarChart3, Settings, 
  Plus, LogOut, Search, Calendar,
  Building2, ArrowRight, UserCircle, Bell, Moon,
  Target, Handshake, CheckSquare, RefreshCw, Box, Truck, AlertCircle
} from 'lucide-react';
import './index.css';

const API_URL = '/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ 
    totalLeads: 0, 
    totalValue: 0, 
    pipeline: { New: 0, Contacted: 0, Qualified: 0, Booked: 0, Approved: 0, Delivered: 0, Transacting: 0, NonTrans: 0 },
    conversionRate: 0 
  });
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ email: 'admin@leadscrm.com', password: 'admin_password_123' });
  
  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const [leadsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/leads`, { headers }),
        fetch(`${API_URL}/stats`, { headers })
      ]);
      if (leadsRes.ok && statsRes.ok) {
        setLeads(await leadsRes.json());
        setStats(await statsRes.json());
      } else if (leadsRes.status === 401) handleLogout();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');
    try {
      await fetch(`${API_URL}/health`);
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else setError(data.error || 'Invalid credentials');
    } catch (err) {
      setError('Connection failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <form onSubmit={handleLogin} className="login-card animate-fade-in">
          <div className="brand" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            <div className="brand-logo" style={{ background: '#2563eb' }}><Box size={24} /></div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Zen Hub</span>
          </div>
          {error && <div className="error-alert">{error}</div>}
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
          </div>
          <button type="submit" disabled={loginLoading} className="primary-btn" style={{ width: '100%', justifyContent: 'center', background: '#2563eb' }}>
            {loginLoading ? 'Authenticating...' : 'Sign In'}
          </button>
          <div className="login-footer">admin@leadscrm.com / admin_password_123</div>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo" style={{ background: '#2563eb' }}><Box size={18} /></div>
          <span style={{ fontWeight: 800 }}>Zen Hub</span>
        </div>
        
        <div className="nav-section-label">Navigation</div>
        <nav className="nav-menu">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={<Target size={18} />} label="Opportunities" active={currentView === 'leads'} onClick={() => setCurrentView('leads')} />
          <NavItem icon={<Users size={18} />} label="Accounts" />
          <NavItem icon={<UserCircle size={18} />} label="Contact" />
          <NavItem icon={<Calendar size={18} />} label="Calendar" />
        </nav>

        <div className="nav-section-label">Admin</div>
        <nav className="nav-menu">
          <NavItem icon={<Users size={18} />} label="Users" />
        </nav>

        <div className="nav-section-label">Team</div>
        <div className="team-list">
          <TeamItem name="Vandan Popat" online />
          <TeamItem name="Oleksiy Radchenko" online />
          <TeamItem name="Janey Chudasama" online />
          <TeamItem name="James King" online />
          <TeamItem name="Umair" online />
        </div>

        <div className="user-profile">
          <div className="avatar">U</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>Umair</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>mr.umairnaseer@gmai...</div>
          </div>
          <Bell size={16} color="#6b7280" />
        </div>
        
        <div className="logout-zone" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Log out</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="header-bar">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Box size={20} color="#6b7280" />
            <div className="search-container">
              <Search size={18} color="#9ca3af" />
              <input type="text" placeholder="Search everything..." />
              <div style={{ color: '#9ca3af', fontSize: '0.75rem' }}>⌘ K</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Moon size={18} color="#6b7280" />
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="animate-fade-in">
            <section className="stats-row">
              <StatCardSmall label="Opportunities" value={stats.totalLeads} sub="Active in pipeline" icon={<Target size={16} />} />
              <StatCardSmall label="Appointments" value={stats.pipeline.Booked} sub="Total" icon={<Calendar size={16} />} />
              <StatCardSmall label="Sold" value={stats.pipeline.Approved} sub="Total accounts" icon={<Handshake size={16} />} />
              <StatCardSmall label="Transacting" value={stats.pipeline.Transacting} sub="Live accounts" icon={<RefreshCw size={16} />} />
              <StatCardSmall label="Conversion" value={`${stats.conversionRate}%`} sub="Opp to account" icon={<BarChart3 size={16} />} />
              <StatCardSmall label="CC:Sale" value="10721:1" sub="Calls to sale" icon={<Phone size={16} />} />
            </section>

            <section className="pipeline-container">
              <div className="pipeline-header">
                <span>Pipeline</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}><BarChart3 size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Lead to Transacting</span>
              </div>
              <div className="pipeline-flow">
                <PipelineStep label="New" count={stats.pipeline.New} />
                <PipelineStep label="Contacted" count={stats.pipeline.Contacted} />
                <PipelineStep label="Qualified" count={stats.pipeline.Qualified} />
                <PipelineStep label="Booked" count={stats.pipeline.Booked} />
                <PipelineStep label="Approved" count={stats.pipeline.Approved} />
                <PipelineStep label="Delivered" count={stats.pipeline.Delivered} />
                <PipelineStep label="Transacting" count={stats.pipeline.Transacting} />
                <PipelineStep label="Non-Trans." count={stats.pipeline.NonTrans} isLast />
              </div>
            </section>

            <div className="dashboard-grid">
              <section className="grid-section">
                <div className="section-title">
                  <span>Recent Opportunities</span>
                  <span style={{ fontSize: '0.8125rem', color: '#2563eb', cursor: 'pointer' }}>View All</span>
                </div>
                <div className="opportunity-list">
                  {leads.slice(0, 5).map(lead => (
                    <div key={lead._id} className="opportunity-item">
                      <div>
                        <div style={{ fontWeight: 600 }}>{lead.company}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{lead.name}</div>
                      </div>
                      <span className="badge-new-tag">new</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid-section">
                <div className="section-title">
                  <span>Recent Activity</span>
                  <RefreshCw size={16} color="#6b7280" />
                </div>
                <div className="activity-list">
                  <ActivityItem user="Oleksiy Radchenko" text="owner not in, callbacks cheduled" time="May 11, 8:36 PM" />
                  <ActivityItem user="System" text={`New lead created: ${leads[0]?.company || 'Pending'}`} time="May 11, 8:36 PM" />
                  <ActivityItem user="Oleksiy Radchenko" text="call back arranged" time="May 11, 8:24 PM" />
                </div>
              </section>
            </div>
          </div>
        )}

        {currentView === 'leads' && (
          <div className="animate-fade-in">
             <div className="grid-section" style={{ minHeight: '600px' }}>
                <div className="section-title">
                  <span>All Opportunities</span>
                  <button className="primary-btn" style={{ background: '#2563eb' }}><Plus size={16} /> New Lead</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                   <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                        <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>Company</th>
                        <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>Status</th>
                        <th style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>Value</th>
                      </tr>
                   </thead>
                   <tbody>
                      {leads.map(lead => (
                        <tr key={lead._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600 }}>{lead.company}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{lead.name}</div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge-new-tag" style={{ background: '#f3f4f6', color: '#4b5563' }}>{lead.status}</span>
                          </td>
                          <td style={{ padding: '1rem', fontWeight: 600 }}>${lead.value?.toLocaleString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    {icon}
    <span style={{ flex: 1 }}>{label}</span>
    {active && <ArrowRight size={14} style={{ opacity: 0.5 }} />}
  </div>
);

const TeamItem = ({ name, online }) => (
  <div className="team-item">
    <div className={`status-dot ${online ? 'status-online' : 'status-offline'}`}></div>
    <span>{name}</span>
  </div>
);

const StatCardSmall = ({ label, value, sub, icon }) => (
  <div className="stat-card-new">
    <div className="stat-card-header">
      <span>{label}</span>
      {icon}
    </div>
    <div className="stat-card-value">{value}</div>
    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{sub}</div>
    <a href="#" className="stat-card-link">View <ArrowRight size={12} /></a>
  </div>
);

const PipelineStep = ({ label, count, isLast }) => (
  <div className="pipeline-step">
    <div className="pipeline-count">{count}</div>
    <div className="pipeline-label">{label}</div>
  </div>
);

const ActivityItem = ({ user, text, time }) => (
  <div className="activity-item">
    <div className="activity-dot"></div>
    <div className="activity-content">
      <div className="activity-text"><span style={{ fontWeight: 700 }}>{user}</span>: {text}</div>
      <div className="activity-time">{time}</div>
    </div>
  </div>
);

const Phone = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

export default App;
