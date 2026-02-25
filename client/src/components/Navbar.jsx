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
        </nav>
    );
};

export default Navbar;
