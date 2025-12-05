import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Truck, Grid3X3, ArrowRight, Activity, Users, Globe } from 'lucide-react';

const DashboardCard = ({ title, description, icon: Icon, link, color, stat }) => (
    <div className="card" style={{
        background: 'rgba(0, 40, 20, 0.4)',
        border: '1px solid rgba(191, 161, 95, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    }}>
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div style={{ background: `rgba(${color}, 0.2)`, padding: '10px', borderRadius: '12px' }}>
                    <Icon size={24} color={`rgb(${color})`} />
                </div>
                <span style={{ fontSize: '2em', fontWeight: 'bold', color: '#fff' }}>{stat}</span>
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>{title}</h3>
            <p style={{ color: '#ccc', fontSize: '0.9em', lineHeight: '1.5' }}>{description}</p>
        </div>
        <Link to={link} style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: `rgb(${color})`,
            textDecoration: 'none',
            fontWeight: '500'
        }}>
            Access Module <ArrowRight size={16} />
        </Link>
    </div>
);

const Home = () => {
    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ color: '#fff', marginBottom: '5px' }}>Operational Overview</h1>
                <p style={{ color: '#ccc' }}>Welcome back, Administrator. Here is the status of PIA's optimization network.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <DashboardCard
                    title="Fleet Optimization"
                    description="Maximize aircraft utilization, optimize fuel consumption, and manage maintenance schedules using Linear Programming."
                    icon={Calculator}
                    link="/simplex"
                    color="0, 168, 89" // PIA Green
                    stat="98%"
                />
                <DashboardCard
                    title="Crew Assignment"
                    description="Efficiently assign pilots and cabin crew to flights to ensure coverage, minimize overtime, and adhere to regulations."
                    icon={Users}
                    link="/assignment"
                    color="191, 161, 95" // PIA Gold
                    stat="150+"
                />
                <DashboardCard
                    title="Global Logistics"
                    description="Streamline cargo and passenger logistics across domestic and international hubs, minimizing transport costs."
                    icon={Globe}
                    link="/transportation"
                    color="100, 108, 255" // Blue-ish
                    stat="24/7"
                />
            </div>

            <div className="card" style={{ marginTop: '30px', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Activity size={20} color="#BFA15F" />
                    <h3 style={{ margin: 0 }}>System Status</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div>
                        <span style={{ color: '#ccc', fontSize: '0.9em' }}>Active Solvers</span>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#00A859' }}>Online</div>
                    </div>
                    <div>
                        <span style={{ color: '#ccc', fontSize: '0.9em' }}>Last Optimization</span>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Just now</div>
                    </div>
                    <div>
                        <span style={{ color: '#ccc', fontSize: '0.9em' }}>Server Load</span>
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#00A859' }}>Low</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
