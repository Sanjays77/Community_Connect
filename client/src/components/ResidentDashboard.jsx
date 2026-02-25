import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, Receipt, BellRing, Users, ArrowRight, MessageSquarePlus, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResidentDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        notices: 0,
        complaints: 0,
        bills: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [noticesRes, complaintsRes, billsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/notices'),
                    axios.get('http://localhost:5000/api/complaints', { headers: { 'Authorization': `Bearer ${user.token}` } }),
                    axios.get('http://localhost:5000/api/bills', { headers: { 'Authorization': `Bearer ${user.token}` } })
                ]);
                setStats({
                    notices: noticesRes.data.length,
                    complaints: complaintsRes.data.filter(c => c.status !== 'Resolved').length,
                    bills: billsRes.data.filter(b => b.status === 'Unpaid').length,
                });
            } catch (err) {
                console.error(err);
            }
        };
        if (user) fetchStats();
    }, [user]);

    const quickActions = [
        { label: 'Raise Complaint', icon: <MessageSquarePlus className="w-6 h-6" />, color: 'bg-orange-500 hover:bg-orange-600', to: '/complaints' },
        { label: 'View Notices', icon: <BellRing className="w-6 h-6" />, color: 'bg-blue-500 hover:bg-blue-600', to: '/notices' },
        { label: 'Invite Guest', icon: <UserPlus className="w-6 h-6" />, color: 'bg-indigo-500 hover:bg-indigo-600', to: '/visitors' },
        { label: 'Pay Bills', icon: <Receipt className="w-6 h-6" />, color: 'bg-pink-500 hover:bg-pink-600', to: '/bills' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <header className="flex justify-between items-center pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Hello, {user?.name.split(' ')[0]} 👋
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        Here's your quick home overview
                    </p>
                </div>
            </header>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => navigate(action.to)}
                        className={`${action.color} text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 shadow-md`}
                    >
                        {action.icon}
                        <span className="font-semibold text-sm">{action.label}</span>
                    </button>
                ))}
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Active Complaints</p>
                        <h3 className="text-3xl font-bold text-slate-800">{stats.complaints}</h3>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-500">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Unread Notices</p>
                        <h3 className="text-3xl font-bold text-slate-800">{stats.notices}</h3>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-500">
                        <BellRing className="w-8 h-8" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium mb-1">Pending Dues</p>
                        <h3 className="text-3xl font-bold text-slate-800">{stats.bills}</h3>
                    </div>
                    <div className="bg-pink-100 p-4 rounded-2xl text-pink-500">
                        <Receipt className="w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Recent Updates Mini-Feed */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Latest from Community</h3>
                    <button onClick={() => navigate('/notices')} className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                            <BellRing className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">Water Supply Maintenance</h4>
                            <p className="text-slate-500 text-xs mt-1">Tomorrow from 10 AM to 2 PM, water supply will be halted...</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                        <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 text-sm">Your complaint #102 updated</h4>
                            <p className="text-slate-500 text-xs mt-1">The status of "Elevator NOT working" has been marked as In Progress.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResidentDashboard;
