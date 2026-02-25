import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, Receipt, BellRing, Users, Activity, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        residents: 0,
        complaints: 0,
        pending: 0,
        resolved: 0,
        revenue: 0,
    });

    // Mock data for charts since we don't have historical backend data easily available
    const monthlyRevenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4780 },
        { name: 'May', revenue: 5890 },
        { name: 'Jun', revenue: 4390 },
        { name: 'Jul', revenue: 4490 },
    ];

    const [recentLogs, setRecentLogs] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const fetchSafe = async (url) => {
                    try {
                        const res = await axios.get(url, { headers: { 'Authorization': `Bearer ${user.token}` } });
                        return res.data || [];
                    } catch (err) {
                        console.error('Failed to fetch:', url, err);
                        return [];
                    }
                };

                const [complaintsArray, billsArray, facilitiesArray, visitorsArray, usersArray] = await Promise.all([
                    fetchSafe('http://localhost:5000/api/complaints'),
                    fetchSafe('http://localhost:5000/api/bills'),
                    fetchSafe('http://localhost:5000/api/facilities'),
                    fetchSafe('http://localhost:5000/api/visitors'),
                    fetchSafe('http://localhost:5000/api/users')
                ]);

                const pendingCount = complaintsArray.filter(c => c.status !== 'Resolved').length;
                const resolvedCount = complaintsArray.filter(c => c.status === 'Resolved').length;
                const paidBills = billsArray.filter(b => b.status === 'Paid');
                const totalRevenue = paidBills.reduce((acc, bill) => acc + (bill.amount || 0), 0) + 12500; // Mock base revenue

                // Specifically count only 'Resident' role for "Total Residents"
                const residentCount = usersArray.filter(u => u.role === 'Resident').length;

                setStats({
                    residents: residentCount,
                    complaints: complaintsArray.length,
                    pending: pendingCount,
                    resolved: resolvedCount,
                    revenue: totalRevenue,
                    visitors: visitorsArray.length,
                });

                // Compile real resident activities
                const allLogs = [];
                complaintsArray.forEach(c => {
                    allLogs.push({ id: `comp-${c._id}`, timestamp: new Date(c.createdAt), action: `Complaint Filed: ${c.title}`, user: c.author?.name || 'Unknown', status: c.status });
                });
                facilitiesArray.forEach(f => {
                    allLogs.push({ id: `fac-${f._id}`, timestamp: new Date(f.createdAt || f.date), action: `Booking Request: ${f.name}`, user: f.bookedBy?.name || 'Unknown', status: f.status });
                });
                visitorsArray.forEach(v => {
                    allLogs.push({ id: `vis-${v._id}`, timestamp: new Date(v.createdAt), action: `Visitor Recorded: ${v.name}`, user: 'Security/Resident', status: v.status });
                });

                allLogs.sort((a, b) => b.timestamp - a.timestamp);
                setRecentLogs(allLogs.slice(0, 10));

            } catch (err) {
                console.error(err);
            }
        };
        if (user) fetchStats();
    }, [user]);

    const pieData = [
        { name: 'Pending', value: stats.pending || 0 },
        { name: 'Resolved', value: stats.resolved || 0 },
    ];
    // If there is no data at all, we can show a placeholder or empty sliver, but 0/0 will render nothing which is fine
    const COLORS = ['#f97316', '#22c55e'];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-700 to-pink-600">
                        Master Dashboard
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        System Overview & Analytics
                    </p>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Residents', value: stats.residents, color: 'border-blue-500', icon: <Users className="w-6 h-6 text-blue-500" /> },
                    { label: 'Total Complaints', value: stats.complaints, color: 'border-orange-500', icon: <ShieldAlert className="w-6 h-6 text-orange-500" /> },
                    { label: 'Pending Issues', value: stats.pending, color: 'border-pink-500', icon: <Activity className="w-6 h-6 text-pink-500" /> },
                    { label: 'Monthly Revenue', value: `$${stats.revenue.toLocaleString()}`, color: 'border-green-500', icon: <Receipt className="w-6 h-6 text-green-500" /> }
                ].map((card, idx) => (
                    <div key={idx} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${card.color} flex justify-between items-center`}>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{card.label}</p>
                            <h3 className="text-3xl font-black text-slate-800 mt-2">{card.value}</h3>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">Revenue Analytics (YTD)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                                <RechartsTooltip cursor={{ fill: '#F1F5F9' }} />
                                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">Complaint Status</h3>
                    <div className="flex-1 flex flex-col items-center justify-center h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex gap-4 mt-4 text-sm font-semibold text-slate-600">
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Pending</span>
                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Resolved</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-time Activity Logs Table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">System Activity Logs</h3>
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Showing Latest Resident Actions</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="py-3 px-4">Timestamp</th>
                                <th className="py-3 px-4">Action Details</th>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentLogs.length > 0 ? recentLogs.map((log) => (
                                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="py-3 px-4 text-slate-600">{log.timestamp.toLocaleString()}</td>
                                    <td className="py-3 px-4 font-medium text-slate-800">{log.action}</td>
                                    <td className="py-3 px-4 text-slate-600">{log.user}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${['SUCCESS', 'Resolved', 'Paid', 'Approved'].includes(log.status) ? 'bg-green-100 text-green-700' :
                                            ['Pending'].includes(log.status) ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {log.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-slate-500">No recent activity detected.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
