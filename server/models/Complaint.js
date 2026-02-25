<<<<<<< HEAD
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    adminResponse: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    feedback: { type: String }
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
=======

const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    response: { type: String }, // Admin/Security response
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
>>>>>>> 8044050 (chore: add client and server folders)
