<<<<<<< HEAD
import React from 'react';
import Navbar from '../components/Navbar';
import { ShieldCheck, Bell, MessageSquare, CreditCard, Users, Calendar, Clock, Lock } from 'lucide-react';

const Features = () => {
    const featuresList = [
        {
            icon: <Bell className="w-8 h-8" />,
            title: "Digital Notice Board",
            desc: "Instantly broadcast important announcements to all residents. No more missing paper notices pinned to a crowded hallway board.",
            color: "text-indigo-600",
            bg: "bg-indigo-100"
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Complaint Tracking",
            desc: "Interactive system with real-time status updates. Log a maintenance or security issue and track its resolution progress instantly.",
            color: "text-pink-600",
            bg: "bg-pink-100"
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Automated Billing",
            desc: "Effortless maintenance bill management. Receive digital invoices, check payment records, and say goodbye to manual receipt books.",
            color: "text-emerald-600",
            bg: "bg-emerald-100"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Visitor Management",
            desc: "Pre-approve guests, track visitor logs, and ensure maximum security for your society with our robust visitor tracking system.",
            color: "text-orange-600",
            bg: "bg-orange-100"
        },
        {
            icon: <Lock className="w-8 h-8" />,
            title: "Role-Based Access",
            desc: "Customized dashboards for Residents, Security personnel, and Admins to ensure privacy and organized management.",
            color: "text-purple-600",
            bg: "bg-purple-100"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Real-Time Updates",
            desc: "Get instantly notified about events, maintenance schedules, and important alerts right on your phone or computer.",
            color: "text-blue-600",
            bg: "bg-blue-100"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Navbar />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-slate-50 opacity-50 -z-10"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-pink-500 font-black tracking-wider uppercase text-sm mb-4 block">Core Capabilities</span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Powerful Features for <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">Modern Societies</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Discover the tools that make CommunityConnect the highly-rated platform for society management. Everything you need is right here.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuresList.map((feature, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-xl shadow-slate-200/50 group">
                                <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
=======

import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Truck, Home, Activity, DollarSign, Calendar, MessageSquare, Wrench, Lock, Shield } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center"
    >
        <div className="p-4 bg-indigo-50 rounded-full mb-4 text-indigo-600">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </motion.div>
);

const Features = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Powerful Features</h1>
                <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
                    Manage every aspect of your residential community with our comprehensive suite of tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureItem icon={MessageSquare} title="Community Feed" desc="Share updates, photos, and polls with neighbors instantly." />
                    <FeatureItem icon={DollarSign} title="Payment Gateway" desc="Securely pay maintenance bills and track payment history." />
                    <FeatureItem icon={Calendar} title="Amenity Booking" desc="Reserve clubhouse, gym, or tennis court slots online." />
                    <FeatureItem icon={Shield} title="Gate Security" desc="Monitor visitor entry and exit logs in real-time." />
                    <FeatureItem icon={Wrench} title="Helpdesk" desc="Raise maintenance tickets and track their resolution status." />
                    <FeatureItem icon={Lock} title="Privacy Control" desc="Control who can see your contact details within the society." />
                </div>
            </div>
>>>>>>> 8044050 (chore: add client and server folders)
        </div>
    );
};

export default Features;
