<<<<<<< HEAD
import React from 'react';
import Navbar from '../components/Navbar';
import { Target, Users, Zap, CheckCircle, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Navbar />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-50 opacity-70 -z-10"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="text-indigo-600 font-black tracking-wider uppercase text-sm">Our Story</span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Revolutionizing how <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">Communities</span> operate.
                            </h1>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Developed as part of a 6th semester B.Tech CSE project, CommunityConnect was born out of the need to eliminate manual society management processes. We aim to bring transparency, speed, and convenience to residential living.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-pink-100 p-3 rounded-xl text-pink-600 mt-1">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Our Mission</h4>
                                        <p className="text-sm text-slate-500 font-medium">To digitize and secure everyday society operations.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 mt-1">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Community First</h4>
                                        <p className="text-sm text-slate-500 font-medium">Built with the needs of diverse residents in mind.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-indigo-600 rounded-[3rem] rotate-6 opacity-20 blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                                alt="Team Working"
                                className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-8 border-white"
                            />
                        </div>
                    </div>

                    <div className="mt-32 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black text-slate-900 mb-6">Why Choose CommunityConnect?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="space-y-4">
                                <Zap className="w-10 h-10 text-orange-500 mx-auto" />
                                <h4 className="font-bold text-lg text-slate-900">Lightning Fast</h4>
                                <p className="text-sm text-slate-500 font-medium">Built on modern tech stack for zero-lag experience.</p>
                            </div>
                            <div className="space-y-4">
                                <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
                                <h4 className="font-bold text-lg text-slate-900">Highly Secure</h4>
                                <p className="text-sm text-slate-500 font-medium">Role-based authentication and encrypted data storage.</p>
                            </div>
                            <div className="space-y-4">
                                <CheckCircle className="w-10 h-10 text-pink-500 mx-auto" />
                                <h4 className="font-bold text-lg text-slate-900">Easy to Use</h4>
                                <p className="text-sm text-slate-500 font-medium">Intuitive UI tailored for users of all age groups.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
=======

import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <div className="md:flex">
                        <div className="md:w-1/2 p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About CommunityConnect</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                CommunityConnect was born from the need to simplify residential society management.
                                We realized that traditional methods like manual ledgers and chaotic WhatsApp groups
                                were inefficient and often led to miscommunication.
                            </p>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                Our mission is to create smarter, safer, and more connected communities. By leveraging
                                modern technology, we empower residents, admins, and security personnel to work seamlessly together.
                            </p>
                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
                                Join Our Vision
                            </button>
                        </div>
                        <div className="md:w-1/2 bg-indigo-100 flex items-center justify-center p-12">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Team collaboration"
                                className="rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition duration-500"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Our Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-blue-500 text-center">
                            <h4 className="text-xl font-bold mb-2">Transparency</h4>
                            <p className="text-gray-500">Open communication and clear financial records for everyone.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-green-500 text-center">
                            <h4 className="text-xl font-bold mb-2">Efficiency</h4>
                            <p className="text-gray-500">Automating repetitive tasks to save time and reduce errors.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-purple-500 text-center">
                            <h4 className="text-xl font-bold mb-2">Community</h4>
                            <p className="text-gray-500">Fostering a sense of belonging and mutual support among residents.</p>
                        </div>
                    </div>
                </div>
            </div>
>>>>>>> 8044050 (chore: add client and server folders)
        </div>
    );
};

export default About;
