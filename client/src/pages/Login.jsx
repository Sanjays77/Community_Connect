<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Lock, Mail, User, ShieldCheck, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Resident',
    });
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Login = () => {
    const [role, setRole] = useState('resident');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
>>>>>>> 8044050 (chore: add client and server folders)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
<<<<<<< HEAD
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
=======
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            if (response.data) {
                // Save user data (e.g., in localStorage)
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                setSuccess('Login successful!');
                setTimeout(() => {
                    navigate('/'); // Navigate to main home after login
                }, 1000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
>>>>>>> 8044050 (chore: add client and server folders)
        }
    };

    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col selection:bg-pink-200 selection:text-pink-900">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
                    <div className="text-center mb-8">
                        <div className="mx-auto bg-gradient-to-tr from-pink-500 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50">
                            <Lock className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Sign In</h1>
                        <p className="text-pink-200 mt-2 text-sm font-medium">Welcome back to CommunityConnect</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-2">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'Resident' })}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.role === 'Resident'
                                        ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                                        : 'border-indigo-500/30 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-500/10'
                                    }`}
                            >
                                <User className="w-6 h-6 mb-2" />
                                <span className="text-xs font-bold">Resident</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'Security' })}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.role === 'Security'
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                        : 'border-indigo-500/30 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-500/10'
                                    }`}
                            >
                                <ShieldCheck className="w-6 h-6 mb-2" />
                                <span className="text-xs font-bold">Security</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'Admin' })}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${formData.role === 'Admin'
                                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                        : 'border-indigo-500/30 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-500/10'
                                    }`}
                            >
                                <Settings className="w-6 h-6 mb-2" />
                                <span className="text-xs font-bold">Admin</span>
                            </button>
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-indigo-300 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-indigo-900/40 text-white placeholder-indigo-300 border border-indigo-500/30 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-indigo-300 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-indigo-900/40 text-white placeholder-indigo-300 border border-indigo-500/30 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-pink-500/30 transform transition hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-indigo-200 text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-pink-400 hover:text-pink-300 font-bold underline decoration-2 underline-offset-4"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
=======
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
                        className="bg-white/90 backdrop-blur-sm py-5 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Sign in to manage your society
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4 mb-5">
                            <button
                                onClick={() => setRole('resident')}
                                className={`flex-1 flex flex-col items-center p-3 rounded-lg border-2 transition-all ${role === 'resident' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-indigo-300'}`}
                            >
                                <Home size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Resident</span>
                            </button>
                            <button
                                onClick={() => setRole('admin')}
                                className={`flex-1 flex flex-col items-center p-3 rounded-lg border-2 transition-all ${role === 'admin' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}
                            >
                                <User size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Admin</span>
                            </button>
                            <button
                                onClick={() => setRole('security')}
                                className={`flex-1 flex flex-col items-center p-3 rounded-lg border-2 transition-all ${role === 'security' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}
                            >
                                <ShieldCheck size={24} className="mb-1" />
                                <span className="text-xs font-semibold">Security</span>
                            </button>
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

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5"
                                        placeholder="you@example.com"
                                    />
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
                                        autoComplete="current-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-lg shadow-indigo-500/30"
                                >
                                    Sign in
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                            </div>
                        </form>

                        <div className="mt-5">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Create a new account
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
>>>>>>> 8044050 (chore: add client and server folders)
    );
};

export default Login;
