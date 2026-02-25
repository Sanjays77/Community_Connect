import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Receipt, DollarSign, CheckCircle2, User, Landmark } from 'lucide-react';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [users, setUsers] = useState([]);
    const [userSelect, setUserSelect] = useState('');
    const [month, setMonth] = useState('');
    const [amount, setAmount] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchBills();
        if (user?.role === 'Admin') {
            fetchUsers();
        }
    }, [user]);

    const fetchBills = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/bills', { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setBills(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUsers = async () => {
        try {
            // In a real app we'd need an endpoint for this, we'll mock or manually provide users.
            // Since we don't have a GET /api/users endpoint, we will just use the bill's populated users to show previously billed users or type ID.
            // However, for simplicity, I'll allow typing the User ID directly for admins here.
        } catch (error) {
            console.error(error);
        }
    };

    const submitBill = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/bills', {
                user: userSelect,
                month,
                amount
            }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setUserSelect('');
            setMonth('');
            setAmount('');
            fetchBills();
        } catch (error) {
            console.error(error);
        }
    };

    const payBill = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/bills/${id}/pay`, {}, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            fetchBills();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-emerald-500 to-teal-400">
                        Maintenance Bills
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Manage and view your monthly society maintenance charges
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-100 shrink-0">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                        <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase">Total Due</p>
                        <p className="text-lg font-black text-slate-800">
                            ₹{bills.filter(b => b.status === 'Unpaid').reduce((acc, curr) => acc + curr.amount, 0)}
                        </p>
                    </div>
                </div>
            </header>

            {user?.role === 'Admin' && (
                <form onSubmit={submitBill} className="bg-white rounded-3xl p-8 shadow-xl shadow-emerald-50/50 border border-emerald-50 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                        <Receipt className="text-emerald-500 w-6 h-6" /> Generate New Bill
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                        <input
                            type="text"
                            placeholder="User ID (from DB)"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all focus:bg-white"
                            value={userSelect}
                            onChange={(e) => setUserSelect(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Month (e.g. October 2023)"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all focus:bg-white"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Amount (₹)"
                            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all focus:bg-white"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button className="mt-4 bg-linear-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 flex items-center gap-2 relative z-10">
                        <Receipt className="w-4 h-4" /> Issue Bill
                    </button>
                </form>
            )}

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {bills.map((bill) => (
                    <div key={bill._id} className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-linear-to-bl opacity-20 transition-all duration-500 ${bill.status === 'Paid' ? 'from-emerald-400 to-teal-300' : 'from-rose-400 to-orange-300'
                            }`}></div>

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-2xl ${bill.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                        {bill.status === 'Paid' ? <CheckCircle2 className="w-6 h-6" /> : <Receipt className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                                            {bill.month}
                                        </h3>
                                        {user?.role === 'Admin' ? (
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {bill.user?.name} ({bill.user?.apartmentNumber})
                                            </p>
                                        ) : (
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                                                Maintenance Dues
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${bill.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'
                                    }`}>
                                    {bill.status}
                                </span>
                            </div>

                            <div className="mt-8 mb-6">
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Amount Due</p>
                                <p className="text-5xl font-black text-slate-800 flex items-start gap-1">
                                    <span className="text-2xl mt-1 text-slate-400">₹</span>
                                    {bill.amount}
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                            {bill.status === 'Unpaid' ? (
                                <button
                                    onClick={() => payBill(bill._id)}
                                    className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300"
                                >
                                    <DollarSign className="w-5 h-5" /> Pay Now
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 text-emerald-600 font-bold w-full justify-center bg-emerald-50 py-3 rounded-xl border border-emerald-100">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Paid on {new Date(bill.paidAt || bill.updatedAt).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {bills.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl col-span-full">
                        <Receipt className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No bills found</h3>
                        <p className="text-slate-400">All caught up with the payments!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bills;
