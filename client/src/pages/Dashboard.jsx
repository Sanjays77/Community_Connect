import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import ResidentDashboard from '../components/ResidentDashboard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    if (user.role === 'Admin') {
        return <AdminDashboard />;
    }

    if (user.role === 'Resident') {
        return <ResidentDashboard />;
    }

    // Default or Security
    return (
        <div className="p-8 text-center bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto my-20">
            <h2 className="text-3xl font-black text-slate-800">Security Portal</h2>
            <p className="text-slate-500 mt-2">Welcome to the security and gate management system.</p>
        </div>
    );
};

export default Dashboard;
