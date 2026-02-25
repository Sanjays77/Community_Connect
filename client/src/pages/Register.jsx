import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Phone, Home, ShieldCheck, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Register = () => {
    const [role, setRole] = useState('resident');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        flatNumber: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const dataToSubmit = {
                ...formData,
                role
            };

            const response = await axios.post('http://localhost:5000/api/users', dataToSubmit);

            if (response.data) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                setSuccess('Registration successful! Logging you in...');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong during registration');
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-[calc(100vh-4rem)] flex flex-col justify-start pt-8 pb-12 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/login.png')",
                    // backgroundColor: "#f3f4f6" // Fallback color
                }}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md mt-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/90 backdrop-blur-sm py-4 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-2 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">Create an Account</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Register to join the community
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm text-center">
                                {success}
                            </div>
                        )}

                        <div className="flex justify-center space-x-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setRole('resident')}
                                className={`flex-1 flex flex-col items-center p-2 rounded-lg border-2 transition-all ${role === 'resident' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-indigo-300'}`}
                            >
                                <Home size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Resident</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`flex-1 flex flex-col items-center p-2 rounded-lg border-2 transition-all ${role === 'admin' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}
                            >
                                <User size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Admin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('security')}
                                className={`flex-1 flex flex-col items-center p-2 rounded-lg border-2 transition-all ${role === 'security' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}
                            >
                                <ShieldCheck size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Security</span>
                            </button>
                        </div>

                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className={`grid grid-cols-1 ${role === 'resident' ? 'sm:grid-cols-2' : ''} gap-3`}>
                                {role === 'resident' && (
                                    <div>
                                        <label htmlFor="flatNumber" className="block text-sm font-medium text-gray-700">
                                            Flat Number
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Home className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="flatNumber"
                                                name="flatNumber"
                                                type="text"
                                                value={formData.flatNumber}
                                                onChange={handleChange}
                                                required
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2"
                                                placeholder="A-101"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2"
                                            placeholder="123-456-7890"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-lg shadow-indigo-500/30"
                                >
                                    Register
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                                </div>
                            </div>

                            <div className="mt-3 text-center">
                                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign in instead
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Register;
