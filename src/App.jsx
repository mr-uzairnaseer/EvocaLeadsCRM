import React, { useState, useEffect } from 'react';
import './index.css';

const API_URL = '/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ totalLeads: 0, wonLeads: 0, totalValue: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({ email: 'admin@leadscrm.com', password: 'admin_password_123' });

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
    try {
      // First, trigger auto-seed to ensure admin exists
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
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Connection error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} className="glass card animate-fade-in" style={{ width: '400px', padding: '3rem' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>LeadsCRM Login</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              value={loginData.email} 
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              required 
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={loginData.password} 
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required 
            />
          </div>
          <button type="submit" style={{ width: '100%' }}>Enter Dashboard</button>
          <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Default: admin@leadscrm.com / admin_password_123
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
          LeadsCRM
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="sidebar-item active">Dashboard</div>
          <div className="sidebar-item">Leads</div>
          <div className="sidebar-item">Analytics</div>
          <div onClick={handleLogout} className="sidebar-item" style={{ marginTop: 'auto', color: 'var(--danger)' }}>Logout</div>
        </nav>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="animate-fade-in">Enterprise Dashboard</h1>
            <h2 className="animate-fade-in">Dynamic overview of your sales funnel</h2>
          </div>
          <button onClick={fetchData}>Refresh Data</button>
        </header>

        <section className="stats-grid">
          <div className="card glass animate-fade-in">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Revenue</p>
            <h3>${stats.totalValue?.toLocaleString()}</h3>
          </div>
          <div className="card glass animate-fade-in">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total Leads</p>
            <h3>{stats.totalLeads}</h3>
          </div>
          <div className="card glass animate-fade-in">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Conversion Rate</p>
            <h3>{stats.conversionRate}%</h3>
          </div>
          <div className="card glass animate-fade-in">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Won Leads</p>
            <h3>{stats.wonLeads}</h3>
          </div>
        </section>

        <section className="glass card animate-fade-in" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Real-Time Leads</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            {loading ? <p>Loading data...</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No leads found. Start by adding some!</td></tr>
                  ) : leads.map(lead => (
                    <tr key={lead._id}>
                      <td>
                        <div style={{ fontWeight: '600' }}>{lead.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                      </td>
                      <td>{lead.company}</td>
                      <td>
                        <span className={`badge badge-${lead.status.toLowerCase()}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600' }}>${lead.value?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
