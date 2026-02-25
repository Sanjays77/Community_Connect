<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-indigo-100 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-tr from-pink-500 to-orange-400 p-2 rounded-xl text-white shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
                        <Home className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-600">
                        CommunityConnect
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
                    <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
                    <Link to="/features" className="hover:text-pink-500 transition-colors">Features</Link>
                    <Link to="/about" className="hover:text-pink-500 transition-colors">About Us</Link>
                    <Link to="/contact" className="hover:text-pink-500 transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="hidden md:block font-bold text-indigo-600 hover:text-pink-500 transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-pink-500/30 transform transition hover:-translate-y-0.5">
                        Sign Up
                    </Link>
                </div>
            </div>
=======

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <Building2 className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            CommunityConnect
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                        <Link to="/features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</Link>
                        <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
                        {userInfo ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors flex items-center gap-1">
                                    <User size={18} />
                                    Account Details
                                </Link>
                                <motion.button
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all flex items-center gap-2"
                                >
                                    <LogOut size={18} />
                                    Log Out
                                </motion.button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center gap-2"
                                >
                                    <User size={18} />
                                    Sign In
                                </motion.button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-b border-gray-100"
                >
                    <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Home</Link>
                        <Link to="/features" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">Features</Link>
                        <Link to="/about" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md">About</Link>
                        {userInfo ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-md">Account Details</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md">Log Out</button>
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-md">Sign In</Link>
                        )}
                    </div>
                </motion.div>
            )}
>>>>>>> 8044050 (chore: add client and server folders)
        </nav>
    );
};

export default Navbar;
