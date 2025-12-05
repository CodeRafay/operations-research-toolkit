import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calculator, Truck, Grid3X3 } from 'lucide-react';
import Simplex from './pages/Simplex';
import Assignment from './pages/Assignment';
import Transportation from './pages/Transportation';
import Home from './pages/Home';

const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={isActive ? 'active' : ''} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Icon size={18} />
      {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="sidebar">
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <h2 style={{ borderBottom: 'none', marginBottom: '5px', color: '#BFA15F' }}>PIA</h2>
            <span style={{ fontSize: '0.7rem', color: '#ccc', letterSpacing: '1px' }}>PAKISTAN INTERNATIONAL AIRLINES</span>
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}></div>

          <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/simplex" icon={Calculator}>Simplex Solver</SidebarLink>
          <SidebarLink to="/assignment" icon={Grid3X3}>Assignment</SidebarLink>
          <SidebarLink to="/transportation" icon={Truck}>Transportation</SidebarLink>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simplex" element={<Simplex />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/transportation" element={<Transportation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
