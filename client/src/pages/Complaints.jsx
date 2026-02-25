import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MessageSquareWarning, User, ShieldCheck, Zap, Star } from 'lucide-react';
import { io } from 'socket.io-client';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchComplaints();

        const socket = io('http://localhost:5000');

        socket.on('complaintStatusUpdated', (updatedComplaint) => {
            setComplaints((prevComplaints) =>
                prevComplaints.map((comp) =>
                    comp._id === updatedComplaint._id ? updatedComplaint : comp
                )
            );
        });

        socket.on('newComplaint', (newComplaint) => {
            setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchComplaints = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/complaints', { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setComplaints(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitComplaint = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/complaints', { title, description }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setTitle('');
            setDescription('');
            fetchComplaints();
            alert('Your complaint has been successfully reported!');
        } catch (error) {
            console.error(error);
            alert('Failed to submit: ' + (error.response?.data?.message || error.message));
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}`, { status }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            fetchComplaints();
        } catch (error) {
            console.error(error);
        }
    };

    const rateComplaint = async (id, rating) => {
        try {
            await axios.put(`http://localhost:5000/api/complaints/${id}/rate`, { rating }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            fetchComplaints();
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        'Pending': 'bg-rose-100 text-rose-700 border-rose-200',
        'In Progress': 'bg-orange-100 text-orange-700 border-orange-200',
        'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-rose-500">
                        Complaint Tracking
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Real-time tracking of community issues and resolutions
                    </p>
                </div>
                <div className="bg-linear-to-tr from-orange-500 to-rose-500 p-3 rounded-2xl shadow-lg shadow-orange-500/30">
                    <MessageSquareWarning className="text-white w-6 h-6" />
                </div>
            </header>

            {user?.role === 'Resident' && (
                <form onSubmit={submitComplaint} className="bg-white rounded-3xl p-8 shadow-xl shadow-orange-50/50 border border-orange-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-orange-100 to-rose-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                        <Zap className="text-orange-500 w-6 h-6" /> Register a Complaint
                    </h2>

                    <div className="space-y-4 relative z-10">
                        <input
                            type="text"
                            placeholder="Issue Subject"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all focus:bg-white"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Describe the issue in detail..."
                            rows="4"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all focus:bg-white resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit" className="bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-orange-500/30 transition-transform active:scale-95 flex items-center gap-2">
                            <MessageSquareWarning className="w-4 h-4" /> Submit Report
                        </button>
                    </div>
                </form>
            )}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                {complaints.map((complaint) => (
                    <div key={complaint._id} className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-indigo-50 relative overflow-hidden flex flex-col sm:flex-row gap-6">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${(statusColors[complaint.status] || '').split(' ')[0]}`}></div>

                        <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors duration-300">
                            <ShieldCheck className="w-8 h-8" />
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300 truncate">
                                    {complaint.title}
                                </h3>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shrink-0 w-max ${statusColors[complaint.status] || 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                                    {complaint.status}
                                </span>
                            </div>

                            <p className="text-slate-600 mb-6 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic line-clamp-3">
                                "{complaint.description}"
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                        <User className="w-4 h-4 text-indigo-500" />
                                        {complaint.author?.name || 'Unknown User'} {complaint.author?.apartmentNumber ? `(${complaint.author.apartmentNumber})` : ''}
                                    </span>
                                </div>

                                {complaint.status === 'Resolved' && (
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => user?.role === 'Resident' && rateComplaint(complaint._id, star)}
                                                disabled={user?.role !== 'Resident'}
                                                className={`p-1 transition-colors ${complaint.rating >= star ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-200'}`}
                                            >
                                                <Star className="w-5 h-5 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4 border-t border-slate-100 pt-4">
                                    {(complaint.adminResponse || (user?.role === 'Admin' || user?.role === 'Security')) && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            {complaint.adminResponse && (
                                                <div className="mb-3">
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Admin Response:</p>
                                                    <p className="text-sm font-medium text-slate-700 bg-white p-3 rounded-lg border border-slate-100 italic">
                                                        "{complaint.adminResponse}"
                                                    </p>
                                                </div>
                                            )}

                                            {(user?.role === 'Admin' || user?.role === 'Security') && (
                                                <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-slate-200/60">
                                                    <textarea
                                                        id={`reply-${complaint._id}`}
                                                        placeholder="Type your reply to the resident..."
                                                        className="w-full bg-white text-slate-700 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        rows="2"
                                                        defaultValue={complaint.adminResponse || ''}
                                                    ></textarea>

                                                    <div className="flex items-center gap-2 justify-end">
                                                        <select
                                                            id={`status-${complaint._id}`}
                                                            defaultValue={complaint.status}
                                                            className="bg-white text-slate-700 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 h-9"
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Resolved">Resolved</option>
                                                        </select>

                                                        <button
                                                            onClick={() => {
                                                                const status = document.getElementById(`status-${complaint._id}`).value;
                                                                const reply = document.getElementById(`reply-${complaint._id}`).value;
                                                                axios.put(`http://localhost:5000/api/complaints/${complaint._id}`, { status: status, adminResponse: reply }, { headers: { 'Authorization': `Bearer ${user?.token}` } })
                                                                    .then(() => fetchComplaints())
                                                                    .catch(err => console.error(err));
                                                            }}
                                                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 px-4 h-9 rounded-lg text-sm transition-colors"
                                                        >
                                                            Update & Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {complaints.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl col-span-full">
                        <ShieldCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No complaints reported</h3>
                        <p className="text-slate-400">Everything seems to be running smoothly.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Complaints;
