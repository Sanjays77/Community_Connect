import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UserCheck, Users, CheckCircle, Clock } from 'lucide-react';

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [purpose, setPurpose] = useState('');
    const [hostApartment, setHostApartment] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/visitors', { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setVisitors(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitVisitor = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/visitors', { name, phone, purpose, hostApartment: user?.role === 'Resident' ? user?.apartmentNumber : hostApartment }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setName('');
            setPhone('');
            setPurpose('');
            if (user?.role !== 'Resident') setHostApartment('');
            fetchVisitors();
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/visitors/${id}`, { status }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            fetchVisitors();
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Approved': 'bg-blue-100 text-blue-700 border-blue-200',
        'Denied': 'bg-red-100 text-red-700 border-red-200',
        'Checked In': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Checked Out': 'bg-slate-100 text-slate-700 border-slate-200'
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-indigo-500">
                        Visitor Management
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Track and manage guests, deliveries, and service staff securely.
                    </p>
                </div>
                <div className="bg-linear-to-tr from-blue-500 to-indigo-500 p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Users className="text-white w-6 h-6" />
                </div>
            </header>

            {(user?.role === 'Security' || user?.role === 'Resident') && (
                <form onSubmit={submitVisitor} className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-50/50 border border-blue-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                        <UserCheck className="text-blue-500 w-6 h-6" />
                        {user.role === 'Resident' ? 'Pre-approve a Visitor' : 'Register New Visitor'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        <input
                            type="text"
                            placeholder="Visitor Name"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Purpose (e.g. Delivery, Guest)"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            required
                        />
                        {user.role !== 'Resident' && (
                            <input
                                type="text"
                                placeholder="Host Apartment Number"
                                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all focus:bg-white"
                                value={hostApartment}
                                onChange={(e) => setHostApartment(e.target.value)}
                                required
                            />
                        )}
                    </div>
                    <button type="submit" className="mt-4 bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-blue-500/30 transition-transform active:scale-95 flex items-center gap-2 relative z-10">
                        <UserCheck className="w-4 h-4" /> {user.role === 'Resident' ? 'Pre-Approve' : 'Register'}
                    </button>
                </form>
            )}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {visitors.map((visitor) => (
                    <div key={visitor._id} className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${statusColors[visitor.status].split(' ')[0]}`}></div>

                        <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors duration-300">
                            <Users className="w-8 h-8" />
                        </div>

                        <div className="flex-1 w-full flex flex-col justify-center">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                                    {visitor.name}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shrink-0 w-max ${statusColors[visitor.status]}`}>
                                        {visitor.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-slate-500 text-sm flex items-center gap-4 mb-4">
                                <span>Purpose: <strong>{visitor.purpose}</strong></span>
                                <span>Phone: <strong>{visitor.phone}</strong></span>
                                <span>Host: <strong>Apt {visitor.hostApartment}</strong></span>
                            </p>

                            {(user?.role === 'Security' || user?.role === 'Resident' || user?.role === 'Admin') && (
                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Update Status:</span>

                                    {user?.role === 'Resident' && visitor.status === 'Pending' && (
                                        <>
                                            <button onClick={() => updateStatus(visitor._id, 'Approved')} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-200 font-bold transition-colors">Approve</button>
                                            <button onClick={() => updateStatus(visitor._id, 'Denied')} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 font-bold transition-colors">Deny</button>
                                        </>
                                    )}

                                    {user?.role === 'Security' && (
                                        <select
                                            value={visitor.status}
                                            onChange={(e) => updateStatus(visitor._id, e.target.value)}
                                            className="bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Denied">Denied</option>
                                            <option value="Checked In">Checked In</option>
                                            <option value="Checked Out">Checked Out</option>
                                        </select>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>
                ))}

                {visitors.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl col-span-full">
                        <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No visitors logs</h3>
                        <p className="text-slate-400">Visitor history will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Visitors;
