import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, Instagram, Twitter, Facebook, Home, ArrowRight, Star, CheckCircle, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-pink-200 selection:text-pink-900">

            {/* --- NAVBAR --- */}
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-20 pb-32 overflow-hidden flex-1 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-pink-100 to-indigo-50 rounded-bl-full opacity-50 -z-10"></div>
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
                            Smart Living <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">
                                Simplified.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                            A centralized web platform designed to streamline daily operations for residential societies. Experience a unified dashboard for residents, admins, and security personnel.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/login" className="w-full sm:w-auto text-center bg-indigo-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-1">
                                Join Your Community
                            </Link>
                            <a href="#features" className="w-full sm:w-auto text-center bg-white hover:bg-slate-50 text-indigo-900 border border-indigo-100 font-bold py-4 px-8 rounded-2xl shadow-sm transition-colors">
                                Explore Features
                            </a>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                            <div className="flex -space-x-3">
                                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="user" />
                                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="user" />
                                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="user" />
                            </div>
                            <p>Trusted by 500+ Residents</p>
                        </div>
                    </div>

                    <div className="relative mx-auto lg:ml-auto w-full max-w-lg">
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-[3rem] rotate-3 opacity-20 blur-xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80"
                            alt="Modern Apartment"
                            className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[600px] w-full border-8 border-white"
                        />
                        <div className="absolute bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 flex items-center gap-4 animate-bounce">
                            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="font-black text-slate-900">100% Secure</p>
                                <p className="text-slate-500 text-sm font-medium">Verified Neighbors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section id="features" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Everything you need to run your society</h2>
                        <p className="text-lg text-slate-500 font-medium">Say goodbye to manual ledgers and WhatsApp groups. Welcome to a transparent, efficient digital workflow.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                            <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 font-black text-2xl">01</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Digital Notice Board</h3>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">Instantly broadcast important announcements to all residents. No more missing paper notices pinned to a crowded hallway board.</p>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center text-pink-600 mb-6 font-black text-2xl">02</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Complaint Tracking</h3>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">Interactive system with real-time status updates. Log a maintenance or security issue and track its resolution progress instantly.</p>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 font-black text-2xl">03</div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Automated Billing</h3>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">Effortless maintenance bill management. Receive digital invoices, check payment records, and say goodbye to manual receipt books.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS SECTION --- */}
            <section className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-pink-500 font-black tracking-wider uppercase text-sm mb-4 block">Simple Process</span>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">How CommunityConnect Works</h2>
                        <p className="text-lg text-slate-500 font-medium">Getting started is completely seamless and takes only a few minutes.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-100 via-pink-100 to-emerald-100 -translate-y-1/2 -z-10"></div>

                        <div className="text-center bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group">
                            <div className="w-16 h-16 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">1</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Register</h4>
                            <p className="text-sm text-slate-500 font-medium">Sign up as a resident or security personnel to join your community workspace.</p>
                        </div>

                        <div className="text-center bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group mt-8 md:mt-0">
                            <div className="w-16 h-16 mx-auto bg-pink-500 text-white rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">2</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Get Verified</h4>
                            <p className="text-sm text-slate-500 font-medium">Admin instantly verifies your details to ensure absolute community security.</p>
                        </div>

                        <div className="text-center bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group mt-8 md:mt-0">
                            <div className="w-16 h-16 mx-auto bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">3</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Explore Features</h4>
                            <p className="text-sm text-slate-500 font-medium">Access notices, pay maintenance bills, or log a complaint right away.</p>
                        </div>

                        <div className="text-center bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group mt-8 md:mt-0">
                            <div className="w-16 h-16 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-xl mb-4 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">4</div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">Live Smart</h4>
                            <p className="text-sm text-slate-500 font-medium">Enjoy a peaceful, organized, and transparent digital society experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS SECTION --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full opacity-50 -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-600 font-black tracking-wider uppercase text-sm mb-4 block">User Stories</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Loved by thousands of residents.</h2>
                            <p className="text-lg text-slate-600 font-medium mb-8">
                                Don't just take our word for it. Hear from users who have transformed their society's daily operations using our platform.
                            </p>
                            <Link to="/features" className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                View all features <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform">
                                <div className="flex gap-1 text-orange-400 mb-4">
                                    <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-slate-700 italic font-medium mb-6">"Ever since we switched to CommunityConnect, handling society maintenance bills has been a breeze. No more knocking on doors to collect cheques!"</p>
                                <div className="flex items-center gap-4">
                                    <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-12 h-12 rounded-full ring-2 ring-indigo-100" />
                                    <div>
                                        <h5 className="font-bold text-slate-900">Priya Sharma</h5>
                                        <p className="text-xs font-bold text-slate-500">Society Treasurer</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-900 p-8 rounded-3xl border border-indigo-800 shadow-xl shadow-indigo-900/50 hover:scale-[1.02] transition-transform text-white ml-0 md:ml-12">
                                <div className="flex gap-1 text-pink-400 mb-4">
                                    <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-indigo-100 italic font-medium mb-6">"The complaint tracking system is fantastic. I logged a plumbing issue and the facility manager got it fixed within 2 hours. Highly responsive platform."</p>
                                <div className="flex items-center gap-4">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-12 h-12 rounded-full ring-2 ring-indigo-500" />
                                    <div>
                                        <h5 className="font-bold text-white">Rahul Verma</h5>
                                        <p className="text-xs font-bold text-indigo-300">Resident</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer id="contact" className="bg-indigo-950 text-indigo-200 pt-20 pb-10 border-t-4 border-pink-500">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-tr from-pink-500 to-orange-400 p-2 rounded-xl text-white">
                                <Home className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black text-white">
                                CommunityConnect
                            </span>
                        </div>
                        <p className="max-w-md font-medium text-indigo-300 leading-relaxed">
                            Part of a 6th semester B.Tech CSE project designed to modernize the way residential communities communicate and operate.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Quick Links</h4>
                        <ul className="space-y-4 font-medium">
                            <li><a href="#features" className="hover:text-pink-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-pink-400 transition-colors">About the Project</a></li>
                            <li><Link to="/login" className="hover:text-pink-400 transition-colors">Login / Register</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Contact Us</h4>
                        <ul className="space-y-4 font-medium">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-pink-400" />
                                +91 98765 43210
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-pink-400" />
                                support@communityconnect.in
                            </li>
                            <li className="flex items-start gap-3">
                                <Home className="w-5 h-5 text-pink-400 shrink-0 mt-1" />
                                <span>CSE Department,<br />University Campus</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-indigo-500/30 text-center text-sm font-medium">
                    <p>&copy; {new Date().getFullYear()} CommunityConnect Project. Built for 6th Sem B.Tech CSE.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
