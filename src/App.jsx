import React, { useState, useEffect } from 'react';
import './index.css';

// Mock Data for demonstration
const MOCK_LEADS = [
  { id: 1, name: 'John Doe', email: 'john@acme.com', company: 'Acme Corp', status: 'Won', value: 12000 },
  { id: 2, name: 'Sarah Smith', email: 'sarah@tech.io', company: 'TechFlow', status: 'Qualified', value: 8500 },
  { id: 3, name: 'Mike Jones', email: 'mike@globex.com', company: 'Globex', status: 'New', value: 5000 },
  { id: 4, name: 'Emma Wilson', email: 'emma@startup.co', company: 'Nexus', status: 'Contacted', value: 3200 },
];

const StatCard = ({ title, value, change, trend }) => (
  <div className="card glass animate-fade-in">
    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </span>
    </div>
  </div>
);

const SidebarItem = ({ label, active }) => (
  <div style={{ 
    padding: '0.75rem 1rem', 
    borderRadius: '8px', 
    background: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    color: active ? 'var(--primary)' : 'var(--text-muted)',
    cursor: 'pointer',
    fontWeight: active ? '600' : '400'
  }}>
    {label}
  </div>
);

function App() {
  const [leads, setLeads] = useState(MOCK_LEADS);

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem' }}>
          LeadsCRM
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Leads" />
          <SidebarItem label="Analytics" />
          <SidebarItem label="Settings" />
        </nav>
      </aside>

      <main className="main-content">
        <header style={{ marginBottom: '3rem' }}>
          <h1 className="animate-fade-in">Enterprise Dashboard</h1>
          <h2 className="animate-fade-in">Welcome back, Sales Manager</h2>
        </header>

        <section className="stats-grid">
          <StatCard title="Total Revenue" value="$42,700" change="12%" trend="up" />
          <StatCard title="Active Leads" value="156" change="5%" trend="up" />
          <StatCard title="Conversion Rate" value="24.8%" change="2%" trend="down" />
          <StatCard title="Avg. Deal Size" value="$8,400" change="8%" trend="up" />
        </section>

        <section className="glass card animate-fade-in" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Recent Leads</h3>
            <button>+ Add New Lead</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id}>
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
                    <td style={{ fontWeight: '600' }}>${lead.value.toLocaleString()}</td>
                    <td>
                      <span style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.875rem' }}>Edit</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
