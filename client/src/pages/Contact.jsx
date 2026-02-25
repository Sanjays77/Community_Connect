<<<<<<< HEAD
import React from 'react';
import Navbar from '../components/Navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Navbar />

            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-pink-100 to-indigo-50 rounded-bl-full opacity-50 -z-10"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-indigo-600 font-black tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            We'd love to hear from you
                        </h1>
                        <p className="text-lg text-slate-600 font-medium">
                            Have questions about CommunityConnect? Want to suggest a feature or report a bug? Send us a message!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

                        {/* Contact Info */}
                        <div className="space-y-8 lg:col-span-1">
                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="bg-pink-100 p-3 rounded-2xl text-pink-600 mt-1">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                                    <p className="text-sm text-slate-500 font-medium">+91 98765 43210</p>
                                    <p className="text-sm text-slate-500 font-medium">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600 mt-1">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                                    <p className="text-sm text-slate-500 font-medium">support@communityconnect.in</p>
                                    <p className="text-sm text-slate-500 font-medium">hello@communityconnect.in</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600 mt-1">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">Visit Us</h4>
                                    <p className="text-sm text-slate-500 font-medium">CSE Department,<br />University Campus, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <form className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-slate-800" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-slate-800" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Subject</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-slate-800" placeholder="How can we help you?" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Message</label>
                                    <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-slate-800 resize-none" placeholder="Type your message here..."></textarea>
                                </div>

                                <button type="button" className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-500/30 transform transition hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                    Send Message <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
=======

import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
                        <p className="mt-2 text-gray-600">We'd love to hear from you!</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg"
                            >
                                <Mail className="text-indigo-600" size={24} />
                                <span className="text-gray-700">support@communityconnect.com</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg"
                            >
                                <Phone className="text-purple-600" size={24} />
                                <span className="text-gray-700">+1 (555) 123-4567</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg"
                            >
                                <MapPin className="text-green-600" size={24} />
                                <span className="text-gray-700">123 Tech Park, Silicon Valley</span>
                            </motion.div>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
>>>>>>> 8044050 (chore: add client and server folders)
        </div>
    );
};

export default Contact;
