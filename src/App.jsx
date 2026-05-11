import React, { useState, useEffect } from 'react';
import { 
  Users, LayoutDashboard, BarChart3, Settings, 
  Plus, LogOut, Search, Filter, Mail, Phone, 
  Building2, DollarSign, TrendingUp, CheckCircle2 
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
  
  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', company: '', value: 0, status: 'New' });

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
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
      } else if (leadsRes.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error('Fetch error:', err);
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
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Check API/Vercel.');
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
      alert('Error adding lead');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <form onSubmit={handleLogin} className="glass card animate-fade-in login-card">
          <div className="logo-section">
            <LayoutDashboard size={40} color="var(--primary)" />
            <h1>LeadsCRM</h1>
          </div>
          <p className="login-subtitle">Enterprise Sales Management</p>
          {error && <div className="error-alert">{error}</div>}
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={loginData.email} 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={loginData.password} 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required 
            />
          </div>
          <button type="submit" disabled={loginLoading} className="login-btn">
            {loginLoading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
          <div className="login-footer">
            admin@leadscrm.com / admin_password_123
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div className="brand">
          <div className="brand-logo"><LayoutDashboard size={24} /></div>
          <span>LeadsCRM</span>
        </div>
        
        <nav className="nav-menu">
          <div 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'leads' ? 'active' : ''}`}
            onClick={() => setCurrentView('leads')}
          >
            <Users size={20} />
            <span>Leads</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
            onClick={() => setCurrentView('analytics')}
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </div>
          <div 
            className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>

        <div className="logout-zone" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div>
            <h1 className="view-title">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h1>
            <p className="view-subtitle">Management Console</p>
          </div>
          <div className="header-actions">
            <button className="primary-btn" onClick={() => setShowAddModal(true)}>
              <Plus size={20} />
              <span>Add Lead</span>
            </button>
          </div>
        </header>

        {currentView === 'dashboard' && (
          <div className="view-container">
            <section className="stats-grid">
              <StatCard label="Total Revenue" value={`$${stats.totalValue?.toLocaleString()}`} icon={<DollarSign color="var(--primary)" />} trend="+12%" />
              <StatCard label="Total Leads" value={stats.totalLeads} icon={<Users color="var(--success)" />} trend="+5%" />
              <StatCard label="Conversion" value={`${stats.conversionRate}%`} icon={<TrendingUp color="var(--warning)" />} trend="-2%" />
              <StatCard label="Won Deals" value={stats.wonLeads} icon={<CheckCircle2 color="var(--primary)" />} trend="+8%" />
            </section>

            <section className="glass card recent-leads">
              <div className="section-header">
                <h3>Recent High-Value Leads</h3>
              </div>
              <LeadTable leads={leads.slice(0, 5)} />
            </section>
          </div>
        )}

        {currentView === 'leads' && (
          <div className="view-container">
            <div className="filters-bar glass card">
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Search leads..." />
              </div>
              <button className="secondary-btn"><Filter size={18} /> Filters</button>
            </div>
            <section className="glass card full-leads">
              <LeadTable leads={leads} />
            </section>
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="view-container">
            <div className="glass card analytics-placeholder">
              <BarChart3 size={48} color="var(--primary)" />
              <h3>Analytics Engine Coming Soon</h3>
              <p>Advanced lead attribution and revenue forecasting.</p>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="view-container">
            <div className="glass card settings-placeholder">
              <Settings size={48} color="var(--primary)" />
              <h3>System Settings</h3>
              <p>Configure API integrations and user roles.</p>
            </div>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content glass card animate-fade-in">
            <h2>Add New Enterprise Lead</h2>
            <form onSubmit={handleAddLead}>
              <div className="input-group">
                <label>Contact Name</label>
                <input 
                  type="text" 
                  value={newLead.name} 
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={newLead.email} 
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  required 
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Company</label>
                  <input 
                    type="text" 
                    value={newLead.company} 
                    onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Deal Value ($)</label>
                  <input 
                    type="number" 
                    value={newLead.value} 
                    onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Create Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, trend }) {
  return (
    <div className="card glass stat-card">
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <span className="stat-trend">{trend}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function LeadTable({ leads }) {
  if (leads.length === 0) return <div className="empty-state">No leads found. Click "Add Lead" to start.</div>;
  
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Lead</th>
            <th>Company</th>
            <th>Status</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td>
                <div className="lead-info">
                  <span className="lead-name">{lead.name}</span>
                  <span className="lead-email">{lead.email}</span>
                </div>
              </td>
              <td>
                <div className="company-info">
                  <Building2 size={14} />
                  <span>{lead.company}</span>
                </div>
              </td>
              <td>
                <span className={`badge badge-${lead.status.toLowerCase()}`}>
                  {lead.status}
                </span>
              </td>
              <td className="lead-value">${lead.value?.toLocaleString()}</td>
              <td><button className="icon-btn">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
