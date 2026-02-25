import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Users, ShieldCheck, Mail, Building, Trash2 } from 'lucide-react';

const UsersDirectory = () => {
    const [usersList, setUsersList] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${user?.token}` }
            });
            setUsersList(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to completely remove this user from the system?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { 'Authorization': `Bearer ${user?.token}` }
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert('Failed to delete user');
        }
    };

    const roleColors = {
        'Admin': 'bg-orange-100 text-orange-700 border-orange-200',
        'Resident': 'bg-indigo-100 text-indigo-700 border-indigo-200',
        'Security': 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };

    if (user?.role !== 'Admin') {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center animate-in fade-in zoom-in duration-500">
                <ShieldCheck className="w-24 h-24 text-rose-500 mb-6 drop-shadow-lg" />
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">Access Denied</h1>
                <p className="text-slate-500 mt-4 text-lg">You do not have administrative privileges to view this directory.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-700 to-pink-600">
                        System Users Directory
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Manage Residents, Security, and Administrative Accounts
                    </p>
                </div>
                <div className="bg-linear-to-tr from-indigo-600 to-pink-500 p-3 rounded-2xl shadow-lg shadow-pink-500/30">
                    <Users className="text-white w-6 h-6" />
                </div>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                                <th className="py-4 px-6 font-bold">User Details</th>
                                <th className="py-4 px-6 font-bold">Contact Info</th>
                                <th className="py-4 px-6 font-bold">Role & Access</th>
                                <th className="py-4 px-6 font-bold">Joined / Apartment</th>
                                <th className="py-4 px-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {usersList.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-indigo-700 font-bold shadow-inner">
                                                {u.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-slate-800">{u.name}</span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            {u.email}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleColors[u.role] || 'bg-slate-100 text-slate-700'}`}>
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>

                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            {u.role === 'Resident' ? (
                                                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-slate-100 w-max px-2 py-1 rounded-md">
                                                    <Building className="w-3.5 h-3.5 text-indigo-500" />
                                                    {u.apartmentNumber || 'N/A'}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm italic">System Scope</span>
                                            )}
                                            <span className="text-xs text-slate-400 mt-1">
                                                Since {new Date(u.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 text-right">
                                        {u._id !== user._id && (
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {usersList.length === 0 && (
                        <div className="text-center py-16">
                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 text-lg font-medium">No users found in standard query.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersDirectory;
