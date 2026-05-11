import React, { useState, useEffect } from 'react';
import { 
  Users, LayoutDashboard, BarChart3, Settings, 
  Plus, LogOut, Search, Filter,
  Building2, ArrowUpRight
} from 'lucide-react';
import './index.css';

const API_URL = '/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentView, setCurrentView] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalLeads: 0, wonLeads: 0, totalValue: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ email: 'admin@leadscrm.com', password: 'admin_password_123' });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', company: '', value: 0, status: 'New' });

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

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newLead)
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewLead({ name: '', email: '', company: '', value: 0, status: 'New' });
        fetchData();
      }
    } catch (err) {
      alert('Error');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <form onSubmit={handleLogin} className="login-card animate-fade-in">
          <div className="brand" style={{ justifyContent: 'center' }}>
            <div className="brand-logo"><LayoutDashboard size={20} /></div>
            <span>LeadsCRM</span>
          </div>
          {error && <div className="error-alert">{error}</div>}
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={loginData.email} 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={loginData.password} 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
          </div>
          <button type="submit" disabled={loginLoading} className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
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
          <div className="brand-logo"><LayoutDashboard size={20} /></div>
          <span>LeadsCRM</span>
        </div>
        <nav className="nav-menu">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={<Users size={18} />} label="Leads" active={currentView === 'leads'} onClick={() => setCurrentView('leads')} />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" active={currentView === 'analytics'} onClick={() => setCurrentView('analytics')} />
          <NavItem icon={<Settings size={18} />} label="Settings" active={currentView === 'settings'} onClick={() => setCurrentView('settings')} />
        </nav>
        <div className="logout-zone" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div>
            <h1 className="view-title">{currentView.toUpperCase()}</h1>
            <p className="view-subtitle">System Management Interface</p>
          </div>
          <button className="primary-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            <span>New Lead</span>
          </button>
        </header>

        {currentView === 'dashboard' && (
          <div className="view-container animate-fade-in">
            <section className="stats-grid">
              <StatCard label="Revenue" value={`$${stats.totalValue?.toLocaleString()}`} trend="+12% YoY" />
              <StatCard label="Leads" value={stats.totalLeads} trend="+5.4%" />
              <StatCard label="Conversion" value={`${stats.conversionRate}%`} trend="-0.2%" />
              <StatCard label="Deals Won" value={stats.wonLeads} trend="+2.1%" />
            </section>
            <LeadTable leads={leads.slice(0, 5)} title="Recent Activity" />
          </div>
        )}

        {currentView === 'leads' && (
          <div className="view-container animate-fade-in">
            <div className="filters-bar" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 1, margin: 0 }}>
                <input type="text" placeholder="Search by name, company or email..." />
              </div>
              <button className="secondary-btn">Search</button>
            </div>
            <LeadTable leads={leads} />
          </div>
        )}

        {(currentView === 'analytics' || currentView === 'settings') && (
          <div className="view-container animate-fade-in" style={{ padding: '4rem', textAlign: 'center', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>This module is scheduled for the next deployment phase.</p>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h2 style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Create Lead</h2>
            <form onSubmit={handleAddLead}>
              <div className="input-group"><label>Full Name</label><input type="text" value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} required /></div>
              <div className="input-group"><label>Email Address</label><input type="email" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} required /></div>
              <div className="input-group"><label>Company</label><input type="text" value={newLead.company} onChange={(e) => setNewLead({...newLead, company: e.target.value})} required /></div>
              <div className="input-group"><label>Value ($)</label><input type="number" value={newLead.value} onChange={(e) => setNewLead({...newLead, value: e.target.value})} required /></div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick }) => (
  <div className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>{icon}<span>{label}</span></div>
);

const StatCard = ({ label, value, trend }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-trend">{trend}</div>
  </div>
);

const LeadTable = ({ leads, title }) => (
  <div className="table-wrapper">
    {title && <div style={{ padding: '1.5rem', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{title}</div>}
    <table>
      <thead><tr><th>Lead</th><th>Company</th><th>Status</th><th>Value</th><th></th></tr></thead>
      <tbody>
        {leads.length === 0 ? <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No records found.</td></tr> :
        leads.map(lead => (
          <tr key={lead._id}>
            <td><div className="lead-name">{lead.name}</div><div className="lead-email">{lead.email}</div></td>
            <td className="company-info">{lead.company}</td>
            <td><span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span></td>
            <td style={{ fontWeight: 700 }}>${lead.value?.toLocaleString()}</td>
            <td><ArrowUpRight size={16} style={{ cursor: 'pointer', opacity: 0.5 }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default App;
