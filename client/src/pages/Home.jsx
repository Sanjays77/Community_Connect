
import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, FileText, Bell, CreditCard, Clock, Building2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${color}`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color.replace('border-', 'bg-').split(' ')[0]}/10 text-${color.split('-')[1]}-600`}>
            <Icon size={24} className={`text-${color.split('-')[1]}-600`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
                <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-indigo-50 -z-10" />

                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-indigo-100/40 to-transparent skew-x-12 transform translate-x-20" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-purple-100/40 to-transparent -skew-x-12 transform -translate-x-20" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide uppercase shadow-sm border border-indigo-200">
                            The Future of Living
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight"
                    >
                        Smart Living for <br />
                        <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Modern Communities
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed"
                    >
                        Experience a seamless, connected lifestyle. Manage visitors, payments, complaints, and community engagement all from one beautiful dashboard.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        {localStorage.getItem('userInfo') ? (
                            <Link to="/dashboard" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 text-lg">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 text-lg">
                                Get Started Now
                            </Link>
                        )}
                        <Link to="/features" className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                            Explore Features
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-16 -mb-32 relative z-10"
                    >
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661877303180-19a028c21048?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Dashboard Preview"
                            className="rounded-xl shadow-2xl border-4 border-white mx-auto max-w-5xl w-full object-cover h-[500px]"
                        />
                        <div className="absolute inset-0 rounded-xl bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to run a society
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Bell}
                            title="Digital Notice Board"
                            description="Instantly publish and view important announcements, circulars, and event updates for all residents."
                            color="border-blue-500"
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Complaint Tracking"
                            description="Raise complaints with photos, track status in real-time, and get notified on resolution."
                            color="border-red-500"
                        />
                        <FeatureCard
                            icon={CreditCard}
                            title="Automated Billing"
                            description="Generate maintenance bills automatically, track payments, and download receipts instantly."
                            color="border-green-500"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Resident Directory"
                            description="Access contact details of neighbors and management committee members securely."
                            color="border-purple-500"
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Visitor Management"
                            description="Pre-approve visitors, track entry/exit logs, and enhance security at the gate."
                            color="border-orange-500"
                        />
                        <FeatureCard
                            icon={Clock}
                            title="Facility Booking"
                            description="Book clubhouse, swimming pool, or tennis court slots online with ease."
                            color="border-teal-500"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-linear-to-r from-indigo-900 to-purple-900 py-24 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Ready to Transform Your Community?
                    </h2>
                    <p className="max-w-2xl text-xl text-indigo-100 mb-10">
                        Join thousands of forward-thinking societies who have switched to a smarter way of living.
                    </p>
                    {localStorage.getItem('userInfo') ? (
                        <Link to="/dashboard" className="px-10 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link to="/register" className="px-10 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg">
                            Create Free Account
                        </Link>
                    )}
                </div>

                {/* Background circles */}
                <div className="absolute top-0 left-0 -ml-20 -mt-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="h-8 w-8 text-indigo-400" />
                            <span className="text-2xl font-bold text-white">CommunityConnect</span>
                        </div>
                        <p className="text-gray-400 max-w-xs">
                            Smart solution for modern residential societies. simplifying life for everyone.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
                            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-200">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
                    &copy; 2026 CommunityConnect. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
