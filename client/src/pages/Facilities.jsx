import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Calendar, Building, Clock, CheckCircle } from 'lucide-react';

const Facilities = () => {
    const [facilities, setFacilities] = useState([]);
    const [name, setName] = useState('Community Hall');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/facilities', { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setFacilities(data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/facilities', { name, date, startTime, endTime }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            setName('Community Hall');
            setDate('');
            setStartTime('');
            setEndTime('');
            fetchFacilities();
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/facilities/${id}`, { status }, { headers: { 'Authorization': `Bearer ${user?.token}` } });
            fetchFacilities();
        } catch (error) {
            console.error(error);
        }
    };

    const statusColors = {
        'Pending': 'bg-rose-100 text-rose-700 border-rose-200',
        'Approved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Rejected': 'bg-slate-100 text-slate-700 border-slate-200'
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-end pb-6 border-b border-indigo-100">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-emerald-500">
                        Facility Booking
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Book common areas like the Hall, Gym, and Pool
                    </p>
                </div>
                <div className="bg-linear-to-tr from-teal-500 to-emerald-500 p-3 rounded-2xl shadow-lg shadow-teal-500/30">
                    <Building className="text-white w-6 h-6" />
                </div>
            </header>

            {user?.role === 'Resident' && (
                <form onSubmit={submitBooking} className="bg-white rounded-3xl p-8 shadow-xl shadow-teal-50/50 border border-teal-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-teal-100 to-emerald-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                        <Calendar className="text-teal-500 w-6 h-6" /> Request Booking
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        <select
                            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        >
                            <option value="Community Hall">Community Hall</option>
                            <option value="Gym">Gym</option>
                            <option value="Swimming Pool">Swimming Pool</option>
                            <option value="Guest Parking">Guest Parking</option>
                        </select>
                        <input
                            type="date"
                            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                        <input
                            type="time"
                            className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                        <div className="md:col-span-2">
                            <button type="submit" className="w-full bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 px-6 py-3 rounded-xl text-white font-bold shadow-lg shadow-teal-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4" /> Submit Request
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid gap-6">
                {facilities.map((facility) => (
                    <div key={facility._id} className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-indigo-50 flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${statusColors[facility.status].split(' ')[0]}`}></div>

                        <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform duration-300">
                            <Building className="w-8 h-8" />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors duration-300">
                                    {facility.name}
                                </h3>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border shrink-0 w-max ${statusColors[facility.status]}`}>
                                    {facility.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mt-4">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <Calendar className="w-4 h-4 text-teal-500" />
                                    {new Date(facility.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                    <Clock className="w-4 h-4 text-emerald-500" />
                                    {facility.startTime} - {facility.endTime}
                                </span>
                                {user?.role === 'Admin' && facility.bookedBy && (
                                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                        Booked by: {facility.bookedBy.name} ({facility.bookedBy.apartmentNumber})
                                    </span>
                                )}
                            </div>

                            {user?.role === 'Admin' && facility.status === 'Pending' && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => updateStatus(facility._id, 'Approved')}
                                        className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg font-semibold text-sm transition-colors"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(facility._id, 'Rejected')}
                                        className="px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg font-semibold text-sm transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {facilities.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                        <Building className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-600">No bookings yet</h3>
                        <p className="text-slate-400">There are currently no facility bookings to show.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Facilities;
