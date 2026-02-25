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
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err);
        }
    };

    return (
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
    );
};

export default Login;
