import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Bell, User, Calendar, FileText, Trash2, Edit } from 'lucide-react';
import { io } from 'socket.io-client';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchNotices();

        const socket = io('http://localhost:5000');

        socket.on('newNotice', (newNotice) => {
            setNotices((prevNotices) => [newNotice, ...prevNotices]);
        });

        socket.on('noticeDeleted', (id) => {
            setNotices((prevNotices) => prevNotices.filter((n) => n._id !== id));
        });

        socket.on('noticeUpdated', (updatedNotice) => {
            setNotices((prevNotices) =>
                prevNotices.map((n) => (n._id === updatedNotice._id ? updatedNotice : n))
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchNotices = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/notices');
            setNotices(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitNotice = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/notices/${editingId}`, { title, content }, { headers: { 'Authorization': `Bearer ${user.token}` } });
                setEditingId(null);
            } else {
                await axios.post('http://localhost:5000/api/notices', { title, content }, { headers: { 'Authorization': `Bearer ${user.token}` } });
            }
            setTitle('');
            setContent('');
            fetchNotices();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNotice = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/notices/${id}`, { headers: { 'Authorization': `Bearer ${user.token}` } });
            fetchNotices();
        } catch (error) {
            console.error(error);
        }
    };

    const startEditing = (notice) => {
        setEditingId(notice._id);
        setTitle(notice.title);
        setContent(notice.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-orange-400">
                        Digital Notice Board
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Stay updated with the latest community announcements
                    </p>
                </div>
                <div className="bg-linear-to-tr from-pink-500 to-orange-400 p-3 rounded-2xl shadow-lg shadow-pink-500/30">
                    <Bell className="text-white w-6 h-6" />
                </div>
            </header>

            {user?.role === 'Admin' && (
                <form onSubmit={submitNotice} className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-50/50 border border-indigo-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                    <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-2 relative z-10">
                        <Bell className="text-pink-500 w-6 h-6" /> {editingId ? 'Edit Notice' : 'Post New Notice'}
                    </h2>

                    <div className="space-y-4 relative z-10">
                        <div className="relative group">
                            <FileText className="absolute left-3 top-3 w-5 h-5 text-indigo-300 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Notice Title"
                                className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all focus:bg-white"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Notice Content..."
                            rows="4"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all focus:bg-white resize-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex gap-4">
                            <button type="submit" className="bg-linear-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-pink-500/30 transition-transform active:scale-95 flex items-center gap-2">
                                <Bell className="w-4 h-4" /> {editingId ? 'Update Notice' : 'Publish Notice'}
                            </button>
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setTitle(''); setContent(''); }} className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl text-slate-700 font-bold transition-transform active:scale-95">
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-6">
                {notices.map((notice) => (
                    <div key={notice._id} className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-indigo-50 flex flex-col sm:flex-row gap-6 relative">
                        <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-tr from-pink-100 to-orange-100 text-pink-600 group-hover:scale-110 transition-transform duration-300">
                            <Bell className="w-8 h-8" />
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-pink-600 transition-colors duration-300">
                                        {notice.title}
                                    </h3>
                                    <p className="text-slate-600 mt-2 mb-4 leading-relaxed line-clamp-3">
                                        {notice.content}
                                    </p>
                                </div>
                                {user?.role === 'Admin' && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => startEditing(notice)}
                                            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit Notice"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteNotice(notice._id)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Delete Notice"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    {notice.author?.name}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <Calendar className="w-4 h-4 text-orange-500" />
                                    {new Date(notice.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {notices.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                        <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No notices found</h3>
                        <p className="text-slate-400">There are currently no announcements to display.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;
