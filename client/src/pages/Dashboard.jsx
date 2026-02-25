<<<<<<< HEAD
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
=======

import React, { useState } from 'react';
import { Home, Bell, FileText, Users, CreditCard, Shield, Settings, Menu, LogOut, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

const StatCard = ({ title, value, color, icon: Icon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
            <Icon size={100} className={`text-black`} />
        </div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} shadow-lg`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 fixed h-full z-20 transition-all duration-300 ease-in-out hidden md:flex flex-col`}
            >
                <div className="h-20 flex items-center justify-center border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Home className="text-white h-5 w-5" />
                        </div>
                        {isSidebarOpen && <span className="font-bold text-xl text-gray-800">Community</span>}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                    <div className="mb-6 px-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
                        <SidebarItem icon={Home} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
                        <SidebarItem icon={Bell} label="Notices" active={activeTab === 'Notices'} onClick={() => setActiveTab('Notices')} />
                        <SidebarItem icon={FileText} label="Complaints" active={activeTab === 'Complaints'} onClick={() => setActiveTab('Complaints')} />
                        <SidebarItem icon={CreditCard} label="Payments" active={activeTab === 'Payments'} onClick={() => setActiveTab('Payments')} />
                    </div>
                    <div className="px-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Community</p>
                        <SidebarItem icon={Users} label="Directory" active={activeTab === 'Directory'} onClick={() => setActiveTab('Directory')} />
                        <SidebarItem icon={Shield} label="Security" active={activeTab === 'Security'} onClick={() => setActiveTab('Security')} />
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={handleLogout} className="flex items-center space-x-3 text-gray-500 hover:text-red-500 transition-colors px-4 py-2 w-full">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className={`flex-1 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300 p-8`}>
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userInfo.name ? userInfo.name.split(' ')[0] : 'Resident'}! 👋</h1>
                        <p className="text-gray-500">Here's what's happening in your society today.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100 relative">
                            <Bell className="text-gray-600" size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </div>
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border border-indigo-200">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.name || 'User'}`} alt="User" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                {activeTab === 'Overview' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Total Due" value="$150.00" color="bg-linear-to-r from-red-500 to-pink-500" icon={CreditCard} />
                            <StatCard title="Active Complaints" value="2" color="bg-linear-to-r from-orange-400 to-yellow-500" icon={FileText} />
                            <StatCard title="Suggestions" value="1 New" color="bg-linear-to-r from-blue-400 to-indigo-500" icon={FileText} />
                            <StatCard title="Visitors Today" value="5" color="bg-linear-to-r from-green-400 to-emerald-500" icon={Users} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Notices */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-gray-800">Recent Notices</h3>
                                    <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: "Pool Maintenance", date: "Today", type: "Maintenance" },
                                        { title: "Annual General Meeting", date: "Tomorrow", type: "Event" },
                                        { title: "Water Supply Interruption", date: "Wednesday", type: "Alert" }
                                    ].map((notice, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-l-4 border-indigo-500">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{notice.title}</h4>
                                                <p className="text-xs text-gray-500">{notice.type}</p>
                                            </div>
                                            <span className="text-xs font-bold text-gray-400">{notice.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg text-gray-800 mb-6">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-indigo-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors">
                                        <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center mb-2 text-indigo-700">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-medium text-indigo-900">Raise Complaint</span>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
                                        <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mb-2 text-purple-700">
                                            <Users size={20} />
                                        </div>
                                        <span className="font-medium text-purple-900">Pre-approve Visitor</span>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition-colors">
                                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-2 text-green-700">
                                            <CreditCard size={20} />
                                        </div>
                                        <span className="font-medium text-green-900">Pay Maintenance</span>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors">
                                        <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center mb-2 text-orange-700">
                                            <Shield size={20} />
                                        </div>
                                        <span className="font-medium text-orange-900">Emergency Alert</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab !== 'Overview' && (
                    <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="text-center text-gray-400">
                            <p className="text-lg">Section "{activeTab}" under construction</p>
                        </div>
                    </div>
                )}
            </div>
>>>>>>> 8044050 (chore: add client and server folders)
        </div>
    );
};

export default Dashboard;
