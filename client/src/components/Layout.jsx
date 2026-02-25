import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Bell, MessageSquareWarning, Receipt, LogOut, Users, Building } from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    let navLinks = [];

    if (user?.role === 'Admin') {
        navLinks = [
            { to: '/dashboard', label: 'Master Dashboard', icon: <Home className="w-5 h-5" /> },
            { to: '/users', label: 'User Directory', icon: <Users className="w-5 h-5" /> },
            { to: '/notices', label: 'Notice Management', icon: <Bell className="w-5 h-5" /> },
            { to: '/complaints', label: 'Complaint Control', icon: <MessageSquareWarning className="w-5 h-5" /> },
            { to: '/bills', label: 'Smart Billing', icon: <Receipt className="w-5 h-5" /> },
            { to: '/visitors', label: 'Security & Logs', icon: <Building className="w-5 h-5" /> },
            { to: '/facilities', label: 'Facility Bookings', icon: <Users className="w-5 h-5" /> },
        ];
    } else if (user?.role === 'Resident') {
        navLinks = [
            { to: '/dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
            { to: '/notices', label: 'Notice Board', icon: <Bell className="w-5 h-5" /> },
            { to: '/complaints', label: 'My Complaints', icon: <MessageSquareWarning className="w-5 h-5" /> },
            { to: '/bills', label: 'My Bills', icon: <Receipt className="w-5 h-5" /> },
            { to: '/facilities', label: 'Facilities', icon: <Building className="w-5 h-5" /> },
            { to: '/visitors', label: 'Invite Guest', icon: <Users className="w-5 h-5" /> },
        ];
    } else {
        // Security or Default
        navLinks = [
            { to: '/dashboard', label: 'Gate Console', icon: <Home className="w-5 h-5" /> },
            { to: '/visitors', label: 'Visitor Logs', icon: <Users className="w-5 h-5" /> },
            { to: '/notices', label: 'Notices', icon: <Bell className="w-5 h-5" /> },
        ];
    }

    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col min-h-screen shadow-2xl">
            <div className="p-6 text-2xl font-black tracking-wider text-center border-b border-white/10">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300">
                    CommunityConnect
                </span>
            </div>

            <div className="flex-1 py-6 flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg font-semibold translate-x-2'
                                : 'text-slate-400 hover:bg-white/10 hover:text-white hover:translate-x-1'
                            }`
                        }
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-white/10 shrink-0 bg-slate-800/50 m-4 rounded-2xl">
                <div className="mb-4 text-sm">
                    <p className="font-bold text-white truncate">{user?.name}</p>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">{user?.role} {user?.apartmentNumber ? `| ${user?.apartmentNumber}` : ''}</p>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-y-auto w-full relative">
                <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 rounded-br-full -z-10 blur-3xl mix-blend-multiply"></div>
                <div className="p-8 pb-20 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
